"use strict";

import { configureTextEncoding } from "@bufbuild/protobuf/wire";
import { FastTextEncoder } from "./third-party/fast-text-encoding/o-encoder.js";
import { FastTextDecoder } from "./third-party/fast-text-encoding/o-decoder.js";
const te = new FastTextEncoder();
const td = new FastTextDecoder();
configureTextEncoding({
  encodeUtf8: te.encode,
  decodeUtf8: td.decode,
  checkUtf8: text => {
    // Follows https://github.com/bufbuild/protobuf-es/blob/c307207d2b9d4370367bbed82c0384662199ae63/packages/protobuf/src/wire/text-encoding.ts#L60-L66
    try {
      encodeURIComponent(text);
      return true;
    } catch (e) {
      return false;
    }
  }
});
//# sourceMappingURL=setup-text-encoding.js.map