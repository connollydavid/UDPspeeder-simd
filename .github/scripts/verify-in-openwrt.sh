#!/bin/sh
set -u

fmt="$1"
fail=0

sed -n 's/^DISTRIB_DESCRIPTION=//p' /etc/openwrt_release | tr -d '"'

if [ "$fmt" = opkg ]; then
	opkg update >/dev/null 2>&1 || { echo "FAIL  opkg update"; exit 1; }
	for f in /pkgs/*.ipk; do
		opkg install "$f" >/dev/null 2>&1 || { echo "FAIL  opkg install $f"; exit 1; }
	done
else
	apk update >/dev/null 2>&1 || { echo "FAIL  apk update"; exit 1; }
	for f in /pkgs/*.apk; do
		apk add --allow-untrusted "$f" >/dev/null 2>&1 || { echo "FAIL  apk add $f"; exit 1; }
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

sh /pkgs/pre-test.sh >/dev/null 2>&1 || { echo "FAIL  pre-test could not install socat"; exit 1; }
if sh /pkgs/test.sh; then
	echo "ok    payload made the round trip"
else
	echo "FAIL  runtime test"
	fail=1
fi

exit "$fail"
