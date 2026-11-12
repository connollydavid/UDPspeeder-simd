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

int main(void) {
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
}
