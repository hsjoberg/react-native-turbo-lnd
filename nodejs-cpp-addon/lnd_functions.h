#pragma once
#include <napi.h>
#include <string>

#define _CRT_USE_C_COMPLEX_H 1
#include "liblnd.h"
#undef _CRT_USE_C_COMPLEX_H

typedef void (*LndFuncPtr)(char*, int length, CCallback);

// Napi::Value CallLndFunction(const Napi::CallbackInfo& info, const std::string& functionName, LndFuncPtr func);

struct CallbackData {
    Napi::ThreadSafeFunction tsfn;
};

void ResponseCallback(void* context, const char* data, int length);
void ErrorCallback(void* context, const char* error);
