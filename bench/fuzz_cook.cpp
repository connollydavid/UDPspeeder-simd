/*
 * bench/fuzz_cook.cpp — feed hostile bytes to the packet decoder.
 *
 * de_cook() is the first thing a packet from the network touches. It XORs with
 * the key, reads a length byte the sender chose and trims that many bytes off
 * the tail, then checks a CRC. Every one of those steps runs before anything
 * has been authenticated, on a buffer whose contents an attacker picks. The
 * history already holds one crash from exactly here, a4d32c3, where the IV
 * length was used without being validated against the configured range.
 *
 * The contract is taken from the real caller, not invented. tunnel_client.cpp
 * and tunnel_server.cpp hand de_cook() whatever recv() returned, with len >= 0
 * and a buffer of common.h's buf_len. Feeding it anything outside that would
 * manufacture crashes the network cannot cause, so the harness stays inside it.
 *
 * Two entry points from one file. Built with clang -fsanitize=fuzzer this is a
 * libFuzzer target and the coverage-guided engine drives it. Built with gcc it
 * gets the standalone driver at the bottom, which walks a deterministic PRNG so
 * a failure reproduces from its seed. The second is weaker and exists so the
 * lane runs everywhere, including where no clang is installed.
 */

#include "packet_cook.h"
#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

/* common.h's buf_len, the capacity the caller really provides. */
static const int fuzz_buf_len = 3600 + 200;

/*
 * packet_cook.cpp takes these from common.cpp in production. Here they are
 * deterministic and reset for every case, so that a finding reproduces from its
 * input alone. A harness whose behaviour depends on the process-wide state left
 * by the previous case gives libFuzzer a crash it cannot replay.
 */
static uint32_t stub_state;

static uint32_t
stub_next(void)
{
    stub_state = stub_state * 1664525u + 1013904223u;
    return stub_state;
}

extern "C++" void
get_fake_random_chars(char *s, int len)
{
    for (int i = 0; i < len; i++) s[i] = (char)(stub_next() >> 24);
}

extern "C++" int
random_between(uint32_t a, uint32_t b)
{
    if (b <= a) return (int)a;
    return (int)(a + stub_next() % (b - a + 1));
}

static void
fuzz_ctx_init(cook_ctx_t *ctx)
{
    memset(ctx, 0, sizeof(*ctx));
    snprintf(ctx->key, sizeof(ctx->key), "%s", "a fixed key, so a failure reproduces");
    ctx->iv_min = 1;
    ctx->iv_max = 16;
    ctx->disable_checksum = 0;
    ctx->disable_obscure = 0;
    ctx->disable_xor = 0;
    cook_ctx_prepare_key(ctx);
}

/*
 * One case. The buffer is oversized on purpose: de_cook works in place and the
 * caller's buffer is buf_len whatever the packet's length, so a write past len
 * but inside the buffer is still a bug and ASan should be given room to see it
 * rather than have the harness clip the evidence.
 */
extern "C" int
LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    if (size > (size_t)fuzz_buf_len) size = fuzz_buf_len;

    stub_state = 0x2545f491u;   /* same start for every case */

    cook_ctx_t ctx;
    fuzz_ctx_init(&ctx);

    static char buf[fuzz_buf_len];
    memset(buf, 0, sizeof(buf));
    memcpy(buf, data, size);

    int len = (int)size;
    de_cook(&ctx, buf, len);

    /*
     * Whatever it returned, the length it reports must stay inside the buffer
     * it was given. A decoder that hands its caller a length longer than the
     * data is how a later read runs off the end, and the return code alone
     * would not catch it.
     */
    if (len < 0 || len > fuzz_buf_len) {
        fprintf(stderr, "de_cook returned len=%d for a %d byte input\n",
                len, (int)size);
        abort();
    }

    /* The round trip must survive its own output. */
    cook_ctx_t ctx2;
    fuzz_ctx_init(&ctx2);
    static char rt[fuzz_buf_len];
    memset(rt, 0, sizeof(rt));
    int rt_len = (int)(size > 3000 ? 3000 : size);
    memcpy(rt, data, rt_len);
    int cooked = rt_len;
    if (do_cook(&ctx2, rt, cooked) == 0) {
        if (cooked < 0 || cooked > fuzz_buf_len) {
            fprintf(stderr, "do_cook produced len=%d\n", cooked);
            abort();
        }
        int back = cooked;
        if (de_cook(&ctx2, rt, back) == 0) {
            if (back != rt_len || memcmp(rt, data, rt_len) != 0) {
                fprintf(stderr, "round trip changed the payload at len=%d\n",
                        rt_len);
                abort();
            }
        }
    }
    return 0;
}

#ifndef FUZZ_LIBFUZZER
/*
 * Standalone driver. No coverage feedback, so it is a bounded random test
 * rather than fuzzing proper, and it is labelled that way wherever it reports.
 * Its value is that it runs under the same ASan and UBSan build as the rest of
 * the suite, on every machine, with no clang.
 *
 * Half the cases are raw noise and half are noise laid over a validly cooked
 * packet, since a decoder usually breaks a few bytes away from something it
 * would have accepted rather than on uniformly random input.
 */
static uint64_t rng_state;

static uint32_t
rng_next(void)
{
    rng_state ^= rng_state << 13;
    rng_state ^= rng_state >> 7;
    rng_state ^= rng_state << 17;
    return (uint32_t)(rng_state >> 32);
}

int
main(int argc, char **argv)
{
    long iterations = 200000;
    uint64_t seed = 0x9e3779b97f4a7c15ULL;

    if (argc > 1) iterations = strtol(argv[1], NULL, 10);
    if (argc > 2) seed = strtoull(argv[2], NULL, 0);
    rng_state = seed ? seed : 1;

    static uint8_t in[fuzz_buf_len];
    cook_ctx_t seed_ctx;
    fuzz_ctx_init(&seed_ctx);

    for (long i = 0; i < iterations; i++) {
        int n = (int)(rng_next() % (fuzz_buf_len + 1));

        if (i & 1) {
            /* noise over a packet that was valid a moment ago */
            int payload = (int)(rng_next() % 1400);
            static char valid[fuzz_buf_len];
            for (int j = 0; j < payload; j++) valid[j] = (char)rng_next();
            int vlen = payload;
            if (do_cook(&seed_ctx, valid, vlen) != 0) continue;
            n = vlen;
            memcpy(in, valid, n);
            int flips = 1 + (int)(rng_next() % 4);
            for (int f = 0; f < flips && n > 0; f++)
                in[rng_next() % n] ^= (uint8_t)(1u << (rng_next() % 8));
        } else {
            for (int j = 0; j < n; j++) in[j] = (uint8_t)rng_next();
        }

        LLVMFuzzerTestOneInput(in, (size_t)n);
    }

    printf("ok:   %ld random cases through de_cook, no fault\n", iterations);
    printf("      seed 0x%llx, bounded random rather than coverage guided\n",
           (unsigned long long)seed);
    return 0;
}
#endif
