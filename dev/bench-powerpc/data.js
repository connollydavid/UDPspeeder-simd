window.BENCHMARK_DATA = {
  "lastUpdate": 1785987710951,
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
        "date": 1785983220344,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 134.264,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.349,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1691.67,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2480.55,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37874.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125486,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42906,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135074,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 136.931,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 470.36,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1816.17,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2689.99,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.795,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.738,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1395.38,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2034.52,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.183,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 400.401,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1401.05,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2037.19,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 792.689,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1263.87,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3192.27,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4382.49,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 474.225,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 974.428,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3003.08,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4235.36,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2217.61,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1448.73,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1057.64,
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
        "date": 1785983777515,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.739,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 444.996,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1689.45,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2485.28,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 38128,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125264,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43832.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 137807,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.362,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.355,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1814.16,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2689.9,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.743,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.219,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1396.16,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2036.09,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 152.103,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 400.516,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1417.82,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2048.21,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 769.564,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1260.1,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3190.98,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4388.17,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 472.684,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 973.424,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3002.41,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4256.51,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2219.83,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1457.08,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1061.91,
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
        "date": 1785984106280,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.429,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 447.131,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1719.38,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2476.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37824.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125280,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43006.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135488,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.443,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 468.258,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1803.42,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2693.15,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 147.056,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 395.004,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1403.77,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2047.95,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 152.985,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 400.937,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1410.32,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2059.09,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 776.556,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1250.61,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3180.8,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4354.2,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 479.863,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 983.522,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3007.57,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4258.78,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2211.96,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1460.6,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1064.49,
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
        "date": 1785985234716,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 132.857,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 447.981,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1690.14,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2481.73,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37853.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125402,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42982.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135665,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.618,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.511,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1813.71,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2689.92,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.809,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.91,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1400.01,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2032.7,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.82,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.69,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1399.57,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2037.63,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 780.265,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1254.47,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3181.07,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4360.75,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 472.722,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 976.976,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2999.54,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4239.8,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2211.99,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1451.26,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1057.09,
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
        "date": 1785985582824,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.934,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.009,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1694.46,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2478.49,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37833.9,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125355,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42962.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135592,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 136.379,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.932,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1800.45,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2689.88,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 146.042,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.698,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1395.37,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2036.04,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 151.107,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.638,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1400.08,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2036.38,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 783.816,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1260.5,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3184.6,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4361.31,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 473.988,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 975.675,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2998.42,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4237.92,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2206.81,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1447.12,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1063.35,
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
        "date": 1785987071654,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 83.6903,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 261.917,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 940.114,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1357.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 20945.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 69165.9,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 25867.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 78250.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 93.8695,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 322.774,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1222.16,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1885.94,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 124.392,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 459.813,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1790.59,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2622.68,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 128.609,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 464.109,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1786.93,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2628.33,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 776.149,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1311.65,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3545.25,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4868.95,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 449.564,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 1001.56,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3282.58,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4653.88,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2832.44,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1394.87,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 972.141,
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
        "date": 1785987708488,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 86.698,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 282.239,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1065.05,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1546.63,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 23879.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 79051.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 28523.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 89043.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 84.6817,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 283.329,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 2106.66,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1661.72,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 86.2496,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 296.371,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1133.86,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1661.86,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 88.7515,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 298.157,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1136.41,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1662.16,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 649.331,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1066.35,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2928.12,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4031.52,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 366.568,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 837.391,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2717.17,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3863.2,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1845.17,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1420.14,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1098.9,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}