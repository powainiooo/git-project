// pages/deposit/list.js
import {getAjax} from '../../utils/api.js'
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
		showHint: true,
	   selectedID: '',
	   listData: []
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
		this.getData()
   },
	doNext () {
   	if (this.data.showHint) {
   		this.setData({
			   showHint: false
		   })
	   } else {
		   if (this.data.selectedID === '') {
			   wx.showToast({
				   title: '请选择充值类型',
				   icon: 'none'
			   });
		   } else {
			   app.globalData.rechargeInfo.id = this.data.selectedID
			   app.globalData.rechargeInfo.price = this.data.selectedPrice
			   wx.navigateTo({
				   url: '/pages/deposit/form'
			   })
		   }
	   }
	},
	getData () {
   	getAjax('card_list').then(res => {
			this.setData({
				listData: res.data
			})
	   })
	},
	doSelect (e) {
		const id = e.currentTarget.dataset.item.id
		const price = e.currentTarget.dataset.item.invest_money
		this.setData({
			selectedID: id,
			selectedPrice: price,
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
