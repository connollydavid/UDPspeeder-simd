#!/bin/bash
# bench/recipes-check.sh — the applied recipes, run exactly as written.
#
# Two sections, each a claim from doc/applied recipes:
#   A. the fifo levers: a running instance takes `fec`, `timeout` and
#      `queue-len` commands on its fifo and logs each one received
#   B. the moving endpoint: a client started with -r <hostname> follows the
#      DNS answer without a restart. Proved the hard way: two servers on two
#      addresses, traffic flowing through the first, then the DNS answer
#      flips AND the first server dies; the same client process must re-point
#      and pass traffic again.
#
# The DNS side needs the namespace's own resolv.conf (a bind mount inside
# the private mount namespace; the host file is untouched) and a one-file
# DNS responder on 127.0.0.1:53.
#
# Needs no root on the host:
#   unshare -Urnm bash bench/recipes-check.sh
# Exits non-zero on any failed claim.

set -uo pipefail

SPEEDER=${SPEEDER:-./udpspeeder-simd}
[ -n "${TOOLIB:-}" ] && export LD_LIBRARY_PATH=$TOOLIB
WORK=$(mktemp -d /tmp/recipes.XXXXXX)
HOSTNAME_UNDER_TEST=mytunnel.example.net

pass=0; fail=0
claim() { [ "$2" = 0 ] && { echo "ok    $1"; pass=$((pass + 1)); } \
	|| { echo "FAIL  $1"; fail=$((fail + 1)); } }

ip link set lo up
ip addr add 10.9.0.2/32 dev lo 2>/dev/null
ip addr add 10.9.0.3/32 dev lo 2>/dev/null
sysctl -qw net.ipv4.conf.all.accept_local=1

echo "== A: the fifo levers"
$SPEEDER -s -l10.9.0.2:4096 -r127.0.0.1:7777 -f20:10 -k"passwd" \
	--log-level 4 >"$WORK/s.log" 2>&1 & SA=$!
$SPEEDER -c -l127.0.0.1:3333 -r10.9.0.2:4096 -f20:10 -k"passwd" \
	--fifo "$WORK/fifo" --log-level 4 >"$WORK/c.log" 2>&1 & SC=$!
sleep 1
printf 'fec 4:2\n' >"$WORK/fifo"; sleep 0.3
printf 'timeout 5\n' >"$WORK/fifo"; sleep 0.3
printf 'queue-len 100\n' >"$WORK/fifo"; sleep 0.5
grep -q 'got data from fifo.*fec 4:2' "$WORK/c.log"; claim "fifo takes the fec lever (logged)" $?
grep -q 'got data from fifo.*timeout 5' "$WORK/c.log"; claim "fifo takes the timeout lever (logged)" $?
grep -q 'got data from fifo.*queue-len 100' "$WORK/c.log"; claim "fifo takes the queue-len lever (logged)" $?
kill $SC $SA 2>/dev/null; wait $SC $SA 2>/dev/null

echo "== B: the moving endpoint"
# the namespace's own resolver: this bind mount lives and dies with the
# namespace's mount namespace
echo 'nameserver 127.0.0.1' >"$WORK/resolv.conf"
mount --bind "$WORK/resolv.conf" /etc/resolv.conf 2>/dev/null \
	|| { echo "FATAL: cannot bind-mount resolv.conf (run with unshare -Urnm)" >&2; exit 1; }
echo 10.9.0.2 >"$WORK/dns-target"

DNS_TARGET_FILE=$WORK/dns-target python3 - >"$WORK/dns.log" 2>&1 <<'PYEOF' & DNSPID=$!
import os, socket, struct
target_file = os.environ["DNS_TARGET_FILE"]
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(("127.0.0.1", 53))
while True:
    pkt, addr = s.recvfrom(512)
    qd = struct.unpack("!H", pkt[4:6])[0]
    if qd != 1:
        continue
    off = 12
    while pkt[off] != 0:
        off += 1 + pkt[off]
    off += 1; qtype, qclass = struct.unpack("!HH", pkt[off:off + 4])
    if qtype != 1:
        continue
    try:
        rdata = socket.inet_aton(open(target_file).read().strip())
    except OSError:
        continue
    q = pkt[12:off + 4]
    resp = struct.pack("!HHHHHH", struct.unpack("!H", pkt[:2])[0], 0x8400, 1, 1, 0, 0) + q \
        + struct.pack("!HHHIH", 0xC00C, 1, 1, 1, 4) + rdata
    s.sendto(resp, addr)
PYEOF

# the echo service both servers forward to
python3 - >"$WORK/echo.log" 2>&1 <<'PYEOF' & ECHOPID=$!
import socket
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind(("127.0.0.1", 7777))
while True:
    data, addr = s.recvfrom(2048)
    s.sendto(data, addr)
PYEOF

$SPEEDER -s -l10.9.0.2:4096 -r127.0.0.1:7777 -f20:10 -k"passwd" \
	--log-level 2 >"$WORK/s2.log" 2>&1 & S2A=$!
$SPEEDER -s -l10.9.0.3:4096 -r127.0.0.1:7777 -f20:10 -k"passwd" \
	--log-level 2 >"$WORK/s2b.log" 2>&1 & S2B=$!
$SPEEDER -c -l127.0.0.1:3333 -r$HOSTNAME_UNDER_TEST:4096 -f20:10 -k"passwd" \
	--log-level 2 >"$WORK/c2.log" 2>&1 & S2C=$!
sleep 1.5

roundtrip() { python3 -c "
import socket, sys
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.settimeout(2)
s.sendto(b'recipe', ('127.0.0.1', 3333))
sys.exit(0 if s.recvfrom(64)[0] == b'recipe' else 1)
" 2>/dev/null; }

first=1
for i in $(seq 1 10); do
	if roundtrip; then first=0; break; fi
	sleep 0.5
done
claim "client with -r <hostname> passes traffic (via the first answer)" $first

echo 10.9.0.3 >"$WORK/dns-target"
kill $S2A 2>/dev/null; wait $S2A 2>/dev/null
repointed=1
for i in $(seq 1 30); do
	if roundtrip; then repointed=0; break; fi
	sleep 1
done
claim "after the flip and the first server's death, the same client re-points and passes" $repointed

kill $S2C $S2B $ECHOPID $DNSPID 2>/dev/null; wait 2>/dev/null
echo "-- $pass pass, $fail fail"
[ $fail = 0 ]
