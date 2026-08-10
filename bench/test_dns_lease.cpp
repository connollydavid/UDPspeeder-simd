#include "bench_common.h"
#include "dns_lease_mgr.h"
#include <cstdio>
#include <cstring>
#include <cstdlib>

#define TEST(name, expr) do { \
    if (!(expr)) { printf("  FAIL: %s\n", name); failures++; } \
    else { printf("  ok:   %s\n", name); } \
} while(0)

/*
 * The DNS lease manager is driven entirely offline here: canned wire bytes fed
 * through dns_lease_feed_response, and a fake clock so the TTL timers advance
 * without sleeping. The only real syscalls are the nonblocking sends to
 * 127.0.0.1:53 in the state-machine walk, which is harmless whether or not a
 * local resolver listens there.
 */

static dns_lease_time_t g_fake_now = 0;
static dns_lease_time_t fake_now_fn(void) { return g_fake_now; }

/* ---- canned wire response builders ---- */

struct wire {
    char buf[1024];
    int len;
};

static void w_init(struct wire *w, uint16_t id, int rcode, int tc, int qd, int an, int ns) {
    unsigned flags = 0x8000u | (tc ? 0x0200u : 0u) | (unsigned)(rcode & 0xF);
    w->len = 12;
    w->buf[0] = (char)(id >> 8);
    w->buf[1] = (char)(id & 0xFF);
    w->buf[2] = (char)(flags >> 8);
    w->buf[3] = (char)(flags & 0xFF);
    w->buf[4] = 0;
    w->buf[5] = (char)qd;
    w->buf[6] = 0;
    w->buf[7] = (char)an;
    w->buf[8] = 0;
    w->buf[9] = (char)ns;
    w->buf[10] = 0;
    w->buf[11] = 0;
}

static void w_put_u16(struct wire *w, unsigned v) {
    w->buf[w->len++] = (char)(v >> 8);
    w->buf[w->len++] = (char)(v & 0xFF);
}

static void w_put_u32(struct wire *w, unsigned v) {
    w->buf[w->len++] = (char)(v >> 24);
    w->buf[w->len++] = (char)((v >> 16) & 0xFF);
    w->buf[w->len++] = (char)((v >> 8) & 0xFF);
    w->buf[w->len++] = (char)(v & 0xFF);
}

static void w_put_name(struct wire *w, const char *name) {
    const char *p = name;
    while (*p) {
        const char *dot = strchr(p, '.');
        int l = dot ? (int)(dot - p) : (int)strlen(p);
        w->buf[w->len++] = (char)l;
        memcpy(w->buf + w->len, p, l);
        w->len += l;
        p = dot ? dot + 1 : p + l;
    }
    w->buf[w->len++] = 0;
}

static void w_question(struct wire *w, const char *name, int qtype) {
    w_put_name(w, name);
    w_put_u16(w, (unsigned)qtype);
    w_put_u16(w, 1); /* IN */
}

static void w_rr(struct wire *w, int name_is_ptr, int name_off, const char *name,
                 unsigned type, unsigned ttl, const void *rdata, int rdlen) {
    if (name_is_ptr) {
        w->buf[w->len++] = (char)(0xC0 | (name_off >> 8));
        w->buf[w->len++] = (char)(name_off & 0xFF);
    } else {
        w_put_name(w, name);
    }
    w_put_u16(w, type);
    w_put_u16(w, 1); /* IN */
    w_put_u32(w, ttl);
    w_put_u16(w, (unsigned)rdlen);
    memcpy(w->buf + w->len, rdata, rdlen);
    w->len += rdlen;
}

/* ---- builder tests ---- */

/* fn test_builder(dns_lease_ctx_t *c) */
static int test_builder(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;

    char q[512];
    int n = dns_lease_build_query(c, q, (int)sizeof(q), 0x1357, DNS_LEASE_QTYPE_A);
    TEST("build: query built", n > 12);
    TEST("build: id", n > 0 && (unsigned char)q[0] == 0x13 && (unsigned char)q[1] == 0x57);
    TEST("build: RD set, no recursion-anomalous flags",
         n > 3 && (unsigned char)q[2] == 0x01 && (unsigned char)q[3] == 0x00);
    TEST("build: single question", n > 5 && (unsigned char)q[5] == 0x01);
    /* the QNAME: 3 "vps", 7 "example", 3 "net", 0 */
    TEST("build: first label", n > 12 && (unsigned char)q[12] == 3 &&
         memcmp(q + 13, "vps", 3) == 0);
    TEST("build: second label", n > 16 && (unsigned char)q[16] == 7 &&
         memcmp(q + 17, "example", 7) == 0);
    TEST("build: third label", n > 24 && (unsigned char)q[24] == 3 &&
         memcmp(q + 25, "net", 3) == 0);
    TEST("build: terminator", n > 28 && (unsigned char)q[28] == 0);
    TEST("build: qtype A", n > 30 && (unsigned char)q[29] == 0 && (unsigned char)q[30] == DNS_LEASE_QTYPE_A);
    TEST("build: qclass IN", n > 32 && (unsigned char)q[31] == 0 && (unsigned char)q[32] == 1);

    /* a label longer than 63 octets must be refused by the builder */
    char long_name[200];
    memset(long_name, 'a', 100);
    long_name[100] = 0;
    dns_lease_init(c, long_name, 4096);
    TEST("build: label over 63 refused", dns_lease_build_query(c, q, (int)sizeof(q), 1, DNS_LEASE_QTYPE_A) < 0);

    return failures;
}

/* ---- parser tests ---- */

/* fn test_parser_valid(dns_lease_ctx_t *c) */
static int test_parser_valid(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;

    struct wire w;
    unsigned char a1[4] = {1, 2, 3, 4};
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    TEST("parse: valid consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("parse: state VALID", dns_lease_get_state(c) == DNS_LEASE_VALID);
    TEST("parse: one hint servable", dns_lease_get_hints(c, NULL, 0) == 1);
    dns_lease_hint_t h[8];
    int n = dns_lease_get_hints(c, h, 8);
    TEST("parse: v4 family", n == 1 && h[0].family == (unsigned)AF_INET);
    TEST("parse: address", n == 1 && memcmp(h[0].addr.a4, a1, 4) == 0);
    TEST("parse: effective ttl clamped to floor", c->hint_ttl_ms >= c->min_ttl_ms);

    /* lowest TTL in the RRSet governs (RFC 2181 5.2) */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    unsigned char a2[4] = {5, 6, 7, 8};
    w_init(&w, 0x1234, 0, 0, 1, 2, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    w_rr(&w, 0, 0, "vps.example.net", 1, 100, a2, 4);
    TEST("parse: two A consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("parse: two hints", dns_lease_get_hints(c, NULL, 0) == 2);
    TEST("parse: lowest ttl governs", c->hint_ttl_ms == 100000u);

    /* an AAAA record yields a v6 hint */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    unsigned char a6[16] = {0x20, 0x01, 0x0d, 0xb8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1};
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 28);
    w_rr(&w, 0, 0, "vps.example.net", 28, 300, a6, 16);
    TEST("parse: aaaa consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    n = dns_lease_get_hints(c, h, 8);
    TEST("parse: v6 hint", n == 1 && h[0].family == (unsigned)AF_INET6 &&
         memcmp(h[0].addr.a6, a6, 16) == 0);

    return failures;
}

/* fn test_parser_cname(dns_lease_ctx_t *c) */
static int test_parser_cname(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "alias.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;

    struct wire w;
    unsigned char a1[4] = {9, 9, 9, 9};
    w_init(&w, 0x1234, 0, 0, 1, 2, 0);
    w_question(&w, "alias.example.net", 1);
    /* CNAME alias -> real, then the A record for real */
    w_put_name(&w, "alias.example.net");
    w_put_u16(&w, 5);
    w_put_u16(&w, 1);
    w_put_u32(&w, 200);
    int rdlen_pos = w.len; /* where the rdlen u16 will be written */
    w_put_u16(&w, 0);      /* rdlen placeholder */
    w_put_name(&w, "real.example.net");
    w.buf[rdlen_pos] = (char)((w.len - rdlen_pos - 2) >> 8);
    w.buf[rdlen_pos + 1] = (char)((w.len - rdlen_pos - 2) & 0xFF);
    w_rr(&w, 0, 0, "real.example.net", 1, 100, a1, 4);
    TEST("parse: cname chain consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("parse: cname yields the final A", dns_lease_get_hints(c, NULL, 0) == 1);
    TEST("parse: cname ttl folds into the min", c->hint_ttl_ms == 100000u);

    return failures;
}

/* fn test_parser_compression(dns_lease_ctx_t *c) */
static int test_parser_compression(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;

    struct wire w;
    unsigned char a1[4] = {1, 1, 1, 1};
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    /* the answer name is a pointer back to the QNAME at offset 12 */
    w_rr(&w, 1, 12, NULL, 1, 300, a1, 4);
    TEST("parse: pointer name consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("parse: pointer yields a hint", dns_lease_get_hints(c, NULL, 0) == 1);

    /* a pointer to itself must fail, not loop */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    int self_pos = w.len;
    w_rr(&w, 1, self_pos, NULL, 1, 300, a1, 4); /* pointer to its own position */
    int r = dns_lease_feed_response(c, w.buf, w.len);
    TEST("parse: self pointer fails cleanly", r < 0 && r != 0);

    return failures;
}

/* fn test_parser_negative(dns_lease_ctx_t *c) */
static int test_parser_negative(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "gone.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    c->state = DNS_LEASE_RESOLVING;

    /* NXDOMAIN with an SOA in authority -> negative cache (RFC 2308) */
    struct wire w;
    unsigned char soa_rdata[4] = {0, 0, 0, 0};
    const char *ns[] = {"127.0.0.1"};
    dns_lease_set_nameservers(c, ns, 1);
    w_init(&w, 0x1234, 3, 0, 1, 0, 1);
    w_question(&w, "gone.example.net", 1);
    w_rr(&w, 0, 0, "gone.example.net", 6, 60, soa_rdata, 4);
    TEST("neg: nxdomain consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("neg: state NEGATIVE", dns_lease_get_state(c) == DNS_LEASE_NEGATIVE);
    TEST("neg: no hints servable", dns_lease_get_hints(c, NULL, 0) == 0);
    TEST("neg: soa ttl honoured uncapped", c->negative_expire_at == g_fake_now + 60000u);

    /* a huge SOA TTL is capped at neg_ttl_cap_ms */
    dns_lease_init(c, "gone.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    c->state = DNS_LEASE_RESOLVING;
    dns_lease_set_nameservers(c, ns, 1);
    w_init(&w, 0x1234, 3, 0, 1, 0, 1);
    w_question(&w, "gone.example.net", 1);
    w_rr(&w, 0, 0, "gone.example.net", 6, 1000000u, soa_rdata, 4);
    TEST("neg: huge soa ttl capped", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("neg: cap applied", c->negative_expire_at == g_fake_now + c->neg_ttl_cap_ms);

    /* the negative lease expires back to a fresh resolve */
    g_fake_now += c->neg_ttl_cap_ms + 1;
    dns_lease_tick(c);
    TEST("neg: expires to RESOLVING", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    /* NODATA on an A query re-issues as AAAA (single flight) */
    dns_lease_init(c, "nodata.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    c->state = DNS_LEASE_RESOLVING;
    dns_lease_set_nameservers(c, ns, 1);
    w_init(&w, 0x1234, 0, 0, 1, 0, 1);
    w_question(&w, "nodata.example.net", 1);
    w_rr(&w, 0, 0, "nodata.example.net", 6, 60, soa_rdata, 4);
    TEST("nodata: a-query accepted", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("nodata: re-issued as AAAA", c->pending_qtype == DNS_LEASE_QTYPE_AAAA);
    TEST("nodata: still resolving", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    /* NODATA without an SOA is not cached negative (RFC 2308 5) */
    dns_lease_init(c, "nosoa.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    c->pending_qtype = DNS_LEASE_QTYPE_AAAA;
    c->state = DNS_LEASE_RESOLVING;
    w_init(&w, 0x1234, 0, 0, 1, 0, 0);
    w_question(&w, "nosoa.example.net", 28);
    TEST("nodata: no-soa accepted", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("nodata: no-soa not cached negative", dns_lease_get_state(c) != DNS_LEASE_NEGATIVE);
    TEST("nodata: no-soa counts a retry", c->retry_count == 1);

    return failures;
}

/* fn test_parser_edge(dns_lease_ctx_t *c) */
static int test_parser_edge(dns_lease_ctx_t *c) {
    int failures = 0;

    /* ID mismatch is dropped without touching state */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    c->state = DNS_LEASE_RESOLVING;
    struct wire w;
    unsigned char a1[4] = {1, 2, 3, 4};
    w_init(&w, 0x9999, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    TEST("edge: id mismatch dropped", dns_lease_feed_response(c, w.buf, w.len) == DNS_LEASE_ERR_ID_MISMATCH);
    TEST("edge: state unchanged", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    /* TC=1 starts the TCP fallback (RFC 1035) */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    const char *ns[] = {"127.0.0.1"};
    dns_lease_set_nameservers(c, ns, 1);
    w_init(&w, 0x1234, 0, 1, 1, 0, 0);
    w_question(&w, "vps.example.net", 1);
    TEST("edge: tc returns trunc", dns_lease_feed_response(c, w.buf, w.len) == DNS_LEASE_ERR_TRUNC);
    TEST("edge: tc leaves udp", c->transport != DNS_LEASE_XPORT_UDP);
    dns_lease_close(c);

    /* a TTL with the MSB set reads as zero (RFC 2181 8) */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 0x80000100u, a1, 4);
    TEST("edge: msb ttl consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("edge: msb ttl floored", c->hint_ttl_ms == c->min_ttl_ms);

    /* a huge TTL is capped */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 100000000u, a1, 4);
    TEST("edge: huge ttl consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("edge: huge ttl capped", c->hint_ttl_ms == c->max_ttl_ms);

    /* more than 8 records: the first 8 are kept */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    w_init(&w, 0x1234, 0, 0, 1, 10, 0);
    w_question(&w, "vps.example.net", 1);
    for (int i = 0; i < 10; i++) {
        unsigned char a[4] = {(unsigned char)(i + 1), 0, 0, 0};
        w_rr(&w, 0, 0, "vps.example.net", 1, 300, a, 4);
    }
    TEST("edge: ten records consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("edge: first eight kept", dns_lease_get_hints(c, NULL, 0) == 8);

    /* duplicate addresses are deduped */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    w_init(&w, 0x1234, 0, 0, 1, 2, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    TEST("edge: dup consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("edge: dup deduped", dns_lease_get_hints(c, NULL, 0) == 1);

    /* every prefix of a full response must parse without crashing */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 100000;
    c->pending_id = 0x1234;
    w_init(&w, 0x1234, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    int crashed = 0;
    for (int i = 0; i <= w.len; i++) {
        dns_lease_init(c, "vps.example.net", 4096);
        c->now_fn = fake_now_fn;
        g_fake_now = 100000;
        c->pending_id = 0x1234;
        dns_lease_feed_response(c, w.buf, i);
    }
    TEST("edge: truncated walk never crashed", crashed == 0);

    return failures;
}

/* fn test_state_machine(dns_lease_ctx_t *c) */
static int test_state_machine(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 0;
    const char *ns[] = {"127.0.0.1"};
    dns_lease_set_nameservers(c, ns, 1);

    TEST("sm: starts UNRESOLVED", dns_lease_get_state(c) == DNS_LEASE_UNRESOLVED);

    dns_lease_tick(c);
    TEST("sm: first tick resolves", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    /* timeouts drive the retry ladder to FAILED */
    int timeouts = 0;
    while (dns_lease_get_state(c) != DNS_LEASE_FAILED && timeouts < 20) {
        g_fake_now += 2500;
        dns_lease_tick(c);
        timeouts++;
    }
    TEST("sm: retries exhausted to FAILED", dns_lease_get_state(c) == DNS_LEASE_FAILED);

    /* a late valid response recovers to VALID */
    struct wire w;
    unsigned char a1[4] = {1, 2, 3, 4};
    uint16_t pid = c->pending_id;
    w_init(&w, pid, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    TEST("sm: late response consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("sm: recovered to VALID", dns_lease_get_state(c) == DNS_LEASE_VALID);
    TEST("sm: hints servable again", dns_lease_get_hints(c, NULL, 0) == 1);

    /* advancing past the refresh lead (half the TTL) triggers a refresh */
    g_fake_now += 200000;
    dns_lease_tick(c);
    TEST("sm: refresh due", dns_lease_get_state(c) == DNS_LEASE_REFRESHING);

    /* a SERVFAIL during refresh keeps serving stale */
    pid = c->pending_id;
    w_init(&w, pid, 2, 0, 1, 0, 0);
    w_question(&w, "vps.example.net", 1);
    TEST("sm: servfail consumed", dns_lease_feed_response(c, w.buf, w.len) == 0);
    TEST("sm: refresh failure -> STALE", dns_lease_get_state(c) == DNS_LEASE_STALE);
    TEST("sm: stale still serves hints", dns_lease_get_hints(c, NULL, 0) == 1);

    /* the stale window gives up to EXPIRED */
    g_fake_now += c->stale_max_ms + 1;
    dns_lease_tick(c);
    TEST("sm: stale window -> EXPIRED", dns_lease_get_state(c) == DNS_LEASE_EXPIRED);
    TEST("sm: expired drops hints", dns_lease_get_hints(c, NULL, 0) == 0);

    /* force_refresh from EXPIRED restarts resolution */
    dns_lease_force_refresh(c);
    TEST("sm: force refresh from EXPIRED", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    dns_lease_close(c);
    return failures;
}

/* Every declared transition edge of the Lease state machine, walked in one
 * deterministic sequence (fake clock + canned responses, no network). */
/* fn test_transitions(dns_lease_ctx_t *c) */
static int test_transitions(dns_lease_ctx_t *c) {
    int failures = 0;
    const char *ns[] = {"127.0.0.1"};
    struct wire w;
    unsigned char a1[4] = {7, 7, 7, 7};
    unsigned char soa[4] = {0, 0, 0, 0};

    /* unresolved -> resolving -> valid */
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 1000;
    dns_lease_set_nameservers(c, ns, 1);
    dns_lease_tick(c);
    TEST("tr: unresolved -> resolving", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);
    w_init(&w, c->pending_id, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    dns_lease_feed_response(c, w.buf, w.len);
    TEST("tr: resolving -> valid", dns_lease_get_state(c) == DNS_LEASE_VALID);

    /* valid -> refreshing -> valid (a successful refresh renews the lease) */
    g_fake_now += 200000;
    dns_lease_tick(c);
    TEST("tr: valid -> refreshing", dns_lease_get_state(c) == DNS_LEASE_REFRESHING);
    w_init(&w, c->pending_id, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    dns_lease_feed_response(c, w.buf, w.len);
    TEST("tr: refreshing -> valid", dns_lease_get_state(c) == DNS_LEASE_VALID);

    /* refreshing -> stale -> valid (stale still recovers) */
    g_fake_now += 200000;
    dns_lease_tick(c);
    TEST("tr: valid -> refreshing again", dns_lease_get_state(c) == DNS_LEASE_REFRESHING);
    w_init(&w, c->pending_id, 2, 0, 1, 0, 0); /* SERVFAIL */
    w_question(&w, "vps.example.net", 1);
    dns_lease_feed_response(c, w.buf, w.len);
    TEST("tr: refreshing -> stale", dns_lease_get_state(c) == DNS_LEASE_STALE);
    w_init(&w, c->pending_id, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    dns_lease_feed_response(c, w.buf, w.len);
    TEST("tr: stale -> valid", dns_lease_get_state(c) == DNS_LEASE_VALID);

    /* refreshing -> negative (the name vanished mid-refresh) */
    g_fake_now += 200000;
    dns_lease_tick(c);
    w_init(&w, c->pending_id, 3, 0, 1, 0, 1); /* NXDOMAIN with SOA */
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 6, 60, soa, 4);
    dns_lease_feed_response(c, w.buf, w.len);
    TEST("tr: refreshing -> negative", dns_lease_get_state(c) == DNS_LEASE_NEGATIVE);

    /* negative -> resolving */
    g_fake_now += c->neg_ttl_cap_ms + 1;
    dns_lease_tick(c);
    TEST("tr: negative -> resolving", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    /* resolving -> failed (no hints, retries exhausted) */
    int n = 0;
    while (dns_lease_get_state(c) != DNS_LEASE_FAILED && n < 20) {
        g_fake_now += 2500;
        dns_lease_tick(c);
        n++;
    }
    TEST("tr: resolving -> failed", dns_lease_get_state(c) == DNS_LEASE_FAILED);

    /* failed -> resolving (the backoff elapses) */
    g_fake_now += c->query_timeout_ms + 1;
    dns_lease_tick(c);
    TEST("tr: failed -> resolving", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    /* back to valid, then stale -> expired and expired -> resolving */
    w_init(&w, c->pending_id, 0, 0, 1, 1, 0);
    w_question(&w, "vps.example.net", 1);
    w_rr(&w, 0, 0, "vps.example.net", 1, 300, a1, 4);
    dns_lease_feed_response(c, w.buf, w.len);
    g_fake_now += 200000;
    dns_lease_tick(c);
    w_init(&w, c->pending_id, 2, 0, 1, 0, 0);
    w_question(&w, "vps.example.net", 1);
    dns_lease_feed_response(c, w.buf, w.len);
    TEST("tr: stale reached", dns_lease_get_state(c) == DNS_LEASE_STALE);
    g_fake_now += c->stale_max_ms + 1;
    dns_lease_tick(c);
    TEST("tr: stale -> expired", dns_lease_get_state(c) == DNS_LEASE_EXPIRED);
    dns_lease_force_refresh(c);
    TEST("tr: expired -> resolving", dns_lease_get_state(c) == DNS_LEASE_RESOLVING);

    dns_lease_close(c);
    return failures;
}

/* fn test_no_ns(dns_lease_ctx_t *c) */
static int test_no_ns(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;
    g_fake_now = 0;
    dns_lease_tick(c);
    TEST("ns: no nameservers -> FAILED", dns_lease_get_state(c) == DNS_LEASE_FAILED);
    TEST("ns: last result is NO_NS", dns_lease_get_last_result(c) == DNS_LEASE_ERR_NO_NS);
    return failures;
}

/* fn test_nameservers(dns_lease_ctx_t *c) */
static int test_nameservers(dns_lease_ctx_t *c) {
    int failures = 0;
    dns_lease_init(c, "vps.example.net", 4096);
    c->now_fn = fake_now_fn;

    const char *mixed[] = {"8.8.8.8", "not-an-ip", "2001:db8::1", "1.2.3.4"};
    dns_lease_set_nameservers(c, mixed, 4);
    TEST("ns: only ipv4 literals accepted", c->ns_count == 2);
    TEST("ns: first is 8.8.8.8", c->ns_count == 2 &&
         (unsigned char)c->ns[0].sin_addr.s_addr == 8 &&
         ((unsigned char *)&c->ns[0].sin_addr.s_addr)[1] == 8);
    return failures;
}

int run_dns_lease_tests() {
    int failures = 0;
    dns_lease_ctx_t ctx;

    printf("=== DNS Lease Tests ===\n");
    failures += test_builder(&ctx);
    failures += test_parser_valid(&ctx);
    failures += test_parser_cname(&ctx);
    failures += test_parser_compression(&ctx);
    failures += test_parser_negative(&ctx);
    failures += test_parser_edge(&ctx);
    failures += test_state_machine(&ctx);
    failures += test_transitions(&ctx);
    failures += test_no_ns(&ctx);
    failures += test_nameservers(&ctx);

    return failures;
}