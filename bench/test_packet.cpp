#include "bench_common.h"
#include "packet_cook.h"
#include <cstdio>
#include <cstdlib>
#include <cstring>

/* Stubs for packet_cook.cpp dependencies — production uses common.cpp */
#ifndef BENCH_PACKET_STUBS_DEFINED
#define BENCH_PACKET_STUBS_DEFINED
void get_fake_random_chars(char *s, int len) {
    for (int i = 0; i < len; i++)
        s[i] = (char)(rand() & 0xFF);
}

int random_between(unsigned int a, unsigned int b) {
    if (a == b) return (int)a;
    return (int)(a + (unsigned int)rand() % (b + 1 - a));
}
#endif

#define TEST(name, expr) do { \
    if (!(expr)) { printf("  FAIL: %s\n", name); failures++; } \
    else { printf("  ok:   %s\n", name); } \
} while(0)

static int test_cook_roundtrip() {
    int failures = 0;
    cook_ctx_t ctx = {};
    strcpy(ctx.key, "testkey123");
    cook_ctx_prepare_key(&ctx);
    ctx.iv_min = 4;
    ctx.iv_max = 32;

    int sizes[] = { 1, 16, 64, 256, 1024, 1500 };
    int nsizes = sizeof(sizes) / sizeof(sizes[0]);

    for (int s = 0; s < nsizes; s++) {
        int sz = sizes[s];
        char orig[4096], buf[4096];

        /* Fill with pattern */
        for (int i = 0; i < sz; i++)
            orig[i] = (char)((i * 37 + 11) & 0xFF);
        memcpy(buf, orig, sz);

        int len = sz;
        int rc = do_cook(&ctx, buf, len);

        char label[80];
        snprintf(label, sizeof(label), "do_cook succeeds at %d bytes", sz);
        TEST(label, rc == 0 && len > sz);

        rc = de_cook(&ctx, buf, len);
        snprintf(label, sizeof(label), "de_cook succeeds at %d bytes", sz);
        TEST(label, rc == 0 && len == sz);

        snprintf(label, sizeof(label), "round-trip data matches at %d bytes", sz);
        TEST(label, memcmp(buf, orig, sz) == 0);
    }

    return failures;
}

static int test_cook_checksum_only() {
    int failures = 0;
    cook_ctx_t ctx = {};
    ctx.iv_min = 4;
    ctx.iv_max = 32;
    ctx.disable_obscure = 1;
    ctx.disable_xor = 1;

    char orig[1600], buf[1600];
    int sz = 100;
    for (int i = 0; i < sz; i++) orig[i] = (char)i;
    memcpy(buf, orig, sz);

    int len = sz;
    do_cook(&ctx, buf, len);
    TEST("checksum adds 4 bytes", len == sz + 4);

    int rc = de_cook(&ctx, buf, len);
    TEST("checksum round-trip succeeds", rc == 0 && len == sz);
    TEST("checksum data matches", memcmp(buf, orig, sz) == 0);

    /* Corrupt a byte and verify detection */
    memcpy(buf, orig, sz);
    len = sz;
    do_cook(&ctx, buf, len);
    buf[0] ^= 0x01;
    rc = de_cook(&ctx, buf, len);
    TEST("checksum detects corruption", rc != 0);

    return failures;
}

static int test_cook_disabled() {
    int failures = 0;
    cook_ctx_t ctx = {};
    ctx.iv_min = 4;
    ctx.iv_max = 32;
    ctx.disable_checksum = 1;
    ctx.disable_obscure = 1;
    ctx.disable_xor = 1;

    char buf[256];
    int sz = 100;
    for (int i = 0; i < sz; i++) buf[i] = (char)i;
    char orig[256];
    memcpy(orig, buf, sz);

    int len = sz;
    do_cook(&ctx, buf, len);
    TEST("all disabled: length unchanged", len == sz);
    TEST("all disabled: data unchanged", memcmp(buf, orig, sz) == 0);

    return failures;
}

int run_packet_tests() {
    int failures = 0;

    printf("[cook round-trip]\n");
    failures += test_cook_roundtrip();

    printf("[cook checksum only]\n");
    failures += test_cook_checksum_only();

    printf("[cook all disabled]\n");
    failures += test_cook_disabled();

    return failures;
}
