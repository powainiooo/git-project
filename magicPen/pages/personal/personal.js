// pages/personal/personal.js
const {getUserInterspaceInfo, getUserAsset} = require('../../utils/api.js')
const userFans = wx.getStorageSync('userFans')
import QRCode from '../../utils/weapp-qrcode'
Page({

   /**
    * 页面的初始数据
    */
   data: {
      avatarUrl: '',
      nickName: '',
      grade: 0,
      userIq: 0,
      userFans: 0,
      userFansTxt: userFans,
      fansDis: 0,
      showQrcodeFrame: false,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getPersonInfo()
   },
   getPersonInfo() {
      getUserInterspaceInfo({userId: 0}).then(res => {
         const {nick, avatarUrl, fans, grade, userId} = res.data
         this.setData({
            nickName: nick,
            avatarUrl,
            grade,
            userFans: fans
         })
         this.initQrcode(userId)
         if (typeof userFans === 'string') {
            this.setData({
               userFansTxt: fans
            })
         } else if (typeof userFans === 'number') {
            this.setFansMove()
         }
         wx.setStorage({
            key:'userFans',
            data: fans
         })
      })
      getUserAsset().then(res=>{
         this.setData({
            userIq: res.data
         })
      })
   },
   linkTo(e) {
      const url = e.currentTarget.dataset.url
      wx.navigateTo({url})
   },
   setFansMove () {
      const dis = this.data.userFans - userFans
      if (dis > 0) {
         this.setData({
            fansDis: dis
         })
         setTimeout(()=>{
            this.setData({
               userFansTxt: this.data.userFans
            })
         }, 2200)
      } else {
         this.setData({
            userFansTxt: this.data.userFans
         })
      }
   },
   initQrcode (userId) {
      const qrcode = new QRCode('canvas', {
         text: `userId:${userId}`,
         width: 250,
         height: 250,
         colorDark: "#000000",
         colorLight: "#ffffff",
         correctLevel: QRCode.CorrectLevel.H,
      });
   },
   openQrcode () {
      this.setData({
         showQrcodeFrame: true
      })
   },
   closeQrcode () {
      this.setData({
         showQrcodeFrame: false
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