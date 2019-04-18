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
      userIqAdd: 0,
      iqPrice: 0,
      iqGoodsVos: [],
      couponId: '',
      fullMoney: 0,
      couponUserVos: [],
      showIqAdd: false
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
      const couponId = e.currentTarget.dataset.id
      const fullMoney = e.currentTarget.dataset.price
      this.setData({
         couponId,
         fullMoney
      })
   },
   selectIqGoods(e) {
      const {id, price, peas} = e.currentTarget.dataset
      const couponId = this.data.fullMoney > price ? '' : this.data.couponId
      this.setData({
         iqGoodsId: id,
         iqPrice: Number(price),
         userIqAdd: peas,
         couponId
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
            self.setData({
               showIqAdd: true,
            })
            setTimeout(()=>{
               self.setData({
                  showIqAdd: false,
                  userIq: self.data.userIq + self.data.userIqAdd,
               })
            }, 2000)
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