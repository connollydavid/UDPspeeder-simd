/*
 * socket_marks.h: the operator's per-packet classification of the tunnel's
 * outer traffic -- a routing mark, a packet-filter cookie and a
 * differentiated-services code point. The executable form of
 * socket_marks.allium: zero means untouched, a nonzero mark the host cannot
 * stamp refuses startup (mark_supported answers before any socket exists),
 * and apply_socket_marks dresses every data socket before first traffic.
 *
 * Self-contained by design: the bench test build links socket_marks.cpp
 * alone, so this header includes nothing beyond the sockets API and never
 * drags the event loop behind it. C linkage throughout so the bench
 * declarations and the program agree on symbols.
 */
#ifndef SOCKET_MARKS_H
#define SOCKET_MARKS_H

#include <string.h>
#include <stdlib.h>
#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#else
#include <sys/socket.h>
#include <netinet/in.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Set by process_arg; zero means untouched. u32_t is `unsigned int`. */
extern unsigned int fwmark;
extern unsigned int filter_cookie;
extern unsigned int dscp;

/* What this host can stamp, as macros: the bench tests ask them so their
 * expectations can never disagree with the implementation's gates. */
#if defined(SO_MARK)
#define MARKS_HAVE_FWMARK 1
#endif
#if defined(SO_USER_COOKIE)
#define MARKS_HAVE_COOKIE 1
#endif
#if !defined(_WIN32) && (defined(IP_TOS) || defined(IPV6_TCLASS))
#define MARKS_HAVE_DSCP 1
#endif

/*
 * Parse a mark value: decimal or 0x hex, at most `max`. Returns 0 and stores
 * through `out` on success; returns -1 on anything else -- empty, garbage,
 * trailing characters, a sign, or a value above `max`. A negative argument
 * is garbage, not a wrapped unsigned value.
 */
int parse_mark_value(const char *s, unsigned int max, unsigned int *out);

/*
 * Whether this host can stamp the named mark ("fwmark", "cookie", "dscp")
 * on the tunnel's data sockets. Answered from what the platform headers
 * define, so the refusal is a compile-time fact, not a runtime surprise.
 */
int mark_supported(const char *name);

/*
 * Stamp the configured marks on one socket. Returns 0 when the socket is
 * dressed (or nothing is configured), -1 when a stamp the host seemed to
 * offer fails; callers treat -1 as fatal. `family` is the socket's AF_*.
 */
int apply_socket_marks(int fd, int family);

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif /* SOCKET_MARKS_H */

#ifdef SOCKET_MARKS_IMPLEMENTATION

#include <errno.h>

#ifdef __cplusplus
extern "C" {
#endif

int parse_mark_value(const char *s, unsigned int max, unsigned int *out) {
    char *end = 0;
    unsigned long v;

    if (!s || *s == '\0' || *s <= ' ' || *s == '-' || *s == '+')
        return -1;
    errno = 0;
    v = strtoul(s, &end, 0);
    if (errno != 0 || end == s || *end != '\0')
        return -1;
    if (v > (unsigned long)max)
        return -1;
    *out = (unsigned int)v;
    return 0;
}

int mark_supported(const char *name) {
#ifdef MARKS_HAVE_FWMARK
    if (strcmp(name, "fwmark") == 0)
        return 1;
#endif
#ifdef MARKS_HAVE_COOKIE
    if (strcmp(name, "cookie") == 0)
        return 1;
#endif
#ifdef MARKS_HAVE_DSCP
    if (strcmp(name, "dscp") == 0)
        return 1;
#endif
    return 0;
}

int apply_socket_marks(int fd, int family) {
    if (fwmark
#ifdef MARKS_HAVE_FWMARK
        && setsockopt(fd, SOL_SOCKET, SO_MARK, &fwmark, sizeof(fwmark)) < 0
#endif
    )
        return -1;
    if (filter_cookie
#ifdef MARKS_HAVE_COOKIE
        && setsockopt(fd, SOL_SOCKET, SO_USER_COOKIE, &filter_cookie, sizeof(filter_cookie)) < 0
#endif
    )
        return -1;
#ifdef MARKS_HAVE_DSCP
    if (dscp) {
        int v = (int)(dscp << 2);
        if (family == AF_INET6) {
#ifdef IPV6_TCLASS
            if (setsockopt(fd, IPPROTO_IPV6, IPV6_TCLASS, &v, sizeof(v)) < 0)
                return -1;
#endif
        } else {
#ifdef IP_TOS
            if (setsockopt(fd, IPPROTO_IP, IP_TOS, &v, sizeof(v)) < 0)
                return -1;
#endif
        }
    }
#endif
    return 0;
}

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif /* SOCKET_MARKS_IMPLEMENTATION */
