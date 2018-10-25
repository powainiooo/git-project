// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxcodeimg:''
  },
  onGotUserInfo(e){
    app.globalData.userInfo = e.detail.userInfo;
    wx.request({
      url: app.globalData.ajaxSrc + '/wxuser_add',
      data: {
        openid: app.globalData.userOpenID,
        country: e.detail.userInfo.country,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city,
        gender: e.detail.userInfo.gender,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl
      },
      success: res => {
        //wx.redirectTo({
        //  url: routers[0].route
        //})
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('login');
    const routers = getCurrentPages();
    console.log(routers);
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