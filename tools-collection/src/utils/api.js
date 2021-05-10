import store from '@/store'
import config from '@/config'
import { promisify } from '@/utils'
const login = promisify(mpvue.login)
const { tokenKey, baseUrl } = config

let token = mpvue.getStorageSync(tokenKey)
const ajax = (opts, autoMsg = true) => {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    token = store.state[tokenKey]
    opts.url = `${baseUrl}${opts.url}`
    opts.data[tokenKey] = token
    const extras = {
      header: {
        [tokenKey]: token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log('token:', token)
        console.log('请求参数', opts)
        console.log('返回数据', res)
        resolve(res.data)
        if (res.data.ret === 0) {
        } else if (res.data.ret === 99) {
          doLogin().then(res => {
            mpvue.reLaunch({
              url: '/pages/index/main'
            })
          })
        } else if (res.data.ret === 1001) {
          doLogin().then(res => {
            mpvue.reLaunch({
              url: '/pages/index/main'
            })
          })
        } else {
          if (autoMsg) {
            mpvue.showToast({ title: res.data.message, icon: 'none' })
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
export const doLogin = () => {
  return new Promise((resolve, reject) => {
    login().then(resLogin => {
      console.log('resLogin', resLogin)
      ajax({
        method: 'POST',
        url: `login`,
        data: {
          code: resLogin.code
        }
      }).then(res => {
        console.log('resDoLogin', res)
        if (res.ret === 0) {
          store.commit('SET_LOGIN_KEY', res.data)
          resolve(res)
        } else {
          reject(res.msg)
        }
      })
    })
  })
}
