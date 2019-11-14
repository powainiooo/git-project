"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  data: {
    checked: false,
    nums: 0
  },
  attached: function attached() {},
  methods: {
    toggle: function toggle() {
      this.checked = !this.checked;
    },
    doReduce: function doReduce() {
      if (this.nums === 0) return;
      this.nums -= 1;
    },
    doAdd: function doAdd() {
      this.nums += 1;
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toggle($event)
      })();
    
  }},'18-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doReduce($event)
      })();
    
  }},'18-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doAdd($event)
      })();
    
  }}}, models: {} });