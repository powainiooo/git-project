// pages/order-drink/detail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemData:{},
    imgSrc:app.globalData.imgSrc
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let oid = options.oid;
    console.log(oid);
    this.getDetailData(oid);
  },
  getDetailData(id){
    let self = this;
    wx.request({
        url:app.globalData.ajaxSrc+"/order_info",
        data:{
          oid:id
        },
        success:res=>{
          let data = res.data;
          self.setData({
            itemData:data.data
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