// pages/sponsor/list.js
const app = getApp()
Page({

   /**
   * 页面的初始数据
   */
   data: {
      dataList: [],
      imgSrc: app.globalData.imgSrc
   },

   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      this.getListData()
   },
   getListData () {
      let self = this
      wx.showNavigationBarLoading()
      wx.request({
         url: app.globalData.ajaxSrc + '/re_company',
         success (res) {
            self.setData({
               dataList: res.data.data
            })
            wx.hideNavigationBarLoading()
         },
         fail () {
            wx.navigateTo({
               url: '/pages/error/error'
            })
         }
      })
   },
   /**
   * 生命周期函数--监听页面初次渲染完成
   */
   onReady: function () {

   },
   toIndex (e) {
      const item = e.currentTarget.dataset.item
      const src = this.data.imgSrc + item.logo_img
      wx.navigateTo({
        url: `/pages/index/index?id=${item.mid}&src=${src}`
      })
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
