import config from '@/config'
const { baseUrl } = config

const ajax = (opts, autoMsg = true) => {
   return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      opts.url = `${baseUrl}${opts.url}`
      const extras = {
         header: {
            'Content-Type': 'application/x-www-form-urlencoded'
         },
         success (res) {
            console.log('请求参数', opts)
            console.log('返回数据', res)
            resolve(res.data)
            if (res.data.status !== 0) {
               mpvue.showToast({ title: res.data.msg })
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
export const doLogin = (data = {}) => {
   return ajax({
      method: 'POST',
      url: `xcx_login`,
      data
   })
}
