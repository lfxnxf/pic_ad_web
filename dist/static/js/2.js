(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/js-base64/base64.mjs":
/*!*******************************************!*\
  !*** ./node_modules/js-base64/base64.mjs ***!
  \*******************************************/
/*! exports provided: version, VERSION, atob, atobPolyfill, btoa, btoaPolyfill, fromBase64, toBase64, utob, encode, encodeURI, encodeURL, btou, decode, isValid, fromUint8Array, toUint8Array, extendString, extendUint8Array, extendBuiltins, Base64 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"version\", function() { return version; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"VERSION\", function() { return VERSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"atob\", function() { return _atob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"atobPolyfill\", function() { return atobPolyfill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"btoa\", function() { return _btoa; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"btoaPolyfill\", function() { return btoaPolyfill; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fromBase64\", function() { return decode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toBase64\", function() { return encode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"utob\", function() { return utob; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encode\", function() { return encode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeURI\", function() { return encodeURI; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"encodeURL\", function() { return encodeURI; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"btou\", function() { return btou; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"decode\", function() { return decode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"isValid\", function() { return isValid; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fromUint8Array\", function() { return fromUint8Array; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toUint8Array\", function() { return toUint8Array; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extendString\", function() { return extendString; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extendUint8Array\", function() { return extendUint8Array; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"extendBuiltins\", function() { return extendBuiltins; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Base64\", function() { return gBase64; });\n/**\n *  base64.ts\n *\n *  Licensed under the BSD 3-Clause License.\n *    http://opensource.org/licenses/BSD-3-Clause\n *\n *  References:\n *    http://en.wikipedia.org/wiki/Base64\n *\n * @author Dan Kogai (https://github.com/dankogai)\n */\nconst version = '3.6.1';\n/**\n * @deprecated use lowercase `version`.\n */\nconst VERSION = version;\nconst _hasatob = typeof atob === 'function';\nconst _hasbtoa = typeof btoa === 'function';\nconst _hasBuffer = typeof Buffer === 'function';\nconst _TD = typeof TextDecoder === 'function' ? new TextDecoder() : undefined;\nconst _TE = typeof TextEncoder === 'function' ? new TextEncoder() : undefined;\nconst b64ch = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\nconst b64chs = [...b64ch];\nconst b64tab = ((a) => {\n    let tab = {};\n    a.forEach((c, i) => tab[c] = i);\n    return tab;\n})(b64chs);\nconst b64re = /^(?:[A-Za-z\\d+\\/]{4})*?(?:[A-Za-z\\d+\\/]{2}(?:==)?|[A-Za-z\\d+\\/]{3}=?)?$/;\nconst _fromCC = String.fromCharCode.bind(String);\nconst _U8Afrom = typeof Uint8Array.from === 'function'\n    ? Uint8Array.from.bind(Uint8Array)\n    : (it, fn = (x) => x) => new Uint8Array(Array.prototype.slice.call(it, 0).map(fn));\nconst _mkUriSafe = (src) => src\n    .replace(/[+\\/]/g, (m0) => m0 == '+' ? '-' : '_')\n    .replace(/=+$/m, '');\nconst _tidyB64 = (s) => s.replace(/[^A-Za-z0-9\\+\\/]/g, '');\n/**\n * polyfill version of `btoa`\n */\nconst btoaPolyfill = (bin) => {\n    // console.log('polyfilled');\n    let u32, c0, c1, c2, asc = '';\n    const pad = bin.length % 3;\n    for (let i = 0; i < bin.length;) {\n        if ((c0 = bin.charCodeAt(i++)) > 255 ||\n            (c1 = bin.charCodeAt(i++)) > 255 ||\n            (c2 = bin.charCodeAt(i++)) > 255)\n            throw new TypeError('invalid character found');\n        u32 = (c0 << 16) | (c1 << 8) | c2;\n        asc += b64chs[u32 >> 18 & 63]\n            + b64chs[u32 >> 12 & 63]\n            + b64chs[u32 >> 6 & 63]\n            + b64chs[u32 & 63];\n    }\n    return pad ? asc.slice(0, pad - 3) + \"===\".substring(pad) : asc;\n};\n/**\n * does what `window.btoa` of web browsers do.\n * @param {String} bin binary string\n * @returns {string} Base64-encoded string\n */\nconst _btoa = _hasbtoa ? (bin) => btoa(bin)\n    : _hasBuffer ? (bin) => Buffer.from(bin, 'binary').toString('base64')\n        : btoaPolyfill;\nconst _fromUint8Array = _hasBuffer\n    ? (u8a) => Buffer.from(u8a).toString('base64')\n    : (u8a) => {\n        // cf. https://stackoverflow.com/questions/12710001/how-to-convert-uint8-array-to-base64-encoded-string/12713326#12713326\n        const maxargs = 0x1000;\n        let strs = [];\n        for (let i = 0, l = u8a.length; i < l; i += maxargs) {\n            strs.push(_fromCC.apply(null, u8a.subarray(i, i + maxargs)));\n        }\n        return _btoa(strs.join(''));\n    };\n/**\n * converts a Uint8Array to a Base64 string.\n * @param {boolean} [urlsafe] URL-and-filename-safe a la RFC4648 §5\n * @returns {string} Base64 string\n */\nconst fromUint8Array = (u8a, urlsafe = false) => urlsafe ? _mkUriSafe(_fromUint8Array(u8a)) : _fromUint8Array(u8a);\n// This trick is found broken https://github.com/dankogai/js-base64/issues/130\n// const utob = (src: string) => unescape(encodeURIComponent(src));\n// reverting good old fationed regexp\nconst cb_utob = (c) => {\n    if (c.length < 2) {\n        var cc = c.charCodeAt(0);\n        return cc < 0x80 ? c\n            : cc < 0x800 ? (_fromCC(0xc0 | (cc >>> 6))\n                + _fromCC(0x80 | (cc & 0x3f)))\n                : (_fromCC(0xe0 | ((cc >>> 12) & 0x0f))\n                    + _fromCC(0x80 | ((cc >>> 6) & 0x3f))\n                    + _fromCC(0x80 | (cc & 0x3f)));\n    }\n    else {\n        var cc = 0x10000\n            + (c.charCodeAt(0) - 0xD800) * 0x400\n            + (c.charCodeAt(1) - 0xDC00);\n        return (_fromCC(0xf0 | ((cc >>> 18) & 0x07))\n            + _fromCC(0x80 | ((cc >>> 12) & 0x3f))\n            + _fromCC(0x80 | ((cc >>> 6) & 0x3f))\n            + _fromCC(0x80 | (cc & 0x3f)));\n    }\n};\nconst re_utob = /[\\uD800-\\uDBFF][\\uDC00-\\uDFFFF]|[^\\x00-\\x7F]/g;\n/**\n * @deprecated should have been internal use only.\n * @param {string} src UTF-8 string\n * @returns {string} UTF-16 string\n */\nconst utob = (u) => u.replace(re_utob, cb_utob);\n//\nconst _encode = _hasBuffer\n    ? (s) => Buffer.from(s, 'utf8').toString('base64')\n    : _TE\n        ? (s) => _fromUint8Array(_TE.encode(s))\n        : (s) => _btoa(utob(s));\n/**\n * converts a UTF-8-encoded string to a Base64 string.\n * @param {boolean} [urlsafe] if `true` make the result URL-safe\n * @returns {string} Base64 string\n */\nconst encode = (src, urlsafe = false) => urlsafe\n    ? _mkUriSafe(_encode(src))\n    : _encode(src);\n/**\n * converts a UTF-8-encoded string to URL-safe Base64 RFC4648 §5.\n * @returns {string} Base64 string\n */\nconst encodeURI = (src) => encode(src, true);\n// This trick is found broken https://github.com/dankogai/js-base64/issues/130\n// const btou = (src: string) => decodeURIComponent(escape(src));\n// reverting good old fationed regexp\nconst re_btou = /[\\xC0-\\xDF][\\x80-\\xBF]|[\\xE0-\\xEF][\\x80-\\xBF]{2}|[\\xF0-\\xF7][\\x80-\\xBF]{3}/g;\nconst cb_btou = (cccc) => {\n    switch (cccc.length) {\n        case 4:\n            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)\n                | ((0x3f & cccc.charCodeAt(1)) << 12)\n                | ((0x3f & cccc.charCodeAt(2)) << 6)\n                | (0x3f & cccc.charCodeAt(3)), offset = cp - 0x10000;\n            return (_fromCC((offset >>> 10) + 0xD800)\n                + _fromCC((offset & 0x3FF) + 0xDC00));\n        case 3:\n            return _fromCC(((0x0f & cccc.charCodeAt(0)) << 12)\n                | ((0x3f & cccc.charCodeAt(1)) << 6)\n                | (0x3f & cccc.charCodeAt(2)));\n        default:\n            return _fromCC(((0x1f & cccc.charCodeAt(0)) << 6)\n                | (0x3f & cccc.charCodeAt(1)));\n    }\n};\n/**\n * @deprecated should have been internal use only.\n * @param {string} src UTF-16 string\n * @returns {string} UTF-8 string\n */\nconst btou = (b) => b.replace(re_btou, cb_btou);\n/**\n * polyfill version of `atob`\n */\nconst atobPolyfill = (asc) => {\n    // console.log('polyfilled');\n    asc = asc.replace(/\\s+/g, '');\n    if (!b64re.test(asc))\n        throw new TypeError('malformed base64.');\n    asc += '=='.slice(2 - (asc.length & 3));\n    let u24, bin = '', r1, r2;\n    for (let i = 0; i < asc.length;) {\n        u24 = b64tab[asc.charAt(i++)] << 18\n            | b64tab[asc.charAt(i++)] << 12\n            | (r1 = b64tab[asc.charAt(i++)]) << 6\n            | (r2 = b64tab[asc.charAt(i++)]);\n        bin += r1 === 64 ? _fromCC(u24 >> 16 & 255)\n            : r2 === 64 ? _fromCC(u24 >> 16 & 255, u24 >> 8 & 255)\n                : _fromCC(u24 >> 16 & 255, u24 >> 8 & 255, u24 & 255);\n    }\n    return bin;\n};\n/**\n * does what `window.atob` of web browsers do.\n * @param {String} asc Base64-encoded string\n * @returns {string} binary string\n */\nconst _atob = _hasatob ? (asc) => atob(_tidyB64(asc))\n    : _hasBuffer ? (asc) => Buffer.from(asc, 'base64').toString('binary')\n        : atobPolyfill;\n//\nconst _toUint8Array = _hasBuffer\n    ? (a) => _U8Afrom(Buffer.from(a, 'base64'))\n    : (a) => _U8Afrom(_atob(a), c => c.charCodeAt(0));\n/**\n * converts a Base64 string to a Uint8Array.\n */\nconst toUint8Array = (a) => _toUint8Array(_unURI(a));\n//\nconst _decode = _hasBuffer\n    ? (a) => Buffer.from(a, 'base64').toString('utf8')\n    : _TD\n        ? (a) => _TD.decode(_toUint8Array(a))\n        : (a) => btou(_atob(a));\nconst _unURI = (a) => _tidyB64(a.replace(/[-_]/g, (m0) => m0 == '-' ? '+' : '/'));\n/**\n * converts a Base64 string to a UTF-8 string.\n * @param {String} src Base64 string.  Both normal and URL-safe are supported\n * @returns {string} UTF-8 string\n */\nconst decode = (src) => _decode(_unURI(src));\n/**\n * check if a value is a valid Base64 string\n * @param {String} src a value to check\n  */\nconst isValid = (src) => {\n    if (typeof src !== 'string')\n        return false;\n    const s = src.replace(/\\s+/g, '').replace(/=+$/, '');\n    return !/[^\\s0-9a-zA-Z\\+/]/.test(s) || !/[^\\s0-9a-zA-Z\\-_]/.test(s);\n};\n//\nconst _noEnum = (v) => {\n    return {\n        value: v, enumerable: false, writable: true, configurable: true\n    };\n};\n/**\n * extend String.prototype with relevant methods\n */\nconst extendString = function () {\n    const _add = (name, body) => Object.defineProperty(String.prototype, name, _noEnum(body));\n    _add('fromBase64', function () { return decode(this); });\n    _add('toBase64', function (urlsafe) { return encode(this, urlsafe); });\n    _add('toBase64URI', function () { return encode(this, true); });\n    _add('toBase64URL', function () { return encode(this, true); });\n    _add('toUint8Array', function () { return toUint8Array(this); });\n};\n/**\n * extend Uint8Array.prototype with relevant methods\n */\nconst extendUint8Array = function () {\n    const _add = (name, body) => Object.defineProperty(Uint8Array.prototype, name, _noEnum(body));\n    _add('toBase64', function (urlsafe) { return fromUint8Array(this, urlsafe); });\n    _add('toBase64URI', function () { return fromUint8Array(this, true); });\n    _add('toBase64URL', function () { return fromUint8Array(this, true); });\n};\n/**\n * extend Builtin prototypes with relevant methods\n */\nconst extendBuiltins = () => {\n    extendString();\n    extendUint8Array();\n};\nconst gBase64 = {\n    version: version,\n    VERSION: VERSION,\n    atob: _atob,\n    atobPolyfill: atobPolyfill,\n    btoa: _btoa,\n    btoaPolyfill: btoaPolyfill,\n    fromBase64: decode,\n    toBase64: encode,\n    encode: encode,\n    encodeURI: encodeURI,\n    encodeURL: encodeURI,\n    utob: utob,\n    btou: btou,\n    decode: decode,\n    isValid: isValid,\n    fromUint8Array: fromUint8Array,\n    toUint8Array: toUint8Array,\n    extendString: extendString,\n    extendUint8Array: extendUint8Array,\n    extendBuiltins: extendBuiltins,\n};\n// makecjs:CUT //\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// and finally,\n\n\n\n//# sourceURL=webpack:///./node_modules/js-base64/base64.mjs?");

/***/ })

}]);