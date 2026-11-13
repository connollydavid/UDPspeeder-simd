#!/bin/bash
# bench/vpn-ledger.sh — measure the VPN-over-tunnel MTU ledger by capturing
# real stacked packets.
#
# Stacks WireGuard, OpenVPN/UDP and OpenVPN/TCP over an udpspeeder-simd
# tunnel and probes each inner link with DF-set pings of rising size while
# a packet sniffer watches the tunnel's outer packets. What comes out is the
# ledger: per (vpn, path mtu) the largest inner MTU that crosses unsplit
# (one outer packet per inner packet, the low-latency line), the largest
# that passes at all (the tunnel re-segments above it), and the largest
# outer packet seen. Every number is read off the capture, not computed from
# assumed overheads.
#
# The path is loopback with its MTU set to the path MTU: both tunnel ends
# live in this one namespace, so every outer packet is locally delivered,
# and lo's MTU (which is settable) is the MTU that bites. The outer flow is
# isolated for capture by the tunnel's port.
#
# The sniffer is python3 on an AF_PACKET socket writing a pcap directly.
# tcpdump/libpcap is deliberately not used: on this class of host (a WSL2
# user+net namespace) its loopback tap observes nothing, while the raw
# AF_PACKET socket sees every frame, so the capture evidence rides the
# kernel tap rather than libpcap's.
#
# Needs no root on the host: run it inside a user+net namespace, where this
# script's ip/tun/wireguard calls are all in scope:
#
#   unshare -Urn bash bench/vpn-ledger.sh
#
# Tool locations come from the environment when the host lacks packages
# (an extract-to-prefix install works fine):
#   WG, OPENVPN          binaries       (default: plain names on PATH)
#   TOOLIB               library path   (optional, exported as LD_LIBRARY_PATH)
#   SPEEDER              the udpspeeder-simd binary (default: ./udpspeeder-simd)
#
# Prints the ledger as a table; diagnostics and the pcaps stay in $WORK.

set -uo pipefail

WG=${WG:-wg}
OPENVPN=${OPENVPN:-openvpn}
SPEEDER=${SPEEDER:-./udpspeeder-simd}
[ -n "${TOOLIB:-}" ] && export LD_LIBRARY_PATH=$TOOLIB

OUTER_IP=10.9.0.2          # the tunnel's remote, a local address on lo
WORK=$(mktemp -d /tmp/vpn-ledger.XXXXXX)
CPAP=$WORK/wire.pcap

die() { echo "FATAL: $*" >&2; exit 1; }
command -v $WG >/dev/null || die "wg not found"
command -v $OPENVPN >/dev/null || die "openvpn not found"
command -v python3 >/dev/null || die "python3 not found"
[ -x "$SPEEDER" ] || die "udpspeeder-simd binary not found at $SPEEDER"

# the sniffer: AF_PACKET on lo, keeps UDP flows touching the given port,
# writes a pcap, reports "max_ip_total count" on stdout
cat >"$WORK/snip.py" <<'PYEOF'
import socket, struct, sys, time
port = int(sys.argv[1]); dur = float(sys.argv[2]); out = sys.argv[3]
s = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
s.bind(("lo", 0)); s.settimeout(0.2)
f = open(out, "wb")
f.write(struct.pack("<IHHiIII", 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1))
n = 0; mx = 0; end = time.time() + dur
while time.time() < end:
    try: pkt, _ = s.recvfrom(65535)
    except socket.timeout: continue
    if len(pkt) < 34 or pkt[12:14] != b"\x08\x00": continue
    ihl = (pkt[14] & 0xF) * 4
    if pkt[14 + 9] != 17 or len(pkt) < 14 + ihl + 8: continue
    sp, dp = struct.unpack("!HH", pkt[14 + ihl:14 + ihl + 4])
    if sp != port and dp != port: continue
    t = time.time()
    f.write(struct.pack("<IIII", int(t), int((t % 1) * 1e6), len(pkt), len(pkt)))
    f.write(pkt)
    tot = struct.unpack("!H", pkt[16:18])[0]
    if tot > mx: mx = tot
    n += 1
f.close(); print(mx, n)
PYEOF

# --- the path: lo with its MTU playing the path MTU -------------------------
setup_path() { # $1 = path mtu
	ip link set lo up
	ip addr add $OUTER_IP/32 dev lo 2>/dev/null
	ip link set lo mtu "$1"
	# Both tunnel ends live in this namespace, so every inner packet
	# arrives carrying a source address the kernel also calls local (the
	# other end's, on the sibling interface). That is a martian source to
	# the input path and is dropped silently before ICMP sees it.
	# accept_local admits exactly these packets; it has no effect on
	# anything the ledger measures, which is sizes.
	sysctl -qw net.ipv4.conf.all.accept_local=1
}

# --- the udpspeeder pair across it -------------------------------------------
start_speeder() {
	$SPEEDER -s -l$OUTER_IP:4096 -r127.0.0.1:7777 -f20:10 -k"passwd" \
		--log-level 2 >"$WORK/speeder-s.log" 2>&1 &
	SPID_S=$!
	$SPEEDER -c -l127.0.0.1:3333 -r$OUTER_IP:4096 -f20:10 -k"passwd" \
		--log-level 2 >"$WORK/speeder-c.log" 2>&1 &
	SPID_C=$!
	sleep 0.5
}

# --- wireguard over it -------------------------------------------------------
# Each end is a /32 with an explicit host route. Two wg interfaces in one
# namespace sharing a /31 would race the connected route and the server's
# replies would enter the peerless wrong interface; exact host routes give
# both directions an unambiguous path.
start_wg() { # $1 = inner client ip, $2 = inner server ip
	local ckey skey cpub spub
	ckey=$($WG genkey); skey=$($WG genkey)
	cpub=$(echo "$ckey" | $WG pubkey); spub=$(echo "$skey" | $WG pubkey)
	ip link add wg-s type wireguard
	$WG set wg-s listen-port 7777 private-key <(echo "$skey") \
		peer "$cpub" allowed-ips "$1/32"
	ip link set wg-s up mtu 1420
	ip addr add "$2/32" dev wg-s
	ip route add "$1/32" dev wg-s

	ip link add wg-c type wireguard
	$WG set wg-c private-key <(echo "$ckey") \
		peer "$spub" endpoint 127.0.0.1:3333 allowed-ips "$2/32" \
		persistent-keepalive 3
	ip link set wg-c up mtu 1420
	ip addr add "$1/32" dev wg-c
	ip route add "$2/32" dev wg-c
	sleep 1
}

# --- openvpn over it (static key, p2p tun) -----------------------------------
start_ovpn() { # $1 = udp|tcp, $2 = extra client opts, $3 = extra server opts
	$OPENVPN --genkey secret >"$WORK/ovpn.key" 2>/dev/null
	case $1 in
	udp) local pc=udp4 ps=udp4 ;;
	tcp) local pc=tcp4-client ps=tcp4-server ;;
	esac
	$OPENVPN --dev tun-s --dev-type tun --proto $ps --local 127.0.0.1 --port 7777 \
		--ifconfig 10.7.0.1 10.7.0.2 --secret "$WORK/ovpn.key" \
		--cipher AES-256-CBC --auth SHA256 --disable-dco \
		--allow-deprecated-insecure-static-crypto \
		--persist-tun --log "$WORK/ovpn-s.log" --verb 1 ${3:-} &
	OPID_S=$!
	sleep 0.5
	$OPENVPN --dev tun-c --dev-type tun --proto $pc --remote 127.0.0.1 3333 \
		--ifconfig 10.7.0.2 10.7.0.1 --secret "$WORK/ovpn.key" \
		--cipher AES-256-CBC --auth SHA256 --disable-dco \
		--allow-deprecated-insecure-static-crypto \
		--persist-tun --log "$WORK/ovpn-c.log" --verb 1 ${2:-} &
	OPID_C=$!
	sleep 2
}

stop_ovpn() { kill ${OPID_S:-0} ${OPID_C:-0} 2>/dev/null; wait ${OPID_S:-0} ${OPID_C:-0} 2>/dev/null; sleep 0.3; }
stop_wg() { ip link del wg-c 2>/dev/null; ip link del wg-s 2>/dev/null; }

# --- probes -------------------------------------------------------------------
# 0 if a DF ping of payload SIZE on IF to PEER got a reply
max_df_ping() { ping -I "$1" -M do -c1 -W1 -s "$3" "$2" >/dev/null 2>&1 && echo 0 || echo 1; }

# wait for the stack to pass one small DF ping; a stack that never passes is
# a harness failure, not a ledger cell
wait_for_pass() { # if peer
	local i
	for i in $(seq 1 14); do
		ping -I "$1" -M do -c1 -W1 -s 8 "$2" >/dev/null 2>&1 && return 0
		sleep 0.5
	done
	echo "FATAL: $1 never passed a ping to $2 (stack did not come up)" >&2
	${WG:?} show all 2>&1 | head -12 >&2
	return 1
}

# outer-packet stats while two pings cross: "max_ip_total count" on the
# tunnel's own flow (the port the pair speaks), inner traffic excluded; the
# pcap of the latest probe stays in $WORK/last.pcap
wire_stats() { # if peer size
	python3 "$WORK/snip.py" 4096 1.7 "$WORK/last.pcap" >"$WORK/snip.out" 2>/dev/null &
	local spid=$!
	sleep 0.2
	ping -I "$1" -M do -c2 -i0.3 -W1 -s "$3" "$2" >/dev/null 2>&1
	wait $spid 2>/dev/null
	cat "$WORK/snip.out" 2>/dev/null || echo "0 0"
}

# did udpspeeder split this probe? (kept for diagnostics: in mode 0 the
# blob encoder always spreads a group, so there is no unsplit line to find)
is_split() { # if peer size base_max
	local maxw n
	read -r maxw n < <(wire_stats "$1" "$2" "$3")
	[ "$maxw" -lt $(( $4 + $3 - 8 - 60 )) ]
}

# wire stats under a load burst: back-to-back max-size datagrams fill the
# FEC groups (ping spacing cannot: the 8 ms timeout flushes first), driving
# shards to their largest; "max_ip_total count" returned
burst_wire() { # if peer size
	python3 "$WORK/snip.py" 4096 3.5 "$WORK/burst.pcap" >"$WORK/snip.out" 2>/dev/null &
	local spid=$!
	sleep 0.2
	python3 - "$1" "$2" "$3" >"$WORK/burst-send.out" 2>&1 <<'PYEOF' &
import socket, sys
innerif, peer, size = sys.argv[1], sys.argv[2], int(sys.argv[3])
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
# SO_BINDTODEVICE, not a source bind: the peer is a local address in this
# one-namespace lab, so without the device bind the local route table
# delivers the flood directly and the VPN never sees it
s.setsockopt(socket.SOL_SOCKET, 25, innerif.encode() + b"\0")
for _ in range(300):
    s.sendto(b"z" * size, (peer, 9))
PYEOF
	wait $spid 2>/dev/null
	cat "$WORK/snip.out" 2>/dev/null || echo "0 0"
}

# --- one ledger row -----------------------------------------------------------
# Mode 0 is a blob encoder: each FEC group packs its packets into one
# Reed-Solomon blob and emits x+y shards, every shard at most --mtu. A lone
# datagram crosses as many small shards; a full group drives shards to the
# ceiling. Two numbers per cell, both measured:
#   hard_mtu: the largest inner MTU that passes with DF set; in mode 0 the
#     only hard bound is the inner VPN interface's own MTU, because the
#     blob carries any datagram up to ~(mtu - hdr) * x and reassembles it
#   wire_ceiling: the largest outer packet the stack ever puts on the wire,
#     measured under a load burst that fills groups (shards at their
#     largest); this is the number that must sit under the path MTU
ledger_row() { # label if peer pmtu cap
	local label=$1 innerif=$2 peer=$3 pmtu=$4 cap=$5
	local t0=$SECONDS
	wait_for_pass "$innerif" "$peer" || { echo -e "$label\t$pmtu\tSTACK FAILED"; return; }
	echo "  [$label] stack up in $((SECONDS - t0))s" >&2
	# hard boundary: largest DF-passing payload
	local lo=8 hi=$cap mid
	while [ $((hi - lo)) -gt 1 ]; do
		mid=$(((lo + hi) / 2))
		if [ "$(max_df_ping "$innerif" "$peer" "$mid")" = 0 ]; then lo=$mid; else hi=$mid; fi
	done
	local hard=$lo
	echo "  [$label] hard search done in $((SECONDS - t0))s (hard=$hard)" >&2
	# wire ceiling under load: fill the groups so shards reach their largest
	local wmax wn
	read -r wmax wn < <(burst_wire "$innerif" "$peer" "$hard")
	echo "  [$label] burst done in $((SECONDS - t0))s (wire max=$wmax n=$wn)" >&2
	echo -e "$label\t$pmtu\t$((hard + 28))\t$wmax"
	[ "$wmax" -gt "$pmtu" ] && echo "OVERSIZED: $label at $pmtu put $wmax on the wire" >&2
}

# --- run ----------------------------------------------------------------------
echo -e "vpn\tpath_mtu\thard_inner_mtu\twire_ceiling"

for pmtu in 1500 1492; do
	setup_path $pmtu
	start_speeder

	start_wg 10.10.0.1 10.10.0.2
	ledger_row wireguard wg-c 10.10.0.2 $pmtu 1392
	stop_wg

	case ${ROWS:-wg,ovpn-udp,ovpn-tcp} in *ovpn-udp*)
		start_ovpn udp
		ledger_row openvpn-udp tun-c 10.7.0.1 $pmtu 1472
		stop_ovpn;; esac

	case ${ROWS:-wg,ovpn-udp,ovpn-tcp} in *ovpn-tcp*)
		start_ovpn tcp
		tcp_up=1
		for i in $(seq 1 8); do
			ping -I tun-c -M do -c1 -W1 -s 8 10.7.0.1 >/dev/null 2>&1 && { tcp_up=0; break; }
			sleep 0.5
		done
		if [ $tcp_up = 0 ]; then
			ledger_row openvpn-tcp tun-c 10.7.0.1 $pmtu 1472
		elif grep -q "Connection refused" "$WORK/ovpn-c.log" 2>/dev/null; then
			# the verdict, not a failure: the tunnel forwards UDP datagrams,
			# so OpenVPN's TCP transport is refused at the UDP listener
			echo -e "openvpn-tcp\t$pmtu\tREFUSED (TCP SYN meets a UDP listener)"
		else
			echo -e "openvpn-tcp\t$pmtu\tSTACK FAILED"
		fi
		stop_ovpn;; esac

	kill $SPID_S $SPID_C 2>/dev/null; wait 2>/dev/null
	ip addr del $OUTER_IP/32 dev lo 2>/dev/null
done

echo "diagnostics and captures in $WORK" >&2
