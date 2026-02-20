#ifndef PACKET_COOK_H_
#define PACKET_COOK_H_

struct cook_ctx_t {
    char key[1000];
    int iv_min;
    int iv_max;
    int disable_checksum;
    int disable_obscure;
    int disable_xor;
};

int do_cook(cook_ctx_t *ctx, char *data, int &len);
int de_cook(cook_ctx_t *ctx, char *data, int &len);

#endif /* PACKET_COOK_H_ */
