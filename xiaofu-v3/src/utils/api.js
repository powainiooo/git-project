import store from '@/store'
import { promisify } from '@/utils'
const login = promisify(mpvue.login)

// export const baseUrl = 'https://web.uat.leesticket.com' // 测试地址
export const baseUrl = 'https://web.leesticket.com' // 正式地址

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
        if (res.data.code !== 1 && autoMsg) {
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
export const postAction = (url, data = {}, autoMsg = true) => {
  return ajax({
    method: 'POST',
    url,
    data
  }, autoMsg)
}

// 登录
export const doLogin = (userInfo = {}) => {
  console.log('userInfo', userInfo)
  store.commit('SET_PERSONINFO', userInfo.userInfo)
  return new Promise((resolve, reject) => {
    login().then(loginRes => {
      console.log('loginRes', loginRes)
      postAction('/api/wxapp/login', {
        code: loginRes.code,
        rawData: userInfo.rawData,
        token: ''
      }).then(res => {
        store.commit('SET_TOKEN', res.data.userInfo.token)
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  })
}

// 获取token
export const getTokenData = () => {
  login().then(loginRes => {
    postAction('/api/wxapp/common_login', {
      code: loginRes.code
    }, false).then(res => {
      console.log('common_login', res)
      if (res.data !== null) {
        store.commit('SET_TOKEN', res.data.userInfo.token)
        // store.commit('SET_TOKEN', '87a02658-6e2d-446e-8f14-0271c1adb9b2')
      } else {
        store.commit('SET_TOKEN', res.data)
      }
    })
  })
}
