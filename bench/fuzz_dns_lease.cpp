/*
 * bench/fuzz_dns_lease.cpp — feed hostile bytes to the DNS response parser.
 *
 * dns_lease_parse_response() is what a DNS response from the resolver touches
 * first, and the resolver is an untrusted locator-hint source, so the bytes are
 * attacker-shaped: a poisoned resolver can send anything. The parser reads the
 * wire with manual byte shifts and bounds checks on every field, and this lane
 * is what would have caught a bounds bug before the parser shipped.
 *
 * The harness never opens a socket: the ctx has no nameservers configured, so
 * the TC and NODATA fallback paths (which would open one) settle the state
 * machine instead. The only real work is the parser on the input bytes.
 *
 * Two entry points from one file, exactly like fuzz_cook.cpp: a libFuzzer
 * target under clang, and a standalone bounded-random driver under gcc whose
 * seed reproduces a failure.
 */

#include "dns_lease_mgr.h"
#include <stdint.h>
#include <string.h>
#include <stdlib.h>
#include <stdio.h>

/*
 * The parser's ID check drops a response whose ID differs from pending_id, so
 * the fuzzer sets pending_id from the first two input bytes. That walks the
 * parser past the cheapest check and into the sections, which is where a bound
 * bug would live. The clock is a deterministic counter so a case reproduces.
 */
extern "C" int
LLVMFuzzerTestOneInput(const uint8_t *data, size_t size)
{
    dns_lease_ctx_t ctx;
    dns_lease_init(&ctx, "vps.example.net", 4096);

    if (size >= 2)
        ctx.pending_id = (uint16_t)(((unsigned int)data[0] << 8) | (unsigned int)data[1]);

    dns_lease_feed_response(&ctx, (const char *)data, (int)size);
    return 0;
}

#ifndef FUZZ_LIBFUZZER
/*
 * Standalone driver: bounded random rather than coverage guided, run under the
 * same ASan and UBSan build as the rest of the suite. Half the cases are raw
 * noise and half are noise laid over a response that was valid a moment ago,
 * since a parser usually breaks a few bytes away from something it accepted.
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

/*
 * Build a valid A-answer response for vps.example.net into out; returns the
 * wire length. The seed corpus for the mutation half of the driver.
 */
static int
build_valid_response(char *out, int out_len)
{
    /* header: ID 0x1234, QR=1 RD=1, QDCOUNT=1, ANCOUNT=1 */
    if (out_len < 12) return -1;
    out[0] = 0x12; out[1] = 0x34;
    out[2] = 0x81; out[3] = 0x80;
    out[4] = 0;    out[5] = 1;
    out[6] = 0;    out[7] = 1;
    out[8] = 0;    out[9] = 0;
    out[10] = 0;   out[11] = 0;
    int pos = 12;
    /* QNAME: vps.example.net */
    static const char qname[] = "\x03vps\x07example\x03net\x00";
    if (pos + (int)sizeof(qname) - 1 > out_len) return -1;
    memcpy(out + pos, qname, sizeof(qname) - 1);
    pos += (int)sizeof(qname) - 1;
    /* QTYPE A, QCLASS IN */
    out[pos++] = 0; out[pos++] = 1;
    out[pos++] = 0; out[pos++] = 1;
    /* answer: name pointer to 12, A, IN, TTL 300, rdlen 4, 1.2.3.4 */
    if (pos + 16 > out_len) return -1;
    out[pos++] = 0xC0; out[pos++] = 0x0C;
    out[pos++] = 0;    out[pos++] = 1;
    out[pos++] = 0;    out[pos++] = 1;
    out[pos++] = 0;    out[pos++] = 0;
    out[pos++] = 1;    out[pos++] = 0x2C; /* TTL 300 = 0x0000012C */
    out[pos++] = 0;    out[pos++] = 4;
    out[pos++] = 1;    out[pos++] = 2;
    out[pos++] = 3;    out[pos++] = 4;
    return pos;
}

int
main(int argc, char **argv)
{
    long iterations = 200000;
    uint64_t seed = 0x5f3759df4a7c15ULL;

    if (argc > 1) iterations = strtol(argv[1], NULL, 10);
    if (argc > 2) seed = strtoull(argv[2], NULL, 0);
    rng_state = seed ? seed : 1;

    static uint8_t in[512];
    static char valid[512];
    int vlen = build_valid_response(valid, (int)sizeof(valid));

    for (long i = 0; i < iterations; i++) {
        int n;
        if (i & 1) {
            /* noise over a response that was valid a moment ago */
            n = (int)(rng_next() % (512u + 1));
            memcpy(in, valid, (size_t)(vlen < n ? vlen : n));
            int flips = 1 + (int)(rng_next() % 8);
            for (int f = 0; f < flips && n > 0; f++)
                in[rng_next() % n] ^= (uint8_t)(1u << (rng_next() % 8));
        } else {
            n = (int)(rng_next() % (512u + 1));
            for (int j = 0; j < n; j++) in[j] = (uint8_t)rng_next();
        }
        LLVMFuzzerTestOneInput(in, (size_t)n);
    }

    printf("ok:   %ld random cases through dns_lease_parse_response, no fault\n", iterations);
    printf("      seed 0x%llx, bounded random rather than coverage guided\n",
           (unsigned long long)seed);
    return 0;
}
#endif