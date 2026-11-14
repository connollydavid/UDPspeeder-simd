window.BENCHMARK_DATA = {
  "lastUpdate": 1794654332022,
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
        "date": 1785983961241,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 806.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 675.9,
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
          "id": "4eba472ab96978851ca717e9bb6ddf5f06a89392",
          "message": "Correct the apk install lines on the landing page\n\nThe page told a 25.12 reader to append the feed to /etc/apk/repositories\nand to name the directory. OpenWrt ships /etc/apk/repositories.d/\ncustomfeeds.list for exactly this, and the example inside that file names\nthe index file, so the line has to end in packages.adb.\n\nThe 24.10 lines were already right, checked against base-files, which\ninstalls a usign public key as /etc/opkg/keys/<fingerprint>, the name\nusign -F prints, and against the customfeeds.conf that opkg ships.\nDISTRIB_ARCH comes from /etc/openwrt_release.\n\napk --print-arch checked against apk-tools 3.0.5 from the SDK.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:40:20+01:00",
          "tree_id": "8cbd843a834e5a89de5271fa833d341880644102",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/4eba472ab96978851ca717e9bb6ddf5f06a89392"
        },
        "date": 1785984270021,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 810.5,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 686,
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
          "id": "705d0138e5563586ce7a85c3cec32b86f5322f99",
          "message": "Cache only the SDK that every run reuses\n\nThe per-architecture SDK cache could not have held. Those tarballs\naverage 240 MB, measured across five targets, and the matrix draws\nseventy of them, so the set wants about 16 GB against a 10 GB\nper-repository cache. It would have evicted itself continuously and\ntaken every other cache in the repository with it.\n\nThe index job keeps its cache. That is one tarball, reused by every run,\nand it fits.\n\nEach build job downloads its SDK again and still verifies the checksum,\nwhich is the guarantee that mattered.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T03:52:05+01:00",
          "tree_id": "1318a55cb3fcc2aa1674fea416a8e87293aac148",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/705d0138e5563586ce7a85c3cec32b86f5322f99"
        },
        "date": 1785984978184,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 820.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 606.1,
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
          "id": "c2733d378fa7634ae619123027fe6928372befb4",
          "message": "Give the index script the hash tool it calls\n\nipkg-make-index.sh runs $MKHASH for each package checksum, and OpenWrt's\nbuild system is what normally exports it. Nothing exported it here, so\nthe variable expanded to nothing, the script tried to run a command named\nsha256 and exited 127. The opkg half of the feed produced no index.\n\nmkhash ships in the SDK beside apk and usign, so it is exported with\nthem and checked for like them.\n\nThe redirect that sent the script's stderr to /dev/null is gone. It was\nthere to drop one progress line per package and it hid the failure\ncompletely: the job reported 127 with no message.\n\nReproduced against a released ipk with the SDK's own script: 127 without\nthe variable, a correct index with it, and the whole chain through the\ndetached signature verifies.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T04:05:14+01:00",
          "tree_id": "8b9c88ad092b95e123f8f5e5a60cbe9a0ed7991d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c2733d378fa7634ae619123027fe6928372befb4"
        },
        "date": 1785985763824,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1528.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1260.3,
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
          "id": "499ddb3fee0c507a8c447f9039cff67b24a5367f",
          "message": "Serve the snapshot line, and say how to use the package\n\nSnapshots get their own line and their own branch, feed-main, cut from\nthe packages master the way each release branch is cut from its own.\nSnapshots ship apk, checked against the published tree.\n\nThe snapshot tree has no point releases to resolve, so the SDK comes\nstraight from downloads.openwrt.org/snapshots, which is how the qemu\nlane already reaches it. The format test now names opkg as the exception\nrather than naming each apk line, so a later apk release needs no edit.\n\nThe landing page gains a usage section: where the settings live, which\nend is the server, what has to match at both ends, and the two init\ncommands. It also states that this build checksums the wire with CRC32C\nwhile the stock package uses CRC-32, so a mixed pair will not talk. Both\nwere read out of the shipped config, the init script and packet.cpp.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T04:28:27+01:00",
          "tree_id": "ef9e750bf37e8f51bf9c896c755f37c244c6f622",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/499ddb3fee0c507a8c447f9039cff67b24a5367f"
        },
        "date": 1785987150545,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1195.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 992.4,
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
          "id": "e96efe4ebb3d4905bde48f375292dbde6924b49b",
          "message": "Restore the weekly feed run\n\nThree dispatched runs have published a feed that verifies: every\narchitecture on all three lines, indexes signed and fetched back over\nthe published URLs, and the detached signature checked against the\npublished key. The reason for holding the schedule is spent.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-06T04:40:18+01:00",
          "tree_id": "67106278fc31927d0517398a8073bd7ee7688962",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e96efe4ebb3d4905bde48f375292dbde6924b49b"
        },
        "date": 1785987860229,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 837.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 598.4,
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
          "id": "b08053dd7d7c2d5a01ef91ccfad6b3a0a1efff1f",
          "message": "Publish the stock udpspeeder beside the fork\n\nOne SDK unpack builds both packages and one index serves them, and Collect\nrequires both by name. The job's comments are dropped.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T14:32:35+01:00",
          "tree_id": "da50d81851b25aeb9f09b5207f79acc0850c9d3e",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/b08053dd7d7c2d5a01ef91ccfad6b3a0a1efff1f"
        },
        "date": 1786109928368,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 822.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 690.9,
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
          "id": "d8f93497e6368394b1225115c6e37cc26967b939",
          "message": "Stop publishing the stock udpspeeder\n\nAt 20260730-r1 it outranks OpenWrt's own package wherever this feed is\nenabled, which is not what a feed for udpspeeder-simd should do. The feed\nbranches keep the recipe.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T14:52:24+01:00",
          "tree_id": "ae9b2478d378c3985c1b5f8bb7fa7ba114316572",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d8f93497e6368394b1225115c6e37cc26967b939"
        },
        "date": 1786110989137,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 834.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 719.8,
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
          "id": "6315b784a2f15586beadb2d3f1208b06b63a2c1f",
          "message": "Build the two snapshot packages beside the tagged one\n\nThe package list is one env line the job iterates, so a fourth needs no other\nchange. Each package carries its own name and conflicts with what it stands in\nfor, so adding this feed installs nothing on its own.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T15:35:03+01:00",
          "tree_id": "22b6e61769aeb9284646d35bc69f75ac9bfc692d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/6315b784a2f15586beadb2d3f1208b06b63a2c1f"
        },
        "date": 1786113567761,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 827.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 636.9,
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
          "id": "7ddd4d8a01fe2565b25d3c8659e1457a8d43ca1c",
          "message": "Offer only the snapshot packages\n\nudpspeeder-simd is under review for the official feed, so this feed does not\nclaim that name. Its recipe stays on the feed branches, unbuilt.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T15:40:50+01:00",
          "tree_id": "e02d7c2d733f79f21a18fe133cd6afaadc664dfc",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7ddd4d8a01fe2565b25d3c8659e1457a8d43ca1c"
        },
        "date": 1786113903661,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 827.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 685.3,
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
          "id": "2f8ad9d8d5c8f7ddfe3831efd511690f2f1fb92d",
          "message": "Name this repository in the help banner\n\nThe banner cited wangyu-/UDPspeeder, which is what this is based on rather than\nwhat it is. It now prints both, and the sample output in the two READMEs\nmatches again.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:07:17+01:00",
          "tree_id": "817f34d896552aa9d5ec4294a00b7da2af66a8dd",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/2f8ad9d8d5c8f7ddfe3831efd511690f2f1fb92d"
        },
        "date": 1786115504096,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 831,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 630.3,
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
          "id": "61644b05918e3feb2a5be5dedfa08476220be8a4",
          "message": "Put the program name behind a macro\n\nThe banner said UDPspeeder V2, naming upstream's program and its generation\nrather than this one. PROGRAM_NAME defaults to udpspeeder-simd, and a build\noverrides it with -D, so a package that ships under another name needs no\npatch. The release version already prints on the next line, because a package\nbuild passes it as gitversion.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:13:21+01:00",
          "tree_id": "c7d3d9226ff8057e22d6fd160ea0e02356d51017",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/61644b05918e3feb2a5be5dedfa08476220be8a4"
        },
        "date": 1786115851484,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 828.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 731,
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
          "id": "e5ad992929e19c45b3e9d7c3d724ae486049c436",
          "message": "Print the release version in the help banner\n\nPROGRAM_VERSION carries it, beside PROGRAM_NAME, so both are overridable with\n-D and a release bump is one line. The git version line still shows the commit,\nor the package version when a package build passes one.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:18:14+01:00",
          "tree_id": "3f469be867e3292550bb945768e41c7dfbe6151b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e5ad992929e19c45b3e9d7c3d724ae486049c436"
        },
        "date": 1786116151170,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 826.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 644.9,
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
          "id": "b4ef0d913437521a46a56dfbb242e3208a931420",
          "message": "Guard the banner version, and let a packager name the commit\n\nNothing read PROGRAM_VERSION, so a tag cut without editing it would have\npublished binaries naming the previous release, and no test greps the banner\nto notice. A tag build now fails unless the two agree.\n\nSOURCE_COMMIT prints only when a build defines it, so a package can say which\ncommit it came from while this repository's own builds keep showing the sha on\nthe git version line.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T16:44:25+01:00",
          "tree_id": "9127e9d3f74aac91514c4fb24ea6a96e374f0ae1",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/b4ef0d913437521a46a56dfbb242e3208a931420"
        },
        "date": 1786117725836,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 838.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 670.6,
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
          "id": "dfe77228ecee0fdb39849acaf64fe3dce051c604",
          "message": "Install the packages in OpenWrt before publishing them\n\nThe matrix proved the packages build; nothing proved one installs or runs. A\njob now installs both into the release's own x86-64 rootfs image, checks each\nbinary introduces itself as the package that shipped it and says it is an\nunofficial build, and runs the package's own runtime test. The index job waits\non it, so a package that cannot install cannot reach the feed.\n\nOne architecture and two images, native on the runner, so it costs a couple of\nminutes rather than another matrix.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:12:54+01:00",
          "tree_id": "ff6d614a197c2d1f4aa05e0dd38610c65adbdb04",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/dfe77228ecee0fdb39849acaf64fe3dce051c604"
        },
        "date": 1786119442631,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 804.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 674.3,
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
          "id": "e3ec2f781225c5773d3603a6902a06b8baa6a140",
          "message": "Check the security properties of what the feed publishes\n\nThe install job now asserts nothing lands setuid, that each config holding a\ntunnel key is readable only by its owner, and that the installed binary is\nposition-independent with a non-executable stack, full RELRO and no RPATH. The\nELF checks run on the runner because OpenWrt strips section headers, which also\nremoves the evidence a canary check would need, so the stack protector is left\nto the build flags rather than asserted from the artifact.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:20:41+01:00",
          "tree_id": "52716597fcf5ca9c225aa76057c936098010f918",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e3ec2f781225c5773d3603a6902a06b8baa6a140"
        },
        "date": 1786119937367,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1299.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1123.3,
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
          "id": "5c1728034eeac0dfcbea7d6694fb593866b4b944",
          "message": "Give the verification the two things the rootfs image lacks\n\nThe image has no timeout applet and no /var/lock, so every probe exited 127\nwith empty output and opkg could not take its lock. Both read as the tunnel\nfailing. Installing coreutils-timeout and creating the runtime directories\nmakes both lines pass, runtime test included.\n\nThe install and package commands no longer discard stderr, which is what hid\nthis.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:27:02+01:00",
          "tree_id": "54570ecfd977c98be028d4a88e276b42f41a8974",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/5c1728034eeac0dfcbea7d6694fb593866b4b944"
        },
        "date": 1786120276974,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 844,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 665.2,
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
          "id": "25a0e7b6b9703ea33c0c04bf3f951fbd43a02e75",
          "message": "Report the hardening rather than require it\n\nDemanding a position-independent executable made the check assert a build\nconfiguration the mirrored package does not have. It now fails only on defects\na package controls, an executable stack, a missing RELRO segment or an RPATH,\nand reports the ELF type and whether RELRO is full.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:37:27+01:00",
          "tree_id": "56d7156cd5561b3de0d9ddf3b071abe03f86edcd",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/25a0e7b6b9703ea33c0c04bf3f951fbd43a02e75"
        },
        "date": 1786120895392,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 838.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 670.3,
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
          "id": "a150db028d87bc86e319ee29da1b22c31a291c54",
          "message": "Verify the feed is signed, from a client's side\n\nThe install check uses local files and --allow-untrusted, which switches off\nthe property the feed exists to provide. A job now runs after publishing: it\nreads the landing page for the key filename, adds the feed exactly as those\ninstructions say, confirms the package is refused while the key is absent, then\ninstalls it once the published key is in place.\n\nIt follows the published instructions rather than a copy of them, so a landing\npage that tells someone the wrong thing fails the run.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:43:12+01:00",
          "tree_id": "3e3c7bfd70cea0e18e207b8e67aa670a56ca8598",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/a150db028d87bc86e319ee29da1b22c31a291c54"
        },
        "date": 1786121280744,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1177.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1042.4,
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
          "id": "cf6bb414e5985edca45d26834253c2784d355cfc",
          "message": "Strip the quotes openwrt_release actually uses\n\nDISTRIB_ARCH is single-quoted, so the arch carried its quotes into the feed\nURL and opkg was handed a path that does not exist. Both lines now install\nfrom the published feed and refuse to before the key is in place.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T17:54:18+01:00",
          "tree_id": "c9d6757d0498ab05b2c129b56d6b0dcbbacd920b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/cf6bb414e5985edca45d26834253c2784d355cfc"
        },
        "date": 1786121915854,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 808.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 634.9,
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
          "id": "4a05bedebf05c60f66bb7ea94cfd15c363e921ef",
          "message": "Send feed problems to this repository\n\nThe landing page pointed at the packages fork, which holds the recipes. The\nfeed is served from here and the binaries are built here, so this is where a\nreport belongs.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:35:40+01:00",
          "tree_id": "58d2b39a90d4bdf3330a2630ed4bbc15352e83c3",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/4a05bedebf05c60f66bb7ea94cfd15c363e921ef"
        },
        "date": 1786124397145,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 833.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 716.4,
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
          "id": "88d2137559554c0f8a620691331799a93420f9e1",
          "message": "Cut the gloss from the landing page\n\nTwo names and what each is, then what adding the feed does. The rest argued\nfor the naming rather than telling anyone how to use it.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:36:21+01:00",
          "tree_id": "991607a3c27892537b90b6a6dfc8d1e39cddb13a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/88d2137559554c0f8a620691331799a93420f9e1"
        },
        "date": 1786124440469,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1595.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1322.3,
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
          "id": "19aa3f9776186fd72e827ce927e01742960d13a0",
          "message": "Drop the usage section from the landing page\n\nA feed page says where the packages are and how to trust them. Configuring the\ntunnel belongs with the package.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:38:36+01:00",
          "tree_id": "f49c416e317323c23fad288b259ef647e555ff8b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/19aa3f9776186fd72e827ce927e01742960d13a0"
        },
        "date": 1786124650328,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 826.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 597.4,
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
          "id": "0ba7c9f5f9b74a26ed016a59076bb1c5d6879225",
          "message": "Say the two do not interoperate on the landing page\n\nDropping the usage section took the only statement that this fork and stock\nudpspeeder cannot talk to each other. It belongs beside the package it applies\nto.\n\nCo-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>",
          "timestamp": "2026-08-07T18:45:30+01:00",
          "tree_id": "f6c49d0e300b61f9b34c377b2a850a3b07288c5e",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/0ba7c9f5f9b74a26ed016a59076bb1c5d6879225"
        },
        "date": 1786124985675,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1586.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1327.6,
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
          "id": "f2c0da9b47bcacfa1b7b1f91f0ecba9be5c65ac2",
          "message": "package feed: carry the flashprog packages\n\nThe feed took its package list as bare names under net/. It now takes\npaths, so a package can live in another section, and collects by package\nname rather than by a udpspeeder glob.\n\nThe two flashprog packages own the same path and refuse to install\ntogether, so the verify job installs the full one and runs the package's\nown test against it.",
          "timestamp": "2026-08-08T23:21:06+01:00",
          "tree_id": "f87bbacada1a1827ed0b894569efaa443a076700",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f2c0da9b47bcacfa1b7b1f91f0ecba9be5c65ac2"
        },
        "date": 1786227914404,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1187.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 965.8,
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
          "id": "7848e28f2379b4c2c22d42b4c8851a119cb3bf44",
          "message": "package feed: give the build the feeds its dependencies live in\n\nThe build replaced feeds.conf with the local feed alone. That was enough\nwhile every package needed only libstdcpp, which the SDK ships, and it\nfails the moment one needs libpci, libftdi1 or libjaylink: meson resolves\na selected programmer group against a library that is not staged and\nstops. The base and packages feeds for the release line are now written\nalongside the local one.",
          "timestamp": "2026-08-08T23:33:21+01:00",
          "tree_id": "938cae7c4fd5a80d8cb253a12e7936e90dcfd850",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7848e28f2379b4c2c22d42b4c8851a119cb3bf44"
        },
        "date": 1786228636958,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1837.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1631.6,
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
          "id": "3de97dd06a70c86a3fcbe953e41d384024511b48",
          "message": "package feed: verify a snapshot SDK against sums read after it\n\nA snapshot SDK is rebuilt continuously, so the tarball can change between\nreading the checksum file and fetching it. The window was the whole SDK\ndownload. The sums are now read after the tarball, which cuts the window\nto a few kilobytes and makes the comparison one about bytes already held,\nand the fetch retries three times before giving up.",
          "timestamp": "2026-08-08T23:53:09+01:00",
          "tree_id": "fe5b6eb188577be434c4fc07b2007e2d7a38b6eb",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/3de97dd06a70c86a3fcbe953e41d384024511b48"
        },
        "date": 1786229832665,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 797.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 721.4,
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
          "id": "d02580721767610029e123dc51beacf191dce6fb",
          "message": "package feed: the flashprog variants install side by side now\n\nThey no longer share a path, so the verify job installs every package it\nwas given and runs each one's own test, and the page no longer tells\npeople to pick one.",
          "timestamp": "2026-08-09T00:34:49+01:00",
          "tree_id": "67060ded695d7c293997b5f76efebeb12885d85a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d02580721767610029e123dc51beacf191dce6fb"
        },
        "date": 1786232350070,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 839.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 632.3,
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
          "id": "03b8369f05539430085a52eef03fd46ffa6bc620",
          "message": "package feed: carry the libraries flashprog links\n\nA system whose package repository is not configured cannot resolve libpci,\nlibftdi1, libjaylink or libusb, so the feed's own packages are\nuninstallable there. They are collected and published alongside, under the\nnames OpenWrt uses, which the page now says outright.",
          "timestamp": "2026-08-09T00:53:20+01:00",
          "tree_id": "87c69805ffa449087504d508e39b644e8a3bb03d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/03b8369f05539430085a52eef03fd46ffa6bc620"
        },
        "date": 1786233438706,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1641.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1337.4,
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
          "id": "d9194b00bb060e92ebfd2870f7b7fa072ad69c15",
          "message": "dns-lease-manager: resolve -r hostnames and keep the tunnel alive\n\nThe client's -r option now accepts a hostname. A single-header, allocation-free,\nnonblocking DNS Locator-Hint Cache (dns_lease_mgr.h) resolves it to candidate\nIPs, leases them for an effective TTL (RFC 2181 lowest-TTL rule), refreshes\nbefore expiry, keeps serving the last-known candidates while a refresh fails\n(the stale window, RFC 8767), and falls back to TCP on truncation. The client\ncreates its remote socket on the first lease and re-points it with a second\nconnect() when the candidate set changes, keeping the io_uring multishot and\nthe ev_io watcher valid. ECONNREFUSED on the remote recv path forces a refresh;\na FIFO dns-refresh command does the same by hand.\n\nThe DNS wire codec is built and parsed in the header itself (no getaddrinfo):\nRFC 1035 layout and compression pointers, RFC 2308 negative caching from the\nauthority SOA, MSB-set TTLs read as zero. Server mode is unchanged: a hostname\nin -r is rejected there.\n\nVerification: the .allium requirements lane (check/analyse/plan and the\nobligations ledger discharged by the bench tests) and the .tla timing lane\n(seven safety invariants plus a liveness property, model-checked by TLC) are\nwired into CI and gate the release job.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-10T23:25:46+01:00",
          "tree_id": "7df55f67a384d6303ab96b63336fedc61d2bdd15",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d9194b00bb060e92ebfd2870f7b7fa072ad69c15"
        },
        "date": 1786401012166,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 839.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 679.8,
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
          "id": "36641bcf10eb9eb3bd3e934b1293d105316ba1d3",
          "message": "version: bump to v1.1.0 for the DNS lease manager\n\nThe first minor bump per call/0008: the DNS lease manager feature lands as\nv1.1.0, the tag is the release.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-10T23:28:24+01:00",
          "tree_id": "e330c0bb3445bbbfd226162049b00964bbe93b8f",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/36641bcf10eb9eb3bd3e934b1293d105316ba1d3"
        },
        "date": 1786401155924,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 824.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 681.6,
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
          "id": "8b67771deaac17e74bc9c463606c83fe4b5cac38",
          "message": "dns-lease-manager: close the verification gaps\n\nSamira's lane is now full. The DNS response parser gets the fuzz treatment the\npacket decoder already had: bench/fuzz_dns_lease.cpp feeds mutated responses to\ndns_lease_parse_response under ASan/UBSan, as a bounded random driver and a\nlibFuzzer target (make fuzz-dns / fuzz-dns-libfuzzer), wired into CI.\n\nThe stale_max_ms == 0 sentinel (serve stale indefinitely) is now tested on\nboth lanes: a C++ case that advances the clock ten days into a stale lease and\nasserts it never gives up, and a second TLC instance (MC-stale0.cfg) with the\ngive-up transition guarded by StaleMax > 0 to match the header exactly.\n\nThe live integration lane (bench/dns-live-test.sh + bench/dns_stub.py) runs the\nreal client against real servers with a python DNS stub on port 53, exercising\nthe create-on-first-lease socket path, the re-point on a candidate change, and\nthe TCP fallback on a truncated answer. The Windows build is exercised under\nWine (make test-mingw + wine64), covering the DNS lease manager's Windows PAL\nfor the first time. Both lanes gate the release.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T11:18:02+01:00",
          "tree_id": "19d4df217594907924c738360e6facd84e8a6097",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/8b67771deaac17e74bc9c463606c83fe4b5cac38"
        },
        "date": 1786443880133,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 796.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 688.1,
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
          "id": "6a9721a51d3c283f6b76426c7741235b68ae1120",
          "message": "dns-lease-manager: fix the mingw build and the live lane's resolv.conf\n\nThe Windows (MinGW) test build exposed two pre-existing portability bugs in\nthe fork: lib/fec.cpp cast a pointer to long (32-bit on Windows x64, so the\ncast lost precision), now (intptr_t); and xor_spe.S kept its comment outside\nthe HAVE_PPC_SPE guard, so a non-PowerPC build still fed assembly to the\nassembler, which the MinGW toolchain rejects. The guard now covers the whole\nfile, so it assembles to nothing without SPE.\n\nThe live DNS lane writes resolv.conf, but a GitHub runner's /etc/resolv.conf\nis managed by systemd-resolved and not writable even as root. The script now\nbind-mounts a private resolv.conf over it (root, as the lane requires), torn\ndown and the original restored in cleanup.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T11:28:43+01:00",
          "tree_id": "db7e42fee7f3ff885f10103c7d1b775bcd3ecee5",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/6a9721a51d3c283f6b76426c7741235b68ae1120"
        },
        "date": 1786444514500,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 809,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 690.3,
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
          "id": "f7bdceb0b2dd53c60164ed39e204a31f81975c10",
          "message": "ci: run the live lane under sudo, and use the wine package\n\nThe dns-live lane needs root (bind port 53, bind-mount resolv.conf), but the\nrunner user is not root, so the whole script runs under sudo. The mingw-wine\nlane's wine64 command does not exist on Ubuntu (the package ships the loader\nunder /usr/lib/wine); the wine package provides the /usr/bin/wine wrapper.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T11:37:49+01:00",
          "tree_id": "c301267b316901bf3215c4f22c850fa35c20ab52",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f7bdceb0b2dd53c60164ed39e204a31f81975c10"
        },
        "date": 1786445062574,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 835.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 639.3,
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
          "id": "e33aa716e475458c691cf901af4625e19d6c8926",
          "message": "ci: run the live lane under sudo, and use the wine package\n\nThe dns-live lane needs root (bind port 53, bind-mount resolv.conf), but the\nrunner user is not root, so the whole script runs under sudo. The mingw-wine\nlane's wine64 command does not exist on Ubuntu (the package ships the loader\nunder /usr/lib/wine); the wine package provides the /usr/bin/wine wrapper.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T21:10:38+01:00",
          "tree_id": "e242fe83f10373d29a9fbc9723d29200338ebc64",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e33aa716e475458c691cf901af4625e19d6c8926"
        },
        "date": 1786479542900,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 832.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 634,
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
          "id": "845df573c827382ba751d7e52d26a7f8066adcf1",
          "message": "ci: run on main now that the canonical branch is renamed\n\nbranch_libev becomes main. The push/pull_request trigger filters and the\nbenchmark-storage conditions follow the canonical branch by name, so a rename\nsilently stops CI and the dashboards unless they move with it.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T21:59:57+01:00",
          "tree_id": "a122804f7b6cef0b4a9cd5c893832333174d3530",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/845df573c827382ba751d7e52d26a7f8066adcf1"
        },
        "date": 1786482392434,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1079.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 843.3,
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
          "id": "c5a625c6f4ccd68347bdd8da6bc9b68775d584be",
          "message": "ci: point the trigger at feed-snapshot, not the deleted branch_libev\n\nThe split moved the feed machinery to this branch, but the ci.yml still named\nbranch_libev (deleted) and master (never present here). Both filters are dead;\nthis points them at feed-snapshot so the branch is self-consistent.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T23:33:36+01:00",
          "tree_id": "56ce7d6e856980733f275ab1dc02614360e3188d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c5a625c6f4ccd68347bdd8da6bc9b68775d584be"
        },
        "date": 1786487869686,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 828.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 644.9,
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
          "id": "4370bac6354c747004ba94e2e6e142d23f0fccab",
          "message": "ci: drop the stale master trigger filter\n\nThe fork has no master branch (canonical is main), so the filter entry was\ndead config carried from the upstream-shaped original.\n\nCo-Authored-By: DeepSeek V4 Flash 0731 <noreply@www.deepseek.com>",
          "timestamp": "2026-08-11T23:32:26+01:00",
          "tree_id": "367e6afa3913de5641c365f66f9e1e1e416e70de",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/4370bac6354c747004ba94e2e6e142d23f0fccab"
        },
        "date": 1786487926698,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 844.5,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 646.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "bce0f3c90b50475c5c4d2a6e7062daaf9627e0b1",
          "message": "bench: make dns-live-test.sh executable\n\nThe usage line documents ./bench/dns-live-test.sh as the invocation, but\nthe file was recorded 100644, so a fresh clone fails with exit 126 before\nthe lane starts. Set the executable bit the documented interface promises.\n\nCo-Authored-By: GLM-5.3 <https://chat.z.ai>",
          "timestamp": "2026-11-07T20:06:08Z",
          "tree_id": "fbf98ae97f964bcb23e2c3f478a021b44da04dbb",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/bce0f3c90b50475c5c4d2a6e7062daaf9627e0b1"
        },
        "date": 1794082346377,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 716.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 609.4,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "14ef9c1954382f2ff2c4be5ddc152a547095fd33",
          "message": "spec: socket marks, honor or refuse\n\nsocket_marks.allium specifies the operator's per-packet classification\nof the tunnel's outer traffic: a routing mark, a filter cookie and a\ndifferentiated-services code point. The contract is honor-or-refuse: a\nnonzero mark the host cannot stamp refuses startup, resolver sockets\ncarry no marks, marks ride a tunnel re-point, and zero means untouched.\nThe allium lane checks, analyses and plans the second spec beside\ndns_lease_mgr, and the cli pin follows the ecosystem to 3.5.3.\n\nServes plan/0002 (Diego's shaping story, sdanfa's request).\n\nCo-Authored-By: GLM-5.3 <https://chat.z.ai>",
          "timestamp": "2026-11-12T01:34:17Z",
          "tree_id": "b0126decd725d52a7b04d87926e3ac4824d4eba3",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/14ef9c1954382f2ff2c4be5ddc152a547095fd33"
        },
        "date": 1794447623962,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 742.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 600.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "9c807064093580402026d435d451d1d7165f9c2b",
          "message": "marks: fwmark, cookie and dscp on the tunnel sockets\n\nThe socket_marks surface, per socket_marks.allium: parse_mark_value\ntakes decimal or 0x hex and refuses everything else (empty, garbage,\ntrailing characters, a sign, leading space, above the maximum);\nmark_supported answers from the platform headers before any socket\nexists, so a mark the host cannot stamp refuses startup; and\napply_socket_marks dresses every socket the tunnel creates, both\ncreators and both families, after the buffer size and beside the\ninterface binding. Zero means untouched. dscp rides IP_TOS and\nIPV6_TCLASS shifted into the TOS field; on Windows the whole stamp is\nrefused at parse time, where the deprecated socket option would\notherwise succeed vacuously.\n\nThe fwmark test is dual-mode, because SO_MARK wants CAP_NET_ADMIN: a\nprivileged run asserts the stamp, an unprivileged one asserts the honest\nrefusal. The lane runs the suite twice on the runner, plain and under\nsudo, so both sides of that mode are someone's green assertion. The\nidea and the first prototype are sdanfa's (udpspeeder-simd issue 1).\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T01:52:45Z",
          "tree_id": "a25f49647b1be64cb2b80f9ffc4c90eea7563031",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/9c807064093580402026d435d451d1d7165f9c2b"
        },
        "date": 1794448726422,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 978.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 716,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "a4bce62563b1d1a0aa0ebc0f33e44b4e4fcf61d4",
          "message": "marks: the obligations manifest, every plan obligation dispositioned\n\nNine structural (the spec's own check and analyse lane), eight\nbehavioural (the bench tests with their exercises links), two waived\nwith reasons: the resolver rule guards a refactor of sockets the libc\nresolver owns, and the startup statement is process_arg logging the\nbench build does not contain. The obligations lint covers the second\nspec beside the first.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T01:53:48Z",
          "tree_id": "c2fdb695a32fa1183b75cd624613523394813a70",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/a4bce62563b1d1a0aa0ebc0f33e44b4e4fcf61d4"
        },
        "date": 1794448791455,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 719.6,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 629.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "8b1691b1f6647c4d14dac34d87fce4d9a777ab31",
          "message": "marks: the header owns the platform gates\n\nThe socket includes and the MARKS_HAVE macros live in the declaration\nhalf of socket_marks.h now, so a consumer that includes only the header\nsees the same gates the implementation uses; the bench tests ask the\nmacros instead of the raw constants, and MinGW builds against winsock\ninstead of sys/socket.h. The v6 apply test requires both the dscp and\nthe traffic-class gates, and socket closes go through closesocket on\nWindows.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T02:02:49Z",
          "tree_id": "bff477888de4a26b1a0e637677975a23e6f2852d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/8b1691b1f6647c4d14dac34d87fce4d9a777ab31"
        },
        "date": 1794449342525,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 675.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 526.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "079c3af965c57385fb36bc895d59c66206cf3b07",
          "message": "ci: the marks tests start WinSock, the FreeBSD lane takes an Intel host\n\nThe Windows test binary never called WSAStartup, so every socket the\nmarks tests made under Wine failed to exist; the suite initializer\nstarts WinSock on that platform now. The FreeBSD VM lane pins\nmacos-13: macos-latest is an arm64 image and the action's rsync into\nan amd64 FreeBSD VM dies with an unexpected end of file on it.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T02:10:12Z",
          "tree_id": "b645856603a70e354a43ff6832f8115b60f1328c",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/079c3af965c57385fb36bc895d59c66206cf3b07"
        },
        "date": 1794449771329,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1118.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 952.4,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "bf9e14b05c31b89aa93c3e3ae268a3feb3993c1c",
          "message": "ci: the FreeBSD lane rides an arm64 VM on the arm64 runner\n\nThe Intel macos-13 runners queue for many minutes and are retiring;\nthe vmactions image table lists aarch64 builds, so the lane takes\nmacos-latest with arch arm64 and the FreeBSD 15.1 image. SO_USER_COOKIE\nis unchanged by the architecture move.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T05:51:24Z",
          "tree_id": "00d35ab3f1561772cd75cdd3ee17f1d7b874aabb",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/bf9e14b05c31b89aa93c3e3ae268a3feb3993c1c"
        },
        "date": 1794463053096,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 698.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 585,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "c134db1fd9fc1004e1a8a9a31bb6a1793e8a9eba",
          "message": "ci: the FreeBSD lane syncs the workspace over scp\n\nThe action's default rsync into the VM dies with an unexpected end of\nfile on every host tried, arm64 and amd64 alike, so the lane names the\nscp transport the action documents as an alternative.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T05:58:26Z",
          "tree_id": "20388244c2ffd67dc824996dcb1d91238e66b9ee",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c134db1fd9fc1004e1a8a9a31bb6a1793e8a9eba"
        },
        "date": 1794463464055,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1096.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 872.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "62dea558477f870a17bb7de714ea7b861d748a2d",
          "message": "ci: the FreeBSD lane builds with the base clang\n\nThe gcc port's libstdc++ demands the port's libgcc_s symbol versions\nwhile the loader prefers the base one, and the build dies before a\nsource is read. FreeBSD carries clang in base, so the lane drops the\ngcc port and builds with cc_local=clang++; the test sources need no\nlibev, and git_version falls back to an empty string without git.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:05:34Z",
          "tree_id": "1d8db3051af1a2d7a22825c41137a30915d36eef",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/62dea558477f870a17bb7de714ea7b861d748a2d"
        },
        "date": 1794463901653,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 986,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 726.8,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "f0f3c9ddbe7c46708c1e1738f7f08b20a24d7c8b",
          "message": "ci: a native Windows lane beside the mingw-wine cross\n\nThe mingw-wine job proves the code compiles and links for Windows;\nthis lane runs it on real WinSock, which wine cannot promise, and is\nthe host the qWAVE dscp machinery will be exercised on. MSYS2 pinned\nby commit; the suite builds with the native mingw-w64 g++ and the\nmakefile's test target needs no -lrt.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:13:49Z",
          "tree_id": "551770d63e57ae80576e5e4ec41ba81ca9b7d625",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f0f3c9ddbe7c46708c1e1738f7f08b20a24d7c8b"
        },
        "date": 1794464396635,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 743.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 583.7,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "6564bd1efb0db908775b7b9d091c05356f53ce49",
          "message": "docs: the three socket marks, both languages\n\nUsage lines with defaults and platform notes, and one prose section\neach: the marks are host-local, fwmark is policy routing on Linux and\nwants root or CAP_NET_ADMIN, cookie is ipfw's side on FreeBSD, dscp\nreaches WMM access categories through the stack's mapping on Wi-Fi,\nand Windows dscp is refused rather than silently unmarked, with\nNew-NetQosPolicy named as the supported answer there.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:18:55Z",
          "tree_id": "e136c8810c68152d3a89c5922cb9964a22fe96c4",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/6564bd1efb0db908775b7b9d091c05356f53ce49"
        },
        "date": 1794464773955,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1235.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 958.5,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "ed680f85148e38bcf6bb20d709e73c8c97dcd548",
          "message": "ci: the Windows lane builds the mingw test target\n\nThe plain test target links no winsock library and dies on\n__imp_socket; the makefile's test-mingw target already carries\n-lws2_32, so the lane builds it with the native MSYS2 g++ standing in\nas the cross compiler and runs the exe.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:21:57Z",
          "tree_id": "3296ba189755ba1587684903b17824496a237b34",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/ed680f85148e38bcf6bb20d709e73c8c97dcd548"
        },
        "date": 1794464944018,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 975.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 692.7,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "aea551a78453521368761826f388306bbcf9bced",
          "message": "marks: the Windows dscp tier rides qWAVE\n\nThe per-socket TOS option on Windows succeeds without marking\nanything, so dscp there is dressed through the qWAVE flow API instead:\nthe connected socket joins a flow to its destination and the flow\ncarries the DSCP value. The support answer is probed, not assumed --\nwine ships no qWAVE service, and a claimed support the host cannot\nback would break honor-or-refuse exactly where it matters -- so a\ntunnel re-point re-tracks by construction, the flow test is dual-mode\nthe same way the fwmark test is, and the parse-time refusal fires\nwherever qWAVE cannot be reached.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:34:17Z",
          "tree_id": "c2c0d7b2785548996bbe86c90b18f939515ad4ad",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/aea551a78453521368761826f388306bbcf9bced"
        },
        "date": 1794465616093,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1098,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 929.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "1f214e78dd45ec30726a229af60dec3fe86da6a2",
          "message": "marks: set the Vista floor before winsock for the qWAVE declarations\n\nSome MinGW headers gate QOS_FLOWID and its kin behind _WIN32_WINNT\n0x0600, and the cross build never set it, so the tier failed to\ncompile there while the native lane was fine. The floor goes in before\nwinsock loads; the MSVC-only pragma comment goes away entirely, since\nthe makefile links qwave by name.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:41:25Z",
          "tree_id": "a2fc61599fa0192d5b6478e9aae70ef6aec21dbb",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/1f214e78dd45ec30726a229af60dec3fe86da6a2"
        },
        "date": 1794466062531,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 683.8,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 627.7,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "218c836be506f5c0de47bd3968685c16214ccdb8",
          "message": "marks: repair the preprocessor chains the last edit broke\n\nThree #else lines survived above the inserted #elif branches, which no\ncompiler accepts; the chains read ifdef / elif / else again, and the\nlocal build gates the commit this time.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T06:52:30Z",
          "tree_id": "18d58ee9f8393a1a1d5055f4835fdf2de490986d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/218c836be506f5c0de47bd3968685c16214ccdb8"
        },
        "date": 1794466719148,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 691.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 589.7,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "c34c87b19912bee085195558f0fc0bd05e1f4219",
          "message": "marks: qWAVE declared locally, admission refusal is a tested arm\n\nSome MinGW-w64 headers ship a qos2.h that references a QOS_FLOWID the\nsame header never declares and does not compile at all, so the minimal\nqWAVE surface is declared here against qwave.lib directly, ABI-exact,\nand every Windows toolchain builds the same declarations. The flow\ntest accepts admission refusal (ERROR_NOT_SUPPORTED, which the Server\nrunner's qWAVE policy answers) as the honor-or-refuse arm it is: the\nfatal path owns such hosts, and the assertion says so instead of\nfailing a host that honestly said no.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T07:01:21Z",
          "tree_id": "3e3aa29a1ebdb6c202e5654c1bf338cc0918e254",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c34c87b19912bee085195558f0fc0bd05e1f4219"
        },
        "date": 1794467230886,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1226.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1060.5,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "4bf5ff4b3a2540306b1e3dd208a14c0cece8ad48",
          "message": "marks: the local qWAVE declarations carry C linkage\n\nThey sat outside the implementation's extern \"C\" block, so the calls\ncompiled to C++-mangled names no import library carries; the linkage\nwrapper moves onto the declarations themselves.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T07:08:15Z",
          "tree_id": "1bebc31c5366058757a957f784425ccc6cca9325",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/4bf5ff4b3a2540306b1e3dd208a14c0cece8ad48"
        },
        "date": 1794467663403,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 735.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 590.8,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "9c0a963fc8448f2f90371366cc52fb92c498ffc6",
          "message": "marks: wine is Windows without qWAVE, and the tests say so\n\nThe middle-branch assertions assumed _WIN32 means qWAVE present, but\nwine is _WIN32 with an honestly-absent service, so the probe answers\nno there. The branches now assert what is always true on that\nplatform: dscp rides flows, never a per-socket stamp, and apply is a\nno-op for it.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T07:15:42Z",
          "tree_id": "98b2626fa732a74ae55a7ea5ec1c278eaa646a6b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/9c0a963fc8448f2f90371366cc52fb92c498ffc6"
        },
        "date": 1794468110168,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 675.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 591.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "66fbb4dba53b614b5749b5ef55d419d8c63cef76",
          "message": "v1.2.0\n\nSocket marks for the tunnel's outer traffic: --fwmark (Linux policy\nrouting), --cookie (FreeBSD ipfw) and --dscp (IP_TOS/IPV6_TCLASS, qWAVE\non Windows), each zero-default and honor-or-refuse -- a mark the host\ncannot stamp refuses startup. Resolver traffic is never marked; marks\nride a tunnel re-point; nothing changes on the wire. Specified in\nsocket_marks.allium with obligations discharged by the bench suite;\nnew FreeBSD and Windows CI lanes cover the platform inversions. The\nidea and the first prototype are sdanfa's (issue 1).\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T07:22:48Z",
          "tree_id": "0cd94bfbb57fcdae82bbeb1217ae31e81bd985a0",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/66fbb4dba53b614b5749b5ef55d419d8c63cef76"
        },
        "date": 1794468534432,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 714.5,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 548.5,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "5cf333b0fb0773032ccb46b4d3c5ae316599f01e",
          "message": "ci: the dscp byte reaches the wire, observed on loopback\n\nThe suite proves the socket carries the value; the capture proves the\nkernel puts the byte on the wire. A small sender dresses a socket\nthrough apply_socket_marks exactly as the tunnel does and emits five\ndatagrams to loopback; tcpdump must read tos 0xb8 (dscp 46) back off\nthe wire. Ubuntu runs it under the sudo pass, FreeBSD inside the VM\nwith the base tcpdump on lo0.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T10:48:53Z",
          "tree_id": "f44b2597b4a779ab360325bf3be64503ac84611d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/5cf333b0fb0773032ccb46b4d3c5ae316599f01e"
        },
        "date": 1794480900716,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1510.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1126.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "e5db0e60e185e2a0b7b367ffa05322db04950165",
          "message": "ci: drop the probe workflow from main (experiment machinery)",
          "timestamp": "2026-11-12T10:49:36Z",
          "tree_id": "9b72f5a6f823881459fce84711320454ba893e3d",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e5db0e60e185e2a0b7b367ffa05322db04950165"
        },
        "date": 1794480926841,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1213.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1003.4,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "f0b6e51e8ed2dd0be79e47819a10ba7bd0cb4626",
          "message": "build: the windows exe target links qwave\n\nThe qWAVE dscp tier added socket_marks.cpp to the sources but the\nmingw_cross exe targets still linked only ws2_32, so the main windows\nbinary has not linked since the tier landed; no lane built it, because\nthe release publishes linux binaries only. The import library joins\nboth exe targets now, and the gap this exposed is recorded: the\nwindows release artifact is owed.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T10:53:45Z",
          "tree_id": "1e637783fc95028be5dbb2df6a6ccd7352cf155b",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f0b6e51e8ed2dd0be79e47819a10ba7bd0cb4626"
        },
        "date": 1794481183050,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1129.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 980.4,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "5f7ee105ffe3abdd942e973d28d7f82d7415407e",
          "message": "build: the windows exe targets tolerate libev's narrowing\n\nThe embedded libev win32 backend initializes SOCKET members from -1\nin braced lists, which C++11 makes a hard error, so no modern compiler\ncan build the main windows exe; no lane built it, which is how it\nstayed broken. The legacy-compatible downgrade joins both exe targets\nbeside the qwave link fix.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T11:00:55Z",
          "tree_id": "c3fcbc2e1781d175babc628a007d1e3c3d88daa5",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/5f7ee105ffe3abdd942e973d28d7f82d7415407e"
        },
        "date": 1794481631312,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 743.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 614.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "7278a418ce86dce1b08bdb86bb08824e7d57fe5d",
          "message": "ci: keep the probe workflow off main (branch-only experiment)",
          "timestamp": "2026-11-12T11:25:19Z",
          "tree_id": "c3fcbc2e1781d175babc628a007d1e3c3d88daa5",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7278a418ce86dce1b08bdb86bb08824e7d57fe5d"
        },
        "date": 1794483128561,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 711.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 615.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "fbd482a51e9b752c9805c9c00047db276cad5de6",
          "message": "rename the binary to udpspeeder-simd\n\nspeederv2 was upstream's internal name; the fork is udpspeeder-simd,\nthe release artifacts were already named for the project, and the\nOpenWrt package installs the binary under its own name, so the\nlingering speederv2 was the odd one out. The makefile NAME, the CMake\nproject and target, the bench scripts, the CI references, gitignore\nand every documented example now say udpspeeder-simd. The next release\nnotes this as a breaking rename of the binary's filename.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T11:28:03Z",
          "tree_id": "e9207a11d4f8622ee632a0423a6e3006e9267cfc",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/fbd482a51e9b752c9805c9c00047db276cad5de6"
        },
        "date": 1794483251147,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 718.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 565.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "5d72395d33cd1d6e7259df7a916a9ae351dd3405",
          "message": "marks: qWAVE flows join non-adaptive\n\nThe probe matrix on the hosted windows runner isolated it: adaptive\nflows are refused with ERROR_NOT_SUPPORTED for every destination,\nwhile non-adaptive flows are admitted, plain shell or elevated alike.\nqWAVE's path estimation is what those environments cannot provide, and\na tunnel wants the stamp, not the estimate, so the flow joins with\nQOS_NON_ADAPTIVE_FLOW and the positive dscp path opens on CI hardware\ninstead of only on desktops.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T11:38:24Z",
          "tree_id": "6561d7b4af14871b13c6972fab97c5c7c0d74d3f",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/5d72395d33cd1d6e7259df7a916a9ae351dd3405"
        },
        "date": 1794483870198,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 965,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 775,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "f8678ef182078be723d50b8443ec63535339a6af",
          "message": "marks: the windows flow test asks a routable destination\n\nqWAVE refuses loopback flows outright -- there is no path to estimate\n-- so the flow test's destination moves to a routable one, matching\nthe shape the probe matrix proved admitted on hosted runners.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T11:47:08Z",
          "tree_id": "10ff7f29482afe75cd714459d89b9f0d64aeb36e",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/f8678ef182078be723d50b8443ec63535339a6af"
        },
        "date": 1794484389917,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 943.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 756.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "389ad596f49646439ac377497bcefb6d2265eb59",
          "message": "ci: the windows wire proof via pktmon, and the macos lane\n\nThe windows wire sender dresses a flow through qWAVE to a routable\ndestination (sockets carry no stamp there), pktmon captures on the\nfilter, and the DSCP byte is read straight out of the converted\npcapng by a small parser -- no tshark install. Darwin was the missing\nrung on the host ladder: it carries IP_TOS and IPV6_TCLASS like the\nother unices, refuses fwmark and cookie honestly, and its lane runs\nthe suite plus the same loopback capture the linux and freebsd lanes\nassert. The evidence ladder is now four hosts with wire proof on\nthree of them and the fourth one capture away from complete.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T13:41:00Z",
          "tree_id": "fd5a7158e1594905f21fdea043e25280945a7387",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/389ad596f49646439ac377497bcefb6d2265eb59"
        },
        "date": 1794491253378,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 2098.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1467.3,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "7876c3e9af82f0953fb0fdba4fd362074aeaaf80",
          "message": "docs: a plain-language guide to the socket marks\n\nWritten for Diego, who runs the tunnel and never reads C++: what each\nmark is for in one sentence, the OpenWrt config that sets it, the\nmarked-or-refuse promise, why resolver traffic stays unmarked, and a\nskeptic's account of the wire-level testing -- capture the packets,\nread the byte back, fail the build if it differs.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T14:20:11Z",
          "tree_id": "63343dd8e9eac9b8f40fc1f2ef3c449c9f0a3953",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7876c3e9af82f0953fb0fdba4fd362074aeaaf80"
        },
        "date": 1794493584498,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 683.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 527.3,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "3f14365597f9e3d09bc1071dbfeb5eb70cd296c8",
          "message": "ci: the macos lane does not gate while macOS runners starve\n\nThe lane as written fails every run: macOS runners are not being\ngranted to this repository, so the job queues past ten minutes and is\ncancelled without a runner, twice observed on both macos-latest and\nmacos-14 with a trivial workload. continue-on-error carries the lane\nwithout gating releases on a platform capacity fact; the flag comes\noff the day this lane goes green once.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T15:16:22Z",
          "tree_id": "05f1c6b5369ac56175e2405eb5760fab31b10f9a",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/3f14365597f9e3d09bc1071dbfeb5eb70cd296c8"
        },
        "date": 1794496962560,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 703.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 560.9,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "aecbe20bd70b0d49fe211ca3c4a6554dcfa1d026",
          "message": "ci: the freebsd lane does not gate while the macOS pool starves\n\nThe freebsd VM rides a macOS runner as its host, and the pool that\ncancels the macos lane without a runner cancels it too -- main's\nmatrix went red on exactly that. The lane was green hours before (run\n43212123044) and nothing in the software changed; continue-on-error\ncarries it until the pool grants capacity again, alongside macos.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-12T15:32:30Z",
          "tree_id": "01fe68c287fbf13dd8d0d2e21cb31ee521a11d37",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/aecbe20bd70b0d49fe211ca3c4a6554dcfa1d026"
        },
        "date": 1794497908146,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1170.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1006.8,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "d1e1ee96a16b3d2103905a5fd73e8a6efadc51c4",
          "message": "ci: pin the linux lanes to ubuntu-24.04 through the runner roll\n\nubuntu-latest migrated overnight to a newer default toolchain, and\nits statically linked glibc and libstdc++ emit SSSE3/AVX2/SSE4.2 in\nnon-dunder symbols the ISA screen's allowlist predates -- the screen\nflagged a hundred runtime functions overnight, all of them library\ncode. The lanes pin the image the v1.2.x binaries were proven on;\nthe screen's allowlist for static runtime code is the follow-up.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T00:03:30Z",
          "tree_id": "4519d47fd77ef452bdcf09ddb2f02c78b768fa05",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/d1e1ee96a16b3d2103905a5fd73e8a6efadc51c4"
        },
        "date": 1794528582902,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 713.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 588,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "0fec3817032c3b283114eb396d024bf9ffc07eef",
          "message": "bench: the VPN-over-tunnel evidence pair, and the guide they feed\n\nvpn-ledger.sh stacks WireGuard and both OpenVPN transports over a\nreal tunnel across a veth whose MTU plays the path MTU, probes DF\nping sizes, and reads the wire with tcpdump: every MTU ledger cell is\nmeasured. vpn-marks-check.sh holds the WireGuard recipe's mark\ncoordination: the stack passes with both mark rules installed, the\ntunnel's outer packets carry the mark (mark-match counter), and the\ntwo marks differ in value and rule. The guide carries the recipes,\nthe ledger table (filled by measurement), and the OpenVPN TCP\ndouble-spend tension stated and left live. Runs unprivileged in a\nuser+net namespace.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T03:19:43Z",
          "tree_id": "0892cec78a60f992b602a1575b9da077a2d51e07",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/0fec3817032c3b283114eb396d024bf9ffc07eef"
        },
        "date": 1794540350148,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 974.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 744.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "79711b980bdd21ff0fa10cadaf620601b583b65c",
          "message": "docs: the VPN-over-tunnel family, measured and told straight\n\nThe ledger fills from the harness runs, reproducible across two:\nWireGuard passes to its own 1420 interface bound (1419 measured) at\nboth path MTUs, OpenVPN UDP to its tun bound (1499), the outer packet\nceiling under filled groups is 1313 and 1254 bytes -- under the PPPoE\n1492 at both -- and OpenVPN's TCP transport is refused at the UDP\nlistener, which is the tunnel's nature, not a defect: the SYN meets a\nUDP socket. The guide carries the WireGuard marks recipe (coordination\nproven separately, four claims), the UDP stacking, the refusal, the\ndouble-spend tension for inner TCP flows stated and left live, the\nstranger scenarios, and the generalized anti-loop exception, with\nupstream's guide superseded and credited.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T04:58:18Z",
          "tree_id": "e58915c19c543c725a46dd857e90b1c4d88e3182",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/79711b980bdd21ff0fa10cadaf620601b583b65c"
        },
        "date": 1794546260487,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1175.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1017.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "8f1d8949bcb1e011ea9871e6035eebe02e107fd3",
          "message": "docs: the double-spend tension moves to the OpenVPN UDP section\n\nThe intended family is OpenVPN over UDP; the tension describes TCP\nflows riding that UDP VPN inside the FEC, so it lives where it\napplies. The TCP-transport refusal stays as its own short honest\nanswer, with the pointer to the UDP stackings that do carry TCP\ntraffic.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T16:33:30Z",
          "tree_id": "e3ff94f32b70924afb9cd25a373077640649f9d9",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/8f1d8949bcb1e011ea9871e6035eebe02e107fd3"
        },
        "date": 1794587986990,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 716.5,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 570.8,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "e9f02155f67d9d49b57354c2060b3dee849982f4",
          "message": "docs: the inner link runs at the idiomatic ethernet 1500\n\nThe customary VPN MTU arithmetic buys nothing over this tunnel: the\nblob encoder re-segments beneath the inner link, so WireGuard drops\nits 1420 default for the plain ethernet value and measures to the\nsame 1499 bound as OpenVPN's tun, the interface itself, at both path\nMTUs. The wire ceilings (1304 and 1254, measured under filled\ngroups) stay under the PPPoE 1492. Nothing strange anywhere in the\nstack: 1500 inside, shards at most --mtu outside.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T16:35:25Z",
          "tree_id": "2e976b8db636d63363eb4e7c5694c5391fb26754",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e9f02155f67d9d49b57354c2060b3dee849982f4"
        },
        "date": 1794588105701,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 713.7,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 610.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "c68a92ddb6ce16cf21fb0bc851cf262da37f8446",
          "message": "bench: the applied recipes check, fifo and the moving endpoint\n\nFive claims a reader's recipes stand on: the fifo levers (fec,\ntimeout, queue-len) accepted and logged by a running instance; a\nclient started with -r hostname resolving and passing; and the\nmoving endpoint proved brutally -- the DNS answer flips, the old\nserver dies, and the same client process re-points and passes again.\nThe DNS side runs on a namespace-local resolv.conf bind mount and a\none-file responder on port 53; no host root anywhere.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T23:46:20Z",
          "tree_id": "d38253c4da561de29ce3ee57f1cf1f9257c72840",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c68a92ddb6ce16cf21fb0bc851cf262da37f8446"
        },
        "date": 1794613979943,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1751.4,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1530.1,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "a4009ffd9253e90638bcbc7e69b4a02520014ce6",
          "message": "docs: running on OpenWrt, from the release assets only\n\nThe guide turns a release binary into a router appliance: the\ntarget-to-asset table from the arch map, a paste-ready procd init\nscript that reads /etc/config/udpspeeder-simd and maps the documented\nUCI options onto the binary's flags (so every UCI stanza in the docs\nworks verbatim on a binary deployment), the report and fifo for live\ntuning, one line in sysupgrade.conf to survive firmware upgrades, and\nthe router-side marks rule. Deployment documented from the release\nassets only; no feed or upstream claims. The init script is\nsyntax-checked and its flags mirror the verified option surface.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-13T23:59:20Z",
          "tree_id": "67e84c95d3dc7d45dd09663bc3576cc024ca0ce7",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/a4009ffd9253e90638bcbc7e69b4a02520014ce6"
        },
        "date": 1794614767249,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1006.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 705.3,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "edae3cbacae4f0c62227c2b58e5f6f7951e3ab62",
          "message": "docs: the troubleshooting guide, four symptoms each with its record\n\nSymptom-cause-fix form throughout: the admission-refused fatal (the\nhonor-or-refuse spec and the marks guide's promise), the MTU\nblackhole (mode 1's documented no-split behavior, with the ledger's\nmeasured ceilings clearing the tunnel itself), transit DSCP\nremarking (the byte proven leaving the host by CI capture, the hops\nbeyond it stated honestly), and the ratio backfiring (the tuning\narithmetic and the double-spend tension, with the report-based\ndiagnosis). Both READMEs will route here.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:02:42Z",
          "tree_id": "850c4603587f9edd19c0528fb93bb24c3b5df1bc",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/edae3cbacae4f0c62227c2b58e5f6f7951e3ab62"
        },
        "date": 1794614966229,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 987.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 798.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "c04daf82c8858df83a191eb8f4257a3cb9edca0b",
          "message": "docs: the README rewritten as the fork's own front door\n\nSections open with claims: what this is with the credit link up\nfront, why it is fast with the dispatch diagram and the measured\ntable, why this fork (the DNS-following endpoint, the marks with\ntheir refusal contract, four hosts measured, ten assets) with the two\nscars told as stories (the SSSE3 SIGILL and the pretending Windows\nsocket), quick start, OpenWrt routing to the binary guide, the\nmeasured VPN stacking at the idiomatic 1500, tuning with the live\nfifo, the moving endpoint, the five honest lines, which-binary, the\nplatform and privileges tables, troubleshooting routed, the evidence\nposture, and the license with credit. Three mermaid blocks render;\nno upstream image remains; the options block is replaced by the\nbinary's own help, which cannot drift from the code it documents.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:05:00Z",
          "tree_id": "67b17632ca3ba0901caf699a33e1e3faf3b661d6",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c04daf82c8858df83a191eb8f4257a3cb9edca0b"
        },
        "date": 1794615058966,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1155.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 955.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "7fcb5beeebeed10bd1e0ec0fc804922e8efd847f",
          "message": "docs: the Chinese README, section for section with the English page\n\nThirteen sections aligned one to one, the same three mermaid blocks\nwith Chinese labels (render-verified), the same tables and numbers\nwith the same citations, and the documentation register held: the\nfork's name and credit up front, the two scars, the measured VPN\nstacking at 1500, the live fifo tuning, the five honest lines, and\nthe evidence posture. The upstream-era Chinese strata the inventory\nlisted (the personal anecdote, the v1/v2 talk, the keyword block,\nthe VM password) are gone with the page that carried them.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:08:39Z",
          "tree_id": "8e15aa5770cf673a78ccc5f72b68f51c4e0d91e6",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/7fcb5beeebeed10bd1e0ec0fc804922e8efd847f"
        },
        "date": 1794615301300,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1171.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 972.3,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "953e3c6e1fb03899ebc1761f14c2e01cd443eb4c",
          "message": "docs: the socket marks guide in Chinese\n\nThe promise paragraph carries the same force in Chinese: a mark the\nhost cannot honor is refused at startup, never silently dropped. The\nquick-reference table is intact (option, what it marks, where it\nworks, privileges), the wire-proof method is told the same way, and\nthe Windows alternative keeps its no-code framing. The dedication\nline does not cross into the translation: shipped artifacts carry no\npersona names.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:09:20Z",
          "tree_id": "b314ab28306532347e09a525f7987979c507d801",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/953e3c6e1fb03899ebc1761f14c2e01cd443eb4c"
        },
        "date": 1794615373621,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1141.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 979.3,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "e12d17b6ea82f899a4977987ca279712a517064b",
          "message": "docs: the evidence hold, every artifact swept\n\nNo persona names remain in any shipped document (the marks guide's\ndedication line goes, as the translation already knew). No\nmethodology vocabulary beyond the checking artifacts' own file\nnames, and the obligations phrasing becomes plain product language.\nEvery performance, platform and feature statement in the shipped\npages traces to OPTIMIZATION.md, the arch map, the measured ledger,\nthe recipes check, or the specifications CI runs. The marks guide's\nthirteen em-dash decorations are reworded to zero tropes. A\nterminology table now binds the English and Chinese READMEs as a\ntranslation of record, linked from both.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:11:11Z",
          "tree_id": "47eb68f6af5b8b9649bfde20acf9de28b256bc1c",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/e12d17b6ea82f899a4977987ca279712a517064b"
        },
        "date": 1794615474592,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1013,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 836.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "3aee5a97a49f467e83e7bb98214109594efdee75",
          "message": "v1.3.0: the man page, generated from the binary's own help\n\nA minor bump for a user-visible addition: make man runs gen_man.sh,\nwhich reads the built binary's --help and emits doc/udpspeeder-simd.1\nin mdoc, so the page cannot drift from the code it documents (the\nold README's embedded help once drifted to a three-versions-old\nbanner; this design makes that impossible). make install places both\nthe binary and the page. The bump and the regenerated page share this\ncommit, and the tag carries the same version its page prints.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:20:01Z",
          "tree_id": "b1c6b6fcd94ee506701cdf9d639816d5f58c7021",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/3aee5a97a49f467e83e7bb98214109594efdee75"
        },
        "date": 1794615972981,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1261.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 970.2,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "926b5756d803d179ab2c4880ee1c02277c9f0509",
          "message": "docs: the writing-whip pass across every shipped page\n\nOne dedicated pass per file against a stricter trope list than the\nrepo linter (compulsive counting, bold-first bullets, coined labels,\nteaching voice, tie-backs, figurative register), applied with the\nwriting-whip skill v0.1.0 by Ossama Chaib (CC BY 4.0, crediting\ntropes.fyi). The scars passage in both READMEs is gone by operator\nruling, the marks guides' question headings became the operator's\npreferred statement, and every measured number, citation, table, code\nblock and mermaid diagram survived byte-identical. All eight pages\nand the regenerated man page sit at zero warnings; 13 headings still\nalign across the two READMEs.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:42:07Z",
          "tree_id": "75e035e4697e98b536ee171b53311c678de34841",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/926b5756d803d179ab2c4880ee1c02277c9f0509"
        },
        "date": 1794617301630,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 718.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 497.6,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "aead01be26f7ff0bc8b2b2dce0d2ffe1eebe18ab",
          "message": "docs: the verification section speaks to the reader\n\nThe old heading carried a coined label and the paragraph catalogued\nits machinery; the rewrite opens with what a person actually needs\n(you should not have to take this page's word for anything) and then\ngives each check in the terms of the doubt it answers. The heading\nbecame Verification in English and 验证 in Chinese, the terminology\ntable follows, and both pages keep their heading alignment.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:45:54Z",
          "tree_id": "0cd590e9228533cf08c5697f941798369c7912a3",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/aead01be26f7ff0bc8b2b2dce0d2ffe1eebe18ab"
        },
        "date": 1794617572277,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 712.3,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 505,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "278a3d38e926aeae56c86feb1915ab17facad1fd",
          "message": "docs: the verification section opens with its first fact\n\nThe opener sentence is gone by operator ruling, and the whip pass\nover what remained took the trailing explanation clause with it; the\nsection now states each check and stops.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:46:49Z",
          "tree_id": "2e348f9ff4e7f4ffe5f8d3738b6ab9ff500966ef",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/278a3d38e926aeae56c86feb1915ab17facad1fd"
        },
        "date": 1794617685208,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1185.9,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1058.9,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "dbf18133db642c5982886ce7ccd03205a71ff6d4",
          "message": "docs: the dispatch check stated without its history\n\nThe sentence carried the old SIGILL story inside a consequence\nclause; by operator ruling the fact stands alone: the dispatch table\nis held against named CPU models in CI.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:49:08Z",
          "tree_id": "c9f7f20855ef5ceb0db6ca134737fd3bcbbc4d11",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/dbf18133db642c5982886ce7ccd03205a71ff6d4"
        },
        "date": 1794617800266,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 980.1,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 736.7,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "c222d4fd11a3aad9ff4c264fbd0fba0b5b3f9e18",
          "message": "docs: the credit section's closing clause dropped\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T00:50:27Z",
          "tree_id": "d738a2b3e00802595a7d23acdf42346a76748df9",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/c222d4fd11a3aad9ff4c264fbd0fba0b5b3f9e18"
        },
        "date": 1794617860587,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1702.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1428.4,
            "unit": "Mbps"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "committer": {
            "email": "connollydavid@users.noreply.github.com",
            "name": "David Connolly",
            "username": "connollydavid"
          },
          "distinct": true,
          "id": "1ef50b2867d09c191ead30b90ad89994db8d42aa",
          "message": "docs: the last of the persona findings, licensing and preservation\n\nThe final review caught two classes the earlier rounds could not:\nlicense truth (MIT covers the fork's own code; the bundled FEC,\nlibev and CRC32 sources retain their licenses, and binary\ndistributions must carry notices) and preservation truth (a manual\ndeployment's enable symlinks are not default conffiles, so the\nsysupgrade list now names the binary, the init script and both rc.d\nlinks, with a verify step after the upgrade). The OpenWrt target\ntable now records builds and QEMU models instead of invented\nhardware examples, the download example verifies its sha256, the\nprivileges row names CAP_NET_RAW on newer kernels, and the uci\nsequence is an explicit commit-and-reload with no trigger claims.\nBoth pages and the guide sit at zero warnings, headings aligned.\n\nCo-Authored-By: GLM-5.3 <noreply@z.ai>",
          "timestamp": "2026-11-14T02:19:45Z",
          "tree_id": "c56648a0c589c12ffde5900239035d7ca0fd99a2",
          "url": "https://github.com/connollydavid/UDPspeeder-simd/commit/1ef50b2867d09c191ead30b90ad89994db8d42aa"
        },
        "date": 1794654329451,
        "tool": "customBiggerIsBetter",
        "benches": [
          {
            "name": "throughput/no-fec",
            "value": 1766.2,
            "unit": "Mbps"
          },
          {
            "name": "baseline/throughput/no-fec",
            "value": 1415.2,
            "unit": "Mbps"
          }
        ]
      }
    ]
  }
}