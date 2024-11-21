"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/destr";
exports.ids = ["vendor-chunks/destr"];
exports.modules = {

/***/ "(ssr)/./node_modules/destr/dist/index.mjs":
/*!*******************************************!*\
  !*** ./node_modules/destr/dist/index.mjs ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ destr),\n/* harmony export */   destr: () => (/* binding */ destr),\n/* harmony export */   safeDestr: () => (/* binding */ safeDestr)\n/* harmony export */ });\nconst suspectProtoRx = /\"(?:_|\\\\u0{2}5[Ff]){2}(?:p|\\\\u0{2}70)(?:r|\\\\u0{2}72)(?:o|\\\\u0{2}6[Ff])(?:t|\\\\u0{2}74)(?:o|\\\\u0{2}6[Ff])(?:_|\\\\u0{2}5[Ff]){2}\"\\s*:/;\nconst suspectConstructorRx = /\"(?:c|\\\\u0063)(?:o|\\\\u006[Ff])(?:n|\\\\u006[Ee])(?:s|\\\\u0073)(?:t|\\\\u0074)(?:r|\\\\u0072)(?:u|\\\\u0075)(?:c|\\\\u0063)(?:t|\\\\u0074)(?:o|\\\\u006[Ff])(?:r|\\\\u0072)\"\\s*:/;\nconst JsonSigRx = /^\\s*[\"[{]|^\\s*-?\\d{1,16}(\\.\\d{1,17})?([Ee][+-]?\\d+)?\\s*$/;\nfunction jsonParseTransform(key, value) {\n  if (key === \"__proto__\" || key === \"constructor\" && value && typeof value === \"object\" && \"prototype\" in value) {\n    warnKeyDropped(key);\n    return;\n  }\n  return value;\n}\nfunction warnKeyDropped(key) {\n  console.warn(`[destr] Dropping \"${key}\" key to prevent prototype pollution.`);\n}\nfunction destr(value, options = {}) {\n  if (typeof value !== \"string\") {\n    return value;\n  }\n  const _value = value.trim();\n  if (\n    // eslint-disable-next-line unicorn/prefer-at\n    value[0] === '\"' && value.endsWith('\"') && !value.includes(\"\\\\\")\n  ) {\n    return _value.slice(1, -1);\n  }\n  if (_value.length <= 9) {\n    const _lval = _value.toLowerCase();\n    if (_lval === \"true\") {\n      return true;\n    }\n    if (_lval === \"false\") {\n      return false;\n    }\n    if (_lval === \"undefined\") {\n      return void 0;\n    }\n    if (_lval === \"null\") {\n      return null;\n    }\n    if (_lval === \"nan\") {\n      return Number.NaN;\n    }\n    if (_lval === \"infinity\") {\n      return Number.POSITIVE_INFINITY;\n    }\n    if (_lval === \"-infinity\") {\n      return Number.NEGATIVE_INFINITY;\n    }\n  }\n  if (!JsonSigRx.test(value)) {\n    if (options.strict) {\n      throw new SyntaxError(\"[destr] Invalid JSON\");\n    }\n    return value;\n  }\n  try {\n    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {\n      if (options.strict) {\n        throw new Error(\"[destr] Possible prototype pollution\");\n      }\n      return JSON.parse(value, jsonParseTransform);\n    }\n    return JSON.parse(value);\n  } catch (error) {\n    if (options.strict) {\n      throw error;\n    }\n    return value;\n  }\n}\nfunction safeDestr(value, options = {}) {\n  return destr(value, { ...options, strict: true });\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVzdHIvZGlzdC9pbmRleC5tanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQW1DLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUU7QUFDcEo7QUFDQSwyQkFBMkIsV0FBVyxLQUFLLE1BQU0sS0FBSztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLElBQUk7QUFDeEM7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0Qyx3QkFBd0IsMEJBQTBCO0FBQ2xEOztBQUU4QyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcC8uL25vZGVfbW9kdWxlcy9kZXN0ci9kaXN0L2luZGV4Lm1qcz80OTU5Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHN1c3BlY3RQcm90b1J4ID0gL1wiKD86X3xcXFxcdTB7Mn01W0ZmXSl7Mn0oPzpwfFxcXFx1MHsyfTcwKSg/OnJ8XFxcXHUwezJ9NzIpKD86b3xcXFxcdTB7Mn02W0ZmXSkoPzp0fFxcXFx1MHsyfTc0KSg/Om98XFxcXHUwezJ9NltGZl0pKD86X3xcXFxcdTB7Mn01W0ZmXSl7Mn1cIlxccyo6LztcbmNvbnN0IHN1c3BlY3RDb25zdHJ1Y3RvclJ4ID0gL1wiKD86Y3xcXFxcdTAwNjMpKD86b3xcXFxcdTAwNltGZl0pKD86bnxcXFxcdTAwNltFZV0pKD86c3xcXFxcdTAwNzMpKD86dHxcXFxcdTAwNzQpKD86cnxcXFxcdTAwNzIpKD86dXxcXFxcdTAwNzUpKD86Y3xcXFxcdTAwNjMpKD86dHxcXFxcdTAwNzQpKD86b3xcXFxcdTAwNltGZl0pKD86cnxcXFxcdTAwNzIpXCJcXHMqOi87XG5jb25zdCBKc29uU2lnUnggPSAvXlxccypbXCJbe118XlxccyotP1xcZHsxLDE2fShcXC5cXGR7MSwxN30pPyhbRWVdWystXT9cXGQrKT9cXHMqJC87XG5mdW5jdGlvbiBqc29uUGFyc2VUcmFuc2Zvcm0oa2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5ID09PSBcIl9fcHJvdG9fX1wiIHx8IGtleSA9PT0gXCJjb25zdHJ1Y3RvclwiICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBcInByb3RvdHlwZVwiIGluIHZhbHVlKSB7XG4gICAgd2FybktleURyb3BwZWQoa2V5KTtcbiAgICByZXR1cm47XG4gIH1cbiAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gd2FybktleURyb3BwZWQoa2V5KSB7XG4gIGNvbnNvbGUud2FybihgW2Rlc3RyXSBEcm9wcGluZyBcIiR7a2V5fVwiIGtleSB0byBwcmV2ZW50IHByb3RvdHlwZSBwb2xsdXRpb24uYCk7XG59XG5mdW5jdGlvbiBkZXN0cih2YWx1ZSwgb3B0aW9ucyA9IHt9KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgY29uc3QgX3ZhbHVlID0gdmFsdWUudHJpbSgpO1xuICBpZiAoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHVuaWNvcm4vcHJlZmVyLWF0XG4gICAgdmFsdWVbMF0gPT09ICdcIicgJiYgdmFsdWUuZW5kc1dpdGgoJ1wiJykgJiYgIXZhbHVlLmluY2x1ZGVzKFwiXFxcXFwiKVxuICApIHtcbiAgICByZXR1cm4gX3ZhbHVlLnNsaWNlKDEsIC0xKTtcbiAgfVxuICBpZiAoX3ZhbHVlLmxlbmd0aCA8PSA5KSB7XG4gICAgY29uc3QgX2x2YWwgPSBfdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoX2x2YWwgPT09IFwidHJ1ZVwiKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKF9sdmFsID09PSBcImZhbHNlXCIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKF9sdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgICBpZiAoX2x2YWwgPT09IFwibnVsbFwiKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKF9sdmFsID09PSBcIm5hblwiKSB7XG4gICAgICByZXR1cm4gTnVtYmVyLk5hTjtcbiAgICB9XG4gICAgaWYgKF9sdmFsID09PSBcImluZmluaXR5XCIpIHtcbiAgICAgIHJldHVybiBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgfVxuICAgIGlmIChfbHZhbCA9PT0gXCItaW5maW5pdHlcIikge1xuICAgICAgcmV0dXJuIE51bWJlci5ORUdBVElWRV9JTkZJTklUWTtcbiAgICB9XG4gIH1cbiAgaWYgKCFKc29uU2lnUngudGVzdCh2YWx1ZSkpIHtcbiAgICBpZiAob3B0aW9ucy5zdHJpY3QpIHtcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcihcIltkZXN0cl0gSW52YWxpZCBKU09OXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoc3VzcGVjdFByb3RvUngudGVzdCh2YWx1ZSkgfHwgc3VzcGVjdENvbnN0cnVjdG9yUngudGVzdCh2YWx1ZSkpIHtcbiAgICAgIGlmIChvcHRpb25zLnN0cmljdCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbZGVzdHJdIFBvc3NpYmxlIHByb3RvdHlwZSBwb2xsdXRpb25cIik7XG4gICAgICB9XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSwganNvblBhcnNlVHJhbnNmb3JtKTtcbiAgICB9XG4gICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChvcHRpb25zLnN0cmljdCkge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxufVxuZnVuY3Rpb24gc2FmZURlc3RyKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgcmV0dXJuIGRlc3RyKHZhbHVlLCB7IC4uLm9wdGlvbnMsIHN0cmljdDogdHJ1ZSB9KTtcbn1cblxuZXhwb3J0IHsgZGVzdHIgYXMgZGVmYXVsdCwgZGVzdHIsIHNhZmVEZXN0ciB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/destr/dist/index.mjs\n");

/***/ })

};
;