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
export const postUserInfo = data => {
   return ajax({
      method: 'POST',
      header: {
         'content-type': 'application/x-www-form-urlencoded'
      },
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

// 项目详情页
export const getXmDetail = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/xm_detail`,
      data
   })
}

// 我的关注楼盘
export const getAttentionList = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/like_list`,
      data
   })
}

// 关注取消关注楼盘
export const toggleLike = data => {
   return ajax({
      method: 'POST',
      header: {
         'content-type': 'application/x-www-form-urlencoded'
      },
      url: `${baseUrl}/api/xcx/lp_like`,
      data
   })
}

// 提交表单信息
export const postContactForm = data => {
   return ajax({
      method: 'POST',
      header: {
         'content-type': 'application/x-www-form-urlencoded'
      },
      url: `${baseUrl}/api/xcx/save_form`,
      data
   })
}

// 我们是谁
export const getAboutWho = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/about_who`,
      data
   })
}

// 简历与成就
export const getAwards = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/awards`,
      data
   })
}

// 投资者关系
export const getRelation = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/relation`,
      data
   })
}

// 新闻列表
export const getNews = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/news`,
      data
   })
}

// 新闻详情
export const getNewsDetail = data => {
   return ajax({
      url: `${baseUrl}/api/xcx/news_detail`,
      data
   })
}
