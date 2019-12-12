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
    list: [],
    price: 0
  },
  watch: {
    itemData: function itemData(val) {
      if (val.sub_button) {
        var lastSelect = wx.getStorageSync('lastSelect'); // console.log('----------2----------')
        // console.log(lastSelect)

        this.hidden = lastSelect[val.name] === undefined ? true : lastSelect[val.name];

        for (var p in val.sub_button) {
          var name = val.sub_button[p].name;
          var item = lastSelect[name];
          this.list.push({
            name: name,
            price: parseInt(val.sub_button[p].price),
            nums: item === undefined ? 0 : item.nums,
            checked: item === undefined ? false : item.checked
          });
        }

        this.setPrice();
      }
    }
  },
  attached: function attached() {},
  methods: {
    toggleShow: function toggleShow() {
      this.hidden = !this.hidden;
      var lastSelect = wx.getStorageSync('lastSelect');
      lastSelect[this.itemData.name] = this.hidden;
      wx.setStorage({
        key: 'lastSelect',
        data: lastSelect
      });
    },
    toggle: function toggle(i) {
      this.list[i].checked = !this.list[i].checked;
      this.setPrice();
    },
    doReduce: function doReduce(i) {
      if (this.list[i].nums === 0) return;
      this.list[i].nums -= 1;
      this.list[i].checked = this.list[i].nums !== 0;
      this.setLastSelect(this.list[i]);
      this.setPrice();
    },
    doAdd: function doAdd(i) {
      this.list[i].nums += 1;
      this.list[i].checked = true;
      this.setLastSelect(this.list[i]);
      this.setPrice();
    },
    setLastSelect: function setLastSelect(item) {
      var lastSelect = wx.getStorageSync('lastSelect');
      if (lastSelect[item.name] === undefined) lastSelect[item.name] = {};
      lastSelect[item.name].nums = item.nums;
      lastSelect[item.name].checked = item.checked;
      wx.setStorage({
        key: 'lastSelect',
        data: lastSelect
      });
    },
    setPrice: function setPrice() {
      var _this = this;

      this.price = 0;
      this.list.forEach(function (i) {
        var price = i.checked ? i.price * i.nums : 0;
        _this.price += price;
      });
      this.$emit('count');
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toggleShow($event)
      })();
    
  }},'18-1': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.toggle(index)
      })();
    
  }},'18-2': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.doReduce(index)
      })();
    
  }},'18-3': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.doAdd(index)
      })();
    
  }}}, models: {} });