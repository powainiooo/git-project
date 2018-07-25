// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleEn:'',
    titleCn:'',
    pageName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = options.page || 'ticketSuc',titleEn,titleCn;
    if(page == 'ticketSuc' || page == 'drinkSuc'){
      titleEn = 'Payment\nSuccess!';
      titleCn = '支付成功！';
    }else if(page == 'insuredSuc'){
      titleEn = 'Insured\nSuccess!';
      titleCn = '投保成功！';
    }
    this.setData({
      titleEn:titleEn,
      titleCn:titleCn,
      pageName:page
    })
  },
  gotoInsured(){
    wx.navigateTo({
      url: '/pages/insured/insured'
    })
  },
  backIndexDetail(){
    wx.reLaunch({
      url: '/pages/order-ticket/detail'
    })
  },
  backIndex(){
    wx.reLaunch({
      url: '/pages/index/index'
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