window.BENCHMARK_DATA = {
  "lastUpdate": 1785983385204,
  "repoUrl": "https://github.com/connollydavid/UDPspeeder-simd",
  "entries": {
    "UDPspeeder Throughput": [
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
        "date": 1785976949395,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 836.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 598.3,
            "unit": "Mbps"
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
        "date": 1785977461140,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 821.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 695.4,
            "unit": "Mbps"
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
        "date": 1785981480341,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 823.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 687.8,
            "unit": "Mbps"
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
        "date": 1785982454324,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 836.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 631.1,
            "unit": "Mbps"
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
        "date": 1785983383877,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 824.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 626.9,
            "unit": "Mbps"
          }
        ]
      }
    ]
  }
}