// pages/class/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
var canIUseGetUserProfile=app.globalData.canIUseGetUserProfile;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    www:www,
    imgUrl: imgUrl,
    isActive:0,
    canIUseGetUserProfile:canIUseGetUserProfile
  },

  // 语言切换
  SwitchLag: function (e) {
    var Lag = e.detail.Lag;
    if (!Lag){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }else{
      this.setData({
        isCN: Lag
      })
    }
  },

  // 获取用户信息
  getUserTap: function (e) {
    var that = this;
    api.getUser(that);
  },
    getUserProfile:function(e){
    console.log(1);
    var that = this;
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        var UserInfo = res.userInfo;
        
        that.saveuserinfo(UserInfo)
      }
    })
  },
  saveuserinfo:function(UserInfo){
    console.log(123,UserInfo);
    var that = this;
    //api.getUser(that);
    api.reqUser(UserInfo, that,1);
  },

  // 搜索获取焦点
  SerchFocus: function () {
    wx.navigateTo({
      url: '../serch/index',
    })
  },

  //分类切换
  isActiveTap:function(e){
    var idx = e.currentTarget.dataset.idx;
    this.setData({
      isActive: idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  if (options.mid) {
		  app.setMid(options.mid)
	  }
	  if (options.fxs_id && options.mid) {
		  app.setFxsId(options.fxs_id,options.mid)
	  }
    let link = { method: 'cate', canshu: '' };
    let logic = (ret) => {
      this.setData({
        list: ret.list
      })
    }
    api.post(this, link, {}, logic);
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
    if (wx.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: false
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
})
