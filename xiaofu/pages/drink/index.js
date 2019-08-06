// pages/drink/index.js
const app = getApp()
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js')
const qMap = new QQMapWX({
   key: 'AH7BZ-VV736-WNUSA-EP35M-3TCOZ-DTBXG'
})
Page({

   /**
   * 页面的初始数据
   */
   data: {
      addressList: [],
      addressIndex: 0,
      citiesLeft: 0,
      cityItemWidth: 0,
      listData: [],
      loadHint: '',
      page: 1,
      keywords: '',
      city: '',
      bannerImg: '',
      imgSrc: app.globalData.imgSrc
   },
   gotoDetail (e) {
      let id = e.currentTarget.dataset.id
      wx.navigateTo({
         url: '/pages/drink/detail?id=' + id
      })
   },
   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      this.getAddressData()
      let cityID = 0
      try {
         cityID = wx.getStorageSync('lastCityID')
      } catch (e) {
         cityID = 0
      }
      this.setData({
         city: cityID
      })
      this.getListData()

      let self = this
      wx.getSystemInfo({
         success: function (res) {
            self.setData({
               cityItemWidth: Math.floor(res.windowWidth / 5)
            })
         }
      })
   },
   // 获取列表数据
   getListData () {
      let self = this
      if (self.data.showTicketDetail) return
      if (self.data.loadHint !== '') return
      self.setData({
         loadHint: 'loading'
      })
      wx.showNavigationBarLoading()
      wx.request({
         url: app.globalData.ajaxSrc + '/drink_list', // 仅为示例，并非真实的接口地址
         data: {
            keyword: self.data.keywords,
            page: self.data.page,
            city: self.data.city
         },
         success: function (res) {
            let list = res.data.data.list
            let hint = ''
            if (self.data.page == 1) {
               if (list.length < 10 && list.length > 0) {
                  hint = 'end'
               } else if (list.length === 0) {
                  hint = 'empty'
               }
               self.setData({
                  loadHint: hint,
                  listData: list
               })
            } else {
               hint = list.length < 10 ? 'end' : ''
               self.setData({
                  loadHint: hint,
                  listData: self.data.listData.concat(list)
               })
            }
            wx.hideNavigationBarLoading()
         },
         fail () {
            wx.navigateTo({
               url: '/pages/error/error'
            })
         }
      })
   },
   // 获取地址、banner
   getAddressData () {
      let self = this
      wx.request({
         url: app.globalData.ajaxSrc + '/city_banner',
         success: function (res) {
            let city = res.data.data.citys
            let index = 0
            for (let i = 0; i < city.length; i++) {
               if (city[i].id == self.data.city) {
                  index = i + 1
               }
            }
            self.setData({
               citiesLeft: self.data.cityItemWidth * (index - 2),
               bannerImg: res.data.data.drink,
               addressList: city,
               addressIndex: index
            })
            self.getLocation()
         },
         fail () {
            wx.navigateTo({
               url: '/pages/error/error'
            })
         }
      })
   },
   // 获取定位
   getLocation () {
      let self = this
      let lastGetCityTime = wx.getStorageSync('lastGetCityTime')
      let now = new Date().getTime()
      if (lastGetCityTime === '' || now > lastGetCityTime + 24 * 60 * 60 * 1000) {
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
                  // latitude: 22.678323,
                  // longitude: 114.36091
               },
               success: function (res) {
                  let city = res.result.address_component.city
                  let cities = self.data.addressList
                  let cityID
                  let index = -1
                  // 判断本地地址是否匹配城市列表
                  for (let i = 0; i < cities.length; i++) {
                     let reg = new RegExp(cities[i].name)
                     if (reg.test(city)) {
                        cityID = cities[i].id
                        index = i + 1
                        break
                     }
                  }
                  if (index !== -1 && cityID != self.data.city) {
                     wx.showModal({
                        content: '是否切换到 ' + city,
                        success: function (res) {
                           if (res.confirm) { // 点击确定
                              self.setData({
                                 loadHint: '',
                                 citiesLeft: self.data.cityItemWidth * (index - 2),
                                 addressIndex: index,
                                 city: cityID
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
   // 切换城市
   changeCity (e) {
      let id = e.currentTarget.dataset.id
      let index = e.currentTarget.dataset.index
      this.setData({
         citiesLeft: this.data.cityItemWidth * (index - 2),
         addressIndex: index,
         city: id,
         loadHint: ''
      })
      this.getListData()
      wx.setStorage({
         key: 'lastCityID',
         data: id
      })
   },
   // 搜索
   doSearch (e) {
      this.data.keywords = e.detail
      this.data.page = 1
      this.data.loadHint = ''
      this.getListData()
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
