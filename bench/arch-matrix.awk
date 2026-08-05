# bench/arch-matrix.awk — turn bench/arch-map.tsv into a GitHub matrix.
#
# The table describes an architecture once. Everything the workflow needs
# beyond it is derived here rather than repeated there, so adding a target is
# an edit to the table and the toolchain hash stays beside the URL it belongs
# to. Three shapes: a row naming an apt package builds cross with that
# compiler, a row naming a tarball stages an OpenWrt toolchain and takes its
# compiler from the environment, and a row naming neither builds natively.
#
#   awk -f bench/arch-matrix.awk bench/arch-map.tsv
#
# Checked field by field against the hand-written matrix it replaced.
BEGIN { FS = "\t"; printf "[" }
/^#/ || NF < 8 { next }
{
    name = $1; tc = $2; sha = $3
    cf = ($4 == "-" ? "" : $4)
    q  = ($5 == "-" ? "" : $5)

    if (tc == "-") {
        pkgs = ""; url = ""; args = ""
        bt = "bench-static"; tt = "test-static"; pt = "all"
        bb = "bench_udpspeeder_static"; tb = "test_udpspeeder_static"
        pb = "speederv2"
    } else {
        bt = "bench-cross"; tt = "test-cross"; pt = "all-cross"
        bb = "bench_udpspeeder_cross"; tb = "test_udpspeeder_cross"
        pb = "speederv2_cross"
        if (tc ~ /^apt:/) {
            p = substr(tc, 5)
            url = ""; pkgs = p " qemu-user-static"
            cc = p; sub(/^g\+\+-/, "", cc); args = "CC=" cc "-g++"
        } else {
            url = tc; pkgs = "qemu-user-static zstd"; args = ""
        }
    }

    printf "%s{\"name\":\"%s\",\"packages\":\"%s\",\"toolchain_url\":\"%s\"," \
           "\"sha256\":\"%s\",\"bench_target\":\"%s\",\"test_target\":\"%s\"," \
           "\"prod_target\":\"%s\",\"make_args\":\"%s\",\"bench_bin\":\"%s\"," \
           "\"test_bin\":\"%s\",\"prod_bin\":\"%s\",\"qemu_cmd\":\"%s\"," \
           "\"cpu_flags\":\"%s\",\"expect_addmul1\":\"%s\",\"expect_xor\":\"%s\"," \
           "\"expect_crc32c\":\"%s\"}", \
           sep, name, pkgs, url, sha, bt, tt, pt, args, bb, tb, pb, q, cf, $6, $7, $8
    sep = ","
}
END { print "]" }
