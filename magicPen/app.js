//app.js
import regeneratorRuntime from 'utils/runtime.js'
const {promisify} = require('utils/util.js')
const login = promisify(wx.login)
const getSetting = promisify(wx.getSetting)
const getUserInfo = promisify(wx.getUserInfo)
const ajax = promisify(wx.request)
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.doInit()

  },
  async doInit() {
    const {code} = await login()
    const getSettingData = await getSetting()
    if(getSettingData.authSetting['scope.userInfo']){
      const userInfoData = await getUserInfo()
      const {encryptedData, iv, userInfo} = userInfoData
      this.globalData.userInfo = userInfo
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(userInfoData)
      }
      const resData = await ajax({
        url: 'http://wx.newryun.com/api/user/onLogin',
        method: 'POST',
        data:{code, encryptedData, iv}
      }).catch(e => console.log(e))
      const sKey = resData.data.data.sKey
    }
  },
  globalData: {
    userInfo: null
  }
})