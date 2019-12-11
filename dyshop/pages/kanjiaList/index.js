// pages/kanjiaList/index.js
const api = require('../../utils/api.js');
const www = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    isCN: wx.getStorageSync('isCN')
  },

  payTap:function(e){
    wx.navigateTo({
      url: '../orderAccount/index?kj_uid=' + e.currentTarget.dataset.uid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let www = { method: 'my_kj_list', canshu: ''};
    let huidiao = (ret) => {
      var list = ret;
      for(var i in list){
        list[i].time = list[i].ctime - list[i].kj_time * 3600
      }
      this.setData({
        list: ret,
        isCN:wx.getStorageSync('isCN')
      })
    }
    api.post(this, www, {}, huidiao);
  },

  autoCancel:function(e){
    console.log(e.detail.id);
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
  onShareAppMessage: function () {

  }
})