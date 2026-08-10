#include "tunnel.h"
#include "io_uring_recv.h"
#include "dns_lease_mgr.h"

/* The DNS lease manager for a hostname -r endpoint. Owned by the client process,
 * touched only from the libev loop (single-threaded). */
static dns_lease_ctx_t g_dns_ctx;
static int g_remote_ready = 0;        /* the connected remote socket exists */
static int g_uring_available = 0;     /* io_uring is running for the client */
static int g_remote_uring_armed = 0;  /* the remote multishot recv is armed */

static void dns_log_cb(int level, const char *msg) {
    (void)level;
    mylog(log_info, "[dns] %s\n", msg);
}

static void client_process_local_packet(conn_info_t &conn_info, char *data, int data_len,
                                         struct sockaddr *src_addr, socklen_t src_addr_len) {
    fd64_t &remote_fd64 = conn_info.remote_fd64;
    address_t addr;
    u32_t conv;
    int out_n;
    char **out_arr;
    int *out_len;
    my_time_t *out_delay;
    dest_t dest;
    dest.type = type_fd64;
    dest.inner.fd64 = remote_fd64;
    dest.cook = 1;

    if (remote_fd64 == (fd64_t)-1) {
        mylog(log_warn, "remote endpoint not resolved yet, dropping packet\n");
        return;
    }

    if (data_len == max_data_len + 1) {
        mylog(log_warn, "huge packet from upper level, data_len > %d, packet truncated, dropped\n", max_data_len);
        return;
    }

    if (!disable_mtu_warn && data_len >= mtu_warn) {
        mylog(log_warn, "huge packet,data len=%d (>=%d).strongly suggested to set a smaller mtu at upper level,to get rid of this warn\n ", data_len, mtu_warn);
    }

    addr.from_sockaddr(src_addr, src_addr_len);

    mylog(log_trace, "Received packet from %s, len: %d\n", addr.get_str(), data_len);

    if (!conn_info.conv_manager.c.is_data_used(addr)) {
        if (conn_info.conv_manager.c.get_size() >= max_conv_num) {
            mylog(log_warn, "ignored new udp connect bc max_conv_num exceed\n");
            return;
        }
        conv = conn_info.conv_manager.c.get_new_conv();
        conn_info.conv_manager.c.insert_conv(conv, addr);
        mylog(log_info, "new packet from %s,conv_id=%x\n", addr.get_str(), conv);
    } else {
        conv = conn_info.conv_manager.c.find_conv_by_data(addr);
        mylog(log_trace, "conv=%d\n", conv);
    }
    conn_info.conv_manager.c.update_active_time(conv);
    int new_len;
    put_conv_inplace(conv, data, data_len, new_len);

    mylog(log_trace, "data_len=%d new_len=%d\n", data_len, new_len);
    from_normal_to_fec(conn_info, data, new_len, out_n, out_arr, out_len, out_delay);

    mylog(log_trace, "out_n=%d\n", out_n);
    delay_send_batch(out_n, out_delay, dest, out_arr, out_len);
}

static void client_process_remote_packet(conn_info_t &conn_info, char *data, int data_len) {
    if (data_len == max_data_len + 1) {
        mylog(log_warn, "huge packet, data_len > %d, packet truncated, dropped\n", max_data_len);
        return;
    }

    mylog(log_trace, "received data from remote, len=%d\n", data_len);
    if (data_len < 0) {
        if (get_sock_errno() == ECONNREFUSED) {
            mylog(log_debug, "recv failed %d ,errno:%s\n", data_len, get_sock_error());
            /* ICMP port-unreachable for a packet we sent to the current peer:
             * the endpoint is dead. Force a DNS refresh so a new candidate can
             * replace it. */
            if (remote_is_hostname) {
                mylog(log_warn, "remote endpoint refused; forcing DNS refresh\n");
                dns_lease_force_refresh(&g_dns_ctx);
            }
        }

        mylog(log_warn, "recv failed %d ,errno:%s\n", data_len, get_sock_error());
        return;
    }
    if (!disable_mtu_warn && data_len > mtu_warn) {
        mylog(log_warn, "huge packet,data len=%d (>%d).strongly suggested to set a smaller mtu at upper level,to get rid of this warn\n ", data_len, mtu_warn);
    }

    if (de_cook(&cook_ctx, data, data_len) != 0) {
        mylog(log_debug, "de_cook error");
        return;
    }

    int out_n;
    char **out_arr;
    int *out_len;
    my_time_t *out_delay;
    from_fec_to_normal(conn_info, data, data_len, out_n, out_arr, out_len, out_delay);

    mylog(log_trace, "out_n=%d\n", out_n);

    for (int i = 0; i < out_n; i++) {
        u32_t conv;
        char *new_data;
        int new_len;
        if (get_conv(conv, out_arr[i], out_len[i], new_data, new_len) != 0) {
            mylog(log_debug, "get_conv(conv,out_arr[i],out_len[i],new_data,new_len)!=0");
            continue;
        }
        if (!conn_info.conv_manager.c.is_conv_used(conv)) {
            mylog(log_trace, "!conn_info.conv_manager.is_conv_used(conv)");
            continue;
        }

        conn_info.conv_manager.c.update_active_time(conv);

        address_t addr = conn_info.conv_manager.c.find_data_by_conv(conv);
        dest_t dest;
        dest.inner.fd_addr.fd = conn_info.local_listen_fd;
        dest.inner.fd_addr.addr = addr;
        dest.type = type_fd_addr;

        delay_send(out_delay[i], dest, new_data, new_len);
    }
}

void data_from_local_or_fec_timeout(conn_info_t &conn_info, int is_time_out) {
    fd64_t &remote_fd64 = conn_info.remote_fd64;
    int &local_listen_fd = conn_info.local_listen_fd;
    int out_n;
    char **out_arr;
    int *out_len;
    my_time_t *out_delay;
    dest_t dest;
    dest.type = type_fd64;
    dest.inner.fd64 = remote_fd64;
    dest.cook = 1;

    if (remote_fd64 == (fd64_t)-1) {
        mylog(log_warn, "remote endpoint not resolved yet, dropping packet\n");
        return;
    }

    if (is_time_out) {
        mylog(log_trace, "events[idx].data.u64 == conn_info.fec_encode_manager.get_timer_fd64()\n");
        from_normal_to_fec(conn_info, 0, 0, out_n, out_arr, out_len, out_delay);
        mylog(log_trace, "out_n=%d\n", out_n);
        delay_send_batch(out_n, out_delay, dest, out_arr, out_len);
    } else {
        /* Single-packet path (fallback) */
        char data[buf_len];
        int data_len;
        address_t::storage_t udp_new_addr_in = {0};
        socklen_t udp_new_addr_len = sizeof(address_t::storage_t);
        if ((data_len = recvfrom(local_listen_fd, data + sizeof(u32_t), max_data_len + 1, 0,
                                 (struct sockaddr *)&udp_new_addr_in, &udp_new_addr_len)) == -1) {
            mylog(log_debug, "recv_from error,this shouldn't happen,err=%s,but we can try to continue\n", get_sock_error());
            return;
        };
        client_process_local_packet(conn_info, data, data_len,
                                     (struct sockaddr *)&udp_new_addr_in, udp_new_addr_len);
    }
}
static void local_listen_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);

    data_from_local_or_fec_timeout(conn_info, 0);
}

static void remote_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);

    if (!fd_manager.exist(watcher->u64))  // fd64 has been closed
    {
        mylog(log_trace, "!fd_manager.exist(events[idx].data.u64)");
        return;
    }
    fd64_t &remote_fd64 = conn_info.remote_fd64;
    assert(watcher->u64 == remote_fd64);

    int fd = fd_manager.to_fd(remote_fd64);

    char data[buf_len];
    int data_len = recv(fd, data, max_data_len + 1, 0);
    client_process_remote_packet(conn_info, data, data_len);
}

static void fifo_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));
    int fifo_fd = watcher->fd;

    char buf[buf_len];
    int len = read(fifo_fd, buf, sizeof(buf));
    if (len < 0) {
        mylog(log_warn, "fifo read failed len=%d,errno=%s\n", len, get_sock_error());
        return;
    }
    buf[len] = 0;
    handle_command(buf);
}

static void delay_manager_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    // uint64_t value;
    // read(delay_manager.get_timer_fd(), &value, 8);
    // mylog(log_trace,"events[idx].data.u64 == (u64_t)delay_manager.get_timer_fd()\n");

    // do nothing
}

static void fec_encode_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);

    data_from_local_or_fec_timeout(conn_info, 1);
}


#ifdef __linux__
static uring_ctx_t client_uring_ctx;
static conn_info_t *client_uring_conn_info;
static void client_uring_drain(struct ev_loop *loop);
#endif

/* Hoisted from the event loop so the deferred first-resolve arm can reach it. */
static struct ev_io remote_watcher;

/* True when the tunnel must (re)point at a candidate: there is no socket yet
 * and hints are servable, or the current remote_addr left the candidate set.
 * While the current IP stays a candidate we keep it (no churn). */
static int dns_lease_need_repoint(conn_info_t &conn_info) {
    if (conn_info.remote_fd == -1)
        return dns_lease_get_hints(&g_dns_ctx, 0, 0) > 0;
    int fam = remote_addr.get_type();
    const void *addr_bytes = (fam == AF_INET) ? (const void *)&remote_addr.inner.ipv4.sin_addr
                                              : (const void *)&remote_addr.inner.ipv6.sin6_addr;
    int want = (fam == AF_INET) ? 4 : 16;
    dns_lease_hint_t h[8];
    int n = dns_lease_get_hints(&g_dns_ctx, h, 8);
    for (int i = 0; i < n; i++) {
        if ((int)h[i].family == fam && memcmp(h[i].addr.a6, addr_bytes, want) == 0)
            return 0;
    }
    return n > 0;
}

/* Point the remote socket at the best servable hint. On the first lease this
 * creates the connected socket and arms the recv path; on a later change it
 * re-points the same fd with a second connect(), which keeps the io_uring
 * multishot and the ev_io watcher valid. */
static void on_remote_ip_resolved(conn_info_t &conn_info) {
    dns_lease_hint_t h[8];
    int n = dns_lease_get_hints(&g_dns_ctx, h, 8);
    if (n <= 0)
        return;
    address_t a;
    a.from_ip_port_new((int)h[0].family, (void *)&h[0].addr, remote_host_port);

    if (conn_info.remote_fd == -1) {
        assert(new_connected_socket2(conn_info.remote_fd, a, out_addr, out_interface) == 0);
        conn_info.remote_fd64 = fd_manager.create(conn_info.remote_fd);
        g_remote_ready = 1;
#ifdef __linux__
        if (g_uring_available) {
            uring_add_multishot_recv(&client_uring_ctx, conn_info.remote_fd,
                                     uring_tag(URING_TAG_CLIENT_REMOTE, 0));
            uring_submit(&client_uring_ctx);
            g_remote_uring_armed = 1;
        }
#endif
        if (!g_uring_available) {
            remote_watcher.data = &conn_info;
            remote_watcher.u64 = conn_info.remote_fd64;
            ev_io_init(&remote_watcher, remote_cb, conn_info.remote_fd, EV_READ);
            ev_io_start(conn_info.loop, &remote_watcher);
        }
    } else {
        assert(connect(conn_info.remote_fd, (struct sockaddr *)&a.inner, a.get_len()) == 0);
    }
    remote_addr = a; /* keep the global current for logs */
}

/* Force the client's DNS lease manager to refresh (FIFO dns-refresh). */
void client_dns_force_refresh() {
    if (!remote_is_hostname)
        return;
    dns_lease_force_refresh(&g_dns_ctx);
}

static void conn_timer_cb(struct ev_loop *loop, struct ev_timer *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    uint64_t value;

    conn_info_t &conn_info = *((conn_info_t *)watcher->data);

    /* Drive the DNS lease manager on the existing 400 ms cadence, and re-point
     * the remote socket when the candidate set changed. */
    if (remote_is_hostname) {
        dns_lease_tick(&g_dns_ctx);
        if (dns_lease_need_repoint(conn_info))
            on_remote_ip_resolved(conn_info);
    }

    // read(conn_info.timer.get_timer_fd(), &value, 8);
    conn_info.conv_manager.c.clear_inactive();
    mylog(log_trace, "events[idx].data.u64==(u64_t)conn_info.timer.get_timer_fd()\n");

    conn_info.stat.report_as_client();

    if (debug_force_flush_fec) {
        int out_n;
        char **out_arr;
        int *out_len;
        my_time_t *out_delay;
        dest_t dest;
        dest.type = type_fd64;
        dest.inner.fd64 = conn_info.remote_fd64;
        dest.cook = 1;
        from_normal_to_fec(conn_info, 0, 0, out_n, out_arr, out_len, out_delay);
        delay_send_batch(out_n, out_delay, dest, out_arr, out_len);
    }
}

static void prepare_cb(struct ev_loop *loop, struct ev_prepare *watcher, int revents) {
    assert(!(revents & EV_ERROR));

    delay_manager.check();
}


#ifdef __linux__

static void client_uring_drain(struct ev_loop *loop) {
    conn_info_t &conn_info = *client_uring_conn_info;
    uring_ctx_t *ctx = &client_uring_ctx;

    for (;;) {
        unsigned ready = uring_cq_ready(ctx);
        if (ready == 0)
            break;

        int need_submit = 0;

        for (unsigned i = 0; i < ready; i++) {
            struct io_uring_cqe *cqe = uring_cqe_at(ctx, i);
            uint8_t type = uring_tag_type(cqe->user_data);
            int more = cqe->flags & IORING_CQE_F_MORE;

            if (cqe->res < 0) {
                if (!more && cqe->res != -ECANCELED) {
                    if (type == URING_TAG_CLIENT_LOCAL)
                        uring_add_multishot_recvmsg(ctx, conn_info.local_listen_fd, cqe->user_data);
                    else if (type == URING_TAG_CLIENT_REMOTE)
                        uring_add_multishot_recv(ctx, fd_manager.to_fd(conn_info.remote_fd64), cqe->user_data);
                    need_submit = 1;
                }
                continue;
            }

            if (type == URING_TAG_CLIENT_LOCAL) {
                uring_recv_buf_t recv_buf;
                if (uring_parse_recvmsg_cqe(ctx, cqe, &recv_buf) == 0) {
                    /* Zero-copy: recvmsg has 140+ bytes of headroom before payload;
                       use sizeof(u32_t) of it for in-place conv header insertion. */
                    char *data = recv_buf.data - sizeof(u32_t);
                    int data_len = recv_buf.len < (int)(buf_len - sizeof(u32_t)) ? recv_buf.len : (int)(buf_len - sizeof(u32_t));
                    client_process_local_packet(conn_info, data, data_len,
                                                 (struct sockaddr *)&recv_buf.addr, recv_buf.addr_len);
                    uring_recycle_buf(ctx, recv_buf.buf_id);
                }
            } else if (type == URING_TAG_CLIENT_REMOTE) {
                uring_recv_buf_t recv_buf;
                if (uring_parse_recv_cqe(ctx, cqe, &recv_buf) == 0) {
                    client_process_remote_packet(conn_info, recv_buf.data, recv_buf.len);
                    uring_recycle_buf(ctx, recv_buf.buf_id);
                }
            }

            if (!more) {
                if (type == URING_TAG_CLIENT_LOCAL)
                    uring_add_multishot_recvmsg(ctx, conn_info.local_listen_fd, cqe->user_data);
                else if (type == URING_TAG_CLIENT_REMOTE)
                    uring_add_multishot_recv(ctx, fd_manager.to_fd(conn_info.remote_fd64), cqe->user_data);
                need_submit = 1;
            }
        }

        /* Single batched advance + buffer commit */
        uring_cq_advance(ctx, ready);
        uring_buf_ring_commit(ctx);

        /* Submit any re-arms and flush deferred completions in one syscall */
        if (need_submit)
            uring_submit_and_flush(ctx);
        else
            uring_flush(ctx);
    }
}

static void client_uring_cb(struct ev_loop *loop, struct ev_io *watcher, int revents) {
    assert(!(revents & EV_ERROR));
    client_uring_drain(loop);
}
#endif

int tunnel_client_event_loop() {
    int i, j, k;
    int ret;
    int yes = 1;
    // int epoll_fd;

    conn_info_t *conn_info_p = new conn_info_t;
    conn_info_t &conn_info = *conn_info_p;  // huge size of conn_info,do not allocate on stack

    int &local_listen_fd = conn_info.local_listen_fd;
    new_listen_socket2(local_listen_fd, local_addr);

    // epoll_fd = epoll_create1(0);
    // assert(epoll_fd>0);

    // const int max_events = 4096;
    // struct epoll_event ev, events[max_events];
    // if (epoll_fd < 0) {
    //	mylog(log_fatal,"epoll return %d\n", epoll_fd);
    //	myexit(-1);
    // }

    struct ev_loop *loop = ev_default_loop(0);
    assert(loop != NULL);

    conn_info.loop = loop;

    int &remote_fd = conn_info.remote_fd;
    fd64_t &remote_fd64 = conn_info.remote_fd64;

    remote_fd = -1;
    remote_fd64 = (fd64_t)-1;
    if (!remote_is_hostname) {
        assert(new_connected_socket2(remote_fd, remote_addr, out_addr, out_interface) == 0);
        remote_fd64 = fd_manager.create(remote_fd);
        g_remote_ready = 1;
        mylog(log_debug, "remote_fd64=%llu\n", remote_fd64);
    } else {
        dns_lease_init(&g_dns_ctx, remote_host_name, (uint16_t)remote_host_port);
        dns_lease_discover_nameservers(&g_dns_ctx);
        g_dns_ctx.log_fn = dns_log_cb;
        mylog(log_info, "remote endpoint is a hostname; resolving %s\n", remote_host_name);
    }

    int use_uring = 0;
#ifdef __linux__
    if (uring_init(&client_uring_ctx, 64, 256, buf_len) == 0) {
        g_uring_ctx = &client_uring_ctx;
        client_uring_conn_info = &conn_info;
        static struct ev_io uring_watcher;
        ev_io_init(&uring_watcher, client_uring_cb, client_uring_ctx.ring_fd, EV_READ);
        ev_io_start(loop, &uring_watcher);

        uring_add_multishot_recvmsg(&client_uring_ctx, local_listen_fd,
                                      uring_tag(URING_TAG_CLIENT_LOCAL, 0));
        if (g_remote_ready) {
            uring_add_multishot_recv(&client_uring_ctx, remote_fd,
                                       uring_tag(URING_TAG_CLIENT_REMOTE, 0));
            g_remote_uring_armed = 1;
        }
        uring_submit(&client_uring_ctx);
        use_uring = 1;
        g_uring_available = 1;
        mylog(log_info, "io_uring: active for client sockets\n");
    }
#endif

    struct ev_io local_listen_watcher;
    local_listen_watcher.data = &conn_info;
    ev_io_init(&local_listen_watcher, local_listen_cb, local_listen_fd, EV_READ);
    if (!use_uring)
        ev_io_start(loop, &local_listen_watcher);

    if (g_remote_ready) {
        remote_watcher.data = &conn_info;
        remote_watcher.u64 = remote_fd64;
        ev_io_init(&remote_watcher, remote_cb, remote_fd, EV_READ);
        if (!use_uring)
            ev_io_start(loop, &remote_watcher);
    }

    // ev.events = EPOLLIN;
    // ev.data.u64 = delay_manager.get_timer_fd();

    // mylog(log_debug,"delay_manager.get_timer_fd()=%d\n",delay_manager.get_timer_fd());
    // ret = epoll_ctl(epoll_fd, EPOLL_CTL_ADD, delay_manager.get_timer_fd(), &ev);
    // if (ret!= 0) {
    //	mylog(log_fatal,"add delay_manager.get_timer_fd() error\n");
    //	myexit(-1);
    // }

    delay_manager.set_loop_and_cb(loop, delay_manager_cb);

    conn_info.fec_encode_manager.set_data(&conn_info);
    conn_info.fec_encode_manager.set_loop_and_cb(loop, fec_encode_cb);

    // u64_t tmp_fd64=conn_info.fec_encode_manager.get_timer_fd64();
    // ev.events = EPOLLIN;
    // ev.data.u64 = tmp_fd64;

    // mylog(log_debug,"conn_info.fec_encode_manager.get_timer_fd64()=%llu\n",conn_info.fec_encode_manager.get_timer_fd64());
    // ret = epoll_ctl(epoll_fd, EPOLL_CTL_ADD, fd_manager.to_fd(tmp_fd64), &ev);
    // if (ret!= 0) {
    //	mylog(log_fatal,"add fec_encode_manager.get_timer_fd64() error\n");
    //	myexit(-1);
    // }

    conn_info.timer.data = &conn_info;
    ev_init(&conn_info.timer, conn_timer_cb);
    ev_timer_set(&conn_info.timer, 0, timer_interval / ms_per_second);
    ev_timer_start(loop, &conn_info.timer);
    // conn_info.timer.add_fd_to_epoll(epoll_fd);
    // conn_info.timer.set_timer_repeat_us(timer_interval*1000);

    // mylog(log_debug,"conn_info.timer.get_timer_fd()=%d\n",conn_info.timer.get_timer_fd());

    struct ev_io fifo_watcher;

    int fifo_fd = -1;

    if (fifo_file[0] != 0) {
        fifo_fd = create_fifo(fifo_file);
        // ev.events = EPOLLIN;
        // ev.data.u64 = fifo_fd;

        // ret = epoll_ctl(epoll_fd, EPOLL_CTL_ADD, fifo_fd, &ev);
        // if (ret!= 0) {
        //	mylog(log_fatal,"add fifo_fd to epoll error %s\n",strerror(errno));
        //	myexit(-1);
        // }
        mylog(log_info, "fifo_file=%s\n", fifo_file);

        ev_io_init(&fifo_watcher, fifo_cb, fifo_fd, EV_READ);
        ev_io_start(loop, &fifo_watcher);
    }

    ev_prepare prepare_watcher;
    ev_init(&prepare_watcher, prepare_cb);
    ev_prepare_start(loop, &prepare_watcher);

    mylog(log_info, "now listening at %s\n", local_addr.get_str());

    ev_run(loop, 0);

    mylog(log_warn, "ev_run returned\n");
    myexit(0);

    /*
    while(1)////////////////////////
    {
            if(about_to_exit) myexit(0);

            int nfds = epoll_wait(epoll_fd, events, max_events, 180 * 1000);
            if (nfds < 0) {  //allow zero
                    if(errno==EINTR  )
                    {
                            mylog(log_info,"epoll interrupted by signal continue\n");
                    }
                    else
                    {
                            mylog(log_fatal,"epoll_wait return %d,%s\n", nfds,strerror(errno));
                            myexit(-1);
                    }
            }
            int idx;
            for (idx = 0; idx < nfds; ++idx) {
                    if(events[idx].data.u64==(u64_t)conn_info.timer.get_timer_fd())
                    {

                    }

                    else if (events[idx].data.u64 == (u64_t)fifo_fd)
                    {

                    }
                    else if (events[idx].data.u64 == (u64_t)local_listen_fd||events[idx].data.u64 == conn_info.fec_encode_manager.get_timer_fd64())
                    {

                    }
                else if (events[idx].data.u64 == (u64_t)delay_manager.get_timer_fd()) {

                    }
                    else if(events[idx].data.u64>u32_t(-1) )
                    {

                    }
                    else
                    {
                            mylog(log_fatal,"unknown fd,this should never happen\n");
                            myexit(-1);
                    }
            }
            //delay_manager.check();
    }*/
    return 0;
}
