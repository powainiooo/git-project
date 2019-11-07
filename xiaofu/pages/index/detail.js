// pages/index/detail.js
const app = getApp()
const ajaxSrc = app.globalData.ajaxSrc
import {getIndexDetailData} from '../../utils/api'
Page({

   /**
   * 页面的初始数据
   */
   data: {
      id: -1,
      detailData: null,
      headerBtns: ['share', 'close'],
      detailPage: ''
   },
   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      console.log(options)
      this.data.id = options.id || options.scene
      // this.data.id = '1517'
      this.getDetailData()
   },
   // 获取详情数据
   getDetailData () {
      getIndexDetailData({
         tid: this.data.id,
      }).then(res => {
         this.setData({
            detailData: res.data
         })
      })
   },
   // 响应顶部按钮点击
   headBtn (e) {
      if (e.detail === 'close') {
         wx.reLaunch({
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
                        this.doBuySuccess(tid, order_num)
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
      let imgSrc = app.globalData.imgSrc
      wx.showLoading({
         title: '生成中'
      })

      wx.downloadFile({
         url: imgSrc + poster,
         success (res) {
            if (res.statusCode === 200) {
               wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success () {
                     wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                     })
                  }
               })
            }
         }
      })
   },
   /**
   * 用户点击右上角分享
   */
   onShareAppMessage: function () {
      let title
      if (this.data.detailData.info.activity === '') {
         title = this.data.detailData.info.goods_name
      } else {
         title = this.data.detailData.info.goods_name + ' | ' + this.data.detailData.info.activity
      }
      return {
         title: title,
         imageUrl: this.data.imgSrc + this.data.detailData.info.share_logo,
         path: 'pages/index/detail?id=' + this.data.detailData.info.id
      }
   }
})
