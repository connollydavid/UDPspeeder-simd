window.BENCHMARK_DATA = {
  "lastUpdate": 1783281784292,
  "repoUrl": "https://github.com/connollydavid/UDPspeeder-simd",
  "entries": {
    "UDPspeeder Benchmarks (PowerPC e500v2 via QEMU)": [
      {
        "commit": {
          "author": {
            "name": "David Connolly",
            "username": "connollydavid",
            "email": "david@connol.ly"
          },
          "committer": {
            "name": "David Connolly",
            "username": "connollydavid",
            "email": "david@connol.ly"
          },
          "id": "d266e374fc0cefea5084c135a4e7534db865f4a6",
          "message": "makefile: build with standard CXX/CXXFLAGS/LDFLAGS, drop hardcoded paths\n\nCompile the cross targets with the standard $(CXX), $(CXXFLAGS) and\n$(LDFLAGS) instead of a compiler path hardcoded to the original author's\nmachine, and read gitversion from an overridable variable. Also drop the\ndead personal 'release'/'release2' subsystem (the amd64/arm/x86/mips24kc_*\ntargets plus TARGETS and TAR). A build environment now supplies the\ntoolchain, flags and version through standard make variables, so\ndownstream packaging needs no makefile patching and the binary picks up\nthe environment's hardening flags.\n\nCo-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>",
          "timestamp": "2026-07-05T19:17:13Z",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d266e374fc0cefea5084c135a4e7534db865f4a6"
        },
        "date": 1783281783500,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 86.5173,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 260.112,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 978.96,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1421.07,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 21799.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 71841,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 25028.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 78307.2,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 82.4023,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 288.091,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1126.44,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1690.22,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 71.0057,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 247.669,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 954.812,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1402.54,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 75.5703,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 254.572,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 965.069,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1403.54,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 601.167,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 916.337,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2408.56,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 3325.73,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 330.141,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 687.753,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2255.68,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3216.74,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1554.82,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1162.36,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 880.933,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}