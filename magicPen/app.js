//app.js
import regeneratorRuntime from 'utils/runtime.js'
const {promisify} = require('utils/util.js')
const login = promisify(wx.login)
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
const ajax = promisify(wx.request)
const sKey = wx.getStorageSync('sKey')
App({
   onLaunch: function () {
      this.doInit()
   },
   async doInit() {
      console.time('code')
      const {code} = await login()
      console.timeEnd('code')
      console.time('getting')
      const getSettingData = await getSetting()
      console.log(getSettingData)
      console.timeEnd('getting')
      if(getSettingData.authSetting['scope.userInfo']) {
         console.time('userInfo')
         const userInfoData = await getUserInfo()
         console.timeEnd('userInfo')
         const {encryptedData, iv, userInfo} = userInfoData
         Object.assign(this.globalData.userInfo, userInfo)

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
         if (this.sKeyReadyCallback) {
            this.sKeyReadyCallback()
         }
      } else {
         wx.navigateTo({
            url: '/pages/auth/auth'
         })
      }
   },
   globalData: {
      ajaxSrc: 'https://xcx.newryun.com',
      imgSrc: 'https://xcx.newryun.com',
      userInfo: {},
      sKey: sKey,
      generateData: null,
      locationData: null
   }
})