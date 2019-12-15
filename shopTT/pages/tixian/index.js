// pages/tixian/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		txAll:'',
		list:[],
		flagArr: ['未审核', '未通过', '通过'],
		page:1,
		bool: false,
	},
	ajaxData: function () {
		if(this.data.bool) return false;
		wx.showLoading({
			title: '正在加载',
		})
		var url = urlPath + 'api/fxpt/tx_detail'
		appRequest({
			url: url,
			data: { page: this.data.page},
			success: res => {
				var info = res.data.data;
				var bool = false;
				if (info.list.length < 10) {
					bool = true;
				}
				this.setData({
					txAll: info.ljtx,
					list: this.data.list.concat(info.list),
					page: this.data.page + 1,
					bool: bool,
				})
				console.log(res)
			},
			complete: res => {
				wx.hideLoading()
			}
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.ajaxData()
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
		this.ajaxData()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})
