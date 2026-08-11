#!/usr/bin/env python3
"""dns_stub.py - a minimal DNS server for the live integration lane.

Answers A queries for a single test name (default tunnel.test) with the
addresses given on the command line, so the client's DNS lease manager can be
exercised end to end against real sockets. Two knobs drive the scenarios:

  --switch-after N   after N queries, serve the second address instead of the
                     first, so the client's refresh re-resolves and re-points.
  --truncate         answer UDP queries with TC=1 and no records (forcing the
                     client's TCP fallback), and serve the real answer over TCP.

Everything else gets NXDOMAIN. The wire format is the RFC 1035 subset the
client's parser understands: header, question, A answers, optional SOA in
authority for negative caching.
"""

import argparse
import socket
import struct
import threading

NAME = "tunnel.test"


def parse_question(data):
    """Return (qname, qtype, qend) where qend is just past the question."""
    i = 12
    while data[i] != 0:
        i += 1 + data[i]
    qend = i + 1
    qtype = struct.unpack(">H", data[i + 1:i + 3])[0]
    # decode the labels for matching
    parts = []
    j = 12
    while data[j] != 0:
        ln = data[j]
        parts.append(data[j + 1:j + 1 + ln].decode("ascii", "replace"))
        j += 1 + ln
    return ".".join(parts), qtype, qend


def make_response(query, addrs, truncate, nxdomain):
    qid = query[:2]
    qname, qtype, qend = parse_question(query)
    question = query[12:qend] + struct.pack(">HH", qtype, 1)

    if nxdomain:
        # NXDOMAIN with an SOA in authority (RFC 2308), so the client caches it
        header = qid + b"\x81\x83" + b"\x00\x01\x00\x00\x00\x01\x00\x00"
        soa = b"\xc0\x0c" + struct.pack(">HHIH", 6, 1, 60, 4) + b"\x00\x00\x00\x00"
        return header + question + soa

    if truncate:
        # TC=1 (byte2 bit 1), no answers: the client must fall back to TCP
        header = qid + b"\x83\x80" + b"\x00\x01\x00\x00\x00\x00\x00\x00"
        return header + question

    header = qid + b"\x81\x80" + struct.pack(">HHHH", 1, len(addrs), 0, 0)
    answers = b""
    for addr in addrs:
        packed = socket.inet_aton(addr)
        answers += b"\xc0\x0c" + struct.pack(">HHIH", 1, 1, 1, 4) + packed
    return header + question + answers


class Stub:
    def __init__(self, addrs, switch_after, truncate):
        self.addrs = addrs
        self.switch_after = switch_after
        self.truncate = truncate
        self.queries = 0
        self.lock = threading.Lock()

    def current(self):
        with self.lock:
            self.queries += 1
            n = self.queries
        if n > self.switch_after and len(self.addrs) > 1:
            return self.addrs[1:]
        return self.addrs

    def serve_udp(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.bind(("127.0.0.1", 53))
        while True:
            data, peer = s.recvfrom(4096)
            qname, qtype, _ = parse_question(data)
            print("udp query %s type %d" % (qname, qtype), flush=True)
            if qname != NAME or qtype != 1:
                resp = make_response(data, [], False, True)
            else:
                resp = make_response(data, self.current(), self.truncate, False)
            s.sendto(resp, peer)

    def serve_tcp(self):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        s.bind(("127.0.0.1", 53))
        s.listen(4)
        while True:
            conn, _ = s.accept()
            try:
                pfx = conn.recv(2, socket.MSG_WAITALL)
                if len(pfx) != 2:
                    continue
                want = struct.unpack(">H", pfx)[0]
                data = conn.recv(want, socket.MSG_WAITALL)
                qname, qtype, _ = parse_question(data)
                print("tcp query %s type %d" % (qname, qtype), flush=True)
                if qname != NAME or qtype != 1:
                    resp = make_response(data, [], False, True)
                else:
                    resp = make_response(data, self.current(), False, False)
                conn.sendall(struct.pack(">H", len(resp)) + resp)
            finally:
                conn.close()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--addr", required=True,
                    help="comma-separated addresses to answer for tunnel.test")
    ap.add_argument("--switch-after", type=int, default=10 ** 9,
                    help="serve the second address after this many queries")
    ap.add_argument("--truncate", action="store_true",
                    help="answer UDP with TC=1, real answer only over TCP")
    args = ap.parse_args()

    stub = Stub(args.addr.split(","), args.switch_after, args.truncate)
    t = threading.Thread(target=stub.serve_tcp, daemon=True)
    t.start()
    stub.serve_udp()


if __name__ == "__main__":
    main()