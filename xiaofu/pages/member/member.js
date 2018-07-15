// pages/member/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleEn:'',
    titleCn:'',
    content:'',
    page:''
  },
  makePhoneCall: function () {
    var that = this
    wx.makePhoneCall({
      phoneNumber: '13112341234',
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = options.page,titleEn,titleCn,content;
    if(page == 'member'){
      titleEn = 'Member of \n Ho';
      titleCn = '隶属于';
      content = '隶属于 内容区域';
    } else if (page == 'insurance') {
      titleEn = 'insurance \n Act';
      titleCn = '保险条例';
      content = '保险条例 内容区域';
    } else if (page == 'aftersales') {
      titleEn = 'After \n Sales';
      titleCn = '售后服务';
      content = '售后服务 内容区域';
    } else if (page == 'contact') {
      titleEn = 'Contact \n Information';
      titleCn = '联系方式';
      content = '';
    }
    this.setData({
      titleEn: titleEn,
      titleCn: titleCn,
      content: content,
      page:page
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