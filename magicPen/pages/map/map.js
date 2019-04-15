// pages/map/map.js
const {getNearbyMerchant} = require('../../utils/api.js')
const regeneratorRuntime = require('../../utils/runtime.js')
const {promisify} = require('../../utils/util.js')
const getLocation = promisify(wx.getLocation)
Page({

   /**
    * 页面的初始数据
    */
   data: {
      longitude: 0,
      latitude: 0,
      markers:[],
      locationData: null,
      storeUrl: [],
      placeholderUrl: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const {locationData, imgSrc} = getApp().globalData
      if(locationData !== null) {
         const {longitude, latitude, mchImgs} = locationData
         const markers = [{
            iconPath: '../../res/index/icon-geo.png',
            id: 0,
            latitude,
            longitude
         }]
         this.setData({
            locationData,
            longitude,
            latitude,
            markers,
            storeUrl: mchImgs,
            placeholderUrl: `${imgSrc}images/tiyandian.png`
         })
      }else {
         this.setData({
            placeholderUrl: `${imgSrc}images/tiyandian.png`
         })
      }

   },
   async getStore() {
      const {longitude, latitude} = await getLocation({
         type: 'gcj02',
      })
      const res = await getNearbyMerchant(`${longitude},${latitude}`)
      this.setData({
         locationData: res.data,
         storeUrl: res.data.mchImgs,
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