//index.js
//获取应用实例
const app = getApp()
Page({
	data: {
		name: '',
		phone: ''
	},
	onLoad: function (options) {
		const name = wx.getStorageSync('nameVal')
		const phone = wx.getStorageSync('phoneVal')
		this.setData({
			name: name === undefined || name === null ? '' : name,
			phone: phone === undefined || phone === null ? '' : phone
		})
	},
	bindKeyInput (e) {
		let key = e.target.dataset.key
		let obj = {}
		obj[key] = e.detail.value
		this.setData(obj)
	}
})
