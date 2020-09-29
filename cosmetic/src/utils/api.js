import store from '@/store'
import config from '@/config'
const { tokenKey, baseUrl } = config

let token = mpvue.getStorageSync(tokenKey)
const ajax = (opts, autoMsg = true) => {
   return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      token = store.state[tokenKey]
      opts.url = `${baseUrl}?path=${opts.url}&${tokenKey}=${token}`
      const extras = {
         header: {
            [tokenKey]: token,
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         success (res) {
            console.log('token', token)
            console.log('请求参数', opts)
            console.log('返回数据', res)
            resolve(res.data)
            if (res.data.ret === 1001 || res.data.ret === 1000) {
               mpvue.showToast({ title: res.data.msg })
               setTimeout(() => {
                  mpvue.reLaunch({
                     url: '/pages/personal/main'
                  })
               }, 1500)
            } else {
               mpvue.showToast({ title: res.data.msg })
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
export const postAction = (url, data = {}) => {
   return ajax({
      method: 'POST',
      url,
      data
   })
}

// 登录
export const doLogin = (data = {}) => {
   return ajax({
      method: 'POST',
      url: `xcx_login`,
      data
   })
}
