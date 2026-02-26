#include "packet_cook.h"
#include "crc32c.h"
#include <stdint.h>
#include <string.h>
#include <assert.h>

#if defined(__x86_64__) || defined(_M_X64)
#include <emmintrin.h>  /* SSE2 — baseline on all x86_64 */
#include <immintrin.h>  /* AVX2 — for xor_tile_avx2 (guarded by target attr) */
#define COOK_VEC_WIDTH 16
#elif defined(__aarch64__)
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
#if defined(__x86_64__) || defined(_M_X64)
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
#endif

static void
xor_tile(char *data, int len, const char *tile, int tile_len)
{
#if defined(__x86_64__) || defined(_M_X64)
    static int has_avx2 = -1;
    if (has_avx2 < 0) {
        /* Check AVX2: CPUID leaf 7, EBX bit 5 */
        unsigned int eax, ebx, ecx, edx;
        __asm__ __volatile__("cpuid" : "=a"(eax), "=b"(ebx), "=c"(ecx), "=d"(edx) : "a"(7), "c"(0));
        has_avx2 = (ebx >> 5) & 1;
    }
    if (has_avx2) {
        xor_tile_avx2(data, len, tile, tile_len);
        return;
    }
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
        t++;
        if (t >= tile_len) t = 0;
    }
#elif defined(__aarch64__)
    int t = 0, i = 0;
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
    xor_tile_spe(data, len, tile, tile_len);
#else
    /* Word-width XOR for generic platforms (MIPS, RISC-V, PPC, i486, ARMv7).
     * sizeof(unsigned long) = 4 on 32-bit, 8 on 64-bit. */
    int t = 0, i = 0;
    for (; i + COOK_VEC_WIDTH <= len; i += COOK_VEC_WIDTH) {
        unsigned long d, k;
        memcpy(&d, data + i, sizeof(d));
        memcpy(&k, tile + t, sizeof(k));
        d ^= k;
        memcpy(data + i, &d, sizeof(d));
        t += COOK_VEC_WIDTH;
        if (t >= tile_len) t = 0;
    }
    for (; i < len; i++) {
        data[i] ^= tile[t];
        if (++t >= tile_len) t = 0;
    }
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
