#include <napi.h>
#include <iostream>
#include <string>

#define _CRT_USE_C_COMPLEX_H 1
#include "liblnd.h"
#undef _CRT_USE_C_COMPLEX_H

#include "lnd_functions.h"
// #include "lnd_server_streams.h"

#define LOG(x) std::cout << x << std::endl
#define ERROR(x) std::cerr << x << std::endl

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    LOG("Initializing addon");

    exports.Set("start", Napi::Function::New(env, [](const Napi::CallbackInfo& info) {
        Napi::Env env = info.Env();
        Napi::Promise::Deferred deferred = Napi::Promise::Deferred::New(env);
        std::string args;

        if (info.Length() > 0 && info[0].IsString()) {
            args = info[0].As<Napi::String>().Utf8Value();
        } else {
            deferred.Reject(Napi::Error::New(env, "Invalid argument type for start").Value());
            return deferred.Promise();
        }

        auto tsfn = Napi::ThreadSafeFunction::New(
            env,
            Napi::Function::New(env, [deferred](const Napi::CallbackInfo& info) {
                if (info[0].IsNull()) {
                    deferred.Resolve(info[1]);
                } else {
                    deferred.Reject(info[0]);
                }
            }),
            "LND Callback",
            0,
            1
        );

        auto* callbackData = new CallbackData{tsfn};

        CCallback callback = {
            ResponseCallback,
            ErrorCallback,
            callbackData,
            callbackData
        };

        // Direct call to the statically linked LND start function
        start(const_cast<char*>(args.c_str()), callback);

        return deferred.Promise();
    }, "start"));

    // Other functions would be implemented similarly...

    LOG("Addon initialized successfully");
    return exports;
}

NODE_API_MODULE(addon, Init)
