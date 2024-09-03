export var failedToString = "Failed to ";

/**
 * @param {boolean|undefined} check
 * @param {string} operation
 * @param {string} fieldName
 */
export var maybeThrowFailedToOption = (
  check: boolean | undefined,
  operation: string,
  fieldName: string
) => {
  if (check) {
    throw new Error(
      `${failedToString}${operation}: the '${fieldName}' option is unsupported.`
    );
  }
};
