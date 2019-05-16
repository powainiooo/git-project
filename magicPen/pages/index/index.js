//index.js
//获取应用实例
const app = getApp()
const {getSlideList, getNearbyMerchant, getChoicenessWorks, getAnnoun, getMyDyn} = require('../../utils/api.js')
const useGuide = wx.getStorageSync('useGuide')
import regeneratorRuntime from '../../utils/runtime.js'
const {promisify} = require('../../utils/util.js')
const getLocation = promisify(wx.getLocation)
const myDynData = wx.getStorageSync('myDynData')
console.log(myDynData)
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false
audio.src = app.globalData.audioSrc.thumbup
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
      msgList: [],
      newsHintMsg: '',
      showNewsHint: false,
      myDynData: null,
      tWarn: 0,
      warnMsgList: []
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
      app.sKeyReadyCallback = res => {
         this.getStore()
         if (app.globalData.myDyn === null) {
            this.getMyDyn()
         }
      }
      // this.getBannerData()
      // this.getWorksData()
      // this.getMsgData()
      // const sKey = wx.getStorageSync('sKey')
      // if(sKey !== '' && sKey !== null){
      //    app.globalData.sKey = sKey
      //    this.getStore()
      //
      // }
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
            isWorksLIstEnd: res.data.pageSum === res.data.pageCurrent,
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
   getMyDyn () {
      getMyDyn().then(res => {
         this.setData({
            myDynData: res.data
         })
         app.globalData.myDyn = res.data
         if (typeof myDynData !== 'string' && myDynData !== null) {
            console.log('has myDynData')
            this.data.warnMsgList = this.getWarnText(res.data)
            if (this.data.warnMsgList.length !== 0) {
               setTimeout(()=>{
                  this.rollWarnMsg()
               }, 2000)
            }
         } else {
            console.log('has not myDynData')
            wx.setStorage({
               key:'myDynData',
               data: res.data
            })
         }
      })
   },
   pageNoAdd() {
      if (this.data.isWorksLIstEnd) return;
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
   getWarnText (data) {
      console.log('get text')
      console.log(data)
      let arr = []
      if (data.couponDue === 1) {
         arr.push('你的优惠券快过期啦')
      } else {
         if (data.couponSum > myDynData.couponSum) {
            arr.push('你有获得新的优惠券哟')
         }
      }
      if (data.medalDue  === 1) {
         arr.push('你的勋章礼品快过期啦')
      } else {
         if (data.medalSum > myDynData.medalSum) {
            arr.push('你有获得新的勋章哟')
         }
      }
      if (data.fans > myDynData.fans) {
         arr.push(`新增${data.fans - myDynData.fans}个粉丝`)
      }
      if (data.zanSum > myDynData.zanSum) {
         arr.push(`你的作品新增${data.zanSum - myDynData.zanSum}个赞啦`)
      }
      if (data.userDynSum  > 0) {
         arr.push(`你关注的好友更新动态啦`)
      }
      return arr
   },
   rollWarnMsg () {
      this.setData({
         newsHintMsg: this.data.warnMsgList.shift(),
         showNewsHint: true
      })
      this.data.tWarn = setInterval(()=>{
         this.setData({
            showNewsHint: false
         })
         wx.nextTick(()=>{
            if (this.data.warnMsgList.length === 0) {
               clearInterval(this.data.tWarn)
            } else {
               this.setData({
                  newsHintMsg: this.data.warnMsgList.shift(),
                  showNewsHint: true
               })
            }
         })
      }, 5000)
   },
   nextMsg () {
      clearInterval(this.data.tWarn)
      this.setData({
         showNewsHint: false
      })
      if (this.data.warnMsgList.length !== 0) {
         this.rollWarnMsg()
      }
   },
   thumbup () {
      audio.play()
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      this.getBannerData()
	   this.data.worksList = []
      this.getWorksData()
      this.getMsgData()
      if (app.globalData.sKey !== null) {
         this.getStore()
      }
      if(this.data.myDynData !== null) {
         const myDynData = wx.getStorageSync('myDynData')
         if (typeof myDynData !== 'string' && myDynData !== null) {
            this.setData({
               myDynData
            })
         }
      }
   },
   onReachBottom: function () {
      this.pageNoAdd()
   },
})
