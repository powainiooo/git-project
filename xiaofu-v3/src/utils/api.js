import store from '@/store'
import { promisify } from '@/utils'
const login = promisify(mpvue.login)

const baseUrl = 'https://leesticket.waiting8.com'

const ajax = (opts, autoMsg = true) => {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    opts.url = `${baseUrl}${opts.url}`
    const extras = {
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        token: store.state.token
      },
      success (res) {
        console.log('请求参数', opts)
        console.log('返回数据', res.data)
        resolve(res.data)
        if (res.data.code !== 1) {
          mpvue.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
        wx.hideNavigationBarLoading()
      },
      fail (err) {
        console.log('接口报错', err)
        // wx.navigateTo({
        //    url: '/pages/error/error'
        // })
        wx.hideNavigationBarLoading()
        reject(err)
      }
    }
    wx.request({...opts, ...extras})
  })
}

// 通用get
export const getAction = (url, data = {}) => {
  return ajax({
    url,
    data
  })
}
// 通用post
export const postAction = (url, data = {}) => {
  return ajax({
    method: 'POST',
    url,
    data
  })
}

// 登录
export const doLogin = (userInfo = {}) => {
  console.log('userInfo', userInfo)
  store.commit('SET_PERSONINFO', userInfo.userInfo)
  login().then(loginRes => {
    console.log('loginRes', loginRes)
    postAction('/api/wxapp/login', {
      code: loginRes.code,
      rawData: userInfo.rawData,
      token: ''
    }).then(res => {
      store.commit('SET_TOKEN', res.data.userInfo.token)
    })
  })
}
