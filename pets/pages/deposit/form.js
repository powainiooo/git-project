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
	doNext(){
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
		app.globalData.rechargeInfo.name = this.data.name;
		app.globalData.rechargeInfo.mobile = this.data.mobile;
		app.globalData.rechargeInfo.sex = this.data.selectedSex.value;
		app.globalData.rechargeInfo.sexName = this.data.selectedSex.name;
		wx.setStorageSync('petsname', this.data.name)
		wx.setStorageSync('petsmobile', this.data.mobile)
		wx.setStorageSync('humansex', this.data.selectedSex)
		wx.navigateTo({
			url: '/pages/information/remarks'
		})
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
