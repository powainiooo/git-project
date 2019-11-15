"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configData = {
  "status": 0,
  "data": {
    "wxmenu": [{
      "name": "\u62C6\u4EF6",
      "sub_button": {
        "1": {
          "name": "\u71C3\u6C14\u7076\u6CB9\u70DF\u673A\u5957",
          "price": "10"
        },
        "2": {
          "name": "\u6C14\u538B\u5E8A/\u5B50\u6BCD\u5E8A",
          "price": "15"
        },
        "3": {
          "name": "\u7A7A\u8C03",
          "price": "20"
        }
      }
    }, {
      "name": "\u5927\u4EF6",
      "sub_button": {
        "1": {
          "name": "5\u95E8\u4EE5\u4E0A\u8863\u67DC",
          "price": "10"
        },
        "2": {
          "name": "1.5\u7C73\u540C\u4EE5\u4E0A\u4FDD\u9669\u67DC",
          "price": "15"
        },
        "3": {
          "name": "65-75\u82F1\u5BF8\u7535\u89C6",
          "price": "30"
        }
      }
    }, {
      "name": "\u53EF\u9009\u670D\u52A1",
      "sub_button": {
        "1": {
          "name": "\u6253\u5305\u7EB8\u76D2",
          "price": "15"
        },
        "2": {
          "name": "\u98CE\u6C34\u6307\u5BFC",
          "price": "20"
        },
        "3": {
          "name": "\u4E0A\u95E8\u5305\u88C5",
          "price": "25"
        }
      }
    }]
  }
};

_core["default"].page({
  store: _store["default"],
  data: {
    check: '',
    page: 'standard',
    configData: configData.data.wxmenu
  },
  computed: {
    phone: function phone() {
      return _store["default"].state.phone;
    }
  },
  onLoad: function onLoad() {
    console.log(configData);
  },
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
}, {info: {"components":{"numbers":{"path":"..\\components\\numbers"},"upload":{"path":"..\\components\\upload"}},"on":{}}, handlers: {'12-27': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('standard')
      })();
    
  }},'12-28': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('picture')
      })();
    
  }},'12-29': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {} }, {info: {"components":{"numbers":{"path":"..\\components\\numbers"},"upload":{"path":"..\\components\\upload"}},"on":{}}, handlers: {'12-27': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('standard')
      })();
    
  }},'12-28': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('picture')
      })();
    
  }},'12-29': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {} });