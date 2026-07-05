window.BENCHMARK_DATA = {
  "lastUpdate": 1783281830950,
  "repoUrl": "https://github.com/connollydavid/UDPspeeder-simd",
  "entries": {
    "UDPspeeder Benchmarks": [
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
        "date": 1783281830313,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2071,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8884,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.764,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.8206,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 660.024,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2135.06,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1344.38,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3481.22,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6682,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.5479,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 267.01,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 444.625,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.3801,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 103.717,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 440.12,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 651.795,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.82821,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.0218,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 108.696,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 163.928,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.67235,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 17.3568,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.789,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.214,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 157.473,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 173.059,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 291.898,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 351.37,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 40.126,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.1806,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.972,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 234.11,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.208,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 198.41,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 68.7383,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}