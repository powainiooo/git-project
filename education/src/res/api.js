const baseUrl = 'https://bbart.waiting8.com'
const ajax = (opts, autoMsg = true) => {
   return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      const extras = {
         success(res) {
            console.log(res.data)
            if (res.data.status === 0) {
               resolve(res.data)
            } else {
               resolve(res.data)
            }
            wx.hideNavigationBarLoading()
         },
         fail(err) {
            console.log(err)
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

// 用户登陆
export const doLogin = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/wxapp/login`,
      data
   })
}
