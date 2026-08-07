#!/bin/sh
set -u

dir="$1"
fail=0

for b in "$dir"/*; do
	[ -f "$b" ] || continue
	name=$(basename "$b")

	type=$(readelf -hW "$b" 2>/dev/null | sed -n 's/^  Type: *//p' | cut -d' ' -f1)
	if [ "$type" != DYN ]; then
		echo "FAIL  $name is $type, not a position-independent executable"
		fail=1
	fi

	if readelf -lW "$b" 2>/dev/null | grep GNU_STACK | grep -q RWE; then
		echo "FAIL  $name has an executable stack"
		fail=1
	fi

	if [ "$(readelf -lW "$b" 2>/dev/null | grep -c GNU_RELRO)" -eq 0 ]; then
		echo "FAIL  $name has no RELRO segment"
		fail=1
	fi

	if [ "$(readelf -dW "$b" 2>/dev/null | grep -cE 'BIND_NOW|\bNOW\b')" -eq 0 ]; then
		echo "FAIL  $name does not bind now, so RELRO is partial"
		fail=1
	fi

	if [ "$(readelf -dW "$b" 2>/dev/null | grep -cE 'RUNPATH|RPATH')" -ne 0 ]; then
		echo "FAIL  $name carries a RUNPATH or RPATH"
		fail=1
	fi

	[ "$fail" -eq 0 ] && echo "ok    $name: PIE, non-exec stack, full RELRO, no RPATH"
done

exit "$fail"
