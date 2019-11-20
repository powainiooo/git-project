"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _api = require('../res/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    name: '',
    phone: '',
    isChecked: false,
    phoneWarn: ''
  },
  computed: {
    userOpenID: function userOpenID() {
      return _store["default"].state.userOpenID;
    }
  },
  methods: {
    doLogin: function doLogin() {
      if (this.name === '') {
        this.isChecked = true;
      }

      if (this.phone === '') {
        this.isChecked = true;
        this.phoneWarn = '请输入手机号';
      }

      var myreg = /^[1][0-9]{10}$/;

      if (!myreg.test(this.phone)) {
        this.isChecked = true;
        this.phoneWarn = '手机号格式错误';
      }

      if (this.isChecked) return;
      (0, _api.createOrderOne)({
        openid: _store["default"].state.userOpenID,
        name: this.name,
        mobile: this.phone
      }).then(function (res) {
        if (res.status === 0) {
          _store["default"].commit('setOrderNums', res.order_num);

          wx.redirectTo({
            url: '/pages/step1'
          });
        }
      });
    },
    getRemarks: function getRemarks() {
      (0, _api.getRemarks)().then(function (res) {
        _store["default"].commit('setRemarks', {
          remarks1: res.data.remarks1,
          remarks2: res.data.remarks2
        });

        _store["default"].commit('setPhone', res.data.phone);
      });
    }
  },
  onLoad: function onLoad() {
    this.getRemarks();
  }
}, {info: {"components":{},"on":{}}, handlers: {'10-0': {"input": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.isChecked = false
      })();
    
  }},'10-1': {"input": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.isChecked = false
      })();
    
  }},'10-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'0': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'1': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'10-0': {"input": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.isChecked = false
      })();
    
  }},'10-1': {"input": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.isChecked = false
      })();
    
  }},'10-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'0': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'1': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'10-0': {"input": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.isChecked = false
      })();
    
  }},'10-1': {"input": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.isChecked = false
      })();
    
  }},'10-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doLogin($event)
      })();
    
  }}}, models: {'0': {
      type: "input",
      expr: "name",
      handler: function set ($v) {
      var _vm=this;
        _vm.name = $v;
      
    }
    },'1': {
      type: "input",
      expr: "phone",
      handler: function set ($v) {
      var _vm=this;
        _vm.phone = $v;
      
    }
    }} });