//app.js
const QQMapWX = require('utils/qqmap-wx-jssdk.min.js');
const qMap = new QQMapWX({
  key:'AH7BZ-VV736-WNUSA-EP35M-3TCOZ-DTBXG'
});
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
                console.log(res);
                if (res.authSetting['scope.userInfo']) {
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

    this.getCity();
  },
  globalData: {
    userInfo: null,
    userOpenID:null,
    ajaxSrc:'https://wechat.leesticket.com/mobile/applet',
    imgSrc:'https://wechat.leesticket.com/upload/',
    ticketOrderNum:null,
    ticketBuyNum:0,
    access_token:'',
    city:''
  },
  getCity(){
    let self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        qMap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function(res) {
            self.globalData.city = res.result.address_component.city;
          }
        });
      }
    });
  },
  getAccessToken(){
    let self = this;
    wx.request({
        url:"https://api.weixin.qq.com/cgi-bin/token",
        data:{
          grant_type:'client_credential',
          appid:'wx3b740b88a384f9ea',
          secret:'a69d58d8e38d363c21f46a637a08fdfa'
        },
        success:res=>{
          self.globalData.access_token = res.data.access_token;
        }
    })
  }
});