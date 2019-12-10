"use strict";

var _core = _interopRequireDefault(require('../vendor.js')(0));

var _store = _interopRequireDefault(require('../store/index.js'));

var _api = require('../res/api.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    check: '',
    page: 'standard',
    menuList: [],
    imgList: [],
    price: 0
  },
  computed: {
    phone: function phone() {
      return _store["default"].state.phone;
    },
    basePrice: function basePrice() {
      return _store["default"].state.basePrice;
    },
    orderNums: function orderNums() {
      return _store["default"].state.orderNums;
    },
    remarks: function remarks() {
      return _store["default"].state.remarks;
    }
  },
  onLoad: function onLoad() {
    console.log(getCurrentPages());
    this.getMenuList();
  },
  methods: {
    makePhone: function makePhone() {
      wx.makePhoneCall({
        phoneNumber: this.phone
      });
    },
    togglePage: function togglePage(page) {
      this.page = page;
    },
    getMenuList: function getMenuList() {
      var _this = this;

      (0, _api.getMenuList)().then(function (res) {
        _this.menuList = res.data.wxmenu;

        for (var p in res.data.imgmenu) {
          _this.imgList.push(res.data.imgmenu[p]);
        }
      });
    },
    countPrice: function countPrice() {
      this.price = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.$children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          if (item.$is === 'components/numbers') {
            this.price += item.price;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    },
    doConfirm: function doConfirm() {
      var wxmenu = [];
      var imgmenu = [];

      if (this.page === 'standard') {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = this.$children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            if (item.$is === 'components/numbers') {
              // console.log(item)
              var list = {
                name: item.itemData.name,
                child: []
              };
              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = item.list[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var child = _step3.value;

                  if (child.checked) {
                    list.child.push({
                      name: child.name,
                      nums: child.nums
                    });
                  }
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                    _iterator3["return"]();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }

              wxmenu.push(list);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      } else if (this.page === 'picture') {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = this.$children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var _item = _step4.value;

            if (_item.$is === 'components/upload') {
              var _list = [];
              var _iteratorNormalCompletion5 = true;
              var _didIteratorError5 = false;
              var _iteratorError5 = undefined;

              try {
                for (var _iterator5 = _item.srcList[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                  var _child = _step5.value;

                  _list.push({
                    type: _child.type,
                    url: _child.url
                  });
                }
              } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                    _iterator5["return"]();
                  }
                } finally {
                  if (_didIteratorError5) {
                    throw _iteratorError5;
                  }
                }
              }

              imgmenu.push(_list);
            }
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }

      (0, _api.createOrderThree)({
        order_num: this.orderNums,
        wxmenu: wxmenu,
        imgmenu: imgmenu
      }).then(function (res) {
        console.log(res);

        if (res.status === 0) {
          wx.redirectTo({
            url: '/pages/success'
          });
        }
      });
    },
    onShareAppMessage: function onShareAppMessage() {
      return {
        title: '小象搬家',
        path: 'pages/login',
        imageUrl: 'https://www.xx-bj.com/static/xx-bj.png'
      };
    }
  }
}, {info: {"components":{"numbers":{"path":"..\\components\\numbers"},"upload":{"path":"..\\components\\upload"}},"on":{"11-7":["count"]}}, handlers: {'11-5': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('standard')
      })();
    
  }},'11-6': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.togglePage('picture')
      })();
    
  }},'11-7': {"count": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.countPrice($event)
      })();
    
  }},'11-8': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doConfirm($event)
      })();
    
  }},'11-9': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.makePhone($event)
      })();
    
  }}}, models: {} });