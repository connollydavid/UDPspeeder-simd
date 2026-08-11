#!/bin/bash
# bench/dns-live-test.sh - the live DNS integration lane.
#
# Runs the real client with -r tunnel.test:<port> against real local servers,
# with a python DNS stub on 127.0.0.1:53, exercising three paths the offline
# suite cannot reach:
#   - the create-on-first-lease socket path (the client resolves, creates the
#     connected remote socket, and the tunnel carries traffic),
#   - the re-point path (the stub switches tunnel.test to a new address, the
#     client's refresh re-resolves, and the socket re-points),
#   - the TCP fallback (the stub answers UDP with TC=1 and the real answer over
#     TCP, so the client resolves through its TCP path).
#
# Needs root to bind port 53 and to point resolv.conf at 127.0.0.1 (true on a
# GitHub Actions runner). Usage: ./bench/dns-live-test.sh [SERVER_BIN] [CLIENT_BIN]
set -u

SERVER_BIN=${1:-./speederv2}
CLIENT_BIN=${2:-./speederv2}
WORK=$(mktemp -d)
FAIL=0

cleanup() {
    kill "${RECV_PIDS[@]}" 2>/dev/null
    kill "${STUB_PIDS[@]}" "${SERVER_PIDS[@]}" "${CLIENT_PIDS[@]}" 2>/dev/null
    wait 2>/dev/null
    # Tear down the resolv.conf bind mount, then restore the original file.
    umount /etc/resolv.conf 2>/dev/null || true
    cp "$RESOLV_CONF_BAK" /etc/resolv.conf 2>/dev/null || true
    rm -rf "$WORK"
}
trap cleanup EXIT

RECV_PIDS=()
STUB_PIDS=()
SERVER_PIDS=()
CLIENT_PIDS=()

# Bring loopback up: in a fresh network namespace (local testing with
# unshare) 127.0.0.1 is unreachable until lo is up. No-op on a normal host.
ip link set lo up 2>/dev/null || true

# Point resolv.conf at the stub. The header reads it at client startup. Bind
# mount a private file over /etc/resolv.conf so systemd-resolved (which manages
# the real file on a GitHub runner) cannot rewrite it mid-test. Needs root, as
# the whole lane does. Torn down and the original restored in cleanup.
RESOLV_CONF_BAK="$WORK/resolv.conf.bak"
cp /etc/resolv.conf "$RESOLV_CONF_BAK"
printf 'nameserver 127.0.0.1\n' > "$WORK/resolv.conf"
mount --bind "$WORK/resolv.conf" /etc/resolv.conf

# A receiver on a UDP port: collects seq-numbered packets and writes its
# valid/invalid counts to the result file every 0.5 s, so the driver reads the
# count a moment after sending rather than racing a fixed collection window.
# Killed by cleanup.
start_receiver() {
    local addr=$1 port=$2 tag=$3
    python3 - "$addr" "$port" "$WORK/$tag" <<'PYEOF' &
import socket, struct, sys, time
addr, port, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind((addr, port))
s.settimeout(0.2)
seen = {}
end = time.time() + 35
while time.time() < end:
    try:
        data, _ = s.recvfrom(2048)
    except socket.timeout:
        pass
    else:
        if len(data) >= 1400:
            seq = struct.unpack(">I", data[:4])[0]
            seen[seq] = (data[4:1400] == bytes([seq & 0xFF]) * 1396)
    valid = sum(1 for v in seen.values() if v)
    invalid = len(seen) - valid
    with open(out, "w") as f:
        f.write("%d %d\n" % (valid, invalid))
    time.sleep(0.2)
PYEOF
    RECV_PIDS+=($!)
}

# Send N 1400-byte seq-numbered packets into the client's listening port.
send_batch() {
    local port=$1 n=$2
    python3 - "$port" "$n" <<'PYEOF'
import socket, struct, sys, time
port, n = int(sys.argv[1]), int(sys.argv[2])
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
for seq in range(n):
    s.sendto(struct.pack(">I", seq) + bytes([seq & 0xFF]) * 1396,
             ("127.0.0.1", port))
    time.sleep(0.001)
PYEOF
}

result_of() {
    local tag=$1
    sleep 2   # let the sent packets drain through the tunnel and be counted
    cat "$WORK/$tag"
}

dump_logs() {
    echo "--- client log ---"
    cat "$WORK/client1.log" 2>/dev/null | tail -8
    echo "--- server1 log ---"
    cat "$WORK/server1.log" 2>/dev/null | tail -5
    echo "--- stub log ---"
    cat "$WORK/stub1.log" 2>/dev/null | tail -5
}

echo "=== scenario 1: first lease, then re-point ==="
# Stub serves 127.0.0.1 for the first query, 127.0.0.2 after that: the first
# lease points at server 1, the refresh re-resolves and re-points at server 2.
python3 bench/dns_stub.py --addr 127.0.0.1,127.0.0.2 --switch-after 1 \
    >"$WORK/stub1.log" 2>&1 &
STUB_PIDS+=($!)
sleep 0.5

start_receiver 127.0.0.1 49001 recv1
"$SERVER_BIN" -s -l 127.0.0.1:49000 -r 127.0.0.1:49001 \
    --log-level 0 >"$WORK/server1.log" 2>&1 &
SERVER_PIDS+=($!)
start_receiver 127.0.0.2 49011 recv2
"$SERVER_BIN" -s -l 127.0.0.2:49000 -r 127.0.0.2:49011 \
    --log-level 0 >"$WORK/server2.log" 2>&1 &
SERVER_PIDS+=($!)

"$CLIENT_BIN" -c -l 127.0.0.1:49020 -r tunnel.test:49000 \
    --log-level 0 >"$WORK/client1.log" 2>&1 &
CLIENT_PIDS+=($!)

sleep 3   # first resolution + connected socket creation
send_batch 49020 100
result_of recv1
read -r v1 i1 < "$WORK/recv1"
echo "  first-lease: valid=$v1 invalid=$i1"
[ "$v1" -gt 0 ] && [ "$i1" -eq 0 ] || { echo "FAIL  first-lease path"; dump_logs; FAIL=1; }

sleep 16  # past the refresh lead (half the 30 s effective-TTL floor)
send_batch 49020 100
result_of recv2
read -r v2 i2 < "$WORK/recv2"
echo "  re-point:   valid=$v2 invalid=$i2"
[ "$v2" -gt 0 ] && [ "$i2" -eq 0 ] || { echo "FAIL  re-point path"; FAIL=1; }

kill "${STUB_PIDS[@]}" "${SERVER_PIDS[@]}" "${CLIENT_PIDS[@]}" 2>/dev/null
wait 2>/dev/null
STUB_PIDS=(); SERVER_PIDS=(); CLIENT_PIDS=()

echo "=== scenario 2: TCP fallback on a truncated UDP answer ==="
python3 bench/dns_stub.py --addr 127.0.0.1 --truncate \
    >"$WORK/stub2.log" 2>&1 &
STUB_PIDS+=($!)
sleep 0.5

start_receiver 127.0.0.1 49101 recv3
"$SERVER_BIN" -s -l 127.0.0.1:49100 -r 127.0.0.1:49101 \
    --log-level 0 >"$WORK/server3.log" 2>&1 &
SERVER_PIDS+=($!)
"$CLIENT_BIN" -c -l 127.0.0.1:49120 -r tunnel.test:49100 \
    --log-level 0 >"$WORK/client2.log" 2>&1 &
CLIENT_PIDS+=($!)

sleep 4   # UDP query -> TC=1 -> TCP fallback -> resolution
send_batch 49120 100
result_of recv3
read -r v3 i3 < "$WORK/recv3"
echo "  tcp-fallback: valid=$v3 invalid=$i3"
[ "$v3" -gt 0 ] && [ "$i3" -eq 0 ] || { echo "FAIL  tcp-fallback path"; FAIL=1; }

[ "$FAIL" -eq 0 ] && echo "ALL DNS live scenarios passed"
exit "$FAIL"