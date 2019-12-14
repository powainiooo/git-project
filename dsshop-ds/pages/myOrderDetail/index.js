// pages/myOrderDetail/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
const api = require('../../utils/api.js');
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrl: imgUrl,
		www: urlPath,
		address: {},
		goods_list: [],
		info: {},
		fukuanBool: true,
		title: '', // 页面标题
	},
	// 支付
	pay: function(data,obj) {
		var that = this;
		tt.requestPayment({
			'timeStamp': data.timeStamp,
			'nonceStr': data.nonceStr,
			'package': data.package,
			'signType': data.signType,
			'paySign': data.paySign,
			'success': (res) => {
				tt.showToast({
					title: '支付成功',
					icon: 'success',
					duration: 1500
				})
				setTimeout(() => {
					if(obj.id && obj.type == 4){
						tt.redirectTo({
							url: '../paySuccess/index?id='+obj.id,
						})
						return
					}
					this.ajaxData()
				}, 1000)
				this.setData({
					fukuanBool: true
				})
			},
			'fail': (res) => {
				tt.showModal({
					title: '提示',
					content: '支付失败，是否重新发起支付？',
					success: (res) => {
						if (res.confirm) {
							//点击了确定，重新发起支付
							that.pay(data,obj);
						} else {
							console.log('支付失败，是否重新发起支付？', this.data.fukuanBool)
							this.setData({
								fukuanBool: true
							})
						}
					}
				})
			}
		})
	},
	//付款
	fukuan: function(e) {
		if (!this.data.fukuanBool) return false;
		this.setData({
			fukuanBool: false,
		}, () => {
			var id = e.currentTarget.dataset.oid;
			var url = urlPath + 'api/hwsc/again_pay'
			var obj = {
				id: id,
				type: this.data.info.activity_type
			}
			appRequest({
				url: url,
				data: { id: id },
				success: res => {
					var data = res.data.data;
					this.pay(data,obj)
				},
				fail: res => {
					this.setData({
						fukuanBool: true
					})
				},
			})
		})

	},
	//自动取消订单
	autoCancel: function(e) {
		//console.log(122, e);

		//var id = e.detail.id;
		var id = e.currentTarget.dataset.oid;
		//console.log(122, id);
		var url = urlPath + 'api/hwsc/order_cancle'
		//return false;
		appRequest({
			url: url,
			data: { id: id },
			success: res => {
				this.ajaxData()
			},
		})
	},
	//申请退款
	shenqingtuikuanTap: function(e) {
		var id = e.currentTarget.dataset.id;
		tt.showModal({
			title: '提示',
			content: '是否申请退款？',
			success: res => {
				if (res.confirm) {
					tt.showLoading({
						title: '正在申请退款',
					})
					var url = urlPath + 'api/hwsc/apply_tk'
					appRequest({
						url: url,
						data: { id: id },
						success: res => {
							tt.showToast({
								title: '申请退款成功',
								icon: 'success'
							})
							tt.redirectTo({
								url: '/pages/myOrder/index',
							})
						},
					})
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},
	//取消订单
	bindCancel: function(e) {
		var id = e.currentTarget.dataset.id;
		tt.showModal({
			title: '提示',
			content: '是否取消订单？',
			success: res => {
				if (res.confirm) {
					tt.showLoading({
						title: '正在取消',
					})
					var url = urlPath + 'api/hwsc/order_cancle'
					appRequest({
						url: url,
						data: {
							id: id
						},
						success: res => {
							tt.showToast({
								title: '取消成功',
								icon: 'success'
							})
							this.ajaxData()
						},
					})
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})


	},
	//删除订单
	bindDel: function(e) {
		var id = e.currentTarget.dataset.id;
		tt.showModal({
			title: '提示',
			content: '是否删除订单？',
			success: res => {
				if (res.confirm) {
					tt.showLoading({
						title: '正在删除',
					})
					var url = urlPath + 'api/hwsc/del_order'
					appRequest({
						url: url,
						data: {
							id: id
						},
						success: res => {
							tt.showToast({
								title: '删除成功',
								icon: 'success'
							})
							tt.navigateBack()
						},
					})
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})
	},

	//确认收货
	bindConfirm: function(e) {
		var id = e.currentTarget.dataset.id;
		tt.showModal({
			title: '提示',
			content: '是否确认收货？',
			success: res => {
				if (res.confirm) {
					tt.showLoading({
						title: '正在确认收货',
					})
					var url = urlPath + 'api/hwsc/order_confirm'
					appRequest({
						url: url,
						data: {
							id: id
						},
						success: res => {
							tt.showToast({
								title: '确认收货成功',
								icon: 'success'
							})
							this.ajaxData()
						},
					})
					console.log('用户点击确定')
				} else if (res.cancel) {
					console.log('用户点击取消')
				}
			}
		})


	},
	ajaxData: function() {
		var url = urlPath + 'api/hwsc/order_list_detail'
		appRequest({
			url: url,
			data: {
				id: this.data.id
			},
			success: res => {
				tt.hideLoading()
				this.setData({
					address: res.data.data.address,
					goods_list: res.data.data.goods_list,
					info: res.data.data.info,
				})
				switch (this.data.info.group_buy_success) {
					case '-1':
						this.setData({
							title:'拼单失败'
						})
						break;
					case '0':
						this.setData({
							title:'拼单进行中'
						})
						break;
					case '1':
						this.setData({
							title:'拼单成功'
						})
						break;
				}
			},
		})
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		this.setData({
			id: options.id,
			isCN: tt.getStorageSync('isCN')
		})
		tt.showLoading({
			title: '正在加载',
		})
		this.ajaxData()
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
