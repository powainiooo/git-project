//index.js
//获取应用实例
const app = getApp()
const {getSlideList, getNearbyMerchant, getChoicenessWorks, getAnnoun} = require('../../utils/api.js')
const useGuide = wx.getStorageSync('useGuide')
// import regeneratorRuntime from '../../utils/runtime.js'
const regeneratorRuntime = require('../../utils/runtime.js')
const {promisify} = require('../../utils/util.js')
const getLocation = promisify(wx.getLocation)
Page({
   data: {
      useGuide: typeof useGuide === 'string' ? false : true,
      // useGuide: false,
      guideStep: typeof useGuide === 'string' ? 1 : 'end',
      userInfo: {},
      hasUserInfo: app.globalData.userInfo !== null,
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      bannerList: [],
      worksList: [],
      isWorksLIstEnd: false,
      isLoadingList: false,
      locationData: {},
      pageSize: 10,
      pageNo: 1,
      msgList: []
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
         app.sKeyReadyCallback = res => {
            this.getStore()
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
      this.getBannerData()
      this.getWorksData()
      this.getMsgData()
      const sKey = wx.getStorageSync('sKey')
      if(sKey !== ''){
         app.globalData.sKey = sKey
         this.getStore()
      }
   },
   getUserInfo: function(e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
         userInfo: e.detail.userInfo,
         hasUserInfo: true
      })
   },
   getBannerData() {
      getSlideList().then(res => {
         const bannerList = res.data
         this.setData({bannerList})
      })
   },
   async getStore() {
      const {longitude, latitude} = await getLocation({
         type: 'gcj02',
      })
      console.log(longitude,latitude)
      const res = await getNearbyMerchant(`${longitude},${latitude}`)
      app.globalData.locationData = res.data
      this.setData({
         locationData: res.data
      })
   },
   getWorksData() {
      this.setData({
         isLoadingList: true
      })
      getChoicenessWorks({
         startPage: this.data.pageNo,
         pageSize: this.data.pageSize
      }).then(res => {
         const list = res.data.pageData
         this.setData({
            isWorksLIstEnd: list.length < this.data.pageSize,
            worksList: this.data.worksList.concat(list),
            isLoadingList: false
         })
      })
   },
   getMsgData () {
      getAnnoun().then(res => {
         this.setData({
            msgList: res.data
         })
      })
   },
   pageNoAdd() {
      this.data.pageNo ++
      this.getWorksData()
   },
   changeStep(e) {
      const guideStep = e.detail
      this.setData({guideStep})
      if(guideStep === 'end'){
         this.setData({
            useGuide: true
         })
         wx.setStorage({
            key:'useGuide',
            data: true
         })
      }
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      this.getBannerData()
      this.getWorksData()
      this.getStore()
   },
   onReachBottom: function () {
      this.pageNoAdd()
   },
})
