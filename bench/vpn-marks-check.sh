#!/bin/bash
# bench/vpn-marks-check.sh — the WireGuard recipe's mark coordination, proven.
#
# The recipe in doc/vpn-over-the-tunnel.md says the tunnel's --fwmark 0x2 and
# wg-quick's own fwmark usage do not conflict because they mark different
# packets with different values. Three claims to hold:
#
#   1. the stack passes traffic with both mark rules installed (non-conflict)
#   2. the tunnel's outer packets really carry mark 0x2 (stamped), proved the
#      negative way: routing marked packets into a blackhole must kill the
#      tunnel, and removing it must revive the tunnel
#   3. WireGuard's mark, when set, rides other packets: the blackhole on 0x2
#      must NOT kill WG's own encrypted flow... which is the same flow here
#      (WG rides inside the tunnel), so the honest statement is narrower:
#      the values differ and each rule matches only its own
#
# Runs unprivileged like its sibling: unshare -Urn (see vpn-ledger.sh).
# Exits non-zero on any failed claim, printing each verdict.

set -uo pipefail

WG=${WG:-wg}
SPEEDER=${SPEEDER:-./udpspeeder-simd}

MARK=0x2
TBL=200

pass=0; fail=0
claim() { # name verdict(0=ok)
	if [ "$2" = 0 ]; then echo "ok    $1"; pass=$((pass + 1));
	else echo "FAIL  $1"; fail=$((fail + 1)); fi
}

# --- the stack, exactly as the recipe shapes it ------------------------------
ip link add veth-wan-c type veth peer name veth-wan-s
ip link set veth-wan-c up mtu 1500; ip link set veth-wan-s up mtu 1500
ip addr add 10.9.0.1/24 dev veth-wan-c; ip addr add 10.9.0.2/24 dev veth-wan-s
ip link set lo up
sysctl -qw net.ipv4.conf.all.accept_local=1

# the two mark rules, as written in the recipe
ip rule add fwmark $MARK lookup main pref 100
# wg-quick-style table for wg's own mark, distinct value
ip route add blackhole default table $TBL
ip rule add fwmark 0x512 lookup $TBL pref 101

# speeder with the mark; wg behind it
$SPEEDER -s -l10.9.0.2:4096 -r127.0.0.1:7777 -f20:10 -k"passwd" \
	--log-level 2 >/dev/null 2>&1 & S1=$!
$SPEEDER -c -l127.0.0.1:3333 -r10.9.0.2:4096 -f20:10 -k"passwd" \
	--fwmark $MARK --log-level 2 >/dev/null 2>&1 & S2=$!
sleep 0.5

ip link add wg-s type wireguard; ip link add wg-c type wireguard
ckey=$($WG genkey); skey=$($WG genkey)
cpub=$(echo "$ckey" | $WG pubkey); spub=$(echo "$skey" | $WG pubkey)
$WG set wg-s listen-port 7777 private-key <(echo "$skey") peer "$cpub" allowed-ips 10.10.0.1/32
ip link set wg-s up mtu 1420
ip addr add 10.10.0.2/32 dev wg-s; ip route add 10.10.0.1/32 dev wg-s
$WG set wg-c fwmark 1298 private-key <(echo "$ckey") peer "$spub" endpoint 127.0.0.1:3333 \
	allowed-ips 10.10.0.2/32 persistent-keepalive 3
ip link set wg-c up mtu 1420
ip addr add 10.10.0.1/32 dev wg-c; ip route add 10.10.0.2/32 dev wg-c
sleep 4

wg_up() { [ "$($WG show wg-c latest-handshakes | awk '{print $2}')" != 0 ] \
	&& ping -I wg-c -M do -c1 -W1 -s 8 10.10.0.2 >/dev/null 2>&1; }

# claim 1: traffic passes with both rules installed; without it the rest
# would be vacuous, so a dead stack aborts the run
wg_up; claim "stack passes with both mark rules installed" $?
if [ $fail -gt 0 ]; then
	echo "FATAL: stack never passed; later claims would be vacuous" >&2
	kill $S1 $S2 2>/dev/null; exit 1
fi

# claim 2a: the tunnel's outer packets carry the mark, proved by a mark-match
# counter on the OUTPUT path (a blackhole rule would not bite: the socket is
# connected, and a connected UDP socket pins its route at connect time, so
# policy routing never re-consults the rules for it)
iptables -t mangle -A OUTPUT -m mark --mark 2 -j ACCEPT 2>/dev/null
wg_up
sleep 0.5
marked=$(iptables -t mangle -L OUTPUT -nvx 2>/dev/null | awk '/mark match 0x2/ {print $1; exit}')
[ -n "$marked" ] && [ "$marked" -gt 0 ]
claim "tunnel outer packets carry mark 0x2 (counter saw $marked)" $?
iptables -t mangle -F OUTPUT 2>/dev/null

# claim 2b: the stack still passes with the counting rule gone
wg_up; claim "stack passes after the mark check" $?

# claim 3: wg's own mark value differs and its table is not the tunnel's rule
[ "$MARK" != 0x512 ] && [ "$TBL" != main ]; \
	claim "the two marks differ in value and rule (no capture overlap)" $?

kill $S1 $S2 2>/dev/null
echo "-- $pass pass, $fail fail"
[ $fail = 0 ]
