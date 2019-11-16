"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _api = require('../res/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    check: '',
    page: 'standard',
    menuList: [],
    price: 0
  },
  computed: {
    phone: function phone() {
      return _store["default"].state.phone;
    },
    basePrice: function basePrice() {
      return _store["default"].state.basePrice;
    }
  },
  onLoad: function onLoad() {
    this.getMenuList();
  },
  methods: {
    makePhone: function makePhone() {
      wx.makePhoneCall({
        phoneNumber: this.phone
      });
    },
    togglePage: function togglePage(page) {
      this.page = page;
    },
    getMenuList: function getMenuList() {
      var _this = this;

      (0, _api.getMenuList)().then(function (res) {
        _this.menuList = res.data.wxmenu;
      });
    },
    countPrice: function countPrice() {
      for (var i = 0; i < this.menuList.length; i++) {
        var item = this.selectComponent("#numbers".concat(i));
        console.log(item);
      }
    }
  }
}, {info: {"components":{"numbers":{"path":"..\\components\\numbers"},"upload":{"path":"..\\components\\upload"}},"on":{"11-45":["count"]}}, handlers: {'11-43': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('standard')
      })();
    
  }},'11-44': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('picture')
      })();
    
  }},'11-45': {"count": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.countPrice($event)
      })();
    
  }},'11-46': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.countPrice($event)
      })();
    
  }},'11-47': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {} });