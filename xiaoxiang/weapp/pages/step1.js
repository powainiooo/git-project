"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    layoutList: ['一居室', '二居室', '三居室'],
    buildingList: [1, 2, 3, 4, 5, 6, 7, 8],
    layout: '',
    outBuild: '',
    inBuild: ''
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
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'5-32': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'20': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'21': {
      type: "change",
      expr: "outBuild",
      handler: function set ($v) {
      var _vm=this;
        _vm.outBuild = $v;
      
    }
    },'22': {
      type: "change",
      expr: "inBuild",
      handler: function set ($v) {
      var _vm=this;
        _vm.inBuild = $v;
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'5-32': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'20': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'21': {
      type: "change",
      expr: "outBuild",
      handler: function set ($v) {
      var _vm=this;
        _vm.outBuild = $v;
      
    }
    },'22': {
      type: "change",
      expr: "inBuild",
      handler: function set ($v) {
      var _vm=this;
        _vm.inBuild = $v;
      
    }
    }} });