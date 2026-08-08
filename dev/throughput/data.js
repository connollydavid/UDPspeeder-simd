window.BENCHMARK_DATA = {
  "lastUpdate": 1786232355549,
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
      }
    ]
  }
}