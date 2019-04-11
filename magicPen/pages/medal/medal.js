// pages/medal/medal.js
const {getMedalList, getUserInterspaceInfo, takeState} = require('../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      userId: 0,
      showHint: false,
      medalList: [],
      selectData: {},
      isUser: true,
      hideState: 'close'
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.data.userId = options.userId || 0
      this.getPersonInfo()
      this.getData()
      this.setData({
         isUser: this.data.userId === 0
      })
   },
   getData() {
      getMedalList({userId: this.data.userId}).then(res => {
         this.setData({
            medalList: res.data
         })
      })
   },
   getPersonInfo() {
      getUserInterspaceInfo({userId: this.data.userId}).then(res => {
         const {nick, avatarUrl} = res.data
         this.setData({
            nick,
            avatarUrl,
         })
      })
   },
   selectMedal (e) {
      // if (!this.data.isUser) return
      const {item} = e.currentTarget.dataset
      this.setData({
         showHint: true,
         selectData: item
      })
   },
   closeHint () {
      this.setData({
         showHint: false,
      })
      if(this.data.hideState === 'getMedal') {
         this.getData()
      }
   },
   getMedal (e) {
      if (!this.data.isUser) return
      const {medalId, takeType} = e.detail
      this.data.hideState = 'getMedal'
      this.takeState(medalId, takeType)
   },
   getGift (e) {
      if (!this.data.isUser) return
      const {item} = e.currentTarget.dataset
      if (item.takeMedalState === 1 && item.takeGiftState === 2) {
         this.data.hideState = 'close'
         this.takeState(item.medalId, 2)
      }
   },
   takeState (id, type) {
      takeState(`medalId=${id}&takeType=${type}`).then(res => {
         wx.showToast({
            title: '领取成功',
            icon: 'success',
            duration: 2000
         })
         if(this.data.hideState === 'close') {
            this.closeHint()
            this.getData()
         }
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