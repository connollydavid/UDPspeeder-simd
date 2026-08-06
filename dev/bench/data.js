window.BENCHMARK_DATA = {
  "lastUpdate": 1785981482071,
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
      }
    ]
  }
}