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
/* The qWAVE declarations (QOS_FLOWID and friends) sit behind the Vista
 * floor in some MinGW headers; set it before winsock loads. */
#ifndef _WIN32_WINNT
#define _WIN32_WINNT 0x0600
#endif
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
 *
 * On Windows the routing mark and the filter cookie have no mechanism and
 * are refused at parse time; dscp has no per-socket stamp either (the
 * socket option there succeeds without marking anything), so it rides the
 * qWAVE flow API instead -- see track_dscp_destination, which the caller
 * invokes with the connected socket's destination.
 */
int apply_socket_marks(int fd, int family);

#ifdef _WIN32
/*
 * Dress the connected socket with the configured dscp through the qWAVE
 * flow API: the socket joins a flow to `dest` and the flow carries the
 * DSCP value, because the per-socket option on Windows succeeds without
 * marking anything. Returns 0 when the flow carries the value, -1 when
 * qWAVE cannot be reached. Called at every connected-socket creation, so
 * a tunnel re-point re-tracks the new destination by construction.
 */
int track_dscp_socket(SOCKET fd, const struct sockaddr *dest, int dest_len);
#endif

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif /* SOCKET_MARKS_H */

#ifdef SOCKET_MARKS_IMPLEMENTATION

#include <errno.h>

#ifdef _WIN32
/* Minimal qWAVE declarations. Some MinGW-w64 headers ship a qos2.h whose
 * prototypes reference a QOS_FLOWID the same header never declares, so it
 * does not compile under those toolchains at all; the surface we need is
 * declared here, ABI-exact, against qwave.lib directly. */
#ifdef __cplusplus
extern "C" {
#endif
typedef struct { unsigned short MajorVersion, MinorVersion; } qwave_version_t;
typedef unsigned int qwave_flow_id_t;
#define QWAVE_BEST_EFFORT 0
#define QWAVE_SETFLOW_DSCP 2
/* QOS_NON_ADAPTIVE_FLOW: skip qWAVE's path estimation. The estimation
 * machinery refuses to run in some hosted environments (Azure Windows
 * runners answer ERROR_NOT_SUPPORTED for every adaptive flow), while
 * non-adaptive flows are admitted everywhere we probed, privileged or
 * not. A tunnel wants the stamp, not the estimate. */
#define QWAVE_NON_ADAPTIVE 2
extern WINBOOL WINAPI QOSCreateHandle(const qwave_version_t *, HANDLE *);
extern WINBOOL WINAPI QOSAddSocketToFlow(HANDLE, SOCKET, const void *, int, unsigned long, qwave_flow_id_t *);
extern WINBOOL WINAPI QOSSetFlow(HANDLE, qwave_flow_id_t, int, unsigned long, void *, unsigned long, void *);
#ifdef __cplusplus
}
#endif
#endif

#ifdef __cplusplus
extern "C" {
#endif

#ifdef _WIN32
/* The qWAVE handle is created lazily and left to process exit, which the
 * OS reaps; there is no teardown path that outlives the tunnel. */
static HANDLE windows_qos_handle(void) {
    static HANDLE qos = INVALID_HANDLE_VALUE;
    static int probed = 0;
    const qwave_version_t v = { 1, 0 };
    if (!probed) {
        probed = 1;
        if (QOSCreateHandle(&v, &qos) == 0)
            qos = INVALID_HANDLE_VALUE;
    }
    return qos;
}

static int windows_qwave_available(void) {
    return windows_qos_handle() != INVALID_HANDLE_VALUE;
}

int track_dscp_socket(SOCKET fd, const struct sockaddr *dest, int dest_len) {
    HANDLE qos = windows_qos_handle();
    qwave_flow_id_t flow = 0;
    DWORD value;
    (void)dest_len;
    /* Stage-coded so a failure names where qWAVE gave up: -1 no service
     * behind the handle, -2 the socket never joined a flow, -3 the flow
     * would not carry the value. */
    if (qos == INVALID_HANDLE_VALUE)
        return -1;
    if (QOSAddSocketToFlow(qos, fd, dest, QWAVE_BEST_EFFORT, QWAVE_NON_ADAPTIVE, &flow) == 0)
        return -2;
    value = dscp;
    if (QOSSetFlow(qos, flow, QWAVE_SETFLOW_DSCP, sizeof(value), &value, 0, 0) == 0)
        return -3;
    return 0;
}
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
#if defined(MARKS_HAVE_DSCP)
    if (strcmp(name, "dscp") == 0)
        return 1;
#endif
#if defined(_WIN32)
    /* dscp rides qWAVE here, and the answer is probed rather than assumed:
     * wine ships no qWAVE service, and a claimed support the host cannot
     * back would break the honor-or-refuse contract exactly where it
     * matters. */
    if (strcmp(name, "dscp") == 0)
        return windows_qwave_available();
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
