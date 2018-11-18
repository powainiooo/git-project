// pages/store/store.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lnglat:[114.053987,22.533577],
    shopList:[],
    selectId:0
  },
  //下一步
  doNext(){
    app.globalData.storeId = this.data.selectedID;
    wx.navigateTo({
      url: '/pages/date/date'
    })
  },
  //打开地图
  openMap(e){
    setTimeout(function(){
      let lnglat = e.currentTarget.dataset.lnglat;
      wx.openLocation({
        latitude: lnglat[1],
        longitude: lnglat[0],
        scale: 28
      })
    },150);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData(){
    wx.request({
        url:app.globalData.ajaxSrc+"shop_list",
        data:{page:1},
        success:res=>{
            this.setData({
              shopList:res.data.data.list
            })
        }
    })
  },
  doSelect(e){
    let id = e.target.dataset.id;
    this.setData({
      selectId:id
    })
  },
  doCancel(){
    this.setData({
      selectId:0
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