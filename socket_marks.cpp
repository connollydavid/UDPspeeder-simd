/*
 * socket_marks.cpp: the mark configuration, defined once. The logic lives
 * in socket_marks.h (included with SOCKET_MARKS_IMPLEMENTATION below) so
 * the bench test build links this file alone and drags no event loop.
 */
#define SOCKET_MARKS_IMPLEMENTATION
#include "socket_marks.h"

unsigned int fwmark = 0;
unsigned int filter_cookie = 0;
unsigned int dscp = 0;
