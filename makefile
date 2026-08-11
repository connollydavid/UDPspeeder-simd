cc_local=g++
cc_mingw_cross=i686-w64-mingw32-g++-posix
cc_mac_cross=o64-clang++ -stdlib=libc++


SOURCES0=main.cpp log.cpp common.cpp lib/fec.cpp lib/rs.cpp packet.cpp packet_cook.cpp delay_manager.cpp fd_manager.cpp connection.cpp fec_manager.cpp misc.cpp tunnel_client.cpp tunnel_server.cpp io_uring_recv.cpp xor_spe.S
SOURCES=${SOURCES0} my_ev.cpp -isystem libev
NAME=speederv2


FLAGS= -std=c++11   -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -MMD -MP ${OPT}

# Take the SPE XOR when the caller is building for a core that has it. GCC 9
# removed SPE support, so no predefined macro names the core and only the
# caller can say; the -mcpu it passes is that statement. The e500v1 (8540) and
# the e500v2 (8548) both carry the integer SPE opcodes this uses, and no other
# PowerPC core does. OpenWrt passes the flag in CXXFLAGS, the cross targets
# below take it inside CC or CXX, so all four are searched. filter matches
# whole words, so a longer name that merely contains one of these cannot match.
# Passing SPE=1 by hand still works and overrides nothing.
ifneq ($(filter -mcpu=8540 -mcpu=8548,$(CC) $(CXX) $(CFLAGS) $(CXXFLAGS)),)
SPE := 1
endif

ifdef SPE
FLAGS += -DHAVE_PPC_SPE -Wa,-mspe
endif

export STAGING_DIR=/tmp/    #just for suppress warning of staging_dir not define

# targets for nativei (non-cross) compile 
all:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb -static -O2

freebsd:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb -static -O2

mingw:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS}  -ggdb -static -O2 -lws2_32

mingw_wepoll:git_version    #to compile you need a patched version of libev with wepoll backend
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES0} ${FLAGS}  -ggdb -static -O2   -DNO_LIBEV_EMBED -D_WIN32 -lev -lws2_32 

mac:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS}  -ggdb -O2

cygwin:git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb -static -O2 -D_GNU_SOURCE

#targes for general cross compile

cross:git_version
	${CXX}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} ${CXXFLAGS} ${LDFLAGS} -lrt -O2

cross2:git_version
	${CXX}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} ${CXXFLAGS} ${LDFLAGS} -lrt -static -lgcc_eh -O2

cross3:git_version
	${CXX}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} ${CXXFLAGS} ${LDFLAGS} -lrt -static -O2

cross_cxx:git_version
	${CXX}   -o ${NAME}_cross    -I. ${SOURCES} ${FLAGS} -O2 ${CXXFLAGS} ${LDFLAGS} ${LDLIBS}

#targets only for debug purpose
fast: git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -ggdb
debug: git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -Wformat-nonliteral -D MY_DEBUG -ggdb
debug2: git_version
	rm -f ${NAME}
	${cc_local}   -o ${NAME}          -I. ${SOURCES} ${FLAGS} -lrt -Wformat-nonliteral -ggdb


#targets for cross compile windows targets on linux 

mingw_cross:git_version   #to build this and the below one you need 'mingw-w64' installed (the cross compile version on linux)
	${cc_mingw_cross}   -o ${NAME}.exe          -I. ${SOURCES} ${FLAGS}  -ggdb -static -O2 -lws2_32

mingw_cross_wepoll:git_version    #to compile you need a patched version of libev with wepoll backend installed
	${cc_mingw_cross}   -o ${NAME}_wepoll.exe       -I. ${SOURCES0} ${FLAGS}  -ggdb -static -O2   -DNO_LIBEV_EMBED -D_WIN32 -lev -lws2_32

#targets for cross compile macos targets on linux 

mac_cross:git_version   #need to install 'osxcross' first.
	${cc_mac_cross}   -o ${NAME}_mac          -I. ${SOURCES} ${FLAGS}  -ggdb -O2


clean:
	rm -f ${NAME} ${NAME}_cross ${NAME}.exe ${NAME}_wepoll.exe ${NAME}_mac
	rm -f git_version.h
	rm -f *.d bench/*.d lib/*.d crc32/*.d

-include $(wildcard *.d bench/*.d lib/*.d crc32/*.d)

gitversion ?= $(shell git rev-parse HEAD 2>/dev/null)
git_version:
	    echo "const char *gitversion = \"$(gitversion)\";" > git_version.h

# --- Benchmark and test targets ---
BENCH_SOURCES=bench/bench_main.cpp bench/bench_fec.cpp bench/bench_crc32.cpp bench/bench_packet.cpp lib/fec.cpp lib/rs.cpp crc32/Crc32.cpp packet_cook.cpp xor_spe.S
TEST_SOURCES=bench/test_main.cpp bench/test_dispatch.cpp bench/test_fec.cpp bench/test_crc32.cpp bench/test_packet.cpp bench/test_dns_lease.cpp lib/fec.cpp lib/rs.cpp crc32/Crc32.cpp packet_cook.cpp xor_spe.S
BENCH_FLAGS=-std=c++11 -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -O2 -DBENCH_EXPOSE_INTERNALS -MMD -MP
SAN_FLAGS=-std=c++11 -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -O1 -g -fno-omit-frame-pointer -DBENCH_EXPOSE_INTERNALS

ifdef SPE
BENCH_FLAGS += -DHAVE_PPC_SPE -Wa,-mspe
endif

bench: git_version
	${cc_local} -o bench_udpspeeder -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS}

test: git_version
	${cc_local} -o test_udpspeeder -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS}
	./test_udpspeeder

# The suite again under AddressSanitizer and UndefinedBehaviorSanitizer. Most of
# what this code does by hand is what these two catch: lane-width arithmetic in
# the vector kernels, the tails that finish a loop a few bytes at a time, and the
# direct-mapped tables that replaced std::map in the FEC decode. -O1 keeps the
# stack traces readable, and the recover options are off so the first fault ends
# the run rather than being counted and passed over.
test-sanitize: git_version
	${cc_local} -o test_udpspeeder_asan -I. -Ibench ${TEST_SOURCES} \
	    ${SAN_FLAGS} -fsanitize=address,undefined
	ASAN_OPTIONS=abort_on_error=1:detect_leaks=1 \
	  UBSAN_OPTIONS=halt_on_error=1:print_stacktrace=1 ./test_udpspeeder_asan

# Hostile bytes through the packet decoder, under the same sanitizers. de_cook
# is what a packet from the network touches first, and it trims a length the
# sender chose before anything is authenticated. Built with gcc this is the
# standalone driver, a bounded random test; bench/fuzz_cook.cpp carries a
# libFuzzer entry point for a clang build that can do the real thing.
FUZZ_SOURCES=bench/fuzz_cook.cpp packet_cook.cpp crc32/Crc32.cpp xor_spe.S

FUZZ_ITERATIONS ?= 200000
FUZZ_SECONDS ?= 60

fuzz: git_version
	${cc_local} -o fuzz_cook -I. -Ibench ${FUZZ_SOURCES} \
	    ${SAN_FLAGS} -fsanitize=address,undefined
	ASAN_OPTIONS=abort_on_error=1 UBSAN_OPTIONS=halt_on_error=1 \
	  ./fuzz_cook ${FUZZ_ITERATIONS}

# The real thing, where clang is present. Coverage-guided, so it reaches cases
# the bounded random driver above will not stumble on. Findings land in
# ./fuzz-artifacts as reproducers.
fuzz-libfuzzer: git_version
	clang++ -o fuzz_cook_libfuzzer -I. -Ibench ${FUZZ_SOURCES} \
	    ${SAN_FLAGS} -DFUZZ_LIBFUZZER -fsanitize=fuzzer,address,undefined
	mkdir -p fuzz-artifacts fuzz-corpus
	./fuzz_cook_libfuzzer fuzz-corpus -max_total_time=${FUZZ_SECONDS} \
	    -artifact_prefix=fuzz-artifacts/ -print_final_stats=1

# The DNS response parser is a second untrusted-bytes face: the resolver is a
# locator-hint source, so its answers are attacker-shaped too. Same two-entry
# harness as fuzz_cook (bounded random driver + libFuzzer target).
FUZZ_DNS_SOURCES=bench/fuzz_dns_lease.cpp

fuzz-dns: git_version
	${cc_local} -o fuzz_dns_lease -I. -Ibench ${FUZZ_DNS_SOURCES} \
	    ${SAN_FLAGS} -fsanitize=address,undefined
	ASAN_OPTIONS=abort_on_error=1 UBSAN_OPTIONS=halt_on_error=1 \
	  ./fuzz_dns_lease ${FUZZ_ITERATIONS}

fuzz-dns-libfuzzer: git_version
	clang++ -o fuzz_dns_lease_libfuzzer -I. -Ibench ${FUZZ_DNS_SOURCES} \
	    ${SAN_FLAGS} -DFUZZ_LIBFUZZER -fsanitize=fuzzer,address,undefined
	mkdir -p fuzz-artifacts fuzz-corpus
	./fuzz_dns_lease_libfuzzer fuzz-corpus -max_total_time=${FUZZ_SECONDS} \
	    -artifact_prefix=fuzz-artifacts/ -print_final_stats=1


bench-static: git_version
	${cc_local} -o bench_udpspeeder_static -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS} -static

test-static: git_version
	${cc_local} -o test_udpspeeder_static -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS} -static

bench-cross: git_version
	${CC} -o bench_udpspeeder_cross -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS} -static -lgcc_eh

test-cross: git_version
	${CC} -o test_udpspeeder_cross -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS} -static -lgcc_eh

# The Windows (MinGW) test binary, run under Wine: exercises the DNS lease
# manager's Windows PAL (registry discovery, Winsock, QueryPerformanceCounter)
# and the rest of the suite on the Windows build. Override cc_mingw_cross for a
# 64-bit toolchain (the CI lane does).
test-mingw: git_version
	${cc_mingw_cross} -o test_udpspeeder.exe -I. -Ibench ${TEST_SOURCES} \
	    ${BENCH_FLAGS} -static -ggdb -lws2_32

all-cross: git_version
	${CC} -o ${NAME}_cross -I. ${SOURCES} ${FLAGS} -lrt -static -lgcc_eh -O2
