# Socket marks: telling your network what the tunnel's packets are for

*For Diego, who runs a tunnel on a busy gateway and wants the network itself to
treat it fairly.*

Your tunnel sends its own packets — the outer ones carrying your traffic across
the wild — alongside everything else the machine sends. To the network they look
like anonymous UDP. These options give them a name, so your router and the
networks along the path can treat them as what they actually are: the packets
you care about most, or least, as you choose.

Three marks, one each for the three ways networks sort traffic:

## `--fwmark <number>` — "these are the tunnel's packets" (Linux)

A firewall mark is a number your Linux kernel carries alongside a connection.
Rules can then say: *packets marked 2 go out the WAN, never through the
tunnel*. That last part matters more than it sounds — without a mark, the
tunnel's own packets can be routed by the very rules written for the traffic
inside it, and the tunnel swallows itself. Marking the outside packets and
routing them separately is the standard cure.

On OpenWrt, set it and forget it:

```
config udpspeeder-simd 'tunnel1'
    option fwmark '2'
    option dscp '46'
```

## `--dscp <0-63>` — "these packets are voice-grade" (everywhere)

DSCP is the industry-standard priority field inside every IP packet. `46` means
Expedited Forwarding — voice. Set it and well-behaved networks along your path,
your Wi-Fi, and your own router give the tunnel's packets the queue a phone
call would get. On Wi-Fi this is especially direct: the value reaches the
radio's four airtime classes, and 46 lands in the voice class, without any
further configuration.

## `--cookie <number>` — the FreeBSD equivalent of a mark

FreeBSD's packet filter matches on its own per-socket number. Same idea, other
shore; offered where it works.

## The promise: marked, or it refuses to start

Every one of these marks carries a guarantee. If the machine you run on cannot
actually put the mark on the packets — a mark meant for another operating
system, a Windows dscp where the operating system would *pretend* to mark and
quietly do nothing — the tunnel refuses to start and tells you which mark and
why. It will never run along happily while your packets go out unmarked and
your careful routing rules match nothing. A mark of zero (the default) means
untouched, as if the option were absent.

The tunnel's other traffic — the name lookups it does to find its far end — is
never marked. Marked lookups can be routed by the rules written for the tunnel,
which is a fine way to lose the address you were looking up.

## Do the marks actually reach the wire?

We test that the way a skeptic would: by capturing the packets. On every code
change, our build systems start a real tunnel-side sender on Linux, FreeBSD and
Windows machines, record the packets leaving, and read the priority byte back
out of the recording. If the byte is not exactly what you asked for, the build
fails. Windows is its own story — its modern API offers the marking through
what it calls *flows*, and on some hosted machines its flow admissions
machinery is absent; we ask for the no-frills variant that skips the absent
part, which is all a tunnel needs. The details are in the repository history,
told one experiment at a time.

## Quick reference

| option | what it marks | where it works | needs privileges |
|---|---|---|---|
| `--fwmark` | routing and firewall rules | Linux | root or CAP_NET_ADMIN |
| `--dscp` | the IP priority field, and Wi-Fi airtime | Linux, FreeBSD, macOS, Windows | no |
| `--cookie` | ipfw matching | FreeBSD | no |

Windows users wanting dscp have a supported alternative that needs no code at
all: `New-NetQosPolicy`, which marks by program or port as a matter of system
policy.

*The marks change nothing about what the tunnel sends — only how networks
along the way treat it. The two ends of a tunnel never need to agree on them.*
