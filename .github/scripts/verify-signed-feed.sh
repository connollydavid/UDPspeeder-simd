#!/bin/sh
set -u

fmt="$1"
feed="$2"
rel="$3"
pkg=udpspeeder-snapshot
fail=0

mkdir -p /var/lock /var/run /var/log
arch=$(sed -n 's/^DISTRIB_ARCH=//p' /etc/openwrt_release | tr -d '"')
[ -n "$arch" ] || arch=$(apk --print-arch 2>/dev/null)
echo "line $rel  arch $arch"

wget -qO /tmp/index.html "$feed/" || { echo "FAIL  no landing page at $feed/"; exit 1; }

if [ "$fmt" = apk ]; then
	key=/etc/apk/keys/udpspeeder-simd.pem
	line="$feed/$rel/$arch/packages.adb"
	list=/etc/apk/repositories.d/customfeeds.list
	keyurl="$feed/apk-public-key.pem"
else
	pub=$(grep -oE 'usign-[0-9a-f]+\.pub' /tmp/index.html | head -1)
	[ -n "$pub" ] || { echo "FAIL  the landing page names no usign key"; exit 1; }
	fp=${pub#usign-}; fp=${fp%.pub}
	key=/etc/opkg/keys/$fp
	line="src/gz udpspeeder_snapshot $feed/$rel/$arch"
	list=/etc/opkg/customfeeds.conf
	keyurl="$feed/$pub"
fi

echo "$line" >> "$list"

if [ "$fmt" = apk ]; then
	apk update >/dev/null 2>&1
	if apk add "$pkg" >/dev/null 2>&1; then
		echo "FAIL  installed with no key present, so the signature was not enforced"
		fail=1
		apk del "$pkg" >/dev/null 2>&1
	else
		echo "ok    refused to install before the key was trusted"
	fi
else
	opkg update >/dev/null 2>&1
	if opkg install "$pkg" >/dev/null 2>&1; then
		echo "FAIL  installed with no key present, so the signature was not enforced"
		fail=1
		opkg remove "$pkg" >/dev/null 2>&1
	else
		echo "ok    refused to install before the key was trusted"
	fi
fi

wget -qO "$key" "$keyurl" || { echo "FAIL  cannot fetch the published key at $keyurl"; exit 1; }
echo "ok    took the published key from $keyurl"

if [ "$fmt" = apk ]; then
	apk update || { echo "FAIL  apk update rejected the signed index"; exit 1; }
	apk add "$pkg" || { echo "FAIL  apk add refused the signed package"; exit 1; }
else
	opkg update || { echo "FAIL  opkg update rejected the signed index"; exit 1; }
	opkg install "$pkg" || { echo "FAIL  opkg install refused the signed package"; exit 1; }
fi
echo "ok    installed from the signed feed with the published key"

"$pkg" --help >/dev/null 2>&1 || udpspeeder --help >/dev/null 2>&1 \
	|| { echo "FAIL  the installed binary does not run"; fail=1; }
echo "ok    the installed binary runs"

exit "$fail"
