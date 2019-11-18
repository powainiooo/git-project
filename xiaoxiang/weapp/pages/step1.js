"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('../vendor.js')(2));

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _api = require('../res/api.js');

var _util = require('../res/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var chooseLocation = (0, _util.promisify)(wx.chooseLocation);

_core["default"].page({
  store: _store["default"],
  data: {
    layoutList: ['一居室', '二居室', '三居室'],
    buildingList: [],
    layout: '',
    area: '',
    moveOut: {
      index: '',
      address: '',
      lat: '',
      lng: ''
    },
    moveIn: {
      index: '',
      address: '',
      lat: '',
      lng: ''
    },
    price: 0
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
    },
    remarks: function remarks() {
      return _store["default"].state.remarks;
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
        s_address: this.moveOut.address,
        f_address: this.moveIn.address,
        s_floor: this.buildingList[this.moveOut.index],
        f_floor: this.buildingList[this.moveIn.index],
        start_lon: this.moveOut.lng,
        start_lat: this.moveOut.lat,
        finish_lon: this.moveIn.lng,
        finish_lat: this.moveIn.lat
      };
      (0, _api.createOrderTwo)(obj).then(function (res) {
        if (res.status === 0) {
          wx.navigateTo({
            url: '/pages/step2'
          });
        }
      });
    },
    getPrice: function getPrice() {
      var _this2 = this;

      (0, _api.getBasicAmount)({
        house_type: this.layoutList[this.layout],
        area: this.area,
        start_lon: this.moveOut.lng,
        start_lat: this.moveOut.lat,
        finish_lon: this.moveIn.lng,
        finish_lat: this.moveIn.lat,
        s_floor: this.buildingList[this.moveOut.index],
        f_floor: this.buildingList[this.moveIn.index]
      }).then(function (res) {
        if (res.status === 0) {
          _this2.price = res.result.total;

          _store["default"].commit('setBasePrice', res.result.total);
        }
      });
    },
    openMap: function openMap(key) {
      var res;
      return _regeneratorRuntime2["default"].async(function openMap$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _regeneratorRuntime2["default"].awrap(chooseLocation());

            case 2:
              res = _context.sent;
              this["move".concat(key)].address = res.address;
              this["move".concat(key)].lat = res.latitude;
              this["move".concat(key)].lng = res.longitude;
              this.getPrice();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'13-56': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-57': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-58': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'13-59': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-60': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'13-61': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-62': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'13-63': {"tap": function proxy () {
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
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'52': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'53': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'54': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'13-56': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-57': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-58': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'13-59': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-60': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'13-61': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-62': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'13-63': {"tap": function proxy () {
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
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'52': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'53': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'54': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'13-56': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-57': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-58': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'13-59': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-60': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'13-61': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'13-62': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'13-63': {"tap": function proxy () {
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
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'52': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'53': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'54': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} });