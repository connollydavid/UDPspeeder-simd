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
/*
 * An unset expectation used to pass, which made the whole mechanism fail open:
 * misspell EXPECT_XOR_TILE in the workflow and the check disappears while the
 * job stays green, the same hollow green a skipped test gives. So a caller that
 * means to hold the dispatch says so once, with EXPECT_DISPATCH_HELD, and then
 * every expectation must be named. "any" is how it declines to hold one, and it
 * has to be written down rather than left off. A bare local run sets none of
 * this and still gets the report.
 */
static int expectations_are_held(void)
{
    const char *gate = getenv("EXPECT_DISPATCH_HELD");
    return gate != NULL && *gate != '\0';
}

static int check_expectation(const char *var, const char *got)
{
    int failures = 0;
    const char *want = getenv(var);
    char label[160];

    if (want == NULL || *want == '\0') {
        if (expectations_are_held()) {
            printf("  FAIL: %s is unset under EXPECT_DISPATCH_HELD;"
                   " name the path, or say \"any\" to decline\n", var);
            return 1;
        }
        printf("  skip: %s unset, dispatch not held to a CPU model\n", var);
        return 0;
    }

    if (strcmp(want, "any") == 0) {
        printf("  ok:   %s=any, %s stands unheld by choice\n", var, got);
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
