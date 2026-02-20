#define ANKERL_NANOBENCH_IMPLEMENT
#include "nanobench.h"
#include "bench_common.h"
#include <cstring>
#include <fstream>
#include <vector>

int main(int argc, char *argv[]) {
    bool json_output = false;
    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "--json") == 0)
            json_output = true;
    }

    ankerl::nanobench::Bench bench;
    bench.title("UDPspeeder").warmup(3).relative(false);

    register_fec_benchmarks(&bench);
    register_crc32_benchmarks(&bench);
    register_packet_benchmarks(&bench);

    if (json_output) {
        /* github-action-benchmark customSmallerIsBetter format
         * Mustache templates can't do math, so we extract results manually */
        std::ofstream out("bench_results.json");
        auto results = bench.results();
        out << "[\n";
        for (size_t i = 0; i < results.size(); i++) {
            double ns = results[i].median(ankerl::nanobench::Result::Measure::elapsed) * 1e9;
            out << "  {\n"
                << "    \"name\": \"" << results[i].config().mBenchmarkName << "\",\n"
                << "    \"unit\": \"ns/op\",\n"
                << "    \"value\": " << ns << "\n"
                << "  }";
            if (i + 1 < results.size()) out << ",";
            out << "\n";
        }
        out << "]\n";
    }

    return 0;
}
