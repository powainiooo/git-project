// app.js
const QQMapWX = require('utils/qqmap-wx-jssdk.min.js')
const qMap = new QQMapWX({
   key: 'AH7BZ-VV736-WNUSA-EP35M-3TCOZ-DTBXG'
})
App({
   onLaunch: function () {
      let self = this
      // 展示本地存储能力
      var logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)

      // 登录
      let openid = wx.getStorageSync('openid')
      if (openid === '' || openid === null || openid === undefined) {
         wx.login({
            success: res => {
               wx.request({
                  url: self.globalData.ajaxSrc + '/get_weixin',
                  data: {
                     code: res.code
                  },
                  header: {
                     'content-type': 'json'
                  },
                  success: function (res) {
                     self.globalData.userOpenID = res.data.openid
                     wx.setStorageSync('openid', res.data.openid)
                  }
               })
            }
         })
      } else {
         self.globalData.userOpenID = openid
      }

      // 查看是否授权
      wx.getSetting({
         success: function (res) {
            console.log(res)
            if (res.authSetting['scope.userInfo']) {
               // 已经授权，可以直接调用 getUserInfo 获取头像昵称
               wx.getUserInfo({
                  success: function (res) {
                     self.globalData.userInfo = res.userInfo

                     if (self.userInfoReadyCallback) {
                        self.userInfoReadyCallback(res)
                     }
                     wx.request({
                        url: self.globalData.ajaxSrc + '/wxuser_add',
                        data: {
                           openid: self.globalData.userOpenID,
                           country: res.userInfo.country,
                           province: res.userInfo.province,
                           city: res.userInfo.city,
                           gender: res.userInfo.gender,
                           nickName: res.userInfo.nickName,
                           avatarUrl: res.userInfo.avatarUrl
                        },
                        header: {
                           'content-type': 'json'
                        },
                        success: res => {
                           console.log('add user success!')
                        }
                     })
                  },
                  // fail (err) {
                  //    wx.navigateTo({
                  //       url: '/pages/result/result?page=login'
                  //    })
                  // }
               })
            } else {
               // wx.navigateTo({
               //    url: '/pages/result/result?page=login'
               // })
            }
         }
      })
   },
   watchCallBack: {},
   watchingKeys: [],
   setGlobalData(data){
      // 为了便于管理，应通过此方法修改全局变量
      Object.keys(data).map(key => {
         this.globalData[key] = data[key]
      })
      console.log('mutation', data);
      wx.setStorageSync('store', this.globalData)// 加入缓存
   },
   $watch(key, cb){
      this.watchCallBack = Object.assign({}, this.watchCallBack,{
         [key]: this.watchCallBack[key] || []
      });
      this.watchCallBack[key].push(cb);
      if(!this.watchingKeys.find(x => x === key)){
         const that = this;
         this.watchingKeys.push(key);
         let val = this.globalData[key];
         Object.defineProperty(this.globalData, key, {
            configurable: true,
            enumerable: true,
            set(value){
               const old = that.globalData[key];
               val = value;
               that.watchCallBack[key].map(func => func(value, old));
            },
            get(){
               return val
            }
         })
      }
   },
   globalData: {
      userInfo: null,
      userOpenID: null,
      // ajaxSrc: 'http://ticket.pc-online.cc/mobile/applet_v2',
      // imgSrc: 'http://ticket.pc-online.cc/upload/',
      ajaxSrc: 'https://wechat.leesticket.com/mobile/applet_v2',
      imgSrc: 'https://wechat.leesticket.com/upload/',
      ticketOrderNum: null,
      ticketBuyNum: 0,
      access_token: '',
      city: '',
      ticketNumsArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      ticketNumsSelected: 0,
      buyBtnDisabled: true,
      ticketPrice: 0,
      drinkPrice: 0,
      drinkParams: [],
      showPassport: false,
      vipData: {
         status: 1,
         vaild: '2020/03/22'
      }
   },
   getCity () {
      let self = this
      wx.getLocation({
         type: 'wgs84',
         success: function (res) {
            qMap.reverseGeocoder({
               location: {
                  latitude: res.latitude,
                  longitude: res.longitude
               },
               success: function (res) {
                  self.globalData.city = res.result.address_component.city
               }
            })
         }
      })
   },
   getAccessToken () {
      let self = this
      wx.request({
         url: 'https://api.weixin.qq.com/cgi-bin/token',
         data: {
            grant_type: 'client_credential',
            appid: 'wx3b740b88a384f9ea',
            secret: 'a69d58d8e38d363c21f46a637a08fdfa'
         },
         success: res => {
            self.globalData.access_token = res.data.access_token
         }
      })
   }
})
// https://wechat.leesticket.com
// http://ticket.pc-online.cc
