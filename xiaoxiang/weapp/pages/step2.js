"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    check: '',
    page: 'picture'
  },
  computed: {
    phone: function phone() {
      return _store["default"].state.phone;
    }
  },
  onLoad: function onLoad() {},
  methods: {
    makePhone: function makePhone() {
      wx.makePhoneCall({
        phoneNumber: this.phone
      });
    },
    togglePage: function togglePage(page) {
      this.page = page;
    }
  }
}, {info: {"components":{"numbers":{"path":"..\\components\\numbers"},"upload":{"path":"..\\components\\upload"}},"on":{}}, handlers: {'12-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('standard')
      })();
    
  }},'12-1': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('picture')
      })();
    
  }},'12-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {} });