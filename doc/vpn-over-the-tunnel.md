# VPN over the tunnel

WireGuard, OpenVPN, or any UDP VPN rides an udpspeeder-simd tunnel the way any
UDP application does: the VPN's own packets become the traffic the tunnel
protects. This guide is the applied family: how to stack each VPN, what MTU to
set on the inner link, and where the honest tensions live. It supersedes the
upstream OpenVPN configuration guide this fork inherited (kept as
`doc/udpspeeder_openvpn.md`, wangyu-'s original work, credit retained).

Every MTU number in the ledger below was measured, not derived: the
`bench/vpn-ledger.sh` harness stacks each VPN over a real tunnel across a
link whose MTU plays the path MTU, probes the inner link with DF-set pings of
rising size, and reads the outer packet sizes off the wire with tcpdump.

## The MTU ledger

Two numbers matter per stack, and they answer different questions:

- **unsplit inner MTU** is the largest inner MTU whose packets cross as one
  tunnel segment each. At this MTU every inner packet costs exactly one outer
  packet plus its FEC redundancy: the lowest-latency, lowest-overhead
  configuration. This is the number to configure.
- **hard inner MTU** is the largest that passes at all with DF set. Above the
  unsplit line the tunnel re-segments large inner packets transparently, so
  the stack keeps working when the inner MTU is left at its default. That is
  the resilience claim, not the tuning one: each split packet pays a second
  outer packet and its share of redundancy.

<!-- LEDGER-TABLE: filled from bench/vpn-ledger.sh, do not edit by hand -->

| VPN | path MTU | unsplit inner MTU | hard inner MTU | largest outer packet |
|---|---|---|---|---|

The knob for each row: WireGuard's is the `wg0` MTU (the recipe below sets
it); OpenVPN's is `--tun-mtu` (UDP) or `--mssfix` (TCP); a raw UDP
application's is its own send size against the ledger's unsplit line.

The largest outer packet column is the fits-the-path claim: whatever the
inner stack does, the tunnel's own packets never exceed the path MTU, at 1500
or at 1492 (the PPPoE case). udpspeeder-simd re-segments before the wire, so
nothing fragments on the path.

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
wg-quick up wg0
ip link set wg0 mtu <unsplit inner MTU from the ledger>
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
	option mtu '<unsplit inner MTU from the ledger>'

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
openvpn --dev tun --proto udp --local 127.0.0.1 --port 1194 ... --tun-mtu <unsplit>

# client
udpspeeder-simd -c -l127.0.0.1:3333 -r<server>:4096 -f20:10 -k "passwd"
openvpn --dev tun --proto udp --remote 127.0.0.1 3333 ... --tun-mtu <unsplit>
```

`--tun-mtu` is the knob; the ledger's unsplit line for OpenVPN UDP is the
value to set, and it sits lower than WireGuard's because OpenVPN's per-packet
overhead is larger.

## OpenVPN TCP over the UDP tunnel

Carrying a TCP-based OpenVPN inside a FEC-protected UDP tunnel is the
loss-rescue configuration: on a link that drops UDP flows or throttles them,
the TCP session survives inside the tunnel because the tunnel's redundancy
repairs loss before TCP's retransmission timer ever notices.

The tension, named and left live: TCP-over-tunnel double-spends on loss. When
a packet is lost, both layers react: the tunnel sends redundant copies, and
TCP retransmits on its own timer. On a link with steady background loss the
two repairs stack, and the TCP flow inside pays retransmission latency the
FEC already paid for. Whether that trade is worth it depends on which loss
you are fighting: burst loss that FEC's redundancy repairs cheaply favors the
stacking; congestion loss that TCP would back off from favors leaving TCP
alone. This guide does not resolve it; it states it, and the tuning section
shows how to measure which side your link falls on.

```bash
# server: openvpn in tcp-server mode behind the same tunnel
udpspeeder-simd -s -l0.0.0.0:4096 -r127.0.0.1:1194 -f20:10 -k "passwd"
openvpn --dev tun --proto tcp-server --local 127.0.0.1 --port 1194 ... --mssfix <unsplit-40>

# client
udpspeeder-simd -c -l127.0.0.1:3333 -r<server>:4096 -f20:10 -k "passwd"
openvpn --dev tun --proto tcp-client --remote 127.0.0.1 3333 ... --mssfix <unsplit-40>
```

For the TCP variant the knob is `--mssfix`: the TCP session inside cannot
fragment, so its maximum segment size is what the ledger's unsplit line
minus the TCP/IP headers allows.

## The stranger scenarios

- **Raw TCP, no VPN**: udpspeeder-simd carries UDP only. A plain TCP service
  cannot ride it directly; that is what the VPN stackings are for.
- **IPv6 inside**: the inner VPN can carry v6 regardless of the outer path's
  IP version; the inner MTU arithmetic is identical because the tunnel
  re-segments by payload size.
- **Double stacking** (a VPN inside a VPN inside the tunnel) works by the
  same re-segmentation, with each layer's overhead subtracting from the
  unsplit line; the ledger's resilience column is why it still passes at
  all. Measure before trusting it for latency-sensitive traffic.
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
