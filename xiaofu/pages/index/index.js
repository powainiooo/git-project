//index.js
//获取应用实例
const app = getApp()
const ajaxSrc = app.globalData.ajaxSrc
const imgSrc = app.globalData.imgSrc
import {getBannerCity, getIndexListData, getIndexDetailData} from '../../utils/api'
const common = require('common')
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
const qMap = new QQMapWX({
   key: 'AH7BZ-VV736-WNUSA-EP35M-3TCOZ-DTBXG'
})
Page({
	data: {
      imgSrc: app.globalData.imgSrc,
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isActivity: false,
      acticityLogo: app.globalData.acticityLogo,
		indexScroll: true,
		isLoading: true,
		selectedDate: '',
		headerBtns: ['menu'],
		headerHeight: 60,
		searchHeight: 612,
		scrollTop: 0,
		addressFixed: false,
		selectedTicketIndex: -1, // 选中票务的下标
		selectedTicketStyles: '', // 选中票务的附加样式
		selectedFold: true, // 选中票务是否折叠
      detailId: 0,
		showBottom: false,
		activityID: '',
		cityID: '',
		citysList: [],
		listData: [],
		bannerUrl: '',
		bannerId: '',
		page: 1,
		keyword: '',
      recTitle: '',
      showSearchTitle: false,
      searchTitle: '',
      isLoadover: false,
      detailData: null,
      detailPage: '',
      drinkParams: [],
      showPassport: false
	},
	onLoad: function (options) {
	   console.log(options)
		const activityID = options.id || ''
		const acticityLogo = options.src || ''
		let cityID = ''
		if (activityID === '') {
			this.getAddressData()
			try {
				cityID = wx.getStorageSync('lastCityID')
			} catch (e) {
				cityID = ''
			}
		}
		this.setData({
			activityID,
         isActivity: activityID !== '',
         acticityLogo,
			cityID
		})
		this.getListData()
      if (!this.data.isActivity) {
         this.getComponentsSize()
      }
	},
   onShow () {
      app.$watch('drinkParams', (val, old) => { // 监听选择的特饮票数
         this.setData({
            drinkParams: val
         })
      })
      app.$watch('showPassport', (val, old) => { // 监听是否显示上传护照照片按钮
         this.setData({
            showPassport: val
         })
      })
   },
	// 获取部分组件的尺寸信息
	getComponentsSize () {
		setTimeout(() => {
			wx.createSelectorQuery().select("#header").boundingClientRect(rect => {
				// console.log(rect)
				this.data.headerHeight = rect.top
			}).exec()
			wx.createSelectorQuery().select("#search").boundingClientRect(rect => {
				// console.log(rect)
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
		   if (this.data.detailPage === 'detail') { // 在详情页
            this.closeDetail()
         } else if (this.data.detailPage === 'calendar') { // 打开了日历页
            const search = this.selectComponent('#search')
            search.hideCalendar()
         } else if (this.data.detailPage === '') { // 打开的搜索页
            if (this.data.showSearchTitle) { // 关闭搜索结果
               this.setData({
                  page: 1,
                  listData: [],
                  headerBtns: ['menu'],
                  showSearchTitle: false,
                  searchTitle: '',
                  keyword: '',
                  selectedDate: '',
               })
               this.getListData()
            }
         }
		} else if (e.detail === 'arrow') {
			const ticket = this.selectComponent("#ticket")
			const footer = this.selectComponent("#footer")
			if (this.data.detailPage === 'buy') {
				ticket.togglePage('detail')
				footer.togglePage('detail')
				this.setData({
					headerBtns: ['share', 'close'],
               detailPage: 'detail'
				})
			} else if (this.data.detailPage === 'drink') {
				ticket.togglePage('buy')
				footer.togglePage('buy')
            this.setData({
               detailPage: 'buy'
            })
			}
		} else if (e.detail === 'poster') {
			this.drawPoster()
		}
   },
	// 打开详情页
	gotoDetail (e) {
      const cate = e.currentTarget.dataset.cate
		if (cate !== 'activity') return
		if (this.data.selectedTicketIndex !== -1) return
		const top = e.currentTarget.offsetTop
		const index = e.currentTarget.dataset.index
		this.data.detailId = e.currentTarget.dataset.id
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
            detailPage: '',
				headerBtns: this.data.showSearchTitle ? ['menu', 'close'] : ['menu']
			})
		}, 600)
	},
	// 获取详情数据
	getDetailData () {
      getIndexDetailData({
         tid: this.data.detailId,
         city: this.data.cityID
      }).then(res => {
         console.log(res.data)
         this.setData({
         	detailData: res.data,
         	detailPage: 'detail',
            selectedTicketStyles: `top: 120rpx; transition-duration: 0s; background-color: #002bb0;`,
         })
      })
	},
	// 首页banner 地址
	getAddressData () {
		getBannerCity().then(res => {
			this.setData({
				citysList: res.data.citys,
				bannerUrl: res.data.cover,
				bannerId: res.data.b_id,
				recTitle: res.data.words,
			})
         this.getLocation()
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
						let cities = self.data.citysList
						let cityID
						// 判断本地地址是否匹配城市列表
						for (let i = 0; i < cities.length; i++) {
							let reg = new RegExp(cities[i].name)
							if (reg.test(city)) {
								cityID = cities[i].id
								break
							}
						}
                  // console.log('city:'+ city)
                  // console.log('cityID:'+ cityID)
                  // cityID = cityID === undefined ? '' : cityID

                  // city = '广州'
                  // cityID = '8'
                  if (cityID === undefined) {
                     cityID = ''
                     self.setData({
                        cityID: ''
                     })
                     self.getListData()
                     wx.setStorage({
                        key: 'lastCityID',
                        data: cityID
                     })
                  }
						if (cityID !== '' && cityID !== self.data.cityID) {
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
					},
               fail (err) {
					   console.log(err)
               }
				})
			}
		})
	},
	// 城市切换
	cityChange (e) {
		this.setData({
			page: 1,
         activityID: '',
         keyword: '',
         selectedDate: '',
			cityID: e.detail,
         isLoadover: false
		})
		wx.setStorage({
			key: 'lastCityID',
			data: e.detail
		})
      this.getListData()
	},
	// 搜索
	doSearch (e) {
      let title = ''
      if (e.detail.keywords !== '') title = e.detail.keywords
      if (e.detail.date !== '') title = e.detail.date
		this.setData({
			page: 1,
         listData: [],
         headerBtns: ['close'],
         showSearchTitle: true,
         searchTitle: title,
			keyword: e.detail.keywords,
			selectedDate: e.detail.date,
         isLoadover: false
		})
		this.getListData()
	},
   // 监听打开关闭日历
   toggleCalendar (e) {
      if (e.detail) {
	      this.setData({
            headerBtns: ['close'],
            detailPage: 'calendar'
         })
      } else {
         console.log(this.data.selectedDate)
         this.setData({
            headerBtns: this.data.selectedDate === '' ? ['menu'] : ['close'],
            detailPage: ''
         })
      }
   },
	// 获取列表数据
	getListData () {
      console.log("page:"+this.data.page)
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
		   if (this.data.page === 1) {
            this.data.listData = []
         }
			this.setData({
				listData: this.data.listData.concat(res.data.list),
				isLoading: false,
            isLoadover: res.data.list.length === 0
			})
		})
	},
   // 加载更多
   touchBottom () {
      console.log("touchBottom")
	   if (this.data.isLoadover) return
	   this.data.page += 1
      this.getListData()
   },
   // 获取详情数据
   getDetailData (tid) {
      getIndexDetailData({
         tid
      }).then(res => {
         this.setData({
            detailData: res.data
         })
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
      const ticket = this.selectComponent("#ticket")
      const params = ticket.getParams()
      const self = this
      wx.setStorage({
         key: 'nameVal',
         data: params.name
      })
      wx.setStorage({
         key: 'phoneVal',
         data: params.mobile
      })
      wx.setStorage({
         key: 'addressVal',
         data: params.address
      })
      wx.setStorage({
         key: 'idnum',
         data: params.idnum
      })
      params.openid = app.globalData.userOpenID
      params.city = app.globalData.city
      params.drinks = this.data.drinkParams
      wx.request({
         url: ajaxSrc + '/create_order',
         data: params,
         success: function (res) {
            if (res.data.status !== 0) {
               wx.showToast({
                  image: '../../res/images/warn.png',
                  title: res.data.msg
               })
            } else {
               let jsapi = res.data.jsapiparam
               let order_num = res.data.order_num
               let tid = res.data.tid
               app.globalData.ticketOrderNum = order_num
               app.globalData.ticketBuyNum = params.nums
               if (res.data.flag === 1) { // 福利票
                  self.doBuySuccess(tid, order_num)
               } else {
                  wx.requestPayment({
                     'timeStamp': jsapi.timeStamp,
                     'nonceStr': jsapi.nonceStr,
                     'package': jsapi.package,
                     'signType': jsapi.signType,
                     'paySign': jsapi.paySign,
                     'success' (res) {
                        console.log(res)
                        wx.showToast({
                           title: '支付成功'
                        })
                        self.doBuySuccess(tid, order_num)
                     },
                     'fail': function (res) {
                        wx.showToast({
                           image: '../../res/images/warn.png',
                           title: '支付失败'
                        })
                     }
                  })
               }
            }
         },
         fail () {
            wx.showModal({
               title: '购买失败，请重试',
               success () {
                  this.doPay()
               }
            })
         }
      })
   },
   doBuySuccess (tid, orderNum) {
      let self = this
      wx.request({
         url: ajaxSrc + '/pay_success',
         data: {
            tid,
            order_num: orderNum
         },
         success: res => {
            wx.navigateTo({
               url: '/pages/result/result?page=ticketSuc'
            })
         },
         fail () {
            wx.reLaunch({
               url: '/pages/error/error'
            })
         }
      })
   },
   // 生成海报
   drawPoster () {
      let poster = this.data.detailData.info.poster
      wx.showLoading({
         title: '生成中'
      })

      wx.downloadFile({
         url: imgSrc + poster,
         success (res) {
            if (res.statusCode === 200) {
               wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success (res2) {
                     console.log(res2)
                     wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                     })
                  },
                  fail (err) {
                     wx.showToast({
                        title: '保存失败',
                        duration: 2000
                     })
                  }
               })
            } else {
               wx.showToast({
                  title: '保存失败',
                  duration: 2000
               })
            }
         }
      })
   },
   // 打开购买页的身份证上传
   openUploadFile () {
      const ticket = this.selectComponent("#ticket")
      const buy = ticket.selectComponent("#buy")
      buy.doUpload()
   },
   // 用户点击右上角分享
   onShareAppMessage: function () {
      let title
      if (this.data.detailData.info.activity === '') {
         title = this.data.detailData.info.goods_name
      } else {
         title = this.data.detailData.info.goods_name + ' | ' + this.data.detailData.info.activity
      }
      return {
         title: title,
         imageUrl: imgSrc + this.data.detailData.info.share_logo,
         path: 'pages/index/detail?id=' + this.data.detailData.info.id
      }
   }
})
