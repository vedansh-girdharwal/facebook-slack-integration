exports.validateUrl = (url) => {
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  return !!regexp.test(url);
};

const isDefined = (value) => {
  return !(value === undefined || value === null);
};

/* Check if value is defined or not */
exports.isDefined = isDefined;

/* Check if value is defined or not */
exports.isNotDefined = (value) => {
  return !isDefined(value);
};

exports.isValidObject = (obj) => {
  return obj && typeof obj === "object";
};

exports.isValidJson = (obj) => {
  return obj && typeof obj === "object" && !Array.isArray(obj);
};

exports.isNonEmptyJson = (obj) => {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length > 0
  );
};

exports.isString = (str) => {
  return str && typeof str === "string";
};

exports.isNumber = (num) => {
  return isDefined(num) && typeof num === "number";
};

exports.isNonEmptyString = (str) => {
  return str && typeof str === "string" && str.trim();
};

exports.trim = (value) => {
  return value && typeof value === "string" ? value.trim() : value;
};

exports.toLowerCase = (value) => {
  return value && typeof value === "string" ? value.toLowerCase() : value;
};

exports.toUpperCase = (value) => {
  return value && typeof value === "string" ? value.toUpperCase() : value;
};

exports.isBoolean = (data) => {
  return typeof data === "boolean";
};

exports.isNonEmptyArray = (list) => {
  return list && Array.isArray(list) && list.length > 0;
};

exports.matchString = (str1, str2, case_insensitive = true, trim = true) => {
  let isMatch = false;
  try {
    if (case_insensitive) {
      str1 = str1.toLowerCase();
      str2 = str2.toLowerCase();
    }
    if (trim) {
      str1 = str1.trim();
      str2 = str2.trim();
    }
    isMatch = str1 === str2;
  } catch (e) {}
  return isMatch;
};
