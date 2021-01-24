/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

/*
 * @Author: Kuiper
 * @Date: 2020-11-24 15:41:24
 * @LastEditTime: 2020-12-01 17:23:24
 */
var createConsole = function () {
    var print = function (level, e) {
        var _a, _b, _c;
        var str = e.map(function (item) {
            return "[object object]" ===
                Object.prototype.toString.call(item).toLowerCase()
                ? JSON.stringify(item)
                : item;
        });
        (_c = (_b = (_a = window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.console) === null || _c === void 0 ? void 0 : _c.postMessage("[" + level + "] " + str);
    };
    return {
        debug: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var e = [];
            var t = args.length;
            for (; t--;)
                e[t] = args[t];
            print("debug", e);
        },
        log: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var e = [];
            var t = args.length;
            for (; t--;)
                e[t] = args[t];
            print("log", e);
        },
        info: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var e = [];
            var t = args.length;
            for (; t--;)
                e[t] = args[t];
            print("info", e);
        },
        warn: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var e = [];
            var t = args.length;
            for (; t--;)
                e[t] = args[t];
            print("warn", e);
        },
        error: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var e = [];
            var t = args.length;
            for (; t--;)
                e[t] = args[t];
            print("error", e);
        },
    };
};
function getPlatform() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    return isAndroid ? 'Android' : 'IOS';
    // if (isAndroid) {
    //   return 'Android'
    // } else if (isIOS) {
    //   return 'IOS'
    // } else {
    //   return 'PC'
    // }
}
function typeName(val) {
    return Object.prototype.toString.call(val).slice(8, -1);
}
var typeMap = {
    'A': 'Array',
    'D': 'Date',
    'N': 'Number',
    'S': 'String',
    'F': 'Function',
    'O': 'Object',
    'B': 'Boolean'
};
function checkArgs(spec, functionName) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    var errMsg = null;
    var _typeName;
    var args = [].slice.call(arguments, 2);
    for (var i = 0; i < spec.length; ++i) {
        var c = spec.charAt(i), cUpper = c.toUpperCase(), arg = args[i];
        // console.log(c, cUpper, arg)
        if (c == '*') {
            continue;
        }
        _typeName = typeName(arg);
        if ((arg === null || arg === undefined) && c == cUpper) {
            continue;
        }
        if (_typeName != typeMap[cUpper]) {
            errMsg = 'Expected ' + typeMap[cUpper];
            break;
        }
    }
    if (errMsg) {
        errMsg += ', but got ' + _typeName + '.';
        errMsg = 'Wrong type for parameter of ' + functionName + ': ' + errMsg;
        vConsole().log(errMsg);
        throw TypeError(errMsg);
    }
}
function vConsole() {
    return {
        log: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            createConsole().log(args);
            console.log.apply(console, args);
        }
    };
}

/*
 * @Author: Kuiper
 * @Date: 2020-11-24 11:08:37
 * @LastEditTime: 2020-12-08 10:03:48
 */
var callbacks = {};
var callbackId = Math.floor(Math.random() * 2000000000);
var console$1 = vConsole();
function call2NativeIOS(moduleName, action, args, callback) {
    var _a, _b, _c;
    var __callbackId = moduleName + action + callbackId++;
    var __args = (typeof args === 'string') ? args : JSON.stringify(args);
    callbacks[__callbackId] = callback;
    console$1.log('call2Native: callbackId=' + __callbackId + ', action=' + action + ',args=' + __args);
    var __params = {
        callbackId: __callbackId,
        moduleName: moduleName,
        action: action,
        params: __args
    };
    console$1.log('call2Native: params=' + JSON.stringify(__params));
    (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.call2Native) === null || _c === void 0 ? void 0 : _c.postMessage(__params);
    // 持久化callback处理
    // if (callback.keepCallback) return __callbackId
}
function generateCallback(callback, prefix) {
    if (prefix === void 0) { prefix = 'default'; }
    var __callbackId = prefix + callbackId++;
    callbacks[__callbackId] = callback;
    return __callbackId;
}
function removeCallback(callbackId) {
    if (callbacks[callbackId]) {
        delete callbacks[callbackId];
    }
    else {
        console$1.log('callback cannot be found!');
    }
}
function callbackFromNative(callbackId, payloadMessage) {
    try {
        var params = void 0;
        if (typeof payloadMessage === 'object') {
            console$1.log('callbackFromNative, callbackId=' + callbackId + ',payloadMessage[object] = ' + JSON.stringify(payloadMessage));
            params = payloadMessage;
        }
        else {
            console$1.log('callbackFromNative, callbackId=' + callbackId + ',payloadMessage[string] = ' + payloadMessage);
            params = JSON.parse(payloadMessage);
        }
        var callback = callbacks[callbackId];
        if (callback) {
            console$1.log('callbackFromNative, callback = ' + JSON.stringify(callback));
            if (params.methodName) {
                console$1.log('callback, methodName=' + params.methodName + ', res=' + JSON.stringify(params.res));
                callback[params.methodName] && callback[params.methodName].apply(null, [typeof params.res === 'string' ? JSON.parse(params.res) : params.res]);
            }
            else {
                console$1.log('methodName cannot be found');
            }
            // todo 待完善，如何删除某个keepcallback
            if (!callback.keepCallback) {
                delete callbacks[callbackId];
            }
        }
        else {
            console$1.log('callback cannot be found!');
        }
    }
    catch (err) {
        var msg = void 0;
        if (typeof payloadMessage === 'object') {
            msg = "Error in " + JSON.stringify(payloadMessage) + " callbackId: " + callbackId + " : " + err;
        }
        else {
            msg = "Error in " + payloadMessage + " callbackId: " + callbackId + " : " + err;
        }
        console$1 && console$1.log && console$1.log(msg);
        throw err;
    }
}

var Account = /** @class */ (function () {
    function Account() {
    }
    return Account;
}());

var AccountImpl = /** @class */ (function (_super) {
    __extends(AccountImpl, _super);
    function AccountImpl() {
        var _a;
        var _this = _super.call(this) || this;
        _this.module = (_a = window === null || window === void 0 ? void 0 : window.sw) === null || _a === void 0 ? void 0 : _a.require('account');
        return _this;
    }
    AccountImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new AccountImpl();
        }
        return AccountImpl.instance;
    };
    AccountImpl.prototype.getAccountInfo = function (obj) {
        // const argsObj = Object.assign({}, obj)
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getAccountInfo:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'account');
        this.module.getAccountInfo(callbackId);
    };
    AccountImpl.prototype.getAccessToken = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getAccessToken:ok', data: { accessToken: res.token } }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'account');
        this.module.getAccessToken(callbackId);
    };
    AccountImpl.prototype.isLogin = function (obj) {
        console.log('Android isLogin Impl');
        var proxyCallback = {
            success: function (res) {
                var loginFlag = (res.isLogin === "true") || (res.isLogin === true);
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'isLogin:ok', data: { isLogin: loginFlag } }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'account');
        this.module.isLogin(callbackId);
    };
    AccountImpl.prototype.startLogin = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'startLogin:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'account');
        this.module.startLogin(callbackId);
    };
    AccountImpl.prototype.addAccountChangedListener = function (obj) {
        checkArgs('of', 'addAccountChangedListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function (res) {
                console.log('addAccountChangedListener success = ' + res);
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addAccountChangedListener:ok', listenerId: res.listenerId }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                console.log('addAccountChangedListener onReceive = ' + JSON.stringify(res));
                obj.onReceive(res);
            },
            keepCallback: true
        };
        var callbackId = generateCallback(proxyCallback, 'account');
        this.module.addAccountChangedListener(callbackId);
    };
    AccountImpl.prototype.removeAccountChangedListener = function (obj) {
        checkArgs('os', 'removeAccountChangedListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeAccountChangedListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'account');
        var params = JSON.stringify({ listenerId: obj.listenerId });
        this.module.removeAccountChangedListener(callbackId, params);
        removeCallback(obj.listenerId);
    };
    return AccountImpl;
}(Account));

var Channel = /** @class */ (function () {
    function Channel() {
    }
    return Channel;
}());

var ChannelImpl = /** @class */ (function (_super) {
    __extends(ChannelImpl, _super);
    function ChannelImpl() {
        var _a;
        var _this = _super.call(this) || this;
        _this.module = (_a = window === null || window === void 0 ? void 0 : window.sw) === null || _a === void 0 ? void 0 : _a.require('channel');
        return _this;
    }
    ChannelImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new ChannelImpl();
        }
        return ChannelImpl.instance;
    };
    ChannelImpl.prototype.isLAN = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'isLAN:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.isLAN(param);
    };
    ChannelImpl.prototype.getConnectDeviceInfo = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getConnectDeviceInfo:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.getConnectDeviceInfo(param);
    };
    ChannelImpl.prototype.getSceneId = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getSceneId:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.getSpaceId(param);
    };
    ChannelImpl.prototype.startConnectDevice = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'startConnectDevice:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.startConnectDevice(param);
    };
    ChannelImpl.prototype.startConnectWiFi = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'startConnectWiFi:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.startConnectWiFi(param);
    };
    ChannelImpl.prototype.sendMsg = function (obj) {
        checkArgs('oss', 'sendMsg', obj, obj.target, obj.content);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.sendCommonMsg(param, obj.target, obj.content, "CTR");
    };
    ChannelImpl.prototype.sendCommonMsg = function (obj) {
        checkArgs('osss', 'sendMsg', obj, obj.target, obj.content, obj.type);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.sendCommonMsg(param, obj.target, obj.content, obj.type);
    };
    // dongle端特有
    ChannelImpl.prototype.sendBroadcast = function (obj) {
        checkArgs('oss', 'sendBroadcast', obj, obj.target, obj.content);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendBroadcast:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.sendBroadcast(param, obj.target, obj.content);
    };
    // dongle端特有
    ChannelImpl.prototype.sendStatusBroadcast = function (obj) {
        checkArgs('oss', 'sendStatusBroadcast', obj, obj.title, obj.type);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendStatusBroadcast:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        var params = JSON.stringify({
            type: 'H5_PAGE_GAME',
            version: '0',
            values: JSON.stringify({
                playCmd: 'play',
                mediaTitle: obj.title,
                pagetype: obj.type // 标识游戏/网页的类型 
            })
        });
        this.module.sendStatusBroadcast(callbackId, 'ss-clientID-SmartScreen', params);
    };
    ChannelImpl.prototype.sendLiveMsg = function (obj) {
        checkArgs('osa', 'sendLiveMsg', obj, obj.url, obj.urlList);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendLiveMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        var params = {
            cmd: '',
            type: 'CUSTOM_EVENT',
            param: JSON.stringify({
                type: 'live',
                cmd: 'play',
                param: obj.url,
                extra: JSON.stringify(obj.urlList)
            })
        };
        var params2 = {
            "cmd": "",
            "type": "CUSTOM_EVENT",
            "param": JSON.stringify({
                "type": "live",
                "cmd": "mediaTitle",
                "param": obj.title || ''
            })
        };
        this.module.sendLiveMsg(callbackId, 'ss-clientID-UniversalMediaPlayer', JSON.stringify(params), JSON.stringify(params2));
    };
    ChannelImpl.prototype.sendOnlineVideoMsg = function (obj) {
        checkArgs('os', 'sendVideoMsg', obj, obj.thirdAlbumId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendVideoMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var contentObj = {
            "cmd": "ONLINE_VIDEO",
            "type": "MEDIA",
            "param": JSON.stringify({
                "account_source": "1",
                "child_id": "1",
                "id": obj.thirdAlbumId,
                "needParse": false,
                "need_history": true,
                "read_history": true,
                "simple_detail": "1",
                "user_info": JSON.stringify({
                    "open_id": "c5f242a2eab84376bf86d64802387711",
                    "tp_token": "15.d8d01cb86cc24c89949744af240417d3"
                })
            })
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        this.module.sendMsg(callbackId, 'ss-clientID-movie', JSON.stringify(contentObj));
    };
    ChannelImpl.prototype.sendVideoMsg = function (obj) {
        checkArgs('os', 'sendVideoMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendVideoMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var contentObj = {
            url: obj.url,
            mediaTitle: obj.title || ''
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        this.module.sendVideoMsg(callbackId, 'ss-clientID-UniversalMediaPlayer', JSON.stringify(contentObj));
    };
    ChannelImpl.prototype.sendAudioMsg = function (obj) {
        checkArgs('os', 'sendAudioMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendAudioMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var contentObj = {
            url: obj.url,
            mediaTitle: obj.title || ''
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        this.module.sendAudioMsg(callbackId, 'ss-clientID-UniversalMediaPlayer', JSON.stringify(contentObj));
    };
    ChannelImpl.prototype.sendImageMsg = function (obj) {
        checkArgs('os', 'sendImageMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendImageMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var contentObj = {
            url: obj.url,
            mediaTitle: obj.title || ''
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        this.module.sendImageMsg(callbackId, 'ss-clientID-UniversalMediaPlayer', JSON.stringify(contentObj));
    };
    ChannelImpl.prototype.sendBrowserMsg = function (obj) {
        var _a;
        checkArgs('os', 'sendBrowserMsg', obj, obj.url);
        var uri = obj.url;
        (_a = window === null || window === void 0 ? void 0 : window.coocaaAppletJS) === null || _a === void 0 ? void 0 : _a.broadcastToScreenClient("", uri, "");
    };
    ChannelImpl.prototype.sendOpenBrowserMsg = function (obj) {
        checkArgs('os', 'sendOpenBrowserMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        var name = '';
        var flag = '';
        if (obj.name) {
            name = '' + obj.name;
        }
        if (obj.flag) {
            flag = '' + obj.flag;
        }
        var content = {
            "do": 'launcher_browser',
            url: obj.url,
            name: name,
            flag: flag
        };
        this.module.sendMsg(callbackId, 'ss-clientID-runtime-h5-channel', JSON.stringify(content));
    };
    ChannelImpl.prototype.addMsgReceiveListener = function (obj) {
        checkArgs('of', 'addMsgReceiveListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addMsgReceiveListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                obj.onReceive(res);
            },
            keepCallback: true
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.addMsgReceiveListener(param);
    };
    ChannelImpl.prototype.addStatusReceiveListener = function (obj) {
        checkArgs('of', 'addStatusReceiveListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addStatusReceiveListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                obj.onReceive(res);
            },
            keepCallback: true
        };
        var param = generateCallback(proxyCallback, 'channel');
        this.module.addStatusReceiveListener(param);
    };
    ChannelImpl.prototype.removeMsgReceiveListener = function (obj) {
        checkArgs('os', 'removeMsgReceiveListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeMsgReceiveListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        var params = JSON.stringify({ listenerId: obj.listenerId });
        this.module.removeMsgReceiveListener(callbackId, params);
        removeCallback(obj.listenerId);
    };
    ChannelImpl.prototype.removeStatusReceiveListener = function (obj) {
        checkArgs('os', 'removeStatusReceiveListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeStatusReceiveListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'channel');
        var params = JSON.stringify({ listenerId: obj.listenerId });
        this.module.removeStatusReceiveListener(callbackId, params);
        removeCallback(obj.listenerId);
    };
    return ChannelImpl;
}(Channel));

var WebSocket = /** @class */ (function () {
    function WebSocket() {
    }
    return WebSocket;
}());

var Server = /** @class */ (function () {
    function Server() {
    }
    return Server;
}());

var Socket = /** @class */ (function () {
    function Socket() {
    }
    Socket.prototype.on = function (callback) {
        this.mCallback = callback;
    };
    Socket.prototype.dispatchMessage = function (text) {
        if (this.mCallback != null) {
            this.mCallback.onMessage(text);
        }
    };
    return Socket;
}());

var SocketImpl = /** @class */ (function (_super) {
    __extends(SocketImpl, _super);
    function SocketImpl(socket) {
        var _this = _super.call(this) || this;
        _this.socket = socket;
        return _this;
    }
    SocketImpl.prototype.sendText = function (text) {
        this.socket.sendText(text);
    };
    SocketImpl.prototype.getRemoteAddress = function () {
        return this.socket.getRemoteAddress();
    };
    return SocketImpl;
}(Socket));

var ServerImpl = /** @class */ (function (_super) {
    __extends(ServerImpl, _super);
    function ServerImpl(server) {
        var _this = _super.call(this) || this;
        _this.sockets = new Map();
        _this.server = server;
        return _this;
    }
    ServerImpl.prototype.listen = function (port, callback) {
        var _this = this;
        if (this.callback != null) {
            return;
        }
        console.log('listen:' + port);
        this.callback = callback;
        this.callbackId = generateCallback({
            keepCallback: true,
            onOpen: function (res) {
                var socket = res['socket'];
                var s = _this.server.getSocket(socket);
                if (s != null) {
                    var ss = _this.getSocket(s);
                    if (ss == null) {
                        ss = new SocketImpl(s);
                        _this.putSocket(s, ss);
                    }
                    _this.callback.onOpen(ss);
                }
            },
            onClose: function (res) {
                var socket = res['socket'];
                var code = res['code'];
                var reason = res['reason'];
                var remote = res['remote'];
                var s = _this.server.getSocket(socket);
                if (s != null) {
                    var ss = _this.getSocket(s);
                    if (ss != null) {
                        _this.removeSocket(s);
                        _this.callback.onClose(ss, code, reason, remote);
                    }
                }
            },
            onError: function (res) {
                var socket = res['socket'];
                var ex = res['ex'];
                var s = _this.server.getSocket(socket);
                if (s != null) {
                    var ss = _this.getSocket(s);
                    if (ss != null) {
                        _this.callback.onError(ss, ex);
                    }
                }
            },
            onStart: function (res) {
                console.log('onStart ' + res);
                var address = res['address'];
                _this.callback.onStart(address);
            },
            onMessage: function (res) {
                var socket = res['socket'];
                var text = res['message'];
                var s = _this.server.getSocket(socket);
                if (s != null) {
                    var ss = _this.getSocket(s);
                    if (ss != null) {
                        ss.dispatchMessage(text);
                    }
                }
            },
        });
        this.server.setCallback(this.callbackId);
        if (port > 0) {
            this.server.listen(port);
        }
        else {
            this.server.listen();
        }
    };
    ServerImpl.prototype.close = function () {
        this.callback = null;
        removeCallback(this.callbackId);
        this.server.close();
    };
    ServerImpl.prototype.getSocket = function (s) {
        return this.sockets.get(s);
    };
    ServerImpl.prototype.putSocket = function (s, socket) {
        this.sockets.set(s, socket);
    };
    ServerImpl.prototype.removeSocket = function (s) {
        this.sockets["delete"](s);
    };
    return ServerImpl;
}(Server));

var WebSocketImpl = /** @class */ (function (_super) {
    __extends(WebSocketImpl, _super);
    function WebSocketImpl() {
        var _a;
        var _this = _super.call(this) || this;
        _this.module = (_a = window === null || window === void 0 ? void 0 : window.sw) === null || _a === void 0 ? void 0 : _a.require('websocket');
        return _this;
    }
    WebSocketImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new WebSocketImpl();
        }
        return this.instance;
    };
    WebSocketImpl.prototype.createServer = function () {
        var server = this.module.createServer();
        return new ServerImpl(server);
    };
    WebSocketImpl.instance = null;
    return WebSocketImpl;
}(WebSocket));

var Hardware = /** @class */ (function () {
    function Hardware() {
    }
    return Hardware;
}());

var HardwareImpl = /** @class */ (function (_super) {
    __extends(HardwareImpl, _super);
    function HardwareImpl() {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.requireModule) === null || _c === void 0 ? void 0 : _c.postMessage('hardware');
        return _this;
    }
    HardwareImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new HardwareImpl();
        }
        return HardwareImpl.instance;
    };
    HardwareImpl.prototype.addDeviceMotionListener = function (obj) {
        checkArgs('of', 'addDeviceMotionListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addDeviceMotionListener:ok', listenerId: res.listenerId }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                obj.onReceive(res);
            },
            keepCallback: true
        };
        call2NativeIOS('hardware', 'addDeviceMotionListener', {}, proxyCallback);
    };
    HardwareImpl.prototype.removeDeviceMotionListener = function (obj) {
        checkArgs('os', 'removeDeviceMotionListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeDeviceMotionListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('hardware', 'removeDeviceMotionListener', { listenerId: obj.listenerId }, proxyCallback);
        removeCallback(obj.listenerId);
    };
    return HardwareImpl;
}(Hardware));

var CCStorage = /** @class */ (function () {
    function CCStorage() {
    }
    return CCStorage;
}());

var StorageImpl = /** @class */ (function (_super) {
    __extends(StorageImpl, _super);
    function StorageImpl() {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.requireModule) === null || _c === void 0 ? void 0 : _c.postMessage('storage');
        return _this;
    }
    StorageImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new StorageImpl();
        }
        return StorageImpl.instance;
    };
    StorageImpl.prototype.getStorage = function (obj) {
        checkArgs('os', 'getStorage', obj, obj.key);
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getStorage:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('storage', 'getStorage', { key: obj.key }, proxyCallback);
    };
    StorageImpl.prototype.setStorage = function (obj) {
        checkArgs('oss', 'setStorage', obj, obj.key, obj.data);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'setStorage:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('storage', 'setStorage', { key: obj.key, data: obj.data }, proxyCallback);
    };
    StorageImpl.prototype.removeStorage = function (obj) {
        checkArgs('os', 'removeStorage', obj, obj.key);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeStorage:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('storage', 'removeStorage', { key: obj.key }, proxyCallback);
    };
    StorageImpl.prototype.getStorageInfo = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getStorageInfo:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('storage', 'getStorageInfo', {}, proxyCallback);
    };
    StorageImpl.prototype.clearStorage = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'clearStorage:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('storage', 'clearStorage', {}, proxyCallback);
    };
    return StorageImpl;
}(CCStorage));

var CCNavigator = /** @class */ (function () {
    function CCNavigator() {
    }
    return CCNavigator;
}());

var NavigatorImpl = /** @class */ (function (_super) {
    __extends(NavigatorImpl, _super);
    function NavigatorImpl() {
        var _a;
        var _this = _super.call(this) || this;
        _this.module = (_a = window === null || window === void 0 ? void 0 : window.sw) === null || _a === void 0 ? void 0 : _a.require('navigator');
        return _this;
    }
    NavigatorImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new NavigatorImpl();
        }
        return NavigatorImpl.instance;
    };
    NavigatorImpl.prototype.setNavigationBarTitle = function (obj) {
        checkArgs('os', 'setNavigationBarTitle', obj, obj.title);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'setNavigationBarTitle:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'navigator');
        var params = JSON.stringify({
            title: obj.title,
            subTitle: obj.subTitle || '',
            alpha: obj.alpha || 1
        });
        this.module.setNavigationBarTitle(callbackId, params);
    };
    NavigatorImpl.prototype.setDarkMode = function (obj) {
        checkArgs('ob', 'setDarkMode', obj, obj.darkMode);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'setDarkMode:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var callbackId = generateCallback(proxyCallback, 'navigator');
        var params = JSON.stringify({
            darkMode: obj.darkMode
        });
        this.module.setDarkMode(callbackId, params);
    };
    NavigatorImpl.prototype.setNavigationBarStyle = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.addBackButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.removeBackButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.addShareButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.removeShareButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    return NavigatorImpl;
}(CCNavigator));

var AndroidFactory = /** @class */ (function () {
    function AndroidFactory() {
    }
    AndroidFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new AndroidFactory();
        }
        return AndroidFactory.instance;
    };
    AndroidFactory.prototype.requireModule = function (moduleName) {
        console.log('AndroidFactory requireModule ' + moduleName);
        var module;
        switch (moduleName) {
            case 'account':
                module = AccountImpl.getModule();
                break;
            case 'channel':
                module = ChannelImpl.getModule();
                break;
            case 'websocket':
                module = WebSocketImpl.getModule();
                break;
            case 'hardware':
                module = HardwareImpl.getModule();
                break;
            case 'storage':
                module = StorageImpl.getModule();
                break;
            case 'navigator':
                module = NavigatorImpl.getModule();
                break;
            default:
                throw new Error("Module not found.");
        }
        return module;
    };
    return AndroidFactory;
}());

var console$2 = vConsole();
var AccountImpl$1 = /** @class */ (function (_super) {
    __extends(AccountImpl, _super);
    function AccountImpl() {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.requireModule) === null || _c === void 0 ? void 0 : _c.postMessage('account');
        return _this;
    }
    AccountImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new AccountImpl();
        }
        return AccountImpl.instance;
    };
    AccountImpl.prototype.getAccountInfo = function (obj) {
        var argsObj = Object.assign({}, obj);
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getAccountInfo:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('account', 'getAccountInfo', JSON.stringify(argsObj), proxyCallback);
    };
    AccountImpl.prototype.getAccessToken = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getAccessToken:ok', data: { accessToken: res.accessToken } }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('account', 'getAccessToken', {}, proxyCallback);
    };
    AccountImpl.prototype.isLogin = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'isLogin:ok', data: { isLogin: res.isLogin } }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('account', 'isLogin', {}, proxyCallback);
    };
    AccountImpl.prototype.startLogin = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'startLogin:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('account', 'startLogin', {}, proxyCallback);
    };
    AccountImpl.prototype.setLogout = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'setLogout:ok' }));
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
            },
            keepCallback: false
        };
        call2NativeIOS('account', 'setLogout', {}, proxyCallback);
    };
    AccountImpl.prototype.addAccountChangedListener = function (obj) {
        checkArgs('of', 'addAccountChangedListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function (res) {
                console$2.log('addAccountChangedListener success = ' + res);
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addAccountChangedListener:ok', listenerId: res.listenerId }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                console$2.log('addAccountChangedListener onReceive = ' + JSON.stringify(res));
                obj.onReceive(res);
            },
            keepCallback: true
        };
        call2NativeIOS('account', 'addAccountChangedListener', {}, proxyCallback);
    };
    AccountImpl.prototype.removeAccountChangedListener = function (obj) {
        checkArgs('os', 'removeAccountChangedListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeAccountChangedListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('account', 'removeAccountChangedListener', { listenerId: obj.listenerId }, proxyCallback);
        removeCallback(obj.listenerId);
    };
    return AccountImpl;
}(Account));

var ChannelImpl$1 = /** @class */ (function (_super) {
    __extends(ChannelImpl, _super);
    function ChannelImpl() {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.requireModule) === null || _c === void 0 ? void 0 : _c.postMessage('channel');
        return _this;
    }
    ChannelImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new ChannelImpl();
        }
        return ChannelImpl.instance;
    };
    ChannelImpl.prototype.isLAN = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'isLAN:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'isLAN', {}, proxyCallback);
    };
    ChannelImpl.prototype.getConnectDeviceInfo = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getConnectDeviceInfo:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'getConnectDeviceInfo', {}, proxyCallback);
    };
    ChannelImpl.prototype.getSceneId = function (obj) {
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'getSceneId:ok', data: res }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'getSceneId', {}, proxyCallback);
    };
    ChannelImpl.prototype.startConnectDevice = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'startConnectDevice:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'startConnectDevice', {}, proxyCallback);
    };
    ChannelImpl.prototype.startConnectWiFi = function (obj) {
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'startConnectWiFi:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'startConnectWiFi', {}, proxyCallback);
    };
    ChannelImpl.prototype.sendMsg = function (obj) {
        checkArgs('oss', 'sendMsg', obj, obj.target, obj.content);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'sendMsg', { target: obj.target, content: obj.content }, proxyCallback);
    };
    ChannelImpl.prototype.sendVideoMsg = function (obj) {
        checkArgs('os', 'sendVideoMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendVideoMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'sendVideoMsg', { target: 'ss-clientID-UniversalMediaPlayer', url: obj.url, mediaTitle: obj.title || '' }, proxyCallback);
    };
    ChannelImpl.prototype.sendAudioMsg = function (obj) {
        checkArgs('os', 'sendAudioMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendAudioMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'sendAudioMsg', { target: 'ss-clientID-UniversalMediaPlayer', url: obj.url, mediaTitle: obj.title || '' }, proxyCallback);
    };
    ChannelImpl.prototype.sendImageMsg = function (obj) {
        checkArgs('os', 'sendImageMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendImageMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'sendImageMsg', { target: 'ss-clientID-UniversalMediaPlayer', url: obj.url, mediaTitle: obj.title || '' }, proxyCallback);
    };
    ChannelImpl.prototype.sendLiveMsg = function (obj) {
        checkArgs('osa', 'sendLiveMsg', obj, obj.url, obj.urlList);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendLiveMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'sendLiveMsg', { target: 'ss-clientID-UniversalMediaPlayer', urlList: JSON.stringify(obj.urlList), url: obj.url, mediaTitle: obj.title || '' }, proxyCallback);
    };
    ChannelImpl.prototype.sendBrowserMsg = function (obj) {
        var _a, _b, _c;
        checkArgs('os', 'openBrowser', obj, obj.url);
        (_c = (_b = (_a = window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.broadcastToScreenClient) === null || _c === void 0 ? void 0 : _c.postMessage({
            h5SenderUrl: '',
            h5ReceivedUrl: obj.url,
            h5Content: ''
        });
    };
    ChannelImpl.prototype.sendOpenBrowserMsg = function (obj) {
        checkArgs('os', 'sendOpenBrowserMsg', obj, obj.url);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'sendMsg:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        var name = '';
        var flag = '';
        if (obj.name) {
            name = '' + obj.name;
        }
        if (obj.flag) {
            flag = '' + obj.flag;
        }
        var content = {
            "do": 'launcher_browser',
            url: obj.url,
            name: name,
            flag: flag
        };
        call2NativeIOS('channel', 'sendMsg', { target: 'ss-clientID-runtime-h5-channel', content: JSON.stringify(content) }, proxyCallback);
    };
    ChannelImpl.prototype.addMsgReceiveListener = function (obj) {
        checkArgs('of', 'addMsgReceiveListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addMsgReceiveListener:ok', listenerId: res.listenerId }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                obj.onReceive(res);
            },
            keepCallback: true
        };
        call2NativeIOS('channel', 'addMsgReceiveListener', {}, proxyCallback);
    };
    ChannelImpl.prototype.addStatusReceiveListener = function (obj) {
        checkArgs('of', 'addStatusReceiveListener', obj, obj.onReceive);
        var proxyCallback = {
            success: function (res) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'addStatusReceiveListener:ok', listenerId: res.listenerId }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            onReceive: function (res) {
                obj.onReceive(res);
            },
            keepCallback: true
        };
        call2NativeIOS('channel', 'addStatusReceiveListener', {}, proxyCallback);
    };
    ChannelImpl.prototype.removeMsgReceiveListener = function (obj) {
        checkArgs('os', 'removeMsgReceiveListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeMsgReceiveListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'removeMsgReceiveListener', { listenerId: obj.listenerId }, proxyCallback);
        removeCallback(obj.listenerId);
    };
    ChannelImpl.prototype.removeStatusReceiveListener = function (obj) {
        checkArgs('os', 'removeStatusReceiveListener', obj, obj.listenerId);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'removeStatusReceiveListener:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('channel', 'removeStatusReceiveListener', { listenerId: obj.listenerId }, proxyCallback);
        removeCallback(obj.listenerId);
    };
    ChannelImpl.prototype.sendCommonMsg = function (obj) {
        throw new Error("Method not implemented.");
    };
    return ChannelImpl;
}(Channel));

var NavigatorImpl$1 = /** @class */ (function (_super) {
    __extends(NavigatorImpl, _super);
    function NavigatorImpl() {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        (_c = (_b = (_a = window === null || window === void 0 ? void 0 : window.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.requireModule) === null || _c === void 0 ? void 0 : _c.postMessage('navigator');
        return _this;
    }
    NavigatorImpl.getModule = function () {
        if (this.instance == null) {
            this.instance = new NavigatorImpl();
        }
        return NavigatorImpl.instance;
    };
    NavigatorImpl.prototype.setNavigationBarTitle = function (obj) {
        checkArgs('os', 'setNavigationBarTitle', obj, obj.title);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'setNavigationBarTitle:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('navigator', 'setNavigationBarTitle', { title: obj.title }, proxyCallback);
    };
    NavigatorImpl.prototype.setDarkMode = function (obj) {
        checkArgs('ob', 'setDarkMode', obj, obj.darkMode);
        var proxyCallback = {
            success: function () {
                typeof (obj === null || obj === void 0 ? void 0 : obj.success) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.success({ errMsg: 'setDarkMode:ok' }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            fail: function (err) {
                typeof (obj === null || obj === void 0 ? void 0 : obj.fail) === 'function' && (obj === null || obj === void 0 ? void 0 : obj.fail({ errMsg: err }));
                typeof (obj === null || obj === void 0 ? void 0 : obj.complete) === 'function' && obj.complete();
            },
            keepCallback: false
        };
        call2NativeIOS('navigator', 'setDarkMode', { darkMode: obj.darkMode }, proxyCallback);
    };
    NavigatorImpl.prototype.setNavigationBarStyle = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.addBackButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.removeBackButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.addShareButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    NavigatorImpl.prototype.removeShareButtonOnClickListener = function (obj) {
        throw new Error("Method not implemented.");
    };
    return NavigatorImpl;
}(CCNavigator));

var IOSFactory = /** @class */ (function () {
    function IOSFactory() {
    }
    IOSFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new IOSFactory();
        }
        return IOSFactory.instance;
    };
    IOSFactory.prototype.requireModule = function (moduleName) {
        console.log('IOSFactory requireModule: ' + moduleName);
        var module;
        switch (moduleName) {
            case 'account':
                module = AccountImpl$1.getModule();
                break;
            case 'channel':
                module = ChannelImpl$1.getModule();
                break;
            case 'hardware':
                module = HardwareImpl.getModule();
                break;
            case 'storage':
                module = StorageImpl.getModule();
                break;
            case 'navigator':
                module = NavigatorImpl$1.getModule();
                break;
            default:
                throw new Error("Module can not found.");
        }
        return module;
    };
    return IOSFactory;
}());

(function (window) {
    function requireModule(moduleName) {
        var platform = getPlatform();
        console.log('platform = ' + platform);
        if (platform == 'Android') {
            return AndroidFactory.getInstance().requireModule(moduleName);
        }
        else if (platform == 'IOS') {
            return IOSFactory.getInstance().requireModule(moduleName);
        }
    }
    window.requireModule = requireModule;
    window.callbackFromNative = callbackFromNative;
    // window.messageFromNative = messageFromNative
    // window.onShow = onShow
    // window.onHide = onHide
    window.vConsole = __assign({}, createConsole());
})(window);
var window$1 = window;

export default window$1;
