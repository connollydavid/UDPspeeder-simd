cc_local=g++
cc_mingw_cross=i686-w64-mingw32-g++-posix
cc_mac_cross=o64-clang++ -stdlib=libc++


SOURCES0=main.cpp log.cpp common.cpp lib/fec.cpp lib/rs.cpp packet.cpp packet_cook.cpp delay_manager.cpp fd_manager.cpp connection.cpp fec_manager.cpp misc.cpp tunnel_client.cpp tunnel_server.cpp io_uring_recv.cpp xor_spe.S
SOURCES=${SOURCES0} my_ev.cpp -isystem libev
NAME=speederv2


FLAGS= -std=c++11   -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -MMD -MP ${OPT}

ifdef SPE
FLAGS += -DHAVE_PPC_SPE -Wa,-mspe
endif

export STAGING_DIR=/tmp/    #just for supress warning of staging_dir not define

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

mingw_wepoll:git_version    #to compile you need a pacthed version of libev with wepoll backend
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

mingw_cross_wepoll:git_version    #to compile you need a pacthed version of libev with wepoll backend installed
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
TEST_SOURCES=bench/test_main.cpp bench/test_dispatch.cpp bench/test_fec.cpp bench/test_crc32.cpp bench/test_packet.cpp lib/fec.cpp lib/rs.cpp crc32/Crc32.cpp packet_cook.cpp xor_spe.S
BENCH_FLAGS=-std=c++11 -Wall -Wextra -Wno-unused-variable -Wno-unused-parameter -Wno-missing-field-initializers -O2 -DBENCH_EXPOSE_INTERNALS -MMD -MP

ifdef SPE
BENCH_FLAGS += -DHAVE_PPC_SPE -Wa,-mspe
endif

bench: git_version
	${cc_local} -o bench_udpspeeder -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS}

test: git_version
	${cc_local} -o test_udpspeeder -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS}
	./test_udpspeeder

bench-static: git_version
	${cc_local} -o bench_udpspeeder_static -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS} -static

test-static: git_version
	${cc_local} -o test_udpspeeder_static -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS} -static

bench-cross: git_version
	${CC} -o bench_udpspeeder_cross -I. -Ibench ${BENCH_SOURCES} ${BENCH_FLAGS} -static -lgcc_eh

test-cross: git_version
	${CC} -o test_udpspeeder_cross -I. -Ibench ${TEST_SOURCES} ${BENCH_FLAGS} -static -lgcc_eh

all-cross: git_version
	${CC} -o ${NAME}_cross -I. ${SOURCES} ${FLAGS} -lrt -static -lgcc_eh -O2
