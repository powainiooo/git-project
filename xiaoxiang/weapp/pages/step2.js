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
      this.price = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.$is === 'components/numbers') {
            this.price += item.price;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }
}, {info: {"components":{"numbers":{"path":"..\\components\\numbers"},"upload":{"path":"..\\components\\upload"}},"on":{"10-7":["count"]}}, handlers: {'10-5': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('standard')
      })();
    
  }},'10-6': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('picture')
      })();
    
  }},'10-7': {"count": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.countPrice($event)
      })();
    
  }},'10-8': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.countPrice($event)
      })();
    
  }},'10-9': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {} });