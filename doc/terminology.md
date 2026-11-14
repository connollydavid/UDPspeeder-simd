# Terminology: English and Chinese

The two READMEs are a translation of record: the same structure, terms, and
numbers. This table holds the shared vocabulary so the alignment survives
editing. Where a term stays in English in both pages
(option names, protocol names), the table says so rather than inventing a
translation.

| English | 中文 | notes |
|---|---|---|
| tunnel | 隧道 | |
| outer packet | 外层报文 | the tunnel's own packets |
| inner packet | 内层报文 | the carried traffic |
| redundancy | 冗余 | |
| FEC (forward error correction) | FEC（前向纠错） | abbreviation kept |
| Reed-Solomon | Reed-Solomon | name kept |
| ratio (`-f x:y`) | 冗余比（`-f x:y`） | |
| group | 组 | the FEC group |
| shard | 分片 | mode 0's encoded pieces |
| dispatch | 分发 | runtime tier selection |
| tier | 层级 | |
| kernel family | 内核族 | addmul1, xor_tile, crc32c |
| socket marks | 套接字标记 | |
| fwmark / cookie / dscp | fwmark / cookie / dscp | option names kept |
| honor-or-refuse | 要么打上、要么拒绝 | the startup contract |
| endpoint | 对端 | the tunnel's far side |
| the moving endpoint | 对端地址变化 | |
| lease manager | 租约管理器 | the DNS component |
| stacking (a VPN over it) | 叠加 | |
| MTU ledger | MTU 实测记录 | the measured table |
| path MTU | 路径 MTU | |
| idiomatic Ethernet 1500 | 常见的以太网 1500 | the inner MTU choice |
| tuning | 调优 | |
| quick start | 快速上手 | |
| report (`--report`) | 报告（`--report`） | the loss report |
| fifo | fifo | the live-tuning pipe |
| double-spend tension | 双花张力 | TCP over FEC, named not resolved |
| burst loss / congestion loss | 突发丢包 / 拥塞丢包 | |
| what this is not | 它不是什么 | the five honest lines |
| which binary | 哪台机器用哪个二进制 | |
| universal binary | 通用二进制 | the macOS asset |
| appliance | 设备级服务 | router deployment register |
| troubleshooting | 故障排查 | symptom-cause-fix form |
| symptom-cause-fix | 症状-原因-处置 | |
| verification | 验证 | the checks behind the page's claims |
| wire proof | 抓包验证 | packet capture proof |
| privileges | 权限 | |
| obfuscation (`-k`) | 混淆（`-k`） | explicitly not encryption |
| credit | 致谢 | upstream attribution |
