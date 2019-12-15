// pages/my/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    imgUrl:imgUrl,
    spellList:[],
    isShowAll:false,
    couponDialog: false, // 优惠券弹窗
    code: '',
    phone: '',
    session_key: ''
  },

  getUserTap: function (e) {
    var that = this;
    api.getUser(that);
  },

  // 语言切换
  SwitchLag: function (e) {
    var Lag = e.currentTarget.dataset.lag;
    /*this.setData({
      isCN: Lag
    });*/
    wx.setStorageSync('isCN', Lag);
    wx.reLaunch({
      url: '/pages/my/index'
    })
  },
  // 我参与的拼单列表倒计时
  setSpellTime: function(e) {
      let that = this
      this.data[e].forEach((item, index) => {
          var newTime = parseInt(item.remain_time)
          if (newTime <= 0) {
              return;
          }
          newTime--
          let formatSpellTime = that.getFormat(newTime);
          let arr = that.data[e]
          let list = e
          arr[index].remain_time = newTime
          arr[index].lastTime = formatSpellTime
          that.setData({
              [list]: arr
          })
      })
      setTimeout(() => this.setSpellTime(e), 1000);
  },

  showAll: function(){
      this.setData({
          isShowAll: !this.data.isShowAll
      })
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
          var dd = Day < 10 ? '0' + Day : Day
          var hh = Hour < 10 ? '0' + Hour : Hour
          var mm = Minute < 10 ? '0' + Minute : Minute
          var ss = Second < 10 ? '0' + Second : Second
          return hh+':'+mm+':'+ss;
      }else{
          return '00:00:00';
      }
  },

  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      couponDialog: false
    });
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },


  /**
   * 弹窗取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 弹窗确认按钮点击事件
   */
  onConfirm: function () {
    let phone = this.data.phone || this.data.data.phone
    let link = { method: 'bind_yhq', canshu: '?mid=7&code=' + this.data.code + '&phone=' + phone };
    let huidiao = (ret) => {
      if (ret.ret == 0){
        wx.navigateTo({
          url: '../myCoupon/index',
        })
        this.hideModal();
      }else{
        wx.showToast({
          title: ret.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
    api.post(this,link,{},huidiao)
  },
  getUser(){
    if (this.data.data.phone) return
    app.getLogin()
  },

  inputChange(code) {
    this.setData({
      code: code.detail.value
    })
  },

  openCouponDialog: function() {
    this.setData({
      couponDialog: true
    })
  },

  getPhoneNumber: function(e){
     //用户取消手机授权直接返回
    if (e.detail.iv == undefined && e.detail.encryptedData == undefined) {
      return;
    }
    if (this.data.data.phone) {
      this.setData({
        couponDialog: true
      })
      return
    }
    let session_key = wx.getStorageSync("session_key");
    e.detail.iv = e.detail.iv.replace(/\+/g,'%2B')
    e.detail.encryptedData = e.detail.encryptedData.replace(/\+/g,'%2B')
    session_key = session_key.replace(/\+/g,'%2B')
    let link = { method: 'get_phone', canshu: '&mid=7&iv=' + e.detail.iv + '&encryptedData=' + e.detail.encryptedData + '&session_key=' + session_key};
    let huidiao = (ret) => {
      if (ret.ret == 0) {
        this.setData({
          phone: ret.phone,
          couponDialog: true
        })
      } else {
        wx.showToast({
          title: ret.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
    api.post(this,link, {} , huidiao)  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let link = { method: 'my_index', canshu: '' };
    let logic = (ret) => {
      this.setData({
        data: ret
      })
    }
    api.post(this, link, {}, logic);

    //获取我参与的拼单
    let pinduan = { method: 'join_activity_list', canshu: '' };
    let logic1 = (ret) => {
      if (ret) {
        this.setData({
          spellList: ret
        })
        this.setSpellTime('spellList');
      }
    }
    api.postGroupBuy(this, pinduan, {}, logic1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('userInfo')) {
      this.setData({
        hasLogin: 1
      })
    } else {
      this.setData({
        hasLogin: 0
      })
    }
    let www = { method: 'cart_nums', canshu: '' };
    let huidiao = (ret) => {
      this.setData({
        nums: ret.nums,
        isCN: wx.getStorageSync('isCN')
      })
    }
    api.post(this, www, {}, huidiao);

  },
  loginTap: function () {
    if (wx.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: true
      })
    } else {
      this.setData({
        isShowGetUser: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    var fxs_id = this.data.data.fxs_id;
    if (res.from === 'button') {
        //区分按钮分享
        if (res.target.id === "shareBtn") {
            return {
                title: res.target.dataset.title,
                imageUrl:res.target.dataset.url,
                path: '/pages/pintuanShare/index?id='+res.target.dataset.id,
                success: function (res) {
                },
                fail: function (res) {
                }
            }
        }
    }
    return {
      title: '分销商城',
      path: '/pages/index/index?fxs_id=' + fxs_id
    }
  }
})