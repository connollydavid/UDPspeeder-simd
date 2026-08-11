window.BENCHMARK_DATA = {
  "lastUpdate": 1786445088753,
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
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "a33cf25f86149225ac5f630e16ed780ca4e3df6a",
          "message": "Name the release binaries after the project\n\nThe release job named each one speederv2_linux_<arch>, after upstream's\nbinary. This project is udpspeeder-simd and the package installs it as\n/usr/bin/udpspeeder-simd, so a download that says speederv2 tells the reader\nthe wrong thing about what they have.\n\nv1.0.3 already shipped the old names. Releases here are immutable, so that\none keeps them, and this takes effect at the next tag.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-05T23:59:11+01:00",
          "tree_id": "086ff19de3a271727dbba29db8e9e7719b18c22a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/a33cf25f86149225ac5f630e16ed780ca4e3df6a"
        },
        "date": 1785970994255,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5668,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2842,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 26.1955,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.0621,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 699.084,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2323.34,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1343.74,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3679.56,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 38.299,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 121.783,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 313.047,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 511.83,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.367,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.213,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 507.676,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 735.997,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26561,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0744,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 129.618,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.466,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91449,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2553,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.592,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.898,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.261,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.776,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 297.831,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 368.862,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.522,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.435,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 181.552,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 253.327,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.781,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.481,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.3781,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "ebc9a4bed43c1de66f364096ebe6a05e4fafdcfc",
          "message": "Publish the throughput numbers CI already measures\n\nBoth throughput runs happen on every CI run, the io_uring path and the\nrecvfrom baseline, three iterations of five seconds each. Neither passed\n--json, which bench/throughput.sh documents as being for\ngithub-action-benchmark, so the numbers were measured and dropped. A\nregression in either would have shown up nowhere.\n\nThey go to dev/throughput now, which is where they went before this project\nmoved accounts and is why that dashboard exists at all. The entry name and\nthe baseline/ prefix match what is already there, so the series continues\nrather than starting beside itself.\n\nMbps, so the tool is customBiggerIsBetter. The two dashboards next to it\nmeasure time and use the opposite, and publishing this one with their\nsetting would have called every improvement a regression.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T00:22:38+01:00",
          "tree_id": "a21d5e9cd25596aa8cefc12c1df38ddc1c0db7ac",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/ebc9a4bed43c1de66f364096ebe6a05e4fafdcfc"
        },
        "date": 1785976951170,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5911,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.3594,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.0897,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.744,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 699.047,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2337.47,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1350.88,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3650.6,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.2536,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 76.969,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.987,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 507.485,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.4905,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.632,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 507.691,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 738.608,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.28776,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.1393,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.527,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 180.287,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91457,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2572,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.631,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.735,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.258,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.699,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 298.676,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.167,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.6875,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.4877,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 181.928,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 255.519,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.723,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.929,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.4101,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "ef92d69b550589412a4124410ec2b04294a2ffda",
          "message": "Drop the throughput workflow ci.yml replaced\n\nThis workflow checks out `ref: baseline` and the fork has no such\nbranch, only branch_libev and gh-pages. It has failed on both runs it\nhas ever had, so it has never published a number.\n\nci.yml now measures and stores the same figures, and it takes the\nrecvfrom path as the baseline rather than a second branch, so the\ncomparison comes from one run on one machine. Both files declared the\nsame benchmark name, the same customBiggerIsBetter tool and the same\ndev/throughput directory, so a baseline branch created later would put\ntwo entries per push into one series.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T01:46:45+01:00",
          "tree_id": "1fb92712b2220c1b4341ab1425cc5b8b6269f77a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/ef92d69b550589412a4124410ec2b04294a2ffda"
        },
        "date": 1785977463770,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2402,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8321,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.322,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6257,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 651.913,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2121.01,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1348.74,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 5389.1,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5991,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9529,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.497,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.85,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0047,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.136,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 454.411,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.626,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97015,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7784,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.421,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.371,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66217,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7912,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.342,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.473,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.348,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.171,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 293.881,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 355.945,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.084,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.3743,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.873,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 228.796,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.442,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.4,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0702,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "d0e497a695e75b4424f470f36f69f39b49f18620",
          "message": "Serve the package feed from this repository\n\nThe feed publishes builds of this software, so it belongs beside the\nsoftware rather than in the governance repository that plans it. Users\npaste the feed URL into their router configuration, and that URL should\nname the project.\n\nPublished paths move to connollydavid.github.io/UDPspeeder-simd/feed/,\nwritten into a subdirectory of gh-pages so the benchmark data under dev/\nand the landing page at the root are untouched.\n\nThe architecture map comes across as openwrt-arch-map.tsv. It maps every\narchitecture the OpenWrt buildbot publishes to a target and an emulator,\nand bench/arch-map.tsv already here is a different table for the ISA\ndispatch benchmarks.\n\nThe landing page states that the feed is personal, names who signs it,\nand disclaims any connection to the OpenWrt project.\n\nThe weekly trigger is commented out. The branch this builds still pins\nv1.0.0, which faults on four architectures, so a scheduled run would\npublish it.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T02:53:49+01:00",
          "tree_id": "4fbfc2c687728525b8934bbfeea0038428788ff5",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d0e497a695e75b4424f470f36f69f39b49f18620"
        },
        "date": 1785981481866,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2528,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.9621,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.5511,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6317,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.803,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2125.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1317.61,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3452.35,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5305,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.1154,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.028,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.464,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.065,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.885,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 455.062,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 674.745,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97494,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7809,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.383,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.352,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.67682,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7822,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.393,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.386,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.385,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.358,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 292.991,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 356.417,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0754,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.4256,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.313,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.388,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.257,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 201.867,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0894,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "0d9ff5b65a4ddbd934e96a5611b749efc6df6754",
          "message": "Build the feed from the per-release package branches\n\nfeed-25.12 and feed-24.10 carry net/udpspeeder-simd at v1.0.3, one\nbranch per release line so a release can hold its own recipe. The\nbranch name follows the matrix, so no table maps one to the other.\n\nThe branch behind the pull request is no longer built here. It pins\nv1.0.0, which faults on x86_64, powerpc_8548, armeb_xscale and\naarch64_cortex-a53, and it belongs to the review rather than to what\nthis publishes.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:10:10+01:00",
          "tree_id": "b4b226b7dee9114b2f8b6abef60ca2a989058f46",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/0d9ff5b65a4ddbd934e96a5611b749efc6df6754"
        },
        "date": 1785982455996,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5905,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2466,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.5823,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.8085,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 698.741,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2328.84,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1349.03,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3699.29,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 31.5215,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.6442,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.46,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 506.868,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.4614,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.618,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 506.946,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 738.152,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26583,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0705,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.202,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.563,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91196,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2963,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 118.292,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 180.729,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.465,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.847,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 298.178,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 369.309,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 38.651,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.9469,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 181.262,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.802,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.816,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 189.263,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.3511,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "011dabe0245c27c1d2365aac6d949c7438e093ef",
          "message": "Cache and verify the SDK, and build a53 from a released target\n\nThe first feed run failed on aarch64_cortex-a53 for both release lines.\nThe map sent it to airoha/an7581, which exists only on main, so the\ndownload returned an error the step reported as a bare wget code. It now\nbuilds from mediatek/filogic, which carries that architecture on main,\n25.12 and 24.10. The other 68 jobs passed, so the rest of the map is\nsound on both lines.\n\nA missing target now fails with the target and the release named.\n\nEach job pulled about 150 MB and this runs 70 of them, so the tarball is\ncached under a key naming the resolved SDK file.\n\nThe checksum is now checked. sha256sums was already downloaded to learn\nthe file name, and the hash beside it went unread, so an SDK arrived on\ntrust whether from the network or the cache.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:25:40+01:00",
          "tree_id": "c72771a830355a5d4035da1bf566c2518986b38a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/011dabe0245c27c1d2365aac6d949c7438e093ef"
        },
        "date": 1785983386672,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2227,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8308,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.7487,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6763,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.58,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2128.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1342.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3485.76,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5814,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9152,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.841,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.478,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0364,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.709,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.724,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.433,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97158,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7842,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.38,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.485,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.71517,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7927,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.432,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.589,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.639,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.313,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 291.9,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.865,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0488,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2064,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.092,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.579,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.879,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.452,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.1034,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "8deb1dd5a9a9b902bf84570451a2cfb8e9ccd18a",
          "message": "Confirm each index landed before publishing it\n\nmkndx writes nothing when it refuses its input, and the index is the one\nfile a client fetches, so its presence is checked rather than inferred\nfrom an exit code. The opkg side checks Packages, Packages.gz and the\ndetached signature for the same reason.\n\nTested against apk-tools 3.0.5 from the published SDK with real packages\nfrom the 25.12 feed: the earlier invocation reported three untrusted\nsignatures, created no index and exited 99, and the invocation with\n--allow-untrusted indexed all three.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:35:09+01:00",
          "tree_id": "760f1388b9c9f84102b08cfcac5d147de193f3a7",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/8deb1dd5a9a9b902bf84570451a2cfb8e9ccd18a"
        },
        "date": 1785983963709,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2035,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8225,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4811,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6052,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 651.729,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2132.28,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1323.92,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3500.22,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6134,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9606,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.739,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.393,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.1283,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.847,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.303,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 669.872,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97409,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 17.0108,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.431,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.53,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66718,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7793,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.463,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.476,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.813,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 176.221,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 295.36,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 355.909,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0442,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.4791,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.129,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.463,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.467,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 201.847,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.7493,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "4eba472ab96978851ca717e9bb6ddf5f06a89392",
          "message": "Correct the apk install lines on the landing page\n\nThe page told a 25.12 reader to append the feed to /etc/apk/repositories\nand to name the directory. OpenWrt ships /etc/apk/repositories.d/\ncustomfeeds.list for exactly this, and the example inside that file names\nthe index file, so the line has to end in packages.adb.\n\nThe 24.10 lines were already right, checked against base-files, which\ninstalls a usign public key as /etc/opkg/keys/<fingerprint>, the name\nusign -F prints, and against the customfeeds.conf that opkg ships.\nDISTRIB_ARCH comes from /etc/openwrt_release.\n\napk --print-arch checked against apk-tools 3.0.5 from the SDK.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:40:20+01:00",
          "tree_id": "8cbd843a834e5a89de5271fa833d341880644102",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/4eba472ab96978851ca717e9bb6ddf5f06a89392"
        },
        "date": 1785984272363,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2002,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8202,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4196,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6678,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.468,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2122.53,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1335.74,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3509.46,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6486,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.1327,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.359,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.492,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9671,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.19,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.427,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.442,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97149,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7725,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.369,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.321,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66013,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.778,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.403,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 165.506,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.67,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.37,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 291.286,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.205,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0732,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.7103,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.253,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 228.443,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.333,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 241.349,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 109.89,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "705d0138e5563586ce7a85c3cec32b86f5322f99",
          "message": "Cache only the SDK that every run reuses\n\nThe per-architecture SDK cache could not have held. Those tarballs\naverage 240 MB, measured across five targets, and the matrix draws\nseventy of them, so the set wants about 16 GB against a 10 GB\nper-repository cache. It would have evicted itself continuously and\ntaken every other cache in the repository with it.\n\nThe index job keeps its cache. That is one tarball, reused by every run,\nand it fits.\n\nEach build job downloads its SDK again and still verifies the checksum,\nwhich is the guarantee that mattered.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:52:05+01:00",
          "tree_id": "1318a55cb3fcc2aa1674fea416a8e87293aac148",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/705d0138e5563586ce7a85c3cec32b86f5322f99"
        },
        "date": 1785984980096,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5467,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2276,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.2376,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7665,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 699.394,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2342.35,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1354.46,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3650.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.4667,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.088,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.797,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 507.349,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.5642,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.531,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 508.165,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 738.322,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26455,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0719,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.431,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 180.283,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91514,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2498,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.572,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.739,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 166.999,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.611,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 301.339,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.72,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.8976,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.6815,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 182.368,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.944,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.672,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 204.907,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.0223,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "c2733d378fa7634ae619123027fe6928372befb4",
          "message": "Give the index script the hash tool it calls\n\nipkg-make-index.sh runs $MKHASH for each package checksum, and OpenWrt's\nbuild system is what normally exports it. Nothing exported it here, so\nthe variable expanded to nothing, the script tried to run a command named\nsha256 and exited 127. The opkg half of the feed produced no index.\n\nmkhash ships in the SDK beside apk and usign, so it is exported with\nthem and checked for like them.\n\nThe redirect that sent the script's stderr to /dev/null is gone. It was\nthere to drop one progress line per package and it hid the failure\ncompletely: the job reported 127 with no message.\n\nReproduced against a released ipk with the SDK's own script: 127 without\nthe variable, a correct index with it, and the whole chain through the\ndetached signature verifies.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T04:05:14+01:00",
          "tree_id": "8b9c88ad092b95e123f8f5e5a60cbe9a0ed7991d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c2733d378fa7634ae619123027fe6928372befb4"
        },
        "date": 1785985766069,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 8.17648,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 9.81157,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 22.03,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.115,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 632.621,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2078.87,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 987.464,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 2868.97,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 13.5174,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 58.4692,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 256.937,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 440.717,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 15.613,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 85.8454,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 418.889,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 628.735,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.12082,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 12.6518,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 71.3594,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 108.965,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 5.03682,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 12.6589,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 66.806,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 119.265,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 289.533,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 313.873,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 398.265,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 468.678,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 33.1877,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 58.4639,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 151.297,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 191.719,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 182.056,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 295.732,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 37.593,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "499ddb3fee0c507a8c447f9039cff67b24a5367f",
          "message": "Serve the snapshot line, and say how to use the package\n\nSnapshots get their own line and their own branch, feed-main, cut from\nthe packages master the way each release branch is cut from its own.\nSnapshots ship apk, checked against the published tree.\n\nThe snapshot tree has no point releases to resolve, so the SDK comes\nstraight from downloads.openwrt.org/snapshots, which is how the qemu\nlane already reaches it. The format test now names opkg as the exception\nrather than naming each apk line, so a later apk release needs no edit.\n\nThe landing page gains a usage section: where the settings live, which\nend is the server, what has to match at both ends, and the two init\ncommands. It also states that this build checksums the wire with CRC32C\nwhile the stock package uses CRC-32, so a mixed pair will not talk. Both\nwere read out of the shipped config, the init script and packet.cpp.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T04:28:27+01:00",
          "tree_id": "ef9e750bf37e8f51bf9c896c755f37c244c6f622",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/499ddb3fee0c507a8c447f9039cff67b24a5367f"
        },
        "date": 1785987153856,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 8.18452,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.1189,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 29.3113,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 44.8293,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 853.793,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2854.71,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1404.37,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 4232.28,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 16.9664,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 63.2266,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 251.445,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 418.298,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 17.7364,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 92.1201,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 405.127,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 601.936,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.60078,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 11.5041,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 66.9698,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 113.562,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 5.75802,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 11.5047,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 67.0545,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 113.641,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 296.362,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 315.661,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 413.214,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 474.393,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 34.2359,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 55.1957,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 151.746,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 216.57,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 176.118,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 310.59,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 38.2217,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "e96efe4ebb3d4905bde48f375292dbde6924b49b",
          "message": "Restore the weekly feed run\n\nThree dispatched runs have published a feed that verifies: every\narchitecture on all three lines, indexes signed and fetched back over\nthe published URLs, and the detached signature checked against the\npublished key. The reason for holding the schedule is spent.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T04:40:18+01:00",
          "tree_id": "67106278fc31927d0517398a8073bd7ee7688962",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e96efe4ebb3d4905bde48f375292dbde6924b49b"
        },
        "date": 1785987862640,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5894,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2418,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.1544,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.668,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 711.195,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2327.12,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1439.55,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3700.03,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.2501,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 76.9415,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.651,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 506.821,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.3898,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.579,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 507.402,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 740.094,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26676,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0853,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.296,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.562,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.93869,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.3202,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.554,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.845,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.376,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.982,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 297.698,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 368.2,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5807,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.2525,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 182.264,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.452,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.805,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.332,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.393,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "b08053dd7d7c2d5a01ef91ccfad6b3a0a1efff1f",
          "message": "Publish the stock udpspeeder beside the fork\n\nOne SDK unpack builds both packages and one index serves them, and Collect\nrequires both by name. The job's comments are dropped.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T14:32:35+01:00",
          "tree_id": "da50d81851b25aeb9f09b5207f79acc0850c9d3e",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/b08053dd7d7c2d5a01ef91ccfad6b3a0a1efff1f"
        },
        "date": 1786109932240,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2113,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8274,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6194,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.3821,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 662.08,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2118.64,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1327.96,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3512.52,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6093,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9576,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 272.524,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.189,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0188,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 124.283,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 511.436,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 734.444,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.00259,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.777,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.435,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.333,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66344,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 29.205,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.425,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 163.736,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.519,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 176.801,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 294.553,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 354.922,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.1055,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2921,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.284,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.087,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.344,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.196,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 68.9451,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "d8f93497e6368394b1225115c6e37cc26967b939",
          "message": "Stop publishing the stock udpspeeder\n\nAt 20260730-r1 it outranks OpenWrt's own package wherever this feed is\nenabled, which is not what a feed for udpspeeder-simd should do. The feed\nbranches keep the recipe.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T14:52:24+01:00",
          "tree_id": "ae9b2478d378c3985c1b5f8bb7fa7ba114316572",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d8f93497e6368394b1225115c6e37cc26967b939"
        },
        "date": 1786110991983,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2241,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8169,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4854,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 62.7328,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 675.519,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2163.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1327.12,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3483.38,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6411,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.2541,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 272.272,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.131,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0895,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.513,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.945,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.729,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.9705,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7769,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.372,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.463,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65985,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7797,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.394,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.321,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.387,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.27,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 292.075,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.581,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0779,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 60.9761,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.607,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 228.755,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.384,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.781,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.1294,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "6315b784a2f15586beadb2d3f1208b06b63a2c1f",
          "message": "Build the two snapshot packages beside the tagged one\n\nThe package list is one env line the job iterates, so a fourth needs no other\nchange. Each package carries its own name and conflicts with what it stands in\nfor, so adding this feed installs nothing on its own.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T15:35:03+01:00",
          "tree_id": "22b6e61769aeb9284646d35bc69f75ac9bfc692d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/6315b784a2f15586beadb2d3f1208b06b63a2c1f"
        },
        "date": 1786113572660,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2706,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8456,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.5846,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.0924,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 654.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2126.25,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1347.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3506.9,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5973,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.8218,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.745,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.76,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0703,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.067,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.488,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.404,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97215,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.777,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 110.1,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.329,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66285,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7791,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.35,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.325,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.363,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.25,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 291.546,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.255,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.029,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.2945,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 166.041,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.563,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.29,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 201.819,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0595,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "7ddd4d8a01fe2565b25d3c8659e1457a8d43ca1c",
          "message": "Offer only the snapshot packages\n\nudpspeeder-simd is under review for the official feed, so this feed does not\nclaim that name. Its recipe stays on the feed branches, unbuilt.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T15:40:50+01:00",
          "tree_id": "e02d7c2d733f79f21a18fe133cd6afaadc664dfc",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7ddd4d8a01fe2565b25d3c8659e1457a8d43ca1c"
        },
        "date": 1786113908019,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2367,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8277,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.962,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.8148,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 653.994,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2132.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1325.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3503.53,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6413,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.6858,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.669,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.693,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.2062,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.911,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.851,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 669.446,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97071,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7795,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.324,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.338,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66366,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7922,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.372,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.446,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.639,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.799,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 290.838,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.833,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.1179,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5276,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.588,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 230.224,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.291,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.587,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0471,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "2f8ad9d8d5c8f7ddfe3831efd511690f2f1fb92d",
          "message": "Name this repository in the help banner\n\nThe banner cited wangyu-/UDPspeeder, which is what this is based on rather than\nwhat it is. It now prints both, and the sample output in the two READMEs\nmatches again.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:07:17+01:00",
          "tree_id": "817f34d896552aa9d5ec4294a00b7da2af66a8dd",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/2f8ad9d8d5c8f7ddfe3831efd511690f2f1fb92d"
        },
        "date": 1786115522909,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5557,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2307,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.9733,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.9176,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 701.468,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2373.33,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1364.44,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3787.08,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.3465,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.8731,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 305.742,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 507.489,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.2982,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.142,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 507.601,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 736.03,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26429,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 19.4682,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.292,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.64,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.95611,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 19.5232,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.582,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.698,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.787,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 182.037,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 297.321,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.422,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.6852,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.6537,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 181.474,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 255.279,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.816,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.858,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.3674,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "61644b05918e3feb2a5be5dedfa08476220be8a4",
          "message": "Put the program name behind a macro\n\nThe banner said UDPspeeder V2, naming upstream's program and its generation\nrather than this one. PROGRAM_NAME defaults to udpspeeder-simd, and a build\noverrides it with -D, so a package that ships under another name needs no\npatch. The release version already prints on the next line, because a package\nbuild passes it as gitversion.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:13:21+01:00",
          "tree_id": "c7d3d9226ff8057e22d6fd160ea0e02356d51017",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/61644b05918e3feb2a5be5dedfa08476220be8a4"
        },
        "date": 1786115855324,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2343,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8404,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4303,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6407,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 651.415,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2120.03,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1338.45,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3462.63,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6257,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.1719,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.186,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.743,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0841,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.793,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 457.031,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.318,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.98372,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.789,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.356,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.65,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.6609,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7763,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.348,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.895,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.423,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 175.253,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 291.246,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.956,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.1496,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.4719,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.307,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.935,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.288,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 201.76,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.2284,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "e5ad992929e19c45b3e9d7c3d724ae486049c436",
          "message": "Print the release version in the help banner\n\nPROGRAM_VERSION carries it, beside PROGRAM_NAME, so both are overridable with\n-D and a release bump is one line. The git version line still shows the commit,\nor the package version when a package build passes one.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:18:14+01:00",
          "tree_id": "3f469be867e3292550bb945768e41c7dfbe6151b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e5ad992929e19c45b3e9d7c3d724ae486049c436"
        },
        "date": 1786116154291,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5786,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.4129,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.1478,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.6643,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 700.762,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2324.23,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1385.59,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3732.25,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.2307,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.0943,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.816,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 506.238,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.4049,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 130.223,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 543.062,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 745.557,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.9124,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0923,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.218,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.385,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91338,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.262,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.624,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.768,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.065,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 184.674,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 297.397,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.613,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.7283,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.4949,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 184.957,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 258.595,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.797,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.464,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 54.7172,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "b4ef0d913437521a46a56dfbb242e3208a931420",
          "message": "Guard the banner version, and let a packager name the commit\n\nNothing read PROGRAM_VERSION, so a tag cut without editing it would have\npublished binaries naming the previous release, and no test greps the banner\nto notice. A tag build now fails unless the two agree.\n\nSOURCE_COMMIT prints only when a build defines it, so a package can say which\ncommit it came from while this repository's own builds keep showing the sha on\nthe git version line.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:44:25+01:00",
          "tree_id": "9127e9d3f74aac91514c4fb24ea6a96e374f0ae1",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/b4ef0d913437521a46a56dfbb242e3208a931420"
        },
        "date": 1786117728989,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2925,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8393,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6822,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6412,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 652.757,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2131.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1315.12,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3510.47,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5748,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9504,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.411,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 454.168,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9491,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.544,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.57,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.527,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.48594,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7846,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 110.201,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 165.825,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.74487,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.8098,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.435,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.423,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 159.977,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 173.672,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 294.822,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 360.6,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0584,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.6278,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 166.094,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 236.104,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.913,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.436,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 70.3212,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "dfe77228ecee0fdb39849acaf64fe3dce051c604",
          "message": "Install the packages in OpenWrt before publishing them\n\nThe matrix proved the packages build; nothing proved one installs or runs. A\njob now installs both into the release's own x86-64 rootfs image, checks each\nbinary introduces itself as the package that shipped it and says it is an\nunofficial build, and runs the package's own runtime test. The index job waits\non it, so a package that cannot install cannot reach the feed.\n\nOne architecture and two images, native on the runner, so it costs a couple of\nminutes rather than another matrix.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:12:54+01:00",
          "tree_id": "ff6d614a197c2d1f4aa05e0dd38610c65adbdb04",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/dfe77228ecee0fdb39849acaf64fe3dce051c604"
        },
        "date": 1786119445333,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2549,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8174,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.308,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.2689,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.579,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2165,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1346.27,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3504.43,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5943,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 70.2323,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 272.045,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.752,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.211,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.122,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.366,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.653,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97074,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.6309,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.342,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.323,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.84377,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.8464,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 111.759,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 166.465,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.364,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 175.855,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 295.319,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 356.1,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.2476,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5964,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 166.245,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 235.99,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.187,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 203.151,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0918,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "e3ec2f781225c5773d3603a6902a06b8baa6a140",
          "message": "Check the security properties of what the feed publishes\n\nThe install job now asserts nothing lands setuid, that each config holding a\ntunnel key is readable only by its owner, and that the installed binary is\nposition-independent with a non-executable stack, full RELRO and no RPATH. The\nELF checks run on the runner because OpenWrt strips section headers, which also\nremoves the evidence a canary check would need, so the stack protector is left\nto the build flags rather than asserted from the artifact.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:20:41+01:00",
          "tree_id": "52716597fcf5ca9c225aa76057c936098010f918",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e3ec2f781225c5773d3603a6902a06b8baa6a140"
        },
        "date": 1786119942341,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 8.92641,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 10.4961,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.3877,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 40.6201,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 684.418,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2234.19,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1141.75,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3470.41,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 14.8679,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 62.3949,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 274.583,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 470.05,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 16.1525,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 91.5473,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 446.731,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.828,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.68319,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 13.5365,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 76.7801,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 126.987,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 5.74674,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 13.7613,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 75.6275,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 126.737,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 311.283,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 336.22,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 438.704,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 501.671,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 35.5419,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 63.2512,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 161.934,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 223.229,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 194.305,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 317.263,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 40.1545,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "5c1728034eeac0dfcbea7d6694fb593866b4b944",
          "message": "Give the verification the two things the rootfs image lacks\n\nThe image has no timeout applet and no /var/lock, so every probe exited 127\nwith empty output and opkg could not take its lock. Both read as the tunnel\nfailing. Installing coreutils-timeout and creating the runtime directories\nmakes both lines pass, runtime test included.\n\nThe install and package commands no longer discard stderr, which is what hid\nthis.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:27:02+01:00",
          "tree_id": "54570ecfd977c98be028d4a88e276b42f41a8974",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/5c1728034eeac0dfcbea7d6694fb593866b4b944"
        },
        "date": 1786120281929,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5382,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2357,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.4529,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.9297,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 698.803,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2360.53,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1359.67,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3650.63,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.2644,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.1425,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.675,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 509.452,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.7468,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 120.197,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 510.108,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 740.509,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.27194,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0939,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.598,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.645,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91322,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2664,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.607,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.817,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.252,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.697,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 298.684,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.388,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5211,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.3979,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 180.636,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.881,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.703,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 189.164,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.3567,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "25a0e7b6b9703ea33c0c04bf3f951fbd43a02e75",
          "message": "Report the hardening rather than require it\n\nDemanding a position-independent executable made the check assert a build\nconfiguration the mirrored package does not have. It now fails only on defects\na package controls, an executable stack, a missing RELRO segment or an RPATH,\nand reports the ELF type and whether RELRO is full.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:37:27+01:00",
          "tree_id": "56d7156cd5561b3de0d9ddf3b071abe03f86edcd",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/25a0e7b6b9703ea33c0c04bf3f951fbd43a02e75"
        },
        "date": 1786120916850,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5393,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.7153,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.4755,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.8798,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 700.045,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2322.87,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1379.96,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3685.53,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.4493,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.7861,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 306.314,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 506.115,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.4781,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.043,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 507.406,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 736.498,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.2651,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0954,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.381,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 180.385,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.93103,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.3001,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.569,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.719,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 167.95,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.8,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 298.2,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 368.006,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5041,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.3945,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 180.788,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.629,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.694,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 189.168,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.6701,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "a150db028d87bc86e319ee29da1b22c31a291c54",
          "message": "Verify the feed is signed, from a client's side\n\nThe install check uses local files and --allow-untrusted, which switches off\nthe property the feed exists to provide. A job now runs after publishing: it\nreads the landing page for the key filename, adds the feed exactly as those\ninstructions say, confirms the package is refused while the key is absent, then\ninstalls it once the published key is in place.\n\nIt follows the published instructions rather than a copy of them, so a landing\npage that tells someone the wrong thing fails the run.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:43:12+01:00",
          "tree_id": "3e3c7bfd70cea0e18e207b8e67aa670a56ca8598",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/a150db028d87bc86e319ee29da1b22c31a291c54"
        },
        "date": 1786121284850,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 6.22869,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 6.83064,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 12.6723,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 22.8728,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 406.928,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 1362.04,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 745.355,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 2097.16,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 10.5331,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 43.983,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 190.919,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 325.349,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 11.9304,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 69.6482,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 318.586,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 474.154,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 2.56243,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 7.98036,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 51.997,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 89.8885,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 2.49914,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 7.99751,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 52.7551,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 90.5934,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 208.825,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 220.309,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 299.253,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 347.402,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 25.7305,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 44.0405,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 114.718,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 157.371,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 108.668,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 219.664,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 24.9777,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "cf6bb414e5985edca45d26834253c2784d355cfc",
          "message": "Strip the quotes openwrt_release actually uses\n\nDISTRIB_ARCH is single-quoted, so the arch carried its quotes into the feed\nURL and opkg was handed a path that does not exist. Both lines now install\nfrom the published feed and refuse to before the key is in place.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:54:18+01:00",
          "tree_id": "c9d6757d0498ab05b2c129b56d6b0dcbbacd920b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/cf6bb414e5985edca45d26834253c2784d355cfc"
        },
        "date": 1786121919839,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2507,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.838,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.5846,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6782,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 658.646,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2117.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1341.61,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 5417.8,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 31.0956,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 109.942,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 423.517,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 682.044,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.3358,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 106.084,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 456.401,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.522,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.96978,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7932,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.337,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.368,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.79311,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7819,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.337,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.331,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.441,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.825,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 291.657,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 355.304,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0636,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.3698,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.532,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.557,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.193,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 201.81,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0186,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "4a05bedebf05c60f66bb7ea94cfd15c363e921ef",
          "message": "Send feed problems to this repository\n\nThe landing page pointed at the packages fork, which holds the recipes. The\nfeed is served from here and the binaries are built here, so this is where a\nreport belongs.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:35:40+01:00",
          "tree_id": "58d2b39a90d4bdf3330a2630ed4bbc15352e83c3",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/4a05bedebf05c60f66bb7ea94cfd15c363e921ef"
        },
        "date": 1786124404307,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2166,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.82,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.8382,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.8588,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.609,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2126.18,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1350.89,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3511.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5769,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.9439,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.087,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.839,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.1631,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.971,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.843,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.053,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97227,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7762,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.37,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.304,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66045,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7788,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.391,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.36,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 159.924,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 176.647,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 295.144,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 357.863,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0109,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5039,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.19,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 231.423,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.267,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.31,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.1355,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "88d2137559554c0f8a620691331799a93420f9e1",
          "message": "Cut the gloss from the landing page\n\nTwo names and what each is, then what adding the feed does. The rest argued\nfor the naming rather than telling anyone how to use it.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:36:21+01:00",
          "tree_id": "991607a3c27892537b90b6a6dfc8d1e39cddb13a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/88d2137559554c0f8a620691331799a93420f9e1"
        },
        "date": 1786124446295,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 7.4983,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 8.13417,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 19.525,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 31.6235,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 527.891,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 1728.93,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 881.565,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 2679.49,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 12.3763,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 51.9461,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 228.559,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 391.875,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 13.9219,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 76.0883,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 372.094,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 559.164,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.75067,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 11.4617,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 64.646,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 105.518,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.68739,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 11.2929,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 64.3396,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 105.615,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 265.422,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 279.458,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 363.443,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 442.01,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 36.0662,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 52.4772,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 134.681,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 186.506,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 194.598,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 348.016,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 33.5572,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "19aa3f9776186fd72e827ce927e01742960d13a0",
          "message": "Drop the usage section from the landing page\n\nA feed page says where the packages are and how to trust them. Configuring the\ntunnel belongs with the package.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:38:36+01:00",
          "tree_id": "f49c416e317323c23fad288b259ef647e555ff8b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/19aa3f9776186fd72e827ce927e01742960d13a0"
        },
        "date": 1786124655980,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5995,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.3334,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.3463,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.0045,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 710.555,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2349.26,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1377.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3740.28,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.2812,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.2496,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 308.827,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 758.432,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 31.8169,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 120.772,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 508.688,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 747.006,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26402,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.068,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.381,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 180.199,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.91163,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2485,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.681,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.691,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 166.924,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 181.215,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 297.093,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.006,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.622,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.4897,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 181.87,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 253.968,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.712,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.094,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 54.0585,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "0ba7c9f5f9b74a26ed016a59076bb1c5d6879225",
          "message": "Say the two do not interoperate on the landing page\n\nDropping the usage section took the only statement that this fork and stock\nudpspeeder cannot talk to each other. It belongs beside the package it applies\nto.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:45:30+01:00",
          "tree_id": "f6c49d0e300b61f9b34c377b2a850a3b07288c5e",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/0ba7c9f5f9b74a26ed016a59076bb1c5d6879225"
        },
        "date": 1786124991252,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 7.47644,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 8.14111,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 19.3648,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 31.5472,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 528.443,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 1758.57,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 872.793,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 2674.18,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 12.3705,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 51.9036,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 228.354,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 391.492,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 13.9514,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 76.9616,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 376.163,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 565.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.8943,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 11.3555,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 63.8255,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 105.378,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.70463,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 11.4504,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 63.8326,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 105.549,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 258.745,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 278.871,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 439.621,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 416.338,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 29.0121,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 52.5466,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 153.922,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 188.306,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 161.712,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 262.725,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 33.3912,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "f2c0da9b47bcacfa1b7b1f91f0ecba9be5c65ac2",
          "message": "package feed: carry the flashprog packages\n\nThe feed took its package list as bare names under net/. It now takes\npaths, so a package can live in another section, and collects by package\nname rather than by a udpspeeder glob.\n\nThe two flashprog packages own the same path and refuse to install\ntogether, so the verify job installs the full one and runs the package's\nown test against it.",
          "timestamp": "2026-08-08T23:21:06+01:00",
          "tree_id": "f87bbacada1a1827ed0b894569efaa443a076700",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f2c0da9b47bcacfa1b7b1f91f0ecba9be5c65ac2"
        },
        "date": 1786227922105,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 8.12799,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.0975,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.9466,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 44.6318,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 858.378,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2853,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1391.54,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 4242.24,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 17.4014,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 64.011,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 252.484,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 418.538,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 17.5888,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 92.1979,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 405.571,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 602.39,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.60374,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 11.5086,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 67.0402,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 113.644,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 5.7638,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 11.5229,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 67.0557,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 113.496,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 296.589,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 316.045,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 412.251,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 474.1,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 34.903,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 54.4659,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 146.506,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 211.414,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 176.758,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 308.865,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 39.1748,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "7848e28f2379b4c2c22d42b4c8851a119cb3bf44",
          "message": "package feed: give the build the feeds its dependencies live in\n\nThe build replaced feeds.conf with the local feed alone. That was enough\nwhile every package needed only libstdcpp, which the SDK ships, and it\nfails the moment one needs libpci, libftdi1 or libjaylink: meson resolves\na selected programmer group against a library that is not staged and\nstops. The base and packages feeds for the release line are now written\nalongside the local one.",
          "timestamp": "2026-08-08T23:33:21+01:00",
          "tree_id": "938cae7c4fd5a80d8cb253a12e7936e90dcfd850",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7848e28f2379b4c2c22d42b4c8851a119cb3bf44"
        },
        "date": 1786228642315,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 6.55907,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 7.6941,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 19.2306,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 31.7634,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 544.206,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 1770.12,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 877.994,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 2668.61,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 10.5258,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 44.5571,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 201.113,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 343.43,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 11.7795,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 67.0228,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 322.545,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 483.647,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 2.17918,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 9.61286,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 61.7446,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 93.761,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 3.83931,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 9.63324,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 61.6911,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 93.9118,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 218.351,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 235.082,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 307.492,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 354.383,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 26.0763,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 45.8172,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 116.079,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 159.455,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 138.998,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 221.349,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 28.59,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "3de97dd06a70c86a3fcbe953e41d384024511b48",
          "message": "package feed: verify a snapshot SDK against sums read after it\n\nA snapshot SDK is rebuilt continuously, so the tarball can change between\nreading the checksum file and fetching it. The window was the whole SDK\ndownload. The sums are now read after the tarball, which cuts the window\nto a few kilobytes and makes the comparison one about bytes already held,\nand the fetch retries three times before giving up.",
          "timestamp": "2026-08-08T23:53:09+01:00",
          "tree_id": "fe5b6eb188577be434c4fc07b2007e2d7a38b6eb",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/3de97dd06a70c86a3fcbe953e41d384024511b48"
        },
        "date": 1786229839697,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2571,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8243,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4955,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 52.3331,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 653.279,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2134.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1333.46,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3481.55,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 30.9225,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 109.869,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.129,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 454.054,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.2931,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.967,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 454.188,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 675.961,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.9707,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.8146,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.364,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.37,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.73049,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.8205,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.422,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.345,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.6,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.98,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 293.099,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 353.418,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.014,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.5774,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.939,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 230.518,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.778,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.34,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.8184,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "d02580721767610029e123dc51beacf191dce6fb",
          "message": "package feed: the flashprog variants install side by side now\n\nThey no longer share a path, so the verify job installs every package it\nwas given and runs each one's own test, and the page no longer tells\npeople to pick one.",
          "timestamp": "2026-08-09T00:34:49+01:00",
          "tree_id": "67060ded695d7c293997b5f76efebeb12885d85a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d02580721767610029e123dc51beacf191dce6fb"
        },
        "date": 1786232357266,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5686,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.2435,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 27.1395,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.5034,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 716.504,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2381.28,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1364.94,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 5350.04,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.4149,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.6814,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.329,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 507.017,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.5274,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 119.771,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 506.872,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 747.789,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.32556,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.0721,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.227,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.363,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.92006,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.2679,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.647,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.876,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 168.021,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 182.133,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 298.341,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.771,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5309,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.3321,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 181.162,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.226,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 209.736,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.934,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 53.4155,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "03b8369f05539430085a52eef03fd46ffa6bc620",
          "message": "package feed: carry the libraries flashprog links\n\nA system whose package repository is not configured cannot resolve libpci,\nlibftdi1, libjaylink or libusb, so the feed's own packages are\nuninstallable there. They are collected and published alongside, under the\nnames OpenWrt uses, which the page now says outright.",
          "timestamp": "2026-08-09T00:53:20+01:00",
          "tree_id": "87c69805ffa449087504d508e39b644e8a3bb03d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/03b8369f05539430085a52eef03fd46ffa6bc620"
        },
        "date": 1786233447694,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 7.46417,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 8.12416,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 19.3355,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 31.5247,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 527.418,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 1725.36,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 875.227,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 2679.92,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 12.4594,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 51.9598,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 228.524,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 391.827,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 13.9149,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 76.1445,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 372.359,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 559.097,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.75358,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 11.4571,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 63.9001,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 105.594,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.75204,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 11.4705,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 63.8628,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 105.763,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 258.72,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 279.048,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 363.198,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 416.59,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 29.5637,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 52.6473,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 134.574,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 186.179,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 162,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 263.015,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 33.3613,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "d9194b00bb060e92ebfd2870f7b7fa072ad69c15",
          "message": "dns-lease-manager: resolve -r hostnames and keep the tunnel alive\n\nThe client's -r option now accepts a hostname. A single-header, allocation-free,\nnonblocking DNS Locator-Hint Cache (dns_lease_mgr.h) resolves it to candidate\nIPs, leases them for an effective TTL (RFC 2181 lowest-TTL rule), refreshes\nbefore expiry, keeps serving the last-known candidates while a refresh fails\n(the stale window, RFC 8767), and falls back to TCP on truncation. The client\ncreates its remote socket on the first lease and re-points it with a second\nconnect() when the candidate set changes, keeping the io_uring multishot and\nthe ev_io watcher valid. ECONNREFUSED on the remote recv path forces a refresh;\na FIFO dns-refresh command does the same by hand.\n\nThe DNS wire codec is built and parsed in the header itself (no getaddrinfo):\nRFC 1035 layout and compression pointers, RFC 2308 negative caching from the\nauthority SOA, MSB-set TTLs read as zero. Server mode is unchanged: a hostname\nin -r is rejected there.\n\nVerification: the .allium requirements lane (check/analyse/plan and the\nobligations ledger discharged by the bench tests) and the .tla timing lane\n(seven safety invariants plus a liveness property, model-checked by TLC) are\nwired into CI and gate the release job.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-10T23:25:46+01:00",
          "tree_id": "7df55f67a384d6303ab96b63336fedc61d2bdd15",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d9194b00bb060e92ebfd2870f7b7fa072ad69c15"
        },
        "date": 1786401037978,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2008,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.9076,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.3112,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.8155,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.782,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2132.91,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1322.66,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3600.51,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6452,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 69.7197,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.326,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 453.1,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9614,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.593,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.404,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.346,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97365,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7804,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.45,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.368,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66052,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.8026,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 124.447,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 165.773,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 159.046,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 177.591,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 292.068,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 356.582,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.1603,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.0931,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 164.912,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.311,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.787,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.772,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0857,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "36641bcf10eb9eb3bd3e934b1293d105316ba1d3",
          "message": "version: bump to v1.1.0 for the DNS lease manager\n\nThe first minor bump per call/0008: the DNS lease manager feature lands as\nv1.1.0, the tag is the release.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-10T23:28:24+01:00",
          "tree_id": "e330c0bb3445bbbfd226162049b00964bbe93b8f",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/36641bcf10eb9eb3bd3e934b1293d105316ba1d3"
        },
        "date": 1786401181891,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2582,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8411,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.6569,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 39.073,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 654.386,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2118.15,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1318.38,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3477.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.5507,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.96,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 270.478,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 451.747,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 20.9892,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.94,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.072,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 669.806,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97617,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7751,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.447,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.42,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.65934,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7751,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.413,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.346,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 158.39,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 176.487,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 294.116,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 356.005,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0455,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.7156,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 164.881,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.846,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 207.525,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 201.896,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.2096,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "8b67771deaac17e74bc9c463606c83fe4b5cac38",
          "message": "dns-lease-manager: close the verification gaps\n\nSamira's lane is now full. The DNS response parser gets the fuzz treatment the\npacket decoder already had: bench/fuzz_dns_lease.cpp feeds mutated responses to\ndns_lease_parse_response under ASan/UBSan, as a bounded random driver and a\nlibFuzzer target (make fuzz-dns / fuzz-dns-libfuzzer), wired into CI.\n\nThe stale_max_ms == 0 sentinel (serve stale indefinitely) is now tested on\nboth lanes: a C++ case that advances the clock ten days into a stale lease and\nasserts it never gives up, and a second TLC instance (MC-stale0.cfg) with the\ngive-up transition guarded by StaleMax > 0 to match the header exactly.\n\nThe live integration lane (bench/dns-live-test.sh + bench/dns_stub.py) runs the\nreal client against real servers with a python DNS stub on port 53, exercising\nthe create-on-first-lease socket path, the re-point on a candidate change, and\nthe TCP fallback on a truncated answer. The Windows build is exercised under\nWine (make test-mingw + wine64), covering the DNS lease manager's Windows PAL\nfor the first time. Both lanes gate the release.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T11:18:02+01:00",
          "tree_id": "19d4df217594907924c738360e6facd84e8a6097",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/8b67771deaac17e74bc9c463606c83fe4b5cac38"
        },
        "date": 1786443909511,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2385,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8207,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.3534,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.8419,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 650.224,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2115.56,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1326.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3503.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6311,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.7465,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 274.815,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.814,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.1435,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.805,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 453.161,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 670.169,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.96953,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7739,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.376,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 164.382,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 6.4061,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 29.4509,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 110.369,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.331,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 296.178,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 175.863,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 294.337,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 356.446,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.0776,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.0755,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.2,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.225,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 208.987,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 205.06,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.0315,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "6a9721a51d3c283f6b76426c7741235b68ae1120",
          "message": "dns-lease-manager: fix the mingw build and the live lane's resolv.conf\n\nThe Windows (MinGW) test build exposed two pre-existing portability bugs in\nthe fork: lib/fec.cpp cast a pointer to long (32-bit on Windows x64, so the\ncast lost precision), now (intptr_t); and xor_spe.S kept its comment outside\nthe HAVE_PPC_SPE guard, so a non-PowerPC build still fed assembly to the\nassembler, which the MinGW toolchain rejects. The guard now covers the whole\nfile, so it assembles to nothing without SPE.\n\nThe live DNS lane writes resolv.conf, but a GitHub runner's /etc/resolv.conf\nis managed by systemd-resolved and not writable even as root. The script now\nbind-mounts a private resolv.conf over it (root, as the lane requires), torn\ndown and the original restored in cleanup.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T11:28:43+01:00",
          "tree_id": "db7e42fee7f3ff885f10103c7d1b775bcd3ecee5",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/6a9721a51d3c283f6b76426c7741235b68ae1120"
        },
        "date": 1786444541469,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 11.2718,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.8278,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.7773,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 37.6041,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 649.575,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2126.17,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1316.86,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3534.77,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 18.6536,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 68.8078,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 271.853,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 452.196,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 21.0978,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 105.992,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 454.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 671.209,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 4.97356,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 16.7857,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 109.349,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 165.245,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.66311,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 16.7844,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 109.403,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 164.51,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 159.172,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 174.651,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 294.696,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 355.619,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.5955,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 61.6002,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 165.216,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 229.067,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 208.576,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 202.306,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 69.2246,
            "unit": "ns/op"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "david@connol.ly",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "f7bdceb0b2dd53c60164ed39e204a31f81975c10",
          "message": "ci: run the live lane under sudo, and use the wine package\n\nThe dns-live lane needs root (bind port 53, bind-mount resolv.conf), but the\nrunner user is not root, so the whole script runs under sudo. The mingw-wine\nlane's wine64 command does not exist on Ubuntu (the package ships the loader\nunder /usr/lib/wine); the wine package provides the /usr/bin/wine wrapper.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T11:37:49+01:00",
          "tree_id": "c301267b316901bf3215c4f22c850fa35c20ab52",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f7bdceb0b2dd53c60164ed39e204a31f81975c10"
        },
        "date": 1786445088236,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 10.5926,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 11.231,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 25.4343,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 38.7638,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 700.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 2324.34,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 1345.41,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 3728.79,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 20.3136,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 77.0626,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 304.622,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 508.46,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 23.4431,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 120.031,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 508.867,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 737.705,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/64B",
            "value": 5.26792,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/256B",
            "value": 18.226,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1024B",
            "value": 117.209,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_hw/1500B",
            "value": 179.392,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 4.9144,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 18.3417,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 117.938,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 179.899,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 169.603,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 182.261,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 298.757,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 367.957,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 37.7508,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 64.8123,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 183.36,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 254.83,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 210.061,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 188.816,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 54.3494,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}