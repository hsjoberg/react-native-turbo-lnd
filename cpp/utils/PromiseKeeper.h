#pragma once

#include <mutex>
#include <map>
#include <string>

class PromiseKeeper {
public:
    static PromiseKeeper& getInstance() {
        static PromiseKeeper instance;
        return instance;
    }

    uint64_t addPromise(std::shared_ptr<facebook::react::AsyncPromise<std::string>> promise) {
        std::lock_guard<std::mutex> lock(mutex_);
        uint64_t id = nextId_++;
        promises_[id] = promise;
        return id;
    }

    void resolvePromise(uint64_t id, std::string value) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto it = promises_.find(id);
        if (it != promises_.end()) {
            it->second->resolve(std::move(value));
            promises_.erase(it);
        }
    }

    void rejectPromise(uint64_t id, std::string error) {
        std::lock_guard<std::mutex> lock(mutex_);
        auto it = promises_.find(id);
        if (it != promises_.end()) {
            it->second->reject(std::move(error));
            promises_.erase(it);
        }
    }

private:
    // NOTE: Start from 2^32 in order circumvent go runtime checks for bad
    // pointers. Setting it to an inaccessible range will cause a crash when we
    // move it over to Go as a `void*` in `CCallback`:
    // `runtime: bad pointer in frame main.getInfo at 0x14000879dd8: 0x2`
    PromiseKeeper() : nextId_(1ULL << 32) {} // Start from 2^32
    std::mutex mutex_;
    std::map<uint64_t, std::shared_ptr<facebook::react::AsyncPromise<std::string>>> promises_;
    uint64_t nextId_;
};
