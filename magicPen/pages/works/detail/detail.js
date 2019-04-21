// pages/works/detail/detail.js
const {getWorksByTuzhiNu, worksZan, addAttention, cancelAttention} = require('../../../utils/api.js')
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      tuzhiNu:'',
      itemData: null,
      zan:0,
      isLike: false,
      isAttention: false,
      imgSrc: app.globalData.imgSrc
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.data.tuzhiNu = options.id || '22011553861094'
      this.getData()
   },
   getData () {
      getWorksByTuzhiNu({tuzhiNu: this.data.tuzhiNu}).then(res => {
         this.setData({
            itemData: res.data,
            zan: res.data.zan
         })
      })
   },
   doThumbup () {
      worksZan(this.data.tuzhiNu).then(res => {
         let zan = this.data.zan
         if(res.code === 0) {
            zan += 1
         }
         this.setData({
            zan,
            isLike: true
         })
      })
   },
   doAttention () {
      if(this.data.isAttention) {
         cancelAttention(this.data.itemData.userId).then(res => {
            this.setData({
               isAttention: false
            })
         })
      }else {
         addAttention(this.data.itemData.userId).then(res => {
            this.setData({
               isAttention: true
            })
         }).catch(err => {
            this.setData({
               isAttention: true
            })
         })
      }
   },
   gotoPerson () {
      wx.navigateTo({
         url: '/pages/works/list/list?userId='+this.data.itemData.userId
      })
   },
   gotoHome () {
      wx.navigateTo({
         url: '/pages/index/index'
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