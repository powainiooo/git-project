// pages/wuliuDetail/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    list:{},
    status: ['在途', '揽件', '疑难', '签收', '退签', '派件','退回']
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && options.id){
      let link = { method: 'look_wl', canshu: '&id=' + options.id};
      let logic = (ret) => {
        this.setData({
          data: ret,
          list: ret.list ? ret.list:[],
          isCN: wx.getStorageSync('isCN')
        })
      }
      api.post(this, link, {}, logic);
    }else{
      wx.redirectTo({
        url: '../myOrder/index',
      })
    }
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