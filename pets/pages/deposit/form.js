// pages/information/information.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		sexArr:[
			{name: '男', value: '1'},
			{name: '女', value: '2'}
		],
		selectedSex: null,
		name:'',
		petsname:'',
		mobile:'',
		price:''
	},
	bindSexChange(e){
		let sex = this.data.sexArr[e.detail.value];
		this.setData({
			selectedSex: sex
		})
	},
	inputChange(e){
		let name = e.currentTarget.dataset.name;
		let value = e.detail.value;
		this.data[name] = value;
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let g = app.globalData;
		this.setData({
			price:g.rechargeInfo.price
		})
		const petsname = wx.getStorageSync('petsname')
		const petsmobile = wx.getStorageSync('petsmobile')
		let petssex = wx.getStorageSync('humansex')
		petssex = petssex === '' || petssex === undefined ? null : petssex
		this.setData({
			name: petsname,
			mobile: petsmobile,
			selectedSex: petssex,
		})
	},
	doNext(){
		console.log('doNext')
		if (app.globalData.userInfo === null) {
			wx.navigateTo({
				url: '/pages/index/index?result=auth'
			})
			return
		}
		if(this.data.name == ''){
			wx.showToast({
				title: '请输入姓名',
				icon: 'none'
			});
			return;
		}
		if(this.data.mobile == ''){
			wx.showToast({
				title: '请输入手机号',
				icon: 'none'
			});
			return;
		}
		if(this.data.selectedSex === null){
			wx.showToast({
				title: '请选择性别',
				icon: 'none'
			});
			return;
		}

		wx.setStorageSync('petsname', this.data.name)
		wx.setStorageSync('petsmobile', this.data.mobile)
		wx.setStorageSync('humansex', this.data.selectedSex)
		wx.showNavigationBarLoading();
		let obj = {},gb = app.globalData;
		obj.openid = gb.userOpenID;
		obj.card_id = gb.rechargeInfo.id;
		obj.sex = this.data.selectedSex.value;
		obj.username = this.data.name;
		obj.mobile = this.data.mobile;
		wx.request({
			url:app.globalData.ajaxSrc+"invest_order",
			data:obj,
			success:res=>{
				if (res.data.status === 0) {
					let jsapi = res.data.jsapiparam;
					let order_num = res.data.order_num;
					wx.requestPayment({
						'timeStamp': jsapi.timeStamp,
						'nonceStr': jsapi.nonceStr,
						'package': jsapi.package,
						'signType': jsapi.signType,
						'paySign': jsapi.paySign,
						'success':res=>{
							wx.showToast({
								title:'支付成功'
							});
							wx.reLaunch({
								url: '/pages/result/result?result=suc&opera=recharge'
							});
						},
						'fail':function(res){
							wx.showToast({
								image:'../../res/img/warn.png',
								title:'支付失败'
							});
							wx.hideNavigationBarLoading();
						}
					})
				} else {
					wx.showToast({
						image:'../../res/img/warn.png',
						title:res.data.msg
					});
				}
			}
		});
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
