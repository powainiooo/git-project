// pages/index/detail.js
const app = getApp()
const ajaxSrc = app.globalData.ajaxSrc
const imgSrc = app.globalData.imgSrc
const common = require('common')
import { getIndexDetailData} from '../../utils/api'
Page({
   /**
   * 页面的初始数据
   */
   data: {
      id: -1,
      headerBtns: ['share', 'close'],
      detailData: null,
      detailPage: '',
      drinkParams: [],
      showPassport: false
   },
   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      console.log(options)
      this.data.id = options.id || options.scene
      // this.data.id = '283'
      this.getDetailData(this.data.id)
   },
   onShow () {
      app.$watch('drinkParams', (val, old) => { // 监听选择的特饮票数
         this.setData({
            drinkParams: val
         })
      })
      app.$watch('showPassport', (val, old) => { // 监听是否显示上传护照照片按钮
         this.setData({
            showPassport: val
         })
      })
   },
   // 响应顶部按钮点击
   headBtn (e) {
      if (e.detail === 'close') {
         wx.navigateBack({
            url: '/pages/index/index'
         })
      } else if (e.detail === 'arrow') {
         const ticket = this.selectComponent("#ticket")
         const footer = this.selectComponent("#footer")
         if (this.data.detailPage === 'buy') {
            ticket.togglePage('detail')
            footer.togglePage('detail')
            this.setData({
               headerBtns: ['share', 'close']
            })
         } else if (this.data.detailPage === 'drink') {
            ticket.togglePage('buy')
            footer.togglePage('buy')
            this.data.detailPage = 'buy'
         }
      } else if (e.detail === 'poster') {
         this.drawPoster()
      }
   },
   // 获取详情数据
   getDetailData (tid) {
      getIndexDetailData({
         tid
      }).then(res => {
         this.setData({
            detailData: res.data
         })
      })
   },
   // 响应底部按钮点击
   footerBtnFunc (e) {
      const ticket = this.selectComponent("#ticket")
      if (e.detail === 'intoBuy') {
         ticket.togglePage('buy')
         this.setData({
            headerBtns: ['share', 'arrow'],
            detailPage: 'buy'
         })
      } else if (e.detail === 'doPay') {
         this.doPay()
      } else if (e.detail === 'intoDrink') {
         ticket.togglePage('drink')
         this.setData({
            headerBtns: ['share', 'arrow'],
            detailPage: 'drink'
         })
      }
   },
   // 付款
   doPay () { // 付款
      const ticket = this.selectComponent("#ticket")
      const params = ticket.getParams()
      const self = this
      wx.setStorage({
         key: 'nameVal',
         data: params.name
      })
      wx.setStorage({
         key: 'phoneVal',
         data: params.mobile
      })
      wx.setStorage({
         key: 'addressVal',
         data: params.address
      })
      wx.setStorage({
         key: 'idnum',
         data: params.idnum
      })
      params.openid = app.globalData.userOpenID
      params.city = app.globalData.city
      params.drinks = this.data.drinkParams
      wx.request({
         url: ajaxSrc + '/create_order',
         data: params,
         success: function (res) {
            if (res.data.status !== 0) {
               wx.showToast({
                  image: '../../res/images/warn.png',
                  title: res.data.msg
               })
            } else {
               let jsapi = res.data.jsapiparam
               let order_num = res.data.order_num
               let tid = res.data.tid
               app.globalData.ticketOrderNum = order_num
               app.globalData.ticketBuyNum = params.nums
               if (res.data.flag === 1) { // 福利票
                  self.doBuySuccess(tid, order_num)
               } else {
                  wx.requestPayment({
                     'timeStamp': jsapi.timeStamp,
                     'nonceStr': jsapi.nonceStr,
                     'package': jsapi.package,
                     'signType': jsapi.signType,
                     'paySign': jsapi.paySign,
                     'success' (res) {
                        console.log(res)
                        wx.showToast({
                           title: '支付成功'
                        })
                        self.getMessageAuth()
                        self.doBuySuccess(tid, order_num)
                     },
                     'fail': function (res) {
                        wx.showToast({
                           image: '../../res/images/warn.png',
                           title: '支付失败'
                        })
                     }
                  })
               }
            }
         },
         fail () {
            wx.showModal({
               title: '购买失败，请重试',
               success () {
                  this.doPay()
               }
            })
         }
      })
   },
   getMessageAuth () {
      console.log('发起订阅消息')
      wx.requestSubscribeMessage({
         tmplIds: [
            'WRge3txz54ZhpQ4md9mG0RHSdLSaMlcuW5TPTWUi_Xk',
            'Qr4BpwVZGPkOYqBHpPDryPuDZkmYoEEDPY-VMBpOGR8',
            'BCUfqqnuvWiwzYjvcQDKEUumjXsMioiEBKzl3chuE_w'
         ],
         success (res) {
            console.log('订阅消息成功')
            console.log(res)
            console.log('--------------------')
         },
         fail (err) {
            console.log('订阅消息失败')
            console.log(err)
            console.log('--------------------')
         }
      })
   },
   doBuySuccess (tid, orderNum) {
      let self = this
      wx.request({
         url: ajaxSrc + '/pay_success',
         data: {
            tid,
            order_num: orderNum
         },
         success: res => {
            wx.navigateTo({
               url: '/pages/result/result?page=ticketSuc'
            })
         },
         fail () {
            wx.reLaunch({
               url: '/pages/error/error'
            })
         }
      })
   },
   // 生成海报
   drawPoster () {
      let poster = this.data.detailData.info.poster
      wx.showLoading({
         title: '生成中'
      })

      wx.downloadFile({
         url: imgSrc + poster,
         success (res) {
            if (res.statusCode === 200) {
               wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success (res2) {
                     console.log(res2)
                     wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                     })
                  },
                  fail (err) {
                     wx.showToast({
                        title: '保存失败',
                        image: '../../res/images/warn.png',
                        duration: 2000
                     })
                  }
               })
            } else {
               wx.showToast({
                  title: '保存失败',
                  image: '../../res/images/warn.png',
                  duration: 2000
               })
            }
         }
      })
   },
   // 打开购买页的身份证上传
   openUploadFile () {
      const ticket = this.selectComponent("#ticket")
      const buy = ticket.selectComponent("#buy")
      buy.doUpload()
   },
   // 用户点击右上角分享
   onShareAppMessage: function () {
      let title
      if (this.data.detailData.info.activity === '') {
         title = this.data.detailData.info.goods_name
      } else {
         title = this.data.detailData.info.goods_name + ' | ' + this.data.detailData.info.activity
      }
      return {
         title: title,
         imageUrl: imgSrc + this.data.detailData.info.share_logo,
         path: 'pages/index/detail?id=' + this.data.detailData.info.id
      }
   }
})
