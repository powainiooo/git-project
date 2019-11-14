"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('../vendor.js')(2));

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _util = require('../res/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chooseImage = (0, _util.promisify)(wx.chooseImage);
var uploadFile = (0, _util.promisify)(wx.uploadFile);

_core["default"].component({
  data: {
    srcList: []
  },
  attached: function attached() {},
  methods: {
    openFile: function openFile() {
      var imgRes;
      return _regeneratorRuntime2["default"].async(function openFile$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _regeneratorRuntime2["default"].awrap(chooseImage());

            case 2:
              imgRes = _context.sent;
              console.log(imgRes);
              this.srcList = imgRes.tempFilePaths;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'19-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.openFile($event)
      })();
    
  }}}, models: {} });