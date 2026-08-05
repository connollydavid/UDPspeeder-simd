#!/bin/bash
# bench/isa-screen-selftest.sh — prove bench/isa-screen.sh can fail.
#
# The screen reads a disassembly and reports clean when it finds nothing. That
# makes a broken screen indistinguishable from a clean binary, and it happened:
# the first version used PCRE \b word boundaries inside awk, which has no such
# escape, so every pattern matched nothing and every check said ok. It passed a
# binary built specifically to violate all of them.
#
# So the screen is held to a binary that breaks each rule on purpose. If any
# violation goes unreported, the screen is broken and this exits non-zero.
#
# Usage: bench/isa-screen-selftest.sh [cc]

set -u

CC="${1:-gcc}"
DIR=$(mktemp -d)
trap 'rm -rf "$DIR"' EXIT
HERE=$(cd "$(dirname "$0")" && pwd)

# Every function here is named so that no allowed-function test can match it.
cat > "$DIR/bad.c" <<'EOF'
#include <immintrin.h>
#include <stdint.h>

/* AVX2 in a function that never named avx2 */
void innocent_looking(uint8_t *d, const uint8_t *s) {
    __m256i a = _mm256_loadu_si256((const __m256i *)s);
    _mm256_storeu_si256((__m256i *)d, _mm256_xor_si256(a, a));
}

/* SSSE3 and SSE4.2 in a function that never named either */
unsigned plain_helper(const char *p, unsigned n) {
    __m128i t = _mm_loadu_si128((const __m128i *)p);
    __m128i r = _mm_shuffle_epi8(t, t);
    return (unsigned)_mm_cvtsi128_si32(r) + __builtin_ia32_crc32si(n, n);
}

/* xgetbv with no OSXSAVE test anywhere before it */
unsigned reads_xcr0(void) {
    unsigned lo, hi;
    __asm__ volatile("xgetbv" : "=a"(lo), "=d"(hi) : "c"(0));
    return lo | hi;
}

int main(void) { return 0; }
EOF

if ! "$CC" -O2 -mavx2 -mssse3 -msse4.2 -mxsave "$DIR/bad.c" -o "$DIR/bad" 2>"$DIR/cc.log"; then
	echo "SELFTEST SKIP: this compiler cannot build the probe"
	sed -n '1,3p' "$DIR/cc.log"
	exit 0
fi

out=$(bash "$HERE/isa-screen.sh" "$DIR/bad" 2>&1)
rc=$?
echo "$out" | sed 's/^/    /'

fail=0
want() { # pattern  description
	if echo "$out" | grep -q "$1"; then
		echo "ok    the screen reports $2"
	else
		echo "SELFTEST FAIL: the screen missed $2"
		fail=1
	fi
}

want 'PSHUFB (SSSE3) outside'            'PSHUFB with no target attribute'
want 'YMM operands (AVX2) outside'       'YMM operands with no target attribute'
want 'CRC32 (SSE4.2) outside'            'CRC32 with no target attribute'
want 'no OSXSAVE test before it'         'XGETBV with no OSXSAVE test'

if [ "$rc" -eq 0 ]; then
	echo "SELFTEST FAIL: the screen exited 0 on a binary that breaks every rule"
	fail=1
fi

if [ "$fail" -eq 0 ]; then
	echo "ok    the screen rejects what it is supposed to reject"
fi
exit $fail
