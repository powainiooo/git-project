// pages/coupon/coupon.js
const {getCouponList, affirmGetIq} = require('../../utils/api.js')
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      listData: [],
      isAjax: false,
      showModal: false,
      selectIndex: 0,
      isIOS: app.globalData.isIOS,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   getData () {
      getCouponList().then(res => {
         this.setData({
            listData: res.data
         })
      })
   },
   confirmGet () {
      const data = this.data.listData[this.data.selectIndex]
      if (this.data.isAjax) return
      this.data.isAjax = true
      this.closeModal()
      affirmGetIq(data.couponId).then(res => {
         wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
         })
         setTimeout(()=>{
            wx.navigateTo({
               url: '/pages/personal/personal'
            })
         },2000)
      }).catch(err => {
         this.data.isAjax = false
      })
   },
   closeModal () {
      this.setData({
         showModal: false
      })
   },
   getPeas (e) {
      const {index} = e.currentTarget.dataset
      const data = this.data.listData[index]
      this.data.selectIndex = index
      if(data.couponValueType === 1) {
         this.setData({
            showModal: true
         })
      } else if (data.couponValueType === 2) {
         if (app.globalData.isIOS) {
            wx.showModal({
               title: '提示',
               content: '由于相关规范，请联系线下神笔画画站点获取。'
            })
         }else {
            wx.navigateTo({
               url: '/pages/recharge/recharge'
            })
         }
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
      this.getData()
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