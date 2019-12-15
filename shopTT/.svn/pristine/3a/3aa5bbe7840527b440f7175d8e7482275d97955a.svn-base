// pages/product/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		www:www,
		imgUrl: imgUrl,
		page:1,
		isNoPage:false,
		idx:1,
		isNoReturn:false,
		jg_gd:0,
	},

	// 语言切换
	SwitchLag: function (e) {
		var Lag = e.detail.Lag;
		this.setData({
			isCN: Lag
		})
	},

	//排序
	sortTap:function(e){
		var idx = e.currentTarget.dataset.idx;
		if (idx == 1){
			var data = {new:'new'};
			this.paixu(data);
		}
		if (idx == 2) {
			var data = { xl: 'xl' };
			this.paixu(data);
		}
		if (idx == 3) {
			if (this.data.jg_gd == 0){
				var jg_gd = 1;
			}
			if (this.data.jg_gd == 1) {
				var jg_gd = 2;
			}
			if (this.data.jg_gd == 2) {
				var jg_gd = 1;
			}
			var data = { jg: 'jg', jg_gd: jg_gd};
			this.setData({
				jg_gd: jg_gd,
				data: data
			})
			this.paixu(data);
		}
		this.setData({
			idx:idx,
			type:data,
		})
	},

	//排序方法
	paixu:function(data){
		var id = this.data.id;
		let link = { method: 'cate_list', canshu: '&id=' + id + '&page=' + Number(this.data.page) };
		let logic = (ret) => {
			this.setData({
				list: ret.result,
				isNoReturn: ret.result.length > 0 ? false : true
			})
		}
		api.post(this, link, data, logic);
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		console.log(55,options);
		if (options && options.id != ''){
			let link = { method: 'cate_list', canshu: '&id=' + options.id + '&page=' + Number(this.data.page)};
			let logic = (ret) => {
				this.setData({
					id: options.id,
					list: ret.result,
					isNoReturn: ret.result.length > 0 ? false : true,
					isCN: wx.getStorageSync('isCN')
				})
			}
			api.post(this, link, {}, logic);
		}
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
		console.log(Number(this.data.page) + 1)
		var page = Number(this.data.page) + 1;
		let link = { method: 'cate_list', canshu: '&id=' + this.data.id + '&page=' + page };
		let data = this.data.data;
		let logic = (ret) => {
			if (ret.result.length > 0){
				var list = this.data.list;
				list = list.concat(ret.result);
				this.setData({
					list: list,
					isNoPage:false,
					page: page
				})
			}else{
				this.setData({
					isNoPage:true
				})
			}
		}
		api.post(this, link, data, logic);
	},
})
