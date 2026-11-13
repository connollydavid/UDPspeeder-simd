# VPN over the tunnel

WireGuard, OpenVPN, or any UDP VPN rides an udpspeeder-simd tunnel the way any
UDP application does: the VPN's own packets become the traffic the tunnel
protects. This guide is the applied family: how to stack each VPN, what MTU to
set on the inner link, and where the honest tensions live. It supersedes the
upstream OpenVPN configuration guide this fork inherited (kept as
`doc/udpspeeder_openvpn.md`, wangyu-'s original work, credit retained).

Every MTU number in the ledger below was measured, not derived: the
`bench/vpn-ledger.sh` harness stacks each VPN over a real tunnel, sets the
path MTU on the delivery link, probes the inner link with DF-set pings of
rising size, and reads the outer packets off the wire with a raw-socket
sniffer under a load burst that fills the FEC groups.

## The MTU ledger

Mode 0 (the default) changes the question people bring to MTU. The FEC
encoder packs each group's packets into one Reed-Solomon blob and emits
shards, every shard at most the tunnel's `--mtu` (default 1250). A lone
datagram crosses as many small shards; a full group drives shards to the
ceiling. The decoder reassembles the blob from any x of the x+y shards. Two
consequences, both measured rather than assumed:

- **The inner MTU is nearly free.** Any datagram up to roughly
  `(--mtu - overhead) * x` bytes is carried and reassembled, so the only hard
  bound on the inner link is the VPN interface's own MTU: WireGuard's 1420
  default passes whole, and OpenVPN's `--tun-mtu` 1500 default passes whole.
  The ledger's hard column measures exactly where each VPN's interface bound
  bites.
- **The wire never exceeds the path.** The largest packet the stack can put
  on the wire is one full shard: `--mtu` plus headers, under 1300 bytes with
  the default, comfortably below the PPPoE path MTU of 1492 and therefore
  below every smaller path MTU too. The ledger's wire column measures the
  ceiling under load, groups filled, shards at their largest.

<!-- LEDGER-TABLE: filled from bench/vpn-ledger.sh, do not edit by hand -->

| VPN | path MTU | largest passing inner MTU | outer packet ceiling |
|---|---|---|---|
| wireguard | 1500 | 1419 | 1313 |
| wireguard | 1492 | 1419 | 1313 |
| openvpn-udp | 1500 | 1499 | 1254 |
| openvpn-udp | 1492 | 1499 | 1254 |
| openvpn-tcp | 1500 | refused: the TCP SYN meets the UDP listener | |
| openvpn-tcp | 1492 | refused: the TCP SYN meets the UDP listener | |

The knobs, in one line each: the inner link needs no tuning at the defaults
(WireGuard 1420, OpenVPN `--tun-mtu` 1500); the tunnel's `--mtu` sets the
outer shard ceiling, and lowering it is the correct move only on a path
tighter than 1492; `--timeout` (8 ms default) is how long a group waits to
fill before flushing, the one latency knob in the stacking.

The latency cost of a stacking is not MTU arithmetic, it is group structure:
each inner packet waits at most `--timeout` for its group to fill, then
travels as shards of which any x of x+y suffice. A loss-free path pays the
timeout; a lossy path pays it back in avoided retransmission.

## WireGuard at full MTU, with the marks

WireGuard over udpspeeder-simd is the cleanest stacking: one UDP flow, a 32
byte data header, and an inner MTU the ledger measures rather than guesses.

```bash
# server: the tunnel endpoint, WireGuard behind it
udpspeeder-simd -s -l0.0.0.0:4096 -r127.0.0.1:51820 -f20:10 -k "passwd"
wg-quick up /etc/wireguard/wg0   # wg0 listens on 51820

# client: WireGuard sends into the local tunnel port
udpspeeder-simd -c -l127.0.0.1:3333 -r<server>:4096 -f20:10 -k "passwd" \
  --fwmark 0x2
# /etc/wireguard/wg0 on the client: Endpoint = 127.0.0.1:3333
wg-quick up wg0     # wg0's default 1420 MTU passes whole; no tuning needed
```

The two mark users do not conflict because they mark different packets with
different values:

- udpspeeder-simd's `--fwmark 0x2` rides the tunnel's own outer packets, and
  the routing rule `ip rule add fwmark 0x2 lookup main` (added by hand or by
  your firewall) keeps those outer packets on the physical uplink even when
  wg0's own routing would capture them. This is the anti-loop exception,
  generalized below.
- wg-quick's own fwmark (default table 51820 usage) rides WireGuard's
  encrypted packets inside the tunnel and never meets the outer rule: the
  values differ, and each rule matches only its own value.

UCI (OpenWrt), the second door:

```
config interface 'wg0'
	option proto 'wireguard'
	list addresses '10.10.0.1/32'
	option listen_port '51820'

config wireguard_wg0
	option public_key '<server public key>'
	list allowed_ips '10.10.0.2/32'
	option endpoint_port '3333'
	option persistent_keepalive '25'
```

with the udpspeeder-simd instance from the package's UCI stanza carrying
`option fwmark '0x2'` and the tunnel's `option remote_address` pointing at
the server.

## OpenVPN over UDP

The straightforward stacking, and the case the upstream guide taught:

```bash
# server
udpspeeder-simd -s -l0.0.0.0:4096 -r127.0.0.1:1194 -f20:10 -k "passwd"
openvpn --dev tun --proto udp --local 127.0.0.1 --port 1194 ...

# client
udpspeeder-simd -c -l127.0.0.1:3333 -r<server>:4096 -f20:10 -k "passwd"
openvpn --dev tun --proto udp --remote 127.0.0.1 3333 ...
```

`--tun-mtu` keeps its 1500 default: the blob encoder carries it whole, and
the ledger's hard column confirms the interface bound, not the wire, is what
bites.

## OpenVPN's TCP transport: refused, honestly

A TCP-based OpenVPN cannot ride this tunnel directly, and the harness proves
it rather than asserting it: the client's TCP SYN arrives at the tunnel's
UDP listener and is refused (`bench/vpn-ledger.sh` records the refusal at
both path MTUs). The tunnel forwards UDP datagrams between its two ports;
OpenVPN's TCP transport wants a TCP session with its endpoint. The two do
not meet. To carry TCP traffic through the tunnel, use a VPN whose outer
protocol is UDP and let the TCP flows ride inside it as packets: WireGuard
or OpenVPN's UDP transport, both measured above.

What people usually mean by "TCP over the tunnel" is the case worth its own
section: TCP flows riding a UDP VPN inside the FEC. That is where the
double-spend tension lives, named and left unresolved: when a packet is
lost, both layers react. The tunnel sends redundant shards, and the TCP
sender retransmits on its own timer. On a link with steady background loss
the two repairs stack, and the TCP flow inside pays retransmission latency
the FEC already paid for. Whether the trade is worth it depends on which
loss you are fighting: burst loss that FEC's redundancy repairs cheaply
favors the stacking; congestion loss that TCP would back off from favors
leaving TCP alone. This guide does not resolve it; it states it, and the
tuning section shows how to measure which side your link falls on.

```bash
# the stack that works, restated: OpenVPN's UDP transport in the tunnel
# server
udpspeeder-simd -s -l0.0.0.0:4096 -r127.0.0.1:1194 -f20:10 -k "passwd"
openvpn --dev tun --proto udp --local 127.0.0.1 --port 1194 ...
# client
udpspeeder-simd -c -l127.0.0.1:3333 -r<server>:4096 -f20:10 -k "passwd"
openvpn --dev tun --proto udp --remote 127.0.0.1 3333 ...
```

Any TCP connection through the tun interface rides the whole stack, and the
tension above describes exactly its loss behavior.

## The stranger scenarios

- **Raw TCP, no VPN**: udpspeeder-simd carries UDP only. A plain TCP service
  cannot ride it directly; that is what the VPN stackings are for.
- **IPv6 inside**: the inner VPN can carry v6 regardless of the outer path's
  IP version; the blob encoder is size-driven, not header-driven.
- **Double stacking** (a VPN inside a VPN inside the tunnel) works the same
  way, each layer's packets riding as blob input; the hard column of the
  ledger is the interface bound, and double stacking multiplies per-packet
  overheads against it. Measure before trusting it for latency-sensitive
  traffic.
- **No VPN at all**: the tunnel improves UDP flows on their own, which is the
  program's base case and the quick start's.

## The anti-loop route exception, generalized

When the tunnel's outer packets would themselves be routed through a route
the tunnel provides (the classic feed-back loop: udpspeeder sends to the
server via wg0, wg0 sends via udpspeeder, forever), the exception is one rule
per mark user, and the marks make it precise:

```bash
ip rule add fwmark 0x2 lookup main      # the tunnel's own outer packets
ip rule add fwmark <wg's mark> lookup <wg's table>   # WireGuard's, if it uses one
```

Each rule matches only its own mark value, so the two exceptions cannot
capture each other's packets. The same pattern extends to any number of
stacked layers: assign each layer its own mark value, add one rule per value,
and the routing graph stays acyclic by construction.

## Credit

The OpenVPN-over-UDP stacking and the tuning instincts in this guide descend
from wangyu-'s UDPspeeder wiki and the upstream
`doc/udpspeeder_openvpn.md`, carried forward with the fork's measurements
replacing the original's assumptions where they differed.
