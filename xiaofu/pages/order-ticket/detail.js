// pages/order-ticket/detail.js
const app = getApp()
Page({

   /**
   * 页面的初始数据
   */
   data: {
      itemData: {},
      currentIndex: 0,
      duration: 0,
      notCheckNum: 0,
      checkNum: 0,
      imgSrc: app.globalData.imgSrc
   },

   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      console.log(options)
      let id = options.id
      this.getListData(id)
   },
   getListData (id) {
      let self = this
      wx.showNavigationBarLoading()
      wx.request({
         url: app.globalData.ajaxSrc + '/order_desc',
         data: {
            openid: app.globalData.userOpenID,
            order_num: id
         },
         success: function (res) {
            let data = res.data.data
            let not = 0
            let check = 0
            for (let item of data.child) {
               if (item.is_check === '0') {
                  not++
               } else if (item.is_check === '1') {
                  check++
               }
            }
            self.setData({
               notCheckNum: not,
               checkNum: check,
               itemData: data,
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
   docall (e) {
      let phone = e.target.dataset.phone
      wx.makePhoneCall({
         phoneNumber: phone// 仅为示例，并非真实的电话号码
      })
   },
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
