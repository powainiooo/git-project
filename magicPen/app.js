//app.js
// import regeneratorRuntime from 'utils/runtime.js'
const regeneratorRuntime = require('utils/runtime.js')
const {promisify} = require('utils/util.js')
const login = promisify(wx.login)
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
const ajax = promisify(wx.request)
// const sKey = wx.getStorageSync('sKey')
App({
   onLaunch: function () {
      const self = this
      wx.getSystemInfo({
         success(res) {
            console.log(res)
            self.globalData.isIOS = res.platform === 'ios'
         }
      })
      this.doInit()
   },
   async doInit() {
      const {code} = await login()
      const getSettingData = await getSetting()
	   console.log('getSettingData', getSettingData)
	   this.globalData.settingData = getSettingData.authSetting
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
         wx.reLaunch({
            url: '/pages/auth/auth'
         })
      }
   },
	async refreshSetting () {
		const getSettingData = await getSetting()
		console.log('refreshSetting', getSettingData)
		this.globalData.settingData = getSettingData.authSetting
	},
   globalData: {
   	settingData: {},
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
      isIOS: true,
      userInfo: {},
      sKey: null,
      myDyn: null,
      generateData: {"psdId":1,"title":"海洋ufo小土逗","tinyUrl":"https://sbhh.newryun.com/back/psd/201900/ufo0101a.jpg","bigUrl":"https://sbhh.newryun.com/back/psd/201900/ufo0101b.jpg","psdUrl":"https://sbhh.newryun.com/back/psd/201900/ufo0101c.png","pricePhoto":"5","priceVideo":"8","pngCoordinate":"246,210,281,159","use":203,"psdType":1,"isTutorials":2,"scene":-1,"playUsers":[{"avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erLQFeiaXZSPHassiaiat1yyWcIJ57P9Bd91ibUFam7tlPW9HegjkORg2aQZRoQibo6a7rRgKy3esVfYog/132","nick":"王山而是个小马甲","userId":1174}]},
      locationData: null
   }
})
