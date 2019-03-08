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
    console.time()
    const resArr = await Promise.all([
      login(),
      getSetting()
    ])
    const {code} = resArr[0]
    const getSettingData = resArr[1]
    if(getSettingData.authSetting['scope.userInfo']){
      console.timeEnd()
      const userInfoData = await getUserInfo()
      const {encryptedData, iv, userInfo} = userInfoData
      this.globalData.userInfo = userInfo
      if (this.userInfoReadyCallback) {
        this.userInfoReadyCallback(userInfoData)
      }
      const resData = await ajax({
        url: 'https://xcx.newryun.com/api/user/onLogin',
        method: 'POST',
        data:{code, encryptedData, iv}
      }).catch(e => console.log(e))
      this.globalData.sKey = resData.data.data.sKey
    }
  },
  globalData: {
    ajaxSrc: 'https://xcx.newryun.com',
    userInfo: null,
    sKey: null
  }
})