# Socket marks: telling your network what the tunnel's packets are for

Your tunnel sends its own packets (the outer ones carrying your traffic)
alongside everything else the machine sends. To the network they look like
anonymous UDP. These options mark them, so your router and the networks along
the path can treat them as what they actually are: the packets you care about
most, or least, as you choose.

## `--fwmark <number>`: "these are the tunnel's packets" (Linux)

A firewall mark is a number your Linux kernel carries alongside a connection.
Rules can then say: *packets marked 2 go out the WAN, never through the
tunnel*. Without a mark, the rules written for the
traffic inside the tunnel can also capture the tunnel's own packets and route
them back through it. Marking the outer packets and routing them separately is
the standard way to avoid this.

On OpenWrt:

```
config udpspeeder-simd 'tunnel1'
    option fwmark '2'
    option dscp '46'
```

## `--dscp <0-63>`: "these packets are voice-grade" (everywhere)

DSCP is the industry-standard priority field inside every IP packet. `46` means
Expedited Forwarding, voice. Set it and well-behaved networks along your path,
your Wi-Fi, and your own router give the tunnel's packets the voice
queue. On Wi-Fi this is especially direct: the value reaches the radio's four
airtime classes, and 46 maps to the voice class, without any further
configuration.

## `--cookie <number>`: the FreeBSD equivalent of a mark

FreeBSD's packet filter matches on its own per-socket number. This option sets
it.

## The promise: marked, or it refuses to start

Every one of these marks carries a guarantee. If the machine you run on cannot
put the mark on the packets (a mark meant for another operating system, or a
Windows dscp where the operating system would accept the request and mark
nothing), the tunnel refuses to start and tells you which mark and why. It
never runs with your packets going out unmarked while your routing rules match
nothing. A mark of zero (the default) means
untouched, as if the option were absent.

The tunnel's other traffic, the name lookups it makes to find its far end, is
never marked. A marked lookup can be routed by the rules written for the
tunnel, and the address you were looking up is lost.

## Marks reach the wire

The build systems test this by capturing the packets. On every code change
they start a real tunnel-side sender on Linux, FreeBSD and Windows machines,
record the packets leaving, and read the priority byte back out of the
recording. If the byte is not exactly what you asked for, the build fails.
Windows is a special case: its modern API offers the marking through what it
calls *flows*, and on some hosted machines its flow admissions machinery is
absent; the code asks for the variant that skips the absent part, which is all
a tunnel needs. The details are in the repository history, one experiment at a
time.

## Quick reference

| option | what it marks | where it works | needs privileges |
|---|---|---|---|
| `--fwmark` | routing and firewall rules | Linux | root or CAP_NET_ADMIN |
| `--dscp` | the IP priority field, and Wi-Fi airtime | Linux, FreeBSD, macOS, Windows | no |
| `--cookie` | ipfw matching | FreeBSD | no |

Windows users wanting dscp have a supported alternative that needs no code at
all: `New-NetQosPolicy`, which marks by program or port as a matter of system
policy.

*The marks affect only how networks along the way treat the packets; what
the tunnel sends is unchanged. The two ends of a tunnel never need to agree on
them.*
