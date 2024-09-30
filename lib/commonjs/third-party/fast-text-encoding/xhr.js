"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeSyncXHR = decodeSyncXHR;
/**
 * This is a horrible hack which works in some old browsers. We can tell them to decode bytes via
 * sync XHR.
 *
 * Throws if fails. Should be wrapped in something to check that.
 *
 * @param {Uint8Array} bytes
 * @return {string}
 */
function decodeSyncXHR(bytes) {
  var u;

  // This hack will fail in non-Edgium Edge because sync XHRs are disabled (and
  // possibly in other places), so ensure there's a fallback call.
  try {
    var b = new Blob([bytes], {
      type: "text/plain;charset=UTF-8"
    });
    u = URL.createObjectURL(b);
    var x = new XMLHttpRequest();
    x.open("GET", u, false);
    x.send();
    return x.responseText;
  } finally {
    if (u) {
      URL.revokeObjectURL(u);
    }
  }
}
//# sourceMappingURL=xhr.js.map