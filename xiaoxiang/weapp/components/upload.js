"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('../vendor.js')(2));

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _util = require('../res/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chooseImage = (0, _util.promisify)(wx.chooseImage);
var chooseVideo = (0, _util.promisify)(wx.chooseVideo);
var uploadFile = (0, _util.promisify)(wx.uploadFile);

_core["default"].component({
  store: _store["default"],
  data: {
    srcList: [],
    showSelect: false
  },
  props: {
    itemData: {
      type: String,
      "default": ''
    }
  },
  computed: {
    ajaxSrc: function ajaxSrc() {
      return _store["default"].state.ajaxSrc;
    }
  },
  attached: function attached() {},
  methods: {
    openImgFile: function openImgFile() {
      var _this = this;

      var imgRes, list, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, src;

      return _regeneratorRuntime2["default"].async(function openImgFile$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 选择图片
              this.showSelect = false;
              _context.next = 3;
              return _regeneratorRuntime2["default"].awrap(chooseImage());

            case 3:
              imgRes = _context.sent;
              list = [];
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;
              _iterator = imgRes.tempFilePaths[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 20;
                break;
              }

              src = _step.value;
              _context.t0 = list;
              _context.next = 15;
              return _regeneratorRuntime2["default"].awrap(uploadFile({
                url: "".concat(this.ajaxSrc, "upload/image"),
                filePath: src,
                name: 'userfile'
              }));

            case 15:
              _context.t1 = _context.sent;

              _context.t0.push.call(_context.t0, _context.t1);

            case 17:
              _iteratorNormalCompletion = true;
              _context.next = 10;
              break;

            case 20:
              _context.next = 26;
              break;

            case 22:
              _context.prev = 22;
              _context.t2 = _context["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context.t2;

            case 26:
              _context.prev = 26;
              _context.prev = 27;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 29:
              _context.prev = 29;

              if (!_didIteratorError) {
                _context.next = 32;
                break;
              }

              throw _iteratorError;

            case 32:
              return _context.finish(29);

            case 33:
              return _context.finish(26);

            case 34:
              Promise.all(list).then(function (res) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                  for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var i = _step2.value;
                    var data = JSON.parse(i.data);

                    _this.srcList.push({
                      type: 'image',
                      url: data.url
                    });
                  }
                } catch (err) {
                  _didIteratorError2 = true;
                  _iteratorError2 = err;
                } finally {
                  try {
                    if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                      _iterator2["return"]();
                    }
                  } finally {
                    if (_didIteratorError2) {
                      throw _iteratorError2;
                    }
                  }
                }
              });

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[8, 22, 26, 34], [27,, 29, 33]]);
    },
    openVideoFile: function openVideoFile() {
      var imgRes, res, data;
      return _regeneratorRuntime2["default"].async(function openVideoFile$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 选择视频
              this.showSelect = false;
              _context2.next = 3;
              return _regeneratorRuntime2["default"].awrap(chooseVideo());

            case 3:
              imgRes = _context2.sent;
              _context2.next = 6;
              return _regeneratorRuntime2["default"].awrap(uploadFile({
                url: "".concat(this.ajaxSrc, "upload/video"),
                filePath: imgRes.tempFilePath,
                name: 'userfile'
              }));

            case 6:
              res = _context2.sent;
              data = JSON.parse(res.data);
              this.srcList.push({
                type: 'video',
                url: data.url
              });

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = true
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openVideoFile($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openImgFile($event)
      })();
    
  }},'18-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showSelect = false
      })();
    
  }}}, models: {} });