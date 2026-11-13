#!/bin/bash
# bench/vpn-ledger.sh — measure the VPN-over-tunnel MTU ledger by capturing
# real stacked packets.
#
# Stacks WireGuard, OpenVPN/UDP and OpenVPN/TCP over an udpspeeder-simd
# tunnel across a veth pair whose MTU plays the path MTU, then probes each
# inner link with DF-set pings of rising size while tcpdump watches the
# outer wire. What comes out is the ledger: per (vpn, path mtu) the largest
# inner payload that passes, the inner MTU it implies, whether udpspeeder
# split the packet at that size, and the largest wire packet seen. Every
# number is read off the capture, not computed from assumed overheads.
#
# Needs no root on the host: run it inside a user+net namespace, where this
# script's ip/tun/wireguard calls are all in scope:
#
#   unshare -Urn bash bench/vpn-ledger.sh
#
# Tool locations come from the environment when the host lacks packages
# (an extract-to-prefix install works fine):
#   WG, OPENVPN, TCPDUMP   binaries       (default: plain names on PATH)
#   TOOLIB                 library path   (optional, exported as LD_LIBRARY_PATH)
#   SPEEDER                the udpspeeder-simd binary (default: ./udpspeeder-simd)
#
# Prints the ledger as a table; diagnostics go to stderr.

set -uo pipefail

WG=${WG:-wg}
OPENVPN=${OPENVPN:-openvpn}
TCPDUMP=${TCPDUMP:-tcpdump}
SPEEDER=${SPEEDER:-./udpspeeder-simd}
[ -n "${TOOLIB:-}" ] && export LD_LIBRARY_PATH=$TOOLIB

WAN_C=10.9.0.1
WAN_S=10.9.0.2
WORK=$(mktemp -d /tmp/vpn-ledger.XXXXXX)
CPAP=$WORK/wire.pcap

die() { echo "FATAL: $*" >&2; exit 1; }
command -v $WG >/dev/null || die "wg not found"
command -v $OPENVPN >/dev/null || die "openvpn not found"
command -v $TCPDUMP >/dev/null || die "tcpdump not found"
[ -x "$SPEEDER" ] || die "udpspeeder-simd binary not found at $SPEEDER"

# --- wire: one veth pair, mtu plays the path mtu --------------------------
setup_wan() { # $1 = path mtu
	ip link add veth-wan-c type veth peer name veth-wan-s
	ip link set veth-wan-c up mtu "$1"
	ip link set veth-wan-s up mtu "$1"
	ip addr add $WAN_C/24 dev veth-wan-c
	ip addr add $WAN_S/24 dev veth-wan-s
	ip link set lo up
	# Both tunnel ends live in this one namespace, so every inner packet
	# arrives carrying a source address the kernel also calls local (it is
	# the other end's address, assigned to the sibling interface). That is
	# a martian source to the input path, and it is dropped silently before
	# ICMP ever sees it. accept_local admits exactly these packets; it has
	# no effect on anything the ledger measures, which is sizes.
	sysctl -qw net.ipv4.conf.all.accept_local=1
}

# --- the udpspeeder pair across it -----------------------------------------
start_speeder() {
	$SPEEDER -s -l$WAN_S:4096 -r127.0.0.1:7777 -f20:10 -k"passwd" \
		--log-level 2 >"$WORK/speeder-s.log" 2>&1 &
	SPID_S=$!
	$SPEEDER -c -l127.0.0.1:3333 -r$WAN_S:4096 -f20:10 -k"passwd" \
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
	$OPENVPN --dev tun --dev-type tun --proto $ps --local 127.0.0.1 --port 7777 \
		--ifconfig 10.7.0.1 10.7.0.2 --secret "$WORK/ovpn.key" \
		--cipher AES-256-CBC --auth SHA256 --disable-dco \
		--allow-deprecated-insecure-static-crypto \
		--persist-tun --log "$WORK/ovpn-s.log" --verb 1 ${3:-} &
	OPID_S=$!
	sleep 0.5
	$OPENVPN --dev tun --dev-type tun --proto $pc --remote 127.0.0.1 3333 \
		--ifconfig 10.7.0.2 10.7.0.1 --secret "$WORK/ovpn.key" \
		--cipher AES-256-CBC --auth SHA256 --disable-dco \
		--allow-deprecated-insecure-static-crypto \
		--persist-tun --log "$WORK/ovpn-c.log" --verb 1 ${2:-} &
	OPID_C=$!
	sleep 2
}

stop_ovpn() { kill ${OPID_S:-0} ${OPID_C:-0} 2>/dev/null; wait 2>/dev/null; sleep 0.3; }
stop_wg() { ip link del wg-c 2>/dev/null; ip link del wg-s 2>/dev/null; }

# --- probes -------------------------------------------------------------------
# max_df_ping IF ACE SIZE: 0 if a DF ping of payload SIZE got a reply
max_df_ping() { ping -I "$1" -M do -c1 -W1 -s "$3" "$2" >/dev/null 2>&1 && echo 0 || echo 1; }

# wait for the stack to pass one small DF ping, then report; a stack that
# never passes is a harness failure, not a ledger cell
wait_for_pass() { # if peer
	local i
	for i in $(seq 1 20); do
		ping -I "$1" -M do -c1 -W1 -s 8 "$2" >/dev/null 2>&1 && return 0
		sleep 0.5
	done
	echo "FATAL: $1 never passed a ping to $2 (stack did not come up)" >&2
	${WG:?} show all 2>&1 | head -12 >&2
	ip -br a 2>&1 | head -8 >&2
	return 1
}

# largest passing payload on $1->$2 by binary search in [0,$3]
largest_pass() { # if peerIP hi
	wait_for_pass "$1" "$2" || return 1
	local lo=0 hi=$3 mid
	while [ $((hi - lo)) -gt 1 ]; do
		mid=$(((lo + hi) / 2))
		if [ "$(max_df_ping "$1" "$2" "$mid")" = 0 ]; then lo=$mid; else hi=$mid; fi
	done
	echo $lo
}

# wire stats during two pings: echoes "max_wire_len count"
wire_stats() { # if peer size
	: >"$CPAP"
	$TCPDUMP -i veth-wan-s -nn -w "$CPAP" 'udp or tcp' >/dev/null 2>&1 &
	local tpid=$!
	sleep 0.3
	ping -I "$1" -M do -c2 -W1 -s "$3" "$2" >/dev/null 2>&1
	sleep 0.3
	kill $tpid 2>/dev/null; wait $tpid 2>/dev/null
	$TCPDUMP -r "$CPAP" -nn 2>/dev/null \
		| sed -n 's/.* length \([0-9]*\)$/\1/p' \
		| sort -n | awk '{ m = $1; n++ } END { print m + 0, n + 0 }'
}

# did udpspeeder split this probe? wire packet count far above baseline
is_split() { # if peer size base_count
	local maxw n
	read -r maxw n < <(wire_stats "$1" "$2" "$3")
	[ "$n" -gt $(($4 + 2)) ]
}

# --- one ledger row -----------------------------------------------------------
# Two numbers per cell, both measured:
#   unsplit_mtu: the largest inner MTU whose packets cross as ONE udpspeeder
#     segment each (the low-latency configuration; above it every inner
#     packet pays a split and a second wire packet)
#   hard_mtu: the largest inner MTU that passes at all with DF set; at the
#     top the tunnel survives by re-segmenting, which is the resilience
#     claim, not the tuning one
ledger_row() { # label if peer pmtu cap
	local label=$1 innerif=$2 peer=$3 pmtu=$4 cap=$5
	wait_for_pass "$innerif" "$peer" || { echo -e "$label\t$pmtu\tSTACK FAILED"; return; }
	# baseline wire count from small probes
	local base_maxw base_n
	read -r base_maxw base_n < <(wire_stats "$innerif" "$peer" 8)
	# unsplit boundary: binary search where the wire count stays near base
	local lo=8 hi=$cap mid
	while [ $((hi - lo)) -gt 1 ]; do
		mid=$(((lo + hi) / 2))
		if is_split "$innerif" "$peer" "$mid" "$base_n"; then hi=$mid; else lo=$mid; fi
	done
	local unsplit=$lo
	# hard boundary: largest DF-passing payload
	lo=8; hi=$cap
	while [ $((hi - lo)) -gt 1 ]; do
		mid=$(((lo + hi) / 2))
		if [ "$(max_df_ping "$innerif" "$peer" "$mid")" = 0 ]; then lo=$mid; else hi=$mid; fi
	done
	local hard=$lo
	# wire max at the unsplit size, for the fits-the-path claim
	local wmax wn
	read -r wmax wn < <(wire_stats "$innerif" "$peer" "$unsplit")
	echo -e "$label\t$pmtu\t$((unsplit + 28))\t$((hard + 28))\t$wmax"
}

# --- run ----------------------------------------------------------------------
echo -e "vpn\tpath_mtu\tunsplit_inner_mtu\thard_inner_mtu\tmax_wire_len"

for pmtu in 1500 1492; do
	setup_wan $pmtu
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
		ledger_row openvpn-tcp tun-c 10.7.0.1 $pmtu 1472
		stop_ovpn;; esac

	kill $SPID_S $SPID_C 2>/dev/null; wait 2>/dev/null
	ip link del veth-wan-c 2>/dev/null
done

echo "diagnostics and captures in $WORK" >&2
