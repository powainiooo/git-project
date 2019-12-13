// pages/helpDetail/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tt.setNavigationBarTitle({
      title: options.name
    })
    var url = urlPath + 'api/hwsc/help_detail'
    appRequest({
      url: url,
      data: { id: options.id, isCN: tt.getStorageSync('isCN')},
      success: res => {
        var _desc = res.data.data.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match, capture) => {
          var url = getApp().globalData.www;
          var newStr = '<img src="' + url + capture + '" style="width:100%;height:auto"/>';
          return newStr;
        });

        console.log(_desc);
        this.setData({
          _desc:_desc
        })
      },
    })
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
