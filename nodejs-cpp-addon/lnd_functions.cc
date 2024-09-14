#include "lnd_functions.h"
#include <napi.h>
#include <iostream>
#include <string>

#include "base64.hpp"

#define LOG(x) std::cout << x << std::endl
#define ERROR(x) std::cerr << x << std::endl

// Napi::Value CallLndFunction(const Napi::CallbackInfo& info, const std::string& functionName, LndFuncPtr func) {
//     Napi::Env env = info.Env();
//     Napi::Promise::Deferred deferred = Napi::Promise::Deferred::New(env);

//     try {
//         if (info.Length() < 1 || !info[0].IsString()) {
//             deferred.Reject(Napi::Error::New(env, "Invalid arguments for " + functionName + ". Expected (string)").Value());
//             return deferred.Promise();
//         }

//         std::string dataByteArray = base64::from_base64(info[0].As<Napi::String>().Utf8Value());

//         auto tsfn = Napi::ThreadSafeFunction::New(
//             env,
//             Napi::Function::New(env, [deferred](const Napi::CallbackInfo& info) {
//                 if (info[0].IsNull()) {
//                     deferred.Resolve(info[1]);
//                 } else {
//                     deferred.Reject(info[0]);
//                 }
//             }),
//             "LND Callback",
//             0,
//             1
//         );

//         auto* callbackData = new CallbackData{tsfn};

//         CCallback callback = {
//             ResponseCallback,
//             ErrorCallback,
//             callbackData,
//             callbackData
//         };

//         func(const_cast<char*>(dataByteArray.c_str()), static_cast<int>(dataByteArray.size()), callback);
//         LOG(functionName << " called successfully");
//     } catch (const Napi::Error& e) {
//         ERROR("Napi error: " << e.what());
//         deferred.Reject(e.Value());
//     } catch (const std::exception& e) {
//         ERROR("Standard exception: " << e.what());
//         deferred.Reject(Napi::Error::New(env, e.what()).Value());
//     } catch (...) {
//         ERROR("Unknown error occurred");
//         deferred.Reject(Napi::Error::New(env, "Unknown error occurred").Value());
//     }

//     return deferred.Promise();
// }

void ResponseCallback(void* context, const char* data, int length) {
    auto* callbackData = static_cast<CallbackData*>(context);
    std::string encoded = base64::to_base64(std::string_view(data, length));

    auto callback = [encoded](Napi::Env env, Napi::Function jsCallback, CallbackData* cbData) {
        jsCallback.Call({env.Null(), Napi::String::New(env, encoded)});
        delete cbData;
    };

    callbackData->tsfn.BlockingCall(callbackData, callback);
    callbackData->tsfn.Release();
}

void ErrorCallback(void* context, const char* error) {
    auto* callbackData = static_cast<CallbackData*>(context);

    auto callback = [error](Napi::Env env, Napi::Function jsCallback, CallbackData* data) {
        jsCallback.Call({Napi::Error::New(env, error).Value(), env.Null()});
        delete data;
    };

    callbackData->tsfn.BlockingCall(callbackData, callback);
    callbackData->tsfn.Release();
}
