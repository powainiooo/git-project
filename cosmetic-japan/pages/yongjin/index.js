// pages/yongjin/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    zhye: '',
    dj_money: '',
    max_withdraw: '',
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
    var url = urlPath + '/api/index/my_yj'
    appRequest({
      url: url,
      success: res => {
        var info = res.data.data;
        this.setData({
          zhye: info.zhye,
          dj_money: info.dj_money,
          max_withdraw: info.max_withdraw,
        })
        console.log(res)
      },
    })
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

  }
})
