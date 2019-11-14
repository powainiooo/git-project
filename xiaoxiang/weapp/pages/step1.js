"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _api = require('../res/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    layoutList: ['一居室', '二居室', '三居室'],
    buildingList: [],
    layout: '',
    outBuild: '',
    inBuild: '',
    area: '',
    outAddress: '',
    inAddress: ''
  },
  computed: {
    phone: function phone() {
      return _store["default"].state.phone;
    },
    userOpenID: function userOpenID() {
      return _store["default"].state.userOpenID;
    },
    orderNums: function orderNums() {
      return _store["default"].state.orderNums;
    }
  },
  onLoad: function onLoad() {
    var _this = this;

    for (var i = 0; i < 30; i++) {
      this.buildingList.push(i + 1);
    }

    (0, _api.getHouseType)().then(function (res) {
      _this.layoutList = res.data;
    });
  },
  methods: {
    makePhone: function makePhone() {
      wx.makePhoneCall({
        phoneNumber: this.phone
      });
    },
    doConfirm: function doConfirm() {
      var obj = {
        order_num: this.orderNums,
        house_type: this.layoutList[this.layout],
        area: this.area,
        s_address: this.outAddress,
        f_address: this.inAddress,
        s_floor: this.buildingList[this.outBuild],
        f_floor: this.buildingList[this.inBuild]
      };
      (0, _api.createOrderTwo)(obj).then(function (res) {
        if (res.status === 0) {
          wx.navigateTo({
            url: '/pages/step2'
          });
        }
      });
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'10-18': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'10-19': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'49': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'50': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'51': {
      type: "input",
      expr: "outAddress",
      handler: function set ($v) {
      var _vm=this;
        _vm.outAddress = $v;
      
    }
    },'52': {
      type: "change",
      expr: "outBuild",
      handler: function set ($v) {
      var _vm=this;
        _vm.outBuild = $v;
      
    }
    },'53': {
      type: "input",
      expr: "inAddress",
      handler: function set ($v) {
      var _vm=this;
        _vm.inAddress = $v;
      
    }
    },'54': {
      type: "change",
      expr: "inBuild",
      handler: function set ($v) {
      var _vm=this;
        _vm.inBuild = $v;
      
    }
    }} });