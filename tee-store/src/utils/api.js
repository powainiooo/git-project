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
export const getAction = (url, data = {}, autoMsg = true) => {
  return ajax({
    url,
    data
  }, autoMsg)
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
  store.commit('SET_PERSONINFO', userInfo)
  postAction('/userapi/user/update', {
    nickName: userInfo.nickName,
    sex: userInfo.sex,
    province: userInfo.province,
    city: userInfo.city,
    country: userInfo.country,
    headimgurl: userInfo.avatar
  }).then(res => {
    if (res.code === 0) {
      store.commit('SET_LOGIN', true)
    }
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
        store.commit('SET_TOKEN', res.data.api_token)
        store.commit('SET_LOGIN', res.data.nickName !== null)
      } else {
        store.commit('SET_TOKEN', res.data)
      }
    })
  })
}

// 支付
export const payment = (orderNo, orderId, from) => {
  postAction('/userapi/goods/order/create/pay', {
    order_no: orderNo
  }).then(res => {
    if (res.code === 0) {
      const jsapi = res.data
      mpvue.requestPayment({
        'timeStamp': jsapi.timeStamp,
        'nonceStr': jsapi.nonceStr,
        'package': jsapi.package,
        'signType': jsapi.signType,
        'paySign': jsapi.paySign,
        'success': res => {
          // this.getMessageAuth()
          console.log('pay success', res)
          mpvue.reLaunch({
            url: `/pages/result/main?result=suc&id=${orderId}&from=${from}`
          })
          mpvue.hideLoading()
        },
        'fail': err => {
          console.log('pay fail', err)
          store.commit('SET_PAY', jsapi)
          mpvue.reLaunch({
            url: `/pages/result/main?result=fail&id=${orderId}&from=${from}`
          })
          mpvue.hideLoading()
        }
      })
    }
  })
}
