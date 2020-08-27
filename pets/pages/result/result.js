// pages/result/result.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		result:'',
		opera:''
	},
	doNext(){
		if (this.data.opera === 'buy') {
			wx.reLaunch({
				url: '/pages/order/detail?orderNum='+app.globalData.orderNum
			})
		} else if (this.data.opera === 'recharge') {
			wx.reLaunch({
				url: '/pages/order/list'
			})
		}
	},
	gotoIndex(){
		wx.reLaunch({
			url: '/pages/index/index'
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let result = options.result || 'suc';
		let opera = options.opera || 'buy';
		this.setData({
			result,
			opera
		})
	},
	onGotUserInfo(){

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

	}
})
