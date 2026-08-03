#include "bench_common.h"
#include <cstdio>
#include <cstdlib>
#include <cstring>

#define TEST(name, expr) do { \
    if (!(expr)) { printf("  FAIL: %s\n", name); failures++; } \
    else { printf("  ok:   %s\n", name); } \
} while(0)

/*
 * Which path the dispatcher chooses is a separate claim from whether each path
 * is correct, and it is the one that broke: the SSSE3 multiply was right, and
 * choosing it on a CPU without SSSE3 was wrong. The tier comparisons cannot see
 * that, because they pin a tier instead of letting the dispatcher choose, and a
 * runner with every feature always chooses the top one.
 *
 * So the answer is held against a stated expectation. CI runs this binary under
 * a QEMU CPU model and names the path that model must yield, which turns each
 * model into a check rather than a report.
 */
static int check_expectation(const char *var, const char *got)
{
    int failures = 0;
    const char *want = getenv(var);
    char label[160];

    if (want == NULL || *want == '\0') {
        printf("  skip: %s unset, dispatch not held to a CPU model\n", var);
        return 0;
    }

    snprintf(label, sizeof(label), "%s=%s and dispatch chose %s", var, want, got);
    TEST(label, strcmp(want, got) == 0);
    return failures;
}

int run_dispatch_tests()
{
    int failures = 0;
    const char *addmul1 = bench_addmul1_auto();
    const char *xor_tile = bench_xor_tile_auto();
    const char *crc32c = bench_crc32c_auto();

    printf("  addmul1 dispatches to %s\n", addmul1);
    printf("  xor_tile dispatches to %s\n", xor_tile);
    printf("  crc32c dispatches to %s\n", crc32c);

    failures += check_expectation("EXPECT_ADDMUL1", addmul1);
    failures += check_expectation("EXPECT_XOR_TILE", xor_tile);
    failures += check_expectation("EXPECT_CRC32C", crc32c);

    return failures;
}
