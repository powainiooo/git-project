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
        f_floor: this.buildingList[this.moveIn.index]
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
}, {info: {"components":{},"on":{}}, handlers: {'11-16': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-17': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-18': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'11-19': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-20': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'11-21': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-22': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'11-23': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'17': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'18': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'19': {
      type: "input",
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'20': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'21': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'22': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'11-16': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-17': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-18': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'11-19': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-20': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'11-21': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-22': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'11-23': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'17': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'18': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'19': {
      type: "input",
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'20': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'21': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'22': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'11-16': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-17': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-18': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'11-19': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-20': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'11-21': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-22': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'11-23': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'17': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'18': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'19': {
      type: "input",
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'20': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'21': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'22': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'11-16': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-17': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-18': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'11-19': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-20': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'11-21': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-22': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'11-23': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'17': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'18': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'19': {
      type: "input",
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'20': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'21': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'22': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'11-16': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-17': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-18': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'11-19': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-20': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'11-21': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'11-22': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'11-23': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'17': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'18': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'19': {
      type: "input",
      expr: "moveOut.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "address", $v);
      
    }
    },'20': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'21': {
      type: "input",
      expr: "moveIn.address",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "address", $v);
      
    }
    },'22': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} });