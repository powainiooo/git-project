const ajaxUrl = 'https://xcx.newryun.com'
const { $Message } = require('../components/iview/base/index')
const ajax = (opts) => {
  return new Promise((resolve, reject) => {
    const extras = {
      success(res) {
        if(res.data.code === 0) {
          resolve(res.data)
        }else {
          $Message({
            content: res.data.msg,
            type: 'warning'
          });
        }
      },
      fail(err) {
        $Message({
          content: err.errMsg,
          type: 'error'
        });
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