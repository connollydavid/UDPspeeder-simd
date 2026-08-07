#!/bin/sh
set -u

dir="$1"
fail=0

for b in "$dir"/*; do
	[ -f "$b" ] || continue
	name=$(basename "$b")
	bad=0

	if readelf -lW "$b" 2>/dev/null | grep GNU_STACK | grep -q RWE; then
		echo "FAIL  $name has an executable stack"
		bad=1
	fi

	if [ "$(readelf -lW "$b" 2>/dev/null | grep -c GNU_RELRO)" -eq 0 ]; then
		echo "FAIL  $name has no RELRO segment"
		bad=1
	fi

	if [ "$(readelf -dW "$b" 2>/dev/null | grep -cE 'RUNPATH|RPATH')" -ne 0 ]; then
		echo "FAIL  $name carries a RUNPATH or RPATH"
		bad=1
	fi

	if [ "$bad" -ne 0 ]; then
		fail=1
		continue
	fi

	type=$(readelf -hW "$b" 2>/dev/null | sed -n 's/^  Type: *//p' | cut -d' ' -f1)
	if [ "$(readelf -dW "$b" 2>/dev/null | grep -cE 'BIND_NOW|\bNOW\b')" -ne 0 ]; then
		relro=full
	else
		relro=partial
	fi
	echo "ok    $name: non-exec stack, no RPATH, RELRO $relro, ELF $type"
done

exit "$fail"
