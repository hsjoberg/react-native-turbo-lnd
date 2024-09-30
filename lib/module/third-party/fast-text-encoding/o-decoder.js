"use strict";

import { decodeBuffer } from "./buffer.js";
import { decodeFallback } from "./lowlevel.js";
import { failedToString, maybeThrowFailedToOption } from "./shared.js";
import { hasBufferFrom } from "./support.js";
import { decodeSyncXHR } from "./xhr.js";
const trySyncXHR = !hasBufferFrom && typeof Blob === "function" && typeof URL === "function" && typeof URL.createObjectURL === "function";
const validUtfLabels = ["utf-8", "utf8", "unicode-1-1-utf-8"];
let decodeImpl = decodeFallback;
if (hasBufferFrom) {
  decodeImpl = decodeBuffer;
} else if (trySyncXHR) {
  decodeImpl = string => {
    try {
      return decodeSyncXHR(string);
    } catch (e) {
      return decodeFallback(string);
    }
  };
}
const ctorString = `construct 'TextDecoder'`;
const errorPrefix = `${failedToString} ${ctorString}: the `;
export class FastTextDecoder {
  constructor(utfLabel = "utf-8", options) {
    maybeThrowFailedToOption(options?.fatal, ctorString, "fatal");
    let ok;
    if (hasBufferFrom) {
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
    maybeThrowFailedToOption(options?.stream, "decode", "stream");
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
//# sourceMappingURL=o-decoder.js.map