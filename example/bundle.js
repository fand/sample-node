(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// To build, run `browserify example/index.js -o example/bundle.js`
const SampleNode = require('../lib/SampleNode');

const ctx = new AudioContext();
const sampleNode = new SampleNode(ctx, './kick.wav');
sampleNode.connect(ctx.destination);

const button = document.querySelector('button');
button.addEventListener('click', () => {
  sampleNode.play();
});

},{"../lib/SampleNode":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _altnodeAltAudioNode = require('altnode.alt-audio-node');

var _altnodeAltAudioNode2 = _interopRequireDefault(_altnodeAltAudioNode);

var _fandLoadAudio = require('@fand/load-audio');

var _fandLoadAudio2 = _interopRequireDefault(_fandLoadAudio);

var SampleNode = (function (_AltAudioNode) {
  _inherits(SampleNode, _AltAudioNode);

  /**
   * @param {AudioContext} ctx
   * @param {string}       url
   */

  function SampleNode(ctx, url) {
    var _this = this;

    _classCallCheck(this, SampleNode);

    _get(Object.getPrototypeOf(SampleNode.prototype), 'constructor', this).call(this, ctx);

    this._ctx = ctx;

    this.playbackRate = 1.0;

    (0, _fandLoadAudio2['default'])(this._ctx, url).then(function (buffer) {
      _this._buffer = buffer;
    });

    this._node = null;
    this._in = this._ctx.createGain();
    this._out = this._ctx.createGain();
  }

  _createClass(SampleNode, [{
    key: 'play',
    value: function play() {
      var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

      if (!this._buffer) {
        return;
      }

      if (this._node) {
        this._node.stop(Math.max(time - 0.01, 0));
      }

      var node = this._ctx.createBufferSource();

      node.buffer = this._buffer;
      node.playbackRate.value = this.playbackRate;

      node.connect(this._out);
      node.start(time);

      this._node = node;
    }
  }, {
    key: 'connect',
    value: function connect() {
      var _out;

      (_out = this._out).connect.apply(_out, arguments);
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      var _out2;

      (_out2 = this._out).disconnect.apply(_out2, arguments);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      this._out.disconnect();
      this._out = null;
    }
  }, {
    key: '__connectFrom',
    value: function __connectFrom(source) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      source.connect.apply(source, [this._in].concat(args));
    }
  }, {
    key: '__disconnectFrom',
    value: function __disconnectFrom(source) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      source.disconnect.apply(source, [this._in].concat(args));
    }
  }, {
    key: 'gain',
    get: function get() {
      return this._out.gain;
    }
  }]);

  return SampleNode;
})(_altnodeAltAudioNode2['default']);

exports['default'] = SampleNode;
module.exports = exports['default'];
},{"@fand/load-audio":3,"altnode.alt-audio-node":4}],3:[function(require,module,exports){
'use strict';

/**
 * Fetch audio file from url.
 * @param {string} url
 * @return {Promise<ArrayBuffer>}
 */
function fetchAudio (url) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.open('GET', url, true);
    req.responseType = 'arraybuffer';

    req.onload = () => {
      if (req.response) {
        resolve(req.response);
      }
      else {
        reject(new Error(`Could not fetch audio data from URL '${url}'`));
      }
    };

    req.send();
  });
}

/**
 * Decode ArrayBuffer to AudioBuffer.
 * @param {AudioContext} ctx
 * @param {ArrayBuffer}  arrayBuffer
 * @return {Promise<AudioBuffer>}
 */
function decodeAudio (ctx, arrayBuffer) {
  return new Promise((resolve, reject) => {
    ctx.decodeAudioData(arrayBuffer, (buffer) => {
      resolve(buffer);
    }, (err) => {
      reject(err);
    });
  });
}

/**
 * Fetch and decode sound from URL.
 * @param {AudioContext} ctx
 * @param {string}       url
 * @return {Promise<AudioBuffer>}
 */
module.exports = function loadAudio (ctx, url) {
  return fetchAudio(url).then((res) => decodeAudio(ctx, res));
};

},{}],4:[function(require,module,exports){
module.exports = require("./lib");

},{"./lib":7}],5:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("./customize-audio-node-prototype");

var _symbols = require("./symbols");

function AudioNode() {}

if (global.AudioNode) {
  AudioNode.prototype = Object.create(global.AudioNode.prototype, {
    constructor: { value: AudioNode, enumerable: false, writable: true, configurable: true }
  });
}

var AltAudioNode = (function (_AudioNode) {
  _inherits(AltAudioNode, _AudioNode);

  function AltAudioNode(audioContext) {
    _classCallCheck(this, AltAudioNode);

    _get(Object.getPrototypeOf(AltAudioNode.prototype), "constructor", this).call(this);

    this[_symbols.CONTEXT] = audioContext;
  }

  _createClass(AltAudioNode, [{
    key: "connect",
    value: function connect() {}
  }, {
    key: "disconnect",
    value: function disconnect() {}
  }, {
    key: "dispose",
    value: function dispose() {}

    // __connectFrom() {}
    // __disconnectFrom() {}
  }, {
    key: "context",
    get: function get() {
      return this[_symbols.CONTEXT];
    }
  }]);

  return AltAudioNode;
})(AudioNode);

exports["default"] = AltAudioNode;
module.exports = exports["default"];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./customize-audio-node-prototype":6,"./symbols":8}],6:[function(require,module,exports){
(function (global){
"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var AudioNode = global.AudioNode;
var AudioNode_connect = undefined;
var AudioNode_disconnect = undefined;

function connect() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args[0] && typeof args[0].__connectFrom === "function") {
    var _args$0;

    (_args$0 = args[0]).__connectFrom.apply(_args$0, [this].concat(_toConsumableArray(args.slice(1))));
  } else {
    AudioNode_connect.apply(this, args);
  }
}

function disconnect() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (args[0] && typeof args[0].__disconnectFrom === "function") {
    var _args$02;

    (_args$02 = args[0]).__disconnectFrom.apply(_args$02, [this].concat(_toConsumableArray(args.slice(1))));
  } else {
    AudioNode_disconnect.apply(this, args);
  }
}

if (AudioNode && !global.__altnode$customizeAudioNode) {
  global.__altnode$customizeAudioNode = true;

  AudioNode_connect = AudioNode.prototype.connect;
  AudioNode_disconnect = AudioNode.prototype.disconnect;

  AudioNode.prototype.connect = connect;
  AudioNode.prototype.disconnect = disconnect;
}
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _AltAudioNode = require("./AltAudioNode");

var _AltAudioNode2 = _interopRequireDefault(_AltAudioNode);

exports["default"] = _AltAudioNode2["default"];
module.exports = exports["default"];
},{"./AltAudioNode":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var CONTEXT = typeof Symbol !== "undefined" ? Symbol("CONTEXT") : "altnode.alt-audio-node/CONTEXT";
exports.CONTEXT = CONTEXT;
},{}]},{},[1]);
