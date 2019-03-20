// pages/recharge/recharge.js
import regeneratorRuntime from '../../utils/runtime.js'
const {getIqGoods, payIqGoods} = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iqGoodsId: '',
    iqPrice: 0,
    iqGoodsVos: [],
    couponId: '',
    couponUserVos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getData()
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
      "couponId": '',
      "iqGoodsId": 8
    }
    const res = await payIqGoods(obj)
    const {timeStamp, nonceStr, payPackage, signType, paySign} = res.data
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