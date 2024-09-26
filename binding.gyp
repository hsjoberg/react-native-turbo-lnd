{
  "variables": {
    "lnd_include_dir%": "<!(node -e \"console.log(process.env.LND_INCLUDE_DIR || require('path').resolve(__dirname, ''))\")",
    "lnd_lib_dir%": "<!(node -e \"console.log(process.env.LND_LIB_DIR || require('path').resolve(__dirname, ''))\")"
  },
  "targets": [{
    "target_name": "addon",
    "sources": [ "nodejs-cpp-addon/addon.cc", "nodejs-cpp-addon/lnd_functions.cc" ],
    "include_dirs": [
      "<!@(node -p \"require('node-addon-api').include\")",
      "<(lnd_include_dir)"
    ],
    "libraries": ["<(lnd_lib_dir)/liblnd<(STATIC_LIB_SUFFIX)"],
    "defines": ["NAPI_CPP_EXCEPTIONS"],
    "cflags!": ["-fno-exceptions"],
    "cflags_cc!": ["-fno-exceptions"],
    "xcode_settings": {
      "GCC_ENABLE_CPP_EXCEPTIONS": "YES",
      "CLANG_CXX_LIBRARY": "libc++",
      "MACOSX_DEPLOYMENT_TARGET": "10.7"
    },
    "msvs_settings": {
      "VCCLCompilerTool": {"ExceptionHandling": 1}
    }
  }]
}