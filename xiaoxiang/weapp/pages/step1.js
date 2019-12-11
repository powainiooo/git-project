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
      index: 0,
      type: '1',
      name: '',
      address: '',
      lat: '',
      lng: ''
    },
    moveIn: {
      index: 0,
      type: '1',
      name: '',
      address: '',
      lat: '',
      lng: ''
    },
    price: 0,
    isChecked: false
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

    for (var i = 0; i < 10; i++) {
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
      this.isChecked = false;
      if (this.layout === '') this.isChecked = true;
      if (this.moveOut.name === '') this.isChecked = true;
      if (this.moveIn.name === '') this.isChecked = true;
      if (this.isChecked) return;
      var params = this.getParams();
      params.order_num = this.orderNums;
      params.out_address_name = this.moveOut.name;
      params.s_address = this.moveOut.address;
      params.in_address_name = this.moveIn.name;
      params.f_address = this.moveIn.address;
      (0, _api.createOrderTwo)(params).then(function (res) {
        if (res.status === 0) {
          wx.navigateTo({
            url: '/pages/step2'
          });
        }
      });
    },
    getPrice: function getPrice() {
      var _this2 = this;

      var params = this.getParams();
      (0, _api.getBasicAmount)(params).then(function (res) {
        if (res.status === 0) {
          _this2.price = res.result.total;

          _store["default"].commit('setBasePrice', res.result.total);
        }
      });
    },
    getParams: function getParams() {
      var sFloor = 0;
      var fFloor = 0;

      if (this.moveOut.type !== '1') {
        sFloor = this.moveOut.index === '' ? 0 : this.buildingList[this.moveOut.index];
      }

      if (this.moveIn.type !== '1') {
        fFloor = this.moveIn.index === '' ? 0 : this.buildingList[this.moveIn.index];
      }

      return {
        house_type: this.layout === '' ? '' : this.layoutList[this.layout],
        area: this.area,
        out_type: this.moveOut.type,
        in_type: this.moveIn.type,
        start_lon: this.moveOut.lng,
        start_lat: this.moveOut.lat,
        finish_lon: this.moveIn.lng,
        finish_lat: this.moveIn.lat,
        s_floor: sFloor,
        f_floor: fFloor
      };
    },
    changeType: function changeType(key, data) {
      this["move".concat(key)].type = data;
      this.getPrice();
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
              this["move".concat(key)].name = res.name;
              this["move".concat(key)].address = res.address;
              this["move".concat(key)].lat = res.latitude;
              this["move".concat(key)].lng = res.longitude;
              this.getPrice();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    },
    onShareAppMessage: function onShareAppMessage() {
      return {
        title: '小象搬家',
        path: 'pages/login',
        imageUrl: 'https://www.xx-bj.com/static/xx-bj.png'
      };
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'12-60': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-61': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-62': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('Out', '1')
      })();
    
  }},'12-63': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('Out', '2')
      })();
    
  }},'12-64': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'12-65': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-66': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('In', '1')
      })();
    
  }},'12-67': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('In', '2')
      })();
    
  }},'12-68': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'12-69': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-70': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'12-71': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'40': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'41': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'42': {
      type: "input",
      expr: "moveOut.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "name", $v);
      
    }
    },'43': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'44': {
      type: "input",
      expr: "moveIn.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "name", $v);
      
    }
    },'45': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} }, {info: {"components":{},"on":{}}, handlers: {'12-60': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-61': {"blur": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-62': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('Out', '1')
      })();
    
  }},'12-63': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('Out', '2')
      })();
    
  }},'12-64': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('Out')
      })();
    
  }},'12-65': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-66': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('In', '1')
      })();
    
  }},'12-67': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.changeType('In', '2')
      })();
    
  }},'12-68': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.openMap('In')
      })();
    
  }},'12-69': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.getPrice($event)
      })();
    
  }},'12-70': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'12-71': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {'40': {
      type: "change",
      expr: "layout",
      handler: function set ($v) {
      var _vm=this;
        _vm.layout = $v;
      
    }
    },'41': {
      type: "input",
      expr: "area",
      handler: function set ($v) {
      var _vm=this;
        _vm.area = $v;
      
    }
    },'42': {
      type: "input",
      expr: "moveOut.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "name", $v);
      
    }
    },'43': {
      type: "change",
      expr: "moveOut.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveOut, "index", $v);
      
    }
    },'44': {
      type: "input",
      expr: "moveIn.name",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "name", $v);
      
    }
    },'45': {
      type: "change",
      expr: "moveIn.index",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.moveIn, "index", $v);
      
    }
    }} });