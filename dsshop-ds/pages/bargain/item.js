// pages/cut/cut.js
const api = require('../../utils/api.js');
var WxParse = require('../../wxParse/wxParse.js')
var share = require('../../utils/share.js')
import common from '../../utils/common'
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowGetUser: false, //是否获取到了用户信息
    www: www,
    imgUrl: imgUrl,
    model: 0, //弹窗
    moneyNow: 50, //目前价格
    moneyAll: 100, //总价
    moneyAverage: 80, //平均砍价
    cutType: 1, //状态  1正常自己砍价 2帮好友砍价 3砍至底价 4砍价失败 5砍价成功
    kj_info: '',
    help_kj: '',
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      options: options
    })
    var userInfo = tt.getStorageSync('userInfo')
    console.log(userInfo)
    if (userInfo == '') {
      this.setData({
        isShowGetUser: true
      })
    } else {
      this.setData({
        isShowGetUser: false
      })
      this.kj_info()
    }
  },
  kj_info: function() {
    let options = this.data.options
    let link = {
      method: 'kj_info',
      canshu: ''
    };
    var data = {
      kj_user_id: options.kj_user_id
    }
    let kj_info = (ret) => {
      console.log(ret)
      this.setData({
        kj_info: ret,
      })
      // 解析富文本
      var article = ret.hd_sm;
      let _this = this;
      WxParse.wxParse('article', 'html', article, _this, 5);
      this.setCountDown() //时间倒计时
      // 判断自己砍价金额
      if (options.money) {
        this.setData({
          model: 1
        })
        this.setTimeout()
      }
    }
    api.postHd(this, link, data, kj_info);
  },
  setTimeout: function() {
    setTimeout(() => {
      this.setData({
        model: 0
      })
    }, 2000)
  },
  // 解析富文本
  WxParse: function(notice) {
    var that = this;
    var replyArr = notice
    for (let i = 0; i < replyArr.length; i++) {
      WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
      if (i === replyArr.length - 1) {
        WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that, 10)
      }
    }
  },
  setCountDown: function() {
    let that = this
    let time = 1000
    var remain_time = that.data.kj_info.remain_time
    var getTime = Date.parse(new Date()) //当前时间戳
    // console.log(remain_time, getTime)
    var newTime = parseInt(remain_time) - getTime / 1000
    // console.log(newTime)
    if (newTime <= 1) {
      var dd = `00`
      var hh = `00`
      var mm = `00`
      var ss = `00`
      return;
    }
    let formatTime = that.getFormat(newTime);
    // console.log(formatTime)
    // v.time -= time;
    var dd = `${formatTime.dd}`
    var hh = `${formatTime.hh}`
    var mm = `${formatTime.mm}`
    var ss = `${formatTime.ss}`
    that.setData({
      'kj_info.dd': dd,
      'kj_info.hh': hh,
      'kj_info.mm': mm,
      'kj_info.ss': ss,
    })
    setTimeout(this.setCountDown, time);
  },
  /**
   * 格式化时间
   */
  getFormat: function(leftTime) {
    var leftSecond = parseInt(leftTime);
    var Day = Math.floor(leftSecond / (60 * 60 * 24)); //天数
    var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600); //小时
    var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60); //分钟
    var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60); //秒数
    if (Hour >= 0 && Minute >= 0 && Second >= 0) {
      // console.log(Hour, Minute, Second)
      var dd = Day < 10 ? '0' + Day : Day
      var hh = Hour < 10 ? '0' + Hour : Hour
      var mm = Minute < 10 ? '0' + Minute : Minute
      var ss = Second < 10 ? '0' + Second : Second
      return {
        dd,
        ss,
        mm,
        hh
      };
      // that.setData({
      //   h: Hour < 10 ? '0' + Hour : Hour,
      //   m: Minute < 10 ? '0' + Minute : Minute,
      //   s: Second < 10 ? '0' + Second : Second,
      // })
    }
  },
  // 微信支付
  wxPay: function() {
    let link = {
      method: 'kj_order',
      canshu: ''
    };
    var kj_user_id = this.data.options.kj_user_id
    var data = {
      kj_user_id: kj_user_id
    }
    let kj_order = (ret) => {
      console.log(ret)
      // 跳转订单结算
      tt.navigateTo({
        url: '../orderAccount/index',
      })
    }
    api.postHd(this, link, data, kj_order);
  },
  // 好友帮忙砍价
  help_kj: function() {
    let link = {
      method: 'help_kj',
      canshu: ''
    };
    var data = {
      kj_user_id: this.data.options.kj_user_id
    }
    let help_kj = (ret) => {
      console.log(ret)
      this.setData({
        help_kj: ret,
        model: 2
      })
      this.kj_info()
      this.setTimeout()
    }
    api.postHd(this, link, data, help_kj);
  },
  toBargain: function(e) {
    console.log(e)
    tt.navigateTo({
      url: 'initiator?id=' + e.currentTarget.dataset.id,
    })
  },
  // 我的砍价
  myBargain: function() {
    tt.navigateTo({
      url: 'myBargain',
    })
  },
  // 砍价规则
  binRule: function() {
    this.setData({
      model: 6
    })
  },
  // 邀请好友
  binInvited: function() {
    this.setData({
      model: 5
    })
  },
  cancel: function() {
    this.setData({
      model: 0
    })
  },
  binIndex: function() {
    tt.navigateTo({
      url: 'index',
    })
  },
  // 去砍价
  toBargain: function (e) {
    console.log(e)
    tt.navigateTo({
      url: 'initiator?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},
  // 获取用户信息
  getUserTap: function(e) {
    var that = this;
    api.getUser(that,1);
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
      var nickname = this.data.kj_info.help_kj_user[0].nickname
      var kj_user_id = this.data.options.kj_user_id
      var cover = this.data.imgUrl + this.data.kj_info.goods_info.cover
      console.log(nickname, kj_user_id, cover)
      return share.binInvited(nickname, kj_user_id, cover)
  }
})
