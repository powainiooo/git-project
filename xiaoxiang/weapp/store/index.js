"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _x = _interopRequireDefault(require('../vendor.js')(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].use(_x["default"]);

var _default = new _x["default"].Store({
  state: {
    phone: '0755-88888888',
    ajaxSrc: 'http://move.pc-online.cc/mobile/applet/',
    userOpenID: '',
    orderNums: ''
  },
  mutations: {
    setOpenId: function setOpenId(state, data) {
      state.userOpenID = data;
    },
    setOrderNums: function setOrderNums(state, data) {
      state.orderNums = data;
    }
  }
});

exports["default"] = _default;