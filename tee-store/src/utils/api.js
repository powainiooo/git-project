import store from '@/store'
import config from '@/config'
import { promisify } from '@/utils'
const { tokenKey, baseUrl } = config
const login = promisify(mpvue.login)

let token = mpvue.getStorageSync(tokenKey)
const ajax = (opts, autoMsg = true) => {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    token = store.state.token
    console.log('token', store, token)
    opts.url = `${baseUrl}${opts.url}?${tokenKey}=${token}`
    const extras = {
      header: {
        [tokenKey]: token
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log('token:', token)
        console.log('请求参数', opts)
        console.log('返回数据', res)
        resolve(res.data)
        if (res.data.code === 0) {
        } else {
          // console.log('res.data.ret')
          if (autoMsg) {
            mpvue.showToast({ title: res.data.msg, icon: 'none' })
          }
        }
        wx.hideNavigationBarLoading()
      },
      fail (err) {
        console.log('接口报错', err)
        wx.navigateTo({
          url: '/pages/error/error'
        })
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
export const postAction = (url, data = {}, autoMsg = true) => {
  return ajax({
    method: 'POST',
    url,
    data
  }, autoMsg)
}

// 登录
export const doLogin = (data = {}) => {
  return ajax({
    method: 'POST',
    url: `xcx_login`,
    data
  })
}

// 获取token
export const getTokenData = () => {
  login().then(loginRes => {
    postAction('/userapi/wechat/login', {
      code: loginRes.code
    }, false).then(res => {
      console.log('common_login', res)
      if (res.data !== null) {
        store.commit('SET_TOKEN', res.data.userInfo.token)
      } else {
        store.commit('SET_TOKEN', res.data)
      }
    })
  })
}
