const ajaxUrl = getApp().globalData.ajaxSrc
const { $Message } = require('../components/iview/base/index')
const ajax = (opts) => {
  return new Promise((resolve, reject) => {
    wx.showNavigationBarLoading()
    const app = getApp()
    const extras = {
      header: {
        sKey: app.globalData.sKey
      },
      success(res) {
        if(res.data.code === 0) {
          resolve(res.data)
        }else {
          $Message({
            content: res.data.msg,
            type: 'warning'
          });
        }
        wx.hideNavigationBarLoading()
      },
      fail(err) {
        $Message({
          content: err.errMsg,
          type: 'error'
        });
        wx.hideNavigationBarLoading()
        reject()
      }
    }
    wx.request({...opts, ...extras})
  })
}

// 首页幻灯片
export const getSlideList = () => {
  return ajax({
    url: `${ajaxUrl}/api/index/getSlideList`
  })
}

//获取精选作品
export const getChoicenessWorks = data => {
  return ajax({
    url: `${ajaxUrl}/api/works/getChoicenessWorks`,
    data
  })
}

//获取我的优惠券列表
export const getCouponList = data => {
  return ajax({
    url: `${ajaxUrl}/api/coupon/getCouponList`
  })
}

//用户提交建议反馈
export const userSuggest = data => {
  return ajax({
    method: 'POST',
    url: `${ajaxUrl}/api/userInfo/userSuggest`,
    data
  })
}

//获取我附近的体验店
export const getNearbyMerchant = data => {
  return ajax({
    method: 'POST',
    url: `${ajaxUrl}/api/user/getNearbyMerchant?coord=${data}`
  })
}

//获取我的币余额、粉丝数
export const getUserIq = data => {
  return ajax({
    method: 'POST',
    url: `${ajaxUrl}/api/user/getUserIq`
  })
}