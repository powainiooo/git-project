// pages/package/package.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      {
        id:1,
        price:50,
        isRecommond:true
      },
      {
        id:2,
        price:60,
        isRecommond:false
      }
    ],
    selectedId:-1,
    selectedPrice:0
  },
  doselected(e){
    let id = e.currentTarget.dataset.id;
    let price = e.currentTarget.dataset.price;
    this.setData({
      selectedId:id,
      selectedPrice:price
    });
  },
  //下一步
  doNext(){
    wx.navigateTo({
      url: '/pages/information/information'
    })
  },
  gotoSelect(){
    wx.navigateTo({
      url: '/pages/select/select'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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