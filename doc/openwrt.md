# Running on OpenWrt

The release carries binaries built with the OpenWrt toolchains (the same
target toolchains CI builds and runs under QEMU), so a router deployment is
a copy, a service script, and configuration. This guide uses only the
release assets.

## Pick the binary

The build matrix behind the assets is `bench/arch-map.tsv`, the same table CI
holds as a check. Match the router's target:

| asset | recorded build and test |
|---|---|
| `udpspeeder-simd.x86_64` | native CI-host build; a separate OpenWrt x86_64 test build gets named-CPU dispatch checks |
| `udpspeeder-simd.aarch64` | distro aarch64-linux-gnu cross-build; QEMU aarch64 |
| `udpspeeder-simd.armv7-neon` | OpenWrt armsr/armv7 toolchain; QEMU cortex-a15 |
| `udpspeeder-simd.armv7-scalar` | OpenWrt mvebu/cortexa9 toolchain; QEMU cortex-a9 |
| `udpspeeder-simd.mips` | distro mips-linux-gnu cross-build, big-endian; QEMU mips |
| `udpspeeder-simd.powerpc` | OpenWrt mpc85xx/p1010 toolchain with `-mcpu=8548`; QEMU e500v2 |
| `udpspeeder-simd.riscv64` | OpenWrt sifiveu/generic toolchain; QEMU riscv64 |

Each binary is static (about 1.3-4.1 MB depending on target) with no runtime
dependencies and no kernel module requirements. Where the kernel lacks io_uring the receive path
probes and falls back at startup (the log line names it).

## Install

```bash
scp udpspeeder-simd.mips root@192.168.1.1:/usr/bin/udpspeeder-simd
ssh root@192.168.1.1 chmod +x /usr/bin/udpspeeder-simd
```

Verify it answers on the router before configuring anything:

```bash
ssh root@192.168.1.1 /usr/bin/udpspeeder-simd -h
```

## The service

A procd init script starts the tunnel at boot and sends its output to
`logread`. The script below also reads `/etc/config/udpspeeder-simd` and maps
the UCI options to command-line flags, so the configuration stanzas elsewhere
in this documentation work verbatim on a binary deployment. Save it as
`/etc/init.d/udpspeeder-simd`:

```sh
#!/bin/sh /etc/rc.common
# /etc/init.d/udpspeeder-simd: run the release binary as a managed
# service, reading /etc/config/udpspeeder-simd
USE_PROCD=1
START=99
STOP=15

PROG=/usr/bin/udpspeeder-simd

section_instance() {
	local name="$1"
	local enabled server local_addr remote fec key fifo report fwmark dscp
	config_get_bool enabled "$name" enabled 0
	[ "$enabled" = 1 ] || return
	config_get server "$name" server 0
	config_get local_addr "$name" local "0.0.0.0:4096"
	config_get remote "$name" remote "127.0.0.1:443"
	config_get fec "$name" fec "20:10"
	config_get key "$name" key ""
	config_get fifo "$name" fifo ""
	config_get report "$name" report 0
	config_get fwmark "$name" fwmark ""
	config_get dscp "$name" dscp ""

	procd_open_instance "$name"
	procd_set_param command "$PROG"
	if [ "$server" = 1 ]; then
		procd_append_param command -s
	else
		procd_append_param command -c
	fi
	procd_append_param command -l "$local_addr" -r "$remote" -f "$fec"
	[ -n "$key" ] && procd_append_param command -k "$key"
	[ -n "$fifo" ] && procd_append_param command --fifo "$fifo"
	[ -n "$report" ] && [ "$report" != 0 ] && \
		procd_append_param command --report "$report"
	[ -n "$fwmark" ] && procd_append_param command --fwmark "$fwmark"
	[ -n "$dscp" ] && procd_append_param command --dscp "$dscp"
	procd_set_param respawn
	procd_set_param stdout 1
	procd_set_param stderr 1
	procd_close_instance
}

start_service() {
	config_load udpspeeder-simd
	config_foreach section_instance udpspeeder-simd
}

service_triggers() {
	procd_add_reload_trigger "udpspeeder-simd"
}
```

Then the service commands are the router's own:

```bash
chmod +x /etc/init.d/udpspeeder-simd
/etc/init.d/udpspeeder-simd enable     # start at boot
/etc/init.d/udpspeeder-simd start
```

`respawn` with its defaults restarts the instance whenever it exits. The
reload trigger means `uci commit udpspeeder-simd` restarts the service with
the new settings, so tuning the ratio or the endpoint needs only a config
edit.

## Configure and watch

With the script in place, the UCI surface is the documented one. A client
tunnel with loss reporting:

```
# /etc/config/udpspeeder-simd
config udpspeeder-simd 'tunnel1'
	option enabled '1'
	option server '0'
	option local '127.0.0.1:3333'
	option remote 'mytunnel.example.net:4096'
	option fec '20:10'
	option key 'passwd'
	option report '10'
	option fifo '/tmp/udpspeeder-fifo'
```

```bash
uci commit udpspeeder-simd
logread -f | grep udpspeeder            # health, and the report every 10s
echo "fec 4:2" > /tmp/udpspeeder-fifo   # retune under load, no restart
```

The fifo path lives in `/tmp` (RAM): the file is recreated by each boot, and
the init script names it in the command line.

## Survive the upgrade

`sysupgrade` preserves `/etc/` configuration by default, so the config file
survives; the binary, the init script and the `enable` symlinks it creates
are not default conffiles and must be listed. Append to
`/etc/sysupgrade.conf`:

```
/usr/bin/udpspeeder-simd
/etc/init.d/udpspeeder-simd
/etc/rc.d/S99udpspeeder-simd
/etc/rc.d/K15udpspeeder-simd
```

Leave enough backup space for the binary. After a firmware upgrade the
preserved files bring the enabled service back; verify it rather than
assume it:

```bash
/usr/bin/udpspeeder-simd -h
/etc/init.d/udpspeeder-simd status
# then an end-to-end UDP probe through the tunnel
```

## Marks and the firewall on a router

The marks options are host-local and work on a router the same as anywhere
else; the specifics live in [doc/socket-marks.md](socket-marks.md). The
router-specific part is policy routing for `--fwmark`, so the tunnel's own
packets take the WAN uplink and never recurse through a stacked VPN:

```
# /etc/config/network
config rule
	option src '*'
	option dest '0.0.0.0/0'
	option fwmark '0x2'
	option lookup 'main'
	option priority '100'
```

Stacking a VPN over the tunnel is [doc/vpn-over-the-tunnel.md](vpn-over-the-tunnel.md);
the WireGuard recipe there carries its own UCI stanza with the inner MTU at
1500.
