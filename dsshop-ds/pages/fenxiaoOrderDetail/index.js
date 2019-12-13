// pages/myOrderDetail/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    address: {},
    goods_list: [],
    info: {},
  },

  ajaxData: function(){
    var url = urlPath + 'api/fxpt/fxs_order_detail'
    appRequest({
      url: url,
      data: {
        id: this.data.id
      },
      success: res => {
        tt.hideLoading()
        console.log(res)
        this.setData({
          address: res.data.data.address,
          goods_list: res.data.data.goods_list,
          info: res.data.data.info,
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id,
    })
    tt.showLoading({
      title: '正在加载',
    })
    this.ajaxData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
