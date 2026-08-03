#!/bin/bash
# bench/isa-screen.sh — read the emitted x86 code and hold two properties the
# running tests cannot see.
#
# The dispatch tests prove the path a CPU model chooses. They say nothing about
# code that is never chosen, and an instruction the CPU cannot decode faults
# whether or not the dispatcher meant to reach it. That is how the SSSE3 crash
# worked: the multiply was correct and choosing it was not.
#
#   1. Every xgetbv sits behind an OSXSAVE test. XGETBV arrived with XSAVE in
#      2008, so a K8 faults on it, and the AVX probes must check CPUID leaf 1
#      ECX bit 27 before asking the OS what it saved. The guard is a branch the
#      optimiser is free to move, so this is re-derived from the object rather
#      than trusted from the source.
#
#   2. No instruction above the baseline appears outside a function that named
#      it. A target attribute tells GCC it may emit that instruction set in that
#      function; nothing stops the instruction appearing elsewhere if a flag or
#      an inline decision put it there.
#
# Usage: bench/isa-screen.sh <binary> [objdump]
#
# Exits non-zero on a violation, and prints every one it finds rather than the
# first, so a single run says how much is wrong.

set -u

BINARY="${1:-}"
OBJDUMP="${2:-objdump}"

if [ -z "$BINARY" ] || [ ! -f "$BINARY" ]; then
	echo "usage: $0 <binary> [objdump]" >&2
	exit 2
fi

DIS=$(mktemp)
trap 'rm -f "$DIS"' EXIT
"$OBJDUMP" -d --no-show-raw-insn "$BINARY" > "$DIS" 2>/dev/null || {
	echo "ISA FAIL $(basename "$BINARY"): objdump could not read it" >&2
	exit 2
}

rc=0

# --- 1. every xgetbv is guarded ------------------------------------------
#
# Walk back from each xgetbv within its own function and require a bit-27 test
# of the CPUID leaf-1 ECX result. GCC emits that as a `bt $0x1b` or as an `and`
# against 0x8000000, so both spellings count.
n_xgetbv=$(grep -c '\bxgetbv\b' "$DIS" || true)
if [ "$n_xgetbv" -eq 0 ]; then
	echo "ok    no xgetbv in this build, nothing to guard"
else
	unguarded=0
	while read -r line; do
		addr=${line%%:*}
		# the 40 instructions before it, within the same function body
		ctx=$(grep -B40 "^ *$addr:" "$DIS" | tail -41)
		if echo "$ctx" | grep -qiE '\bbt[a-z]* +\$0x1b\b|\$0x8000000\b|\bbt[a-z]* +\$27\b'; then
			continue
		fi
		echo "ISA FAIL $(basename "$BINARY"): xgetbv at $addr has no OSXSAVE test before it"
		unguarded=$((unguarded + 1))
		rc=1
	done < <(grep -n '\bxgetbv\b' "$DIS" | sed 's/^[0-9]*://' | awk '{print $1}' | sed 's/://')
	if [ "$unguarded" -eq 0 ]; then
		echo "ok    all $n_xgetbv xgetbv sites sit behind an OSXSAVE test"
	fi
fi

# --- 2. nothing above the baseline outside the function that named it -----
#
# The patterns are POSIX ERE, which is what awk takes. They must not use \b:
# awk has no word-boundary escape, so a pattern carrying one silently matches
# nothing and every check reports clean. A screen that cannot fail is worse than
# no screen, so bench/isa-screen-selftest.sh builds a binary that violates every
# rule here and requires this script to reject it.
#
# The allowed set is every tier at or above the instruction's own, because a
# target attribute is cumulative: a function that named avx2 may legitimately
# contain SSSE3, and one that named avx512 may contain both. Listing only the
# exact tier reports its own siblings as violations.
#
# Functions beginning with __ are skipped. A static link pulls in glibc's IFUNC
# variants (__memcpy_evex, __strcspn_sse42 and dozens more), which glibc selects
# through its own resolvers and which say nothing about this code. Nothing here
# is named that way, so the rule costs no coverage.
screen() { # pattern  allowed-substrings  label
	local hits
	hits=$(awk -v allow="$2" -v insn="$1" '
		BEGIN { n = split(allow, a, ",") }
		/^[0-9a-f]+ </ {
			fn = $2; sub(/^</, "", fn); sub(/>:$/, "", fn); next
		}
		$0 ~ insn {
			if (fn ~ /^__/) next
			for (i = 1; i <= n; i++)
				if (index(fn, a[i]) > 0) next
			print fn
		}
	' "$DIS" | sort -u)
	if [ -n "$hits" ]; then
		echo "ISA FAIL $(basename "$BINARY"): $3 outside a target-attributed function, in: $(echo "$hits" | tr '\n' ' ')"
		rc=1
	else
		echo "ok    $3 confined to {$2}"
	fi
}

screen 'pshufb'            ssse3,avx2,avx512 'PSHUFB (SSSE3)'
screen '%ymm'              avx2,avx512       'VEX.256 YMM operands (AVX2)'
screen '%zmm'              avx512            'EVEX.512 ZMM operands (AVX-512)'
screen 'crc32[bwlq]?[ \t]' crc32c            'CRC32 (SSE4.2)'
screen '%mm[0-7]'          mmx               'MMX register file (MMX)'

exit $rc
