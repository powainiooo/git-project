// pages/order-drink/order.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
    imgSrc:app.globalData.imgSrc
  },
  gotoDetail(e){
    wx.navigateTo({
      url: '/pages/order-drink/detail?oid='+e.currentTarget.dataset.id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userOpenID != null){
      this.getListData();
    }

    app.userInfoReadyCallback = res => {
      this.getListData();
    }
  },
  getListData(){
    let self = this;
    wx.showNavigationBarLoading();
    wx.request({
      url:app.globalData.ajaxSrc+"/order_center",
      data:{
        openid:app.globalData.userOpenID
      },
      success:res=>{
        let list = res.data.data.list;
        this.setData({
          listData:list
        });
        wx.hideNavigationBarLoading();
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
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
});