//index.js
//获取应用实例
const app = getApp()
const detailData = require('../../res/mock/detail')
import {getBannerCity, getIndexListData} from '../../utils/api'
Page({
	data: {
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		indexScroll: true,
		isLoading: true,
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
		detailPage: '',
		showBottom: false,
		activityID: '',
		cityID: '',
		citysList: [],
		listData: [],
		bannerUrl: '',
		bannerId: '',
		page: 1,
		keyword: '',
	},
	onLoad: function (options) {
		const activityID = options.id || ''
		let cityID = 0
		if (activityID === '') {
			this.getAddressData()
			try {
				cityID = wx.getStorageSync('lastCityID')
			} catch (e) {
				cityID = 0
			}
		}
		this.setData({
			activityID,
			cityID
		})
		this.getListData()
	},
	onShow () {
		this.getComponentsSize()
	},
	// 获取部分组件的尺寸信息
	getComponentsSize () {
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
	// 监听页面滑动
	containerScroll (e) {
		this.data.scrollTop = e.detail.scrollTop
		this.setData({
			addressFixed: e.detail.scrollTop >= this.data.searchHeight
		})
	},
	// 响应顶部按钮点击
	headBtn (e) {
		if (e.detail === 'close') {
			this.closeDetail()
		} else if (e.detail === 'arrow') {
			const ticket = this.selectComponent("#ticket")
			const footer = this.selectComponent("#footer")
			if (this.data.detailPage === 'buy') {
				ticket.togglePage('detail')
				footer.togglePage('detail')
				this.setData({
					headerBtns: ['share', 'close']
				})
			} else if (this.data.detailPage === 'drink') {
				ticket.togglePage('buy')
				footer.togglePage('buy')
			}
		} else if (e.detail === 'poster') {
			this.drawPoster()
		}
   },
	// 打开详情页
	gotoDetail (e) {
		if (this.data.selectedTicketIndex !== -1) return
		const top = e.currentTarget.offsetTop
		const index = e.currentTarget.dataset.index
		this.data.lastTop = top - this.data.scrollTop
		this.setData({
			selectedTicketIndex: index,
			selectedTicketStyles: `top: ${this.data.lastTop}px;`
		})
		setTimeout(() => {
			this.setData({
				selectedFold: false,
				selectedTicketStyles: `top: 120rpx; transition-duration: 0.5s; background-color: #f3f3f3;`,
				headerBtns: ['share', 'close']
			})
		}, 50)
		setTimeout(() => {
			this.getDetailData()
		}, 600)
	},
	// 关闭详情页
	closeDetail () {
		this.setData({
			selectedFold: true,
			detailData: null,
			selectedTicketStyles: `top: ${this.data.lastTop}px; transform: scale(0.875); transition-duration: 0.5s; background-color: transparent;`
		})
		setTimeout(() => {
			this.setData({
				selectedTicketIndex: -1,
				headerBtns: ['menu']
			})
		}, 600)
	},
	// 获取详情数据
	getDetailData () {
		this.setData({
			detailData: detailData.data,
			detailPage: 'detail'
		})
	},
	// 响应底部按钮点击
	footerBtnFunc (e) {
		const ticket = this.selectComponent("#ticket")
		if (e.detail === 'intoBuy') {
			ticket.togglePage('buy')
			this.setData({
				headerBtns: ['share', 'arrow'],
				detailPage: 'buy'
			})
		} else if (e.detail === 'doPay') {
			this.doPay()
		} else if (e.detail === 'intoDrink') {
			ticket.togglePage('drink')
			this.setData({
				headerBtns: ['share', 'arrow'],
				detailPage: 'drink'
			})
		}
	},
	// 付款
	doPay () { // 付款

	},
	// 首页banner 地址
	getAddressData () {
		getBannerCity().then(res => {
			this.setData({
				citysList: res.data.citys,
				bannerUrl: res.data.cover,
				bannerId: res.data.b_id,
			})
		})
	},
	// 获取定位
	getLocation () {
		let self = this
		let lastGetCityTime = wx.getStorageSync('lastGetCityTime')
		let now = new Date().getTime()
		if (lastGetCityTime === '' || lastGetCityTime === null || now > lastGetCityTime + 24 * 60 * 60 * 1000) {
			wx.setStorageSync('lastGetCityTime', now)
		} else {
			return
		}
		wx.getLocation({
			type: 'wgs84',
			success: function (res) {
				qMap.reverseGeocoder({
					location: {
						latitude: res.latitude,
						longitude: res.longitude
					},
					success: function (res) {
						let city = res.result.address_component.city
						app.globalData.city = city
						let cities = self.data.addressList
						let cityID
						// 判断本地地址是否匹配城市列表
						for (let i = 0; i < cities.length; i++) {
							let reg = new RegExp(cities[i].name)
							if (reg.test(city)) {
								cityID = cities[i].id
								break
							}
						}
						if (cityID != self.data.cityID) {
							wx.showModal({
								content: '是否切换到 ' + city,
								success: function (res) {
									if (res.confirm) { // 点击确定
										self.setData({
											cityID
										})
										self.getListData()
										wx.setStorage({
											key: 'lastCityID',
											data: cityID
										})
									}
								}
							})
						}
					}
				})
			}
		})
	},
	// 城市切换
	cityChange (e) {
		this.setData({
			page: 1,
			cityID: e.detail
		})
		wx.setStorage({
			key: 'lastCityID',
			data: e.detail
		})
	},
	// 搜索
	doSearch (e) {
		this.setData({
			page: 1,
			keyword: e.detail.keyword,
			selectedDate: e.detail.date,
		})
		this.getListData()
	},
	// 获取列表数据
	getListData () {
		this.setData({
			isLoading: true
		})
		getIndexListData({
			keyword: this.data.keyword,
			date: this.data.selectedDate,
			page: this.data.page,
			city: this.data.cityID,
			mid: this.data.activityID
		}).then(res => {
			this.setData({
				listData: this.data.listData.concat(res.data.list),
				isLoading: false
			})
		})
	},
	// 生成海报
	drawPoster () {
		let poster = this.data.detailData.info.poster
		let imgSrc = app.globalData.imgSrc
		wx.showLoading({
			title: '生成中'
		})

		wx.downloadFile({
			url: imgSrc + poster,
			success (res) {
				if (res.statusCode === 200) {
					wx.saveImageToPhotosAlbum({
						filePath: res.tempFilePath,
						success () {
							wx.showToast({
								title: '保存成功',
								icon: 'success',
								duration: 2000
							})
						}
					})
				}
			}
		})
	},
	// 分享
	onShareAppMessage (res) {
		let title
		if (this.data.detailData.info.activity === '') {
			title = this.data.detailData.info.goods_name
		} else {
			title = this.data.detailData.info.goods_name + ' | ' + this.data.detailData.info.activity
		}
		return {
			title: title,
			imageUrl: this.data.imgSrc + this.data.detailData.info.share_logo,
			path: 'pages/index/detail?id=' + this.data.detailData.info.id
		}
	}
})
