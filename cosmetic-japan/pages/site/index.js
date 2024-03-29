// pages/site/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '深圳市', '南山区'],
    customItem: '全部',
    iphone: "",
    name: "",
    addresslist: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  name: function (e) {
    console.log(e)
    this.setData({
      name: e.detail.value
    })
  },

  iphone: function (e) {
    this.setData({
      iphone: e.detail.value
    })
  },

  addresslist: function (e) {
    this.setData({
      addresslist: e.detail.value
    })
    this.map();
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

  }
})
