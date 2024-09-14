#pragma once
#include <napi.h>
#include <string>

#include "liblnd.h"

typedef void (*LndFuncPtr)(char*, int length, CCallback);

// Napi::Value CallLndFunction(const Napi::CallbackInfo& info, const std::string& functionName, LndFuncPtr func);

struct CallbackData {
    Napi::ThreadSafeFunction tsfn;
};

void ResponseCallback(void* context, const char* data, int length);
void ErrorCallback(void* context, const char* error);
