#include "packet_cook.h"
#include "crc32c.h"
#include <stdint.h>
#include <string.h>
#include <assert.h>

/* Provided by common.cpp in production, stubs in bench */
extern "C++" void get_fake_random_chars(char *s, int len);
extern "C++" int random_between(uint32_t a, uint32_t b);

static const int cook_buf_len = 3800; /* matches common.h buf_len */

static void
cook_write_u32(char *p, uint32_t l)
{
    *(unsigned char *)(p + 3) = (unsigned char)((l >> 0) & 0xff);
    *(unsigned char *)(p + 2) = (unsigned char)((l >> 8) & 0xff);
    *(unsigned char *)(p + 1) = (unsigned char)((l >> 16) & 0xff);
    *(unsigned char *)(p + 0) = (unsigned char)((l >> 24) & 0xff);
}

static uint32_t
cook_read_u32(char *p)
{
    uint32_t res;
    res = *(const unsigned char *)(p + 0);
    res = *(const unsigned char *)(p + 1) + (res << 8);
    res = *(const unsigned char *)(p + 2) + (res << 8);
    res = *(const unsigned char *)(p + 3) + (res << 8);
    return res;
}

static void
encrypt_0(char *input, int &len, char *key)
{
    int i, j;
    if (key[0] == 0) return;
    for (i = 0, j = 0; i < len; i++, j++) {
        if (key[j] == 0) j = 0;
        input[i] ^= key[j];
    }
}

static void
decrypt_0(char *input, int &len, char *key)
{
    encrypt_0(input, len, key);
}

static int
do_obscure(cook_ctx_t *ctx, char *data, int &len)
{
    assert(len >= 0);
    assert(len < cook_buf_len);

    int iv_len = random_between(ctx->iv_min, ctx->iv_max);
    get_fake_random_chars(data + len, iv_len);
    data[iv_len + len] = (uint8_t)iv_len;
    for (int i = 0, j = 0; i < len; i++, j++) {
        if (j == iv_len) j = 0;
        data[i] ^= data[len + j];
    }

    len = len + iv_len + 1;
    return 0;
}

static int
de_obscure(char *data, int &len)
{
    if (len < 1) return -1;
    int iv_len = int((uint8_t)data[len - 1]);

    if (len < 1 + iv_len) return -1;

    len = len - 1 - iv_len;
    for (int i = 0, j = 0; i < len; i++, j++) {
        if (j == iv_len) j = 0;
        data[i] ^= data[len + j];
    }

    return 0;
}

static int
put_crc32(cook_ctx_t *ctx, char *s, int &len)
{
    if (ctx->disable_checksum) return 0;
    assert(len >= 0);
    uint32_t crc = (uint32_t)crc32c(s, len);
    cook_write_u32(s + len, crc);
    len += (int)sizeof(uint32_t);
    return 0;
}

static int
rm_crc32(cook_ctx_t *ctx, char *s, int &len)
{
    if (ctx->disable_checksum) return 0;
    assert(len >= 0);
    len -= (int)sizeof(uint32_t);
    if (len < 0) return -1;
    uint32_t crc_in = cook_read_u32(s + len);
    uint32_t crc = (uint32_t)crc32c(s, len);
    if (crc != crc_in) return -1;
    return 0;
}

int
do_cook(cook_ctx_t *ctx, char *data, int &len)
{
    put_crc32(ctx, data, len);
    if (!ctx->disable_obscure) do_obscure(ctx, data, len);
    if (!ctx->disable_xor) encrypt_0(data, len, ctx->key);
    return 0;
}

int
de_cook(cook_ctx_t *ctx, char *data, int &len)
{
    if (!ctx->disable_xor) decrypt_0(data, len, ctx->key);
    if (!ctx->disable_obscure) {
        if (de_obscure(data, len) != 0)
            return -1;
    }
    if (rm_crc32(ctx, data, len) != 0)
        return -2;
    return 0;
}
