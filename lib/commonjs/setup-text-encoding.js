"use strict";

var _wire = require("@bufbuild/protobuf/wire");
var _oEncoder = require("./third-party/fast-text-encoding/o-encoder.js");
var _oDecoder = require("./third-party/fast-text-encoding/o-decoder.js");
const te = new _oEncoder.FastTextEncoder();
const td = new _oDecoder.FastTextDecoder();
(0, _wire.configureTextEncoding)({
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