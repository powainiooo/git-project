const baseUrl = 'https://st.vsapp.cn'
let token = ''
const ajax = (opts, autoMsg = true) => {
   return new Promise((resolve, reject) => {
      wx.showNavigationBarLoading()
      const extras = {
         success(res) {
            console.log('token', token)
            console.log('请求参数', opts)
            console.log('返回数据', res)
            if (res.data.ret === 1) {
               resolve(res.data)
            } else {
               wx.showToast({
                  image: '../res/img/warn.png',
                  title: res.data.msg
               })
               if (autoMsg) {
                  resolve(res.data)
               }
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
      url: `${baseUrl}/wechat/main/login`,
      data
   })
}

// 上传用户信息
export const getUserInfo = data => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/wechat/main/getUserInfo`,
      data
   })
}

// 首页
export const getIndexData = () => {
   return ajax({
      method: 'POST',
      url: `${baseUrl}/api/xcx/index`
   })
}

// 点击区域获取楼盘信息
export const getLplist = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/get_lplist`,
      data
   })
}

// 关于我们
export const getAboutus = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/aboutus`,
      data
   })
}

// 免责说明
export const getSmData = () => {
   return ajax({
      url: `${baseUrl}/api/xcx/sm`
   })
}

// 楼盘详情页
export const getLpDetail = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/lp_detail`,
      data
   })
}
