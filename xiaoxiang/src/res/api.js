const ajaxUrl = 'http://move.pc-online.cc/mobile/applet/'
const ajax = (opts, autoMsg = true) => {
   return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      const extras = {
         success(res) {
            if (res.data.status === 0) {
               resolve(res.data)
            } else {
               console.log(res.data)
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
            reject()
         }
      }
      wx.request({...opts, ...extras})
   })
}

// 取小程序用户信息
export const getWeixin = (data) => {
   return ajax({
      url: `${ajaxUrl}/get_weixin`,
      data,
      header: {
         'content-type': 'json'
      }
   })
}
// 保存小程序用户信息
export const wxUserAdd = (data) => {
   return ajax({
      url: `${ajaxUrl}/wxuser_add`,
      data,
      header: {
         'content-type': 'json'
      }
   })
}

// 生成订单1
export const createOrderOne = (data) => {
   return ajax({
      url: `${ajaxUrl}/create_order_one`,
      data,
      header: {
         'content-type': 'json'
      }
   })
}

// 生成订单2
export const createOrderTwo = (data) => {
   return ajax({
      url: `${ajaxUrl}/create_order_two`,
      data,
      header: {
         'content-type': 'json'
      }
   })
}

// 获取户型
export const getHouseType = (data) => {
   return ajax({
      url: `${ajaxUrl}/house_type`,
      data,
      header: {
         'content-type': 'json'
      }
   })
}
