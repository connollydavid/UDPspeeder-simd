window.BENCHMARK_DATA = {
  "lastUpdate": 1786124253386,
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
        "date": 1786109743432,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 112.204,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 325.702,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1297.89,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1759.52,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 26995.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 89553.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 31797.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 98854.9,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 111.013,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 398.942,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1551.45,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2324.42,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 109.986,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 379.698,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1461.23,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2166.21,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 143.89,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 385.948,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1497.29,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2174.97,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 853.319,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1256.24,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3353.01,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4629.29,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 474.903,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 973.845,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3150.53,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4484.05,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2328.17,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1521.43,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1150.02,
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
        "date": 1786110810288,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 112.868,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 326.658,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1194.49,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1752.31,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 27553.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 90152.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 32079.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 98932.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 110.953,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 400.301,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1551.57,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2319.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 109.83,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 379.377,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1462.23,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2147.14,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 113.828,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 384.661,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1467.03,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2154.8,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 861.337,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1291.39,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3380.28,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4640.71,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 478.075,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 962.669,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3151.58,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4473.56,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2334.51,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1551.71,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1137.03,
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
        "date": 1786113732983,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.166,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 450.223,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1716.44,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2480.99,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37901.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 126095,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43060.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135424,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.316,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 468.541,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1800.85,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2692.26,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.681,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 394.127,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1397.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2038.49,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.985,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 400.11,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1406.12,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2039.39,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 773.389,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1250.1,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3166.92,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4360.44,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 474.977,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 974.977,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3030.64,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4243.13,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2209.92,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1439.41,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1059.1,
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
        "date": 1786113807717,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.282,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 447.942,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1692.89,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2487.02,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 38139,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125426,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43415.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135826,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 136.172,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 470.311,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1801.67,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2694.26,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.87,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.12,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1396.79,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2051.37,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 149.976,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.597,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1400.53,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2037.44,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 771.858,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1249.14,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3172.07,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4348.49,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 470.829,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 970.475,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2993.7,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4232.49,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2209.24,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1448.88,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1064.48,
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
        "date": 1786115315924,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 138.565,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 451.196,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1694.01,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2480.33,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37856.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125252,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42932.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135055,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.576,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.145,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1803.04,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2692.67,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.295,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 394.305,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1394.86,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2046.68,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.768,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 399.016,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1402.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2037.08,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 781.537,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 2134.5,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3265.95,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4481.36,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 500.706,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 1025.63,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3105.63,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4365.66,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2263.52,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1497.38,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1092.93,
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
        "date": 1786115689149,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 139.137,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 444.964,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1699.14,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2483.78,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 38317.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125151,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43108.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135789,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.585,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 471.231,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1802.73,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2689.7,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.523,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 394.406,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1398.24,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2034.99,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.34,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.955,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1408.51,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2033.83,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 775.128,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1254.2,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3173.43,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4354.6,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 474.219,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 975.069,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2990.35,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4255.38,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2211.16,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1568.42,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1246.77,
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
        "date": 1786115971503,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 73.1113,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 235.616,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 879.31,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1289.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 19979.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 66142.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 23894.8,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 73661.7,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 70.7894,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 240.634,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 898.778,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1368.82,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 73.7149,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 247.541,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 946.098,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1383.68,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 75.4403,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 254.047,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 948.464,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1389.52,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 543.941,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 913.913,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2437.98,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 3385.37,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 306.725,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 695.348,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2273.89,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3223.62,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1544.56,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1182.02,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 914.55,
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
        "date": 1786117551304,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 74.0656,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 236.992,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 878.203,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1312.33,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 19837.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 65847.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 23888.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 73475.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 71.7472,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 236.071,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 923.109,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1412.91,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 73.6892,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 246.289,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 979.174,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1382.3,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 74.158,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 248.329,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 953.672,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1407.41,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 537.534,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 912.903,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2431.98,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 3423.6,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 302.84,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 692,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2264.65,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3598.4,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1545.43,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1185.82,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 913.472,
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
        "date": 1786119256005,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.601,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.112,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1691.41,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2484.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 38229.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125757,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42957.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 136169,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.634,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 470.793,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1827.55,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2693.19,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.707,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 392.59,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1395.94,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2032.55,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.155,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.366,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1401.83,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2036.2,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 777.131,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1254.25,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3178.8,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4358.15,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 476.203,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 982.389,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3007.3,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4243.86,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2214.16,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1449.08,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1060.02,
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
        "date": 1786119766965,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.829,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 445.729,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1695.4,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2490.94,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37859.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125644,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 42954.6,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135458,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.405,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 468.9,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1803.14,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2694.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.324,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.162,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1401.03,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2036.14,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.124,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.313,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1398.95,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2036.69,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 772.209,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1253.62,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3176.35,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4364.57,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 479.689,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 983.621,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3540.57,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4369.74,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2747.31,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1477.74,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1066.08,
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
        "date": 1786120105952,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.74,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 445.882,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1693.53,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2481.41,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37875.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125079,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43575,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135619,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 136.12,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 468.691,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1801.66,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2689.04,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 146.798,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 404.279,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 2099.53,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2054.97,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 153.989,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 402.504,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1419.27,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2059.08,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 765.48,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1242.72,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3167.31,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4354.62,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 475.599,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 974.937,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3004.67,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4259.34,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2221.02,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1448.51,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1056.7,
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
        "date": 1786120723546,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 133.828,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 460.068,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1704.77,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2496.07,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37800.2,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 125369,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 59360.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135101,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.636,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 469.612,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1802.21,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2690.17,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 144.958,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.465,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1394.33,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2038.39,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.571,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.845,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1401.4,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2038.83,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 776.218,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1253.11,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3179.91,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4360.59,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 470.811,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 970.285,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2993.91,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4226.82,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2208.05,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1443.2,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1056.52,
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
        "date": 1786121166270,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 51.591,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 169.877,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 606.911,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 877.528,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 13504.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 43949.3,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 16065.1,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 49477.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 51.773,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 174.121,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 660.366,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 978.572,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 62.1075,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 220.348,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 872.504,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1281.94,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 64.7092,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 223.218,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 861.78,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1261.5,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 438.535,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 709.999,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 1889.66,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 2595.15,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 247.302,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 536.412,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 1738.8,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 2386.46,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1423.26,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 758.894,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 502.287,
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
        "date": 1786121720411,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 83.3753,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 251.823,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 925.584,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1357.07,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 20972.4,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 69838,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 24916.5,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 76551.5,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 83.5032,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 309.357,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1203.38,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 1800.71,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 85.1335,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 293.954,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1136.15,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 1667.78,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 88.0228,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 298.19,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1137.76,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 1669.56,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 645.207,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 990.47,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 2607.01,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 3597.93,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 367.259,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 744.798,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 2439.83,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 3476.87,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 1808.52,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1178.63,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 892.677,
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
        "date": 1786124216033,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 106.911,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 325.045,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1210.54,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 1749.23,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 27226,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 90487,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 33824,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 99423.8,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 108.281,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 399.338,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1550.48,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2321.36,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 110.059,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 380.767,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1464.54,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2151.06,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 114.958,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 385.807,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1467.39,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2153.3,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 868.973,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1276.92,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3355.77,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4629.35,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 466.238,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 977.438,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3161.89,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4478.69,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2334.2,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1520.79,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1136.04,
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
        "date": 1786124249659,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "addmul1/64B",
            "value": 135.305,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/256B",
            "value": 446.527,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1024B",
            "value": 1699.49,
            "unit": "ns/op"
          },
          {
            "name": "addmul1/1500B",
            "value": 2478.21,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k5/8/1500B",
            "value": 37969.9,
            "unit": "ns/op"
          },
          {
            "name": "rs_encode/k10/15/1500B",
            "value": 126547,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k5/8/1500B",
            "value": 43388.7,
            "unit": "ns/op"
          },
          {
            "name": "rs_decode/k10/15/1500B",
            "value": 135225,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/64B",
            "value": 135.336,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/256B",
            "value": 468.976,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1024B",
            "value": 1800.79,
            "unit": "ns/op"
          },
          {
            "name": "crc32_old/1500B",
            "value": 2690.93,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/64B",
            "value": 145.276,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/256B",
            "value": 393.088,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1024B",
            "value": 1395.39,
            "unit": "ns/op"
          },
          {
            "name": "crc32c_sw/1500B",
            "value": 2035.99,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/64B",
            "value": 150.326,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/256B",
            "value": 398.742,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1024B",
            "value": 1407.7,
            "unit": "ns/op"
          },
          {
            "name": "crc32c/1500B",
            "value": 2042.17,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/64B",
            "value": 774.337,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/256B",
            "value": 1253.38,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1024B",
            "value": 3178.48,
            "unit": "ns/op"
          },
          {
            "name": "do_cook/1500B",
            "value": 4359.45,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/64B",
            "value": 473.438,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/256B",
            "value": 979.395,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1024B",
            "value": 3004.56,
            "unit": "ns/op"
          },
          {
            "name": "de_cook/1500B",
            "value": 4238.74,
            "unit": "ns/op"
          },
          {
            "name": "cook_crc32_only/1500B",
            "value": 2206.17,
            "unit": "ns/op"
          },
          {
            "name": "cook_obscure_only/1500B",
            "value": 1455.71,
            "unit": "ns/op"
          },
          {
            "name": "cook_xor_only/1500B",
            "value": 1062.68,
            "unit": "ns/op"
          }
        ]
      }
    ]
  }
}