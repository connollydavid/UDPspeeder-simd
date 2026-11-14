# Troubleshooting

Four symptoms cover most of what goes wrong, each in the same shape: what
you see, why it is happening, and what to do. Each entry names where its
claim comes from. If your symptom is not here, the issue tracker is open.

## The tunnel refuses to start, naming a mark

**What you see.** The process exits at startup with a message naming a mark
option: fwmark on a non-Linux system, cookie on a non-FreeBSD system, or
dscp on Windows.

**Why.** The marks carry a promise: a mark the host cannot actually put on
the packets is refused at startup, never silently ignored. On Windows the
dscp socket option reports success while marking nothing, so the tunnel
declines to run rather than let your routing rules match empty air. The
contract is the specification's (`socket_marks.allium`, held by CI), and the
plain-language version is in [doc/socket-marks.md](socket-marks.md), the
section "marked, or it refuses to start".

**What to do.** Take the option off on that platform, or use the platform's
own mechanism: on Windows, Policy-based QoS or `New-NetQosPolicy` marks by
executable or port with no code. An honor-or-refuse table by platform is in
the marks guide.

## Small packets pass, large ones vanish

**What you see.** Pings cross fine until a size threshold, then silence;
SSH opens a session but a file transfer stalls; a VPN over the tunnel works
for voice and dies for bulk.

**Why.** Somewhere on the path a link's MTU is smaller than the packet and
the don't-fragment bit is set. The tunnel itself is the least likely
culprit: in the default mode 0 it re-segments everything into shards under
its own `--mtu`, and the measured outer ceiling (1313 bytes WireGuard, 1254
OpenVPN, under filled groups) sits below even PPPoE's 1492 (the MTU ledger
in [doc/vpn-over-the-tunnel.md](vpn-over-the-tunnel.md)). What remains is
the mode and the first hop: in mode 1 the program does not split, and an
oversized packet is dropped with a warning in the log (the options
document's recorded behavior), or a VPN interface MTU sits above a real path
MTU before the tunnel is ever involved.

**What to do.** Stay on mode 0 with its defaults unless you have measured a
reason. If you choose mode 1, set `--mtu` below the smallest MTU on the
path. To find the threshold, scan with DF-set pings of rising size until the
replies stop; the number where they stop names the constraining hop.

## DSCP is set, but the far end sees nothing

**What you see.** `--dscp 46` is configured, a capture at your own interface
shows the priority byte leaving as 0xb8, but the far end, or a hop you do
not control, reports the packets unmarked.

**Why.** DSCP is not an end-to-end promise. Networks along the path may
remark or bleach it, and the hops that honor it most reliably are the ones
you control: your Wi-Fi's airtime classes (where 46 lands in the voice class
directly) and your own router's queues. What the software promises is
narrower and testable: the byte leaves your host exactly as asked, which CI
proves by capturing real packets on every supported platform and reading the
byte back (the marks guide's "do the marks actually reach the wire").

**What to do.** Treat DSCP as a local and first-hop tool. Verify both ends
the same way CI does, with a capture at each interface, and where a hop
bleaches the value, take priority by a mechanism that hop does honor, such
as policy routing on a mark you control.

## More redundancy, more loss

**What you see.** You raise the ratio (`-f 4:2` to `-f 1:3`) to fight loss
and the reported loss gets worse, not better.

**Why.** Redundancy spends bandwidth: the cost of `-f x:y` is `(x+y)/x`, and
when the repair traffic exceeds the uplink's spare capacity, the queue you
created drops the very packets the redundancy was sent to protect. The
arithmetic is the tuning table's; the failure shape is the double-spend
tension's (both are in the README's applied sections and the tuning guide's
measure-first method).

**What to do.** Measure before and after every change: `--report 10` prints
the loss the tunnel sees. Walk the ratio down until reported loss stops
improving, and prefer small groups (`-f 4:2`) over per-packet doubling on a
link near capacity. If the loss is congestion-shaped (worse at busy hours),
lower the ratio and let it heal less; FEC repairs loss, it cannot buy
bandwidth.
