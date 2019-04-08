// pages/recharge/recharge.js
import regeneratorRuntime from '../../utils/runtime.js'
const {getUserAsset, getIqGoods, payIqGoods} = require('../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      iqGoodsId: '',
      userIq: 0,
      iqGoodsVos: [],
      couponId: '',
      couponUserVos: []
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getMyPeas()
      this.getData()
   },
   getMyPeas () {
      getUserAsset().then(res=>{
         this.setData({
            userIq: res.data
         })
      })
   },
   getData() {
      getIqGoods().then(res => {
         const {couponUserVos, iqGoodsVos} = res.data
         this.setData({couponUserVos, iqGoodsVos})
      })
   },
   couponChange(e) {
      console.log(e)
      const couponId = e.currentTarget.dataset.id
      this.setData({couponId})
   },
   selectIqGoods(e) {
      console.log(e)
      const {id, price} = e.currentTarget.dataset
      this.setData({
         iqGoodsId: id,
         iqPrice: parseInt(price)
      })
   },
   async doBuy() {
      const obj = {
         "couponId": this.data.couponId,
         "iqGoodsId": this.data.iqGoodsId
      }
      const res = await payIqGoods(obj)
      const {timeStamp, nonceStr, payPackage, signType, paySign} = res.data
      const self = this
      wx.requestPayment({
         timeStamp,
         nonceStr,
         'package': payPackage,
         signType,
         paySign,
         'success':function(res){
            wx.showToast({
               title:'支付成功'
            });
            self.getMyPeas()
         },
         'fail':function(res){
            wx.showToast({
               title:'支付失败'
            });
         }
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

   }
})