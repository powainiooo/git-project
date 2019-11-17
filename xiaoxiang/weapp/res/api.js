"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuList = exports.getBasicAmount = exports.getHouseType = exports.createOrderThree = exports.createOrderTwo = exports.createOrderOne = exports.wxUserAdd = exports.getWeixin = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ajaxUrl = 'http://move.pc-online.cc/mobile/applet/';

var ajax = function ajax(opts) {
  var autoMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return new Promise(function (resolve, reject) {
    wx.showNavigationBarLoading();
    var extras = {
      success: function success(res) {
        console.log(res.data);

        if (res.data.status === 0) {
          resolve(res.data);
        } else {
          resolve(res.data);
        }

        wx.hideNavigationBarLoading();
      },
      fail: function fail(err) {
        console.log(err);
        wx.navigateTo({
          url: '/pages/error/error'
        });
        wx.hideNavigationBarLoading();
        reject();
      }
    };
    wx.request(_objectSpread({}, opts, {}, extras));
  });
}; // 取小程序用户信息


var getWeixin = function getWeixin(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/get_weixin"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 保存小程序用户信息


exports.getWeixin = getWeixin;

var wxUserAdd = function wxUserAdd(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/wxuser_add"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 生成订单1


exports.wxUserAdd = wxUserAdd;

var createOrderOne = function createOrderOne(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/create_order_one"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 生成订单2


exports.createOrderOne = createOrderOne;

var createOrderTwo = function createOrderTwo(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/create_order_two"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 生成订单3


exports.createOrderTwo = createOrderTwo;

var createOrderThree = function createOrderThree(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/create_order_three"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 获取户型


exports.createOrderThree = createOrderThree;

var getHouseType = function getHouseType(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/house_type"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 计算基本价格


exports.getHouseType = getHouseType;

var getBasicAmount = function getBasicAmount(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/count_basic_amount"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
}; // 四．附加信息的菜单


exports.getBasicAmount = getBasicAmount;

var getMenuList = function getMenuList(data) {
  return ajax({
    url: "".concat(ajaxUrl, "/menu_ext"),
    data: data,
    header: {
      'content-type': 'json'
    }
  });
};

exports.getMenuList = getMenuList;