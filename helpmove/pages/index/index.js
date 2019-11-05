//index.js
//获取应用实例
const app = getApp()
const detailData = require('../../res/mock/detail')
console.log(detailData.data)
Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		showDate: true,
		selectedDate: '2019-05-10',
		headerBtns: ['menu'],
		headerHeight: 60,
		searchHeight: 612,
		scrollTop: 0,
		addressFixed: false,
		selectedTicketIndex: -1, // 选中票务的下标
		selectedTicketStyles: '', // 选中票务的附加样式
		selectedFold: true, // 选中票务是否折叠
		detailData: null,
		showBottom: false
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function () {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse){
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	onShow () {
		this.getComponentsSize()
	},
	toggleShow () {
		this.setData({
			showDate: !this.data.showDate
		})
	},
	getUserInfo: function(e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	getComponentsSize () { // 获取部分组件的尺寸信息
		setTimeout(() => {
			wx.createSelectorQuery().select("#header").boundingClientRect(rect => {
				// console.log(rect)
				this.data.headerHeight = rect.top
			}).exec()
			wx.createSelectorQuery().select("#search").boundingClientRect(rect => {
				console.log(rect)
				this.data.searchHeight = rect.height
			}).exec()
		}, 1000)
	},
	containerScroll (e) {
		this.data.scrollTop = e.detail.scrollTop
		this.setData({
			addressFixed: e.detail.scrollTop >= this.data.searchHeight
		})
	},
	headBtn (e) {
		console.log(e)
		if (e.detail === 'close') {
			this.closeDetail()
		} else if (e.detail === 'arrow') {
			const ticket = this.selectComponent("#ticket")
			ticket.togglePage('detail')
			const footer = this.selectComponent("#footer")
			footer.togglePage('detail')
			this.setData({
				headerBtns: ['share', 'close']
			})
		}
	},
	gotoDetail (e) {
		console.log(e)
		if (this.data.selectedTicketIndex !== -1) return
		const top = e.currentTarget.offsetTop
		const index = e.currentTarget.dataset.index
		this.data.lastTop = top - this.data.scrollTop
		this.setData({
			selectedTicketIndex: index,
			selectedTicketStyles: `top: ${this.data.lastTop}px`
		})
		setTimeout(() => {
			this.setData({
				selectedFold: false,
				selectedTicketStyles: `top: 120rpx; transition-duration: 0.5s;`,
				headerBtns: ['share', 'close']
			})
		}, 50)
		setTimeout(() => {
			this.getDetailData()
		}, 600)
	},
	closeDetail () {
		this.setData({
			selectedFold: true,
			detailData: null,
			selectedTicketStyles: `top: ${this.data.lastTop}px; transform: scale(0.875); transition-duration: 0.5s;`
		})
		setTimeout(() => {
			this.setData({
				selectedTicketIndex: -1,
				headerBtns: ['menu']
			})
		}, 500)
	},
	getDetailData () {
		this.setData({
			detailData: detailData.data
		})
	},
	btnFunc (e) {
		if (e.detail === 'intoBuy') {
			const ticket = this.selectComponent("#ticket")
			ticket.togglePage('buy')
			this.setData({
				headerBtns: ['share', 'arrow']
			})
		}
	}
})
