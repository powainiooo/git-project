"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _api = require('../res/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    name: '',
    phone: ''
  },
  computed: {
    userOpenID: function userOpenID() {
      return _store["default"].state.userOpenID;
    }
  },
  methods: {
    doLogin: function doLogin() {
      (0, _api.createOrderOne)({
        openid: _store["default"].state.userOpenID,
        name: this.name,
        mobile: this.phone
      }).then(function (res) {
        if (res.status === 0) {
          _store["default"].commit('setOrderNums', res.order_num);

          wx.navigateTo({
            url: '/pages/step1'
          });
        }
      });
    }
  },
  created: function created() {}
}, {info: {"components":{},"on":{}}, handlers: {'12-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'23': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'24': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'12-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'23': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'24': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'12-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'23': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'24': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'12-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'23': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'24': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'12-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'23': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'24': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} });