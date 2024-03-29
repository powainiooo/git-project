import Taro from '@tarojs/taro'
import store from '@/store'
import { tokenKey, baseUrl } from '@/config'
import { promisify } from '@/utils'
const loginAli = promisify(Taro.getAuthCode)
const loginWeapp = promisify(Taro.login)
const uploadFile = promisify(Taro.uploadFile)

let token = Taro.getStorageSync(tokenKey)
const ajax = (opts, autoMsg = true) => {
  return new Promise((resolve, reject) => {
    Taro.showNavigationBarLoading()
    token = store.state.token
    opts.url = `${baseUrl}${opts.url}?${tokenKey}=${token}`
    const extras = {
      header: {
        [tokenKey]: token
        // 'Content-Type': 'application/x-www-form-urlencoded'
      },
      success (res) {
        console.log(`接口${opts.url}请求参数`, opts)
        console.log('返回数据', res)
        resolve(res.data)
        if (res.data.code === 0) {
        } else if (res.data.code === 9) {
          console.log('未登录')
          Taro.navigateTo({
            url: '/pages/bindPhone/index'
          })
        } else {
          // console.log('res.data.ret')
          if (autoMsg) {
            Taro.showToast({ title: res.data.msg, icon: 'none' })
          }
        }
        Taro.hideNavigationBarLoading()
      },
      fail (err) {
        console.log('接口报错', err)
        Taro.hideNavigationBarLoading()
        reject(err)
      }
    }
    Taro.request({...opts, ...extras})
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
    nickname: userInfo.nickName,
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
  console.log('getTokenData')
  // store.commit('SET_TOKEN', '9bf43dbf0bc3fbc2a3bcfbff2aaa378904')
  // return
  const env = process.env.TARO_ENV
  if (env === 'alipay') {

  } else if (env === 'weapp') {

  }
  console.log('env', env)
  let func
  let key
  if (env === 'alipay') {
    func = loginAli
    key = 'authCode'
  } else {
    func = loginWeapp
    key = 'code'
  }
  func().then(loginRes => {
    console.log('getTokenData weapp', loginRes)
    getAction('/userapi/alipay/mini/login', {
      autocode: loginRes[key]
    }, false).then(res => {
      console.log('common_login', res)
      if (res.data !== null) {
        store.commit('SET_TOKEN', res.data.api_token)
        store.commit('SET_USERID', res.data.user_id)
        if (res.data.api_token) {
          store.dispatch('getUserInfo')
        }
      } else {
        store.commit('SET_TOKEN', res.data)
      }
    })
  })
}

// 支付
export const payment = (orderNo, orderId, from, key) => {
  postAction('/userapi/goods/order/create/pay', {
    order_no: orderNo
  }).then(res => {
    if (res.code === 0) {
      const jsapi = res.data
      Taro.requestPayment({
        'timeStamp': jsapi.timeStamp,
        'nonceStr': jsapi.nonceStr,
        'package': jsapi.package,
        'signType': jsapi.signType,
        'paySign': jsapi.paySign,
        'success': res => {
          // this.getMessageAuth()
          console.log('pay success', res)
          Taro.reLaunch({
            url: `/pages/result/main?result=suc&id=${orderId}&from=${from}`
          })
          Taro.hideLoading()
        },
        'fail': err => {
          console.log('pay fail', err)
          store.commit('SET_PAY', jsapi)
          Taro.reLaunch({
            url: `/pages/result/main?result=fail&id=${orderId}&from=${from}`
          })
          Taro.hideLoading()
        }
      })
    }
  })
}

// 登录拦截
export const intercept = fn => {
  if (store.state.isLogin) {
    if (typeof fn === 'function') {
      fn()
    }
  } else {
    Taro.navigateTo({
      url: '/pages/bindPhone/index'
    })
  }
}

// 上传图片
export const upload = path => {
  return new Promise((resolve, reject) => {
    token = store.state.token
    uploadFile({
      url: `${baseUrl}/userapi/upload/image?${tokenKey}=${token}`,
      filePath: path,
      name: 'file',
      fileName: 'file',
      fileType: 'image'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 上传头像
export const uploadAvatar = path => {
  return new Promise((resolve, reject) => {
    token = store.state.token
    uploadFile({
      url: `${baseUrl}/userapi/upload/image/avatar?${tokenKey}=${token}`,
      filePath: path,
      name: 'file',
      fileName: 'file',
      fileType: 'image'
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 上传音频
export const uploadAudio = (path, duration) => {
  return new Promise((resolve, reject) => {
    token = store.state.token
    uploadFile({
      url: `${baseUrl}/userapi/chat/upload/audio?${tokenKey}=${token}`,
      filePath: path,
      name: 'file',
      fileType: 'audio',
      formData: {
        seconds: duration
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}
// 上传视频
export const uploadVideo = (path) => {
  return new Promise((resolve, reject) => {
    token = store.state.token
    console.log('uploadVideo', path)
    uploadFile({
      url: `${baseUrl}/userapi/chat/upload/video?${tokenKey}=${token}`,
      filePath: path,
      name: 'file',
      fileType: 'video',
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// 跳转到聊天室
export const toChatRoom = shopId => {
  getAction('/userapi/user/chat/account', {
    uid: shopId
  }).then(res => {
    if (res.code === 0) {
      Taro.navigateTo({
        url: `/pages/chatroom/index?account=${res.data.account}&shopId=${shopId}`
      })
    }
  })
}
