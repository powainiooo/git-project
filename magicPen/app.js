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
         wheel: 'http://sbhh.newryun.com/xcxstatic/sound/s01.mp3',
         wheelActive: 'http://sbhh.newryun.com/xcxstatic/sound/s02.mp3',
         thumbup: 'http://sbhh.newryun.com/xcxstatic/sound/s03.mp3',
         medal: 'http://sbhh.newryun.com/xcxstatic/sound/s04.mp3',
         takePhoto: 'http://sbhh.newryun.com/xcxstatic/sound/s05.mp3',
         star4: 'http://sbhh.newryun.com/xcxstatic/sound/s07.mp3',
         star5: 'http://sbhh.newryun.com/xcxstatic/sound/s08.mp3',
      },
      imgSrc: 'https://xcx.newryun.com/xcxstatic/',
      userInfo: {},
      sKey: sKey,
      myDyn: null,
      generateData: null,
      locationData: null
   }
})