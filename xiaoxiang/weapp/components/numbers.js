"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    itemData: {
      type: Object,
      "default": function _default() {}
    }
  },
  data: {
    hidden: true,
    checked: false,
    nums: 0,
    list: []
  },
  watch: {
    itemData: function itemData(val) {
      if (val.sub_button) {
        for (var p in val.sub_button) {
          this.list.push({
            name: val.sub_button[p].name,
            price: parseInt(val.sub_button[p].price),
            nums: 0,
            checked: false
          });
        }
      }
    }
  },
  attached: function attached() {},
  methods: {
    toggle: function toggle(i) {
      this.list[i].checked = !this.list[i].checked;
    },
    doReduce: function doReduce(i) {
      if (this.list[i].nums === 0) return;
      this.list[i].nums -= 1;
    },
    doAdd: function doAdd(i) {
      this.list[i].nums += 1;
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'18-25': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.hidden = !_vm.hidden
      })();
    
  }},'18-26': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.toggle(index)
      })();
    
  }},'18-27': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.doReduce(index)
      })();
    
  }},'18-28': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.doAdd(index)
      })();
    
  }}}, models: {} }, {info: {"components":{},"on":{}}, handlers: {'18-25': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.hidden = !_vm.hidden
      })();
    
  }},'18-26': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.toggle(index)
      })();
    
  }},'18-27': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.doReduce(index)
      })();
    
  }},'18-28': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.doAdd(index)
      })();
    
  }}}, models: {} });