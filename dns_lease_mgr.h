/*
 * dns_lease_mgr.h -- a nonblocking, TTL-aware DNS Locator-Hint Cache.
 *
 * This is a bootstrap locator-hint service, not a general resolver. It resolves
 * one hostname to candidate IP addresses (A/AAAA, at most DNS_LEASE_MAX_HINTS),
 * leases them for an effective TTL, refreshes before expiry, and hands the
 * candidates to the caller. DNS is treated as an untrusted, mutable hint source:
 * the caller tests the candidates through its own data plane.
 *
 * Negative constraints (from the C11 specification this header was imported
 * from, preserved unchanged in the C++ dialect this project builds):
 *   - no dynamic allocation (no malloc/free/new/delete);
 *   - no standard string functions (memcpy/memmove/memcmp/memset only);
 *   - no OS resolver APIs (no getaddrinfo/gethostbyname/res_query);
 *   - no threads, mutexes, atomics or signals;
 *   - no recursion, no longjmp/setjmp;
 *   - no floating-point math;
 *   - no unaligned reads or struct casting for wire parsing (manual byte shift);
 *   - no global mutable state (all state lives in the caller-provided ctx);
 *   - no stdio in the protocol path (resolv.conf is read via open/read/close;
 *     logging is a caller-supplied callback).
 *
 * All functions are static inline; include the header in exactly the translation
 * units that use it. The context is fixed-size and caller-owned.
 *
 * Wire-format references: RFC 1035 (layout, QNAME, compression pointers, the
 * 512-octet UDP limit and the TC bit), RFC 2308 (negative caching: an NXDOMAIN or
 * NODATA answer is cached only when the authority section carries an SOA, and the
 * negative TTL is capped), RFC 2181 (5.2 lowest TTL in an RRSet governs, 8 a TTL
 * with the MSB set reads as zero), RFC 8767 (serving stale data).
 */

#ifndef DNS_LEASE_MGR_H
#define DNS_LEASE_MGR_H

#include <stdint.h>
#include <string.h> /* memcpy, memmove, memcmp, memset */

#if defined(_WIN32)
#include <winsock2.h>
#include <ws2tcpip.h>
#include <windows.h>
#else
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <fcntl.h>
#include <time.h>
#include <errno.h>
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* ------------------------------------------------------------------ */
/* Constants                                                          */
/* ------------------------------------------------------------------ */

#define DNS_LEASE_MAX_HINTS      8
#define DNS_LEASE_MAX_NS         4
#define DNS_LEASE_MAX_NAME       255   /* octets, the RFC 1035 name limit */
#define DNS_LEASE_UDP_BUF        512   /* RFC 1035: messages over UDP are capped */
#define DNS_LEASE_TCP_BUF        4096  /* TCP fallback receive buffer */
#define DNS_LEASE_NS_PORT        53
#define DNS_LEASE_MAX_PTR_HOPS   16    /* compression-pointer chase limit */
#define DNS_LEASE_MAX_CNAME      8     /* CNAME chain limit */

#define DNS_LEASE_QTYPE_A        1
#define DNS_LEASE_QTYPE_AAAA     28

/* last_result values: DNS RCODEs (0..5) on a parsed response, plus negative */
/* internal results. DNS_LEASE_RCODE_* are the wire RCODEs. */
#define DNS_LEASE_RCODE_NOERROR  0
#define DNS_LEASE_RCODE_FORMERR  1
#define DNS_LEASE_RCODE_SERVFAIL 2
#define DNS_LEASE_RCODE_NXDOMAIN 3
#define DNS_LEASE_RCODE_NOTIMP   4
#define DNS_LEASE_RCODE_REFUSED  5

#define DNS_LEASE_ERR_ID_MISMATCH  (-1)  /* response id != pending id; drop */
#define DNS_LEASE_ERR_TRUNC        (-2)  /* TC set; TCP fallback started */
#define DNS_LEASE_ERR_BAD_RESP     (-3)  /* header failed validation */
#define DNS_LEASE_ERR_NO_NS        (-4)  /* no nameservers configured */
#define DNS_LEASE_ERR_NAMETOOLONG  (-5)
#define DNS_LEASE_ERR_EOOB         (-6)  /* out of bounds while parsing */
#define DNS_LEASE_ERR_CNAME_LOOP   (-7)
#define DNS_LEASE_ERR_TIMEOUT      (-8)
#define DNS_LEASE_ERR_SOCKET       (-9)
#define DNS_LEASE_ERR_SEND         (-10)

/* ------------------------------------------------------------------ */
/* enums                                                              */
/* ------------------------------------------------------------------ */

/* The lease state machine. STALE keeps the last-known candidates servable */
/* while a refresh keeps failing, until the stale window elapses. */
typedef enum dns_lease_state {
    DNS_LEASE_UNRESOLVED = 0,
    DNS_LEASE_RESOLVING,
    DNS_LEASE_VALID,
    DNS_LEASE_REFRESHING,
    DNS_LEASE_STALE,
    DNS_LEASE_NEGATIVE,
    DNS_LEASE_FAILED,
    DNS_LEASE_EXPIRED
} dns_lease_state_t;

/* Which transport is answering the current query. */
typedef enum dns_lease_xport {
    DNS_LEASE_XPORT_NONE = 0,
    DNS_LEASE_XPORT_UDP,
    DNS_LEASE_XPORT_TCP_CONNECTING,
    DNS_LEASE_XPORT_TCP_RECVING
} dns_lease_xport_t;

/* ------------------------------------------------------------------ */
/* types                                                              */
/* ------------------------------------------------------------------ */

typedef uint64_t dns_lease_time_t; /* monotonic milliseconds */

#if defined(_WIN32)
typedef int dns_lease_socklen_t;
#else
typedef socklen_t dns_lease_socklen_t;
#endif

/* One candidate locator. family is AF_INET or AF_INET6; ttl_ms is that RR's */
/* TTL, folded into the lowest-TTL-of-the-set rule (RFC 2181 5.2). */
typedef struct dns_lease_hint {
    uint32_t family;
    uint32_t ttl_ms;
    union {
        uint8_t a4[4];
        uint8_t a6[16];
    } addr;
} dns_lease_hint_t;

/* Fixed-size, caller-owned context: every byte of state lives here. */
typedef struct dns_lease_ctx {
    /* --- config --- */
    char     hostname[DNS_LEASE_MAX_NAME + 1];
    int      hostname_len;
    uint16_t port;
    struct sockaddr_in ns[DNS_LEASE_MAX_NS];  /* IPv4 nameservers (v1) */
    int      ns_count;
    int      ns_index;
    uint32_t min_ttl_ms;        /* floor on the effective TTL, default 30000 */
    uint32_t max_ttl_ms;        /* cap, default 86400000 */
    uint32_t neg_ttl_cap_ms;    /* cap on a cached negative, default 1 hour */
    uint32_t query_timeout_ms;  /* default 2000 */
    uint32_t max_retries;       /* default 3 */
    uint32_t stale_max_ms;      /* stale window; 0 = serve stale indefinitely */
    uint32_t poll_interval_ms;  /* caller's tick cadence, default 400 */
    void   (*log_fn)(int level, const char *msg); /* NULL = silent */
    dns_lease_time_t (*now_fn)(void);             /* NULL = PAL clock */

    /* --- transport --- */
    int      sock_fd;           /* UDP resolver socket, -1 = closed */
    int      sock_ns;           /* nameserver the UDP socket is connected to */
    int      tcp_fd;            /* TCP resolver socket, -1 = closed */
    uint8_t  transport;         /* dns_lease_xport_t */
    uint8_t  pending_qtype;     /* A or AAAA */
    uint8_t  pad[2];
    uint16_t pending_id;
    char     udp_buf[DNS_LEASE_UDP_BUF];
    char     tcp_buf[DNS_LEASE_TCP_BUF];
    int      tcp_len;           /* bytes accumulated in tcp_buf */
    int      tcp_need;          /* expected total, -1 until the prefix is read */

    /* --- lease state --- */
    uint8_t  state;             /* dns_lease_state_t */
    uint8_t  pad2[3];
    dns_lease_time_t query_sent_at;
    dns_lease_time_t lease_expire_at;
    dns_lease_time_t refresh_at;
    dns_lease_time_t negative_expire_at;
    dns_lease_time_t stale_since;
    dns_lease_time_t next_action_at;
    uint32_t retry_count;
    uint32_t hint_count;
    uint32_t hint_ttl_ms;       /* effective (lowest) TTL of the set */
    int      last_result;
    uint64_t rng_state;
    dns_lease_hint_t hints[DNS_LEASE_MAX_HINTS];
} dns_lease_ctx_t;

/* ------------------------------------------------------------------ */
/* Platform Abstraction Layer (PAL): time, rng, sockets, discovery    */
/* ------------------------------------------------------------------ */

/* Monotonic time in milliseconds. */
static inline dns_lease_time_t dns_lease_now_ms(void) {
#if defined(_WIN32)
    LARGE_INTEGER freq, cnt;
    QueryPerformanceFrequency(&freq);
    QueryPerformanceCounter(&cnt);
    return (dns_lease_time_t)((cnt.QuadPart * 1000) / freq.QuadPart);
#else
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return (dns_lease_time_t)ts.tv_sec * 1000u + (dns_lease_time_t)(ts.tv_nsec / 1000000);
#endif
}

/* The ctx's clock: the test override or the PAL clock. */
static inline dns_lease_time_t dns_lease_time_now(const dns_lease_ctx_t *c) {
    return c->now_fn ? c->now_fn() : dns_lease_now_ms();
}

/* Saturating add: a timer deadline must never wrap around to a small value. */
static inline dns_lease_time_t dns_lease_time_add(dns_lease_time_t a, uint64_t ms) {
    if (UINT64_MAX - a < ms)
        return UINT64_MAX;
    return a + ms;
}

/* xorshift64, seeded at init. Good enough for a 16-bit query id; the socket is */
/* connected to the nameserver, so the kernel already filters off-path packets. */
static inline uint64_t dns_lease_rand(dns_lease_ctx_t *c) {
    uint64_t x = c->rng_state;
    x ^= x << 13;
    x ^= x >> 7;
    x ^= x << 17;
    c->rng_state = x;
    return x;
}

static inline void dns_lease_pal_close(int fd) {
#if defined(_WIN32)
    closesocket(fd);
#else
    close(fd);
#endif
}

/* Open a nonblocking UDP or TCP socket. Returns the fd or -1. */
static inline int dns_lease_pal_socket(dns_lease_ctx_t *c, int tcp) {
    (void)c;
#if defined(_WIN32)
    SOCKET s = socket(AF_INET, tcp ? SOCK_STREAM : SOCK_DGRAM, 0);
    if (s == INVALID_SOCKET)
        return -1;
    int fd = (int)s;
    u_long nb = 1;
    ioctlsocket(fd, FIONBIO, &nb);
#else
    int fd = socket(AF_INET, tcp ? SOCK_STREAM : SOCK_DGRAM, 0);
    if (fd < 0)
        return -1;
    int fl = fcntl(fd, F_GETFL, 0);
    fcntl(fd, F_SETFL, fl | O_NONBLOCK);
#if defined(__APPLE__) || defined(__MACH__)
    int one = 1;
    setsockopt(fd, SOL_SOCKET, SO_NOSIGPIPE, &one, sizeof(one));
#endif
#endif
    return fd;
}

/* connect() to the target. Returns 1 = connected now, 0 = in progress (TCP), */
/* -1 = failure. A connected UDP socket filters receives to that one peer. */
static inline int dns_lease_pal_connect(int fd, const struct sockaddr *sa, int tcp) {
    if (connect(fd, sa, sizeof(struct sockaddr_in)) == 0)
        return 1;
#if defined(_WIN32)
    int err = WSAGetLastError();
    if (tcp && (err == WSAEWOULDBLOCK || err == WSAEINPROGRESS))
        return 0;
#else
    if (tcp && (errno == EINPROGRESS || errno == EWOULDBLOCK))
        return 0;
#endif
    return -1;
}

/* send()/recv() with the platform's nonblocking conventions. recv returns 0 */
/* when no data is ready (EAGAIN/EWOULDBLOCK), -1 on a real error. */
static inline int dns_lease_pal_send(int fd, const char *b, int n) {
    int flags = 0;
#if defined(__linux__)
    flags = MSG_NOSIGNAL;
#endif
    return (int)send(fd, b, n, flags);
}

static inline int dns_lease_pal_recv(int fd, char *b, int n) {
    int r = (int)recv(fd, b, n, 0);
    if (r < 0) {
#if defined(_WIN32)
        int err = WSAGetLastError();
        if (err == WSAEWOULDBLOCK)
            return 0;
#else
        if (errno == EAGAIN || errno == EWOULDBLOCK)
            return 0;
#endif
        return -1;
    }
    return r;
}

/* Parse one "nameserver <ip>" line (or a registry token list). */
static inline void dns_lease_add_nameserver(dns_lease_ctx_t *c, const char *tok, int len) {
    if (c->ns_count >= DNS_LEASE_MAX_NS)
        return;
    char ip[64];
    int j = 0;
    while (j < (int)sizeof(ip) - 1 && j < len && tok[j] != ' ' && tok[j] != '\t' &&
           tok[j] != ',' && tok[j] != ';' && tok[j] != '\n' && tok[j] != '\r') {
        ip[j] = tok[j];
        j++;
    }
    ip[j] = 0;
    if (j == 0)
        return;
    struct in_addr a4;
    if (inet_pton(AF_INET, ip, &a4) != 1)
        return; /* IPv4 nameservers only in v1 */
    struct sockaddr_in *sa = &c->ns[c->ns_count];
    memset(sa, 0, sizeof(*sa));
    sa->sin_family = AF_INET;
    sa->sin_port = htons(DNS_LEASE_NS_PORT);
    sa->sin_addr = a4;
    c->ns_count++;
}

static inline void dns_lease_parse_ns_line(dns_lease_ctx_t *c, const char *line, int len) {
    int i = 0;
    while (i < len && (line[i] == ' ' || line[i] == '\t'))
        i++;
    if (len - i < 10 || memcmp(line + i, "nameserver", 10) != 0)
        return;
    i += 10;
    while (i < len && (line[i] == ' ' || line[i] == '\t'))
        i++;
    dns_lease_add_nameserver(c, line + i, len - i);
}

/* Discover the resolver list. POSIX: /etc/resolv.conf read with open/read/close */
/* (no stdio). Windows: the global TCP/IP registry keys, split on space/comma. */
/* Per-interface DNS configuration is a known v1 limitation. */
static inline void dns_lease_discover_nameservers(dns_lease_ctx_t *c) {
    c->ns_count = 0;
    c->ns_index = 0;
#if defined(_WIN32)
    HKEY key;
    if (RegOpenKeyExA(HKEY_LOCAL_MACHINE,
                      "SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters", 0,
                      KEY_READ, &key) != ERROR_SUCCESS)
        return;
    static const char *names[] = {"NameServer", "DhcpNameServer"};
    for (int k = 0; k < 2 && c->ns_count < DNS_LEASE_MAX_NS; k++) {
        char buf[2048];
        DWORD sz = sizeof(buf);
        DWORD type = REG_SZ;
        if (RegQueryValueExA(key, names[k], 0, &type, (LPBYTE)buf, &sz) == ERROR_SUCCESS) {
            int i = 0;
            while (i < (int)sz - 1 && c->ns_count < DNS_LEASE_MAX_NS) {
                while (i < (int)sz - 1 && (buf[i] == ' ' || buf[i] == ',' || buf[i] == '\t' || buf[i] == 0))
                    i++;
                int start = i;
                while (i < (int)sz - 1 && buf[i] != ' ' && buf[i] != ',' && buf[i] != '\t' && buf[i] != 0)
                    i++;
                if (i > start)
                    dns_lease_add_nameserver(c, buf + start, i - start);
            }
        }
    }
    RegCloseKey(key);
#else
    int fd = open("/etc/resolv.conf", O_RDONLY);
    if (fd < 0)
        return;
    char carry[256];
    int carry_len = 0;
    char buf[4096];
    for (;;) {
        int n = (int)read(fd, buf, sizeof(buf));
        if (n <= 0)
            break;
        char *p = buf;
        char *end = buf + n;
        while (carry_len < (int)sizeof(carry) - 1 && p < end && c->ns_count < DNS_LEASE_MAX_NS) {
            char ch = *p++;
            if (ch == '\n') {
                carry[carry_len] = 0;
                dns_lease_parse_ns_line(c, carry, carry_len);
                carry_len = 0;
            } else {
                carry[carry_len++] = ch;
            }
        }
        if (p < end)
            break; /* a line longer than the carry buffer; stop */
    }
    if (carry_len > 0) {
        carry[carry_len] = 0;
        dns_lease_parse_ns_line(c, carry, carry_len);
    }
    close(fd);
#endif
}

/* ------------------------------------------------------------------ */
/* Wire codec: builder and compression-aware name reader              */
/* ------------------------------------------------------------------ */

/* Encode the ctx hostname as QNAME labels. Returns the new position or -1. */
static inline int dns_lease_encode_name(dns_lease_ctx_t *c, char *buf, int buf_len, int pos) {
    const char *name = c->hostname;
    int name_len = c->hostname_len;
    int i = 0;
    while (i < name_len) {
        int label_len = 0;
        while (i + label_len < name_len && name[i + label_len] != '.')
            label_len++;
        if (label_len > 63)
            return -1;
        if (pos + 1 + label_len > DNS_LEASE_MAX_NAME)
            return -1; /* wire name must stay within 255 octets */
        if (pos + 1 + label_len > buf_len)
            return -1;
        buf[pos++] = (char)label_len;
        memcpy(buf + pos, name + i, label_len);
        pos += label_len;
        i += label_len;
        if (i < name_len)
            i++; /* skip the dot */
    }
    if (pos + 1 > DNS_LEASE_MAX_NAME)
        return -1;
    if (pos + 1 > buf_len)
        return -1;
    buf[pos++] = 0; /* root label terminates the name */
    return pos;
}

/* Build a minimal query: 12-octet header, QNAME, QTYPE, QCLASS IN. */
static inline int dns_lease_build_query(dns_lease_ctx_t *c, char *buf, int buf_len,
                                        uint16_t id, uint8_t qtype) {
    if (buf_len < 12)
        return -1;
    buf[0] = (char)(id >> 8);
    buf[1] = (char)(id & 0xFF);
    buf[2] = 0x01; /* RD=1 */
    buf[3] = 0x00;
    buf[4] = 0x00; /* QDCOUNT = 1 */
    buf[5] = 0x01;
    buf[6] = 0x00; /* ANCOUNT = 0 */
    buf[7] = 0x00;
    buf[8] = 0x00; /* NSCOUNT = 0 */
    buf[9] = 0x00;
    buf[10] = 0x00; /* ARCOUNT = 0 */
    buf[11] = 0x00;
    int pos = dns_lease_encode_name(c, buf, buf_len, 12);
    if (pos < 0)
        return -1;
    if (pos + 4 > buf_len)
        return -1;
    buf[pos++] = 0x00;
    buf[pos++] = (char)qtype;
    buf[pos++] = 0x00;
    buf[pos++] = 0x01; /* QCLASS IN */
    return pos;
}

/* Walk a (possibly compressed) domain name. Iterative, bounded; every read is */
/* bounds-checked; a compression pointer must point strictly backwards, which */
/* makes pointer loops impossible. Returns 0 on success, negative on error; */
/* *end_pos is the wire position just past the name. */
static inline int dns_lease_read_name(const char *buf, int buf_len, int pos,
                                      char *out, int out_len, int *end_pos) {
    int cur = pos;
    int jumps = 0;
    int written = 0;
    int jumped = 0;
    for (;;) {
        if (cur < 0 || cur >= buf_len)
            return DNS_LEASE_ERR_EOOB;
        unsigned int b = (unsigned int)(unsigned char)buf[cur];
        if ((b & 0xC0u) == 0xC0u) {
            /* compression pointer: 0xC0 | 14-bit offset from message start */
            if (cur + 1 >= buf_len)
                return DNS_LEASE_ERR_EOOB;
            unsigned int off = ((b & 0x3Fu) << 8) | (unsigned int)(unsigned char)buf[cur + 1];
            if (off >= (unsigned int)cur)
                return DNS_LEASE_ERR_EOOB; /* must point strictly backwards */
            if (!jumped) {
                *end_pos = cur + 2;
                jumped = 1;
            }
            cur = (int)off;
            if (++jumps > DNS_LEASE_MAX_PTR_HOPS)
                return DNS_LEASE_ERR_EOOB;
        } else if (b == 0) {
            if (!jumped)
                *end_pos = cur + 1;
            return written;
        } else if ((b & 0xC0u) == 0u) {
            /* a label: length octet then that many name octets */
            if (b > 63)
                return DNS_LEASE_ERR_EOOB;
            if (cur + 1 + (int)b > buf_len)
                return DNS_LEASE_ERR_EOOB;
            if (written + (int)b + 2 > DNS_LEASE_MAX_NAME + 1)
                return DNS_LEASE_ERR_EOOB;
            if (out && written + (int)b + 1 <= out_len) {
                if (written > 0)
                    out[written++] = '.';
                memcpy(out + written, buf + cur + 1, b);
                written += (int)b;
            } else if (out) {
                return DNS_LEASE_ERR_EOOB; /* caller buffer too small */
            }
            cur += 1 + (int)b;
        } else {
            return DNS_LEASE_ERR_EOOB; /* reserved label type 0x40/0x80 */
        }
    }
}

/* ------------------------------------------------------------------ */
/* UDP / TCP transport helpers                                        */
/* ------------------------------------------------------------------ */

static inline void dns_lease_close_udp(dns_lease_ctx_t *c) {
    if (c->sock_fd >= 0) {
        dns_lease_pal_close(c->sock_fd);
        c->sock_fd = -1;
    }
}

static inline void dns_lease_close_tcp(dns_lease_ctx_t *c) {
    if (c->tcp_fd >= 0) {
        dns_lease_pal_close(c->tcp_fd);
        c->tcp_fd = -1;
    }
}

/* Ensure the UDP socket exists and is connected to ns[ns_index]. */
static inline int dns_lease_udp_send(dns_lease_ctx_t *c, const char *buf, int n) {
    if (c->sock_fd < 0 || c->sock_ns != c->ns_index) {
        dns_lease_close_udp(c);
        c->sock_fd = dns_lease_pal_socket(c, 0);
        if (c->sock_fd < 0) {
            c->last_result = DNS_LEASE_ERR_SOCKET;
            return -1;
        }
        if (dns_lease_pal_connect(c->sock_fd, (const struct sockaddr *)&c->ns[c->ns_index], 0) != 1) {
            dns_lease_close_udp(c);
            c->last_result = DNS_LEASE_ERR_SOCKET;
            return -1;
        }
        c->sock_ns = c->ns_index;
    }
    int r = dns_lease_pal_send(c->sock_fd, buf, n);
    if (r != n) {
        c->last_result = DNS_LEASE_ERR_SEND;
        return -1;
    }
    return n;
}

/* Build and send a query over UDP (or mark FAILED when no nameserver exists). */
static inline int dns_lease_send_query(dns_lease_ctx_t *c) {
    dns_lease_time_t now = dns_lease_time_now(c);
    if (c->ns_count == 0) {
        c->state = DNS_LEASE_FAILED;
        c->last_result = DNS_LEASE_ERR_NO_NS;
        c->next_action_at = dns_lease_time_add(now, c->query_timeout_ms);
        return -1;
    }
    c->pending_id = (uint16_t)(dns_lease_rand(c) & 0xFFFFu);
    int n = dns_lease_build_query(c, c->udp_buf, (int)sizeof(c->udp_buf), c->pending_id, c->pending_qtype);
    if (n < 0) {
        c->last_result = DNS_LEASE_ERR_NAMETOOLONG;
        return -1;
    }
    if (dns_lease_udp_send(c, c->udp_buf, n) != n)
        return -1;
    c->query_sent_at = now;
    c->transport = DNS_LEASE_XPORT_UDP;
    return 0;
}

/* Send the pending query over the TCP socket with its two-octet length prefix. */
static inline int dns_lease_tcp_send_query(dns_lease_ctx_t *c) {
    int n = dns_lease_build_query(c, c->udp_buf, (int)sizeof(c->udp_buf), c->pending_id, c->pending_qtype);
    if (n < 0) {
        c->last_result = DNS_LEASE_ERR_NAMETOOLONG;
        return -1;
    }
    char pfx[2];
    pfx[0] = (char)(n >> 8);
    pfx[1] = (char)(n & 0xFF);
    if (dns_lease_pal_send(c->tcp_fd, pfx, 2) != 2)
        return -1;
    if (dns_lease_pal_send(c->tcp_fd, c->udp_buf, n) != n)
        return -1;
    c->query_sent_at = dns_lease_time_now(c);
    return 0;
}

/* TCP fallback (RFC 1035: retry a truncated query over TCP). The query is sent */
/* with the two-octet length prefix; the response is reassembled in tcp_buf. */
static inline int dns_lease_start_tcp(dns_lease_ctx_t *c) {
    dns_lease_time_t now = dns_lease_time_now(c);
    if (c->ns_count == 0) {
        c->state = DNS_LEASE_FAILED;
        c->last_result = DNS_LEASE_ERR_NO_NS;
        c->next_action_at = dns_lease_time_add(now, c->query_timeout_ms);
        return -1;
    }
    dns_lease_close_udp(c);
    c->tcp_fd = dns_lease_pal_socket(c, 1);
    if (c->tcp_fd < 0) {
        c->last_result = DNS_LEASE_ERR_SOCKET;
        return -1;
    }
    c->tcp_len = 0;
    c->tcp_need = -1;
    int r = dns_lease_pal_connect(c->tcp_fd, (const struct sockaddr *)&c->ns[c->ns_index], 1);
    if (r < 0) {
        dns_lease_close_tcp(c);
        c->last_result = DNS_LEASE_ERR_SOCKET;
        return -1;
    }
    if (r == 1) {
        c->transport = DNS_LEASE_XPORT_TCP_RECVING;
        c->query_sent_at = now;
        return dns_lease_tcp_send_query(c);
    }
    c->transport = DNS_LEASE_XPORT_TCP_CONNECTING;
    c->query_sent_at = now;
    return 0;
}

/* Poll a nonblocking TCP connect that returned EINPROGRESS. */
static inline int dns_lease_poll_tcp_connect(dns_lease_ctx_t *c) {
    int err = 0;
    int elen = sizeof(err);
    if (getsockopt(c->tcp_fd, SOL_SOCKET, SO_ERROR, (char *)&err, (dns_lease_socklen_t *)&elen) != 0) {
        dns_lease_close_tcp(c);
        return -1;
    }
    if (err != 0) {
        dns_lease_close_tcp(c);
        return -1;
    }
    c->transport = DNS_LEASE_XPORT_TCP_RECVING;
    return dns_lease_tcp_send_query(c);
}

/* ------------------------------------------------------------------ */
/* Response parser                                                    */
/* ------------------------------------------------------------------ */

/* A failed query (timeout or a negative RCODE) routes here: with hints servable */
/* we go STALE (keep the last-known candidates); without, we retry, rotating the */
/* nameserver, and give up to FAILED when the retries are exhausted. Forward-   */
/* declared here because the parser below calls it.                             */
static inline void dns_lease_handle_failure(dns_lease_ctx_t *c, dns_lease_time_t now);

/* A bounded negative TTL in milliseconds from the delivered SOA TTL (the */
/* server already applied min(SOA TTL, MINIMUM); we cap against our own). */
static inline dns_lease_time_t dns_lease_neg_ttl_ms(dns_lease_ctx_t *c, uint32_t soa_ttl_sec) {
    uint64_t ms = (uint64_t)soa_ttl_sec * 1000u;
    if (ms > c->neg_ttl_cap_ms)
        ms = c->neg_ttl_cap_ms;
    return (dns_lease_time_t)ms;
}

/* Parse a DNS response. Returns 0 when the response was consumed and the state */
/* machine advanced, a negative error otherwise (an ID mismatch is dropped; a */
/* truncated response starts the TCP fallback). This is also the test/inject hook. */
static inline int dns_lease_parse_response(dns_lease_ctx_t *c, const char *resp, int resp_len) {
    dns_lease_time_t now = dns_lease_time_now(c);
    if (resp_len < 12)
        return DNS_LEASE_ERR_BAD_RESP;

    uint16_t id = (uint16_t)(((unsigned int)(unsigned char)resp[0] << 8) |
                             (unsigned int)(unsigned char)resp[1]);
    if (id != c->pending_id)
        return DNS_LEASE_ERR_ID_MISMATCH;
    uint16_t flags = (uint16_t)(((unsigned int)(unsigned char)resp[2] << 8) |
                                (unsigned int)(unsigned char)resp[3]);
    int qr = (flags >> 15) & 1;
    int rcode = flags & 0x0F;
    int tc = (flags >> 9) & 1;
    uint16_t qd = (uint16_t)(((unsigned int)(unsigned char)resp[4] << 8) |
                             (unsigned int)(unsigned char)resp[5]);
    uint16_t an = (uint16_t)(((unsigned int)(unsigned char)resp[6] << 8) |
                             (unsigned int)(unsigned char)resp[7]);
    uint16_t ns = (uint16_t)(((unsigned int)(unsigned char)resp[8] << 8) |
                             (unsigned int)(unsigned char)resp[9]);
    if (qr != 1)
        return DNS_LEASE_ERR_BAD_RESP;

    int pos = 12;
    char name[DNS_LEASE_MAX_NAME + 1];

    /* question section: skip the QNAME (compression-aware) and QTYPE/QCLASS */
    for (int q = 0; q < qd; q++) {
        int end;
        int r = dns_lease_read_name(resp, resp_len, pos, name, (int)sizeof(name), &end);
        if (r < 0)
            return r;
        pos = end;
        if (pos + 4 > resp_len)
            return DNS_LEASE_ERR_EOOB;
        pos += 4;
    }

    if (tc) {
        /* RFC 1035: a truncated response is retried over TCP */
        if (c->transport == DNS_LEASE_XPORT_UDP)
            dns_lease_start_tcp(c);
        return DNS_LEASE_ERR_TRUNC;
    }

    dns_lease_hint_t fresh[DNS_LEASE_MAX_HINTS];
    int fresh_count = 0;
    uint32_t min_ttl = UINT32_MAX;
    uint32_t soa_ttl = 0;
    int have_soa = 0;

    /* answer section */
    for (int i = 0; i < an; i++) {
        int end;
        int r = dns_lease_read_name(resp, resp_len, pos, name, (int)sizeof(name), &end);
        if (r < 0)
            return r;
        pos = end;
        if (pos + 10 > resp_len)
            return DNS_LEASE_ERR_EOOB;
        uint16_t type = (uint16_t)(((unsigned int)(unsigned char)resp[pos] << 8) |
                                   (unsigned int)(unsigned char)resp[pos + 1]);
        uint16_t cls = (uint16_t)(((unsigned int)(unsigned char)resp[pos + 2] << 8) |
                                  (unsigned int)(unsigned char)resp[pos + 3]);
        uint32_t ttl = ((unsigned int)(unsigned char)resp[pos + 4] << 24) |
                       ((unsigned int)(unsigned char)resp[pos + 5] << 16) |
                       ((unsigned int)(unsigned char)resp[pos + 6] << 8) |
                       (unsigned int)(unsigned char)resp[pos + 7];
        uint16_t rdlen = (uint16_t)(((unsigned int)(unsigned char)resp[pos + 8] << 8) |
                                    (unsigned int)(unsigned char)resp[pos + 9]);
        pos += 10;
        if (pos + rdlen > resp_len)
            return DNS_LEASE_ERR_EOOB;
        if (cls != 1) { /* not IN: skip the RDATA */
            pos += rdlen;
            continue;
        }
        /* RFC 2181 8: a TTL with the MSB set reads as zero */
        if (ttl & 0x80000000u)
            ttl = 0;
        if (ttl < min_ttl)
            min_ttl = ttl;
        if (type == DNS_LEASE_QTYPE_A || type == DNS_LEASE_QTYPE_AAAA) {
            int want = (type == DNS_LEASE_QTYPE_A) ? 4 : 16;
            uint32_t fam = (type == DNS_LEASE_QTYPE_A) ? (uint32_t)AF_INET : (uint32_t)AF_INET6;
            if (rdlen == (uint16_t)want && fresh_count < DNS_LEASE_MAX_HINTS) {
                int dup = 0;
                for (int k = 0; k < fresh_count; k++) {
                    if (fresh[k].family == fam && memcmp(fresh[k].addr.a6, resp + pos, want) == 0) {
                        dup = 1;
                        break;
                    }
                }
                if (!dup) {
                    fresh[fresh_count].family = fam;
                    fresh[fresh_count].ttl_ms = ttl;
                    memcpy(fresh[fresh_count].addr.a6, resp + pos, want);
                    fresh_count++;
                }
            }
        }
        /* CNAME records contribute their TTL to the lowest-TTL fold; the final */
        /* A/AAAA records of the chain are the hints. */
        pos += rdlen;
    }

    /* authority section: the SOA carries the negative TTL (RFC 2308) */
    for (int i = 0; i < ns; i++) {
        int end;
        int r = dns_lease_read_name(resp, resp_len, pos, name, (int)sizeof(name), &end);
        if (r < 0)
            return r;
        pos = end;
        if (pos + 10 > resp_len)
            return DNS_LEASE_ERR_EOOB;
        uint16_t type = (uint16_t)(((unsigned int)(unsigned char)resp[pos] << 8) |
                                   (unsigned int)(unsigned char)resp[pos + 1]);
        uint32_t ttl = ((unsigned int)(unsigned char)resp[pos + 4] << 24) |
                       ((unsigned int)(unsigned char)resp[pos + 5] << 16) |
                       ((unsigned int)(unsigned char)resp[pos + 6] << 8) |
                       (unsigned int)(unsigned char)resp[pos + 7];
        uint16_t rdlen = (uint16_t)(((unsigned int)(unsigned char)resp[pos + 8] << 8) |
                                    (unsigned int)(unsigned char)resp[pos + 9]);
        pos += 10;
        if (pos + rdlen > resp_len)
            return DNS_LEASE_ERR_EOOB;
        if (type == 6) { /* SOA */
            soa_ttl = ttl;
            have_soa = 1;
        }
        pos += rdlen;
    }

    c->last_result = rcode;

    if (rcode == 0 && fresh_count > 0) {
        /* A valid lease: lowest TTL in the RRSet governs (RFC 2181 5.2), */
        /* converted from wire seconds to milliseconds, then clamped to */
        /* [min_ttl_ms, max_ttl_ms]. */
        uint64_t eff_ms = (uint64_t)min_ttl * 1000u;
        if (eff_ms > c->max_ttl_ms)
            eff_ms = c->max_ttl_ms;
        if (eff_ms < c->min_ttl_ms)
            eff_ms = c->min_ttl_ms;
        memcpy(c->hints, fresh, sizeof(dns_lease_hint_t) * fresh_count);
        c->hint_count = fresh_count;
        c->hint_ttl_ms = (uint32_t)eff_ms;
        c->lease_expire_at = dns_lease_time_add(now, eff_ms);
        c->refresh_at = c->lease_expire_at - eff_ms / 2u; /* RFC 8767 lead */
        c->retry_count = 0;
        c->stale_since = 0;
        c->state = DNS_LEASE_VALID;
        return 0;
    }

    if (rcode == 0) {
        /* NODATA: no answer records. An A query gets re-issued as AAAA before */
        /* the pair is declared negative. */
        if (c->pending_qtype == DNS_LEASE_QTYPE_A) {
            c->pending_qtype = DNS_LEASE_QTYPE_AAAA;
            dns_lease_send_query(c);
            return 0;
        }
        if (have_soa) {
            c->negative_expire_at = dns_lease_time_add(now, dns_lease_neg_ttl_ms(c, soa_ttl));
            c->hint_count = 0;
            c->state = DNS_LEASE_NEGATIVE;
            return 0;
        }
        dns_lease_handle_failure(c, now);
        return 0;
    }

    if (rcode == 3) { /* NXDOMAIN: the name is gone; no point asking AAAA */
        if (have_soa) {
            c->negative_expire_at = dns_lease_time_add(now, dns_lease_neg_ttl_ms(c, soa_ttl));
            c->hint_count = 0;
            c->state = DNS_LEASE_NEGATIVE;
            return 0;
        }
        dns_lease_handle_failure(c, now);
        return 0;
    }

    /* FORMERR/SERVFAIL/NOTIMP/REFUSED: transient, retry */
    dns_lease_handle_failure(c, now);
    return 0;
}

/* ------------------------------------------------------------------ */
/* Failure handling and the tick                                       */
/* ------------------------------------------------------------------ */

/* A query failed (timeout or a negative RCODE). With hints servable we go */
/* STALE (keep the last-known candidates); without, we retry, rotating the */
/* nameserver, and give up to FAILED when the retries are exhausted. */
static inline void dns_lease_handle_failure(dns_lease_ctx_t *c, dns_lease_time_t now) {
    dns_lease_close_tcp(c);
    if (c->hint_count > 0) {
        if (c->stale_since == 0)
            c->stale_since = now;
        c->state = DNS_LEASE_STALE;
        c->next_action_at = dns_lease_time_add(now, (uint64_t)c->query_timeout_ms * 4u);
        return;
    }
    c->retry_count++;
    if (c->retry_count > (uint32_t)c->max_retries) {
        c->state = DNS_LEASE_FAILED;
        c->next_action_at = dns_lease_time_add(now, c->query_timeout_ms);
        return;
    }
    if (c->ns_count > 0)
        c->ns_index = (c->ns_index + 1) % c->ns_count;
    dns_lease_send_query(c);
}

/* Drive the state machine. Call at the poll_interval cadence (or faster). */
static inline int dns_lease_tick(dns_lease_ctx_t *c) {
    dns_lease_time_t now = dns_lease_time_now(c);
    c->last_result = 0;

    /* drain the resolver transport */
    if (c->transport == DNS_LEASE_XPORT_UDP && c->sock_fd >= 0) {
        for (;;) {
            int n = dns_lease_pal_recv(c->sock_fd, c->udp_buf, (int)sizeof(c->udp_buf));
            if (n <= 0)
                break;
            dns_lease_parse_response(c, c->udp_buf, n);
        }
    } else if (c->transport == DNS_LEASE_XPORT_TCP_RECVING && c->tcp_fd >= 0) {
        for (;;) {
            int space = (int)sizeof(c->tcp_buf) - c->tcp_len;
            if (space <= 0)
                break;
            int n = dns_lease_pal_recv(c->tcp_fd, c->tcp_buf + c->tcp_len, space);
            if (n <= 0)
                break;
            c->tcp_len += n;
        }
        if (c->tcp_len >= 2 && c->tcp_need < 0)
            c->tcp_need = ((unsigned char)c->tcp_buf[0] << 8) | (unsigned char)c->tcp_buf[1];
        if (c->tcp_need >= 0 && c->tcp_len >= 2 + c->tcp_need) {
            dns_lease_parse_response(c, c->tcp_buf + 2, c->tcp_need);
            dns_lease_close_tcp(c);
            c->transport = DNS_LEASE_XPORT_NONE;
        }
    }

    switch (c->state) {
    case DNS_LEASE_UNRESOLVED:
        if (now >= c->next_action_at) {
            c->state = DNS_LEASE_RESOLVING;
            dns_lease_send_query(c);
        }
        break;
    case DNS_LEASE_RESOLVING:
    case DNS_LEASE_REFRESHING:
        if (now >= dns_lease_time_add(c->query_sent_at, c->query_timeout_ms)) {
            dns_lease_handle_failure(c, now);
        } else if (c->transport == DNS_LEASE_XPORT_TCP_CONNECTING && c->tcp_fd >= 0) {
            if (dns_lease_poll_tcp_connect(c) < 0)
                dns_lease_handle_failure(c, now);
        }
        break;
    case DNS_LEASE_VALID:
        if (now >= c->refresh_at) {
            c->state = DNS_LEASE_REFRESHING;
            dns_lease_send_query(c);
        }
        break;
    case DNS_LEASE_STALE:
        /* intermittent re-resolve while the last-known candidates stay servable */
        if (now >= c->next_action_at) {
            c->next_action_at = dns_lease_time_add(now, (uint64_t)c->query_timeout_ms * 4u);
            dns_lease_send_query(c);
        }
        if (c->stale_max_ms != 0 && now >= dns_lease_time_add(c->stale_since, c->stale_max_ms)) {
            c->state = DNS_LEASE_EXPIRED;
            c->hint_count = 0;
            c->next_action_at = dns_lease_time_add(now, c->query_timeout_ms);
        }
        break;
    case DNS_LEASE_NEGATIVE:
        if (now >= c->negative_expire_at) {
            c->state = DNS_LEASE_RESOLVING;
            dns_lease_send_query(c);
        }
        break;
    case DNS_LEASE_FAILED:
    case DNS_LEASE_EXPIRED:
        if (now >= c->next_action_at) {
            c->state = DNS_LEASE_RESOLVING;
            dns_lease_send_query(c);
        }
        break;
    default:
        break;
    }
    return c->last_result;
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/* Manual strlen: the header does not call the C library string functions. */
static inline int dns_lease_strlen(const char *s) {
    int n = 0;
    while (s[n])
        n++;
    return n;
}

static inline void dns_lease_init(dns_lease_ctx_t *c, const char *hostname, uint16_t port) {
    memset(c, 0, sizeof(*c));
    c->sock_fd = -1;
    c->sock_ns = -1;
    c->tcp_fd = -1;
    c->transport = DNS_LEASE_XPORT_NONE;
    c->port = port;
    c->min_ttl_ms = 30000;
    c->max_ttl_ms = 86400000;
    c->neg_ttl_cap_ms = 3600000;
    c->query_timeout_ms = 2000;
    c->max_retries = 3;
    c->stale_max_ms = 3600000; /* 1 hour; 0 = serve stale indefinitely */
    c->poll_interval_ms = 400;
    c->state = DNS_LEASE_UNRESOLVED;
    c->pending_qtype = DNS_LEASE_QTYPE_A;
    c->ns_count = 0;
    c->ns_index = 0;
    c->rng_state = dns_lease_now_ms() ^ (uint64_t)(uintptr_t)(void *)c ^ 0x9e3779b97f4a7c15ULL;
    if (hostname) {
        int i = 0;
        while (hostname[i] && i < DNS_LEASE_MAX_NAME) {
            c->hostname[i] = hostname[i];
            i++;
        }
        c->hostname[i] = 0;
        c->hostname_len = i;
    }
}

/* Override the discovered nameservers with explicit IPv4 addresses. */
static inline void dns_lease_set_nameservers(dns_lease_ctx_t *c, const char *const *addrs, int n) {
    c->ns_count = 0;
    c->ns_index = 0;
    for (int i = 0; i < n && c->ns_count < DNS_LEASE_MAX_NS; i++)
        dns_lease_add_nameserver(c, addrs[i], dns_lease_strlen(addrs[i]));
}

/* Copy the servable candidates. Pass out=NULL to count them. Returns the count */
/* (0 when none are servable). */
static inline int dns_lease_get_hints(const dns_lease_ctx_t *c, dns_lease_hint_t *out, int max_out) {
    if (!(c->state == DNS_LEASE_VALID || c->state == DNS_LEASE_REFRESHING || c->state == DNS_LEASE_STALE))
        return 0;
    if (!out)
        return (int)c->hint_count;
    int n = (int)c->hint_count < max_out ? (int)c->hint_count : max_out;
    if (n > 0)
        memcpy(out, c->hints, sizeof(dns_lease_hint_t) * n);
    return n;
}

static inline int dns_lease_get_state(const dns_lease_ctx_t *c) {
    return (int)c->state;
}

static inline int dns_lease_get_last_result(const dns_lease_ctx_t *c) {
    return c->last_result;
}

/* Force an immediate refresh, bypassing the timer. Called when the data plane */
/* signals that the current candidate is dead. */
static inline void dns_lease_force_refresh(dns_lease_ctx_t *c) {
    if (c->state == DNS_LEASE_RESOLVING || c->state == DNS_LEASE_REFRESHING)
        return; /* a query is already in flight */
    c->retry_count = 0;
    if (c->hint_count > 0)
        c->state = DNS_LEASE_REFRESHING;
    else
        c->state = DNS_LEASE_RESOLVING;
    dns_lease_send_query(c);
}

static inline void dns_lease_close(dns_lease_ctx_t *c) {
    dns_lease_close_udp(c);
    dns_lease_close_tcp(c);
    c->transport = DNS_LEASE_XPORT_NONE;
}

/* Test/inject hook: feed a canned response straight to the parser. */
static inline int dns_lease_feed_response(dns_lease_ctx_t *c, const char *resp, int resp_len) {
    return dns_lease_parse_response(c, resp, resp_len);
}

#ifdef __cplusplus
}
#endif

#endif /* DNS_LEASE_MGR_H */