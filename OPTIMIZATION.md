# UDPspeeder Optimization Results

Benchmarked on Intel Core i5-7300U (Kaby Lake, 2C/4T, SSE4.2 + AVX2).
Target platforms: Intel N150 (Alder Lake-N), Mediatek Filogic (ARMv8).

## End-to-end throughput (GitHub Actions, 1400B UDP, loopback)

| Config | Baseline | Current | Improvement |
|---|---|---|---|
| no-fec | 618-861 Mbps | 942-1517 Mbps | **+48-76%** |
| fec 20:10 | 364-509 Mbps | 657-1082 Mbps | **+81-113%** |

Ranges reflect CI host variance between runs. Current/baseline measured on
the same host within each run.

FEC overhead dropped from ~41% of throughput (baseline) to ~30% (current).

## Microbenchmark summary at 1500B

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
- **Zero-copy paths**: all four socket paths process directly from provided
  buffers. recvmsg paths (unconnected) have 140+ bytes natural headroom.
  recv paths (connected) use `URING_RECV_HEADROOM` (4 bytes) reserved before
  each buffer for in-place conv header insertion, eliminating per-packet memcpy.
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

### 9. sendmmsg batching for FEC output

Replaced per-packet `sendto()` calls after FEC encoding with a single
`sendmmsg()` call per batch. When the delay manager detects all output
delays are zero (the common case), it routes through `my_send_batch()`
which cooks all packets then issues one `sendmmsg()` for the entire batch.

Typically 20-30 packets per FEC batch → 20-30 syscalls reduced to 1.

### 10. Flat array replacing std::map in FEC decode

Replaced `std::map<int, fec_data_t*>` shard index in `fec_decode_manager_t`
with a flat pre-allocated array indexed directly by shard position. Eliminates
per-shard tree traversal (O(log n) → O(1)) and per-node heap allocation.

### 11. Zero-copy io_uring recv for conv header

The conv header (4 bytes) was previously inserted via `memmove` after receive.
Reserved `URING_RECV_HEADROOM` (4 bytes) before each provided buffer at
registration time. Recv paths now write the conv header directly into the
headroom, avoiding any per-packet memcpy/memmove.

### 12. Anti-replay direct-mapped table

Replaced `unordered_map<u32_t, info_t>` + `u64_t[30000]` ring buffer (~2 MB
scattered) with a `u32_t[32768]` direct-mapped table (128 KB contiguous).

Design: `table[seq & (SIZE-1)] = seq` to mark seen, `table[seq & (SIZE-1)] != seq`
to check validity. Power-of-2 size for bitwise modulo. Old entries naturally
evicted when new seqs map to the same slot. Effective replay window ~32K groups,
comparable to the old 30K ring buffer. No timeout logic needed.

Per-shard cost: single array access + compare vs hash computation + pointer chase.

### 13. Flat group table in FEC decode with bitmap shard tracking

Replaced `unordered_map<u32_t, fec_group_t>` with a pre-allocated direct-mapped
array sized `next_pow2(fec_buff_num * 2)`. Safe because FEC sequence numbers
are monotonically increasing — consecutive seqs map to distinct slots, so no
two concurrent groups collide when table size exceeds max concurrent groups.

Shard tracking uses a 32-byte bitmap (`u32_t[8]`, 256 bits) instead of
`memset(shard_idx, -1, 1024)`. Only the bitmap is cleared on group creation
(32 bytes vs 1024 bytes). The `shard_idx[]` array is only accessed through
`has_shard()`/`set_shard()` which check the bitmap first.

Eliminates ~50K malloc/free pairs per second at line rate (one allocation per
FEC group for the map node containing the ~1 KB `fec_group_t`).

## Analysis and diminishing returns

After 13 optimizations, the codebase has no remaining low-hanging fruit:

**Syscall overhead**: Eliminated. io_uring multishot recv batches receives
without per-packet syscalls. sendmmsg batches sends.

**Compute hotspots**: SIMD-vectorized. GF(2^8) multiply-accumulate uses
AVX2/SSSE3/NEON. CRC32C uses hardware instructions. XOR cook uses SSE2/NEON.

**Allocation overhead**: Eliminated from hot paths. FEC decode uses pre-allocated
buffers, flat arrays, and direct-mapped tables. No `malloc`/`free` per packet
or per group.

**Memory copies**: Two per-packet memcpy remain and are architecturally necessary:
1. `blob_encode_t::input()` — packets must be packed contiguously before RS can
   slice them into equal-length shards. Shard boundaries aren't known until the
   batch is complete (depends on total data size and optimal data_num selection).
2. `fec_decode_manager_t::input()` — received shards must be copied into owned
   buffers because RS decode modifies data in-place.

Each copies ~1400 bytes per packet. At 1.5M packets/sec, that's ~4 GB/sec of
memcpy bandwidth — real but fundamental to the FEC architecture.

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
