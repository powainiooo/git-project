// pages/personal/personal.js
const {getUserInterspaceInfo, getUserAsset} = require('../../utils/api.js')
let userFans = 0;
let userIq = 0;
import QRCode from '../../utils/weapp-qrcode'
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      avatarUrl: '',
      nickName: '',
      grade: 0,
      userIq: 0,
      userIqTxt: 0,
      userIqDis: 0,
      userFans: 0,
      userFansTxt: 0,
      fansDis: 0,
      showQrcodeFrame: false,
      qrcodeSize: 250,
      isIOS: app.globalData.isIOS,
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      userFans = wx.getStorageSync('userFans')
      userIq = wx.getStorageSync('userIq')
      this.setData({
         userIqTxt: userIq,
         userFansTxt: userFans,
      })
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
            setTimeout(()=>{
               this.setFansMove()
            }, 1500)
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
         if (typeof userIq === 'string') {
            this.setData({
               userIqTxt: res.data
            })
         } else if (typeof userIq === 'number') {
            setTimeout(()=>{
               this.setIqMove()
            }, 1500)
         }
         wx.setStorage({
            key:'userIq',
            data: res.data
         })
      })
   },
   linkTo(e) {
      const url = e.currentTarget.dataset.url
      if (url === '/pages/recharge/recharge') {
         if (this.data.isIOS) {
            wx.showModal({
               title: '提示',
               content: '由于相关规范，请联系线下神笔画画站点获取。'
            })
         }else {
            wx.navigateTo({url})
         }
      } else {
         wx.navigateTo({url})
      }
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
   setIqMove () {
      const dis = this.data.userIq - userIq
      if (dis > 0) {
         this.setData({
            userIqDis: dis
         })
         setTimeout(()=>{
            this.setData({
               userIqTxt: this.data.userIq
            })
         }, 2200)
      } else {
         this.setData({
            userIqTxt: this.data.userIq
         })
      }
   },
   initQrcode (userId) {
      const res = wx.getSystemInfoSync()
      const size = res.windowWidth * 0.6666
      this.setData({
         qrcodeSize: size
      })
      const qrcode = new QRCode('canvas', {
         text: `userId:${userId}`,
         width: size,
         height: size,
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
      this.getPersonInfo()
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
