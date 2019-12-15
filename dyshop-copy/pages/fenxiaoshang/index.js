// pages/fenxiaoshang/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navIndex: 1,
    list1: [],
    page1: 1,
    bool1: false,
    list2: [],
    page2: 1,
    bool2: false,
  },
  bindnav: function(e){
    var num = e.currentTarget.dataset.num;
    this.setData({
      navIndex: num
    })
    if(this.data['list' + num].length == 0) {
      this.ajaxList()
    }
  },
  //请求数据
  ajaxList: function() {
    wx.showLoading({
      title: '正在加载',
    })
    var url = urlPath + 'api/fxpt/my_fxs'
    console.log(url)
    var index = this.data.navIndex;
    appRequest({
      url: url,
      data: {
        page: this.data['page' + index],
        type: index,
      },
      success: res => {
        wx.hideLoading();
        console.log(res)
        var list = res.data.data.result;
        var bool = false;
        if (this.data.navIndex == 1) {
          if (list<10) {
            bool = true
          }
          this.setData({
            list1: this.data.list1.concat(list),
            page1: this.data.page1+1,
            bool1: bool,
          })
        } else {
          this.setData({
            list2: this.data.list2.concat(list),
            page2: this.data.page2 + 1,
            bool2: bool,
          })
        }
      },
    }, this.ajaxList)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
    this.ajaxList()
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
    if (this.data['bool' + this.data.navIndex]) return false;
    this.ajaxList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})