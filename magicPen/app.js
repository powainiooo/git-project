//app.js
// import regeneratorRuntime from 'utils/runtime.js'
const regeneratorRuntime = require('utils/runtime.js')
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
      const {code} = await login()
      const getSettingData = await getSetting()
      if(getSettingData.authSetting['scope.userInfo']) {
         const userInfoData = await getUserInfo()
         const {encryptedData, iv, userInfo} = userInfoData
         Object.assign(this.globalData.userInfo, userInfo)
         const resData = await ajax({
            url: `${this.globalData.ajaxSrc}/api/user/onLogin`,
            method: 'POST',
            data:{code, encryptedData, iv}
         }).catch(e => console.log(e))
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
      audioSrc: {
         medal: 'http://sbhh.newryun.com/xcxstatic/sound/medal.mp3',
         star: 'http://www.w3school.com.cn/i/horse.ogg',
      },
      imgSrc: 'https://xcx.newryun.com/xcxstatic/',
      userInfo: {},
      sKey: sKey,
      generateData: null,
      locationData: null
   }
})