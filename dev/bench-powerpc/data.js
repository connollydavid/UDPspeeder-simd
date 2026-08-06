window.BENCHMARK_DATA = {
  "lastUpdate": 1785982284588,
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
        "date": 1785970841957,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.939,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 448.779,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1704.67,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2484.33,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37854.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125736,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43110.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 136329,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.587,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1802.51,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2690.28,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.907,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 392.904,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1399.31,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2035.74,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 149.874,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.836,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1399.93,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2038.85,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 781.001,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1337.17,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3443.66,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4850.4,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 477.266,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 1059.41,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3258.7,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4711.19,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2689.96,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1436.07,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1066,
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
        "date": 1785976859264,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.428,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 451.544,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1704.33,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2483.9,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37973.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125602,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42999.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135135,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.754,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 471.164,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1803.98,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2695.32,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.019,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 399.11,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1412.49,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2056.32,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 405.077,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1420.29,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2060.58,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 781.278,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1255.64,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3192.9,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4404.13,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 475.626,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 974.061,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3000.69,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4257.56,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2209.18,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1432.79,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1055.61,
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
        "date": 1785977267938,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 134.185,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.644,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1691.24,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2482.04,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 51176.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 126638,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43409.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135181,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.505,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.635,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1801.42,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2690.59,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.619,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.036,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1395.49,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2043.54,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.185,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 401.473,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1402.24,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2035.54,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 784.526,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1254.68,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3176.54,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4357.27,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 738.148,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 972.918,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2995.54,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4245.95,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2207.9,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1436.03,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1065.71,
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
        "date": 1785981326096,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 140.884,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 444.705,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1691.08,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2485.99,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 38279.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125885,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42978.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 134912,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.437,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.284,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1804.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2730.95,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.839,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.562,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1396.22,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2030.38,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.146,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 399.965,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1405,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2044.24,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 771.015,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1251.59,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3178.38,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4398.77,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 482.215,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 977.576,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3003.7,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4248.82,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2207.97,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1431.73,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1060.33,
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
        "date": 1785982283823,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 134.349,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.489,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1691.07,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2480.58,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37828,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125157,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43091.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 134906,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 138.696,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 472.307,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1805.87,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2708.6,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 146.056,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 394.775,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 2060.27,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2060.72,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.694,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.288,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1398.21,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2053.41,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 782.033,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1258.42,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3181.11,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4396.35,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 473.234,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 973.273,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2997.62,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4238.8,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2207.58,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1449.31,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1068.73,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}