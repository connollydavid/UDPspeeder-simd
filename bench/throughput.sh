#!/bin/bash
# bench/throughput.sh — Measure end-to-end UDP tunnel throughput
#
# Usage: ./bench/throughput.sh <speederv2_binary> [options]
#   --duration N     seconds per iteration (default: 5)
#   --fec X:Y        FEC parameter (default: disabled)
#   --disable-fec    explicitly disable FEC
#   --iterations N   number of runs, reports median (default: 3)
#   --json           output JSON for github-action-benchmark
#
# Topology:
#   Python sender → speederv2 client (:20002) → speederv2 server (:20000) → Python receiver (:20001)

set -euo pipefail

BINARY=""
DURATION=5
FEC_ARGS="--disable-fec"
FEC_LABEL="no-fec"
ITERATIONS=3
JSON=0

# --- Argument parsing ---
while [[ $# -gt 0 ]]; do
    case "$1" in
        --duration) DURATION="$2"; shift 2 ;;
        --fec) FEC_ARGS="-f $2"; FEC_LABEL="fec-${2//:/-}"; shift 2 ;;
        --disable-fec) FEC_ARGS="--disable-fec"; FEC_LABEL="no-fec"; shift ;;
        --iterations) ITERATIONS="$2"; shift 2 ;;
        --json) JSON=1; shift ;;
        -*) echo "Unknown option: $1" >&2; exit 1 ;;
        *) BINARY="$1"; shift ;;
    esac
done

if [[ -z "$BINARY" ]]; then
    echo "Usage: $0 <speederv2_binary> [--duration N] [--fec X:Y] [--json]" >&2
    exit 1
fi

if [[ ! -x "$BINARY" ]]; then
    echo "Error: $BINARY is not executable" >&2
    exit 1
fi

# --- Ports ---
PORT_TUNNEL=20000
PORT_APP=20001
PORT_CLIENT=20002

# --- Cleanup trap ---
PIDS=()
cleanup() {
    for pid in "${PIDS[@]}"; do
        kill "$pid" 2>/dev/null || true
        wait "$pid" 2>/dev/null || true
    done
    PIDS=()
}
trap cleanup EXIT

# --- Single throughput run ---
run_once() {
    local tmpfile
    tmpfile=$(mktemp)
    cleanup

    # Start UDP receiver
    python3 -c "
import socket, time
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind(('127.0.0.1', $PORT_APP))
sock.settimeout($DURATION + 4)
total = 0
start = None
try:
    while True:
        data = sock.recv(65535)
        if start is None:
            start = time.monotonic()
        total += len(data)
except socket.timeout:
    pass
elapsed = time.monotonic() - start if start else 0
print(f'{total} {elapsed}')
" > "$tmpfile" 2>/dev/null &
    PIDS+=($!)

    # Start speederv2 server
    $BINARY -s -l 127.0.0.1:$PORT_TUNNEL -r 127.0.0.1:$PORT_APP $FEC_ARGS --log-level 0 &
    PIDS+=($!)

    # Start speederv2 client
    $BINARY -c -l 127.0.0.1:$PORT_CLIENT -r 127.0.0.1:$PORT_TUNNEL $FEC_ARGS --log-level 0 &
    PIDS+=($!)

    # Wait for tunnel to initialize
    sleep 1

    # Start UDP sender (runs for DURATION seconds)
    python3 -c "
import socket, time
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
payload = b'\x00' * 1400
end = time.monotonic() + $DURATION
while time.monotonic() < end:
    try:
        sock.sendto(payload, ('127.0.0.1', $PORT_CLIENT))
    except OSError:
        pass
"

    # Give receiver time to drain
    sleep 2

    # Stop everything
    cleanup

    # Parse result
    local result
    result=$(cat "$tmpfile")
    rm -f "$tmpfile"

    local bytes elapsed
    bytes=$(echo "$result" | awk '{print $1}')
    elapsed=$(echo "$result" | awk '{print $2}')

    if [[ -z "$bytes" || "$bytes" == "0" ]]; then
        echo "0" # failed run
        return
    fi

    # Output MB/s with 1 decimal place
    python3 -c "print(f'{$bytes / $elapsed / 1e6:.1f}')"
}

# --- Run iterations and compute median ---
results=()
for i in $(seq 1 "$ITERATIONS"); do
    if [[ $JSON -eq 0 ]]; then
        echo "  Run $i/$ITERATIONS..." >&2
    fi
    mbps=$(run_once)
    results+=("$mbps")
done

# Sort and pick median
IFS=$'\n' sorted=($(printf '%s\n' "${results[@]}" | sort -n)); unset IFS
median_idx=$(( ITERATIONS / 2 ))
median=${sorted[$median_idx]}

# --- Output ---
median=${median:-0.0}
if [[ $JSON -eq 1 ]]; then
    printf '{"name": "throughput/%s", "unit": "MB/s", "value": %s}\n' "$FEC_LABEL" "$median"
else
    echo "Throughput ($FEC_LABEL): $median MB/s  [runs: ${results[*]}]"
fi
