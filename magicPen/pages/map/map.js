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
      placeholderUrl: '',
      imgSrc: '',
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      // this.getStore()
      const {locationData, imgSrc} = getApp().globalData
      this.setData({
         locationData,
         imgSrc
      })
      this.initData()
   },
   async getStore() {
      const {longitude, latitude} = await getLocation({
         type: 'gcj02',
      })
      const res = await getNearbyMerchant(`${longitude},${latitude}`)
      this.setData({
         locationData: res.data,
      })
      this.initData()
   },
   initData () {
      const locationData = this.data.locationData
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
         })
      }
   },
   doGuide () {
      const {longitude, latitude} = this.data.locationData
      wx.openLocation({
         latitude: Number(latitude),
         longitude: Number(longitude),
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
      this.setData({
         placeholderUrl: `${this.data.imgSrc}images/tiyandian.png?${Math.random()}`
      })
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
	onShareAppMessage () {
		return {
			title: '神笔画画',
			path: `/pages/index/index`
		}
	}
})
