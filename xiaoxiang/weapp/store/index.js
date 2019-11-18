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
    phone: '',
    ajaxSrc: 'http://move.pc-online.cc/mobile/',
    userOpenID: '',
    orderNums: '',
    basePrice: 0,
    remarks: {
      remarks1: '',
      remarks2: ''
    }
  },
  mutations: {
    setOpenId: function setOpenId(state, data) {
      state.userOpenID = data;
    },
    setOrderNums: function setOrderNums(state, data) {
      state.orderNums = data;
    },
    setBasePrice: function setBasePrice(state, data) {
      state.basePrice = data;
    },
    setRemarks: function setRemarks(state, data) {
      state.remarks = data;
    },
    setPhone: function setPhone(state, data) {
      state.phone = data;
    }
  }
});

exports["default"] = _default;