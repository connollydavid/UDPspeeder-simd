/*
 * Socket-marks tests: the executable form of socket_marks.allium.
 *
 * They are red until the marks surface exists: the externs below name the
 * designed functions and variables, and against unmodified sources the test
 * binary fails to link with undefined references naming exactly that surface.
 * Each test carries the `fn` marker comment the obligations matcher reads.
 *
 * Platform expectations self-adjust: on a host that can stamp a mark the
 * apply test asserts the stamp is on the socket, and on a host that cannot,
 * the support test asserts the refusal is honest.
 */
#include "bench_common.h"

#include <cstdio>
#include <cstring>

#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

/* The designed surface, declared here so the link failure is the red.
 * u32_t is `unsigned int` in common.h; the same type, spelled plainly. */
extern unsigned int fwmark;
extern unsigned int filter_cookie;
extern unsigned int dscp;
extern "C" int parse_mark_value(const char *s, unsigned int max, unsigned int *out);
extern "C" int apply_socket_marks(int fd, int family);
extern "C" int mark_supported(const char *name);

#define TEST(name, expr) do { \
    if (!(expr)) { printf("  FAIL: %s\n", name); failures++; } \
    else { printf("  ok:   %s\n", name); } \
} while (0)

/* fn test_mark_parse_accept(...) */
static int test_mark_parse_accept() {
    int failures = 0;
    unsigned int v = 0;

    TEST("decimal", parse_mark_value("255", 0xffffffffu, &v) == 0 && v == 255);
    TEST("hex lower", parse_mark_value("0x2", 0xffffffffu, &v) == 0 && v == 2);
    TEST("hex upper", parse_mark_value("0XFF", 0xffffffffu, &v) == 0 && v == 255);
    TEST("u32 max", parse_mark_value("4294967295", 0xffffffffu, &v) == 0 && v == 0xffffffffu);
    TEST("dscp ef", parse_mark_value("46", 63, &v) == 0 && v == 46);
    return failures;
}

/* fn test_mark_parse_reject(...) */
static int test_mark_parse_reject() {
    int failures = 0;
    unsigned int v = 0;

    TEST("empty", parse_mark_value("", 0xffffffffu, &v) != 0);
    TEST("garbage", parse_mark_value("cheese", 0xffffffffu, &v) != 0);
    TEST("trailing", parse_mark_value("12x", 0xffffffffu, &v) != 0);
    TEST("negative wraps", parse_mark_value("-5", 0xffffffffu, &v) != 0);
    TEST("overflow", parse_mark_value("4294967296", 0xffffffffu, &v) != 0);
    TEST("dscp over 63", parse_mark_value("64", 63, &v) != 0);
    TEST("space padded", parse_mark_value(" 12", 0xffffffffu, &v) != 0);
    return failures;
}

/* fn test_zero_leaves_untouched(...) */
static int test_zero_leaves_untouched() {
    int failures = 0;
    fwmark = 0;
    filter_cookie = 0;
    dscp = 0;

    int fd = socket(AF_INET, SOCK_DGRAM, 0);
    TEST("socket created", fd >= 0);
    if (fd < 0) return failures + 1;
    TEST("apply is a no-op", apply_socket_marks(fd, AF_INET) == 0);
#ifdef SO_MARK
    unsigned int got = 1;
    socklen_t n = sizeof(got);
    TEST("mark is zero", getsockopt(fd, SOL_SOCKET, SO_MARK, &got, &n) == 0 && got == 0);
#endif
    close(fd);
    return failures;
}

/* fn test_fwmark_applied(...) */
static int test_fwmark_applied() {
    int failures = 0;
#ifdef SO_MARK
    fwmark = 0x2;
    int fd = socket(AF_INET, SOCK_DGRAM, 0);
    TEST("socket created", fd >= 0);
    if (fd < 0) return failures + 1;
    TEST("apply succeeds", apply_socket_marks(fd, AF_INET) == 0);
    unsigned int got = 0;
    socklen_t n = sizeof(got);
    TEST("mark is on the socket",
         getsockopt(fd, SOL_SOCKET, SO_MARK, &got, &n) == 0 && got == 0x2);
    close(fd);
#else
    TEST("fwmark unsupported here", mark_supported("fwmark") == 0);
#endif
    fwmark = 0;
    return failures;
}

/* fn test_dscp_applied_v4(...) */
static int test_dscp_applied_v4() {
    int failures = 0;
#ifdef IP_TOS
    dscp = 46;
    int fd = socket(AF_INET, SOCK_DGRAM, 0);
    TEST("socket created", fd >= 0);
    if (fd < 0) return failures + 1;
    TEST("apply succeeds", apply_socket_marks(fd, AF_INET) == 0);
    int tos = 0;
    socklen_t n = sizeof(tos);
    TEST("tos carries ef",
         getsockopt(fd, IPPROTO_IP, IP_TOS, &tos, &n) == 0 && tos == (46 << 2));
    close(fd);
#else
    TEST("dscp unsupported here", mark_supported("dscp") == 0);
#endif
    dscp = 0;
    return failures;
}

/* fn test_dscp_applied_v6(...) */
static int test_dscp_applied_v6() {
    int failures = 0;
#ifdef IPV6_TCLASS
    dscp = 46;
    int fd = socket(AF_INET6, SOCK_DGRAM, 0);
    TEST("socket created", fd >= 0);
    if (fd < 0) return failures + 1;
    TEST("apply succeeds", apply_socket_marks(fd, AF_INET6) == 0);
    int tc = 0;
    socklen_t n = sizeof(tc);
    TEST("tclass carries ef",
         getsockopt(fd, IPPROTO_IPV6, IPV6_TCLASS, &tc, &n) == 0 && tc == (46 << 2));
    close(fd);
#else
    TEST("dscp v6 unsupported here", mark_supported("dscp") == 0);
#endif
    dscp = 0;
    return failures;
}

/* fn test_mark_support_honest(...) */
static int test_mark_support_honest() {
    int failures = 0;
#ifdef SO_MARK
    TEST("fwmark supported", mark_supported("fwmark") == 1);
#else
    TEST("fwmark refused", mark_supported("fwmark") == 0);
#endif
#ifdef SO_USER_COOKIE
    TEST("cookie supported", mark_supported("cookie") == 1);
#else
    TEST("cookie refused", mark_supported("cookie") == 0);
#endif
#ifdef IP_TOS
    TEST("dscp supported", mark_supported("dscp") == 1);
#else
    TEST("dscp refused", mark_supported("dscp") == 0);
#endif
    return failures;
}

/* fn test_repoint_mark_persistence(...) */
static int test_repoint_mark_persistence() {
    int failures = 0;
    /* A re-point is a new socket for the same tunnel; both carry the marks. */
    fwmark = 0x2;
#ifdef SO_MARK
    int a = socket(AF_INET, SOCK_DGRAM, 0);
    int b = socket(AF_INET, SOCK_DGRAM, 0);
    TEST("both sockets created", a >= 0 && b >= 0);
    if (a >= 0 && b >= 0) {
        TEST("first carries", apply_socket_marks(a, AF_INET) == 0);
        TEST("second carries", apply_socket_marks(b, AF_INET) == 0);
        unsigned int ga = 0, gb = 0;
        socklen_t n = sizeof(ga);
        getsockopt(a, SOL_SOCKET, SO_MARK, &ga, &n);
        n = sizeof(gb);
        getsockopt(b, SOL_SOCKET, SO_MARK, &gb, &n);
        TEST("both marked", ga == 0x2 && gb == 0x2);
        close(a);
        close(b);
    } else {
        failures++;
        if (a >= 0) close(a);
        if (b >= 0) close(b);
    }
#else
    TEST("fwmark refused on re-point", mark_supported("fwmark") == 0);
#endif
    fwmark = 0;
    return failures;
}

int run_socket_marks_tests() {
    int failures = 0;

    printf("=== Socket Marks Tests ===\n");
    failures += test_mark_parse_accept();
    failures += test_mark_parse_reject();
    failures += test_zero_leaves_untouched();
    failures += test_fwmark_applied();
    failures += test_dscp_applied_v4();
    failures += test_dscp_applied_v6();
    failures += test_mark_support_honest();
    failures += test_repoint_mark_persistence();
    return failures;
}
