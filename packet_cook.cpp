#include "packet_cook.h"
#include "crc32c.h"
#include <stdint.h>
#include <string.h>
#include <assert.h>

#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
#include <emmintrin.h>  /* SSE2 — baseline on x86_64, probed on i386 */
#include <immintrin.h>  /* AVX2 — for xor_tile_avx2 (guarded by target attr) */
#include <cpuid.h>      /* __get_cpuid, __get_cpuid_count — feature probes */
#define COOK_VEC_WIDTH 16
#elif defined(__aarch64__) || defined(__ARM_NEON)
#include <arm_neon.h>
#define COOK_VEC_WIDTH 16
#elif defined(HAVE_PPC_SPE)
#define COOK_VEC_WIDTH 8
#else
#define COOK_VEC_WIDTH ((int)sizeof(unsigned long))
#endif

#ifdef HAVE_PPC_SPE
extern "C" void xor_tile_spe(char *data, int len, const char *tile, int tile_len);
#endif

/* Provided by common.cpp in production, stubs in bench */
extern "C++" void get_fake_random_chars(char *s, int len);
extern "C++" int random_between(uint32_t a, uint32_t b);

static const int cook_buf_len = 3800; /* matches common.h buf_len */

static void
cook_write_u32(char *p, uint32_t l)
{
    *(unsigned char *)(p + 3) = (unsigned char)((l >> 0) & 0xff);
    *(unsigned char *)(p + 2) = (unsigned char)((l >> 8) & 0xff);
    *(unsigned char *)(p + 1) = (unsigned char)((l >> 16) & 0xff);
    *(unsigned char *)(p + 0) = (unsigned char)((l >> 24) & 0xff);
}

static uint32_t
cook_read_u32(char *p)
{
    uint32_t res;
    res = *(const unsigned char *)(p + 0);
    res = *(const unsigned char *)(p + 1) + (res << 8);
    res = *(const unsigned char *)(p + 2) + (res << 8);
    res = *(const unsigned char *)(p + 3) + (res << 8);
    return res;
}

/* --- SIMD repeating-pattern XOR ----------------------------------------- */

static int
cook_gcd(int a, int b)
{
    while (b) { int t = b; b = a % b; a = t; }
    return a;
}

static int
cook_lcm(int a, int b)
{
    return a / cook_gcd(a, b) * b;
}

/*
 * Fill tile[0..tile_len-1] with pat[0..pat_len-1] repeating.
 * tile_len must be a multiple of pat_len.
 */
static void
expand_tile(char *tile, int tile_len, const char *pat, int pat_len)
{
    memcpy(tile, pat, pat_len);
    int filled = pat_len;
    while (filled < tile_len) {
        int chunk = tile_len - filled;
        if (chunk > filled) chunk = filled;
        memcpy(tile + filled, tile, chunk);
        filled += chunk;
    }
}

/*
 * XOR data[0..len-1] with tile[0..tile_len-1] repeating.
 * tile_len MUST be a multiple of COOK_VEC_WIDTH.
 */

/*
 * Word-at-a-time XOR: the floor for every platform, and the path taken on x86
 * only by a CPU too old to have MMX. Four bytes on a 32-bit machine, eight on
 * a 64-bit one.
 *
 * aarch64 and the e500 SPE always have their vector path, so a production build
 * for either leaves this with no caller. Marked unused so those targets compile
 * clean; the tests still reach it, as the reference the vector path is held to.
 */
__attribute__((unused))
static void
xor_tile_word(char *data, int len, const char *tile, int tile_len)
{
    const int w = (int)sizeof(unsigned long);
    int t = 0, i = 0;
    for (; i + w <= len; i += w) {
        unsigned long d, k;
        memcpy(&d, data + i, sizeof(d));
        memcpy(&k, tile + t, sizeof(k));
        d ^= k;
        memcpy(data + i, &d, sizeof(d));
        t += w;
        if (t >= tile_len) t = 0;
    }
    for (; i < len; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
}
#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
/*
 * MMX is the widest XOR available on the floor OpenWrt still ships for x86:
 * its geode and legacy subtargets set CONFIG_X86_MINIMUM_CPU_FAMILY=5 and
 * build for -march=pentium-mmx, where SSE2 does not exist and a plain word is
 * four bytes. Eight bytes per op is twice that, and XOR is one op per width,
 * so unlike the field multiply this is a straight win.
 *
 * MMX registers alias the x87 stack, so this ends with EMMS: the tunnel does
 * floating-point work in its timers, and leaving the tags set corrupts the
 * first x87 op that follows.
 */
__attribute__((target("mmx")))
static void
xor_tile_mmx(char *data, int len, const char *tile, int tile_len)
{
    int t = 0, i = 0;
    for (; i + 8 <= len; i += 8) {
        __m64 d, k;
        __builtin_memcpy(&d, data + i, 8);
        __builtin_memcpy(&k, tile + t, 8);
        d = _mm_xor_si64(d, k);
        __builtin_memcpy(data + i, &d, 8);
        t += 8;
        if (t >= tile_len) t = 0;
    }
    _mm_empty();
    for (; i < len; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
}

/*
 * SSE2 XOR. On x86_64 this is the baseline and always available; on i386 it is
 * gated by CPUID, which is why it carries a target attribute and lives in its
 * own function rather than inline in the dispatcher.
 */
__attribute__((target("sse2")))
static void
xor_tile_sse2(char *data, int len, const char *tile, int tile_len)
{
    int t = 0, i = 0;
    for (; i + 16 <= len; i += 16) {
        __m128i d = _mm_loadu_si128((const __m128i *)(data + i));
        __m128i k = _mm_loadu_si128((const __m128i *)(tile + t));
        _mm_storeu_si128((__m128i *)(data + i), _mm_xor_si128(d, k));
        t += 16;
        if (t >= tile_len) t = 0;
    }
    for (; i < len; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
}

__attribute__((target("avx2")))
static void
xor_tile_avx2(char *data, int len, const char *tile, int tile_len)
{
    int t = 0, i = 0;
    if (tile_len == 16) {
        /* Common case: broadcast 16-byte tile to 256-bit, no wrap logic */
        __m256i tile256 = _mm256_broadcastsi128_si256(
            _mm_loadu_si128((const __m128i *)tile));
        for (; i + 32 <= len; i += 32) {
            __m256i d = _mm256_loadu_si256((const __m256i *)(data + i));
            _mm256_storeu_si256((__m256i *)(data + i),
                _mm256_xor_si256(d, tile256));
        }
        /* t stays 0: i is multiple of 32, tile_len=16, so (i % 16) == 0 */
    } else {
        /* General case: tile_len is a multiple of 16 */
        for (; i + 32 <= len; i += 32) {
            __m128i k1 = _mm_loadu_si128((const __m128i *)(tile + t));
            t += 16;
            if (t >= tile_len) t -= tile_len;
            __m128i k2 = _mm_loadu_si128((const __m128i *)(tile + t));
            t += 16;
            if (t >= tile_len) t -= tile_len;
            __m256i key = _mm256_set_m128i(k2, k1);
            __m256i d = _mm256_loadu_si256((const __m256i *)(data + i));
            _mm256_storeu_si256((__m256i *)(data + i),
                _mm256_xor_si256(d, key));
        }
    }
    /* SSE2 tail */
    for (; i + 16 <= len; i += 16) {
        __m128i d = _mm_loadu_si128((const __m128i *)(data + i));
        __m128i k = _mm_loadu_si128((const __m128i *)(tile + t));
        _mm_storeu_si128((__m128i *)(data + i), _mm_xor_si128(d, k));
        t += 16;
        if (t >= tile_len) t = 0;
    }
    /* scalar tail */
    for (; i < len; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
}

__attribute__((target("avx512bw")))
static void
xor_tile_avx512(char *data, int len, const char *tile, int tile_len)
{
    int t = 0, i = 0;
    if (tile_len == 16) {
        /* Common case: broadcast 16-byte tile to 512-bit, no wrap logic */
        __m512i tile512 = _mm512_broadcast_i32x4(
            _mm_loadu_si128((const __m128i *)tile));
        for (; i + 64 <= len; i += 64) {
            __m512i d = _mm512_loadu_si512(data + i);
            _mm512_storeu_si512(data + i, _mm512_xor_si512(d, tile512));
        }
        /* t stays 0: i is multiple of 64, tile_len=16, so (i % 16) == 0 */
    } else {
        /* General case: tile_len is a multiple of 16 */
        for (; i + 64 <= len; i += 64) {
            __m128i k1 = _mm_loadu_si128((const __m128i *)(tile + t));
            t += 16; if (t >= tile_len) t -= tile_len;
            __m128i k2 = _mm_loadu_si128((const __m128i *)(tile + t));
            t += 16; if (t >= tile_len) t -= tile_len;
            __m128i k3 = _mm_loadu_si128((const __m128i *)(tile + t));
            t += 16; if (t >= tile_len) t -= tile_len;
            __m128i k4 = _mm_loadu_si128((const __m128i *)(tile + t));
            t += 16; if (t >= tile_len) t -= tile_len;
            __m512i key = _mm512_castsi128_si512(k1);
            key = _mm512_inserti32x4(key, k2, 1);
            key = _mm512_inserti32x4(key, k3, 2);
            key = _mm512_inserti32x4(key, k4, 3);
            __m512i d = _mm512_loadu_si512(data + i);
            _mm512_storeu_si512(data + i, _mm512_xor_si512(d, key));
        }
    }
    /* AVX2 tail */
    if (i + 32 <= len) {
        __m128i k1 = _mm_loadu_si128((const __m128i *)(tile + t));
        t += 16; if (t >= tile_len) t -= tile_len;
        __m128i k2 = _mm_loadu_si128((const __m128i *)(tile + t));
        t += 16; if (t >= tile_len) t -= tile_len;
        __m256i key = _mm256_set_m128i(k2, k1);
        __m256i d = _mm256_loadu_si256((const __m256i *)(data + i));
        _mm256_storeu_si256((__m256i *)(data + i),
            _mm256_xor_si256(d, key));
        i += 32;
    }
    /* SSE2 tail */
    if (i + 16 <= len) {
        __m128i d = _mm_loadu_si128((const __m128i *)(data + i));
        __m128i k = _mm_loadu_si128((const __m128i *)(tile + t));
        _mm_storeu_si128((__m128i *)(data + i), _mm_xor_si128(d, k));
        t += 16; if (t >= tile_len) t -= tile_len;
        i += 16;
    }
    /* scalar tail */
    for (; i < len; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
}
#endif

#if (defined(__aarch64__) || defined(__ARM_NEON) || defined(HAVE_PPC_SPE)) \
    && defined(BENCH_EXPOSE_INTERNALS)
/*
 * Send the XOR down the word path instead of the vector one. The build makes
 * this choice at compile time, so there is no tier to pin; this exists so the
 * tests can hold the vector path against the word reference, which the cook
 * round-trip cannot do because XOR is its own inverse: a wrong path cancels
 * itself, and only a path that does nothing at all shows up there.
 *
 * It is confined to the bench build, so the production XOR carries no switch
 * that only a test can throw. The compiler would fold it away in any case, with
 * no writer for it, but that leaves the cost resting on the optimiser rather
 * than on the source.
 */
static int xor_pin_word = 0;
#define XOR_PIN_WORD_ACTIVE 1
#endif

#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
/* Runtime SIMD tier: 0=word, 1=MMX, 2=SSE2, 3=AVX2, 4=AVX-512BW */
static int xor_simd_tier = -1;

/* MMX and SSE2 are guaranteed on x86_64 and optional on i386. Leaf 1, EDX. */
static int xor_cpu_has_mmx(void)
{
#if defined(__i386__)
    unsigned int eax, ebx, ecx, edx;
    if (!__get_cpuid(1, &eax, &ebx, &ecx, &edx))
        return 0;
    return (edx >> 23) & 1;
#else
    return 1;
#endif
}

static int xor_cpu_has_sse2(void)
{
#if defined(__i386__)
    unsigned int eax, ebx, ecx, edx;
    if (!__get_cpuid(1, &eax, &ebx, &ecx, &edx))
        return 0;
    return (edx >> 26) & 1;
#else
    return 1;
#endif
}

/*
 * Using AVX2 takes more than the feature bit: the OS must also have enabled
 * YMM state, or the first VEX instruction faults. Check OSXSAVE and XCR0 as
 * well, and reach leaf 7 through __get_cpuid_count so an old CPU that lacks
 * that leaf reports nothing rather than whatever the highest leaf returned.
 */
static int xor_cpu_has_avx2(void)
{
    unsigned int eax, ebx, ecx, edx;

    if (!__get_cpuid(1, &eax, &ebx, &ecx, &edx))
        return 0;
    if (!(ecx & (1u << 27)))            /* OSXSAVE */
        return 0;

    unsigned int xcr0;
    __asm__ __volatile__("xgetbv" : "=a"(xcr0) : "c"(0) : "edx");
    if ((xcr0 & 0x6) != 0x6)            /* XMM and YMM state saved by the OS */
        return 0;

    if (!__get_cpuid_count(7, 0, &eax, &ebx, &ecx, &edx))
        return 0;
    return (ebx >> 5) & 1;              /* AVX2 */
}

static int xor_cpu_has_avx512bw(void)
{
    unsigned int eax, ebx, ecx, edx;

    if (!__get_cpuid(1, &eax, &ebx, &ecx, &edx))
        return 0;
    if (!(ecx & (1u << 27)))            /* OSXSAVE */
        return 0;

    unsigned int xcr0;
    __asm__ __volatile__("xgetbv" : "=a"(xcr0) : "c"(0) : "edx");
    if ((xcr0 & 0xE6) != 0xE6)          /* + opmask, ZMM_Hi256, Hi16_ZMM */
        return 0;

    if (!__get_cpuid_count(7, 0, &eax, &ebx, &ecx, &edx))
        return 0;
    return (ebx >> 30) & 1;             /* AVX-512BW */
}
#endif

static void
xor_tile(char *data, int len, const char *tile, int tile_len)
{
#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
    if (xor_simd_tier < 0) {
        /*
         * On x86_64 SSE2 is part of the baseline, so the probes below are
         * constant-true and the tier starts there. On i386 nothing above a
         * plain word is implied: the geode and legacy targets have MMX and no
         * SSE2, and even the pentium4 target may be running on a CPU with
         * AVX2, so each step is earned from CPUID.
         */
        xor_simd_tier = 0;
        if (xor_cpu_has_mmx())
            xor_simd_tier = 1;
        if (xor_cpu_has_sse2())
            xor_simd_tier = 2;
        if (xor_simd_tier >= 2 && xor_cpu_has_avx2())
            xor_simd_tier = 3;
        if (xor_simd_tier >= 3 && xor_cpu_has_avx512bw())
            xor_simd_tier = 4;
    }
    if (xor_simd_tier >= 4) {
        xor_tile_avx512(data, len, tile, tile_len);
        return;
    }
    if (xor_simd_tier >= 3) {
        xor_tile_avx2(data, len, tile, tile_len);
        return;
    }
    if (xor_simd_tier >= 2) {
        xor_tile_sse2(data, len, tile, tile_len);
        return;
    }
    if (xor_simd_tier >= 1) {
        xor_tile_mmx(data, len, tile, tile_len);
        return;
    }
    xor_tile_word(data, len, tile, tile_len);
#elif defined(__aarch64__) || defined(__ARM_NEON)
#ifdef XOR_PIN_WORD_ACTIVE
    if (xor_pin_word) {
        xor_tile_word(data, len, tile, tile_len);
        return;
    }
#endif
    int t = 0, i = 0;
    for (; i + 32 <= len; i += 32) {
        uint8x16_t d1 = vld1q_u8((const uint8_t *)(data + i));
        uint8x16_t k1 = vld1q_u8((const uint8_t *)(tile + t));
        t += 16; if (t >= tile_len) t = 0;
        uint8x16_t d2 = vld1q_u8((const uint8_t *)(data + i + 16));
        uint8x16_t k2 = vld1q_u8((const uint8_t *)(tile + t));
        t += 16; if (t >= tile_len) t = 0;
        vst1q_u8((uint8_t *)(data + i),      veorq_u8(d1, k1));
        vst1q_u8((uint8_t *)(data + i + 16), veorq_u8(d2, k2));
    }
    for (; i + 16 <= len; i += 16) {
        uint8x16_t d = vld1q_u8((const uint8_t *)(data + i));
        uint8x16_t k = vld1q_u8((const uint8_t *)(tile + t));
        vst1q_u8((uint8_t *)(data + i), veorq_u8(d, k));
        t += 16;
        if (t >= tile_len) t = 0;
    }
    for (; i < len; i++) {
        data[i] ^= tile[t];
        t++;
        if (t >= tile_len) t = 0;
    }
#elif defined(HAVE_PPC_SPE)
#ifdef XOR_PIN_WORD_ACTIVE
    if (xor_pin_word) {
        xor_tile_word(data, len, tile, tile_len);
        return;
    }
#endif
    int t = 0, i = 0;
    /* Scalar head: align data pointer to 8 bytes for evldd */
    int head = (8 - ((uintptr_t)data & 7)) & 7;
    if (head > len) head = len;
    for (; i < head; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
    int remaining = len - i;
    if (remaining >= 8 && t != 0) {
        /* Tile offset not 0 after head — rotate tile so SPE sees offset=0 */
        char rtile[512 + 8];
        assert(tile_len <= 512);
        memcpy(rtile, tile + t, tile_len - t);
        memcpy(rtile + (tile_len - t), tile, t);
        memcpy(rtile + tile_len, rtile, 8); /* SPE evldd padding */
        xor_tile_spe(data + i, remaining, rtile, tile_len);
    } else if (remaining >= 8) {
        /* Data aligned and tile offset 0 — call SPE directly */
        xor_tile_spe(data + i, remaining, tile, tile_len);
    } else {
        /* Too short for SPE — scalar tail */
        for (; i < len; i++) {
            data[i] ^= tile[t];
            if (++t >= tile_len) t = 0;
        }
    }
#else
    /* Word-width XOR for generic platforms (MIPS, RISC-V, PPC, ARMv7). */
    xor_tile_word(data, len, tile, tile_len);
#endif
}

/*
 * Expand pattern into a SIMD-aligned tile on the stack and XOR.
 * Used for obscure IV (4-32 bytes, changes per packet).
 */
static void
xor_with_pattern(char *data, int len, const char *pat, int pat_len)
{
    if (pat_len <= 0 || len <= 0) return;
    int tile_len = cook_lcm(pat_len, COOK_VEC_WIDTH);
    /* Extra COOK_VEC_WIDTH bytes: when SPE evldd reads 8 bytes at a
     * non-zero tile offset, the load may straddle the tile boundary.
     * Padding with a copy of the tile start makes this safe. */
    char tile[512 + COOK_VEC_WIDTH];
    assert(tile_len <= 512);
    expand_tile(tile, tile_len, pat, pat_len);
    memcpy(tile + tile_len, tile, COOK_VEC_WIDTH);
    xor_tile(data, len, tile, tile_len);
}

/* --- Key preparation ---------------------------------------------------- */

void
cook_ctx_prepare_key(cook_ctx_t *ctx)
{
    ctx->key_len = (int)strlen(ctx->key);
    if (ctx->key_len == 0) {
        ctx->key_tile_len = 0;
        return;
    }
    ctx->key_tile_len = cook_lcm(ctx->key_len, COOK_VEC_WIDTH);
    assert(ctx->key_tile_len + COOK_VEC_WIDTH <= (int)sizeof(ctx->key_tile));
    expand_tile(ctx->key_tile, ctx->key_tile_len, ctx->key, ctx->key_len);
    memcpy(ctx->key_tile + ctx->key_tile_len, ctx->key_tile, COOK_VEC_WIDTH);
}

/* --- Cook operations ---------------------------------------------------- */

static void
encrypt_0(cook_ctx_t *ctx, char *input, int len)
{
    if (ctx->key_tile_len == 0) return;
    xor_tile(input, len, ctx->key_tile, ctx->key_tile_len);
}

static int
do_obscure(cook_ctx_t *ctx, char *data, int &len)
{
    assert(len >= 0);
    assert(len < cook_buf_len);

    int iv_len = random_between(ctx->iv_min, ctx->iv_max);
    get_fake_random_chars(data + len, iv_len);
    data[iv_len + len] = (uint8_t)iv_len;
    xor_with_pattern(data, len, data + len, iv_len);

    len = len + iv_len + 1;
    return 0;
}

static int
de_obscure(cook_ctx_t *ctx, char *data, int &len)
{
    if (len < 1) return -1;
    int iv_len = int((uint8_t)data[len - 1]);

    if (iv_len < ctx->iv_min || iv_len > ctx->iv_max) return -1;
    if (len < 1 + iv_len) return -1;

    len = len - 1 - iv_len;
    xor_with_pattern(data, len, data + len, iv_len);

    return 0;
}

static int
put_crc32(cook_ctx_t *ctx, char *s, int &len)
{
    if (ctx->disable_checksum) return 0;
    assert(len >= 0);
    uint32_t crc = (uint32_t)crc32c(s, len);
    cook_write_u32(s + len, crc);
    len += (int)sizeof(uint32_t);
    return 0;
}

static int
rm_crc32(cook_ctx_t *ctx, char *s, int &len)
{
    if (ctx->disable_checksum) return 0;
    assert(len >= 0);
    len -= (int)sizeof(uint32_t);
    if (len < 0) return -1;
    uint32_t crc_in = cook_read_u32(s + len);
    uint32_t crc = (uint32_t)crc32c(s, len);
    if (crc != crc_in) return -1;
    return 0;
}

int
do_cook(cook_ctx_t *ctx, char *data, int &len)
{
    put_crc32(ctx, data, len);
    if (!ctx->disable_obscure) do_obscure(ctx, data, len);
    if (!ctx->disable_xor) encrypt_0(ctx, data, len);
    return 0;
}

int
de_cook(cook_ctx_t *ctx, char *data, int &len)
{
    if (!ctx->disable_xor) encrypt_0(ctx, data, len);
    if (!ctx->disable_obscure) {
        if (de_obscure(ctx, data, len) != 0)
            return -1;
    }
    if (rm_crc32(ctx, data, len) != 0)
        return -2;
    return 0;
}

#ifdef BENCH_EXPOSE_INTERNALS
void bench_xor_tile(char *data, int len, const char *tile, int tile_len) {
    xor_tile(data, len, tile, tile_len);
}
int bench_cook_vec_width() {
    return COOK_VEC_WIDTH;
}
/*
 * Pin one XOR tier, so the tests can hold every path this CPU supports against
 * the byte-at-a-time reference rather than only the dispatched one. Returns 0
 * when the CPU cannot run the named path, so callers skip it.
 */
int bench_xor_tile_force(const char *name) {
#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
    if (!strcmp(name, "word")) { xor_simd_tier = 0; return 1; }
    if (!strcmp(name, "mmx")) {
        if (!xor_cpu_has_mmx()) return 0;
        xor_simd_tier = 1; return 1;
    }
    if (!strcmp(name, "sse2")) {
        if (!xor_cpu_has_sse2()) return 0;
        xor_simd_tier = 2; return 1;
    }
    if (!strcmp(name, "avx2")) {
        if (!xor_cpu_has_avx2()) return 0;
        xor_simd_tier = 3; return 1;
    }
    if (!strcmp(name, "avx512bw")) {
        if (!xor_cpu_has_avx512bw()) return 0;
        xor_simd_tier = 4; return 1;
    }
    return 0;
#elif defined(__aarch64__) || defined(__ARM_NEON)
    if (!strcmp(name, "word")) { xor_pin_word = 1; return 1; }
    if (!strcmp(name, "neon")) { xor_pin_word = 0; return 1; }
    return 0;
#elif defined(HAVE_PPC_SPE)
    if (!strcmp(name, "word")) { xor_pin_word = 1; return 1; }
    if (!strcmp(name, "spe")) { xor_pin_word = 0; return 1; }
    return 0;
#else
    return !strcmp(name, "scalar");
#endif
}
const char *bench_xor_tile_impl() {
    /* Trigger detection if not yet run */
    char dummy[16] = {}, tile[16] = {};
    xor_tile(dummy, 1, tile, 16);
#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
    if (xor_simd_tier >= 4) return "avx512bw";
    if (xor_simd_tier >= 3) return "avx2";
    if (xor_simd_tier >= 2) return "sse2";
    if (xor_simd_tier >= 1) return "mmx";
    return "word";
#elif defined(__aarch64__) || defined(__ARM_NEON)
    return xor_pin_word ? "word" : "neon";
#elif defined(HAVE_PPC_SPE)
    return xor_pin_word ? "word" : "spe";
#else
    return "word";
#endif
}
/*
 * Re-derive the choice and name what it picked. Releasing whatever a test pinned
 * sends the next call back through the selection in xor_tile(), so this reports
 * what the build and the CPU really settle on rather than the last pin.
 */
const char *bench_xor_tile_auto() {
#if defined(__x86_64__) || defined(_M_X64) || defined(__i386__)
    xor_simd_tier = -1;
#elif defined(__aarch64__) || defined(__ARM_NEON) || defined(HAVE_PPC_SPE)
    xor_pin_word = 0;
#endif
    return bench_xor_tile_impl();
}
/*
 * The checksum picks hardware or software the same way, on its own probe, so it
 * is named here too. Restoring the resolver sends the next call back through
 * that probe. This is the copy the cook path uses, not a second instantiation.
 */
const char *bench_crc32c_auto() {
    char probe[8] = {};
    crc32c_impl = crc32c_resolve;
    crc32c(probe, sizeof(probe));
    return crc32c_impl == crc32c_hw ? "hw" : "sw";
}
#endif
