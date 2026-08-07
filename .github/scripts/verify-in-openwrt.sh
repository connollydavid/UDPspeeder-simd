#!/bin/sh
set -u

fmt="$1"
fail=0

sed -n 's/^DISTRIB_DESCRIPTION=//p' /etc/openwrt_release | tr -d '"'

mkdir -p /var/lock /var/run /var/log

if [ "$fmt" = opkg ]; then
	opkg update || { echo "FAIL  opkg update"; exit 1; }
	opkg install coreutils-timeout || { echo "FAIL  no timeout applet available"; exit 1; }
	for f in /pkgs/*.ipk; do
		opkg install "$f" || { echo "FAIL  opkg install $f"; exit 1; }
	done
else
	apk update || { echo "FAIL  apk update"; exit 1; }
	apk add coreutils-timeout || { echo "FAIL  no timeout applet available"; exit 1; }
	for f in /pkgs/*.apk; do
		apk add --allow-untrusted "$f" || { echo "FAIL  apk add $f"; exit 1; }
	done
fi
echo "ok    both packages installed"

for f in /usr/bin/udpspeeder /etc/config/udpspeeder /etc/init.d/udpspeeder \
	/usr/bin/udpspeeder-simd /etc/config/udpspeeder-simd /etc/init.d/udpspeeder-simd; do
	[ -e "$f" ] || { echo "FAIL  $f missing"; fail=1; }
done
[ "$fail" -eq 0 ] && echo "ok    every installed path present"

for pair in "udpspeeder udpspeeder-snapshot" "udpspeeder-simd udpspeeder-simd-snapshot"; do
	set -- $pair
	banner=$("$1" --help 2>&1 | head -1)
	case "$banner" in
		"$2"*) echo "ok    $1 introduces itself as $2" ;;
		*) echo "FAIL  $1 says '$banner', expected $2"; fail=1 ;;
	esac
	"$1" --help 2>&1 | grep -q 'unofficial snapshot build' \
		|| { echo "FAIL  $1 does not state that it is an unofficial build"; fail=1; }
done

n=$(find /usr/bin /etc/config /etc/init.d -perm /6000 2>/dev/null | wc -l)
if [ "$n" -ne 0 ]; then
	echo "FAIL  $n setuid or setgid files installed"
	find /usr/bin /etc/config /etc/init.d -perm /6000 2>/dev/null
	fail=1
else
	echo "ok    nothing installed setuid or setgid"
fi

for c in /etc/config/udpspeeder /etc/config/udpspeeder-simd; do
	mode=$(ls -l "$c" 2>/dev/null | cut -c1-10)
	case "$mode" in
		-rw-------) echo "ok    $c is readable only by its owner" ;;
		*) echo "FAIL  $c is $mode and holds the tunnel key"; fail=1 ;;
	esac
done

mkdir -p /out
cp /usr/bin/udpspeeder /usr/bin/udpspeeder-simd /out/ 2>/dev/null

sh /pkgs/pre-test.sh >/dev/null 2>&1 || { echo "FAIL  pre-test could not install socat"; exit 1; }
if sh /pkgs/test.sh; then
	echo "ok    payload made the round trip"
else
	echo "FAIL  runtime test"
	fail=1
fi

exit "$fail"
