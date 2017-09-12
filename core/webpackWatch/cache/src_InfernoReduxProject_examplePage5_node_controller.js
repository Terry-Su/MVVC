module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var webpack = __webpack_require__(6);

module.exports = function (config) {
  var compiler = webpack(config);

  if (!process.env.production) {
    var watching = compiler.watch({
      /* watchOptions */
    }, function (err, stats) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true // Shows colors in the console
      }));
    });
  }

  if (process.env.production) {
    compiler.run(function (err, stats) {
      if (err) {
        console.error(err);
        return;
      }

      console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true // Shows colors in the console
      }));
    });
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _indexNode = __webpack_require__(3);

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _indexNode = __webpack_require__(4);

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
              presets: ['es2015', 'stage-2'],
              plugins: ['inferno']
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UglifyJSPlugin = __webpack_require__(5);

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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("uglifyjs-webpack-plugin");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Controller = undefined;

var _path = __webpack_require__(2);

var _path2 = _interopRequireDefault(_path);

var _execWebpack = __webpack_require__(0);

var _execWebpack2 = _interopRequireDefault(_execWebpack);

var _indexNode = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Controller.__proto__ || Object.getPrototypeOf(Controller)).call.apply(_ref, [this].concat(args))), _this), _this.watchWebByWebpack = function () {
      var _ref2 = new _indexNode.Controller(),
          webpackBasicConfig = _ref2.webpackBasicConfig;

      var webpackConfig = Object.assign(webpackBasicConfig, {
        entry: _path2.default.resolve(process.cwd(), 'src/InfernoReduxProject/examplePage5/controller/entry.js'),
        output: {
          path: _path2.default.resolve(process.cwd(), 'public/InfernoReduxProject/examplePage5'),
          filename: 'bundle.js'
        }
      });

      (0, _execWebpack2.default)(webpackConfig);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Controller;
}(_indexNode.Controller);

exports.default = new Controller();

/***/ })
/******/ ]);