"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('vendor.js')(2));

var _core = _interopRequireDefault(require('vendor.js')(0));

var _eventHub = _interopRequireDefault(require('common/eventHub.js'));

var _util = require('res/util.js');

var _api = require('res/api.js');

var _store = _interopRequireDefault(require('store/index.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import vuex from '@wepy/x'
var login = (0, _util.promisify)(wx.login);

var _getSetting = (0, _util.promisify)(wx.getSetting);

var getUserInfo = (0, _util.promisify)(wx.getUserInfo);

_core["default"].app({
  hooks: {// App 级别 hook，对整个 App 生效
    // 同时存在 Page hook 和 App hook 时，优先执行 Page hook，返回值再交由 App hook 处
    // 'before-setData': function (dirty) {
    //    console.log('setData dirty: ', dirty)
    //    return dirty
    // }
  },
  globalData: {
    userInfo: null
  },
  onLaunch: function onLaunch() {
    _eventHub["default"].$on('app-launch', function () {
      console.log('app-launch event emitted, the params are:');

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log(args);
    });

    this.onlogin();
    this.getSetting();
  },
  methods: {
    // 登录
    onlogin: function onlogin() {
      var openid, res, resWeixin;
      return _regeneratorRuntime2["default"].async(function onlogin$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              openid = wx.getStorageSync('openid');

              if (!(openid === '' || openid === undefined)) {
                _context.next = 12;
                break;
              }

              _context.next = 4;
              return _regeneratorRuntime2["default"].awrap(login());

            case 4:
              res = _context.sent;
              _context.next = 7;
              return _regeneratorRuntime2["default"].awrap((0, _api.getWeixin)({
                code: res.code
              }));

            case 7:
              resWeixin = _context.sent;

              _store["default"].commit('setOpenId', resWeixin.openid);

              wx.setStorageSync('openid', resWeixin.openid);
              _context.next = 13;
              break;

            case 12:
              _store["default"].commit('setOpenId', openid);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    // 查看是否授权
    getSetting: function getSetting() {
      var resSetting, res;
      return _regeneratorRuntime2["default"].async(function getSetting$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _regeneratorRuntime2["default"].awrap(_getSetting());

            case 2:
              resSetting = _context2.sent;

              if (!resSetting.authSetting['scope.userInfo']) {
                _context2.next = 8;
                break;
              }

              _context2.next = 6;
              return _regeneratorRuntime2["default"].awrap(getUserInfo());

            case 6:
              res = _context2.sent;
              (0, _api.wxUserAdd)({
                openid: _store["default"].state.userOpenID,
                country: res.userInfo.country,
                province: res.userInfo.province,
                city: res.userInfo.city,
                gender: res.userInfo.gender,
                nickName: res.userInfo.nickName,
                avatarUrl: res.userInfo.avatarUrl
              });

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      });
    }
  }
}, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {} });