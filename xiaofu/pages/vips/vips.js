// pages/vips/vips.js
import {getVipDetail, createVipOrder, buyVipSuccess} from '../../utils/api'
const app = getApp()
const nameVal = wx.getStorageSync('nameVal')
const phoneVal = wx.getStorageSync('phoneVal')
const addressVal = wx.getStorageSync('addressVal')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      imgSrc: app.globalData.imgSrc,
      headerBtns: ['share'],
      contentList: [
         '一年内所有活动享有一人购票 95折 优惠，多人购票只有一人享受 95 优惠。',
         '获得 小夫有票 周边福袋 2 次'
      ],
      nameVal,
      phoneVal,
      addressVal,
      btnName: '购买',
      page: 'buy',
      id: 0,
      itemData: null,
      btnDisabled: false
   },
   doNext () {
      if (this.data.btnDisabled) return
      if (this.data.page === 'buy') {
         this.setData({
            btnName: '确认付款',
            page: 'confirm',
            headerBtns: ['share', 'arrow']
         })
         this.checkValues()
      } else if (this.data.page === 'confirm') {
         this.createVipOrder()
      } else if (this.data.page === 'renew') {
         this.createVipOrder()
      }
   },
   headBtn (e) {
      if (e.detail === 'arrow') {
         this.setData({
            btnName: '购买',
            page: 'buy',
            headerBtns: ['share'],
            btnDisabled: false
         })
      }
   },
   checkValues (event) { // 检测信息是否全部输入
      let data = this.data.itemData
      if (event) {
         let key = event.target.dataset.key
         this.data[key] = event.detail.value
      }

      let btn = false
      if (this.data.nameVal === '') {
         btn = true
      }
      let myreg = /^[1][0-9]{10}$/
      if (!myreg.test(this.data.phoneVal)) {
         btn = true
      }
      if (this.data.addressVal === '') {
         btn = true
      }
      this.setData({
         btnDisabled: btn
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const page = options.page || 'buy'
      this.setData({
         page
      })
      if (page === 'buy') {
         const id = options.id || '3'
         this.data.id = id
         this.getData(id)
      } else if (page === 'renew') {
         console.log(app.globalData.vipData)
         this.setData({
            itemData: app.globalData.vipData.data,
            nameVal: app.globalData.vipData.data.name,
            phoneVal: app.globalData.vipData.data.mobile,
            addressVal: app.globalData.vipData.data.address,
            id: app.globalData.vipData.data.card_id,
            btnName: '续费',
            headerBtns: []
         })
      }
   },
   getData (id) {
      getVipDetail({
         card_id: id
      }).then(res => {
         this.setData({
            itemData: res.data
         })
      })
   },
   createVipOrder () {
      const self = this
      createVipOrder({
         openid: app.globalData.userOpenID,
         card_id: this.data.id,
         name: this.data.nameVal,
         mobile: this.data.phoneVal,
         address: this.data.addressVal,
      }).then(res => {
         let jsapi = res.jsapiparam
         let order_num = res.order_num
         wx.requestPayment({
            'timeStamp': jsapi.timeStamp,
            'nonceStr': jsapi.nonceStr,
            'package': jsapi.package,
            'signType': jsapi.signType,
            'paySign': jsapi.paySign,
            'success' (res) {
               console.log(res)
               self.doBuySuccess(order_num)
            },
            'fail': function (res) {
               wx.showToast({
                  image: '../../res/images/warn.png',
                  title: '支付失败'
               })
            }
         })
      })
   },
   doBuySuccess (orderNum) {
      let self = this
      buyVipSuccess({
         order_num: orderNum
      }).then(res => {
         wx.navigateTo({
            url: '/pages/result/result?page=vipSuc'
         })
      })
   },
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {
      return {
         title: this.data.itemData.card_name,
         path: 'pages/vips/vips?page=buy&id=' + this.data.id
      }
   }
})
