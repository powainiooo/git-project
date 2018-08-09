//app.js
App({
  onLaunch: function () {
    let self = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: self.globalData.ajaxSrc+'/get_weixin',
          data: {
            code: res.code
          },
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            self.globalData.userOpenID = res.data.openid;
            // 查看是否授权
            wx.getSetting({
              success: function(res){
                if (res.authSetting['scope.userLocation']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                  wx.getUserInfo({
                    success: function(res) {
                      self.globalData.userInfo = res.userInfo;

                      if (self.userInfoReadyCallback) {
                        self.userInfoReadyCallback(res)
                      }

                      wx.request({
                          url:self.globalData.ajaxSrc+'/wxuser_add',
                          data:{
                            openid:self.globalData.userOpenID,
                            country:res.userInfo.country,
                            province:res.userInfo.province,
                            city:res.userInfo.city,
                            gender:res.userInfo.gender,
                            nickName:res.userInfo.nickName,
                            avatarUrl:res.userInfo.avatarUrl
                          },
                        header: {
                          'content-type': 'json'
                        },
                          success:res=>{
                            console.log('add user success!');
                          }
                      })
                    },
                    fail(err){
                      wx.redirectTo({
                        url: '/pages/result/result?page=login'
                      })
                    }
                  })
                }else{
                  wx.redirectTo({
                    url: '/pages/result/result?page=login'
                  })
                }
              }
            })
          }
        })
      }
    });

  },
  globalData: {
    userInfo: null,
    userOpenID:null,
    ajaxSrc:'http://ticket.pc-online.cc/mobile/applet',
    imgSrc:'http://ticket.pc-online.cc/upload/',
    ticketOrderNum:null,
    ticketBuyNum:0
  }
});