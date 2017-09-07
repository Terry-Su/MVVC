/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(15).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(24).SourceMapConsumer;
exports.SourceNode = __webpack_require__(25).SourceNode;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var SourceNode = __webpack_require__(0).SourceNode;
var SourceMapConsumer = __webpack_require__(0).SourceMapConsumer;

class Source {

	source() {
		throw new Error("Abstract");
	}

	size() {
		return this.source().length;
	}

	map(options) {
		return null;
	}

	sourceAndMap(options) {
		return {
			source: this.source(),
			map: this.map()
		};
	}

	node() {
		throw new Error("Abstract");
	}

	listNode() {
		throw new Error("Abstract");
	}

	updateHash(hash) {
		var source = this.source();
		hash.update(source || "");
	}
}

module.exports = Source;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports.SourceListMap = __webpack_require__(12);
exports.SourceNode = __webpack_require__(6);
exports.SingleLineNode = __webpack_require__(11);
exports.CodeNode = __webpack_require__(7);
exports.MappingsContext = __webpack_require__(10);
exports.fromStringWithSourceMap = __webpack_require__(19);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


exports.getNumberOfLines = function getNumberOfLines(str) {
	let nr = -1;
	let idx = -1;
	do {
		nr++
		idx = str.indexOf("\n", idx + 1);
	} while(idx >= 0);
	return nr;
};

exports.getUnfinishedLine = function getUnfinishedLine(str) {
	const idx = str.lastIndexOf("\n");
	if(idx === -1)
		return str.length;
	else
		return str.length - idx - 1;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


module.exports = function mixinSourceAndMap(proto) {
	proto.map = function(options) {
		options = options || {};
		if(options.columns === false) {
			return this.listMap(options).toStringWithSourceMap({
				file: "x"
			}).map;
		}

		return this.node(options).toStringWithSourceMap({
			file: "x"
		}).map.toJSON();
	};

	proto.sourceAndMap = function(options) {
		options = options || {};
		if(options.columns === false) {
			//console.log(this.listMap(options).debugInfo());
			return this.listMap(options).toStringWithSourceMap({
				file: "x"
			});
		}

		var res = this.node(options).toStringWithSourceMap({
			file: "x"
		});
		return {
			source: res.code,
			map: res.map.toJSON()
		};
	};
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const base64VLQ = __webpack_require__(8);
const getNumberOfLines = __webpack_require__(3).getNumberOfLines;
const getUnfinishedLine = __webpack_require__(3).getUnfinishedLine;

const LINE_MAPPING = ";AACA";

class SourceNode {

	constructor(generatedCode, source, originalSource, startingLine) {
		this.generatedCode = generatedCode;
		this.originalSource = originalSource;
		this.source = source;
		this.startingLine = startingLine || 1;
		this._numberOfLines = getNumberOfLines(this.generatedCode);
		this._endsWithNewLine = generatedCode[generatedCode.length - 1] === "\n";
	}

	clone() {
		return new SourceNode(this.generatedCode, this.source, this.originalSource, this.startingLine);
	}

	getGeneratedCode() {
		return this.generatedCode;
	}

	addGeneratedCode(code) {
		this.generatedCode += code;
		this._numberOfLines += getNumberOfLines(code);
		this._endsWithNewLine = code[code.length - 1] === "\n";
	}

	getMappings(mappingsContext) {
		if(!this.generatedCode)
			return "";
		const lines = this._numberOfLines;
		const sourceIdx = mappingsContext.ensureSource(this.source, this.originalSource);
		let mappings = "A"; // generated column 0
		if(mappingsContext.unfinishedGeneratedLine)
			mappings = "," + base64VLQ.encode(mappingsContext.unfinishedGeneratedLine);
		mappings += base64VLQ.encode(sourceIdx - mappingsContext.currentSource); // source index
		mappings += base64VLQ.encode(this.startingLine - mappingsContext.currentOriginalLine); // original line index
		mappings += "A"; // original column 0
		mappingsContext.currentSource = sourceIdx;
		mappingsContext.currentOriginalLine = this.startingLine + lines - 1;
		const unfinishedGeneratedLine = mappingsContext.unfinishedGeneratedLine = getUnfinishedLine(this.generatedCode)
		mappings += Array(lines).join(LINE_MAPPING);
		if(unfinishedGeneratedLine === 0) {
			mappings += ";";
		} else {
			if(lines !== 0) {
				mappings += LINE_MAPPING;
			}
			mappingsContext.currentOriginalLine++;
		}
		return mappings;
	}

	mapGeneratedCode(fn) {
		throw new Error("Cannot map generated code on a SourceMap. Normalize to SingleLineNode first.");
	}

	getNormalizedNodes() {
		var results = [];
		var currentLine = this.startingLine;
		var generatedCode = this.generatedCode;
		var index = 0;
		var indexEnd = generatedCode.length;
		while(index < indexEnd) {
			// get one generated line
			var nextLine = generatedCode.indexOf("\n", index) + 1;
			if(nextLine === 0) nextLine = indexEnd;
			var lineGenerated = generatedCode.substr(index, nextLine - index);

			results.push(new SingleLineNode(lineGenerated, this.source, this.originalSource, currentLine));

			// move cursors
			index = nextLine;
			currentLine++;
		}
		return results;
	}

	merge(otherNode) {
		if(otherNode instanceof SourceNode) {
			return this.mergeSourceNode(otherNode);
		} else if(otherNode instanceof SingleLineNode) {
			return this.mergeSingleLineNode(otherNode);
		}
		return false;
	}

	mergeSourceNode(otherNode) {
		if(this.source === otherNode.source &&
			this._endsWithNewLine &&
			this.startingLine + this._numberOfLines === otherNode.startingLine) {
			this.generatedCode += otherNode.generatedCode;
			this._numberOfLines += otherNode._numberOfLines;
			this._endsWithNewLine = otherNode._endsWithNewLine;
			return this;
		}
		return false;
	}

	mergeSingleLineNode(otherNode) {
		if(this.source === otherNode.source &&
			this._endsWithNewLine &&
			this.startingLine + this._numberOfLines === otherNode.line &&
			otherNode._numberOfLines <= 1) {
			this.addSingleLineNode(otherNode);
			return this;
		}
		return false;
	}

	addSingleLineNode(otherNode) {
		this.generatedCode += otherNode.generatedCode;
		this._numberOfLines += otherNode._numberOfLines
		this._endsWithNewLine = otherNode._endsWithNewLine;
	}
}

module.exports = SourceNode;
const SingleLineNode = __webpack_require__(11); // circular dependency


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const getNumberOfLines = __webpack_require__(3).getNumberOfLines;
const getUnfinishedLine = __webpack_require__(3).getUnfinishedLine;

class CodeNode {
	constructor(generatedCode) {
		this.generatedCode = generatedCode;
	}

	clone() {
		return new CodeNode(this.generatedCode);
	}

	getGeneratedCode() {
		return this.generatedCode;
	}

	getMappings(mappingsContext) {
		const lines = getNumberOfLines(this.generatedCode);
		const mapping = Array(lines+1).join(";");
		if(lines > 0) {
			mappingsContext.unfinishedGeneratedLine = getUnfinishedLine(this.generatedCode);
			if(mappingsContext.unfinishedGeneratedLine > 0) {
				return mapping + "A";
			} else {
				return mapping;
			}
		} else {
			const prevUnfinished = mappingsContext.unfinishedGeneratedLine;
			mappingsContext.unfinishedGeneratedLine += getUnfinishedLine(this.generatedCode);
			if(prevUnfinished === 0 && mappingsContext.unfinishedGeneratedLine > 0) {
				return "A";
			} else {
				return "";
			}
		}
	}

	addGeneratedCode(generatedCode) {
		this.generatedCode += generatedCode;
	}

	mapGeneratedCode(fn) {
		const generatedCode = fn(this.generatedCode);
		return new CodeNode(generatedCode);
	}

	getNormalizedNodes() {
		return [this];
	}

	merge(otherNode) {
		if(otherNode instanceof CodeNode) {
			this.generatedCode += otherNode.generatedCode;
			return this;
		}
		return false;
	}
}

module.exports = CodeNode;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/*eslint no-bitwise:0,quotes:0,global-strict:0*/

var charToIntMap = {};
var intToCharMap = {};

'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  .split('')
  .forEach(function (ch, index) {
    charToIntMap[ch] = index;
    intToCharMap[index] = ch;
  });

var base64 = {};
/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
base64.encode = function base64_encode(aNumber) {
  if (aNumber in intToCharMap) {
    return intToCharMap[aNumber];
  }
  throw new TypeError("Must be between 0 and 63: " + aNumber);
};

/**
 * Decode a single base 64 digit to an integer.
 */
base64.decode = function base64_decode(aChar) {
  if (aChar in charToIntMap) {
    return charToIntMap[aChar];
  }
  throw new TypeError("Not a valid base 64 digit: " + aChar);
};



// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aOutParam) {
  var i = 0;
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (i >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }
    digit = base64.decode(aStr.charAt(i++));
    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aStr.slice(i);
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
exports.Source = __webpack_require__(1);

exports.RawSource = __webpack_require__(35);
exports.OriginalSource = __webpack_require__(33);
exports.SourceMapSource = __webpack_require__(37);
exports.LineToLineMappedSource = __webpack_require__(32);

exports.CachedSource = __webpack_require__(30);
exports.ConcatSource = __webpack_require__(31);
exports.ReplaceSource = __webpack_require__(36);
exports.PrefixSource = __webpack_require__(34);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


class MappingsContext {
	constructor() {
		this.sourcesIndices = new Map();
		this.sourcesContent = new Map();
		this.hasSourceContent = false;
		this.currentOriginalLine = 1;
		this.currentSource = 0;
		this.unfinishedGeneratedLine = false;
	}

	ensureSource(source, originalSource) {
		let idx = this.sourcesIndices.get(source);
		if(typeof idx === "number") {
			return idx;
		}
		idx = this.sourcesIndices.size;
		this.sourcesIndices.set(source, idx);
		this.sourcesContent.set(source, originalSource)
		if(typeof originalSource === "string")
			this.hasSourceContent = true;
		return idx;
	}

	getArrays() {
		const sources = [];
		const sourcesContent = [];

		for(const pair of this.sourcesContent) {
			sources.push(pair[0]);
			sourcesContent.push(pair[1]);
		}

		return {
			sources,
			sourcesContent
		};
	}
}
module.exports = MappingsContext;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const base64VLQ = __webpack_require__(8);
const getNumberOfLines = __webpack_require__(3).getNumberOfLines;
const getUnfinishedLine = __webpack_require__(3).getUnfinishedLine;

const LINE_MAPPING = ";AAAA";

class SingleLineNode {

	constructor(generatedCode, source, originalSource, line) {
		this.generatedCode = generatedCode;
		this.originalSource = originalSource;
		this.source = source;
		this.line = line || 1;
		this._numberOfLines = getNumberOfLines(this.generatedCode);
		this._endsWithNewLine = generatedCode[generatedCode.length - 1] === "\n";
	}

	clone() {
		return new SingleLineNode(this.generatedCode, this.source, this.originalSource, this.line);
	}

	getGeneratedCode() {
		return this.generatedCode;
	}

	getMappings(mappingsContext) {
		if(!this.generatedCode)
			return "";
		const lines = this._numberOfLines;
		const sourceIdx = mappingsContext.ensureSource(this.source, this.originalSource);
		let mappings = "A"; // generated column 0
		if(mappingsContext.unfinishedGeneratedLine)
			mappings = "," + base64VLQ.encode(mappingsContext.unfinishedGeneratedLine);
		mappings += base64VLQ.encode(sourceIdx - mappingsContext.currentSource); // source index
		mappings += base64VLQ.encode(this.line - mappingsContext.currentOriginalLine); // original line index
		mappings += "A"; // original column 0
		mappingsContext.currentSource = sourceIdx;
		mappingsContext.currentOriginalLine = this.line;
		const unfinishedGeneratedLine = mappingsContext.unfinishedGeneratedLine = getUnfinishedLine(this.generatedCode)
		mappings += Array(lines).join(LINE_MAPPING);
		if(unfinishedGeneratedLine === 0) {
			mappings += ";";
		} else {
			if(lines !== 0)
				mappings += LINE_MAPPING;
		}
		return mappings;
	}

	getNormalizedNodes() {
		return [this];
	}

	mapGeneratedCode(fn) {
		const generatedCode = fn(this.generatedCode);
		return new SingleLineNode(generatedCode, this.source, this.originalSource, this.line);
	}

	merge(otherNode) {
		if(otherNode instanceof SingleLineNode) {
			return this.mergeSingleLineNode(otherNode);
		}
		return false;
	}

	mergeSingleLineNode(otherNode) {
		if(this.source === otherNode.source &&
			this.originalSource === otherNode.originalSource) {
			if(this.line === otherNode.line) {
				this.generatedCode += otherNode.generatedCode;
				this._numberOfLines += otherNode._numberOfLines;
				this._endsWithNewLine = otherNode._endsWithNewLine;
				return this;
			} else if(this.line + 1 === otherNode.line && 
				this._endsWithNewLine &&
				this._numberOfLines === 1 && 
				otherNode._numberOfLines <= 1) {
				return new SourceNode(this.generatedCode + otherNode.generatedCode, this.source, this.originalSource, this.line);
			}
		}
		return false;
	}
}

module.exports = SingleLineNode;

const SourceNode = __webpack_require__(6); // circular dependency


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const CodeNode = __webpack_require__(7);
const SourceNode = __webpack_require__(6);
const MappingsContext = __webpack_require__(10);
const getNumberOfLines = __webpack_require__(3).getNumberOfLines;

class SourceListMap {

	constructor(generatedCode, source, originalSource) {
		if(Array.isArray(generatedCode)) {
			this.children = generatedCode;
		} else {
			this.children = [];
			if(generatedCode || source)
				this.add(generatedCode, source, originalSource);
		}
	}

	add(generatedCode, source, originalSource) {
		if(typeof generatedCode === "string") {
			if(source) {
				this.children.push(new SourceNode(generatedCode, source, originalSource));
			} else if(this.children.length > 0 && this.children[this.children.length - 1] instanceof CodeNode) {
				this.children[this.children.length - 1].addGeneratedCode(generatedCode);
			} else {
				this.children.push(new CodeNode(generatedCode));
			}
		} else if(generatedCode.getMappings && generatedCode.getGeneratedCode) {
			this.children.push(generatedCode);
		} else if(generatedCode.children) {
			generatedCode.children.forEach(function(sln) {
				this.children.push(sln);
			}, this);
		} else {
			throw new Error("Invalid arguments to SourceListMap.protfotype.add: Expected string, Node or SourceListMap");
		}
	};

	preprend(generatedCode, source, originalSource) {
		if(typeof generatedCode === "string") {
			if(source) {
				this.children.unshift(new SourceNode(generatedCode, source, originalSource));
			} else if(this.children.length > 0 && this.children[this.children.length - 1].preprendGeneratedCode) {
				this.children[this.children.length - 1].preprendGeneratedCode(generatedCode);
			} else {
				this.children.unshift(new CodeNode(generatedCode));
			}
		} else if(generatedCode.getMappings && generatedCode.getGeneratedCode) {
			this.children.unshift(generatedCode);
		} else if(generatedCode.children) {
			generatedCode.children.slice().reverse().forEach(function(sln) {
				this.children.unshift(sln);
			}, this);
		} else {
			throw new Error("Invalid arguments to SourceListMap.protfotype.prerend: Expected string, Node or SourceListMap");
		}
	};

	mapGeneratedCode(fn) {
		const normalizedNodes = [];
		this.children.forEach(function(sln) {
			sln.getNormalizedNodes().forEach(function(newNode) {
				normalizedNodes.push(newNode);
			});
		});
		const optimizedNodes = [];
		normalizedNodes.forEach(function(sln) {
			sln = sln.mapGeneratedCode(fn);
			if(optimizedNodes.length === 0) {
				optimizedNodes.push(sln);
			} else {
				const last = optimizedNodes[optimizedNodes.length - 1];
				const mergedNode = last.merge(sln);
				if(mergedNode) {
					optimizedNodes[optimizedNodes.length - 1] = mergedNode;
				} else {
					optimizedNodes.push(sln);
				}
			}
		});
		return new SourceListMap(optimizedNodes);
	};

	toString() {
		return this.children.map(function(sln) {
			return sln.getGeneratedCode();
		}).join("");
	};

	toStringWithSourceMap(options) {
		const mappingsContext = new MappingsContext();
		const source = this.children.map(function(sln) {
			return sln.getGeneratedCode();
		}).join("");
		const mappings = this.children.map(function(sln) {
			return sln.getMappings(mappingsContext);
		}).join("");
		const arrays = mappingsContext.getArrays();
		return {
			source: source,
			map: {
				version: 3,
				file: options && options.file,
				sources: arrays.sources,
				sourcesContent: mappingsContext.hasSourceContent ? arrays.sourcesContent : undefined,
				mappings: mappings
			}
		};
	}
}

module.exports = SourceListMap;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(5);
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(20);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(14);
var util = __webpack_require__(5);
var ArraySet = __webpack_require__(13).ArraySet;
var MappingList = __webpack_require__(22).MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _indexNode = __webpack_require__(18);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = exports.Controller = function (_SuperController) {
  _inherits(Controller, _SuperController);

  function Controller() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Controller);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.webpackBasicConfig = _extends({}, new _indexNode.Controller().webpackBasicConfig, {
      module: {
        rules: [{
          "test": /\.js.*/,
          "exclude": /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-2', 'react']
            }
          }]
        }]
      }
    }), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Controller;
}(_indexNode.Controller);

exports.default = new Controller();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UglifyJSPlugin = __webpack_require__(29);

var Controller = exports.Controller = function () {
  function Controller() {
    var _this = this;

    _classCallCheck(this, Controller);

    this.title = null;
    this.link = null;
    this.body = '<div id="app"></div>';
    this.script = '<script src=\'./bundle.js\'></script>';

    this.getHtml = function () {
      return '<!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <meta charset="UTF-8">\n      <meta name="viewport" content="width=device-width, initial-scale=1.0">\n      <meta http-equiv="X-UA-Compatible" content="ie=edge">\n      ' + (_this.link || '') + '\n      <title>' + (_this.title || '') + '</title>\n    </head>\n    <body>\n      ' + (_this.body || '') + '\n      ' + (_this.script || '') + '\n    </body>\n    </html>';
    };

    this.webpackBasicConfig = {
      devtool: 'source-map',
      plugins: process.env.production ? [new UglifyJSPlugin()] : []
    };
  }

  _createClass(Controller, [{
    key: 'getPageName',
    value: function getPageName(pageDirname) {
      var paths = pageDirname.split('/');
      return paths[paths.length - 2];
    }
  }]);

  return Controller;
}();

exports.default = new Controller();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const base64VLQ = __webpack_require__(8);
const SourceNode = __webpack_require__(6);
const CodeNode = __webpack_require__(7);
const SourceListMap = __webpack_require__(12);

module.exports = function fromStringWithSourceMap(code, map) {
	const sources = map.sources;
	const sourcesContent = map.sourcesContent;
	const mappings = map.mappings.split(";");
	const lines = code.split("\n");
	const nodes = [];
	let currentNode = null;
	let currentLine = 1;
	let currentSourceIdx = 0;
	let currentSourceNodeLine;
	mappings.forEach(function(mapping, idx) {
		let line = lines[idx];
		if(typeof line === 'undefined') return;
		if(idx !== lines.length - 1) line += "\n";
		if(!mapping)
			return addCode(line);
		mapping = { value: 0, rest: mapping };
		let lineAdded = false;
		while(mapping.rest)
			lineAdded = processMapping(mapping, line, lineAdded) || lineAdded;
		if(!lineAdded)
			addCode(line);
	});
	if(mappings.length < lines.length) {
		let idx = mappings.length;
		while(!lines[idx].trim() && idx < lines.length-1) {
			addCode(lines[idx] + "\n");
			idx++;
		}
		addCode(lines.slice(idx).join("\n"));
	}
	return new SourceListMap(nodes);
	function processMapping(mapping, line, ignore) {
		if(mapping.rest && mapping.rest[0] !== ",") {
			base64VLQ.decode(mapping.rest, mapping);
		}
		if(!mapping.rest)
			return false;
		if(mapping.rest[0] === ",") {
			mapping.rest = mapping.rest.substr(1);
			return false;
		}

		base64VLQ.decode(mapping.rest, mapping);
		const sourceIdx = mapping.value + currentSourceIdx;
		currentSourceIdx = sourceIdx;

		let linePosition;
		if(mapping.rest && mapping.rest[0] !== ",") {
			base64VLQ.decode(mapping.rest, mapping);
			linePosition = mapping.value + currentLine;
			currentLine = linePosition;
		} else {
			linePosition = currentLine;
		}

		if(mapping.rest) {
			const next = mapping.rest.indexOf(",");
			mapping.rest = next === -1 ? "" : mapping.rest.substr(next);
		}

		if(!ignore) {
			addSource(line, sources ? sources[sourceIdx] : null, sourcesContent ? sourcesContent[sourceIdx] : null, linePosition)
			return true;
		}
	}
	function addCode(generatedCode) {
		if(currentNode && currentNode instanceof CodeNode) {
			currentNode.addGeneratedCode(generatedCode);
		} else if(currentNode && currentNode instanceof SourceNode && !generatedCode.trim()) {
			currentNode.addGeneratedCode(generatedCode);
			currentSourceNodeLine++;
		} else {
			currentNode = new CodeNode(generatedCode);
			nodes.push(currentNode);
		}
	}
	function addSource(generatedCode, source, originalSource, linePosition) {
		if(currentNode && currentNode instanceof SourceNode &&
			currentNode.source === source &&
			currentSourceNodeLine === linePosition
		) {
			currentNode.addGeneratedCode(generatedCode);
			currentSourceNodeLine++;
		} else {
			currentNode = new SourceNode(generatedCode, source, originalSource, linePosition);
			currentSourceNodeLine = linePosition + 1;
			nodes.push(currentNode);
		}
	}
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(5);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(5);
var binarySearch = __webpack_require__(21);
var ArraySet = __webpack_require__(13).ArraySet;
var base64VLQ = __webpack_require__(14);
var quickSort = __webpack_require__(23).quickSort;

function SourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap)
    : new BasicSourceMapConsumer(sourceMap);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      if (source != null && sourceRoot != null) {
        source = util.join(sourceRoot, source);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: Optional. the column number in the original source.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }
    if (!this._sources.has(needle.source)) {
      return [];
    }
    needle.source = this._sources.indexOf(needle.source);

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The only parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._sources.toArray().map(function (s) {
      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
    }, this);
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          if (this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source);
          }
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    if (this.sourceRoot != null) {
      aSource = util.relative(this.sourceRoot, aSource);
    }

    if (this._sources.has(aSource)) {
      return this.sourcesContent[this._sources.indexOf(aSource)];
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + aSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    if (this.sourceRoot != null) {
      source = util.relative(this.sourceRoot, source);
    }
    if (!this._sources.has(source)) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    source = this._sources.indexOf(source);

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The only parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        if (section.consumer.sourceRoot !== null) {
          source = util.join(section.consumer.sourceRoot, source);
        }
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = section.consumer._names.at(mapping.name);
        this._names.add(name);
        name = this._names.indexOf(name);

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(15).SourceMapGenerator;
var util = __webpack_require__(5);

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex];
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex];
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 26;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {
	"props": [
		"$&",
		"$'",
		"$*",
		"$+",
		"$1",
		"$2",
		"$3",
		"$4",
		"$5",
		"$6",
		"$7",
		"$8",
		"$9",
		"$_",
		"$`",
		"$input",
		"@@iterator",
		"ABORT_ERR",
		"ACTIVE",
		"ACTIVE_ATTRIBUTES",
		"ACTIVE_TEXTURE",
		"ACTIVE_UNIFORMS",
		"ADDITION",
		"ALIASED_LINE_WIDTH_RANGE",
		"ALIASED_POINT_SIZE_RANGE",
		"ALLOW_KEYBOARD_INPUT",
		"ALLPASS",
		"ALPHA",
		"ALPHA_BITS",
		"ALT_MASK",
		"ALWAYS",
		"ANY_TYPE",
		"ANY_UNORDERED_NODE_TYPE",
		"ARRAY_BUFFER",
		"ARRAY_BUFFER_BINDING",
		"ATTACHED_SHADERS",
		"ATTRIBUTE_NODE",
		"AT_TARGET",
		"AddSearchProvider",
		"AnalyserNode",
		"AnimationEvent",
		"AnonXMLHttpRequest",
		"ApplicationCache",
		"ApplicationCacheErrorEvent",
		"Array",
		"ArrayBuffer",
		"Attr",
		"Audio",
		"AudioBuffer",
		"AudioBufferSourceNode",
		"AudioContext",
		"AudioDestinationNode",
		"AudioListener",
		"AudioNode",
		"AudioParam",
		"AudioProcessingEvent",
		"AudioStreamTrack",
		"AutocompleteErrorEvent",
		"BACK",
		"BAD_BOUNDARYPOINTS_ERR",
		"BANDPASS",
		"BLEND",
		"BLEND_COLOR",
		"BLEND_DST_ALPHA",
		"BLEND_DST_RGB",
		"BLEND_EQUATION",
		"BLEND_EQUATION_ALPHA",
		"BLEND_EQUATION_RGB",
		"BLEND_SRC_ALPHA",
		"BLEND_SRC_RGB",
		"BLUE_BITS",
		"BLUR",
		"BOOL",
		"BOOLEAN_TYPE",
		"BOOL_VEC2",
		"BOOL_VEC3",
		"BOOL_VEC4",
		"BOTH",
		"BROWSER_DEFAULT_WEBGL",
		"BUBBLING_PHASE",
		"BUFFER_SIZE",
		"BUFFER_USAGE",
		"BYTE",
		"BYTES_PER_ELEMENT",
		"BarProp",
		"BaseHref",
		"BatteryManager",
		"BeforeLoadEvent",
		"BeforeUnloadEvent",
		"BiquadFilterNode",
		"Blob",
		"BlobEvent",
		"Boolean",
		"CAPTURING_PHASE",
		"CCW",
		"CDATASection",
		"CDATA_SECTION_NODE",
		"CHANGE",
		"CHARSET_RULE",
		"CHECKING",
		"CLAMP_TO_EDGE",
		"CLICK",
		"CLOSED",
		"CLOSING",
		"COLOR_ATTACHMENT0",
		"COLOR_BUFFER_BIT",
		"COLOR_CLEAR_VALUE",
		"COLOR_WRITEMASK",
		"COMMENT_NODE",
		"COMPILE_STATUS",
		"COMPRESSED_RGBA_S3TC_DXT1_EXT",
		"COMPRESSED_RGBA_S3TC_DXT3_EXT",
		"COMPRESSED_RGBA_S3TC_DXT5_EXT",
		"COMPRESSED_RGB_S3TC_DXT1_EXT",
		"COMPRESSED_TEXTURE_FORMATS",
		"CONNECTING",
		"CONSTANT_ALPHA",
		"CONSTANT_COLOR",
		"CONSTRAINT_ERR",
		"CONTEXT_LOST_WEBGL",
		"CONTROL_MASK",
		"COUNTER_STYLE_RULE",
		"CSS",
		"CSS2Properties",
		"CSSCharsetRule",
		"CSSConditionRule",
		"CSSCounterStyleRule",
		"CSSFontFaceRule",
		"CSSFontFeatureValuesRule",
		"CSSGroupingRule",
		"CSSImportRule",
		"CSSKeyframeRule",
		"CSSKeyframesRule",
		"CSSMediaRule",
		"CSSMozDocumentRule",
		"CSSNameSpaceRule",
		"CSSPageRule",
		"CSSPrimitiveValue",
		"CSSRule",
		"CSSRuleList",
		"CSSStyleDeclaration",
		"CSSStyleRule",
		"CSSStyleSheet",
		"CSSSupportsRule",
		"CSSUnknownRule",
		"CSSValue",
		"CSSValueList",
		"CSSVariablesDeclaration",
		"CSSVariablesRule",
		"CSSViewportRule",
		"CSS_ATTR",
		"CSS_CM",
		"CSS_COUNTER",
		"CSS_CUSTOM",
		"CSS_DEG",
		"CSS_DIMENSION",
		"CSS_EMS",
		"CSS_EXS",
		"CSS_FILTER_BLUR",
		"CSS_FILTER_BRIGHTNESS",
		"CSS_FILTER_CONTRAST",
		"CSS_FILTER_CUSTOM",
		"CSS_FILTER_DROP_SHADOW",
		"CSS_FILTER_GRAYSCALE",
		"CSS_FILTER_HUE_ROTATE",
		"CSS_FILTER_INVERT",
		"CSS_FILTER_OPACITY",
		"CSS_FILTER_REFERENCE",
		"CSS_FILTER_SATURATE",
		"CSS_FILTER_SEPIA",
		"CSS_GRAD",
		"CSS_HZ",
		"CSS_IDENT",
		"CSS_IN",
		"CSS_INHERIT",
		"CSS_KHZ",
		"CSS_MATRIX",
		"CSS_MATRIX3D",
		"CSS_MM",
		"CSS_MS",
		"CSS_NUMBER",
		"CSS_PC",
		"CSS_PERCENTAGE",
		"CSS_PERSPECTIVE",
		"CSS_PRIMITIVE_VALUE",
		"CSS_PT",
		"CSS_PX",
		"CSS_RAD",
		"CSS_RECT",
		"CSS_RGBCOLOR",
		"CSS_ROTATE",
		"CSS_ROTATE3D",
		"CSS_ROTATEX",
		"CSS_ROTATEY",
		"CSS_ROTATEZ",
		"CSS_S",
		"CSS_SCALE",
		"CSS_SCALE3D",
		"CSS_SCALEX",
		"CSS_SCALEY",
		"CSS_SCALEZ",
		"CSS_SKEW",
		"CSS_SKEWX",
		"CSS_SKEWY",
		"CSS_STRING",
		"CSS_TRANSLATE",
		"CSS_TRANSLATE3D",
		"CSS_TRANSLATEX",
		"CSS_TRANSLATEY",
		"CSS_TRANSLATEZ",
		"CSS_UNKNOWN",
		"CSS_URI",
		"CSS_VALUE_LIST",
		"CSS_VH",
		"CSS_VMAX",
		"CSS_VMIN",
		"CSS_VW",
		"CULL_FACE",
		"CULL_FACE_MODE",
		"CURRENT_PROGRAM",
		"CURRENT_VERTEX_ATTRIB",
		"CUSTOM",
		"CW",
		"CanvasGradient",
		"CanvasPattern",
		"CanvasRenderingContext2D",
		"CaretPosition",
		"ChannelMergerNode",
		"ChannelSplitterNode",
		"CharacterData",
		"ClientRect",
		"ClientRectList",
		"Clipboard",
		"ClipboardEvent",
		"CloseEvent",
		"Collator",
		"CommandEvent",
		"Comment",
		"CompositionEvent",
		"Console",
		"Controllers",
		"ConvolverNode",
		"Counter",
		"Crypto",
		"CryptoKey",
		"CustomEvent",
		"DATABASE_ERR",
		"DATA_CLONE_ERR",
		"DATA_ERR",
		"DBLCLICK",
		"DECR",
		"DECR_WRAP",
		"DELETE_STATUS",
		"DEPTH_ATTACHMENT",
		"DEPTH_BITS",
		"DEPTH_BUFFER_BIT",
		"DEPTH_CLEAR_VALUE",
		"DEPTH_COMPONENT",
		"DEPTH_COMPONENT16",
		"DEPTH_FUNC",
		"DEPTH_RANGE",
		"DEPTH_STENCIL",
		"DEPTH_STENCIL_ATTACHMENT",
		"DEPTH_TEST",
		"DEPTH_WRITEMASK",
		"DIRECTION_DOWN",
		"DIRECTION_LEFT",
		"DIRECTION_RIGHT",
		"DIRECTION_UP",
		"DISABLED",
		"DISPATCH_REQUEST_ERR",
		"DITHER",
		"DOCUMENT_FRAGMENT_NODE",
		"DOCUMENT_NODE",
		"DOCUMENT_POSITION_CONTAINED_BY",
		"DOCUMENT_POSITION_CONTAINS",
		"DOCUMENT_POSITION_DISCONNECTED",
		"DOCUMENT_POSITION_FOLLOWING",
		"DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC",
		"DOCUMENT_POSITION_PRECEDING",
		"DOCUMENT_TYPE_NODE",
		"DOMCursor",
		"DOMError",
		"DOMException",
		"DOMImplementation",
		"DOMImplementationLS",
		"DOMMatrix",
		"DOMMatrixReadOnly",
		"DOMParser",
		"DOMPoint",
		"DOMPointReadOnly",
		"DOMQuad",
		"DOMRect",
		"DOMRectList",
		"DOMRectReadOnly",
		"DOMRequest",
		"DOMSTRING_SIZE_ERR",
		"DOMSettableTokenList",
		"DOMStringList",
		"DOMStringMap",
		"DOMTokenList",
		"DOMTransactionEvent",
		"DOM_DELTA_LINE",
		"DOM_DELTA_PAGE",
		"DOM_DELTA_PIXEL",
		"DOM_INPUT_METHOD_DROP",
		"DOM_INPUT_METHOD_HANDWRITING",
		"DOM_INPUT_METHOD_IME",
		"DOM_INPUT_METHOD_KEYBOARD",
		"DOM_INPUT_METHOD_MULTIMODAL",
		"DOM_INPUT_METHOD_OPTION",
		"DOM_INPUT_METHOD_PASTE",
		"DOM_INPUT_METHOD_SCRIPT",
		"DOM_INPUT_METHOD_UNKNOWN",
		"DOM_INPUT_METHOD_VOICE",
		"DOM_KEY_LOCATION_JOYSTICK",
		"DOM_KEY_LOCATION_LEFT",
		"DOM_KEY_LOCATION_MOBILE",
		"DOM_KEY_LOCATION_NUMPAD",
		"DOM_KEY_LOCATION_RIGHT",
		"DOM_KEY_LOCATION_STANDARD",
		"DOM_VK_0",
		"DOM_VK_1",
		"DOM_VK_2",
		"DOM_VK_3",
		"DOM_VK_4",
		"DOM_VK_5",
		"DOM_VK_6",
		"DOM_VK_7",
		"DOM_VK_8",
		"DOM_VK_9",
		"DOM_VK_A",
		"DOM_VK_ACCEPT",
		"DOM_VK_ADD",
		"DOM_VK_ALT",
		"DOM_VK_ALTGR",
		"DOM_VK_AMPERSAND",
		"DOM_VK_ASTERISK",
		"DOM_VK_AT",
		"DOM_VK_ATTN",
		"DOM_VK_B",
		"DOM_VK_BACKSPACE",
		"DOM_VK_BACK_QUOTE",
		"DOM_VK_BACK_SLASH",
		"DOM_VK_BACK_SPACE",
		"DOM_VK_C",
		"DOM_VK_CANCEL",
		"DOM_VK_CAPS_LOCK",
		"DOM_VK_CIRCUMFLEX",
		"DOM_VK_CLEAR",
		"DOM_VK_CLOSE_BRACKET",
		"DOM_VK_CLOSE_CURLY_BRACKET",
		"DOM_VK_CLOSE_PAREN",
		"DOM_VK_COLON",
		"DOM_VK_COMMA",
		"DOM_VK_CONTEXT_MENU",
		"DOM_VK_CONTROL",
		"DOM_VK_CONVERT",
		"DOM_VK_CRSEL",
		"DOM_VK_CTRL",
		"DOM_VK_D",
		"DOM_VK_DECIMAL",
		"DOM_VK_DELETE",
		"DOM_VK_DIVIDE",
		"DOM_VK_DOLLAR",
		"DOM_VK_DOUBLE_QUOTE",
		"DOM_VK_DOWN",
		"DOM_VK_E",
		"DOM_VK_EISU",
		"DOM_VK_END",
		"DOM_VK_ENTER",
		"DOM_VK_EQUALS",
		"DOM_VK_EREOF",
		"DOM_VK_ESCAPE",
		"DOM_VK_EXCLAMATION",
		"DOM_VK_EXECUTE",
		"DOM_VK_EXSEL",
		"DOM_VK_F",
		"DOM_VK_F1",
		"DOM_VK_F10",
		"DOM_VK_F11",
		"DOM_VK_F12",
		"DOM_VK_F13",
		"DOM_VK_F14",
		"DOM_VK_F15",
		"DOM_VK_F16",
		"DOM_VK_F17",
		"DOM_VK_F18",
		"DOM_VK_F19",
		"DOM_VK_F2",
		"DOM_VK_F20",
		"DOM_VK_F21",
		"DOM_VK_F22",
		"DOM_VK_F23",
		"DOM_VK_F24",
		"DOM_VK_F25",
		"DOM_VK_F26",
		"DOM_VK_F27",
		"DOM_VK_F28",
		"DOM_VK_F29",
		"DOM_VK_F3",
		"DOM_VK_F30",
		"DOM_VK_F31",
		"DOM_VK_F32",
		"DOM_VK_F33",
		"DOM_VK_F34",
		"DOM_VK_F35",
		"DOM_VK_F36",
		"DOM_VK_F4",
		"DOM_VK_F5",
		"DOM_VK_F6",
		"DOM_VK_F7",
		"DOM_VK_F8",
		"DOM_VK_F9",
		"DOM_VK_FINAL",
		"DOM_VK_FRONT",
		"DOM_VK_G",
		"DOM_VK_GREATER_THAN",
		"DOM_VK_H",
		"DOM_VK_HANGUL",
		"DOM_VK_HANJA",
		"DOM_VK_HASH",
		"DOM_VK_HELP",
		"DOM_VK_HK_TOGGLE",
		"DOM_VK_HOME",
		"DOM_VK_HYPHEN_MINUS",
		"DOM_VK_I",
		"DOM_VK_INSERT",
		"DOM_VK_J",
		"DOM_VK_JUNJA",
		"DOM_VK_K",
		"DOM_VK_KANA",
		"DOM_VK_KANJI",
		"DOM_VK_L",
		"DOM_VK_LEFT",
		"DOM_VK_LEFT_TAB",
		"DOM_VK_LESS_THAN",
		"DOM_VK_M",
		"DOM_VK_META",
		"DOM_VK_MODECHANGE",
		"DOM_VK_MULTIPLY",
		"DOM_VK_N",
		"DOM_VK_NONCONVERT",
		"DOM_VK_NUMPAD0",
		"DOM_VK_NUMPAD1",
		"DOM_VK_NUMPAD2",
		"DOM_VK_NUMPAD3",
		"DOM_VK_NUMPAD4",
		"DOM_VK_NUMPAD5",
		"DOM_VK_NUMPAD6",
		"DOM_VK_NUMPAD7",
		"DOM_VK_NUMPAD8",
		"DOM_VK_NUMPAD9",
		"DOM_VK_NUM_LOCK",
		"DOM_VK_O",
		"DOM_VK_OEM_1",
		"DOM_VK_OEM_102",
		"DOM_VK_OEM_2",
		"DOM_VK_OEM_3",
		"DOM_VK_OEM_4",
		"DOM_VK_OEM_5",
		"DOM_VK_OEM_6",
		"DOM_VK_OEM_7",
		"DOM_VK_OEM_8",
		"DOM_VK_OEM_COMMA",
		"DOM_VK_OEM_MINUS",
		"DOM_VK_OEM_PERIOD",
		"DOM_VK_OEM_PLUS",
		"DOM_VK_OPEN_BRACKET",
		"DOM_VK_OPEN_CURLY_BRACKET",
		"DOM_VK_OPEN_PAREN",
		"DOM_VK_P",
		"DOM_VK_PA1",
		"DOM_VK_PAGEDOWN",
		"DOM_VK_PAGEUP",
		"DOM_VK_PAGE_DOWN",
		"DOM_VK_PAGE_UP",
		"DOM_VK_PAUSE",
		"DOM_VK_PERCENT",
		"DOM_VK_PERIOD",
		"DOM_VK_PIPE",
		"DOM_VK_PLAY",
		"DOM_VK_PLUS",
		"DOM_VK_PRINT",
		"DOM_VK_PRINTSCREEN",
		"DOM_VK_PROCESSKEY",
		"DOM_VK_PROPERITES",
		"DOM_VK_Q",
		"DOM_VK_QUESTION_MARK",
		"DOM_VK_QUOTE",
		"DOM_VK_R",
		"DOM_VK_REDO",
		"DOM_VK_RETURN",
		"DOM_VK_RIGHT",
		"DOM_VK_S",
		"DOM_VK_SCROLL_LOCK",
		"DOM_VK_SELECT",
		"DOM_VK_SEMICOLON",
		"DOM_VK_SEPARATOR",
		"DOM_VK_SHIFT",
		"DOM_VK_SLASH",
		"DOM_VK_SLEEP",
		"DOM_VK_SPACE",
		"DOM_VK_SUBTRACT",
		"DOM_VK_T",
		"DOM_VK_TAB",
		"DOM_VK_TILDE",
		"DOM_VK_U",
		"DOM_VK_UNDERSCORE",
		"DOM_VK_UNDO",
		"DOM_VK_UNICODE",
		"DOM_VK_UP",
		"DOM_VK_V",
		"DOM_VK_VOLUME_DOWN",
		"DOM_VK_VOLUME_MUTE",
		"DOM_VK_VOLUME_UP",
		"DOM_VK_W",
		"DOM_VK_WIN",
		"DOM_VK_WINDOW",
		"DOM_VK_WIN_ICO_00",
		"DOM_VK_WIN_ICO_CLEAR",
		"DOM_VK_WIN_ICO_HELP",
		"DOM_VK_WIN_OEM_ATTN",
		"DOM_VK_WIN_OEM_AUTO",
		"DOM_VK_WIN_OEM_BACKTAB",
		"DOM_VK_WIN_OEM_CLEAR",
		"DOM_VK_WIN_OEM_COPY",
		"DOM_VK_WIN_OEM_CUSEL",
		"DOM_VK_WIN_OEM_ENLW",
		"DOM_VK_WIN_OEM_FINISH",
		"DOM_VK_WIN_OEM_FJ_JISHO",
		"DOM_VK_WIN_OEM_FJ_LOYA",
		"DOM_VK_WIN_OEM_FJ_MASSHOU",
		"DOM_VK_WIN_OEM_FJ_ROYA",
		"DOM_VK_WIN_OEM_FJ_TOUROKU",
		"DOM_VK_WIN_OEM_JUMP",
		"DOM_VK_WIN_OEM_PA1",
		"DOM_VK_WIN_OEM_PA2",
		"DOM_VK_WIN_OEM_PA3",
		"DOM_VK_WIN_OEM_RESET",
		"DOM_VK_WIN_OEM_WSCTRL",
		"DOM_VK_X",
		"DOM_VK_XF86XK_ADD_FAVORITE",
		"DOM_VK_XF86XK_APPLICATION_LEFT",
		"DOM_VK_XF86XK_APPLICATION_RIGHT",
		"DOM_VK_XF86XK_AUDIO_CYCLE_TRACK",
		"DOM_VK_XF86XK_AUDIO_FORWARD",
		"DOM_VK_XF86XK_AUDIO_LOWER_VOLUME",
		"DOM_VK_XF86XK_AUDIO_MEDIA",
		"DOM_VK_XF86XK_AUDIO_MUTE",
		"DOM_VK_XF86XK_AUDIO_NEXT",
		"DOM_VK_XF86XK_AUDIO_PAUSE",
		"DOM_VK_XF86XK_AUDIO_PLAY",
		"DOM_VK_XF86XK_AUDIO_PREV",
		"DOM_VK_XF86XK_AUDIO_RAISE_VOLUME",
		"DOM_VK_XF86XK_AUDIO_RANDOM_PLAY",
		"DOM_VK_XF86XK_AUDIO_RECORD",
		"DOM_VK_XF86XK_AUDIO_REPEAT",
		"DOM_VK_XF86XK_AUDIO_REWIND",
		"DOM_VK_XF86XK_AUDIO_STOP",
		"DOM_VK_XF86XK_AWAY",
		"DOM_VK_XF86XK_BACK",
		"DOM_VK_XF86XK_BACK_FORWARD",
		"DOM_VK_XF86XK_BATTERY",
		"DOM_VK_XF86XK_BLUE",
		"DOM_VK_XF86XK_BLUETOOTH",
		"DOM_VK_XF86XK_BOOK",
		"DOM_VK_XF86XK_BRIGHTNESS_ADJUST",
		"DOM_VK_XF86XK_CALCULATOR",
		"DOM_VK_XF86XK_CALENDAR",
		"DOM_VK_XF86XK_CD",
		"DOM_VK_XF86XK_CLOSE",
		"DOM_VK_XF86XK_COMMUNITY",
		"DOM_VK_XF86XK_CONTRAST_ADJUST",
		"DOM_VK_XF86XK_COPY",
		"DOM_VK_XF86XK_CUT",
		"DOM_VK_XF86XK_CYCLE_ANGLE",
		"DOM_VK_XF86XK_DISPLAY",
		"DOM_VK_XF86XK_DOCUMENTS",
		"DOM_VK_XF86XK_DOS",
		"DOM_VK_XF86XK_EJECT",
		"DOM_VK_XF86XK_EXCEL",
		"DOM_VK_XF86XK_EXPLORER",
		"DOM_VK_XF86XK_FAVORITES",
		"DOM_VK_XF86XK_FINANCE",
		"DOM_VK_XF86XK_FORWARD",
		"DOM_VK_XF86XK_FRAME_BACK",
		"DOM_VK_XF86XK_FRAME_FORWARD",
		"DOM_VK_XF86XK_GAME",
		"DOM_VK_XF86XK_GO",
		"DOM_VK_XF86XK_GREEN",
		"DOM_VK_XF86XK_HIBERNATE",
		"DOM_VK_XF86XK_HISTORY",
		"DOM_VK_XF86XK_HOME_PAGE",
		"DOM_VK_XF86XK_HOT_LINKS",
		"DOM_VK_XF86XK_I_TOUCH",
		"DOM_VK_XF86XK_KBD_BRIGHTNESS_DOWN",
		"DOM_VK_XF86XK_KBD_BRIGHTNESS_UP",
		"DOM_VK_XF86XK_KBD_LIGHT_ON_OFF",
		"DOM_VK_XF86XK_LAUNCH0",
		"DOM_VK_XF86XK_LAUNCH1",
		"DOM_VK_XF86XK_LAUNCH2",
		"DOM_VK_XF86XK_LAUNCH3",
		"DOM_VK_XF86XK_LAUNCH4",
		"DOM_VK_XF86XK_LAUNCH5",
		"DOM_VK_XF86XK_LAUNCH6",
		"DOM_VK_XF86XK_LAUNCH7",
		"DOM_VK_XF86XK_LAUNCH8",
		"DOM_VK_XF86XK_LAUNCH9",
		"DOM_VK_XF86XK_LAUNCH_A",
		"DOM_VK_XF86XK_LAUNCH_B",
		"DOM_VK_XF86XK_LAUNCH_C",
		"DOM_VK_XF86XK_LAUNCH_D",
		"DOM_VK_XF86XK_LAUNCH_E",
		"DOM_VK_XF86XK_LAUNCH_F",
		"DOM_VK_XF86XK_LIGHT_BULB",
		"DOM_VK_XF86XK_LOG_OFF",
		"DOM_VK_XF86XK_MAIL",
		"DOM_VK_XF86XK_MAIL_FORWARD",
		"DOM_VK_XF86XK_MARKET",
		"DOM_VK_XF86XK_MEETING",
		"DOM_VK_XF86XK_MEMO",
		"DOM_VK_XF86XK_MENU_KB",
		"DOM_VK_XF86XK_MENU_PB",
		"DOM_VK_XF86XK_MESSENGER",
		"DOM_VK_XF86XK_MON_BRIGHTNESS_DOWN",
		"DOM_VK_XF86XK_MON_BRIGHTNESS_UP",
		"DOM_VK_XF86XK_MUSIC",
		"DOM_VK_XF86XK_MY_COMPUTER",
		"DOM_VK_XF86XK_MY_SITES",
		"DOM_VK_XF86XK_NEW",
		"DOM_VK_XF86XK_NEWS",
		"DOM_VK_XF86XK_OFFICE_HOME",
		"DOM_VK_XF86XK_OPEN",
		"DOM_VK_XF86XK_OPEN_URL",
		"DOM_VK_XF86XK_OPTION",
		"DOM_VK_XF86XK_PASTE",
		"DOM_VK_XF86XK_PHONE",
		"DOM_VK_XF86XK_PICTURES",
		"DOM_VK_XF86XK_POWER_DOWN",
		"DOM_VK_XF86XK_POWER_OFF",
		"DOM_VK_XF86XK_RED",
		"DOM_VK_XF86XK_REFRESH",
		"DOM_VK_XF86XK_RELOAD",
		"DOM_VK_XF86XK_REPLY",
		"DOM_VK_XF86XK_ROCKER_DOWN",
		"DOM_VK_XF86XK_ROCKER_ENTER",
		"DOM_VK_XF86XK_ROCKER_UP",
		"DOM_VK_XF86XK_ROTATE_WINDOWS",
		"DOM_VK_XF86XK_ROTATION_KB",
		"DOM_VK_XF86XK_ROTATION_PB",
		"DOM_VK_XF86XK_SAVE",
		"DOM_VK_XF86XK_SCREEN_SAVER",
		"DOM_VK_XF86XK_SCROLL_CLICK",
		"DOM_VK_XF86XK_SCROLL_DOWN",
		"DOM_VK_XF86XK_SCROLL_UP",
		"DOM_VK_XF86XK_SEARCH",
		"DOM_VK_XF86XK_SEND",
		"DOM_VK_XF86XK_SHOP",
		"DOM_VK_XF86XK_SPELL",
		"DOM_VK_XF86XK_SPLIT_SCREEN",
		"DOM_VK_XF86XK_STANDBY",
		"DOM_VK_XF86XK_START",
		"DOM_VK_XF86XK_STOP",
		"DOM_VK_XF86XK_SUBTITLE",
		"DOM_VK_XF86XK_SUPPORT",
		"DOM_VK_XF86XK_SUSPEND",
		"DOM_VK_XF86XK_TASK_PANE",
		"DOM_VK_XF86XK_TERMINAL",
		"DOM_VK_XF86XK_TIME",
		"DOM_VK_XF86XK_TOOLS",
		"DOM_VK_XF86XK_TOP_MENU",
		"DOM_VK_XF86XK_TO_DO_LIST",
		"DOM_VK_XF86XK_TRAVEL",
		"DOM_VK_XF86XK_USER1KB",
		"DOM_VK_XF86XK_USER2KB",
		"DOM_VK_XF86XK_USER_PB",
		"DOM_VK_XF86XK_UWB",
		"DOM_VK_XF86XK_VENDOR_HOME",
		"DOM_VK_XF86XK_VIDEO",
		"DOM_VK_XF86XK_VIEW",
		"DOM_VK_XF86XK_WAKE_UP",
		"DOM_VK_XF86XK_WEB_CAM",
		"DOM_VK_XF86XK_WHEEL_BUTTON",
		"DOM_VK_XF86XK_WLAN",
		"DOM_VK_XF86XK_WORD",
		"DOM_VK_XF86XK_WWW",
		"DOM_VK_XF86XK_XFER",
		"DOM_VK_XF86XK_YELLOW",
		"DOM_VK_XF86XK_ZOOM_IN",
		"DOM_VK_XF86XK_ZOOM_OUT",
		"DOM_VK_Y",
		"DOM_VK_Z",
		"DOM_VK_ZOOM",
		"DONE",
		"DONT_CARE",
		"DOWNLOADING",
		"DRAGDROP",
		"DST_ALPHA",
		"DST_COLOR",
		"DYNAMIC_DRAW",
		"DataChannel",
		"DataTransfer",
		"DataTransferItem",
		"DataTransferItemList",
		"DataView",
		"Date",
		"DateTimeFormat",
		"DelayNode",
		"DesktopNotification",
		"DesktopNotificationCenter",
		"DeviceLightEvent",
		"DeviceMotionEvent",
		"DeviceOrientationEvent",
		"DeviceProximityEvent",
		"DeviceStorage",
		"DeviceStorageChangeEvent",
		"Document",
		"DocumentFragment",
		"DocumentType",
		"DragEvent",
		"DynamicsCompressorNode",
		"E",
		"ELEMENT_ARRAY_BUFFER",
		"ELEMENT_ARRAY_BUFFER_BINDING",
		"ELEMENT_NODE",
		"EMPTY",
		"ENCODING_ERR",
		"ENDED",
		"END_TO_END",
		"END_TO_START",
		"ENTITY_NODE",
		"ENTITY_REFERENCE_NODE",
		"EPSILON",
		"EQUAL",
		"EQUALPOWER",
		"ERROR",
		"EXPONENTIAL_DISTANCE",
		"Element",
		"ElementQuery",
		"Entity",
		"EntityReference",
		"Error",
		"ErrorEvent",
		"EvalError",
		"Event",
		"EventException",
		"EventSource",
		"EventTarget",
		"External",
		"FASTEST",
		"FIDOSDK",
		"FILTER_ACCEPT",
		"FILTER_INTERRUPT",
		"FILTER_REJECT",
		"FILTER_SKIP",
		"FINISHED_STATE",
		"FIRST_ORDERED_NODE_TYPE",
		"FLOAT",
		"FLOAT_MAT2",
		"FLOAT_MAT3",
		"FLOAT_MAT4",
		"FLOAT_VEC2",
		"FLOAT_VEC3",
		"FLOAT_VEC4",
		"FOCUS",
		"FONT_FACE_RULE",
		"FONT_FEATURE_VALUES_RULE",
		"FRAGMENT_SHADER",
		"FRAGMENT_SHADER_DERIVATIVE_HINT_OES",
		"FRAMEBUFFER",
		"FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",
		"FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",
		"FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",
		"FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",
		"FRAMEBUFFER_BINDING",
		"FRAMEBUFFER_COMPLETE",
		"FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
		"FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
		"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
		"FRAMEBUFFER_UNSUPPORTED",
		"FRONT",
		"FRONT_AND_BACK",
		"FRONT_FACE",
		"FUNC_ADD",
		"FUNC_REVERSE_SUBTRACT",
		"FUNC_SUBTRACT",
		"Feed",
		"FeedEntry",
		"File",
		"FileError",
		"FileList",
		"FileReader",
		"FindInPage",
		"Float32Array",
		"Float64Array",
		"FocusEvent",
		"FontFace",
		"FormData",
		"Function",
		"GENERATE_MIPMAP_HINT",
		"GEQUAL",
		"GREATER",
		"GREEN_BITS",
		"GainNode",
		"Gamepad",
		"GamepadButton",
		"GamepadEvent",
		"GestureEvent",
		"HAVE_CURRENT_DATA",
		"HAVE_ENOUGH_DATA",
		"HAVE_FUTURE_DATA",
		"HAVE_METADATA",
		"HAVE_NOTHING",
		"HEADERS_RECEIVED",
		"HIDDEN",
		"HIERARCHY_REQUEST_ERR",
		"HIGHPASS",
		"HIGHSHELF",
		"HIGH_FLOAT",
		"HIGH_INT",
		"HORIZONTAL",
		"HORIZONTAL_AXIS",
		"HRTF",
		"HTMLAllCollection",
		"HTMLAnchorElement",
		"HTMLAppletElement",
		"HTMLAreaElement",
		"HTMLAudioElement",
		"HTMLBRElement",
		"HTMLBaseElement",
		"HTMLBaseFontElement",
		"HTMLBlockquoteElement",
		"HTMLBodyElement",
		"HTMLButtonElement",
		"HTMLCanvasElement",
		"HTMLCollection",
		"HTMLCommandElement",
		"HTMLContentElement",
		"HTMLDListElement",
		"HTMLDataElement",
		"HTMLDataListElement",
		"HTMLDetailsElement",
		"HTMLDialogElement",
		"HTMLDirectoryElement",
		"HTMLDivElement",
		"HTMLDocument",
		"HTMLElement",
		"HTMLEmbedElement",
		"HTMLFieldSetElement",
		"HTMLFontElement",
		"HTMLFormControlsCollection",
		"HTMLFormElement",
		"HTMLFrameElement",
		"HTMLFrameSetElement",
		"HTMLHRElement",
		"HTMLHeadElement",
		"HTMLHeadingElement",
		"HTMLHtmlElement",
		"HTMLIFrameElement",
		"HTMLImageElement",
		"HTMLInputElement",
		"HTMLIsIndexElement",
		"HTMLKeygenElement",
		"HTMLLIElement",
		"HTMLLabelElement",
		"HTMLLegendElement",
		"HTMLLinkElement",
		"HTMLMapElement",
		"HTMLMarqueeElement",
		"HTMLMediaElement",
		"HTMLMenuElement",
		"HTMLMenuItemElement",
		"HTMLMetaElement",
		"HTMLMeterElement",
		"HTMLModElement",
		"HTMLOListElement",
		"HTMLObjectElement",
		"HTMLOptGroupElement",
		"HTMLOptionElement",
		"HTMLOptionsCollection",
		"HTMLOutputElement",
		"HTMLParagraphElement",
		"HTMLParamElement",
		"HTMLPictureElement",
		"HTMLPreElement",
		"HTMLProgressElement",
		"HTMLPropertiesCollection",
		"HTMLQuoteElement",
		"HTMLScriptElement",
		"HTMLSelectElement",
		"HTMLShadowElement",
		"HTMLSourceElement",
		"HTMLSpanElement",
		"HTMLStyleElement",
		"HTMLTableCaptionElement",
		"HTMLTableCellElement",
		"HTMLTableColElement",
		"HTMLTableElement",
		"HTMLTableRowElement",
		"HTMLTableSectionElement",
		"HTMLTemplateElement",
		"HTMLTextAreaElement",
		"HTMLTimeElement",
		"HTMLTitleElement",
		"HTMLTrackElement",
		"HTMLUListElement",
		"HTMLUnknownElement",
		"HTMLVideoElement",
		"HashChangeEvent",
		"Headers",
		"History",
		"ICE_CHECKING",
		"ICE_CLOSED",
		"ICE_COMPLETED",
		"ICE_CONNECTED",
		"ICE_FAILED",
		"ICE_GATHERING",
		"ICE_WAITING",
		"IDBCursor",
		"IDBCursorWithValue",
		"IDBDatabase",
		"IDBDatabaseException",
		"IDBFactory",
		"IDBFileHandle",
		"IDBFileRequest",
		"IDBIndex",
		"IDBKeyRange",
		"IDBMutableFile",
		"IDBObjectStore",
		"IDBOpenDBRequest",
		"IDBRequest",
		"IDBTransaction",
		"IDBVersionChangeEvent",
		"IDLE",
		"IMPLEMENTATION_COLOR_READ_FORMAT",
		"IMPLEMENTATION_COLOR_READ_TYPE",
		"IMPORT_RULE",
		"INCR",
		"INCR_WRAP",
		"INDEX_SIZE_ERR",
		"INT",
		"INT_VEC2",
		"INT_VEC3",
		"INT_VEC4",
		"INUSE_ATTRIBUTE_ERR",
		"INVALID_ACCESS_ERR",
		"INVALID_CHARACTER_ERR",
		"INVALID_ENUM",
		"INVALID_EXPRESSION_ERR",
		"INVALID_FRAMEBUFFER_OPERATION",
		"INVALID_MODIFICATION_ERR",
		"INVALID_NODE_TYPE_ERR",
		"INVALID_OPERATION",
		"INVALID_STATE_ERR",
		"INVALID_VALUE",
		"INVERSE_DISTANCE",
		"INVERT",
		"IceCandidate",
		"Image",
		"ImageBitmap",
		"ImageData",
		"Infinity",
		"InputEvent",
		"InputMethodContext",
		"InstallTrigger",
		"Int16Array",
		"Int32Array",
		"Int8Array",
		"Intent",
		"InternalError",
		"Intl",
		"IsSearchProviderInstalled",
		"Iterator",
		"JSON",
		"KEEP",
		"KEYDOWN",
		"KEYFRAMES_RULE",
		"KEYFRAME_RULE",
		"KEYPRESS",
		"KEYUP",
		"KeyEvent",
		"KeyboardEvent",
		"LENGTHADJUST_SPACING",
		"LENGTHADJUST_SPACINGANDGLYPHS",
		"LENGTHADJUST_UNKNOWN",
		"LEQUAL",
		"LESS",
		"LINEAR",
		"LINEAR_DISTANCE",
		"LINEAR_MIPMAP_LINEAR",
		"LINEAR_MIPMAP_NEAREST",
		"LINES",
		"LINE_LOOP",
		"LINE_STRIP",
		"LINE_WIDTH",
		"LINK_STATUS",
		"LIVE",
		"LN10",
		"LN2",
		"LOADED",
		"LOADING",
		"LOG10E",
		"LOG2E",
		"LOWPASS",
		"LOWSHELF",
		"LOW_FLOAT",
		"LOW_INT",
		"LSException",
		"LSParserFilter",
		"LUMINANCE",
		"LUMINANCE_ALPHA",
		"LocalMediaStream",
		"Location",
		"MAX_COMBINED_TEXTURE_IMAGE_UNITS",
		"MAX_CUBE_MAP_TEXTURE_SIZE",
		"MAX_FRAGMENT_UNIFORM_VECTORS",
		"MAX_RENDERBUFFER_SIZE",
		"MAX_SAFE_INTEGER",
		"MAX_TEXTURE_IMAGE_UNITS",
		"MAX_TEXTURE_MAX_ANISOTROPY_EXT",
		"MAX_TEXTURE_SIZE",
		"MAX_VALUE",
		"MAX_VARYING_VECTORS",
		"MAX_VERTEX_ATTRIBS",
		"MAX_VERTEX_TEXTURE_IMAGE_UNITS",
		"MAX_VERTEX_UNIFORM_VECTORS",
		"MAX_VIEWPORT_DIMS",
		"MEDIA_ERR_ABORTED",
		"MEDIA_ERR_DECODE",
		"MEDIA_ERR_ENCRYPTED",
		"MEDIA_ERR_NETWORK",
		"MEDIA_ERR_SRC_NOT_SUPPORTED",
		"MEDIA_KEYERR_CLIENT",
		"MEDIA_KEYERR_DOMAIN",
		"MEDIA_KEYERR_HARDWARECHANGE",
		"MEDIA_KEYERR_OUTPUT",
		"MEDIA_KEYERR_SERVICE",
		"MEDIA_KEYERR_UNKNOWN",
		"MEDIA_RULE",
		"MEDIUM_FLOAT",
		"MEDIUM_INT",
		"META_MASK",
		"MIN_SAFE_INTEGER",
		"MIN_VALUE",
		"MIRRORED_REPEAT",
		"MODE_ASYNCHRONOUS",
		"MODE_SYNCHRONOUS",
		"MODIFICATION",
		"MOUSEDOWN",
		"MOUSEDRAG",
		"MOUSEMOVE",
		"MOUSEOUT",
		"MOUSEOVER",
		"MOUSEUP",
		"MOZ_KEYFRAMES_RULE",
		"MOZ_KEYFRAME_RULE",
		"MOZ_SOURCE_CURSOR",
		"MOZ_SOURCE_ERASER",
		"MOZ_SOURCE_KEYBOARD",
		"MOZ_SOURCE_MOUSE",
		"MOZ_SOURCE_PEN",
		"MOZ_SOURCE_TOUCH",
		"MOZ_SOURCE_UNKNOWN",
		"MSGESTURE_FLAG_BEGIN",
		"MSGESTURE_FLAG_CANCEL",
		"MSGESTURE_FLAG_END",
		"MSGESTURE_FLAG_INERTIA",
		"MSGESTURE_FLAG_NONE",
		"MSPOINTER_TYPE_MOUSE",
		"MSPOINTER_TYPE_PEN",
		"MSPOINTER_TYPE_TOUCH",
		"MS_ASYNC_CALLBACK_STATUS_ASSIGN_DELEGATE",
		"MS_ASYNC_CALLBACK_STATUS_CANCEL",
		"MS_ASYNC_CALLBACK_STATUS_CHOOSEANY",
		"MS_ASYNC_CALLBACK_STATUS_ERROR",
		"MS_ASYNC_CALLBACK_STATUS_JOIN",
		"MS_ASYNC_OP_STATUS_CANCELED",
		"MS_ASYNC_OP_STATUS_ERROR",
		"MS_ASYNC_OP_STATUS_SUCCESS",
		"MS_MANIPULATION_STATE_ACTIVE",
		"MS_MANIPULATION_STATE_CANCELLED",
		"MS_MANIPULATION_STATE_COMMITTED",
		"MS_MANIPULATION_STATE_DRAGGING",
		"MS_MANIPULATION_STATE_INERTIA",
		"MS_MANIPULATION_STATE_PRESELECT",
		"MS_MANIPULATION_STATE_SELECTING",
		"MS_MANIPULATION_STATE_STOPPED",
		"MS_MEDIA_ERR_ENCRYPTED",
		"MS_MEDIA_KEYERR_CLIENT",
		"MS_MEDIA_KEYERR_DOMAIN",
		"MS_MEDIA_KEYERR_HARDWARECHANGE",
		"MS_MEDIA_KEYERR_OUTPUT",
		"MS_MEDIA_KEYERR_SERVICE",
		"MS_MEDIA_KEYERR_UNKNOWN",
		"Map",
		"Math",
		"MediaController",
		"MediaDevices",
		"MediaElementAudioSourceNode",
		"MediaEncryptedEvent",
		"MediaError",
		"MediaKeyError",
		"MediaKeyEvent",
		"MediaKeyMessageEvent",
		"MediaKeyNeededEvent",
		"MediaKeySession",
		"MediaKeyStatusMap",
		"MediaKeySystemAccess",
		"MediaKeys",
		"MediaList",
		"MediaQueryList",
		"MediaQueryListEvent",
		"MediaRecorder",
		"MediaSource",
		"MediaStream",
		"MediaStreamAudioDestinationNode",
		"MediaStreamAudioSourceNode",
		"MediaStreamEvent",
		"MediaStreamTrack",
		"MediaStreamTrackEvent",
		"MessageChannel",
		"MessageEvent",
		"MessagePort",
		"Methods",
		"MimeType",
		"MimeTypeArray",
		"MouseEvent",
		"MouseScrollEvent",
		"MozAnimation",
		"MozAnimationDelay",
		"MozAnimationDirection",
		"MozAnimationDuration",
		"MozAnimationFillMode",
		"MozAnimationIterationCount",
		"MozAnimationName",
		"MozAnimationPlayState",
		"MozAnimationTimingFunction",
		"MozAppearance",
		"MozBackfaceVisibility",
		"MozBinding",
		"MozBorderBottomColors",
		"MozBorderEnd",
		"MozBorderEndColor",
		"MozBorderEndStyle",
		"MozBorderEndWidth",
		"MozBorderImage",
		"MozBorderLeftColors",
		"MozBorderRightColors",
		"MozBorderStart",
		"MozBorderStartColor",
		"MozBorderStartStyle",
		"MozBorderStartWidth",
		"MozBorderTopColors",
		"MozBoxAlign",
		"MozBoxDirection",
		"MozBoxFlex",
		"MozBoxOrdinalGroup",
		"MozBoxOrient",
		"MozBoxPack",
		"MozBoxSizing",
		"MozCSSKeyframeRule",
		"MozCSSKeyframesRule",
		"MozColumnCount",
		"MozColumnFill",
		"MozColumnGap",
		"MozColumnRule",
		"MozColumnRuleColor",
		"MozColumnRuleStyle",
		"MozColumnRuleWidth",
		"MozColumnWidth",
		"MozColumns",
		"MozContactChangeEvent",
		"MozFloatEdge",
		"MozFontFeatureSettings",
		"MozFontLanguageOverride",
		"MozForceBrokenImageIcon",
		"MozHyphens",
		"MozImageRegion",
		"MozMarginEnd",
		"MozMarginStart",
		"MozMmsEvent",
		"MozMmsMessage",
		"MozMobileMessageThread",
		"MozOSXFontSmoothing",
		"MozOrient",
		"MozOutlineRadius",
		"MozOutlineRadiusBottomleft",
		"MozOutlineRadiusBottomright",
		"MozOutlineRadiusTopleft",
		"MozOutlineRadiusTopright",
		"MozPaddingEnd",
		"MozPaddingStart",
		"MozPerspective",
		"MozPerspectiveOrigin",
		"MozPowerManager",
		"MozSettingsEvent",
		"MozSmsEvent",
		"MozSmsMessage",
		"MozStackSizing",
		"MozTabSize",
		"MozTextAlignLast",
		"MozTextDecorationColor",
		"MozTextDecorationLine",
		"MozTextDecorationStyle",
		"MozTextSizeAdjust",
		"MozTransform",
		"MozTransformOrigin",
		"MozTransformStyle",
		"MozTransition",
		"MozTransitionDelay",
		"MozTransitionDuration",
		"MozTransitionProperty",
		"MozTransitionTimingFunction",
		"MozUserFocus",
		"MozUserInput",
		"MozUserModify",
		"MozUserSelect",
		"MozWindowDragging",
		"MozWindowShadow",
		"MutationEvent",
		"MutationObserver",
		"MutationRecord",
		"NAMESPACE_ERR",
		"NAMESPACE_RULE",
		"NEAREST",
		"NEAREST_MIPMAP_LINEAR",
		"NEAREST_MIPMAP_NEAREST",
		"NEGATIVE_INFINITY",
		"NETWORK_EMPTY",
		"NETWORK_ERR",
		"NETWORK_IDLE",
		"NETWORK_LOADED",
		"NETWORK_LOADING",
		"NETWORK_NO_SOURCE",
		"NEVER",
		"NEW",
		"NEXT",
		"NEXT_NO_DUPLICATE",
		"NICEST",
		"NODE_AFTER",
		"NODE_BEFORE",
		"NODE_BEFORE_AND_AFTER",
		"NODE_INSIDE",
		"NONE",
		"NON_TRANSIENT_ERR",
		"NOTATION_NODE",
		"NOTCH",
		"NOTEQUAL",
		"NOT_ALLOWED_ERR",
		"NOT_FOUND_ERR",
		"NOT_READABLE_ERR",
		"NOT_SUPPORTED_ERR",
		"NO_DATA_ALLOWED_ERR",
		"NO_ERR",
		"NO_ERROR",
		"NO_MODIFICATION_ALLOWED_ERR",
		"NUMBER_TYPE",
		"NUM_COMPRESSED_TEXTURE_FORMATS",
		"NaN",
		"NamedNodeMap",
		"Navigator",
		"NearbyLinks",
		"NetworkInformation",
		"Node",
		"NodeFilter",
		"NodeIterator",
		"NodeList",
		"Notation",
		"Notification",
		"NotifyPaintEvent",
		"Number",
		"NumberFormat",
		"OBSOLETE",
		"ONE",
		"ONE_MINUS_CONSTANT_ALPHA",
		"ONE_MINUS_CONSTANT_COLOR",
		"ONE_MINUS_DST_ALPHA",
		"ONE_MINUS_DST_COLOR",
		"ONE_MINUS_SRC_ALPHA",
		"ONE_MINUS_SRC_COLOR",
		"OPEN",
		"OPENED",
		"OPENING",
		"ORDERED_NODE_ITERATOR_TYPE",
		"ORDERED_NODE_SNAPSHOT_TYPE",
		"OUT_OF_MEMORY",
		"Object",
		"OfflineAudioCompletionEvent",
		"OfflineAudioContext",
		"OfflineResourceList",
		"Option",
		"OscillatorNode",
		"OverflowEvent",
		"PACK_ALIGNMENT",
		"PAGE_RULE",
		"PARSE_ERR",
		"PATHSEG_ARC_ABS",
		"PATHSEG_ARC_REL",
		"PATHSEG_CLOSEPATH",
		"PATHSEG_CURVETO_CUBIC_ABS",
		"PATHSEG_CURVETO_CUBIC_REL",
		"PATHSEG_CURVETO_CUBIC_SMOOTH_ABS",
		"PATHSEG_CURVETO_CUBIC_SMOOTH_REL",
		"PATHSEG_CURVETO_QUADRATIC_ABS",
		"PATHSEG_CURVETO_QUADRATIC_REL",
		"PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS",
		"PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL",
		"PATHSEG_LINETO_ABS",
		"PATHSEG_LINETO_HORIZONTAL_ABS",
		"PATHSEG_LINETO_HORIZONTAL_REL",
		"PATHSEG_LINETO_REL",
		"PATHSEG_LINETO_VERTICAL_ABS",
		"PATHSEG_LINETO_VERTICAL_REL",
		"PATHSEG_MOVETO_ABS",
		"PATHSEG_MOVETO_REL",
		"PATHSEG_UNKNOWN",
		"PATH_EXISTS_ERR",
		"PEAKING",
		"PERMISSION_DENIED",
		"PERSISTENT",
		"PI",
		"PLAYING_STATE",
		"POINTS",
		"POLYGON_OFFSET_FACTOR",
		"POLYGON_OFFSET_FILL",
		"POLYGON_OFFSET_UNITS",
		"POSITION_UNAVAILABLE",
		"POSITIVE_INFINITY",
		"PREV",
		"PREV_NO_DUPLICATE",
		"PROCESSING_INSTRUCTION_NODE",
		"PageChangeEvent",
		"PageTransitionEvent",
		"PaintRequest",
		"PaintRequestList",
		"PannerNode",
		"Path2D",
		"Performance",
		"PerformanceEntry",
		"PerformanceMark",
		"PerformanceMeasure",
		"PerformanceNavigation",
		"PerformanceResourceTiming",
		"PerformanceTiming",
		"PeriodicWave",
		"Plugin",
		"PluginArray",
		"PopStateEvent",
		"PopupBlockedEvent",
		"ProcessingInstruction",
		"ProgressEvent",
		"Promise",
		"PropertyNodeList",
		"Proxy",
		"PushManager",
		"PushSubscription",
		"Q",
		"QUOTA_ERR",
		"QUOTA_EXCEEDED_ERR",
		"QueryInterface",
		"READ_ONLY",
		"READ_ONLY_ERR",
		"READ_WRITE",
		"RED_BITS",
		"REMOVAL",
		"RENDERBUFFER",
		"RENDERBUFFER_ALPHA_SIZE",
		"RENDERBUFFER_BINDING",
		"RENDERBUFFER_BLUE_SIZE",
		"RENDERBUFFER_DEPTH_SIZE",
		"RENDERBUFFER_GREEN_SIZE",
		"RENDERBUFFER_HEIGHT",
		"RENDERBUFFER_INTERNAL_FORMAT",
		"RENDERBUFFER_RED_SIZE",
		"RENDERBUFFER_STENCIL_SIZE",
		"RENDERBUFFER_WIDTH",
		"RENDERER",
		"RENDERING_INTENT_ABSOLUTE_COLORIMETRIC",
		"RENDERING_INTENT_AUTO",
		"RENDERING_INTENT_PERCEPTUAL",
		"RENDERING_INTENT_RELATIVE_COLORIMETRIC",
		"RENDERING_INTENT_SATURATION",
		"RENDERING_INTENT_UNKNOWN",
		"REPEAT",
		"REPLACE",
		"RGB",
		"RGB565",
		"RGB5_A1",
		"RGBA",
		"RGBA4",
		"RGBColor",
		"ROTATION_CLOCKWISE",
		"ROTATION_COUNTERCLOCKWISE",
		"RTCDataChannelEvent",
		"RTCIceCandidate",
		"RTCPeerConnectionIceEvent",
		"RTCRtpReceiver",
		"RTCRtpSender",
		"RTCSessionDescription",
		"RTCStatsReport",
		"RadioNodeList",
		"Range",
		"RangeError",
		"RangeException",
		"RecordErrorEvent",
		"Rect",
		"ReferenceError",
		"RegExp",
		"Request",
		"Response",
		"SAMPLER_2D",
		"SAMPLER_CUBE",
		"SAMPLES",
		"SAMPLE_ALPHA_TO_COVERAGE",
		"SAMPLE_BUFFERS",
		"SAMPLE_COVERAGE",
		"SAMPLE_COVERAGE_INVERT",
		"SAMPLE_COVERAGE_VALUE",
		"SAWTOOTH",
		"SCHEDULED_STATE",
		"SCISSOR_BOX",
		"SCISSOR_TEST",
		"SCROLL_PAGE_DOWN",
		"SCROLL_PAGE_UP",
		"SDP_ANSWER",
		"SDP_OFFER",
		"SDP_PRANSWER",
		"SECURITY_ERR",
		"SELECT",
		"SERIALIZE_ERR",
		"SEVERITY_ERROR",
		"SEVERITY_FATAL_ERROR",
		"SEVERITY_WARNING",
		"SHADER_COMPILER",
		"SHADER_TYPE",
		"SHADING_LANGUAGE_VERSION",
		"SHIFT_MASK",
		"SHORT",
		"SHOWING",
		"SHOW_ALL",
		"SHOW_ATTRIBUTE",
		"SHOW_CDATA_SECTION",
		"SHOW_COMMENT",
		"SHOW_DOCUMENT",
		"SHOW_DOCUMENT_FRAGMENT",
		"SHOW_DOCUMENT_TYPE",
		"SHOW_ELEMENT",
		"SHOW_ENTITY",
		"SHOW_ENTITY_REFERENCE",
		"SHOW_NOTATION",
		"SHOW_PROCESSING_INSTRUCTION",
		"SHOW_TEXT",
		"SINE",
		"SOUNDFIELD",
		"SQLException",
		"SQRT1_2",
		"SQRT2",
		"SQUARE",
		"SRC_ALPHA",
		"SRC_ALPHA_SATURATE",
		"SRC_COLOR",
		"START_TO_END",
		"START_TO_START",
		"STATIC_DRAW",
		"STENCIL_ATTACHMENT",
		"STENCIL_BACK_FAIL",
		"STENCIL_BACK_FUNC",
		"STENCIL_BACK_PASS_DEPTH_FAIL",
		"STENCIL_BACK_PASS_DEPTH_PASS",
		"STENCIL_BACK_REF",
		"STENCIL_BACK_VALUE_MASK",
		"STENCIL_BACK_WRITEMASK",
		"STENCIL_BITS",
		"STENCIL_BUFFER_BIT",
		"STENCIL_CLEAR_VALUE",
		"STENCIL_FAIL",
		"STENCIL_FUNC",
		"STENCIL_INDEX",
		"STENCIL_INDEX8",
		"STENCIL_PASS_DEPTH_FAIL",
		"STENCIL_PASS_DEPTH_PASS",
		"STENCIL_REF",
		"STENCIL_TEST",
		"STENCIL_VALUE_MASK",
		"STENCIL_WRITEMASK",
		"STREAM_DRAW",
		"STRING_TYPE",
		"STYLE_RULE",
		"SUBPIXEL_BITS",
		"SUPPORTS_RULE",
		"SVGAElement",
		"SVGAltGlyphDefElement",
		"SVGAltGlyphElement",
		"SVGAltGlyphItemElement",
		"SVGAngle",
		"SVGAnimateColorElement",
		"SVGAnimateElement",
		"SVGAnimateMotionElement",
		"SVGAnimateTransformElement",
		"SVGAnimatedAngle",
		"SVGAnimatedBoolean",
		"SVGAnimatedEnumeration",
		"SVGAnimatedInteger",
		"SVGAnimatedLength",
		"SVGAnimatedLengthList",
		"SVGAnimatedNumber",
		"SVGAnimatedNumberList",
		"SVGAnimatedPreserveAspectRatio",
		"SVGAnimatedRect",
		"SVGAnimatedString",
		"SVGAnimatedTransformList",
		"SVGAnimationElement",
		"SVGCircleElement",
		"SVGClipPathElement",
		"SVGColor",
		"SVGComponentTransferFunctionElement",
		"SVGCursorElement",
		"SVGDefsElement",
		"SVGDescElement",
		"SVGDiscardElement",
		"SVGDocument",
		"SVGElement",
		"SVGElementInstance",
		"SVGElementInstanceList",
		"SVGEllipseElement",
		"SVGException",
		"SVGFEBlendElement",
		"SVGFEColorMatrixElement",
		"SVGFEComponentTransferElement",
		"SVGFECompositeElement",
		"SVGFEConvolveMatrixElement",
		"SVGFEDiffuseLightingElement",
		"SVGFEDisplacementMapElement",
		"SVGFEDistantLightElement",
		"SVGFEDropShadowElement",
		"SVGFEFloodElement",
		"SVGFEFuncAElement",
		"SVGFEFuncBElement",
		"SVGFEFuncGElement",
		"SVGFEFuncRElement",
		"SVGFEGaussianBlurElement",
		"SVGFEImageElement",
		"SVGFEMergeElement",
		"SVGFEMergeNodeElement",
		"SVGFEMorphologyElement",
		"SVGFEOffsetElement",
		"SVGFEPointLightElement",
		"SVGFESpecularLightingElement",
		"SVGFESpotLightElement",
		"SVGFETileElement",
		"SVGFETurbulenceElement",
		"SVGFilterElement",
		"SVGFontElement",
		"SVGFontFaceElement",
		"SVGFontFaceFormatElement",
		"SVGFontFaceNameElement",
		"SVGFontFaceSrcElement",
		"SVGFontFaceUriElement",
		"SVGForeignObjectElement",
		"SVGGElement",
		"SVGGeometryElement",
		"SVGGlyphElement",
		"SVGGlyphRefElement",
		"SVGGradientElement",
		"SVGGraphicsElement",
		"SVGHKernElement",
		"SVGImageElement",
		"SVGLength",
		"SVGLengthList",
		"SVGLineElement",
		"SVGLinearGradientElement",
		"SVGMPathElement",
		"SVGMarkerElement",
		"SVGMaskElement",
		"SVGMatrix",
		"SVGMetadataElement",
		"SVGMissingGlyphElement",
		"SVGNumber",
		"SVGNumberList",
		"SVGPaint",
		"SVGPathElement",
		"SVGPathSeg",
		"SVGPathSegArcAbs",
		"SVGPathSegArcRel",
		"SVGPathSegClosePath",
		"SVGPathSegCurvetoCubicAbs",
		"SVGPathSegCurvetoCubicRel",
		"SVGPathSegCurvetoCubicSmoothAbs",
		"SVGPathSegCurvetoCubicSmoothRel",
		"SVGPathSegCurvetoQuadraticAbs",
		"SVGPathSegCurvetoQuadraticRel",
		"SVGPathSegCurvetoQuadraticSmoothAbs",
		"SVGPathSegCurvetoQuadraticSmoothRel",
		"SVGPathSegLinetoAbs",
		"SVGPathSegLinetoHorizontalAbs",
		"SVGPathSegLinetoHorizontalRel",
		"SVGPathSegLinetoRel",
		"SVGPathSegLinetoVerticalAbs",
		"SVGPathSegLinetoVerticalRel",
		"SVGPathSegList",
		"SVGPathSegMovetoAbs",
		"SVGPathSegMovetoRel",
		"SVGPatternElement",
		"SVGPoint",
		"SVGPointList",
		"SVGPolygonElement",
		"SVGPolylineElement",
		"SVGPreserveAspectRatio",
		"SVGRadialGradientElement",
		"SVGRect",
		"SVGRectElement",
		"SVGRenderingIntent",
		"SVGSVGElement",
		"SVGScriptElement",
		"SVGSetElement",
		"SVGStopElement",
		"SVGStringList",
		"SVGStyleElement",
		"SVGSwitchElement",
		"SVGSymbolElement",
		"SVGTRefElement",
		"SVGTSpanElement",
		"SVGTextContentElement",
		"SVGTextElement",
		"SVGTextPathElement",
		"SVGTextPositioningElement",
		"SVGTitleElement",
		"SVGTransform",
		"SVGTransformList",
		"SVGUnitTypes",
		"SVGUseElement",
		"SVGVKernElement",
		"SVGViewElement",
		"SVGViewSpec",
		"SVGZoomAndPan",
		"SVGZoomEvent",
		"SVG_ANGLETYPE_DEG",
		"SVG_ANGLETYPE_GRAD",
		"SVG_ANGLETYPE_RAD",
		"SVG_ANGLETYPE_UNKNOWN",
		"SVG_ANGLETYPE_UNSPECIFIED",
		"SVG_CHANNEL_A",
		"SVG_CHANNEL_B",
		"SVG_CHANNEL_G",
		"SVG_CHANNEL_R",
		"SVG_CHANNEL_UNKNOWN",
		"SVG_COLORTYPE_CURRENTCOLOR",
		"SVG_COLORTYPE_RGBCOLOR",
		"SVG_COLORTYPE_RGBCOLOR_ICCCOLOR",
		"SVG_COLORTYPE_UNKNOWN",
		"SVG_EDGEMODE_DUPLICATE",
		"SVG_EDGEMODE_NONE",
		"SVG_EDGEMODE_UNKNOWN",
		"SVG_EDGEMODE_WRAP",
		"SVG_FEBLEND_MODE_COLOR",
		"SVG_FEBLEND_MODE_COLOR_BURN",
		"SVG_FEBLEND_MODE_COLOR_DODGE",
		"SVG_FEBLEND_MODE_DARKEN",
		"SVG_FEBLEND_MODE_DIFFERENCE",
		"SVG_FEBLEND_MODE_EXCLUSION",
		"SVG_FEBLEND_MODE_HARD_LIGHT",
		"SVG_FEBLEND_MODE_HUE",
		"SVG_FEBLEND_MODE_LIGHTEN",
		"SVG_FEBLEND_MODE_LUMINOSITY",
		"SVG_FEBLEND_MODE_MULTIPLY",
		"SVG_FEBLEND_MODE_NORMAL",
		"SVG_FEBLEND_MODE_OVERLAY",
		"SVG_FEBLEND_MODE_SATURATION",
		"SVG_FEBLEND_MODE_SCREEN",
		"SVG_FEBLEND_MODE_SOFT_LIGHT",
		"SVG_FEBLEND_MODE_UNKNOWN",
		"SVG_FECOLORMATRIX_TYPE_HUEROTATE",
		"SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA",
		"SVG_FECOLORMATRIX_TYPE_MATRIX",
		"SVG_FECOLORMATRIX_TYPE_SATURATE",
		"SVG_FECOLORMATRIX_TYPE_UNKNOWN",
		"SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE",
		"SVG_FECOMPONENTTRANSFER_TYPE_GAMMA",
		"SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY",
		"SVG_FECOMPONENTTRANSFER_TYPE_LINEAR",
		"SVG_FECOMPONENTTRANSFER_TYPE_TABLE",
		"SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN",
		"SVG_FECOMPOSITE_OPERATOR_ARITHMETIC",
		"SVG_FECOMPOSITE_OPERATOR_ATOP",
		"SVG_FECOMPOSITE_OPERATOR_IN",
		"SVG_FECOMPOSITE_OPERATOR_OUT",
		"SVG_FECOMPOSITE_OPERATOR_OVER",
		"SVG_FECOMPOSITE_OPERATOR_UNKNOWN",
		"SVG_FECOMPOSITE_OPERATOR_XOR",
		"SVG_INVALID_VALUE_ERR",
		"SVG_LENGTHTYPE_CM",
		"SVG_LENGTHTYPE_EMS",
		"SVG_LENGTHTYPE_EXS",
		"SVG_LENGTHTYPE_IN",
		"SVG_LENGTHTYPE_MM",
		"SVG_LENGTHTYPE_NUMBER",
		"SVG_LENGTHTYPE_PC",
		"SVG_LENGTHTYPE_PERCENTAGE",
		"SVG_LENGTHTYPE_PT",
		"SVG_LENGTHTYPE_PX",
		"SVG_LENGTHTYPE_UNKNOWN",
		"SVG_MARKERUNITS_STROKEWIDTH",
		"SVG_MARKERUNITS_UNKNOWN",
		"SVG_MARKERUNITS_USERSPACEONUSE",
		"SVG_MARKER_ORIENT_ANGLE",
		"SVG_MARKER_ORIENT_AUTO",
		"SVG_MARKER_ORIENT_UNKNOWN",
		"SVG_MASKTYPE_ALPHA",
		"SVG_MASKTYPE_LUMINANCE",
		"SVG_MATRIX_NOT_INVERTABLE",
		"SVG_MEETORSLICE_MEET",
		"SVG_MEETORSLICE_SLICE",
		"SVG_MEETORSLICE_UNKNOWN",
		"SVG_MORPHOLOGY_OPERATOR_DILATE",
		"SVG_MORPHOLOGY_OPERATOR_ERODE",
		"SVG_MORPHOLOGY_OPERATOR_UNKNOWN",
		"SVG_PAINTTYPE_CURRENTCOLOR",
		"SVG_PAINTTYPE_NONE",
		"SVG_PAINTTYPE_RGBCOLOR",
		"SVG_PAINTTYPE_RGBCOLOR_ICCCOLOR",
		"SVG_PAINTTYPE_UNKNOWN",
		"SVG_PAINTTYPE_URI",
		"SVG_PAINTTYPE_URI_CURRENTCOLOR",
		"SVG_PAINTTYPE_URI_NONE",
		"SVG_PAINTTYPE_URI_RGBCOLOR",
		"SVG_PAINTTYPE_URI_RGBCOLOR_ICCCOLOR",
		"SVG_PRESERVEASPECTRATIO_NONE",
		"SVG_PRESERVEASPECTRATIO_UNKNOWN",
		"SVG_PRESERVEASPECTRATIO_XMAXYMAX",
		"SVG_PRESERVEASPECTRATIO_XMAXYMID",
		"SVG_PRESERVEASPECTRATIO_XMAXYMIN",
		"SVG_PRESERVEASPECTRATIO_XMIDYMAX",
		"SVG_PRESERVEASPECTRATIO_XMIDYMID",
		"SVG_PRESERVEASPECTRATIO_XMIDYMIN",
		"SVG_PRESERVEASPECTRATIO_XMINYMAX",
		"SVG_PRESERVEASPECTRATIO_XMINYMID",
		"SVG_PRESERVEASPECTRATIO_XMINYMIN",
		"SVG_SPREADMETHOD_PAD",
		"SVG_SPREADMETHOD_REFLECT",
		"SVG_SPREADMETHOD_REPEAT",
		"SVG_SPREADMETHOD_UNKNOWN",
		"SVG_STITCHTYPE_NOSTITCH",
		"SVG_STITCHTYPE_STITCH",
		"SVG_STITCHTYPE_UNKNOWN",
		"SVG_TRANSFORM_MATRIX",
		"SVG_TRANSFORM_ROTATE",
		"SVG_TRANSFORM_SCALE",
		"SVG_TRANSFORM_SKEWX",
		"SVG_TRANSFORM_SKEWY",
		"SVG_TRANSFORM_TRANSLATE",
		"SVG_TRANSFORM_UNKNOWN",
		"SVG_TURBULENCE_TYPE_FRACTALNOISE",
		"SVG_TURBULENCE_TYPE_TURBULENCE",
		"SVG_TURBULENCE_TYPE_UNKNOWN",
		"SVG_UNIT_TYPE_OBJECTBOUNDINGBOX",
		"SVG_UNIT_TYPE_UNKNOWN",
		"SVG_UNIT_TYPE_USERSPACEONUSE",
		"SVG_WRONG_TYPE_ERR",
		"SVG_ZOOMANDPAN_DISABLE",
		"SVG_ZOOMANDPAN_MAGNIFY",
		"SVG_ZOOMANDPAN_UNKNOWN",
		"SYNTAX_ERR",
		"SavedPages",
		"Screen",
		"ScreenOrientation",
		"Script",
		"ScriptProcessorNode",
		"ScrollAreaEvent",
		"SecurityPolicyViolationEvent",
		"Selection",
		"ServiceWorker",
		"ServiceWorkerContainer",
		"ServiceWorkerRegistration",
		"SessionDescription",
		"Set",
		"ShadowRoot",
		"SharedWorker",
		"SimpleGestureEvent",
		"SpeechSynthesisEvent",
		"SpeechSynthesisUtterance",
		"StopIteration",
		"Storage",
		"StorageEvent",
		"String",
		"StyleSheet",
		"StyleSheetList",
		"SubtleCrypto",
		"Symbol",
		"SyntaxError",
		"TEMPORARY",
		"TEXTPATH_METHODTYPE_ALIGN",
		"TEXTPATH_METHODTYPE_STRETCH",
		"TEXTPATH_METHODTYPE_UNKNOWN",
		"TEXTPATH_SPACINGTYPE_AUTO",
		"TEXTPATH_SPACINGTYPE_EXACT",
		"TEXTPATH_SPACINGTYPE_UNKNOWN",
		"TEXTURE",
		"TEXTURE0",
		"TEXTURE1",
		"TEXTURE10",
		"TEXTURE11",
		"TEXTURE12",
		"TEXTURE13",
		"TEXTURE14",
		"TEXTURE15",
		"TEXTURE16",
		"TEXTURE17",
		"TEXTURE18",
		"TEXTURE19",
		"TEXTURE2",
		"TEXTURE20",
		"TEXTURE21",
		"TEXTURE22",
		"TEXTURE23",
		"TEXTURE24",
		"TEXTURE25",
		"TEXTURE26",
		"TEXTURE27",
		"TEXTURE28",
		"TEXTURE29",
		"TEXTURE3",
		"TEXTURE30",
		"TEXTURE31",
		"TEXTURE4",
		"TEXTURE5",
		"TEXTURE6",
		"TEXTURE7",
		"TEXTURE8",
		"TEXTURE9",
		"TEXTURE_2D",
		"TEXTURE_BINDING_2D",
		"TEXTURE_BINDING_CUBE_MAP",
		"TEXTURE_CUBE_MAP",
		"TEXTURE_CUBE_MAP_NEGATIVE_X",
		"TEXTURE_CUBE_MAP_NEGATIVE_Y",
		"TEXTURE_CUBE_MAP_NEGATIVE_Z",
		"TEXTURE_CUBE_MAP_POSITIVE_X",
		"TEXTURE_CUBE_MAP_POSITIVE_Y",
		"TEXTURE_CUBE_MAP_POSITIVE_Z",
		"TEXTURE_MAG_FILTER",
		"TEXTURE_MAX_ANISOTROPY_EXT",
		"TEXTURE_MIN_FILTER",
		"TEXTURE_WRAP_S",
		"TEXTURE_WRAP_T",
		"TEXT_NODE",
		"TIMEOUT",
		"TIMEOUT_ERR",
		"TOO_LARGE_ERR",
		"TRANSACTION_INACTIVE_ERR",
		"TRIANGLE",
		"TRIANGLES",
		"TRIANGLE_FAN",
		"TRIANGLE_STRIP",
		"TYPE_BACK_FORWARD",
		"TYPE_ERR",
		"TYPE_MISMATCH_ERR",
		"TYPE_NAVIGATE",
		"TYPE_RELOAD",
		"TYPE_RESERVED",
		"Text",
		"TextDecoder",
		"TextEncoder",
		"TextEvent",
		"TextMetrics",
		"TextTrack",
		"TextTrackCue",
		"TextTrackCueList",
		"TextTrackList",
		"TimeEvent",
		"TimeRanges",
		"Touch",
		"TouchEvent",
		"TouchList",
		"TrackEvent",
		"TransitionEvent",
		"TreeWalker",
		"TypeError",
		"UIEvent",
		"UNCACHED",
		"UNKNOWN_ERR",
		"UNKNOWN_RULE",
		"UNMASKED_RENDERER_WEBGL",
		"UNMASKED_VENDOR_WEBGL",
		"UNORDERED_NODE_ITERATOR_TYPE",
		"UNORDERED_NODE_SNAPSHOT_TYPE",
		"UNPACK_ALIGNMENT",
		"UNPACK_COLORSPACE_CONVERSION_WEBGL",
		"UNPACK_FLIP_Y_WEBGL",
		"UNPACK_PREMULTIPLY_ALPHA_WEBGL",
		"UNSCHEDULED_STATE",
		"UNSENT",
		"UNSIGNED_BYTE",
		"UNSIGNED_INT",
		"UNSIGNED_SHORT",
		"UNSIGNED_SHORT_4_4_4_4",
		"UNSIGNED_SHORT_5_5_5_1",
		"UNSIGNED_SHORT_5_6_5",
		"UNSPECIFIED_EVENT_TYPE_ERR",
		"UPDATEREADY",
		"URIError",
		"URL",
		"URLSearchParams",
		"URLUnencoded",
		"URL_MISMATCH_ERR",
		"UTC",
		"Uint16Array",
		"Uint32Array",
		"Uint8Array",
		"Uint8ClampedArray",
		"UserMessageHandler",
		"UserMessageHandlersNamespace",
		"UserProximityEvent",
		"VALIDATE_STATUS",
		"VALIDATION_ERR",
		"VARIABLES_RULE",
		"VENDOR",
		"VERSION",
		"VERSION_CHANGE",
		"VERSION_ERR",
		"VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",
		"VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE",
		"VERTEX_ATTRIB_ARRAY_ENABLED",
		"VERTEX_ATTRIB_ARRAY_NORMALIZED",
		"VERTEX_ATTRIB_ARRAY_POINTER",
		"VERTEX_ATTRIB_ARRAY_SIZE",
		"VERTEX_ATTRIB_ARRAY_STRIDE",
		"VERTEX_ATTRIB_ARRAY_TYPE",
		"VERTEX_SHADER",
		"VERTICAL",
		"VERTICAL_AXIS",
		"VER_ERR",
		"VIEWPORT",
		"VIEWPORT_RULE",
		"VTTCue",
		"VTTRegion",
		"ValidityState",
		"VideoStreamTrack",
		"WEBKIT_FILTER_RULE",
		"WEBKIT_KEYFRAMES_RULE",
		"WEBKIT_KEYFRAME_RULE",
		"WEBKIT_REGION_RULE",
		"WRONG_DOCUMENT_ERR",
		"WaveShaperNode",
		"WeakMap",
		"WeakSet",
		"WebGLActiveInfo",
		"WebGLBuffer",
		"WebGLContextEvent",
		"WebGLFramebuffer",
		"WebGLProgram",
		"WebGLRenderbuffer",
		"WebGLRenderingContext",
		"WebGLShader",
		"WebGLShaderPrecisionFormat",
		"WebGLTexture",
		"WebGLUniformLocation",
		"WebGLVertexArray",
		"WebKitAnimationEvent",
		"WebKitBlobBuilder",
		"WebKitCSSFilterRule",
		"WebKitCSSFilterValue",
		"WebKitCSSKeyframeRule",
		"WebKitCSSKeyframesRule",
		"WebKitCSSMatrix",
		"WebKitCSSRegionRule",
		"WebKitCSSTransformValue",
		"WebKitDataCue",
		"WebKitGamepad",
		"WebKitMediaKeyError",
		"WebKitMediaKeyMessageEvent",
		"WebKitMediaKeySession",
		"WebKitMediaKeys",
		"WebKitMediaSource",
		"WebKitMutationObserver",
		"WebKitNamespace",
		"WebKitPlaybackTargetAvailabilityEvent",
		"WebKitPoint",
		"WebKitShadowRoot",
		"WebKitSourceBuffer",
		"WebKitSourceBufferList",
		"WebKitTransitionEvent",
		"WebSocket",
		"WheelEvent",
		"Window",
		"Worker",
		"XMLDocument",
		"XMLHttpRequest",
		"XMLHttpRequestEventTarget",
		"XMLHttpRequestException",
		"XMLHttpRequestProgressEvent",
		"XMLHttpRequestUpload",
		"XMLSerializer",
		"XMLStylesheetProcessingInstruction",
		"XPathEvaluator",
		"XPathException",
		"XPathExpression",
		"XPathNSResolver",
		"XPathResult",
		"XSLTProcessor",
		"ZERO",
		"_XD0M_",
		"_YD0M_",
		"__defineGetter__",
		"__defineSetter__",
		"__lookupGetter__",
		"__lookupSetter__",
		"__opera",
		"__proto__",
		"_browserjsran",
		"a",
		"aLink",
		"abbr",
		"abort",
		"abs",
		"absolute",
		"acceleration",
		"accelerationIncludingGravity",
		"accelerator",
		"accept",
		"acceptCharset",
		"acceptNode",
		"accessKey",
		"accessKeyLabel",
		"accuracy",
		"acos",
		"acosh",
		"action",
		"actionURL",
		"active",
		"activeCues",
		"activeElement",
		"activeSourceBuffers",
		"activeSourceCount",
		"activeTexture",
		"add",
		"addBehavior",
		"addCandidate",
		"addColorStop",
		"addCue",
		"addElement",
		"addEventListener",
		"addFilter",
		"addFromString",
		"addFromUri",
		"addIceCandidate",
		"addImport",
		"addListener",
		"addNamed",
		"addPageRule",
		"addPath",
		"addPointer",
		"addRange",
		"addRegion",
		"addRule",
		"addSearchEngine",
		"addSourceBuffer",
		"addStream",
		"addTextTrack",
		"addTrack",
		"addWakeLockListener",
		"addedNodes",
		"additionalName",
		"additiveSymbols",
		"addons",
		"adoptNode",
		"adr",
		"advance",
		"alert",
		"algorithm",
		"align",
		"align-content",
		"align-items",
		"align-self",
		"alignContent",
		"alignItems",
		"alignSelf",
		"alignmentBaseline",
		"alinkColor",
		"all",
		"allowFullscreen",
		"allowedDirections",
		"alpha",
		"alt",
		"altGraphKey",
		"altHtml",
		"altKey",
		"altLeft",
		"altitude",
		"altitudeAccuracy",
		"amplitude",
		"ancestorOrigins",
		"anchor",
		"anchorNode",
		"anchorOffset",
		"anchors",
		"angle",
		"animVal",
		"animate",
		"animatedInstanceRoot",
		"animatedNormalizedPathSegList",
		"animatedPathSegList",
		"animatedPoints",
		"animation",
		"animation-delay",
		"animation-direction",
		"animation-duration",
		"animation-fill-mode",
		"animation-iteration-count",
		"animation-name",
		"animation-play-state",
		"animation-timing-function",
		"animationDelay",
		"animationDirection",
		"animationDuration",
		"animationFillMode",
		"animationIterationCount",
		"animationName",
		"animationPlayState",
		"animationStartTime",
		"animationTimingFunction",
		"animationsPaused",
		"anniversary",
		"app",
		"appCodeName",
		"appMinorVersion",
		"appName",
		"appNotifications",
		"appVersion",
		"append",
		"appendBuffer",
		"appendChild",
		"appendData",
		"appendItem",
		"appendMedium",
		"appendNamed",
		"appendRule",
		"appendStream",
		"appendWindowEnd",
		"appendWindowStart",
		"applets",
		"applicationCache",
		"apply",
		"applyElement",
		"arc",
		"arcTo",
		"archive",
		"areas",
		"arguments",
		"arrayBuffer",
		"asin",
		"asinh",
		"assert",
		"assign",
		"async",
		"atEnd",
		"atan",
		"atan2",
		"atanh",
		"atob",
		"attachEvent",
		"attachShader",
		"attachments",
		"attack",
		"attrChange",
		"attrName",
		"attributeName",
		"attributeNamespace",
		"attributes",
		"audioTracks",
		"autoIncrement",
		"autobuffer",
		"autocapitalize",
		"autocomplete",
		"autocorrect",
		"autofocus",
		"autoplay",
		"availHeight",
		"availLeft",
		"availTop",
		"availWidth",
		"availability",
		"available",
		"aversion",
		"axes",
		"axis",
		"azimuth",
		"b",
		"back",
		"backface-visibility",
		"backfaceVisibility",
		"background",
		"background-attachment",
		"background-blend-mode",
		"background-clip",
		"background-color",
		"background-image",
		"background-origin",
		"background-position",
		"background-repeat",
		"background-size",
		"backgroundAttachment",
		"backgroundBlendMode",
		"backgroundClip",
		"backgroundColor",
		"backgroundImage",
		"backgroundOrigin",
		"backgroundPosition",
		"backgroundPositionX",
		"backgroundPositionY",
		"backgroundRepeat",
		"backgroundSize",
		"badInput",
		"balance",
		"baseFrequencyX",
		"baseFrequencyY",
		"baseNode",
		"baseOffset",
		"baseURI",
		"baseVal",
		"baselineShift",
		"battery",
		"bday",
		"beginElement",
		"beginElementAt",
		"beginPath",
		"behavior",
		"behaviorCookie",
		"behaviorPart",
		"behaviorUrns",
		"beta",
		"bezierCurveTo",
		"bgColor",
		"bgProperties",
		"bias",
		"big",
		"binaryType",
		"bind",
		"bindAttribLocation",
		"bindBuffer",
		"bindFramebuffer",
		"bindRenderbuffer",
		"bindTexture",
		"blendColor",
		"blendEquation",
		"blendEquationSeparate",
		"blendFunc",
		"blendFuncSeparate",
		"blink",
		"blob",
		"blockDirection",
		"blue",
		"blur",
		"body",
		"bodyUsed",
		"bold",
		"bookmarks",
		"booleanValue",
		"border",
		"border-bottom",
		"border-bottom-color",
		"border-bottom-left-radius",
		"border-bottom-right-radius",
		"border-bottom-style",
		"border-bottom-width",
		"border-collapse",
		"border-color",
		"border-image",
		"border-image-outset",
		"border-image-repeat",
		"border-image-slice",
		"border-image-source",
		"border-image-width",
		"border-left",
		"border-left-color",
		"border-left-style",
		"border-left-width",
		"border-radius",
		"border-right",
		"border-right-color",
		"border-right-style",
		"border-right-width",
		"border-spacing",
		"border-style",
		"border-top",
		"border-top-color",
		"border-top-left-radius",
		"border-top-right-radius",
		"border-top-style",
		"border-top-width",
		"border-width",
		"borderBottom",
		"borderBottomColor",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"borderBottomStyle",
		"borderBottomWidth",
		"borderCollapse",
		"borderColor",
		"borderColorDark",
		"borderColorLight",
		"borderImage",
		"borderImageOutset",
		"borderImageRepeat",
		"borderImageSlice",
		"borderImageSource",
		"borderImageWidth",
		"borderLeft",
		"borderLeftColor",
		"borderLeftStyle",
		"borderLeftWidth",
		"borderRadius",
		"borderRight",
		"borderRightColor",
		"borderRightStyle",
		"borderRightWidth",
		"borderSpacing",
		"borderStyle",
		"borderTop",
		"borderTopColor",
		"borderTopLeftRadius",
		"borderTopRightRadius",
		"borderTopStyle",
		"borderTopWidth",
		"borderWidth",
		"bottom",
		"bottomMargin",
		"bound",
		"boundElements",
		"boundingClientRect",
		"boundingHeight",
		"boundingLeft",
		"boundingTop",
		"boundingWidth",
		"bounds",
		"box-decoration-break",
		"box-shadow",
		"box-sizing",
		"boxDecorationBreak",
		"boxShadow",
		"boxSizing",
		"breakAfter",
		"breakBefore",
		"breakInside",
		"browserLanguage",
		"btoa",
		"bubbles",
		"buffer",
		"bufferData",
		"bufferDepth",
		"bufferSize",
		"bufferSubData",
		"buffered",
		"bufferedAmount",
		"buildID",
		"buildNumber",
		"button",
		"buttonID",
		"buttons",
		"byteLength",
		"byteOffset",
		"c",
		"call",
		"caller",
		"canBeFormatted",
		"canBeMounted",
		"canBeShared",
		"canHaveChildren",
		"canHaveHTML",
		"canPlayType",
		"cancel",
		"cancelAnimationFrame",
		"cancelBubble",
		"cancelScheduledValues",
		"cancelable",
		"candidate",
		"canvas",
		"caption",
		"caption-side",
		"captionSide",
		"captureEvents",
		"captureStackTrace",
		"caretPositionFromPoint",
		"caretRangeFromPoint",
		"cast",
		"catch",
		"category",
		"cbrt",
		"cd",
		"ceil",
		"cellIndex",
		"cellPadding",
		"cellSpacing",
		"cells",
		"ch",
		"chOff",
		"chain",
		"challenge",
		"changedTouches",
		"channel",
		"channelCount",
		"channelCountMode",
		"channelInterpretation",
		"char",
		"charAt",
		"charCode",
		"charCodeAt",
		"charIndex",
		"characterSet",
		"charging",
		"chargingTime",
		"charset",
		"checkEnclosure",
		"checkFramebufferStatus",
		"checkIntersection",
		"checkValidity",
		"checked",
		"childElementCount",
		"childNodes",
		"children",
		"chrome",
		"ciphertext",
		"cite",
		"classList",
		"className",
		"classid",
		"clear",
		"clearAttributes",
		"clearColor",
		"clearData",
		"clearDepth",
		"clearImmediate",
		"clearInterval",
		"clearMarks",
		"clearMeasures",
		"clearParameters",
		"clearRect",
		"clearResourceTimings",
		"clearShadow",
		"clearStencil",
		"clearTimeout",
		"clearWatch",
		"click",
		"clickCount",
		"clientHeight",
		"clientInformation",
		"clientLeft",
		"clientRect",
		"clientRects",
		"clientTop",
		"clientWidth",
		"clientX",
		"clientY",
		"clip",
		"clip-path",
		"clip-rule",
		"clipBottom",
		"clipLeft",
		"clipPath",
		"clipPathUnits",
		"clipRight",
		"clipRule",
		"clipTop",
		"clipboardData",
		"clone",
		"cloneContents",
		"cloneNode",
		"cloneRange",
		"close",
		"closePath",
		"closed",
		"closest",
		"clz",
		"clz32",
		"cmp",
		"code",
		"codeBase",
		"codePointAt",
		"codeType",
		"colSpan",
		"collapse",
		"collapseToEnd",
		"collapseToStart",
		"collapsed",
		"collect",
		"colno",
		"color",
		"color-interpolation",
		"color-interpolation-filters",
		"colorDepth",
		"colorInterpolation",
		"colorInterpolationFilters",
		"colorMask",
		"colorType",
		"cols",
		"columnCount",
		"columnFill",
		"columnGap",
		"columnNumber",
		"columnRule",
		"columnRuleColor",
		"columnRuleStyle",
		"columnRuleWidth",
		"columnSpan",
		"columnWidth",
		"columns",
		"command",
		"commitPreferences",
		"commonAncestorContainer",
		"compact",
		"compareBoundaryPoints",
		"compareDocumentPosition",
		"compareEndPoints",
		"compareNode",
		"comparePoint",
		"compatMode",
		"compatible",
		"compile",
		"compileShader",
		"complete",
		"componentFromPoint",
		"compositionEndOffset",
		"compositionStartOffset",
		"compressedTexImage2D",
		"compressedTexSubImage2D",
		"concat",
		"conditionText",
		"coneInnerAngle",
		"coneOuterAngle",
		"coneOuterGain",
		"confirm",
		"confirmComposition",
		"confirmSiteSpecificTrackingException",
		"confirmWebWideTrackingException",
		"connect",
		"connectEnd",
		"connectStart",
		"connected",
		"connection",
		"connectionSpeed",
		"console",
		"consolidate",
		"constrictionActive",
		"constructor",
		"contactID",
		"contains",
		"containsNode",
		"content",
		"contentDocument",
		"contentEditable",
		"contentOverflow",
		"contentScriptType",
		"contentStyleType",
		"contentType",
		"contentWindow",
		"context",
		"contextMenu",
		"contextmenu",
		"continue",
		"continuous",
		"control",
		"controller",
		"controls",
		"convertToSpecifiedUnits",
		"cookie",
		"cookieEnabled",
		"coords",
		"copyFromChannel",
		"copyTexImage2D",
		"copyTexSubImage2D",
		"copyToChannel",
		"copyWithin",
		"correspondingElement",
		"correspondingUseElement",
		"cos",
		"cosh",
		"count",
		"counter-increment",
		"counter-reset",
		"counterIncrement",
		"counterReset",
		"cpuClass",
		"cpuSleepAllowed",
		"create",
		"createAnalyser",
		"createAnswer",
		"createAttribute",
		"createAttributeNS",
		"createBiquadFilter",
		"createBuffer",
		"createBufferSource",
		"createCDATASection",
		"createCSSStyleSheet",
		"createCaption",
		"createChannelMerger",
		"createChannelSplitter",
		"createComment",
		"createContextualFragment",
		"createControlRange",
		"createConvolver",
		"createDTMFSender",
		"createDataChannel",
		"createDelay",
		"createDelayNode",
		"createDocument",
		"createDocumentFragment",
		"createDocumentType",
		"createDynamicsCompressor",
		"createElement",
		"createElementNS",
		"createEntityReference",
		"createEvent",
		"createEventObject",
		"createExpression",
		"createFramebuffer",
		"createFunction",
		"createGain",
		"createGainNode",
		"createHTMLDocument",
		"createImageBitmap",
		"createImageData",
		"createIndex",
		"createJavaScriptNode",
		"createLinearGradient",
		"createMediaElementSource",
		"createMediaKeys",
		"createMediaStreamDestination",
		"createMediaStreamSource",
		"createMutableFile",
		"createNSResolver",
		"createNodeIterator",
		"createNotification",
		"createObjectStore",
		"createObjectURL",
		"createOffer",
		"createOscillator",
		"createPanner",
		"createPattern",
		"createPeriodicWave",
		"createPopup",
		"createProcessingInstruction",
		"createProgram",
		"createRadialGradient",
		"createRange",
		"createRangeCollection",
		"createRenderbuffer",
		"createSVGAngle",
		"createSVGLength",
		"createSVGMatrix",
		"createSVGNumber",
		"createSVGPathSegArcAbs",
		"createSVGPathSegArcRel",
		"createSVGPathSegClosePath",
		"createSVGPathSegCurvetoCubicAbs",
		"createSVGPathSegCurvetoCubicRel",
		"createSVGPathSegCurvetoCubicSmoothAbs",
		"createSVGPathSegCurvetoCubicSmoothRel",
		"createSVGPathSegCurvetoQuadraticAbs",
		"createSVGPathSegCurvetoQuadraticRel",
		"createSVGPathSegCurvetoQuadraticSmoothAbs",
		"createSVGPathSegCurvetoQuadraticSmoothRel",
		"createSVGPathSegLinetoAbs",
		"createSVGPathSegLinetoHorizontalAbs",
		"createSVGPathSegLinetoHorizontalRel",
		"createSVGPathSegLinetoRel",
		"createSVGPathSegLinetoVerticalAbs",
		"createSVGPathSegLinetoVerticalRel",
		"createSVGPathSegMovetoAbs",
		"createSVGPathSegMovetoRel",
		"createSVGPoint",
		"createSVGRect",
		"createSVGTransform",
		"createSVGTransformFromMatrix",
		"createScriptProcessor",
		"createSession",
		"createShader",
		"createShadowRoot",
		"createStereoPanner",
		"createStyleSheet",
		"createTBody",
		"createTFoot",
		"createTHead",
		"createTextNode",
		"createTextRange",
		"createTexture",
		"createTouch",
		"createTouchList",
		"createTreeWalker",
		"createWaveShaper",
		"creationTime",
		"crossOrigin",
		"crypto",
		"csi",
		"cssFloat",
		"cssRules",
		"cssText",
		"cssValueType",
		"ctrlKey",
		"ctrlLeft",
		"cues",
		"cullFace",
		"currentNode",
		"currentPage",
		"currentScale",
		"currentScript",
		"currentSrc",
		"currentState",
		"currentStyle",
		"currentTarget",
		"currentTime",
		"currentTranslate",
		"currentView",
		"cursor",
		"curve",
		"customError",
		"cx",
		"cy",
		"d",
		"data",
		"dataFld",
		"dataFormatAs",
		"dataPageSize",
		"dataSrc",
		"dataTransfer",
		"database",
		"dataset",
		"dateTime",
		"db",
		"debug",
		"debuggerEnabled",
		"declare",
		"decode",
		"decodeAudioData",
		"decodeURI",
		"decodeURIComponent",
		"decrypt",
		"default",
		"defaultCharset",
		"defaultChecked",
		"defaultMuted",
		"defaultPlaybackRate",
		"defaultPrevented",
		"defaultSelected",
		"defaultStatus",
		"defaultURL",
		"defaultValue",
		"defaultView",
		"defaultstatus",
		"defer",
		"defineMagicFunction",
		"defineMagicVariable",
		"defineProperties",
		"defineProperty",
		"delayTime",
		"delete",
		"deleteBuffer",
		"deleteCaption",
		"deleteCell",
		"deleteContents",
		"deleteData",
		"deleteDatabase",
		"deleteFramebuffer",
		"deleteFromDocument",
		"deleteIndex",
		"deleteMedium",
		"deleteObjectStore",
		"deleteProgram",
		"deleteRenderbuffer",
		"deleteRow",
		"deleteRule",
		"deleteShader",
		"deleteTFoot",
		"deleteTHead",
		"deleteTexture",
		"deliverChangeRecords",
		"delivery",
		"deliveryInfo",
		"deliveryStatus",
		"deliveryTimestamp",
		"delta",
		"deltaMode",
		"deltaX",
		"deltaY",
		"deltaZ",
		"depthFunc",
		"depthMask",
		"depthRange",
		"deriveBits",
		"deriveKey",
		"description",
		"deselectAll",
		"designMode",
		"destination",
		"destinationURL",
		"detach",
		"detachEvent",
		"detachShader",
		"detail",
		"detune",
		"devicePixelRatio",
		"deviceXDPI",
		"deviceYDPI",
		"diffuseConstant",
		"digest",
		"dimensions",
		"dir",
		"dirName",
		"direction",
		"dirxml",
		"disable",
		"disableVertexAttribArray",
		"disabled",
		"dischargingTime",
		"disconnect",
		"dispatchEvent",
		"display",
		"distanceModel",
		"divisor",
		"djsapi",
		"djsproxy",
		"doImport",
		"doNotTrack",
		"doScroll",
		"doctype",
		"document",
		"documentElement",
		"documentMode",
		"documentURI",
		"dolphin",
		"dolphinGameCenter",
		"dolphininfo",
		"dolphinmeta",
		"domComplete",
		"domContentLoadedEventEnd",
		"domContentLoadedEventStart",
		"domInteractive",
		"domLoading",
		"domain",
		"domainLookupEnd",
		"domainLookupStart",
		"dominant-baseline",
		"dominantBaseline",
		"done",
		"dopplerFactor",
		"download",
		"dragDrop",
		"draggable",
		"drawArrays",
		"drawArraysInstancedANGLE",
		"drawCustomFocusRing",
		"drawElements",
		"drawElementsInstancedANGLE",
		"drawFocusIfNeeded",
		"drawImage",
		"drawImageFromRect",
		"drawSystemFocusRing",
		"drawingBufferHeight",
		"drawingBufferWidth",
		"dropEffect",
		"droppedVideoFrames",
		"dropzone",
		"dump",
		"duplicate",
		"duration",
		"dvname",
		"dvnum",
		"dx",
		"dy",
		"dynsrc",
		"e",
		"edgeMode",
		"effectAllowed",
		"elapsedTime",
		"elementFromPoint",
		"elements",
		"elevation",
		"ellipse",
		"email",
		"embeds",
		"empty",
		"empty-cells",
		"emptyCells",
		"enable",
		"enableBackground",
		"enableStyleSheetsForSet",
		"enableVertexAttribArray",
		"enabled",
		"enabledPlugin",
		"encode",
		"encodeURI",
		"encodeURIComponent",
		"encoding",
		"encrypt",
		"enctype",
		"end",
		"endContainer",
		"endElement",
		"endElementAt",
		"endOfStream",
		"endOffset",
		"endTime",
		"ended",
		"endsWith",
		"entities",
		"entries",
		"entryType",
		"enumerate",
		"enumerateEditable",
		"error",
		"errorCode",
		"escape",
		"eval",
		"evaluate",
		"event",
		"eventPhase",
		"every",
		"exception",
		"exec",
		"execCommand",
		"execCommandShowHelp",
		"execScript",
		"exitFullscreen",
		"exitPointerLock",
		"exp",
		"expand",
		"expandEntityReferences",
		"expando",
		"expansion",
		"expiryDate",
		"explicitOriginalTarget",
		"expm1",
		"exponent",
		"exponentialRampToValueAtTime",
		"exportKey",
		"extend",
		"extensions",
		"extentNode",
		"extentOffset",
		"external",
		"externalResourcesRequired",
		"extractContents",
		"extractable",
		"f",
		"face",
		"factoryReset",
		"fallback",
		"familyName",
		"farthestViewportElement",
		"fastSeek",
		"fatal",
		"fetch",
		"fetchStart",
		"fftSize",
		"fgColor",
		"fileCreatedDate",
		"fileHandle",
		"fileModifiedDate",
		"fileName",
		"fileSize",
		"fileUpdatedDate",
		"filename",
		"files",
		"fill",
		"fill-opacity",
		"fill-rule",
		"fillOpacity",
		"fillRect",
		"fillRule",
		"fillStyle",
		"fillText",
		"filter",
		"filterResX",
		"filterResY",
		"filterUnits",
		"filters",
		"find",
		"findIndex",
		"findRule",
		"findText",
		"finish",
		"fireEvent",
		"firstChild",
		"firstElementChild",
		"firstPage",
		"fixed",
		"flex",
		"flex-basis",
		"flex-direction",
		"flex-flow",
		"flex-grow",
		"flex-shrink",
		"flex-wrap",
		"flexBasis",
		"flexDirection",
		"flexFlow",
		"flexGrow",
		"flexShrink",
		"flexWrap",
		"flipX",
		"flipY",
		"float",
		"flood-color",
		"flood-opacity",
		"floodColor",
		"floodOpacity",
		"floor",
		"flush",
		"focus",
		"focusNode",
		"focusOffset",
		"font",
		"font-family",
		"font-feature-settings",
		"font-kerning",
		"font-language-override",
		"font-size",
		"font-size-adjust",
		"font-stretch",
		"font-style",
		"font-synthesis",
		"font-variant",
		"font-variant-alternates",
		"font-variant-caps",
		"font-variant-east-asian",
		"font-variant-ligatures",
		"font-variant-numeric",
		"font-variant-position",
		"font-weight",
		"fontFamily",
		"fontFeatureSettings",
		"fontKerning",
		"fontLanguageOverride",
		"fontSize",
		"fontSizeAdjust",
		"fontSmoothingEnabled",
		"fontStretch",
		"fontStyle",
		"fontSynthesis",
		"fontVariant",
		"fontVariantAlternates",
		"fontVariantCaps",
		"fontVariantEastAsian",
		"fontVariantLigatures",
		"fontVariantNumeric",
		"fontVariantPosition",
		"fontWeight",
		"fontcolor",
		"fonts",
		"fontsize",
		"for",
		"forEach",
		"forceRedraw",
		"form",
		"formAction",
		"formEnctype",
		"formMethod",
		"formNoValidate",
		"formTarget",
		"format",
		"forms",
		"forward",
		"fr",
		"frame",
		"frameBorder",
		"frameElement",
		"frameSpacing",
		"framebufferRenderbuffer",
		"framebufferTexture2D",
		"frames",
		"freeSpace",
		"freeze",
		"frequency",
		"frequencyBinCount",
		"from",
		"fromCharCode",
		"fromCodePoint",
		"fromElement",
		"frontFace",
		"fround",
		"fullScreen",
		"fullscreenElement",
		"fullscreenEnabled",
		"fx",
		"fy",
		"gain",
		"gamepad",
		"gamma",
		"genderIdentity",
		"generateKey",
		"generateMipmap",
		"generateRequest",
		"geolocation",
		"gestureObject",
		"get",
		"getActiveAttrib",
		"getActiveUniform",
		"getAdjacentText",
		"getAll",
		"getAllResponseHeaders",
		"getAsFile",
		"getAsString",
		"getAttachedShaders",
		"getAttribLocation",
		"getAttribute",
		"getAttributeNS",
		"getAttributeNode",
		"getAttributeNodeNS",
		"getAudioTracks",
		"getBBox",
		"getBattery",
		"getBlob",
		"getBookmark",
		"getBoundingClientRect",
		"getBufferParameter",
		"getByteFrequencyData",
		"getByteTimeDomainData",
		"getCSSCanvasContext",
		"getCTM",
		"getCandidateWindowClientRect",
		"getChannelData",
		"getCharNumAtPosition",
		"getClientRect",
		"getClientRects",
		"getCompositionAlternatives",
		"getComputedStyle",
		"getComputedTextLength",
		"getConfiguration",
		"getContext",
		"getContextAttributes",
		"getCounterValue",
		"getCueAsHTML",
		"getCueById",
		"getCurrentPosition",
		"getCurrentTime",
		"getData",
		"getDatabaseNames",
		"getDate",
		"getDay",
		"getDefaultComputedStyle",
		"getDestinationInsertionPoints",
		"getDistributedNodes",
		"getEditable",
		"getElementById",
		"getElementsByClassName",
		"getElementsByName",
		"getElementsByTagName",
		"getElementsByTagNameNS",
		"getEnclosureList",
		"getEndPositionOfChar",
		"getEntries",
		"getEntriesByName",
		"getEntriesByType",
		"getError",
		"getExtension",
		"getExtentOfChar",
		"getFeature",
		"getFile",
		"getFloat32",
		"getFloat64",
		"getFloatFrequencyData",
		"getFloatTimeDomainData",
		"getFloatValue",
		"getFramebufferAttachmentParameter",
		"getFrequencyResponse",
		"getFullYear",
		"getGamepads",
		"getHours",
		"getImageData",
		"getInt16",
		"getInt32",
		"getInt8",
		"getIntersectionList",
		"getItem",
		"getItems",
		"getKey",
		"getLineDash",
		"getLocalStreams",
		"getMarks",
		"getMatchedCSSRules",
		"getMeasures",
		"getMetadata",
		"getMilliseconds",
		"getMinutes",
		"getModifierState",
		"getMonth",
		"getNamedItem",
		"getNamedItemNS",
		"getNotifier",
		"getNumberOfChars",
		"getOverrideHistoryNavigationMode",
		"getOverrideStyle",
		"getOwnPropertyDescriptor",
		"getOwnPropertyNames",
		"getOwnPropertySymbols",
		"getParameter",
		"getPathSegAtLength",
		"getPointAtLength",
		"getPreference",
		"getPreferenceDefault",
		"getPresentationAttribute",
		"getPreventDefault",
		"getProgramInfoLog",
		"getProgramParameter",
		"getPropertyCSSValue",
		"getPropertyPriority",
		"getPropertyShorthand",
		"getPropertyValue",
		"getPrototypeOf",
		"getRGBColorValue",
		"getRandomValues",
		"getRangeAt",
		"getReceivers",
		"getRectValue",
		"getRegistration",
		"getRemoteStreams",
		"getRenderbufferParameter",
		"getResponseHeader",
		"getRoot",
		"getRotationOfChar",
		"getSVGDocument",
		"getScreenCTM",
		"getSeconds",
		"getSelection",
		"getSenders",
		"getShaderInfoLog",
		"getShaderParameter",
		"getShaderPrecisionFormat",
		"getShaderSource",
		"getSimpleDuration",
		"getSiteIcons",
		"getSources",
		"getSpeculativeParserUrls",
		"getStartPositionOfChar",
		"getStartTime",
		"getStats",
		"getStorageUpdates",
		"getStreamById",
		"getStringValue",
		"getSubStringLength",
		"getSubscription",
		"getSupportedExtensions",
		"getTexParameter",
		"getTime",
		"getTimezoneOffset",
		"getTotalLength",
		"getTrackById",
		"getTracks",
		"getTransformToElement",
		"getUTCDate",
		"getUTCDay",
		"getUTCFullYear",
		"getUTCHours",
		"getUTCMilliseconds",
		"getUTCMinutes",
		"getUTCMonth",
		"getUTCSeconds",
		"getUint16",
		"getUint32",
		"getUint8",
		"getUniform",
		"getUniformLocation",
		"getUserMedia",
		"getValues",
		"getVarDate",
		"getVariableValue",
		"getVertexAttrib",
		"getVertexAttribOffset",
		"getVideoPlaybackQuality",
		"getVideoTracks",
		"getWakeLockState",
		"getYear",
		"givenName",
		"global",
		"globalAlpha",
		"globalCompositeOperation",
		"glyphOrientationHorizontal",
		"glyphOrientationVertical",
		"glyphRef",
		"go",
		"gradientTransform",
		"gradientUnits",
		"grammars",
		"green",
		"group",
		"groupCollapsed",
		"groupEnd",
		"hardwareConcurrency",
		"has",
		"hasAttribute",
		"hasAttributeNS",
		"hasAttributes",
		"hasChildNodes",
		"hasComposition",
		"hasExtension",
		"hasFeature",
		"hasFocus",
		"hasLayout",
		"hasOwnProperty",
		"hash",
		"head",
		"headers",
		"heading",
		"height",
		"hidden",
		"hide",
		"hideFocus",
		"high",
		"hint",
		"history",
		"honorificPrefix",
		"honorificSuffix",
		"horizontalOverflow",
		"host",
		"hostname",
		"href",
		"hreflang",
		"hspace",
		"html5TagCheckInerface",
		"htmlFor",
		"htmlText",
		"httpEquiv",
		"hwTimestamp",
		"hypot",
		"iccId",
		"iceConnectionState",
		"iceGatheringState",
		"icon",
		"id",
		"identifier",
		"identity",
		"ignoreBOM",
		"ignoreCase",
		"image-orientation",
		"image-rendering",
		"imageOrientation",
		"imageRendering",
		"images",
		"ime-mode",
		"imeMode",
		"implementation",
		"importKey",
		"importNode",
		"importStylesheet",
		"imports",
		"impp",
		"imul",
		"in1",
		"in2",
		"inBandMetadataTrackDispatchType",
		"inRange",
		"includes",
		"incremental",
		"indeterminate",
		"index",
		"indexNames",
		"indexOf",
		"indexedDB",
		"inertiaDestinationX",
		"inertiaDestinationY",
		"info",
		"init",
		"initAnimationEvent",
		"initBeforeLoadEvent",
		"initClipboardEvent",
		"initCloseEvent",
		"initCommandEvent",
		"initCompositionEvent",
		"initCustomEvent",
		"initData",
		"initDeviceMotionEvent",
		"initDeviceOrientationEvent",
		"initDragEvent",
		"initErrorEvent",
		"initEvent",
		"initFocusEvent",
		"initGestureEvent",
		"initHashChangeEvent",
		"initKeyEvent",
		"initKeyboardEvent",
		"initMSManipulationEvent",
		"initMessageEvent",
		"initMouseEvent",
		"initMouseScrollEvent",
		"initMouseWheelEvent",
		"initMutationEvent",
		"initNSMouseEvent",
		"initOverflowEvent",
		"initPageEvent",
		"initPageTransitionEvent",
		"initPointerEvent",
		"initPopStateEvent",
		"initProgressEvent",
		"initScrollAreaEvent",
		"initSimpleGestureEvent",
		"initStorageEvent",
		"initTextEvent",
		"initTimeEvent",
		"initTouchEvent",
		"initTransitionEvent",
		"initUIEvent",
		"initWebKitAnimationEvent",
		"initWebKitTransitionEvent",
		"initWebKitWheelEvent",
		"initWheelEvent",
		"initialTime",
		"initialize",
		"initiatorType",
		"inner",
		"innerHTML",
		"innerHeight",
		"innerText",
		"innerWidth",
		"input",
		"inputBuffer",
		"inputEncoding",
		"inputMethod",
		"insertAdjacentElement",
		"insertAdjacentHTML",
		"insertAdjacentText",
		"insertBefore",
		"insertCell",
		"insertData",
		"insertItemBefore",
		"insertNode",
		"insertRow",
		"insertRule",
		"instanceRoot",
		"intercept",
		"interimResults",
		"internalSubset",
		"intersectsNode",
		"interval",
		"invalidIteratorState",
		"inverse",
		"invertSelf",
		"is",
		"is2D",
		"isAlternate",
		"isArray",
		"isBingCurrentSearchDefault",
		"isBuffer",
		"isCandidateWindowVisible",
		"isChar",
		"isCollapsed",
		"isComposing",
		"isContentEditable",
		"isContentHandlerRegistered",
		"isContextLost",
		"isDefaultNamespace",
		"isDisabled",
		"isEnabled",
		"isEqual",
		"isEqualNode",
		"isExtensible",
		"isFinite",
		"isFramebuffer",
		"isFrozen",
		"isGenerator",
		"isId",
		"isInjected",
		"isInteger",
		"isMap",
		"isMultiLine",
		"isNaN",
		"isOpen",
		"isPointInFill",
		"isPointInPath",
		"isPointInRange",
		"isPointInStroke",
		"isPrefAlternate",
		"isPrimary",
		"isProgram",
		"isPropertyImplicit",
		"isProtocolHandlerRegistered",
		"isPrototypeOf",
		"isRenderbuffer",
		"isSafeInteger",
		"isSameNode",
		"isSealed",
		"isShader",
		"isSupported",
		"isTextEdit",
		"isTexture",
		"isTrusted",
		"isTypeSupported",
		"isView",
		"isolation",
		"italics",
		"item",
		"itemId",
		"itemProp",
		"itemRef",
		"itemScope",
		"itemType",
		"itemValue",
		"iterateNext",
		"iterator",
		"javaEnabled",
		"jobTitle",
		"join",
		"json",
		"justify-content",
		"justifyContent",
		"k1",
		"k2",
		"k3",
		"k4",
		"kernelMatrix",
		"kernelUnitLengthX",
		"kernelUnitLengthY",
		"kerning",
		"key",
		"keyCode",
		"keyFor",
		"keyIdentifier",
		"keyLightEnabled",
		"keyLocation",
		"keyPath",
		"keySystem",
		"keyText",
		"keyUsage",
		"keys",
		"keytype",
		"kind",
		"knee",
		"label",
		"labels",
		"lang",
		"language",
		"languages",
		"largeArcFlag",
		"lastChild",
		"lastElementChild",
		"lastEventId",
		"lastIndex",
		"lastIndexOf",
		"lastMatch",
		"lastMessageSubject",
		"lastMessageType",
		"lastModified",
		"lastModifiedDate",
		"lastPage",
		"lastParen",
		"lastState",
		"lastStyleSheetSet",
		"latitude",
		"layerX",
		"layerY",
		"layoutFlow",
		"layoutGrid",
		"layoutGridChar",
		"layoutGridLine",
		"layoutGridMode",
		"layoutGridType",
		"lbound",
		"left",
		"leftContext",
		"leftMargin",
		"length",
		"lengthAdjust",
		"lengthComputable",
		"letter-spacing",
		"letterSpacing",
		"level",
		"lighting-color",
		"lightingColor",
		"limitingConeAngle",
		"line",
		"line-height",
		"lineAlign",
		"lineBreak",
		"lineCap",
		"lineDashOffset",
		"lineHeight",
		"lineJoin",
		"lineNumber",
		"lineTo",
		"lineWidth",
		"linearRampToValueAtTime",
		"lineno",
		"link",
		"linkColor",
		"linkProgram",
		"links",
		"list",
		"list-style",
		"list-style-image",
		"list-style-position",
		"list-style-type",
		"listStyle",
		"listStyleImage",
		"listStylePosition",
		"listStyleType",
		"listener",
		"load",
		"loadEventEnd",
		"loadEventStart",
		"loadTimes",
		"loaded",
		"localDescription",
		"localName",
		"localStorage",
		"locale",
		"localeCompare",
		"location",
		"locationbar",
		"lock",
		"lockedFile",
		"log",
		"log10",
		"log1p",
		"log2",
		"logicalXDPI",
		"logicalYDPI",
		"longDesc",
		"longitude",
		"lookupNamespaceURI",
		"lookupPrefix",
		"loop",
		"loopEnd",
		"loopStart",
		"looping",
		"low",
		"lower",
		"lowerBound",
		"lowerOpen",
		"lowsrc",
		"m11",
		"m12",
		"m13",
		"m14",
		"m21",
		"m22",
		"m23",
		"m24",
		"m31",
		"m32",
		"m33",
		"m34",
		"m41",
		"m42",
		"m43",
		"m44",
		"manifest",
		"map",
		"mapping",
		"margin",
		"margin-bottom",
		"margin-left",
		"margin-right",
		"margin-top",
		"marginBottom",
		"marginHeight",
		"marginLeft",
		"marginRight",
		"marginTop",
		"marginWidth",
		"mark",
		"marker",
		"marker-end",
		"marker-mid",
		"marker-offset",
		"marker-start",
		"markerEnd",
		"markerHeight",
		"markerMid",
		"markerOffset",
		"markerStart",
		"markerUnits",
		"markerWidth",
		"marks",
		"mask",
		"mask-type",
		"maskContentUnits",
		"maskType",
		"maskUnits",
		"match",
		"matchMedia",
		"matchMedium",
		"matches",
		"matrix",
		"matrixTransform",
		"max",
		"max-height",
		"max-width",
		"maxAlternatives",
		"maxChannelCount",
		"maxConnectionsPerServer",
		"maxDecibels",
		"maxDistance",
		"maxHeight",
		"maxLength",
		"maxTouchPoints",
		"maxValue",
		"maxWidth",
		"measure",
		"measureText",
		"media",
		"mediaDevices",
		"mediaElement",
		"mediaGroup",
		"mediaKeys",
		"mediaText",
		"meetOrSlice",
		"memory",
		"menubar",
		"mergeAttributes",
		"message",
		"messageClass",
		"messageHandlers",
		"metaKey",
		"method",
		"mimeType",
		"mimeTypes",
		"min",
		"min-height",
		"min-width",
		"minDecibels",
		"minHeight",
		"minValue",
		"minWidth",
		"miterLimit",
		"mix-blend-mode",
		"mixBlendMode",
		"mode",
		"modify",
		"mount",
		"move",
		"moveBy",
		"moveEnd",
		"moveFirst",
		"moveFocusDown",
		"moveFocusLeft",
		"moveFocusRight",
		"moveFocusUp",
		"moveNext",
		"moveRow",
		"moveStart",
		"moveTo",
		"moveToBookmark",
		"moveToElementText",
		"moveToPoint",
		"mozAdd",
		"mozAnimationStartTime",
		"mozAnon",
		"mozApps",
		"mozAudioCaptured",
		"mozAudioChannelType",
		"mozAutoplayEnabled",
		"mozCancelAnimationFrame",
		"mozCancelFullScreen",
		"mozCancelRequestAnimationFrame",
		"mozCaptureStream",
		"mozCaptureStreamUntilEnded",
		"mozClearDataAt",
		"mozContact",
		"mozContacts",
		"mozCreateFileHandle",
		"mozCurrentTransform",
		"mozCurrentTransformInverse",
		"mozCursor",
		"mozDash",
		"mozDashOffset",
		"mozDecodedFrames",
		"mozExitPointerLock",
		"mozFillRule",
		"mozFragmentEnd",
		"mozFrameDelay",
		"mozFullScreen",
		"mozFullScreenElement",
		"mozFullScreenEnabled",
		"mozGetAll",
		"mozGetAllKeys",
		"mozGetAsFile",
		"mozGetDataAt",
		"mozGetMetadata",
		"mozGetUserMedia",
		"mozHasAudio",
		"mozHasItem",
		"mozHidden",
		"mozImageSmoothingEnabled",
		"mozIndexedDB",
		"mozInnerScreenX",
		"mozInnerScreenY",
		"mozInputSource",
		"mozIsTextField",
		"mozItem",
		"mozItemCount",
		"mozItems",
		"mozLength",
		"mozLockOrientation",
		"mozMatchesSelector",
		"mozMovementX",
		"mozMovementY",
		"mozOpaque",
		"mozOrientation",
		"mozPaintCount",
		"mozPaintedFrames",
		"mozParsedFrames",
		"mozPay",
		"mozPointerLockElement",
		"mozPresentedFrames",
		"mozPreservesPitch",
		"mozPressure",
		"mozPrintCallback",
		"mozRTCIceCandidate",
		"mozRTCPeerConnection",
		"mozRTCSessionDescription",
		"mozRemove",
		"mozRequestAnimationFrame",
		"mozRequestFullScreen",
		"mozRequestPointerLock",
		"mozSetDataAt",
		"mozSetImageElement",
		"mozSourceNode",
		"mozSrcObject",
		"mozSystem",
		"mozTCPSocket",
		"mozTextStyle",
		"mozTypesAt",
		"mozUnlockOrientation",
		"mozUserCancelled",
		"mozVisibilityState",
		"msAnimation",
		"msAnimationDelay",
		"msAnimationDirection",
		"msAnimationDuration",
		"msAnimationFillMode",
		"msAnimationIterationCount",
		"msAnimationName",
		"msAnimationPlayState",
		"msAnimationStartTime",
		"msAnimationTimingFunction",
		"msBackfaceVisibility",
		"msBlockProgression",
		"msCSSOMElementFloatMetrics",
		"msCaching",
		"msCachingEnabled",
		"msCancelRequestAnimationFrame",
		"msCapsLockWarningOff",
		"msClearImmediate",
		"msClose",
		"msContentZoomChaining",
		"msContentZoomFactor",
		"msContentZoomLimit",
		"msContentZoomLimitMax",
		"msContentZoomLimitMin",
		"msContentZoomSnap",
		"msContentZoomSnapPoints",
		"msContentZoomSnapType",
		"msContentZooming",
		"msConvertURL",
		"msCrypto",
		"msDoNotTrack",
		"msElementsFromPoint",
		"msElementsFromRect",
		"msExitFullscreen",
		"msExtendedCode",
		"msFillRule",
		"msFirstPaint",
		"msFlex",
		"msFlexAlign",
		"msFlexDirection",
		"msFlexFlow",
		"msFlexItemAlign",
		"msFlexLinePack",
		"msFlexNegative",
		"msFlexOrder",
		"msFlexPack",
		"msFlexPositive",
		"msFlexPreferredSize",
		"msFlexWrap",
		"msFlowFrom",
		"msFlowInto",
		"msFontFeatureSettings",
		"msFullscreenElement",
		"msFullscreenEnabled",
		"msGetInputContext",
		"msGetRegionContent",
		"msGetUntransformedBounds",
		"msGraphicsTrustStatus",
		"msGridColumn",
		"msGridColumnAlign",
		"msGridColumnSpan",
		"msGridColumns",
		"msGridRow",
		"msGridRowAlign",
		"msGridRowSpan",
		"msGridRows",
		"msHidden",
		"msHighContrastAdjust",
		"msHyphenateLimitChars",
		"msHyphenateLimitLines",
		"msHyphenateLimitZone",
		"msHyphens",
		"msImageSmoothingEnabled",
		"msImeAlign",
		"msIndexedDB",
		"msInterpolationMode",
		"msIsStaticHTML",
		"msKeySystem",
		"msKeys",
		"msLaunchUri",
		"msLockOrientation",
		"msManipulationViewsEnabled",
		"msMatchMedia",
		"msMatchesSelector",
		"msMaxTouchPoints",
		"msOrientation",
		"msOverflowStyle",
		"msPerspective",
		"msPerspectiveOrigin",
		"msPlayToDisabled",
		"msPlayToPreferredSourceUri",
		"msPlayToPrimary",
		"msPointerEnabled",
		"msRegionOverflow",
		"msReleasePointerCapture",
		"msRequestAnimationFrame",
		"msRequestFullscreen",
		"msSaveBlob",
		"msSaveOrOpenBlob",
		"msScrollChaining",
		"msScrollLimit",
		"msScrollLimitXMax",
		"msScrollLimitXMin",
		"msScrollLimitYMax",
		"msScrollLimitYMin",
		"msScrollRails",
		"msScrollSnapPointsX",
		"msScrollSnapPointsY",
		"msScrollSnapType",
		"msScrollSnapX",
		"msScrollSnapY",
		"msScrollTranslation",
		"msSetImmediate",
		"msSetMediaKeys",
		"msSetPointerCapture",
		"msTextCombineHorizontal",
		"msTextSizeAdjust",
		"msToBlob",
		"msTouchAction",
		"msTouchSelect",
		"msTraceAsyncCallbackCompleted",
		"msTraceAsyncCallbackStarting",
		"msTraceAsyncOperationCompleted",
		"msTraceAsyncOperationStarting",
		"msTransform",
		"msTransformOrigin",
		"msTransformStyle",
		"msTransition",
		"msTransitionDelay",
		"msTransitionDuration",
		"msTransitionProperty",
		"msTransitionTimingFunction",
		"msUnlockOrientation",
		"msUpdateAsyncCallbackRelation",
		"msUserSelect",
		"msVisibilityState",
		"msWrapFlow",
		"msWrapMargin",
		"msWrapThrough",
		"msWriteProfilerMark",
		"msZoom",
		"msZoomTo",
		"mt",
		"multiEntry",
		"multiSelectionObj",
		"multiline",
		"multiple",
		"multiply",
		"multiplySelf",
		"mutableFile",
		"muted",
		"n",
		"name",
		"nameProp",
		"namedItem",
		"namedRecordset",
		"names",
		"namespaceURI",
		"namespaces",
		"naturalHeight",
		"naturalWidth",
		"navigate",
		"navigation",
		"navigationMode",
		"navigationStart",
		"navigator",
		"near",
		"nearestViewportElement",
		"negative",
		"netscape",
		"networkState",
		"newScale",
		"newTranslate",
		"newURL",
		"newValue",
		"newValueSpecifiedUnits",
		"newVersion",
		"newhome",
		"next",
		"nextElementSibling",
		"nextNode",
		"nextPage",
		"nextSibling",
		"nickname",
		"noHref",
		"noResize",
		"noShade",
		"noValidate",
		"noWrap",
		"nodeName",
		"nodeType",
		"nodeValue",
		"normalize",
		"normalizedPathSegList",
		"notationName",
		"notations",
		"note",
		"noteGrainOn",
		"noteOff",
		"noteOn",
		"now",
		"numOctaves",
		"number",
		"numberOfChannels",
		"numberOfInputs",
		"numberOfItems",
		"numberOfOutputs",
		"numberValue",
		"oMatchesSelector",
		"object",
		"object-fit",
		"object-position",
		"objectFit",
		"objectPosition",
		"objectStore",
		"objectStoreNames",
		"observe",
		"of",
		"offscreenBuffering",
		"offset",
		"offsetHeight",
		"offsetLeft",
		"offsetNode",
		"offsetParent",
		"offsetTop",
		"offsetWidth",
		"offsetX",
		"offsetY",
		"ok",
		"oldURL",
		"oldValue",
		"oldVersion",
		"olderShadowRoot",
		"onLine",
		"onabort",
		"onactivate",
		"onactive",
		"onaddstream",
		"onaddtrack",
		"onafterprint",
		"onafterscriptexecute",
		"onafterupdate",
		"onaudioend",
		"onaudioprocess",
		"onaudiostart",
		"onautocomplete",
		"onautocompleteerror",
		"onbeforeactivate",
		"onbeforecopy",
		"onbeforecut",
		"onbeforedeactivate",
		"onbeforeeditfocus",
		"onbeforepaste",
		"onbeforeprint",
		"onbeforescriptexecute",
		"onbeforeunload",
		"onbeforeupdate",
		"onblocked",
		"onblur",
		"onbounce",
		"onboundary",
		"oncached",
		"oncancel",
		"oncandidatewindowhide",
		"oncandidatewindowshow",
		"oncandidatewindowupdate",
		"oncanplay",
		"oncanplaythrough",
		"oncellchange",
		"onchange",
		"onchargingchange",
		"onchargingtimechange",
		"onchecking",
		"onclick",
		"onclose",
		"oncompassneedscalibration",
		"oncomplete",
		"oncontextmenu",
		"oncontrolselect",
		"oncopy",
		"oncuechange",
		"oncut",
		"ondataavailable",
		"ondatachannel",
		"ondatasetchanged",
		"ondatasetcomplete",
		"ondblclick",
		"ondeactivate",
		"ondevicelight",
		"ondevicemotion",
		"ondeviceorientation",
		"ondeviceproximity",
		"ondischargingtimechange",
		"ondisplay",
		"ondownloading",
		"ondrag",
		"ondragend",
		"ondragenter",
		"ondragleave",
		"ondragover",
		"ondragstart",
		"ondrop",
		"ondurationchange",
		"onemptied",
		"onencrypted",
		"onend",
		"onended",
		"onenter",
		"onerror",
		"onerrorupdate",
		"onexit",
		"onfilterchange",
		"onfinish",
		"onfocus",
		"onfocusin",
		"onfocusout",
		"onfullscreenchange",
		"onfullscreenerror",
		"ongesturechange",
		"ongestureend",
		"ongesturestart",
		"ongotpointercapture",
		"onhashchange",
		"onhelp",
		"onicecandidate",
		"oniceconnectionstatechange",
		"oninactive",
		"oninput",
		"oninvalid",
		"onkeydown",
		"onkeypress",
		"onkeyup",
		"onlanguagechange",
		"onlayoutcomplete",
		"onlevelchange",
		"onload",
		"onloadeddata",
		"onloadedmetadata",
		"onloadend",
		"onloadstart",
		"onlosecapture",
		"onlostpointercapture",
		"only",
		"onmark",
		"onmessage",
		"onmousedown",
		"onmouseenter",
		"onmouseleave",
		"onmousemove",
		"onmouseout",
		"onmouseover",
		"onmouseup",
		"onmousewheel",
		"onmove",
		"onmoveend",
		"onmovestart",
		"onmozfullscreenchange",
		"onmozfullscreenerror",
		"onmozorientationchange",
		"onmozpointerlockchange",
		"onmozpointerlockerror",
		"onmscontentzoom",
		"onmsfullscreenchange",
		"onmsfullscreenerror",
		"onmsgesturechange",
		"onmsgesturedoubletap",
		"onmsgestureend",
		"onmsgesturehold",
		"onmsgesturestart",
		"onmsgesturetap",
		"onmsgotpointercapture",
		"onmsinertiastart",
		"onmslostpointercapture",
		"onmsmanipulationstatechanged",
		"onmsneedkey",
		"onmsorientationchange",
		"onmspointercancel",
		"onmspointerdown",
		"onmspointerenter",
		"onmspointerhover",
		"onmspointerleave",
		"onmspointermove",
		"onmspointerout",
		"onmspointerover",
		"onmspointerup",
		"onmssitemodejumplistitemremoved",
		"onmsthumbnailclick",
		"onnegotiationneeded",
		"onnomatch",
		"onnoupdate",
		"onobsolete",
		"onoffline",
		"ononline",
		"onopen",
		"onorientationchange",
		"onpagechange",
		"onpagehide",
		"onpageshow",
		"onpaste",
		"onpause",
		"onplay",
		"onplaying",
		"onpluginstreamstart",
		"onpointercancel",
		"onpointerdown",
		"onpointerenter",
		"onpointerleave",
		"onpointerlockchange",
		"onpointerlockerror",
		"onpointermove",
		"onpointerout",
		"onpointerover",
		"onpointerup",
		"onpopstate",
		"onprogress",
		"onpropertychange",
		"onratechange",
		"onreadystatechange",
		"onremovestream",
		"onremovetrack",
		"onreset",
		"onresize",
		"onresizeend",
		"onresizestart",
		"onresourcetimingbufferfull",
		"onresult",
		"onresume",
		"onrowenter",
		"onrowexit",
		"onrowsdelete",
		"onrowsinserted",
		"onscroll",
		"onsearch",
		"onseeked",
		"onseeking",
		"onselect",
		"onselectionchange",
		"onselectstart",
		"onshow",
		"onsignalingstatechange",
		"onsoundend",
		"onsoundstart",
		"onspeechend",
		"onspeechstart",
		"onstalled",
		"onstart",
		"onstatechange",
		"onstop",
		"onstorage",
		"onstoragecommit",
		"onsubmit",
		"onsuccess",
		"onsuspend",
		"ontextinput",
		"ontimeout",
		"ontimeupdate",
		"ontoggle",
		"ontouchcancel",
		"ontouchend",
		"ontouchmove",
		"ontouchstart",
		"ontransitionend",
		"onunload",
		"onupdateready",
		"onupgradeneeded",
		"onuserproximity",
		"onversionchange",
		"onvoiceschanged",
		"onvolumechange",
		"onwaiting",
		"onwarning",
		"onwebkitanimationend",
		"onwebkitanimationiteration",
		"onwebkitanimationstart",
		"onwebkitcurrentplaybacktargetiswirelesschanged",
		"onwebkitfullscreenchange",
		"onwebkitfullscreenerror",
		"onwebkitkeyadded",
		"onwebkitkeyerror",
		"onwebkitkeymessage",
		"onwebkitneedkey",
		"onwebkitorientationchange",
		"onwebkitplaybacktargetavailabilitychanged",
		"onwebkitpointerlockchange",
		"onwebkitpointerlockerror",
		"onwebkitresourcetimingbufferfull",
		"onwebkittransitionend",
		"onwheel",
		"onzoom",
		"opacity",
		"open",
		"openCursor",
		"openDatabase",
		"openKeyCursor",
		"opener",
		"opera",
		"operationType",
		"operator",
		"opr",
		"optimum",
		"options",
		"order",
		"orderX",
		"orderY",
		"ordered",
		"org",
		"orient",
		"orientAngle",
		"orientType",
		"orientation",
		"origin",
		"originalTarget",
		"orphans",
		"oscpu",
		"outerHTML",
		"outerHeight",
		"outerText",
		"outerWidth",
		"outline",
		"outline-color",
		"outline-offset",
		"outline-style",
		"outline-width",
		"outlineColor",
		"outlineOffset",
		"outlineStyle",
		"outlineWidth",
		"outputBuffer",
		"overflow",
		"overflow-x",
		"overflow-y",
		"overflowX",
		"overflowY",
		"overrideMimeType",
		"oversample",
		"ownerDocument",
		"ownerElement",
		"ownerNode",
		"ownerRule",
		"ownerSVGElement",
		"owningElement",
		"p1",
		"p2",
		"p3",
		"p4",
		"pad",
		"padding",
		"padding-bottom",
		"padding-left",
		"padding-right",
		"padding-top",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"paddingTop",
		"page",
		"page-break-after",
		"page-break-before",
		"page-break-inside",
		"pageBreakAfter",
		"pageBreakBefore",
		"pageBreakInside",
		"pageCount",
		"pageX",
		"pageXOffset",
		"pageY",
		"pageYOffset",
		"pages",
		"paint-order",
		"paintOrder",
		"paintRequests",
		"paintType",
		"palette",
		"panningModel",
		"parent",
		"parentElement",
		"parentNode",
		"parentRule",
		"parentStyleSheet",
		"parentTextEdit",
		"parentWindow",
		"parse",
		"parseFloat",
		"parseFromString",
		"parseInt",
		"participants",
		"password",
		"pasteHTML",
		"path",
		"pathLength",
		"pathSegList",
		"pathSegType",
		"pathSegTypeAsLetter",
		"pathname",
		"pattern",
		"patternContentUnits",
		"patternMismatch",
		"patternTransform",
		"patternUnits",
		"pause",
		"pauseAnimations",
		"pauseOnExit",
		"paused",
		"pending",
		"performance",
		"permission",
		"persisted",
		"personalbar",
		"perspective",
		"perspective-origin",
		"perspectiveOrigin",
		"phoneticFamilyName",
		"phoneticGivenName",
		"photo",
		"ping",
		"pitch",
		"pixelBottom",
		"pixelDepth",
		"pixelHeight",
		"pixelLeft",
		"pixelRight",
		"pixelStorei",
		"pixelTop",
		"pixelUnitToMillimeterX",
		"pixelUnitToMillimeterY",
		"pixelWidth",
		"placeholder",
		"platform",
		"play",
		"playbackRate",
		"playbackState",
		"playbackTime",
		"played",
		"plugins",
		"pluginspage",
		"pname",
		"pointer-events",
		"pointerBeforeReferenceNode",
		"pointerEnabled",
		"pointerEvents",
		"pointerId",
		"pointerLockElement",
		"pointerType",
		"points",
		"pointsAtX",
		"pointsAtY",
		"pointsAtZ",
		"polygonOffset",
		"pop",
		"popupWindowFeatures",
		"popupWindowName",
		"popupWindowURI",
		"port",
		"port1",
		"port2",
		"ports",
		"posBottom",
		"posHeight",
		"posLeft",
		"posRight",
		"posTop",
		"posWidth",
		"position",
		"positionAlign",
		"postError",
		"postMessage",
		"poster",
		"pow",
		"powerOff",
		"preMultiplySelf",
		"precision",
		"preferredStyleSheetSet",
		"preferredStylesheetSet",
		"prefix",
		"preload",
		"preserveAlpha",
		"preserveAspectRatio",
		"preserveAspectRatioString",
		"pressed",
		"pressure",
		"prevValue",
		"preventDefault",
		"preventExtensions",
		"previousElementSibling",
		"previousNode",
		"previousPage",
		"previousScale",
		"previousSibling",
		"previousTranslate",
		"primaryKey",
		"primitiveType",
		"primitiveUnits",
		"principals",
		"print",
		"privateKey",
		"probablySupportsContext",
		"process",
		"processIceMessage",
		"product",
		"productSub",
		"profile",
		"profileEnd",
		"profiles",
		"prompt",
		"properties",
		"propertyIsEnumerable",
		"propertyName",
		"protocol",
		"protocolLong",
		"prototype",
		"pseudoClass",
		"pseudoElement",
		"publicId",
		"publicKey",
		"published",
		"push",
		"pushNotification",
		"pushState",
		"put",
		"putImageData",
		"quadraticCurveTo",
		"qualifier",
		"queryCommandEnabled",
		"queryCommandIndeterm",
		"queryCommandState",
		"queryCommandSupported",
		"queryCommandText",
		"queryCommandValue",
		"querySelector",
		"querySelectorAll",
		"quote",
		"quotes",
		"r",
		"r1",
		"r2",
		"race",
		"radiogroup",
		"radiusX",
		"radiusY",
		"random",
		"range",
		"rangeCount",
		"rangeMax",
		"rangeMin",
		"rangeOffset",
		"rangeOverflow",
		"rangeParent",
		"rangeUnderflow",
		"rate",
		"ratio",
		"raw",
		"read",
		"readAsArrayBuffer",
		"readAsBinaryString",
		"readAsBlob",
		"readAsDataURL",
		"readAsText",
		"readOnly",
		"readPixels",
		"readReportRequested",
		"readyState",
		"reason",
		"reboot",
		"receiver",
		"receivers",
		"recordNumber",
		"recordset",
		"rect",
		"red",
		"redirectCount",
		"redirectEnd",
		"redirectStart",
		"reduce",
		"reduceRight",
		"reduction",
		"refDistance",
		"refX",
		"refY",
		"referenceNode",
		"referrer",
		"refresh",
		"region",
		"regionAnchorX",
		"regionAnchorY",
		"regionId",
		"regions",
		"register",
		"registerContentHandler",
		"registerElement",
		"registerProtocolHandler",
		"reject",
		"rel",
		"relList",
		"relatedNode",
		"relatedTarget",
		"release",
		"releaseCapture",
		"releaseEvents",
		"releasePointerCapture",
		"releaseShaderCompiler",
		"reliable",
		"reload",
		"remainingSpace",
		"remoteDescription",
		"remove",
		"removeAllRanges",
		"removeAttribute",
		"removeAttributeNS",
		"removeAttributeNode",
		"removeBehavior",
		"removeChild",
		"removeCue",
		"removeEventListener",
		"removeFilter",
		"removeImport",
		"removeItem",
		"removeListener",
		"removeNamedItem",
		"removeNamedItemNS",
		"removeNode",
		"removeParameter",
		"removeProperty",
		"removeRange",
		"removeRegion",
		"removeRule",
		"removeSiteSpecificTrackingException",
		"removeSourceBuffer",
		"removeStream",
		"removeTrack",
		"removeVariable",
		"removeWakeLockListener",
		"removeWebWideTrackingException",
		"removedNodes",
		"renderbufferStorage",
		"renderedBuffer",
		"renderingMode",
		"repeat",
		"replace",
		"replaceAdjacentText",
		"replaceChild",
		"replaceData",
		"replaceId",
		"replaceItem",
		"replaceNode",
		"replaceState",
		"replaceTrack",
		"replaceWholeText",
		"reportValidity",
		"requestAnimationFrame",
		"requestAutocomplete",
		"requestData",
		"requestFullscreen",
		"requestMediaKeySystemAccess",
		"requestPermission",
		"requestPointerLock",
		"requestStart",
		"requestingWindow",
		"required",
		"requiredExtensions",
		"requiredFeatures",
		"reset",
		"resetTransform",
		"resize",
		"resizeBy",
		"resizeTo",
		"resolve",
		"response",
		"responseBody",
		"responseEnd",
		"responseStart",
		"responseText",
		"responseType",
		"responseURL",
		"responseXML",
		"restore",
		"result",
		"resultType",
		"resume",
		"returnValue",
		"rev",
		"reverse",
		"reversed",
		"revocable",
		"revokeObjectURL",
		"rgbColor",
		"right",
		"rightContext",
		"rightMargin",
		"rolloffFactor",
		"root",
		"rootElement",
		"rotate",
		"rotateAxisAngle",
		"rotateAxisAngleSelf",
		"rotateFromVector",
		"rotateFromVectorSelf",
		"rotateSelf",
		"rotation",
		"rotationRate",
		"round",
		"rowIndex",
		"rowSpan",
		"rows",
		"rubyAlign",
		"rubyOverhang",
		"rubyPosition",
		"rules",
		"runtime",
		"runtimeStyle",
		"rx",
		"ry",
		"safari",
		"sampleCoverage",
		"sampleRate",
		"sandbox",
		"save",
		"scale",
		"scale3d",
		"scale3dSelf",
		"scaleNonUniform",
		"scaleNonUniformSelf",
		"scaleSelf",
		"scheme",
		"scissor",
		"scope",
		"scopeName",
		"scoped",
		"screen",
		"screenBrightness",
		"screenEnabled",
		"screenLeft",
		"screenPixelToMillimeterX",
		"screenPixelToMillimeterY",
		"screenTop",
		"screenX",
		"screenY",
		"scripts",
		"scroll",
		"scroll-behavior",
		"scrollAmount",
		"scrollBehavior",
		"scrollBy",
		"scrollByLines",
		"scrollByPages",
		"scrollDelay",
		"scrollHeight",
		"scrollIntoView",
		"scrollIntoViewIfNeeded",
		"scrollLeft",
		"scrollLeftMax",
		"scrollMaxX",
		"scrollMaxY",
		"scrollTo",
		"scrollTop",
		"scrollTopMax",
		"scrollWidth",
		"scrollX",
		"scrollY",
		"scrollbar3dLightColor",
		"scrollbarArrowColor",
		"scrollbarBaseColor",
		"scrollbarDarkShadowColor",
		"scrollbarFaceColor",
		"scrollbarHighlightColor",
		"scrollbarShadowColor",
		"scrollbarTrackColor",
		"scrollbars",
		"scrolling",
		"sdp",
		"sdpMLineIndex",
		"sdpMid",
		"seal",
		"search",
		"searchBox",
		"searchBoxJavaBridge_",
		"searchParams",
		"sectionRowIndex",
		"secureConnectionStart",
		"security",
		"seed",
		"seekable",
		"seeking",
		"select",
		"selectAllChildren",
		"selectNode",
		"selectNodeContents",
		"selectNodes",
		"selectSingleNode",
		"selectSubString",
		"selected",
		"selectedIndex",
		"selectedOptions",
		"selectedStyleSheetSet",
		"selectedStylesheetSet",
		"selection",
		"selectionDirection",
		"selectionEnd",
		"selectionStart",
		"selector",
		"selectorText",
		"self",
		"send",
		"sendAsBinary",
		"sendBeacon",
		"sender",
		"sentTimestamp",
		"separator",
		"serializeToString",
		"serviceWorker",
		"sessionId",
		"sessionStorage",
		"set",
		"setActive",
		"setAlpha",
		"setAttribute",
		"setAttributeNS",
		"setAttributeNode",
		"setAttributeNodeNS",
		"setBaseAndExtent",
		"setBingCurrentSearchDefault",
		"setCapture",
		"setColor",
		"setCompositeOperation",
		"setCurrentTime",
		"setCustomValidity",
		"setData",
		"setDate",
		"setDragImage",
		"setEnd",
		"setEndAfter",
		"setEndBefore",
		"setEndPoint",
		"setFillColor",
		"setFilterRes",
		"setFloat32",
		"setFloat64",
		"setFloatValue",
		"setFullYear",
		"setHours",
		"setImmediate",
		"setInt16",
		"setInt32",
		"setInt8",
		"setInterval",
		"setItem",
		"setLineCap",
		"setLineDash",
		"setLineJoin",
		"setLineWidth",
		"setLocalDescription",
		"setMatrix",
		"setMatrixValue",
		"setMediaKeys",
		"setMilliseconds",
		"setMinutes",
		"setMiterLimit",
		"setMonth",
		"setNamedItem",
		"setNamedItemNS",
		"setNonUserCodeExceptions",
		"setOrientToAngle",
		"setOrientToAuto",
		"setOrientation",
		"setOverrideHistoryNavigationMode",
		"setPaint",
		"setParameter",
		"setPeriodicWave",
		"setPointerCapture",
		"setPosition",
		"setPreference",
		"setProperty",
		"setPrototypeOf",
		"setRGBColor",
		"setRGBColorICCColor",
		"setRadius",
		"setRangeText",
		"setRemoteDescription",
		"setRequestHeader",
		"setResizable",
		"setResourceTimingBufferSize",
		"setRotate",
		"setScale",
		"setSeconds",
		"setSelectionRange",
		"setServerCertificate",
		"setShadow",
		"setSkewX",
		"setSkewY",
		"setStart",
		"setStartAfter",
		"setStartBefore",
		"setStdDeviation",
		"setStringValue",
		"setStrokeColor",
		"setSuggestResult",
		"setTargetAtTime",
		"setTargetValueAtTime",
		"setTime",
		"setTimeout",
		"setTransform",
		"setTranslate",
		"setUTCDate",
		"setUTCFullYear",
		"setUTCHours",
		"setUTCMilliseconds",
		"setUTCMinutes",
		"setUTCMonth",
		"setUTCSeconds",
		"setUint16",
		"setUint32",
		"setUint8",
		"setUri",
		"setValueAtTime",
		"setValueCurveAtTime",
		"setVariable",
		"setVelocity",
		"setVersion",
		"setYear",
		"settingName",
		"settingValue",
		"sex",
		"shaderSource",
		"shadowBlur",
		"shadowColor",
		"shadowOffsetX",
		"shadowOffsetY",
		"shadowRoot",
		"shape",
		"shape-rendering",
		"shapeRendering",
		"sheet",
		"shift",
		"shiftKey",
		"shiftLeft",
		"show",
		"showHelp",
		"showModal",
		"showModalDialog",
		"showModelessDialog",
		"showNotification",
		"sidebar",
		"sign",
		"signalingState",
		"sin",
		"singleNodeValue",
		"sinh",
		"size",
		"sizeToContent",
		"sizes",
		"skewX",
		"skewXSelf",
		"skewY",
		"skewYSelf",
		"slice",
		"slope",
		"small",
		"smil",
		"smoothingTimeConstant",
		"snapToLines",
		"snapshotItem",
		"snapshotLength",
		"some",
		"sort",
		"source",
		"sourceBuffer",
		"sourceBuffers",
		"sourceIndex",
		"spacing",
		"span",
		"speakAs",
		"speaking",
		"specified",
		"specularConstant",
		"specularExponent",
		"speechSynthesis",
		"speed",
		"speedOfSound",
		"spellcheck",
		"splice",
		"split",
		"splitText",
		"spreadMethod",
		"sqrt",
		"src",
		"srcElement",
		"srcFilter",
		"srcUrn",
		"srcdoc",
		"srclang",
		"srcset",
		"stack",
		"stackTraceLimit",
		"stacktrace",
		"standalone",
		"standby",
		"start",
		"startContainer",
		"startIce",
		"startOffset",
		"startRendering",
		"startTime",
		"startsWith",
		"state",
		"status",
		"statusMessage",
		"statusText",
		"statusbar",
		"stdDeviationX",
		"stdDeviationY",
		"stencilFunc",
		"stencilFuncSeparate",
		"stencilMask",
		"stencilMaskSeparate",
		"stencilOp",
		"stencilOpSeparate",
		"step",
		"stepDown",
		"stepMismatch",
		"stepUp",
		"sticky",
		"stitchTiles",
		"stop",
		"stop-color",
		"stop-opacity",
		"stopColor",
		"stopImmediatePropagation",
		"stopOpacity",
		"stopPropagation",
		"storageArea",
		"storageName",
		"storageStatus",
		"storeSiteSpecificTrackingException",
		"storeWebWideTrackingException",
		"stpVersion",
		"stream",
		"strike",
		"stringValue",
		"stringify",
		"stroke",
		"stroke-dasharray",
		"stroke-dashoffset",
		"stroke-linecap",
		"stroke-linejoin",
		"stroke-miterlimit",
		"stroke-opacity",
		"stroke-width",
		"strokeDasharray",
		"strokeDashoffset",
		"strokeLinecap",
		"strokeLinejoin",
		"strokeMiterlimit",
		"strokeOpacity",
		"strokeRect",
		"strokeStyle",
		"strokeText",
		"strokeWidth",
		"style",
		"styleFloat",
		"styleMedia",
		"styleSheet",
		"styleSheetSets",
		"styleSheets",
		"sub",
		"subarray",
		"subject",
		"submit",
		"subscribe",
		"substr",
		"substring",
		"substringData",
		"subtle",
		"suffix",
		"suffixes",
		"summary",
		"sup",
		"supports",
		"surfaceScale",
		"surroundContents",
		"suspend",
		"suspendRedraw",
		"swapCache",
		"swapNode",
		"sweepFlag",
		"symbols",
		"system",
		"systemCode",
		"systemId",
		"systemLanguage",
		"systemXDPI",
		"systemYDPI",
		"tBodies",
		"tFoot",
		"tHead",
		"tabIndex",
		"table",
		"table-layout",
		"tableLayout",
		"tableValues",
		"tag",
		"tagName",
		"tagUrn",
		"tags",
		"taintEnabled",
		"takeRecords",
		"tan",
		"tanh",
		"target",
		"targetElement",
		"targetTouches",
		"targetX",
		"targetY",
		"tel",
		"terminate",
		"test",
		"texImage2D",
		"texParameterf",
		"texParameteri",
		"texSubImage2D",
		"text",
		"text-align",
		"text-anchor",
		"text-decoration",
		"text-decoration-color",
		"text-decoration-line",
		"text-decoration-style",
		"text-indent",
		"text-overflow",
		"text-rendering",
		"text-shadow",
		"text-transform",
		"textAlign",
		"textAlignLast",
		"textAnchor",
		"textAutospace",
		"textBaseline",
		"textContent",
		"textDecoration",
		"textDecorationBlink",
		"textDecorationColor",
		"textDecorationLine",
		"textDecorationLineThrough",
		"textDecorationNone",
		"textDecorationOverline",
		"textDecorationStyle",
		"textDecorationUnderline",
		"textIndent",
		"textJustify",
		"textJustifyTrim",
		"textKashida",
		"textKashidaSpace",
		"textLength",
		"textOverflow",
		"textRendering",
		"textShadow",
		"textTracks",
		"textTransform",
		"textUnderlinePosition",
		"then",
		"threadId",
		"threshold",
		"tiltX",
		"tiltY",
		"time",
		"timeEnd",
		"timeStamp",
		"timeout",
		"timestamp",
		"timestampOffset",
		"timing",
		"title",
		"toArray",
		"toBlob",
		"toDataURL",
		"toDateString",
		"toElement",
		"toExponential",
		"toFixed",
		"toFloat32Array",
		"toFloat64Array",
		"toGMTString",
		"toISOString",
		"toJSON",
		"toLocaleDateString",
		"toLocaleFormat",
		"toLocaleLowerCase",
		"toLocaleString",
		"toLocaleTimeString",
		"toLocaleUpperCase",
		"toLowerCase",
		"toMethod",
		"toPrecision",
		"toSdp",
		"toSource",
		"toStaticHTML",
		"toString",
		"toStringTag",
		"toTimeString",
		"toUTCString",
		"toUpperCase",
		"toggle",
		"toggleLongPressEnabled",
		"tooLong",
		"toolbar",
		"top",
		"topMargin",
		"total",
		"totalFrameDelay",
		"totalVideoFrames",
		"touchAction",
		"touches",
		"trace",
		"track",
		"transaction",
		"transactions",
		"transform",
		"transform-origin",
		"transform-style",
		"transformOrigin",
		"transformPoint",
		"transformString",
		"transformStyle",
		"transformToDocument",
		"transformToFragment",
		"transition",
		"transition-delay",
		"transition-duration",
		"transition-property",
		"transition-timing-function",
		"transitionDelay",
		"transitionDuration",
		"transitionProperty",
		"transitionTimingFunction",
		"translate",
		"translateSelf",
		"translationX",
		"translationY",
		"trim",
		"trimLeft",
		"trimRight",
		"trueSpeed",
		"trunc",
		"truncate",
		"type",
		"typeDetail",
		"typeMismatch",
		"typeMustMatch",
		"types",
		"ubound",
		"undefined",
		"unescape",
		"uneval",
		"unicode-bidi",
		"unicodeBidi",
		"uniform1f",
		"uniform1fv",
		"uniform1i",
		"uniform1iv",
		"uniform2f",
		"uniform2fv",
		"uniform2i",
		"uniform2iv",
		"uniform3f",
		"uniform3fv",
		"uniform3i",
		"uniform3iv",
		"uniform4f",
		"uniform4fv",
		"uniform4i",
		"uniform4iv",
		"uniformMatrix2fv",
		"uniformMatrix3fv",
		"uniformMatrix4fv",
		"unique",
		"uniqueID",
		"uniqueNumber",
		"unitType",
		"units",
		"unloadEventEnd",
		"unloadEventStart",
		"unlock",
		"unmount",
		"unobserve",
		"unpause",
		"unpauseAnimations",
		"unreadCount",
		"unregister",
		"unregisterContentHandler",
		"unregisterProtocolHandler",
		"unscopables",
		"unselectable",
		"unshift",
		"unsubscribe",
		"unsuspendRedraw",
		"unsuspendRedrawAll",
		"unwatch",
		"unwrapKey",
		"update",
		"updateCommands",
		"updateIce",
		"updateInterval",
		"updateSettings",
		"updated",
		"updating",
		"upload",
		"upper",
		"upperBound",
		"upperOpen",
		"uri",
		"url",
		"urn",
		"urns",
		"usages",
		"useCurrentView",
		"useMap",
		"useProgram",
		"usedSpace",
		"userAgent",
		"userLanguage",
		"username",
		"v8BreakIterator",
		"vAlign",
		"vLink",
		"valid",
		"validateProgram",
		"validationMessage",
		"validity",
		"value",
		"valueAsDate",
		"valueAsNumber",
		"valueAsString",
		"valueInSpecifiedUnits",
		"valueMissing",
		"valueOf",
		"valueText",
		"valueType",
		"values",
		"vector-effect",
		"vectorEffect",
		"velocityAngular",
		"velocityExpansion",
		"velocityX",
		"velocityY",
		"vendor",
		"vendorSub",
		"verify",
		"version",
		"vertexAttrib1f",
		"vertexAttrib1fv",
		"vertexAttrib2f",
		"vertexAttrib2fv",
		"vertexAttrib3f",
		"vertexAttrib3fv",
		"vertexAttrib4f",
		"vertexAttrib4fv",
		"vertexAttribDivisorANGLE",
		"vertexAttribPointer",
		"vertical",
		"vertical-align",
		"verticalAlign",
		"verticalOverflow",
		"vibrate",
		"videoHeight",
		"videoTracks",
		"videoWidth",
		"view",
		"viewBox",
		"viewBoxString",
		"viewTarget",
		"viewTargetString",
		"viewport",
		"viewportAnchorX",
		"viewportAnchorY",
		"viewportElement",
		"visibility",
		"visibilityState",
		"visible",
		"vlinkColor",
		"voice",
		"volume",
		"vrml",
		"vspace",
		"w",
		"wand",
		"warn",
		"wasClean",
		"watch",
		"watchPosition",
		"webdriver",
		"webkitAddKey",
		"webkitAnimation",
		"webkitAnimationDelay",
		"webkitAnimationDirection",
		"webkitAnimationDuration",
		"webkitAnimationFillMode",
		"webkitAnimationIterationCount",
		"webkitAnimationName",
		"webkitAnimationPlayState",
		"webkitAnimationTimingFunction",
		"webkitAppearance",
		"webkitAudioContext",
		"webkitAudioDecodedByteCount",
		"webkitAudioPannerNode",
		"webkitBackfaceVisibility",
		"webkitBackground",
		"webkitBackgroundAttachment",
		"webkitBackgroundClip",
		"webkitBackgroundColor",
		"webkitBackgroundImage",
		"webkitBackgroundOrigin",
		"webkitBackgroundPosition",
		"webkitBackgroundPositionX",
		"webkitBackgroundPositionY",
		"webkitBackgroundRepeat",
		"webkitBackgroundSize",
		"webkitBackingStorePixelRatio",
		"webkitBorderImage",
		"webkitBorderImageOutset",
		"webkitBorderImageRepeat",
		"webkitBorderImageSlice",
		"webkitBorderImageSource",
		"webkitBorderImageWidth",
		"webkitBoxAlign",
		"webkitBoxDirection",
		"webkitBoxFlex",
		"webkitBoxOrdinalGroup",
		"webkitBoxOrient",
		"webkitBoxPack",
		"webkitBoxSizing",
		"webkitCancelAnimationFrame",
		"webkitCancelFullScreen",
		"webkitCancelKeyRequest",
		"webkitCancelRequestAnimationFrame",
		"webkitClearResourceTimings",
		"webkitClosedCaptionsVisible",
		"webkitConvertPointFromNodeToPage",
		"webkitConvertPointFromPageToNode",
		"webkitCreateShadowRoot",
		"webkitCurrentFullScreenElement",
		"webkitCurrentPlaybackTargetIsWireless",
		"webkitDirectionInvertedFromDevice",
		"webkitDisplayingFullscreen",
		"webkitEnterFullScreen",
		"webkitEnterFullscreen",
		"webkitExitFullScreen",
		"webkitExitFullscreen",
		"webkitExitPointerLock",
		"webkitFullScreenKeyboardInputAllowed",
		"webkitFullscreenElement",
		"webkitFullscreenEnabled",
		"webkitGenerateKeyRequest",
		"webkitGetAsEntry",
		"webkitGetDatabaseNames",
		"webkitGetEntries",
		"webkitGetEntriesByName",
		"webkitGetEntriesByType",
		"webkitGetFlowByName",
		"webkitGetGamepads",
		"webkitGetImageDataHD",
		"webkitGetNamedFlows",
		"webkitGetRegionFlowRanges",
		"webkitGetUserMedia",
		"webkitHasClosedCaptions",
		"webkitHidden",
		"webkitIDBCursor",
		"webkitIDBDatabase",
		"webkitIDBDatabaseError",
		"webkitIDBDatabaseException",
		"webkitIDBFactory",
		"webkitIDBIndex",
		"webkitIDBKeyRange",
		"webkitIDBObjectStore",
		"webkitIDBRequest",
		"webkitIDBTransaction",
		"webkitImageSmoothingEnabled",
		"webkitIndexedDB",
		"webkitInitMessageEvent",
		"webkitIsFullScreen",
		"webkitKeys",
		"webkitLineDashOffset",
		"webkitLockOrientation",
		"webkitMatchesSelector",
		"webkitMediaStream",
		"webkitNotifications",
		"webkitOfflineAudioContext",
		"webkitOrientation",
		"webkitPeerConnection00",
		"webkitPersistentStorage",
		"webkitPointerLockElement",
		"webkitPostMessage",
		"webkitPreservesPitch",
		"webkitPutImageDataHD",
		"webkitRTCPeerConnection",
		"webkitRegionOverset",
		"webkitRequestAnimationFrame",
		"webkitRequestFileSystem",
		"webkitRequestFullScreen",
		"webkitRequestFullscreen",
		"webkitRequestPointerLock",
		"webkitResolveLocalFileSystemURL",
		"webkitSetMediaKeys",
		"webkitSetResourceTimingBufferSize",
		"webkitShadowRoot",
		"webkitShowPlaybackTargetPicker",
		"webkitSlice",
		"webkitSpeechGrammar",
		"webkitSpeechGrammarList",
		"webkitSpeechRecognition",
		"webkitSpeechRecognitionError",
		"webkitSpeechRecognitionEvent",
		"webkitStorageInfo",
		"webkitSupportsFullscreen",
		"webkitTemporaryStorage",
		"webkitTextSizeAdjust",
		"webkitTransform",
		"webkitTransformOrigin",
		"webkitTransition",
		"webkitTransitionDelay",
		"webkitTransitionDuration",
		"webkitTransitionProperty",
		"webkitTransitionTimingFunction",
		"webkitURL",
		"webkitUnlockOrientation",
		"webkitUserSelect",
		"webkitVideoDecodedByteCount",
		"webkitVisibilityState",
		"webkitWirelessVideoPlaybackDisabled",
		"webkitdropzone",
		"webstore",
		"weight",
		"whatToShow",
		"wheelDelta",
		"wheelDeltaX",
		"wheelDeltaY",
		"which",
		"white-space",
		"whiteSpace",
		"wholeText",
		"widows",
		"width",
		"will-change",
		"willChange",
		"willValidate",
		"window",
		"withCredentials",
		"word-break",
		"word-spacing",
		"word-wrap",
		"wordBreak",
		"wordSpacing",
		"wordWrap",
		"wrap",
		"wrapKey",
		"write",
		"writeln",
		"writingMode",
		"x",
		"x1",
		"x2",
		"xChannelSelector",
		"xmlEncoding",
		"xmlStandalone",
		"xmlVersion",
		"xmlbase",
		"xmllang",
		"xmlspace",
		"y",
		"y1",
		"y2",
		"yChannelSelector",
		"yandex",
		"z",
		"z-index",
		"zIndex",
		"zoom",
		"zoomAndPan",
		"zoomRectScreen"
	]
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// workaround for tty output truncation upon process.exit()
[process.stdout, process.stderr].forEach(function(stream){
    if (stream._handle && stream._handle.setBlocking)
        stream._handle.setBlocking(true);
});

var path = __webpack_require__(16);
var fs = __webpack_require__(41);

var UglifyJS = exports;
var FILES = UglifyJS.FILES = [
    "../lib/utils.js",
    "../lib/ast.js",
    "../lib/parse.js",
    "../lib/transform.js",
    "../lib/scope.js",
    "../lib/output.js",
    "../lib/compress.js",
    "../lib/sourcemap.js",
    "../lib/mozilla-ast.js",
    "../lib/propmangle.js",
    "./exports.js",
].map(function(file){
    return /*require.resolve*/(!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND';; throw e; }()));
});

new Function("MOZ_SourceMap", "exports", FILES.map(function(file){
    return fs.readFileSync(file, "utf8");
}).join("\n\n"))(
    __webpack_require__(0),
    UglifyJS
);

UglifyJS.AST_Node.warn_function = function(txt) {
    console.error("WARN: %s", txt);
};

function read_source_map(code) {
    var match = /\n\/\/# sourceMappingURL=data:application\/json(;.*?)?;base64,(.*)/.exec(code);
    if (!match) {
        UglifyJS.AST_Node.warn("inline source map not found");
        return null;
    }
    return JSON.parse(new Buffer(match[2], "base64"));
}

UglifyJS.minify = function(files, options) {
    options = UglifyJS.defaults(options, {
        compress         : {},
        fromString       : false,
        inSourceMap      : null,
        mangle           : {},
        mangleProperties : false,
        nameCache        : null,
        outFileName      : null,
        output           : null,
        outSourceMap     : null,
        parse            : {},
        sourceMapInline  : false,
        sourceMapUrl     : null,
        sourceRoot       : null,
        spidermonkey     : false,
        warnings         : false,
    });
    UglifyJS.base54.reset();

    var inMap = options.inSourceMap;
    if (typeof inMap == "string" && inMap != "inline") {
        inMap = JSON.parse(fs.readFileSync(inMap, "utf8"));
    }

    // 1. parse
    var toplevel = null,
        sourcesContent = {};

    if (options.spidermonkey) {
        if (inMap == "inline") {
            throw new Error("inline source map only works with built-in parser");
        }
        toplevel = UglifyJS.AST_Node.from_mozilla_ast(files);
    } else {
        function addFile(file, fileUrl) {
            var code = options.fromString
                ? file
                : fs.readFileSync(file, "utf8");
            if (inMap == "inline") {
                inMap = read_source_map(code);
            }
            sourcesContent[fileUrl] = code;
            toplevel = UglifyJS.parse(code, {
                filename: fileUrl,
                toplevel: toplevel,
                bare_returns: options.parse ? options.parse.bare_returns : undefined
            });
        }
        if (!options.fromString) {
            files = UglifyJS.simple_glob(files);
            if (inMap == "inline" && files.length > 1) {
                throw new Error("inline source map only works with singular input");
            }
        }
        [].concat(files).forEach(function (files, i) {
            if (typeof files === 'string') {
                addFile(files, options.fromString ? i : files);
            } else {
                for (var fileUrl in files) {
                    addFile(files[fileUrl], fileUrl);
                }
            }
        });
    }
    if (options.wrap) {
      toplevel = toplevel.wrap_commonjs(options.wrap, options.exportAll);
    }

    // 2. compress
    if (options.compress) {
        var compress = { warnings: options.warnings };
        UglifyJS.merge(compress, options.compress);
        toplevel.figure_out_scope(options.mangle);
        var sq = UglifyJS.Compressor(compress);
        toplevel = sq.compress(toplevel);
    }

    // 3. mangle properties
    if (options.mangleProperties || options.nameCache) {
        options.mangleProperties.cache = UglifyJS.readNameCache(options.nameCache, "props");
        toplevel = UglifyJS.mangle_properties(toplevel, options.mangleProperties);
        UglifyJS.writeNameCache(options.nameCache, "props", options.mangleProperties.cache);
    }

    // 4. mangle
    if (options.mangle) {
        toplevel.figure_out_scope(options.mangle);
        toplevel.compute_char_frequency(options.mangle);
        toplevel.mangle_names(options.mangle);
    }

    // 5. output
    var output = { max_line_len: 32000 };
    if (options.outSourceMap || options.sourceMapInline) {
        output.source_map = UglifyJS.SourceMap({
            // prefer outFileName, otherwise use outSourceMap without .map suffix
            file: options.outFileName || (typeof options.outSourceMap === 'string' ? options.outSourceMap.replace(/\.map$/i, '') : null),
            orig: inMap,
            root: options.sourceRoot
        });
        if (options.sourceMapIncludeSources) {
            for (var file in sourcesContent) {
                if (sourcesContent.hasOwnProperty(file)) {
                    output.source_map.get().setSourceContent(file, sourcesContent[file]);
                }
            }
        }

    }
    if (options.output) {
        UglifyJS.merge(output, options.output);
    }
    var stream = UglifyJS.OutputStream(output);
    toplevel.print(stream);


    var source_map = output.source_map;
    if (source_map) {
        source_map = source_map + "";
    }

    var mappingUrlPrefix = "\n//# sourceMappingURL=";
    if (options.sourceMapInline) {
        stream += mappingUrlPrefix + "data:application/json;charset=utf-8;base64," + new Buffer(source_map).toString("base64");
    } else if (options.outSourceMap && typeof options.outSourceMap === "string" && options.sourceMapUrl !== false) {
        stream += mappingUrlPrefix + (typeof options.sourceMapUrl === "string" ? options.sourceMapUrl : options.outSourceMap);
    }

    return {
        code : stream + "",
        map  : source_map
    };
};

// UglifyJS.describe_ast = function() {
//     function doitem(ctor) {
//         var sub = {};
//         ctor.SUBCLASSES.forEach(function(ctor){
//             sub[ctor.TYPE] = doitem(ctor);
//         });
//         var ret = {};
//         if (ctor.SELF_PROPS.length > 0) ret.props = ctor.SELF_PROPS;
//         if (ctor.SUBCLASSES.length > 0) ret.sub = sub;
//         return ret;
//     }
//     return doitem(UglifyJS.AST_Node).sub;
// }

UglifyJS.describe_ast = function() {
    var out = UglifyJS.OutputStream({ beautify: true });
    function doitem(ctor) {
        out.print("AST_" + ctor.TYPE);
        var props = ctor.SELF_PROPS.filter(function(prop){
            return !/^\$/.test(prop);
        });
        if (props.length > 0) {
            out.space();
            out.with_parens(function(){
                props.forEach(function(prop, i){
                    if (i) out.space();
                    out.print(prop);
                });
            });
        }
        if (ctor.documentation) {
            out.space();
            out.print_string(ctor.documentation);
        }
        if (ctor.SUBCLASSES.length > 0) {
            out.space();
            out.with_block(function(){
                ctor.SUBCLASSES.forEach(function(ctor, i){
                    out.indent();
                    doitem(ctor);
                    out.newline();
                });
            });
        }
    };
    doitem(UglifyJS.AST_Node);
    return out + "";
};

function readReservedFile(filename, reserved) {
    if (!reserved) {
        reserved = { vars: [], props: [] };
    }
    var data = fs.readFileSync(filename, "utf8");
    data = JSON.parse(data);
    if (data.vars) {
        data.vars.forEach(function(name){
            UglifyJS.push_uniq(reserved.vars, name);
        });
    }
    if (data.props) {
        data.props.forEach(function(name){
            UglifyJS.push_uniq(reserved.props, name);
        });
    }
    return reserved;
}

UglifyJS.readReservedFile = readReservedFile;

UglifyJS.readDefaultReservedFile = function(reserved) {
    return readReservedFile(/*require.resolve*/(27), reserved);
};

UglifyJS.readNameCache = function(filename, key) {
    var cache = null;
    if (filename) {
        try {
            var cache = fs.readFileSync(filename, "utf8");
            cache = JSON.parse(cache)[key];
            if (!cache) throw "init";
            cache.props = UglifyJS.Dictionary.fromObject(cache.props);
        } catch(ex) {
            cache = {
                cname: -1,
                props: new UglifyJS.Dictionary()
            };
        }
    }
    return cache;
};

UglifyJS.writeNameCache = function(filename, key, cache) {
    if (filename) {
        var data;
        try {
            data = fs.readFileSync(filename, "utf8");
            data = JSON.parse(data);
        } catch(ex) {
            data = {};
        }
        data[key] = {
            cname: cache.cname,
            props: cache.props.toObject()
        };
        fs.writeFileSync(filename, JSON.stringify(data, null, 2), "utf8");
    }
};

// A file glob function that only supports "*" and "?" wildcards in the basename.
// Example: "foo/bar/*baz??.*.js"
// Argument `glob` may be a string or an array of strings.
// Returns an array of strings. Garbage in, garbage out.
UglifyJS.simple_glob = function simple_glob(glob) {
    if (Array.isArray(glob)) {
        return [].concat.apply([], glob.map(simple_glob));
    }
    if (glob.match(/\*|\?/)) {
        var dir = path.dirname(glob);
        try {
            var entries = fs.readdirSync(dir);
        } catch (ex) {}
        if (entries) {
            var pattern = "^" + path.basename(glob)
                .replace(/[.+^$[\]\\(){}]/g, "\\$&")
                .replace(/\*/g, "[^/\\\\]*")
                .replace(/\?/g, "[^/\\\\]") + "$";
            var mod = process.platform === "win32" ? "i" : "";
            var rx = new RegExp(pattern, mod);
            var results = entries.filter(function(name) {
                return rx.test(name);
            }).map(function(name) {
                return path.join(dir, name);
            });
            if (results.length) return results;
        }
    }
    return [ glob ];
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceMapConsumer = __webpack_require__(0).SourceMapConsumer;
var SourceMapSource = __webpack_require__(9).SourceMapSource;
var RawSource = __webpack_require__(9).RawSource;
var ConcatSource = __webpack_require__(9).ConcatSource;
var RequestShortener = __webpack_require__(39);
var ModuleFilenameHelpers = __webpack_require__(38);
var uglify = __webpack_require__(28);

var UglifyJsPlugin = function () {
	function UglifyJsPlugin(options) {
		_classCallCheck(this, UglifyJsPlugin);

		if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== "object" || Array.isArray(options)) options = {};
		if (typeof options.compressor !== "undefined") options.compress = options.compressor;
		this.options = options;
	}

	_createClass(UglifyJsPlugin, [{
		key: "apply",
		value: function apply(compiler) {
			var options = this.options;
			options.test = options.test || /\.js($|\?)/i;
			var warningsFilter = options.warningsFilter || function () {
				return true;
			};

			var requestShortener = new RequestShortener(compiler.context);
			compiler.plugin("compilation", function (compilation) {
				if (options.sourceMap) {
					compilation.plugin("build-module", function (module) {
						// to get detailed location info about errors
						module.useSourceMap = true;
					});
				}
				compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
					var files = [];
					chunks.forEach(function (chunk) {
						return files.push.apply(files, chunk.files);
					});
					files.push.apply(files, compilation.additionalChunkAssets);
					var filteredFiles = files.filter(ModuleFilenameHelpers.matchObject.bind(undefined, options));
					filteredFiles.forEach(function (file) {
						var oldWarnFunction = uglify.AST_Node.warn_function;
						var warnings = [];
						var sourceMap = void 0;
						try {
							var asset = compilation.assets[file];
							if (asset.__UglifyJsPlugin) {
								compilation.assets[file] = asset.__UglifyJsPlugin;
								return;
							}
							var input = void 0;
							var inputSourceMap = void 0;
							if (options.sourceMap) {
								if (asset.sourceAndMap) {
									var sourceAndMap = asset.sourceAndMap();
									inputSourceMap = sourceAndMap.map;
									input = sourceAndMap.source;
								} else {
									inputSourceMap = asset.map();
									input = asset.source();
								}
								sourceMap = new SourceMapConsumer(inputSourceMap);
								uglify.AST_Node.warn_function = function (warning) {
									// eslint-disable-line camelcase
									var match = /\[.+:([0-9]+),([0-9]+)\]/.exec(warning);
									var line = +match[1];
									var column = +match[2];
									var original = sourceMap.originalPositionFor({
										line: line,
										column: column
									});
									if (!original || !original.source || original.source === file) return;
									if (!warningsFilter(original.source)) return;
									warnings.push(warning.replace(/\[.+:([0-9]+),([0-9]+)\]/, "") + "[" + requestShortener.shorten(original.source) + ":" + original.line + "," + original.column + "]");
								};
							} else {
								input = asset.source();
								uglify.AST_Node.warn_function = function (warning) {
									// eslint-disable-line camelcase
									warnings.push(warning);
								};
							}
							uglify.base54.reset();
							var ast = uglify.parse(input, {
								filename: file
							});
							if (options.compress !== false) {
								ast.figure_out_scope();
								var compress = uglify.Compressor(options.compress || {
									warnings: false
								}); // eslint-disable-line new-cap
								ast = compress.compress(ast);
							}
							if (options.mangle !== false) {
								ast.figure_out_scope(options.mangle || {});
								ast.compute_char_frequency(options.mangle || {});
								ast.mangle_names(options.mangle || {});
								if (options.mangle && options.mangle.props) {
									uglify.mangle_properties(ast, options.mangle.props);
								}
							}
							var output = {};
							output.comments = Object.prototype.hasOwnProperty.call(options, "comments") ? options.comments : /^\**!|@preserve|@license/;
							output.beautify = options.beautify;
							for (var k in options.output) {
								output[k] = options.output[k];
							}
							var extractedComments = [];
							if (options.extractComments) {
								var condition = {};
								if (typeof options.extractComments === "string" || options.extractComments instanceof RegExp) {
									// extractComments specifies the extract condition and output.comments specifies the preserve condition
									condition.preserve = output.comments;
									condition.extract = options.extractComments;
								} else if (Object.prototype.hasOwnProperty.call(options.extractComments, "condition")) {
									// Extract condition is given in extractComments.condition
									condition.preserve = output.comments;
									condition.extract = options.extractComments.condition;
								} else {
									// No extract condition is given. Extract comments that match output.comments instead of preserving them
									condition.preserve = false;
									condition.extract = output.comments;
								}

								// Ensure that both conditions are functions
								["preserve", "extract"].forEach(function (key) {
									switch (_typeof(condition[key])) {
										case "boolean":
											var b = condition[key];
											condition[key] = function () {
												return b;
											};
											break;
										case "function":
											break;
										case "string":
											if (condition[key] === "all") {
												condition[key] = function () {
													return true;
												};
												break;
											}
											var regex = new RegExp(condition[key]);
											condition[key] = function (astNode, comment) {
												return regex.test(comment.value);
											};
											break;
										default:
											regex = condition[key];
											condition[key] = function (astNode, comment) {
												return regex.test(comment.value);
											};
									}
								});

								// Redefine the comments function to extract and preserve
								// comments according to the two conditions
								output.comments = function (astNode, comment) {
									if (condition.extract(astNode, comment)) {
										extractedComments.push(comment.type === "comment2" ? "/*" + comment.value + "*/" : "//" + comment.value);
									}
									return condition.preserve(astNode, comment);
								};
							}
							var map = void 0;
							if (options.sourceMap) {
								map = uglify.SourceMap({ // eslint-disable-line new-cap
									file: file,
									root: ""
								});
								output.source_map = map; // eslint-disable-line camelcase
							}
							var stream = uglify.OutputStream(output); // eslint-disable-line new-cap
							ast.print(stream);
							if (map) map = map + "";
							var stringifiedStream = stream + "";
							var outputSource = map ? new SourceMapSource(stringifiedStream, file, JSON.parse(map), input, inputSourceMap) : new RawSource(stringifiedStream);
							if (extractedComments.length > 0) {
								var commentsFile = options.extractComments.filename || file + ".LICENSE";
								if (typeof commentsFile === "function") {
									commentsFile = commentsFile(file);
								}

								// Write extracted comments to commentsFile
								var commentsSource = new RawSource(extractedComments.join("\n\n") + "\n");
								if (commentsFile in compilation.assets) {
									// commentsFile already exists, append new comments...
									if (compilation.assets[commentsFile] instanceof ConcatSource) {
										compilation.assets[commentsFile].add("\n");
										compilation.assets[commentsFile].add(commentsSource);
									} else {
										compilation.assets[commentsFile] = new ConcatSource(compilation.assets[commentsFile], "\n", commentsSource);
									}
								} else {
									compilation.assets[commentsFile] = commentsSource;
								}

								// Add a banner to the original file
								if (options.extractComments.banner !== false) {
									var banner = options.extractComments.banner || "For license information please see " + commentsFile;
									if (typeof banner === "function") {
										banner = banner(commentsFile);
									}
									if (banner) {
										outputSource = new ConcatSource("/*! " + banner + " */\n", outputSource);
									}
								}
							}
							asset.__UglifyJsPlugin = compilation.assets[file] = outputSource;
							if (warnings.length > 0) {
								compilation.warnings.push(new Error(file + " from UglifyJs\n" + warnings.join("\n")));
							}
						} catch (err) {
							if (err.line) {
								var original = sourceMap && sourceMap.originalPositionFor({
									line: err.line,
									column: err.col
								});
								if (original && original.source) {
									compilation.errors.push(new Error(file + " from UglifyJs\n" + err.message + " [" + requestShortener.shorten(original.source) + ":" + original.line + "," + original.column + "][" + file + ":" + err.line + "," + err.col + "]"));
								} else {
									compilation.errors.push(new Error(file + " from UglifyJs\n" + err.message + " [" + file + ":" + err.line + "," + err.col + "]"));
								}
							} else if (err.msg) {
								compilation.errors.push(new Error(file + " from UglifyJs\n" + err.msg));
							} else compilation.errors.push(new Error(file + " from UglifyJs\n" + err.stack));
						} finally {
							uglify.AST_Node.warn_function = oldWarnFunction; // eslint-disable-line camelcase
						}
					});
					callback();
				});
			});
		}
	}]);

	return UglifyJsPlugin;
}();

module.exports = UglifyJsPlugin;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const Source = __webpack_require__(1);

class CachedSource extends Source {
	constructor(source) {
		super();
		this._source = source;
		this._cachedSource = undefined;
		this._cachedSize = undefined;
		this._cachedMaps = {};

		if(source.node) this.node = function(options) {
			return this._source.node(options);
		};

		if(source.listMap) this.listMap = function(options) {
			return this._source.listMap(options);
		};
	}

	source() {
		if(typeof this._cachedSource !== "undefined") return this._cachedSource;
		return this._cachedSource = this._source.source();
	}

	size() {
		if(typeof this._cachedSize !== "undefined") return this._cachedSize;
		if(typeof this._cachedSource !== "undefined")
			return this._cachedSize = this._cachedSource.length;
		return this._cachedSize = this._source.size();
	}

	sourceAndMap(options) {
		const key = JSON.stringify(options);
		if(typeof this._cachedSource !== "undefined" && key in this._cachedMaps)
			return {
				source: this._cachedSource,
				map: this._cachedMaps[key]
			};
		else if(typeof this._cachedSource !== "undefined") {
			return {
				source: this._cachedSource,
				map: this._cachedMaps[key] = this._source.map(options)
			};
		} else if(key in this._cachedMaps) {
			return {
				source: this._cachedSource = this._source.source(),
				map: this._cachedMaps[key]
			};
		}
		const result = this._source.sourceAndMap(options);
		this._cachedSource = result.source;
		this._cachedMaps[key] = result.map;
		return {
			source: this._cachedSource,
			map: this._cachedMaps[key]
		};
	}

	map(options) {
		if(!options) options = {};
		const key = JSON.stringify(options);
		if(key in this._cachedMaps)
			return this._cachedMaps[key];
		return this._cachedMaps[key] = this._source.map();
	}

	updateHash(hash) {
		this._source.updateHash(hash);
	}
}

module.exports = CachedSource;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const SourceNode = __webpack_require__(0).SourceNode;
const SourceListMap = __webpack_require__(2).SourceListMap;
const Source = __webpack_require__(1);

class ConcatSource extends Source {
	constructor() {
		super();
		this.children = Array.prototype.slice.call(arguments);
	}

	add(item) {
		this.children.push(item);
	}

	source() {
		return this.children.map(function(item) {
			return typeof item === "string" ? item : item.source();
		}).join("");
	}

	size() {
		return this.children.map(function(item) {
			return typeof item === "string" ? item.length : item.size();
		}).reduce(function(sum, s) {
			return sum + s;
		}, 0);
	}

	node(options) {
		const node = new SourceNode(null, null, null, this.children.map(function(item) {
			return typeof item === "string" ? item : item.node(options);
		}));
		return node;
	}

	listMap(options) {
		const map = new SourceListMap();
		this.children.forEach(function(item) {
			if(typeof item === "string")
				map.add(item);
			else
				map.add(item.listMap(options));
		});
		return map;
	}

	updateHash(hash) {
		this.children.forEach(function(item) {
			if(typeof item === "string")
				hash.update(item);
			else
				item.updateHash(hash);
		});
	}
}

__webpack_require__(4)(ConcatSource.prototype);

module.exports = ConcatSource;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var SourceNode = __webpack_require__(0).SourceNode;
var SourceMapConsumer = __webpack_require__(0).SourceMapConsumer;
var SourceListMap = __webpack_require__(2).SourceListMap;
var Source = __webpack_require__(1);

class LineToLineMappedSource extends Source {
	constructor(value, name, originalSource) {
		super();
		this._value = value;
		this._name = name;
		this._originalSource = originalSource;
	}

	source() {
		return this._value;
	}

	node(options) {
		var value = this._value;
		var name = this._name;
		var lines = value.split("\n");
		var node = new SourceNode(null, null, null,
			lines.map(function(line, idx) {
				return new SourceNode(idx + 1, 0, name, (line + (idx != lines.length - 1 ? "\n" : "")));
			})
		);
		node.setSourceContent(name, this._originalSource);
		return node;
	}

	listMap(options) {
		return new SourceListMap(this._value, this._name, this._originalSource)
	}

	updateHash(hash) {
		hash.update(this._value);
		hash.update(this._originalSource);
	}
}

__webpack_require__(4)(LineToLineMappedSource.prototype);

module.exports = LineToLineMappedSource;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var SourceNode = __webpack_require__(0).SourceNode;
var SourceMapConsumer = __webpack_require__(0).SourceMapConsumer;
var SourceListMap = __webpack_require__(2).SourceListMap;
var Source = __webpack_require__(1);

function isSplitter(c) {
	switch(c) {
		case 10: // \n
		case 13: // \r
		case 59: // ;
		case 123: // {
		case 125: // }
			return true;
	}
	return false;
}

function _splitCode(code) {
	var result = [];
	var i = 0;
	var j = 0;
	for(; i < code.length; i++) {
		if(isSplitter(code.charCodeAt(i))) {
			while(isSplitter(code.charCodeAt(++i)));
			result.push(code.substring(j, i));
			j = i;
		}
	}
	if(j < code.length)
		result.push(code.substr(j));
	return result;
}

class OriginalSource extends Source {
	constructor(value, name) {
		super();
		this._value = value;
		this._name = name;
	}

	source() {
		return this._value;
	}

	node(options) {
		options = options || {};
		var sourceMap = this._sourceMap;
		var value = this._value;
		var name = this._name;
		var lines = value.split("\n");
		var node = new SourceNode(null, null, null,
			lines.map(function(line, idx) {
				var pos = 0;
				if(options.columns === false) {
					var content = line + (idx != lines.length - 1 ? "\n" : "");
					return new SourceNode(idx + 1, 0, name, content);
				}
				return new SourceNode(null, null, null,
					_splitCode(line + (idx != lines.length - 1 ? "\n" : "")).map(function(item) {
						if(/^\s*$/.test(item)) return item;
						var res = new SourceNode(idx + 1, pos, name, item);
						pos += item.length;
						return res;
					})
				);
			})
		);
		node.setSourceContent(name, value);
		return node;
	}

	listMap(options) {
		return new SourceListMap(this._value, this._name, this._value)
	}

	updateHash(hash) {
		hash.update(this._value);
	}
}

__webpack_require__(4)(OriginalSource.prototype);

module.exports = OriginalSource;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var Source = __webpack_require__(1);
var SourceNode = __webpack_require__(0).SourceNode;

var REPLACE_REGEX = /\n(?=.|\s)/g;

function cloneAndPrefix(node, prefix, append) {
	if(typeof node === "string") {
		var result = node.replace(REPLACE_REGEX, "\n" + prefix);
		if(append.length > 0) result = append.pop() + result;
		if(/\n$/.test(node)) append.push(prefix);
		return result;
	} else {
		var newNode = new SourceNode(
			node.line,
			node.column,
			node.source,
			node.children.map(function(node) {
				return cloneAndPrefix(node, prefix, append);
			}),
			node.name
		);
		newNode.sourceContents = node.sourceContents;
		return newNode;
	}
};

class PrefixSource extends Source {
	constructor(prefix, source) {
		super();
		this._source = source;
		this._prefix = prefix;
	}

	source() {
		var node = typeof this._source === "string" ? this._source : this._source.source();
		var prefix = this._prefix;
		return prefix + node.replace(REPLACE_REGEX, "\n" + prefix);
	}

	node(options) {
		var node = this._source.node(options);
		var append = [this._prefix];
		return new SourceNode(null, null, null, [
			cloneAndPrefix(node, this._prefix, append)
		]);
	}

	listMap(options) {
		var prefix = this._prefix;
		var map = this._source.listMap(options);
		return map.mapGeneratedCode(function(code) {
			return prefix + code.replace(REPLACE_REGEX, "\n" + prefix);
		});
	}

	updateHash(hash) {
		if(typeof this._source === "string")
			hash.update(this._source);
		else
			this._source.updateHash(hash);
		if(typeof this._prefix === "string")
			hash.update(this._prefix);
		else
			this._prefix.updateHash(hash);
	}
}

__webpack_require__(4)(PrefixSource.prototype);

module.exports = PrefixSource;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var Source = __webpack_require__(1);
var SourceNode = __webpack_require__(0).SourceNode;
var SourceListMap = __webpack_require__(2).SourceListMap;

class RawSource extends Source {
	constructor(value) {
		super();
		this._value = value;
	}

	source() {
		return this._value;
	}

	map(options) {
		return null;
	}

	node(options) {
		return new SourceNode(null, null, null, this._value);
	}

	listMap(options) {
		return new SourceListMap(this._value);
	}

	updateHash(hash) {
		hash.update(this._value);
	}
}

module.exports = RawSource;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var Source = __webpack_require__(1);
var SourceNode = __webpack_require__(0).SourceNode;
var SourceListMap = __webpack_require__(2).SourceListMap;
var fromStringWithSourceMap = __webpack_require__(2).fromStringWithSourceMap;
var SourceMapConsumer = __webpack_require__(0).SourceMapConsumer;

class ReplaceSource extends Source {
	constructor(source, name) {
		super();
		this._source = source;
		this._name = name;
		this.replacements = [];
	}

	replace(start, end, newValue) {
		if(typeof newValue !== "string")
			throw new Error("insertion must be a string, but is a " + typeof newValue);
		this.replacements.push([start, end, newValue, this.replacements.length]);
	}

	insert(pos, newValue) {
		if(typeof newValue !== "string")
			throw new Error("insertion must be a string, but is a " + typeof newValue + ": " + newValue);
		this.replacements.push([pos, pos - 1, newValue, this.replacements.length]);
	}

	source(options) {
		return this._replaceString(this._source.source());
	}

	original() {
		return this._source;
	}

	_sortReplacements() {
		this.replacements.sort(function(a, b) {
			var diff = b[1] - a[1];
			if(diff !== 0)
				return diff;
			diff = b[0] - a[0];
			if(diff !== 0)
				return diff;
			return b[3] - a[3];
		});
	}

	_replaceString(str) {
		if(typeof str !== "string")
			throw new Error("str must be a string, but is a " + typeof str + ": " + str);
		this._sortReplacements();
		var result = [str];
		this.replacements.forEach(function(repl) {
			var remSource = result.pop();
			var splitted1 = this._splitString(remSource, Math.floor(repl[1] + 1));
			var splitted2 = this._splitString(splitted1[0], Math.floor(repl[0]));
			result.push(splitted1[1], repl[2], splitted2[0]);
		}, this);
		result = result.reverse();
		return result.join("");
	}

	node(options) {
		this._sortReplacements();
		var result = [this._source.node(options)];
		this.replacements.forEach(function(repl) {
			var remSource = result.pop();
			var splitted1 = this._splitSourceNode(remSource, Math.floor(repl[1] + 1));
			var splitted2;
			if(Array.isArray(splitted1)) {
				splitted2 = this._splitSourceNode(splitted1[0], Math.floor(repl[0]));
				if(Array.isArray(splitted2)) {
					result.push(splitted1[1], this._replacementToSourceNode(splitted2[1], repl[2]), splitted2[0]);
				} else {
					result.push(splitted1[1], this._replacementToSourceNode(splitted1[1], repl[2]), splitted1[0]);
				}
			} else {
				splitted2 = this._splitSourceNode(remSource, Math.floor(repl[0]));
				if(Array.isArray(splitted2)) {
					result.push(this._replacementToSourceNode(splitted2[1], repl[2]), splitted2[0]);
				} else {
					result.push(repl[2], remSource);
				}
			}
		}, this);
		result = result.reverse();
		return new SourceNode(null, null, null, result);
	}

	listMap(options) {
		this._sortReplacements();
		var map = this._source.listMap(options);
		var currentIndex = 0;
		var replacements = this.replacements;
		var idxReplacement = replacements.length - 1;
		var removeChars = 0;
		map = map.mapGeneratedCode(function(str) {
			var newCurrentIndex = currentIndex + str.length;
			if(removeChars > str.length) {
				removeChars -= str.length;
				str = "";
			} else {
				if(removeChars > 0) {
					str = str.substr(removeChars);
					currentIndex += removeChars;
					removeChars = 0;
				}
				var finalStr = "";
				while(idxReplacement >= 0 && replacements[idxReplacement][0] < newCurrentIndex) {
					var repl = replacements[idxReplacement];
					var start = Math.floor(repl[0]);
					var end = Math.floor(repl[1] + 1);
					var before = str.substr(0, Math.max(0, start - currentIndex));
					if(end <= newCurrentIndex) {
						var after = str.substr(Math.max(0, end - currentIndex));
						finalStr += before + repl[2];
						str = after;
						currentIndex = Math.max(currentIndex, end);
					} else {
						finalStr += before + repl[2];
						str = "";
						removeChars = end - newCurrentIndex;
					}
					idxReplacement--;
				}
				str = finalStr + str;
			}
			currentIndex = newCurrentIndex;
			return str;
		});
		var extraCode = "";
		while(idxReplacement >= 0) {
			extraCode += replacements[idxReplacement][2];
			idxReplacement--;
		}
		if(extraCode) {
			map.add(extraCode);
		}
		return map;
	}

	_replacementToSourceNode(oldNode, newString) {
		var map = oldNode.toStringWithSourceMap({
			file: "?"
		}).map;
		var original = new SourceMapConsumer(map.toJSON()).originalPositionFor({
			line: 1,
			column: 0
		});
		if(original) {
			return new SourceNode(original.line, original.column, original.source, newString);
		} else {
			return newString;
		}
	}

	_splitSourceNode(node, position) {
		if(typeof node === "string") {
			if(node.length <= position) return position - node.length;
			return position <= 0 ? ["", node] : [node.substr(0, position), node.substr(position)];
		} else {
			for(var i = 0; i < node.children.length; i++) {
				position = this._splitSourceNode(node.children[i], position);
				if(Array.isArray(position)) {
					var leftNode = new SourceNode(
						node.line,
						node.column,
						node.source,
						node.children.slice(0, i).concat([position[0]]),
						node.name
					);
					var rightNode = new SourceNode(
						node.line,
						node.column,
						node.source, [position[1]].concat(node.children.slice(i + 1)),
						node.name
					);
					leftNode.sourceContents = node.sourceContents;
					return [leftNode, rightNode];
				}
			}
			return position;
		}
	}

	_splitString(str, position) {
		return position <= 0 ? ["", str] : [str.substr(0, position), str.substr(position)];
	}
}

__webpack_require__(4)(ReplaceSource.prototype);

module.exports = ReplaceSource;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


var SourceNode = __webpack_require__(0).SourceNode;
var SourceMapConsumer = __webpack_require__(0).SourceMapConsumer;
var SourceMapGenerator = __webpack_require__(0).SourceMapGenerator;
var SourceListMap = __webpack_require__(2).SourceListMap;
var fromStringWithSourceMap = __webpack_require__(2).fromStringWithSourceMap;
var Source = __webpack_require__(1);

class SourceMapSource extends Source {
	constructor(value, name, sourceMap, originalSource, innerSourceMap) {
		super();
		this._value = value;
		this._name = name;
		this._sourceMap = sourceMap;
		this._originalSource = originalSource;
		this._innerSourceMap = innerSourceMap;
	}

	source() {
		return this._value;
	}

	node(options) {
		var innerSourceMap = this._innerSourceMap;
		var sourceMap = this._sourceMap;
		if(innerSourceMap) {
			sourceMap = SourceMapGenerator.fromSourceMap(new SourceMapConsumer(sourceMap));
			if(this._originalSource)
				sourceMap.setSourceContent(this._name, this._originalSource);
			innerSourceMap = new SourceMapConsumer(innerSourceMap);
			sourceMap.applySourceMap(innerSourceMap, this._name);
			sourceMap = sourceMap.toJSON();
		}
		return SourceNode.fromStringWithSourceMap(this._value, new SourceMapConsumer(sourceMap));
	}

	listMap(options) {
		options = options || {};
		if(options.module === false)
			return new SourceListMap(this._value, this._name, this._value);
		return fromStringWithSourceMap(this._value, typeof this._sourceMap === "string" ? JSON.parse(this._sourceMap) : this._sourceMap);
	}

	updateHash(hash) {
		hash.update(this._value);
		if(this._originalSource)
			hash.update(this._originalSource);
	}
}

__webpack_require__(4)(SourceMapSource.prototype);

module.exports = SourceMapSource;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var ModuleFilenameHelpers = exports;

ModuleFilenameHelpers.ALL_LOADERS_RESOURCE = "[all-loaders][resource]";
ModuleFilenameHelpers.REGEXP_ALL_LOADERS_RESOURCE = /\[all-?loaders\]\[resource\]/gi;
ModuleFilenameHelpers.LOADERS_RESOURCE = "[loaders][resource]";
ModuleFilenameHelpers.REGEXP_LOADERS_RESOURCE = /\[loaders\]\[resource\]/gi;
ModuleFilenameHelpers.RESOURCE = "[resource]";
ModuleFilenameHelpers.REGEXP_RESOURCE = /\[resource\]/gi;
ModuleFilenameHelpers.ABSOLUTE_RESOURCE_PATH = "[absolute-resource-path]";
ModuleFilenameHelpers.REGEXP_ABSOLUTE_RESOURCE_PATH = /\[abs(olute)?-?resource-?path\]/gi;
ModuleFilenameHelpers.RESOURCE_PATH = "[resource-path]";
ModuleFilenameHelpers.REGEXP_RESOURCE_PATH = /\[resource-?path\]/gi;
ModuleFilenameHelpers.ALL_LOADERS = "[all-loaders]";
ModuleFilenameHelpers.REGEXP_ALL_LOADERS = /\[all-?loaders\]/gi;
ModuleFilenameHelpers.LOADERS = "[loaders]";
ModuleFilenameHelpers.REGEXP_LOADERS = /\[loaders\]/gi;
ModuleFilenameHelpers.QUERY = "[query]";
ModuleFilenameHelpers.REGEXP_QUERY = /\[query\]/gi;
ModuleFilenameHelpers.ID = "[id]";
ModuleFilenameHelpers.REGEXP_ID = /\[id\]/gi;
ModuleFilenameHelpers.HASH = "[hash]";
ModuleFilenameHelpers.REGEXP_HASH = /\[hash\]/gi;

function getAfter(str, token) {
	var idx = str.indexOf(token);
	return idx < 0 ? "" : str.substr(idx);
}

function getBefore(str, token) {
	var idx = str.lastIndexOf(token);
	return idx < 0 ? "" : str.substr(0, idx);
}

function getHash(str) {
	var hash = __webpack_require__(40).createHash("md5");
	hash.update(str);
	return hash.digest("hex").substr(0, 4);
}

function asRegExp(test) {
	if(typeof test === "string") test = new RegExp("^" + test.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
	return test;
}

ModuleFilenameHelpers.createFilename = function createFilename(module, moduleFilenameTemplate, requestShortener) {
	var absoluteResourcePath;
	var hash;
	var identifier;
	var moduleId;
	var shortIdentifier;
	if(!module) module = "";
	if(typeof module === "string") {
		shortIdentifier = requestShortener.shorten(module);
		identifier = shortIdentifier;
		moduleId = "";
		absoluteResourcePath = module.split("!").pop();
		hash = getHash(identifier);
	} else {
		shortIdentifier = module.readableIdentifier(requestShortener);
		identifier = requestShortener.shorten(module.identifier());
		moduleId = module.id;
		absoluteResourcePath = module.resourcePath || module.identifier().split("!").pop();
		hash = getHash(identifier);
	}
	var resource = shortIdentifier.split("!").pop();
	var loaders = getBefore(shortIdentifier, "!");
	var allLoaders = getBefore(identifier, "!");
	var query = getAfter(resource, "?");
	var resourcePath = resource.substr(0, resource.length - query.length);
	if(typeof moduleFilenameTemplate === "function") {
		return moduleFilenameTemplate({
			identifier: identifier,
			shortIdentifier: shortIdentifier,
			resource: resource,
			resourcePath: resourcePath,
			absoluteResourcePath: absoluteResourcePath,
			allLoaders: allLoaders,
			query: query,
			moduleId: moduleId,
			hash: hash
		});
	}
	return moduleFilenameTemplate
		.replace(ModuleFilenameHelpers.REGEXP_ALL_LOADERS_RESOURCE, identifier)
		.replace(ModuleFilenameHelpers.REGEXP_LOADERS_RESOURCE, shortIdentifier)
		.replace(ModuleFilenameHelpers.REGEXP_RESOURCE, resource)
		.replace(ModuleFilenameHelpers.REGEXP_RESOURCE_PATH, resourcePath)
		.replace(ModuleFilenameHelpers.REGEXP_ABSOLUTE_RESOURCE_PATH, absoluteResourcePath)
		.replace(ModuleFilenameHelpers.REGEXP_ALL_LOADERS, allLoaders)
		.replace(ModuleFilenameHelpers.REGEXP_LOADERS, loaders)
		.replace(ModuleFilenameHelpers.REGEXP_QUERY, query)
		.replace(ModuleFilenameHelpers.REGEXP_ID, moduleId)
		.replace(ModuleFilenameHelpers.REGEXP_HASH, hash);
};

ModuleFilenameHelpers.createFooter = function createFooter(module, requestShortener) {
	if(!module) module = "";
	if(typeof module === "string") {
		return [
			"// WEBPACK FOOTER //",
			"// " + requestShortener.shorten(module)
		].join("\n");
	} else {
		return [
			"//////////////////",
			"// WEBPACK FOOTER",
			"// " + module.readableIdentifier(requestShortener),
			"// module id = " + module.id,
			"// module chunks = " + module.chunks.map(function(c) {
				return c.id;
			}).join(" ")
		].join("\n");
	}
};

ModuleFilenameHelpers.replaceDuplicates = function replaceDuplicates(array, fn, comparator) {
	var countMap = {};
	var posMap = {};
	array.forEach(function(item, idx) {
		countMap[item] = (countMap[item] || []);
		countMap[item].push(idx);
		posMap[item] = 0;
	});
	if(comparator) {
		Object.keys(countMap).forEach(function(item) {
			countMap[item].sort(comparator);
		});
	}
	return array.map(function(item, i) {
		if(countMap[item].length > 1) {
			if(comparator && countMap[item][0] === i)
				return item;
			return fn(item, i, posMap[item]++);
		} else return item;
	});
};

ModuleFilenameHelpers.matchPart = function matchPart(str, test) {
	if(!test) return true;
	test = asRegExp(test);
	if(Array.isArray(test)) {
		return test.map(asRegExp).filter(function(regExp) {
			return regExp.test(str);
		}).length > 0;
	} else {
		return test.test(str);
	}
};

ModuleFilenameHelpers.matchObject = function matchObject(obj, str) {
	if(obj.test)
		if(!ModuleFilenameHelpers.matchPart(str, obj.test)) return false;
	if(obj.include)
		if(!ModuleFilenameHelpers.matchPart(str, obj.include)) return false;
	if(obj.exclude)
		if(ModuleFilenameHelpers.matchPart(str, obj.exclude)) return false;
	return true;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/


const path = __webpack_require__(16);

class RequestShortener {
	constructor(directory) {
		directory = directory.replace(/\\/g, "/");
		let parentDirectory = path.dirname(directory);
		if(/[\/\\]$/.test(directory)) directory = directory.substr(0, directory.length - 1);

		if(directory) {
			let currentDirectoryRegExp = directory.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			currentDirectoryRegExp = new RegExp("^" + currentDirectoryRegExp + "|(!)" + currentDirectoryRegExp, "g");
			this.currentDirectoryRegExp = currentDirectoryRegExp;
		}

		if(/[\/\\]$/.test(parentDirectory)) parentDirectory = parentDirectory.substr(0, parentDirectory.length - 1);
		if(parentDirectory && parentDirectory !== directory) {
			let parentDirectoryRegExp = parentDirectory.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			parentDirectoryRegExp = new RegExp("^" + parentDirectoryRegExp + "|(!)" + parentDirectoryRegExp, "g");
			this.parentDirectoryRegExp = parentDirectoryRegExp;
		}

		if(__dirname.length >= 2) {
			let buildins = path.join(__dirname, "..").replace(/\\/g, "/");
			let buildinsAsModule = this.currentDirectoryRegExp && this.currentDirectoryRegExp.test(buildins);
			let buildinsRegExp = buildins.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
			buildinsRegExp = new RegExp("^" + buildinsRegExp + "|(!)" + buildinsRegExp, "g");
			this.buildinsAsModule = buildinsAsModule;
			this.buildinsRegExp = buildinsRegExp;
		}

		this.nodeModulesRegExp = /\/node_modules\//g;
		this.indexJsRegExp = /\/index.js(!|\?|\(query\))/g;
	}

	shorten(request) {
		if(!request) return request;
		request = request.replace(/\\/g, "/");
		if(this.buildinsAsModule && this.buildinsRegExp)
			request = request.replace(this.buildinsRegExp, "!(webpack)");
		if(this.currentDirectoryRegExp)
			request = request.replace(this.currentDirectoryRegExp, "!.");
		if(this.parentDirectoryRegExp)
			request = request.replace(this.parentDirectoryRegExp, "!..");
		if(!this.buildinsAsModule && this.buildinsRegExp)
			request = request.replace(this.buildinsRegExp, "!(webpack)");
		request = request.replace(this.nodeModulesRegExp, "/~/");
		request = request.replace(this.indexJsRegExp, "$1");
		return request.replace(/^!|!$/, "");
	}
}

module.exports = RequestShortener;

/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _indexNode = __webpack_require__(17);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = exports.Controller = function (_SuperController) {
  _inherits(Controller, _SuperController);

  function Controller() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Controller);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.webpackBasicConfig = _extends({}, new _indexNode.Controller().webpackBasicConfig), _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Controller;
}(_indexNode.Controller);

exports.default = new Controller();

/***/ })
/******/ ]);