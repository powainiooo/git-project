// pages/step1/step1.js
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
	   layoutList: ['一居室', '二居室', '三居室'],
	   layoutIndex: -1,
	   buildingList: [1, 2, 3, 4, 5, 6, 7, 8],
	   outBuildIndex: -1,
	   inBuildIndex: -1,
	   phone: app.globalData.phone
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
	selectChange (e) {
   	let obj = {}
   	obj[e.currentTarget.dataset.key] = e.detail.value
		this.setData(obj)
	},
	makePhone () {
		wx.makePhoneCall({
			phoneNumber: this.data.phone
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
