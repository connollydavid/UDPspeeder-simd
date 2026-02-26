# UDPspeeder SIMD Optimization Results

Benchmarked on Intel Core i5-7300U (Kaby Lake, 2C/4T, SSE4.2 + AVX2).
Target platforms: Intel N150 (Alder Lake-N), Mediatek Filogic (ARMv8).

## Summary at 1500B

| Path | Before | After | Speedup |
|---|---|---|---|
| addmul1 (GF multiply-accumulate) | 665 ns | 58 ns | 11.5x |
| rs_encode k=10 n=15 | 34,000 ns | 3,100 ns | 11x |
| rs_decode k=10 n=15 | 36,000 ns | 4,500 ns | 8x |
| do_cook (CRC32C + obscure + XOR) | 3,000 ns | 713 ns | 4.2x |
| cook XOR encryption only | 1,826 ns | 131 ns | 14x |

## Commits

### 1. Benchmark and test harness

Nanobench-based microbenchmarks and correctness tests for FEC, CRC32,
and packet cooking. Enables data-driven optimization and CI regression
detection.

### 2. CRC32C (Castagnoli) replacing CRC32 (zlib)

Switched packet checksum from software CRC32 to CRC32C with hardware
acceleration via SSE4.2 (`_mm_crc32_u64`) and ARMv8-CRC (`__crc32cb`).
Software fallback for CPUs without hardware support.

### 3. SSSE3 and NEON addmul1 vectorization

The GF(2^8) multiply-accumulate (`addmul1`) is the inner loop of Reed-Solomon
encode and decode. The scalar implementation uses a 64KB lookup table — one
byte at a time.

SSSE3/NEON use nibble decomposition: split each input byte into low/high
nibbles, use `PSHUFB`/`TBL` as a 16-entry parallel lookup, XOR the results.
Processes 16 bytes per iteration. Scalar tail for remainder.

### 4. AVX2 addmul1 with runtime CPUID dispatch

Same nibble-decomposition approach widened to 256-bit registers. `VPSHUFB`
operates on two independent 128-bit lanes, so the 16-byte lookup table is
duplicated into both lanes via `_mm256_broadcastsi128_si256`.

Runtime dispatch: 3-phase CPUID check (OSXSAVE + XCR0 AVX state + leaf 7
bit 5). Function pointer `addmul1_x86_fn` resolved in `init_fec()`.
SSE tail handles the 16-31 byte remainder.

### 5. Packet cook refactor into context struct

Extracted the cook pipeline (CRC32C + XOR obfuscation + XOR encryption)
from `packet.cpp` into self-contained `packet_cook.cpp` with a `cook_ctx_t`
context struct. Eliminates 6 global variables. No dependency on common.h,
libev, or networking code — enables benchmarking and testing in isolation.

### 6. SSE2 and NEON XOR vectorization for cook pipeline

The cook XOR loops (key encryption and IV obfuscation) were byte-at-a-time
with data-dependent branches (`if (key[j] == 0) j = 0`). Compilers cannot
auto-vectorize these.

Pre-expand the repeating key/IV pattern into a tile whose length is
`lcm(pattern_len, 16)`, then XOR 16 bytes at a time with SSE2 or NEON.
Key tile is computed once at startup (`cook_ctx_prepare_key`), IV tile is
built per-packet on the stack (4-32 bytes, tile at most 496 bytes).

### 7. Eliminate per-call malloc in fec_decode

`fec_decode` performed 7+ malloc/free pairs per call. Replaced with:
- `invert_mat`: 5 heap buffers replaced with stack VLAs (max 3.6 KB)
- `build_decode_matrix`: k*k matrix pre-allocated in `fec_parms` struct
- `fec_decode`: per-row data buffers replaced with contiguous scratch
  in `fec_parms`, lazily grown on first use

Eliminates allocation jitter on the real-time decode path.

### 8. io_uring multishot receive with provided buffer rings

Replaced per-packet `recvfrom()` / `recv()` syscalls with io_uring
multishot receive using kernel-managed provided buffer rings. The kernel
fills pre-registered buffers and posts completions to a shared ring —
userspace drains batches of completions without syscalls per packet.

Key implementation details:
- **Multishot recvmsg** for unconnected sockets (server local, client local)
  with `IORING_OP_RECVMSG` + `IORING_RECV_MULTISHOT` + `IOSQE_BUFFER_SELECT`
- **Multishot recv** for connected sockets (server remote, client remote)
- **Provided buffer ring** (`IORING_REGISTER_PBUF_RING`): 256 buffers,
  power-of-2 ring, kernel picks buffers without userspace involvement
- **Batched CQ drain**: single `acquire` load on CQ tail, process all ready
  CQEs, single `release` store to advance CQ head
- **Batched buffer recycling**: deferred ring entries with single atomic
  tail commit per batch
- **Combined submit+flush**: `io_uring_enter(IORING_ENTER_SQ_WAKEUP |
  IORING_ENTER_GETEVENTS)` — one syscall for SQE submission and CQE
  materialization
- **Zero-copy paths**: SERVER_LOCAL and CLIENT_REMOTE process directly from
  provided buffers (no memcpy). CLIENT_LOCAL and SERVER_REMOTE still copy
  for conv header headroom.
- **COOP_TASKRUN + SINGLE_ISSUER** flags with fallback for older kernels
- **CQ ring sized 4x buffer count** to avoid multishot stalls
- Graceful fallback to `recvfrom()` on older kernels or non-Linux

Bugs fixed during development:
- `io_uring_recvmsg_out` payload offset must use template `msg_namelen`
  (128 bytes for `sockaddr_storage`), not `hdr->namelen` (actual, e.g. 16)
- CQ tail read requires `acquire` barrier (correctness on ARM/NEON targets)
- Ring fd notification gap after CQ drain: explicit `IORING_ENTER_GETEVENTS`
  flush needed to materialize deferred completions

GitHub Actions throughput (no-fec, 1400B UDP, loopback):

| Path | Median Mbps | Runs |
|---|---|---|
| io_uring multishot | 798.5 | 784.8, 798.5, 837.8 |
| recvfrom baseline | 629.9 | 627.6, 629.9, 654.0 |
| **Improvement** | **+27%** | |

## Not done (deliberately)

**Auto-vectorization of scalar GF(2^8) fallback**: The scalar `addmul1`
uses a 64KB lookup table indexed by runtime byte values. No compiler can
auto-vectorize arbitrary table lookups — the SSSE3/NEON `PSHUFB`/`TBL`
approach requires algebraic insight (nibble decomposition of GF multiplication)
that is beyond compiler analysis. Documented in `lib/fec.cpp`.

**-O3**: Tested, no measurable improvement. All hot paths are hand-written
SIMD intrinsics or hardware CRC32C — the compiler's extra optimization
passes have nothing to improve.

**Alignment audit**: Unaligned SIMD loads/stores used throughout (correct
for arbitrary buffer pointers). On both target architectures, unaligned
accesses that don't cross cache line boundaries are free. Estimated
impact of forced alignment: <1%.
