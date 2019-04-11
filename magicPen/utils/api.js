const ajaxUrl = getApp().globalData.ajaxSrc
const { $Message } = require('../components/iview/base/index')
const ajax = (opts, autoMsg = true) => {
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
               if(autoMsg) {
                  $Message({
                     content: res.data.msg,
                     type: 'warning'
                  });
                  wx.hideLoading()
                  reject(res.data)
               }else {
                  resolve(res.data)
               }
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

//确认兑换来来画豆
export const affirmGetIq = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/coupon/affirmGetIq?couponId=${data}`
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
   }, false)
}

//获取我的币余额
export const getUserAsset = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/user/getUserAsset`
   })
}

//获取充值币商品列表
export const getIqGoods = data => {
   return ajax({
      url: `${ajaxUrl}/api/iq/getIqGoods`
   })
}

//获取充值币商品列表
export const payIqGoods = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/iq/payIqGoods`,
      data
   })
}

//获取作品列表
export const getMyWorks = data => {
   return ajax({
      url: `${ajaxUrl}/api/works/getMyWorks`,
      data
   })
}

//获取我关注的好友
export const getMyFriend = data => {
   return ajax({
      url: `${ajaxUrl}/api/userAtt/getMyFriend`,
      data
   })
}

//获取勋章列表
export const getMedalList = data => {
   return ajax({
      url: `${ajaxUrl}/api/medal/getMedalList`,
      data
   })
}
//领取勋章或礼品
export const takeState = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/medal/takeState?${data}`
   })
}

//获取用户个人空间信息
export const getUserInterspaceInfo = data => {
   return ajax({
      url: `${ajaxUrl}/api/userInfo/getUserInterspaceInfo`,
      data
   })
}

//关注用户
export const addAttention = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/userAtt/addAttention?userId=${data}`
   })
}

//取消关注用户
export const cancelAttention = data => {
   return ajax({
      method: 'DELETE',
      url: `${ajaxUrl}/api/userAtt/cancelAttention/${data}`
   })
}

//文件上传
export const fileUp = (filePath, fileType) => {
   const app = getApp()
   return new Promise((resolve, reject) => {
      wx.uploadFile({
         url: `${ajaxUrl}/api/upload/fileUp`,
         formData: {
            fileType: fileType
         },
         name: 'file',
         filePath: filePath,
         header: {
            sKey: app.globalData.sKey
         },
         success(res) {
            resolve(JSON.parse(res.data))
         },
         fail(err) {
            reject(err)
         }
      })
   })
}

//上传顶图
export const uploadTopImg = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/userInfo/uploadTopImg?topUrl=${data}`
   })
}

//获取复活、召唤的币价格
export const getFuhuoIqAndZhaohuanIq = data => {
   return ajax({
      url: `${ajaxUrl}/api/index/getFuhuoIqAndZhaohuanIq`
   })
}

//获取自拍模板列表
export const getPsdList = data => {
   return ajax({
      url: `${ajaxUrl}/api/psd/getPsdList?coord=${data}`
   })
}

//验证模板是否可以购买
export const checkPsd = data => {
   return ajax({
      url: `${ajaxUrl}/api/psd/checkPsd`,
      data
   })
}

//确认购买自拍模板
export const payPsdGoods = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/psd/payPsdGoods?${data}`
   })
}

//自拍上屏，付款成功后上屏的操作
export const psdUpTv = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/psd/psdUpTv`,
      data
   })
}

//获取3D复活作品列表
export const getMyWorksScene = data => {
   return ajax({
      url: `${ajaxUrl}/api/works/getMyWorksScene`,
      data
   }, false)
}

//修改作品名
export const updataWorksName = (data) => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/works/updataWorksName`,
      data
   })
}

//确认复活作品
export const payFuHuo = (coord, tuzhiUn) => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/works/payFuHuo?coord=${coord}&tuzhiUn=${tuzhiUn}`,
   }, false)
}

//获取我可以召唤的作品
export const getZhaoHuanWorks = data => {
   return ajax({
      url: `${ajaxUrl}/api/zhaohuan/getZhaoHuanWorks?coord=${data}`
   }, false)
}

//确认购买华丽召唤
export const payZhaohuan = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/zhaohuan/payZhaohuan?coord=${data}`
   }, false)
}

//给作品置顶1、取消置顶2
export const updataWorksTop = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/works/updataWorksTop?${data}`
   })
}

//删除我的作品
export const deleteWorks = data => {
   return ajax({
      method: 'DELETE',
      url: `${ajaxUrl}/api/works/deleteWorks/${data}`
   })
}

//更新我的头饰等级，用户打开小程序时更新一次等级
export const updateUserGrade = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/userInfo/updateUserGrade`
   })
}

//根据图纸编号获取作品（分享作品）
export const getWorksByTuzhiNu = data => {
   return ajax({
      url: `${ajaxUrl}/api/works/getWorksByTuzhiNu`,
      data
   })
}

//给作品点赞
export const worksZan = data => {
   return ajax({
      method: 'POST',
      url: `${ajaxUrl}/api/works/worksZan?tuzhiNu=${data}`,
   }, false)
}

//根据模板订单编号获取合成图（分享页数据）
export const getSharePsdByOrderNu = data => {
   return ajax({
      url: `${ajaxUrl}/api/psd/getSharePsdByOrderNu`,
      data
   })
}
