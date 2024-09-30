"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FastTextDecoder = void 0;
var _buffer = require("./buffer.js");
var _lowlevel = require("./lowlevel.js");
var _shared = require("./shared.js");
var _support = require("./support.js");
var _xhr = require("./xhr.js");
const trySyncXHR = !_support.hasBufferFrom && typeof Blob === "function" && typeof URL === "function" && typeof URL.createObjectURL === "function";
const validUtfLabels = ["utf-8", "utf8", "unicode-1-1-utf-8"];
let decodeImpl = _lowlevel.decodeFallback;
if (_support.hasBufferFrom) {
  decodeImpl = _buffer.decodeBuffer;
} else if (trySyncXHR) {
  decodeImpl = string => {
    try {
      return (0, _xhr.decodeSyncXHR)(string);
    } catch (e) {
      return (0, _lowlevel.decodeFallback)(string);
    }
  };
}
const ctorString = `construct 'TextDecoder'`;
const errorPrefix = `${_shared.failedToString} ${ctorString}: the `;
class FastTextDecoder {
  constructor(utfLabel = "utf-8", options) {
    (0, _shared.maybeThrowFailedToOption)(options?.fatal, ctorString, "fatal");
    let ok;
    if (_support.hasBufferFrom) {
      ok = Buffer.isEncoding(utfLabel);
    } else {
      ok = validUtfLabels.indexOf(utfLabel.toLowerCase()) !== -1;
    }
    if (!ok) {
      throw new RangeError(`${errorPrefix} encoding label provided ('${utfLabel}') is invalid.`);
    }
    this.encoding = utfLabel;
    this.fatal = false;
    this.ignoreBOM = false;
  }
  decode(buffer, options) {
    (0, _shared.maybeThrowFailedToOption)(options?.stream, "decode", "stream");
    let bytes;
    if (buffer instanceof Uint8Array) {
      bytes = buffer;
    } else if (buffer.buffer instanceof ArrayBuffer) {
      bytes = new Uint8Array(buffer.buffer);
    } else {
      bytes = new Uint8Array(buffer);
    }
    return decodeImpl(bytes, this.encoding);
  }
}
exports.FastTextDecoder = FastTextDecoder;
//# sourceMappingURL=o-decoder.js.map