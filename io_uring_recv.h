#ifndef IO_URING_RECV_H_
#define IO_URING_RECV_H_

#include "common.h"

#ifdef __linux__

#include <stdint.h>
#include <sys/socket.h>

/* --- Kernel structure / constant fallbacks (for older headers) ------------ */

#include <linux/io_uring.h>
#include <sys/syscall.h>

#ifndef IORING_RECV_MULTISHOT
#define IORING_RECV_MULTISHOT (1U << 1)
#endif
#ifndef IORING_CQE_F_MORE
#define IORING_CQE_F_MORE (1U << 1)
#endif
#ifndef IORING_CQE_F_BUFFER
#define IORING_CQE_F_BUFFER (1U << 0)
#endif
#ifndef IORING_CQE_BUFFER_SHIFT
#define IORING_CQE_BUFFER_SHIFT 16
#endif
#ifndef IORING_REGISTER_PBUF_RING
#define IORING_REGISTER_PBUF_RING 22
#endif
#ifndef IORING_UNREGISTER_PBUF_RING
#define IORING_UNREGISTER_PBUF_RING 23
#endif

#ifndef IORING_OP_ASYNC_CANCEL
#define IORING_OP_ASYNC_CANCEL 14
#endif

/* io_uring_buf_ring — provided buffer ring shared with kernel (5.19+) */
#ifndef HAVE_IO_URING_BUF_RING
struct io_uring_buf {
    __u64 addr;
    __u32 len;
    __u16 bid;
    __u16 resv;
};
struct io_uring_buf_ring {
    union {
        struct {
            __u64 resv1;
            __u32 resv2;
            __u16 resv3;
            __u16 tail;
        };
        struct io_uring_buf bufs[0];
    };
};
struct io_uring_buf_reg {
    __u64 ring_addr;
    __u32 ring_entries;
    __u16 bgid;
    __u16 flags;
    __u64 resv[3];
};
#endif

/* io_uring_recvmsg_out — header in provided buffer for multishot recvmsg */
#ifndef HAVE_IO_URING_RECVMSG_OUT
struct io_uring_recvmsg_out {
    __u32 namelen;
    __u32 controllen;
    __u32 payloadlen;
    __u32 flags;
};
#endif

/* --- Public API ---------------------------------------------------------- */

struct uring_recv_buf_t {
    char *data;
    int len;
    struct sockaddr_storage addr;
    socklen_t addr_len;
    int buf_id;
};

struct uring_ctx_t {
    int ring_fd;
    int available;

    /* mmap'd ring pointers */
    void *sq_ring_ptr;
    size_t sq_ring_sz;
    void *cq_ring_ptr;
    size_t cq_ring_sz;
    struct io_uring_sqe *sqes;
    size_t sqes_sz;

    /* SQ ring offsets */
    unsigned *sq_head;
    unsigned *sq_tail;
    unsigned *sq_array;
    unsigned sq_mask;
    unsigned sq_entries;

    /* CQ ring offsets */
    unsigned *cq_head;
    unsigned *cq_tail;
    unsigned cq_mask;
    unsigned cq_entries;
    struct io_uring_cqe *cqes;

    /* Provided buffer ring */
    struct io_uring_buf_ring *buf_ring;
    char *buf_pool;
    int buf_count;
    int buf_size;       /* size per buffer including header room */
    int bgid;

    /* msghdr template for multishot recvmsg */
    struct msghdr recvmsg_hdr;
    struct sockaddr_storage recvmsg_name;
};

/* User data tag encode/decode */
static inline uint64_t uring_tag(uint8_t type, uint64_t payload) {
    return ((uint64_t)type << 56) | (payload & 0x00FFFFFFFFFFFFFFULL);
}
static inline uint8_t uring_tag_type(uint64_t user_data) {
    return (uint8_t)(user_data >> 56);
}
static inline uint64_t uring_tag_payload(uint64_t user_data) {
    return user_data & 0x00FFFFFFFFFFFFFFULL;
}

/* Tag types */
#define URING_TAG_CLIENT_LOCAL   0x01
#define URING_TAG_CLIENT_REMOTE  0x02
#define URING_TAG_SERVER_LOCAL   0x03
#define URING_TAG_SERVER_REMOTE  0x04

int  uring_init(uring_ctx_t *ctx, int queue_depth, int buf_count, int buf_size);
void uring_destroy(uring_ctx_t *ctx);

int  uring_add_multishot_recvmsg(uring_ctx_t *ctx, int fd, uint64_t user_data);
int  uring_add_multishot_recv(uring_ctx_t *ctx, int fd, uint64_t user_data);
int  uring_cancel(uring_ctx_t *ctx, uint64_t user_data);
int  uring_submit(uring_ctx_t *ctx);

int  uring_peek_cqe(uring_ctx_t *ctx, struct io_uring_cqe **out);
void uring_cqe_seen(uring_ctx_t *ctx);

int  uring_parse_recvmsg_cqe(uring_ctx_t *ctx, struct io_uring_cqe *cqe,
                              uring_recv_buf_t *out);
int  uring_parse_recv_cqe(uring_ctx_t *ctx, struct io_uring_cqe *cqe,
                           uring_recv_buf_t *out);
void uring_recycle_buf(uring_ctx_t *ctx, int buf_id);

/* Global pointer — set in tunnel event loop, used by connection.cpp cleanup */
extern uring_ctx_t *g_uring_ctx;

#else /* !__linux__ */

/* Stubs for non-Linux — always unavailable */
struct uring_recv_buf_t { char *data; int len; int buf_id; };
struct uring_ctx_t { int available; };
static inline int uring_init(uring_ctx_t *ctx, int, int, int) { ctx->available = 0; return -1; }
static inline void uring_destroy(uring_ctx_t *) {}

/* Tag helpers still available for compilation */
static inline uint64_t uring_tag(uint8_t type, uint64_t payload) {
    return ((uint64_t)type << 56) | (payload & 0x00FFFFFFFFFFFFFFULL);
}
#define URING_TAG_CLIENT_LOCAL   0x01
#define URING_TAG_CLIENT_REMOTE  0x02
#define URING_TAG_SERVER_LOCAL   0x03
#define URING_TAG_SERVER_REMOTE  0x04

extern uring_ctx_t *g_uring_ctx;

#endif /* __linux__ */
#endif /* IO_URING_RECV_H_ */
