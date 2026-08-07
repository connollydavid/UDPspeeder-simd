window.BENCHMARK_DATA = {
  "lastUpdate": 1786117729739,
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
      }
    ]
  }
}