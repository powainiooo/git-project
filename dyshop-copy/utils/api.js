const app = getApp();
const www = getApp().globalData.www;

// 总接口
function post(that, link, data, logic = function () { }) {
  var login_key = app.getLoginKey();
  var isCN = wx.getStorageSync('isCN') ? 1 : 0;
  var url = www + 'api/hwsc/' + link.method + '?login_key=' + login_key + '&mid=' + app.globalData.mid + '&isCN=' + isCN + link.canshu;
  wx.request({
    url: url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      var retData = res.data;
      if (res) {
        if (retData.ret == 1) {
          if (retData.data) {
            //保存订单id
            if (retData.order_info && retData.order_info.id) {
              retData.data.id = retData.order_info.id;
              retData.data.activity_type = retData.order_info.activity_type;
            }
            logic(retData.data);
          } else {
            retData.data = [];
            logic(retData.data);
          }
        } else if (retData.ret == 101) {
          wx.showToast({
            title: retData.msg,
            icon: 'none',
            duration: 1500
          })
        } else if (retData.ret == 99) {
          app.getLogin(function () {
            that.onLoad();
          });
        } else if (retData.ret == 10011) {
          that.setData({
            isShowGetUser: true
          })
        } else if (retData.ret == 100) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '../myOrder/index',
            })
          }, 2000)
        } else if (retData.ret == 0) {
          logic(retData);
        } else {
          wx.showToast({
            title: retData.msg,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        //接口没有数据
        wx.showToast({
          title: '接口错误！',
          icon: 'loading',
          duration: 1200
        })
      }
    },
    fail: function (res) { console.log(res) },
    complete: function (res) {/*console.log(res)*/ }
  })
}

// 砍价活动调用
function postHd(that, link, data, logic = function () { }) {
  var login_key = app.getLoginKey();
  var isCN = wx.getStorageSync('isCN') ? 1 : 0;
  var url = www + 'api/hd/' + link.method + '?login_key=' + login_key + '&mid=' + app.globalData.mid + '&isCN=' + isCN + link.canshu;
  wx.request({
    url: url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      var retData = res.data;
      if (res) {
        if (retData.ret == 1) {
          if (retData.data) {
            logic(retData.data);
          } else {
            retData.data = [];
            logic(retData.data);
          }
        } else if (retData.ret == 101) {
          wx.showToast({
            title: retData.msg,
            icon: 'none',
            duration: 1500
          })
        } else if (retData.ret == 99) {
          app.getLogin(function () {
            that.onLoad();
          });
        } else if (retData.ret == 10011) {
          that.setData({
            isShowGetUser: true
          })
        } else if (retData.ret == 100) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '../myOrder/index',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: retData.msg,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        //接口没有数据
        wx.showToast({
          title: '接口错误！',
          icon: 'loading',
          duration: 1200
        })
      }
    },
    fail: function (res) { console.log(res) },
    complete: function (res) {/*console.log(res)*/ }
  })
}

// 保存用户信息
function reqUser(UserInfo, that, type) {
  var login_key = app.getLoginKey();
  //console.log('login_key3=' + login_key);
  if (login_key == '') {
    app.getLogin();
    return;
  }
  wx.request({
    url: www + 'wechat/main/getUserInfo?login_key=' + login_key + '&mid=' + app.globalData.mid,
    data: UserInfo,
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      wx.setStorageSync('userInfo', UserInfo);
      that.setData({
        isShowGetUser: false,
        userInfo: UserInfo,
        hasLogin: 1
      })
      console.log('get user info success', type);
      // type为1，是砍价页面授权
      if (type == 0) {
        that.onLoad();
      } else if (type == 1) {
        that.onShow();
      } else {
        console.log(that);
        that.onLoad();
      }

    }
  })
}

// 用户授权获取信息
function getUser(that, type) {
  wx.getSetting({
    success: (res) => {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function (res) {
            var UserInfo = res.userInfo;
            reqUser(UserInfo, that, type);

          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '您拒绝授权后，本小程序将不能为您提供更优质的服务！',
          showCancel: false, //如果不用授权，可以把这行注释
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else {
              that.setData({
                isShowGetUser: false
              })
            }
          }
        })
      }
    }, fail(res) {
      wx.showModal({
        title: '提示',
        content: '授权失败！',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  })
}

// 微信支付
function wxPay(data) {
  wx.requestPayment({
    'timeStamp': data.timeStamp,
    'nonceStr': data.nonceStr,
    'package': data.package,
    'signType': data.signType,
    'paySign': data.paySign,
    'success': (res) => {

      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 1500
      })
      setTimeout(() => {
        if (data.id && data.activity_type == 4) {
          wx.redirectTo({
            url: '../paySuccess/index?id=' + data.id,
          })
        } else if (data.isKJ == 1) {
          wx.redirectTo({
            url: '../bargain/myBargain',
          })
        } else {
          wx.redirectTo({
            url: '../myOrder/index',
          })
        }
      }, 2000)
    },
    'fail': (res) => {
      wx.showModal({
        title: '提示',
        content: '支付失败，是否重新发起支付？',
        success: (res) => {
          if (res.confirm) {
            //点击了确定，重新发起支付
            this.wxPay(data);
          } else if (res.cancel) {
            //取消了支付，跳转到其他页面
            if (data.isKJ == 1) {
              wx.redirectTo({
                url: '../bargain/myBargain',
              })
            } else {
              wx.redirectTo({
                url: '../myOrder/index',
              })
            }
          }
        }
      })
    }
  })
}

// 拼团接口
function postGroupBuy(that, link, data, logic = function () { }) {
  var login_key = app.getLoginKey();
  var isCN = wx.getStorageSync('isCN') ? 1 : 0;
  var url = www + 'api/groupbuy/' + link.method + '?login_key=' + login_key + '&mid=' + app.globalData.mid + '&isCN=' + isCN + link.canshu;
  wx.request({
    url: url,
    data: data,
    header: { 'content-type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      var retData = res.data;
      if (res) {
        if (retData.ret == 1) {
          if (retData.data) {
            logic(retData.data);
          } else {
            retData.data = [];
            logic(retData.data);
          }
        } else if (retData.ret == 101) {
          wx.showToast({
            title: retData.msg,
            icon: 'none',
            duration: 1500
          })
        } else if (retData.ret == 99) {
          app.getLogin(function () {
            that.onLoad();
          });
        } else if (retData.ret == 10011) {
          that.setData({
            isShowGetUser: true
          })
        } else if (retData.ret == 100) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 1500
          })
          setTimeout(() => {
            wx.redirectTo({
              url: '../myOrder/index',
            })
          }, 2000)
        } else {
          wx.showToast({
            title: retData.msg,
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        //接口没有数据
        wx.showToast({
          title: '接口错误！',
          icon: 'loading',
          duration: 1200
        })
      }
    },
    fail: function (res) { console.log(res) },
    complete: function (res) {/*console.log(res)*/ }
  })
}

module.exports = {
  post: post,
  postHd: postHd,
  getUser: getUser,
  wxPay: wxPay,
  postGroupBuy: postGroupBuy
}