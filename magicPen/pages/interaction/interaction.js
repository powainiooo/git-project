// pages/interaction/interaction.js
const {getUserAsset, getFuhuoIqAndZhaohuanIq} = require('../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentKey: 'photo',
      myPeas: 0,
      fuhuoIq: 0,
      zhaohuanIq: 0,
   },
   swiperChange(e) {
      const {currentKey} = e.detail
      this.setData({currentKey})
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      setTimeout(()=>{
         this.getUserAsset()
         this.getFuhuoIqAndZhaohuanIq()
      },2000)
   },
   getUserAsset () {
      getUserAsset().then(res=>{
         this.setData({
            myPeas: res.data
         })
      })
   },
   getFuhuoIqAndZhaohuanIq() {
      getFuhuoIqAndZhaohuanIq().then(res => {
         const {fuhuoIq, zhaohuanIq} = res.data
         this.setData({fuhuoIq, zhaohuanIq})
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