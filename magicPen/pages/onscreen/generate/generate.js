// pages/onscreen/generate/generate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    originX: 0,
    originY: 0,
    scale: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  coverLoad(e) {
    const {width, height} = e.detail
    const [x, y, w, h] = [338, 268, 329, 332]
    const originX = ((x + w/2)/width*100).toFixed(2)
    const originY = ((y + h/2)/height*100).toFixed(2)
    const scale = width/w
    console.log(scale)
    this.setData({originX, originY, scale})
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