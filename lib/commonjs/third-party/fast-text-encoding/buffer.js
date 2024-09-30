"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeBuffer = decodeBuffer;
exports.encodeBuffer = void 0;
/**
 * @param {Uint8Array} bytes
 * @param {string} encoding
 * @return {string}
 */
function decodeBuffer(bytes, encoding) {
  /** @type {Buffer} */
  var b;
  if (bytes instanceof Buffer) {
    // @ts-ignore
    b = bytes;
  } else {
    b = Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  }
  return b.toString(/** @type {BufferEncoding} */encoding);
}

/**
 * @param {string} string
 * @return {Uint8Array}
 */
var encodeBuffer = string => Buffer.from(string);
exports.encodeBuffer = encodeBuffer;
//# sourceMappingURL=buffer.js.map