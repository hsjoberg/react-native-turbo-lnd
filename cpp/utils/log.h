#pragma once

#include <string>
#include <sstream>

#ifdef __ANDROID__
#include <android/log.h>
#define TURBOLND_LOG_TAG "TurboLndModule"
#elif defined(__APPLE__)
#include <os/log.h>
#endif

// Define log levels
#define TURBOLND_LOG_LEVEL_DEBUG 0
#define TURBOLND_LOG_LEVEL_INFO 1
#define TURBOLND_LOG_LEVEL_WARN 2
#define TURBOLND_LOG_LEVEL_ERROR 3

// Main logging macro
#define TURBOLND_LOG(level, ...) do { \
    std::ostringstream oss; \
    oss << __VA_ARGS__; \
    turbolnd_log_message(level, oss.str()); \
} while(0)

// Convenience macros for different log levels
#define TURBOLND_LOG_DEBUG(...) TURBOLND_LOG(TURBOLND_LOG_LEVEL_DEBUG, __VA_ARGS__)
#define TURBOLND_LOG_INFO(...)  TURBOLND_LOG(TURBOLND_LOG_LEVEL_INFO, __VA_ARGS__)
#define TURBOLND_LOG_WARN(...)  TURBOLND_LOG(TURBOLND_LOG_LEVEL_WARN, __VA_ARGS__)
#define TURBOLND_LOG_ERROR(...) TURBOLND_LOG(TURBOLND_LOG_LEVEL_ERROR, __VA_ARGS__)

// Platform-specific logging implementation
inline void turbolnd_log_message(int level, const std::string& message) {
#ifdef __ANDROID__
    android_LogPriority priority;
    switch (level) {
        case TURBOLND_LOG_LEVEL_DEBUG: priority = ANDROID_LOG_DEBUG; break;
        case TURBOLND_LOG_LEVEL_INFO:  priority = ANDROID_LOG_INFO;  break;
        case TURBOLND_LOG_LEVEL_WARN:  priority = ANDROID_LOG_WARN;  break;
        case TURBOLND_LOG_LEVEL_ERROR: priority = ANDROID_LOG_ERROR; break;
        default:                       priority = ANDROID_LOG_INFO;  break;
    }
    __android_log_write(priority, TURBOLND_LOG_TAG, message.c_str());
#elif defined(__APPLE__)
    os_log_type_t log_type;
    switch (level) {
        case TURBOLND_LOG_LEVEL_DEBUG: log_type = OS_LOG_TYPE_DEBUG; break;
        case TURBOLND_LOG_LEVEL_INFO:  log_type = OS_LOG_TYPE_INFO;  break;
        case TURBOLND_LOG_LEVEL_WARN:  log_type = OS_LOG_TYPE_DEFAULT; break;
        case TURBOLND_LOG_LEVEL_ERROR: log_type = OS_LOG_TYPE_ERROR; break;
        default:                       log_type = OS_LOG_TYPE_DEFAULT; break;
    }
    os_log_with_type(OS_LOG_DEFAULT, log_type, "%{public}s", message.c_str());
#else
    // Fallback to console logging for other platforms
    const char* level_str;
    switch (level) {
        case TURBOLND_LOG_LEVEL_DEBUG: level_str = "DEBUG"; break;
        case TURBOLND_LOG_LEVEL_INFO:  level_str = "INFO";  break;
        case TURBOLND_LOG_LEVEL_WARN:  level_str = "WARN";  break;
        case TURBOLND_LOG_LEVEL_ERROR: level_str = "ERROR"; break;
        default:                       level_str = "INFO";  break;
    }
    fprintf(stderr, "[TURBOLND_%s] %s\n", level_str, message.c_str());
#endif
}
