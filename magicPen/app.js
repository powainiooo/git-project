//app.js
import regeneratorRuntime from 'utils/runtime.js'
const {promisify} = require('utils/util.js')
const login = promisify(wx.login)
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
const ajax = promisify(wx.request)
const sKey = wx.getStorageSync('sKey')
const sKeyTime = wx.getStorageSync('sKeyTime')
App({
   onLaunch: function () {
      this.doInit()
   },
   async doInit() {
      console.time('getting')
      const getSettingData = await getSetting()
      console.timeEnd('getting')
      if(getSettingData.authSetting['scope.userInfo']) {
         console.time('userInfo')
         const userInfoData = await getUserInfo()
         console.timeEnd('userInfo')
         const {encryptedData, iv, userInfo} = userInfoData
         Object.assign(this.globalData.userInfo, userInfo)
         const now = new Date().getTime()
         if(sKeyTime === '' || now > sKeyTime + 47*60*60*1000) {
            console.time('code')
            const {code} = await login()
            console.timeEnd('code')
            console.time('login')
            const resData = await ajax({
               url: `${this.globalData.ajaxSrc}/api/user/onLogin`,
               method: 'POST',
               data:{code, encryptedData, iv}
            }).catch(e => console.log(e))
            console.timeEnd('login')
            this.globalData.sKey = resData.data.data.sKey
            wx.setStorage({
               key:'sKey',
               data: resData.data.data.sKey
            })
            wx.setStorage({
               key:'sKeyTime',
               data: now
            })
            if (this.sKeyReadyCallback) {
               this.sKeyReadyCallback()
            }
         }else {
            this.globalData.sKey = sKey
         }
      }
   },
   globalData: {
      ajaxSrc: 'https://xcx.newryun.com',
      userInfo: {},
      sKey: '1645040202',
      generateData: {
         pngCoordinate: "242,326,260,206",
         psdUrl: "https://sbhh.newryun.com/back/psd/201904/hvg3zbaw7t.png"
      },
      locationData: null
   }
})