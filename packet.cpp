/*
 * packet.cpp
 *
 *  Created on: Sep 15, 2017
 *      Author: root
 */

#include "common.h"
#include "log.h"
#include "packet.h"
#include "misc.h"
#include "crc32c.h"

cook_ctx_t cook_ctx = { {}, 0, 0, {}, 4, 32, 0, 0, 0 };

u64_t packet_send_count = 0;
u64_t dup_packet_send_count = 0;
u64_t packet_recv_count = 0;
u64_t dup_packet_recv_count = 0;

typedef u64_t anti_replay_seq_t;
int disable_replay_filter = 0;

int random_drop = 0;

/*
int sendto_fd_ip_port (int fd,u32_t ip,int port,char * buf, int len,int flags)
{

        sockaddr_in tmp_sockaddr;

        memset(&tmp_sockaddr,0,sizeof(tmp_sockaddr));
        tmp_sockaddr.sin_family = AF_INET;
        tmp_sockaddr.sin_addr.s_addr = ip;
        tmp_sockaddr.sin_port = htons(uint16_t(port));

        return sendto(fd, buf,
                        len , 0,
                        (struct sockaddr *) &tmp_sockaddr,
                        sizeof(tmp_sockaddr));
}*/

int sendto_fd_addr(int fd, address_t addr, char *buf, int len, int flags) {
    return sendto(fd, buf,
                  len, 0,
                  (struct sockaddr *)&addr.inner,
                  addr.get_len());
}
/*
int sendto_ip_port (u32_t ip,int port,char * buf, int len,int flags)
{
        return sendto_fd_ip_port(local_listen_fd,ip,port,buf,len,flags);
}*/

int send_fd(int fd, char *buf, int len, int flags) {
    return send(fd, buf, len, flags);
}

int my_send(const dest_t &dest, char *data, int len) {
    if (dest.cook) {
        do_cook(&cook_ctx, data, len);
    }
    switch (dest.type) {
        case type_fd_addr: {
            return sendto_fd_addr(dest.inner.fd, dest.inner.fd_addr.addr, data, len, 0);
            break;
        }
        case type_fd64_addr: {
            if (!fd_manager.exist(dest.inner.fd64)) return -1;
            int fd = fd_manager.to_fd(dest.inner.fd64);

            return sendto_fd_addr(fd, dest.inner.fd64_addr.addr, data, len, 0);
            break;
        }
        case type_fd: {
            return send_fd(dest.inner.fd, data, len, 0);
            break;
        }
        case type_write_fd: {
            return write(dest.inner.fd, data, len);
            break;
        }
        case type_fd64: {
            if (!fd_manager.exist(dest.inner.fd64)) return -1;
            int fd = fd_manager.to_fd(dest.inner.fd64);

            return send_fd(fd, data, len, 0);
            break;
        }
        /*
        case type_fd64_ip_port_conv:
        {
                if(!fd_manager.exist(dest.inner.fd64)) return -1;
                int fd=fd_manager.to_fd(dest.inner.fd64);

                char *new_data;
                int new_len;

                put_conv(dest.conv,data,len,new_data,new_len);
                return sendto_fd_ip_port(fd,dest.inner.fd64_ip_port.ip_port.ip,dest.inner.fd64_ip_port.ip_port.port,new_data,new_len,0);
                break;
        }*/

        /*
        case type_fd64_conv:
        {
                char *new_data;
                int new_len;
                put_conv(dest.conv,data,len,new_data,new_len);

                if(!fd_manager.exist(dest.inner.fd64)) return -1;
                int fd=fd_manager.to_fd(dest.inner.fd64);
                return send_fd(fd,new_data,new_len,0);
        }*/
        /*
        case type_fd:
        {
                send_fd(dest.inner.fd,data,len,0);
                break;
        }*/
        default:
            assert(0 == 1);
    }
    return 0;
}

int put_conv0(u32_t conv, const char *input, int len_in, char *&output, int &len_out) {
    assert(len_in >= 0);
    static char buf[buf_len];
    output = buf;
    u32_t n_conv = htonl(conv);
    memcpy(output, &n_conv, sizeof(n_conv));
    memcpy(output + sizeof(n_conv), input, len_in);
    u32_t crc32 = (u32_t)crc32c(output, len_in + sizeof(crc32));
    u32_t crc32_n = htonl(crc32);
    len_out = len_in + (int)(sizeof(n_conv)) + (int)sizeof(crc32_n);
    memcpy(output + len_in + (int)(sizeof(n_conv)), &crc32_n, sizeof(crc32_n));
    return 0;
}
int get_conv0(u32_t &conv, const char *input, int len_in, char *&output, int &len_out) {
    assert(len_in >= 0);
    u32_t n_conv;
    memcpy(&n_conv, input, sizeof(n_conv));
    conv = ntohl(n_conv);
    output = (char *)input + sizeof(n_conv);
    u32_t crc32_n;
    len_out = len_in - (int)sizeof(n_conv) - (int)sizeof(crc32_n);
    if (len_out < 0) {
        mylog(log_debug, "len_out<0\n");
        return -1;
    }
    memcpy(&crc32_n, input + len_in - (int)sizeof(crc32_n), sizeof(crc32_n));
    u32_t crc32 = ntohl(crc32_n);
    if (crc32 != (u32_t)crc32c(input, len_in - sizeof(crc32_n))) {
        mylog(log_debug, "crc32 check failed\n");
        return -1;
    }
    return 0;
}
/*
int do_obs()
{

}
int de_obs()*/
int put_conv(u32_t conv, const char *input, int len_in, char *&output, int &len_out) {
    static char buf[buf_len];
    output = buf;
    u32_t n_conv = htonl(conv);
    memcpy(output, &n_conv, sizeof(n_conv));
    memcpy(output + sizeof(n_conv), input, len_in);
    len_out = len_in + (int)(sizeof(n_conv));

    return 0;
}
int get_conv(u32_t &conv, const char *input, int len_in, char *&output, int &len_out) {
    u32_t n_conv;
    memcpy(&n_conv, input, sizeof(n_conv));
    conv = ntohl(n_conv);
    output = (char *)input + sizeof(n_conv);
    len_out = len_in - (int)sizeof(n_conv);
    if (len_out < 0) {
        mylog(log_debug, "len_out<0\n");
        return -1;
    }
    return 0;
}
