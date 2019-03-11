//index.js
//获取应用实例
const app = getApp()
const {getSlideList, getChoicenessWorks} = require('../../utils/api.js')
const useGuide = wx.getStorageSync('useGuide')
console.log('useGuide:'+useGuide)
Page({
  data: {
    useGuide: typeof useGuide === 'string' ? false : true,
    guideStep: typeof useGuide === 'string' ? 1 : 'end',
    userInfo: {},
    hasUserInfo: app.globalData.userInfo !== null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bannerList: [],
    worksList: [],
    isWorksLIstEnd: false,
    isLoadingList: false,
    pageSize: 10,
    pageNo: 1
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
    this.getBannerData()
    this.getWorksData()
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
  }
})
