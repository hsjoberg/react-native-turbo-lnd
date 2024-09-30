"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maybeThrowFailedToOption = exports.failedToString = void 0;
var failedToString = exports.failedToString = "Failed to ";

/**
 * @param {boolean|undefined} check
 * @param {string} operation
 * @param {string} fieldName
 */
var maybeThrowFailedToOption = (check, operation, fieldName) => {
  if (check) {
    throw new Error(`${failedToString}${operation}: the '${fieldName}' option is unsupported.`);
  }
};
exports.maybeThrowFailedToOption = maybeThrowFailedToOption;
//# sourceMappingURL=shared.js.map