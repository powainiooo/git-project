// pages/deposit/comsumer.js
import {getAjax} from '../../utils/api.js'
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
	   page: 1,
	   isLoading: true,
	   isLoadOver: false,
	   listData: []
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
	   this.getData()
   },
	getData () {
		getAjax('consumer_detail', {
			page: this.data.page,
			openid: app.globalData.userOpenID
		}).then(res => {
			this.data.isLoading = false
			this.setData({
				listData: this.data.listData.concat(...res.data.list)
			})
			this.data.isLoadOver = this.data.listData.length == res.data.nums
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
		console.log('onReachBottom')
	   if (this.data.isLoadOver) return
	   this.data.page += 1
	   this.getData()
   }
})
