// pages/result/result.js
const app = getApp();
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
    let page = options.page || 'login',titleEn,titleCn;
    if(page == 'ticketSuc' || page == 'drinkSuc'){
      titleEn = 'Payment\nSuccess!';
      titleCn = '支付成功！';
    }else if(page == 'insuredSuc'){
      titleEn = 'Insured\nSuccess!';
      titleCn = '投保成功！';
    }else if(page == 'login'){
      titleEn = 'Authorization';
      titleCn = '授权申请';
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
      url: '/pages/index/index'
    })
  },
  backIndex(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  gotoDrink(){
    wx.reLaunch({
      url: '/pages/drink/index'
    })
  },
  onGotUserInfo(e){
    app.globalData.userInfo = e.detail.userInfo;
    wx.request({
      url: app.globalData.ajaxSrc + '/wxuser_add',
      data: {
        openid: app.globalData.userOpenID,
        country: e.detail.userInfo.country,
        province: e.detail.userInfo.province,
        city: e.detail.userInfo.city,
        gender: e.detail.userInfo.gender,
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl
      },
      success: res => {
        const routers = getCurrentPages();
        console.log(routers);
        let url = '';
        if(routers[0].options.scene){
          url = '/'+routers[0].route+'?id='+routers[0].options.scene
        }else{
          url = '/pages/index/index'
        }
        wx.redirectTo({
          url: url
        })
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
  },
  closeApp(){
    console.log('close')
    wx.navigateBack({
      delta: -1
    });
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