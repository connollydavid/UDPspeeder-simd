/*
 * marks_wire_sender: the sending half of the wire-level dscp proof. It
 * dresses a socket exactly as the tunnel would -- through
 * apply_socket_marks, with dscp set -- and sends a few datagrams to
 * loopback. The receiving half is a packet capture: tcpdump on the
 * loopback interface must show tos 0xb8 (dscp 46) on the packets. The
 * suite proves the socket carries the value; this proves the kernel puts
 * it on the wire; together they are the whole claim.
 *
 * Build: g++ -std=c++11 -I. -o wire_sender bench/marks_wire_sender.cpp socket_marks.cpp
 */
#include "socket_marks.h"

#include <stdio.h>
#include <string.h>

#ifdef _WIN32
#include <winsock2.h>
#include <ws2tcpip.h>
#else
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#endif

int main(void) {
#ifdef _WIN32
    WSADATA w;
    struct sockaddr_in dest;
    const char payload[] = "marks-wire-proof";
    SOCKET fd;
    int i;

    if (WSAStartup(MAKEWORD(2, 2), &w) != 0) {
        fprintf(stderr, "WSAStartup failed\n");
        return 1;
    }
    dscp = 46; /* EF; qWAVE dresses the flow, and the byte on the wire is 0xb8 */
    fd = socket(AF_INET, SOCK_DGRAM, 0);
    if (fd == INVALID_SOCKET) {
        fprintf(stderr, "socket failed\n");
        return 1;
    }
    memset(&dest, 0, sizeof(dest));
    dest.sin_family = AF_INET;
    dest.sin_port = htons(57009);
    dest.sin_addr.s_addr = inet_addr("8.8.8.8");
    if (track_dscp_socket(fd, (struct sockaddr *)&dest, sizeof(dest)) != 0) {
        fprintf(stderr, "track_dscp_socket failed\n");
        return 1;
    }
    for (i = 0; i < 5; i++) {
        if (sendto(fd, payload, sizeof(payload), 0,
                   (struct sockaddr *)&dest, sizeof(dest)) == SOCKET_ERROR) {
            fprintf(stderr, "sendto failed\n");
            return 1;
        }
    }
    printf("sent 5 datagrams to 8.8.8.8:57009 through a dscp-46 flow\n");
    return 0;
#else
    int fd;
    struct sockaddr_in dest;
    const char payload[] = "marks-wire-proof";
    int i;

    dscp = 46; /* EF; the byte on the wire is 46 << 2 = 0xb8 */
    fd = socket(AF_INET, SOCK_DGRAM, 0);
    if (fd < 0) {
        perror("socket");
        return 1;
    }
    if (apply_socket_marks(fd, AF_INET) != 0) {
        fprintf(stderr, "apply_socket_marks failed\n");
        return 1;
    }
    memset(&dest, 0, sizeof(dest));
    dest.sin_family = AF_INET;
    dest.sin_port = htons(57009);
    dest.sin_addr.s_addr = htonl(0x7f000001);
    for (i = 0; i < 5; i++) {
        if (sendto(fd, payload, sizeof(payload), 0,
                   (struct sockaddr *)&dest, sizeof(dest)) < 0) {
            perror("sendto");
            return 1;
        }
    }
    printf("sent 5 datagrams to loopback:57009 with dscp %u\n", dscp);
    return 0;
#endif
}
