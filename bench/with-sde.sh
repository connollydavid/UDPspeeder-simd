#!/bin/bash
# bench/with-sde.sh — run a command under Intel SDE, on a pinned copy.
#
# Usage: bench/with-sde.sh <cpu> <command> [args...]
#   e.g. bench/with-sde.sh skx ./test_udpspeeder
#
# Resolves SDE in this order, and verifies the hash in bench/sde.lock before
# trusting anything it did not already validate:
#
#   $SDE_HOME          an extracted tree, used as-is
#   $SDE_TARBALL       a local tarball, hash-checked then extracted
#   the cache          a previous extraction under $SDE_CACHE
#   the mirror         the one pinned download, hash-checked then extracted
#
# A hash mismatch is fatal. The point of pinning is that an unexpected binary
# is a stop, and a verification tool that runs whatever it was handed proves
# nothing about the thing it was meant to verify.

set -euo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
LOCK="$HERE/sde.lock"

field() { sed -n "s/^$1[[:space:]]*=[[:space:]]*//p" "$LOCK" | head -1; }

VERSION=$(field version)
FILE=$(field file)
WANT_SHA=$(field sha256)
MIRROR=$(field mirror)
UPSTREAM=$(field upstream)

CACHE="${SDE_CACHE:-${XDG_CACHE_HOME:-$HOME/.cache}/udpspeeder-sde}"
CPU="${1:-skx}"
shift || true

if [ "$#" -eq 0 ]; then
	echo "usage: $0 <cpu> <command> [args...]" >&2
	exit 2
fi

check_sha() { # path
	local got
	got=$(sha256sum "$1" | cut -d' ' -f1)
	if [ "$got" != "$WANT_SHA" ]; then
		echo "SDE FAIL: $1" >&2
		echo "  expected $WANT_SHA" >&2
		echo "  got      $got" >&2
		echo "  bench/sde.lock pins $VERSION; refusing to run an unpinned build." >&2
		exit 1
	fi
}

extract() { # tarball  dest
	rm -rf "$2"
	mkdir -p "$2"
	tar -xf "$1" -C "$2" --strip-components=1
}

ROOT=""
if [ -n "${SDE_HOME:-}" ] && [ -x "${SDE_HOME}/sde64" ]; then
	ROOT="$SDE_HOME"
elif [ -n "${SDE_TARBALL:-}" ] && [ -f "${SDE_TARBALL}" ]; then
	check_sha "$SDE_TARBALL"
	extract "$SDE_TARBALL" "$CACHE/$VERSION"
	ROOT="$CACHE/$VERSION"
elif [ -x "$CACHE/$VERSION/sde64" ]; then
	ROOT="$CACHE/$VERSION"
elif [ -n "$MIRROR" ]; then
	mkdir -p "$CACHE"
	echo "fetching the pinned SDE $VERSION"
	curl -fSL "$MIRROR" -o "$CACHE/$FILE"
	check_sha "$CACHE/$FILE"
	extract "$CACHE/$FILE" "$CACHE/$VERSION"
	ROOT="$CACHE/$VERSION"
else
	cat >&2 <<EOF
SDE $VERSION is not available and bench/sde.lock records no mirror.

Intel requires a person to accept the licence before downloading, so this
cannot be fetched unattended. Get $FILE from

  $UPSTREAM

then either point SDE_TARBALL at it or extract it and point SDE_HOME at the
result. Its terms are beside this script in SDE-LICENSE.txt.
EOF
	exit 2
fi

exec "$ROOT/sde64" "-$CPU" -- "$@"
