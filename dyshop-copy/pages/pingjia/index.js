// pages/pingjia/index.js
const appRequest = getApp().request;
const www = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
const api = require('../../utils/api.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    www:www,
    starNum:5,
    content:'',
    id:null,
    img:'',
    isNull:true,
    isCN:wx.getStorageSync('isCN')
  },

  // 星星选择
  starTap:function(e){
    if (!this.data.content){
      var num = e.currentTarget.dataset.num;
      this.setData({
        starNum: num
      })
    }
  },

  //评价内容
  inputContent:function(e){
    var content = e.detail.value;
    this.setData({
      content: content
    })
  },

  //提交评价
  fabuTap:function(){
    var id = this.data.id;
    var pj_xx = this.data.starNum;
    var content = this.data.content;
    if (content == '' && content.length == 0){
      wx.showToast({
        title: '评价内容不能为空',
        icon: 'none'
      })
      return false;
    }
  
    let www = { method: 'pj_order', canshu: '' };
    var data = {id:id, pj_xx:pj_xx, content:content};
    let huidiao = (ret) => {
      wx.redirectTo({
        url: '../myOrder/index',
      })
    }
    api.post(this, www, data, huidiao);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && !!options.id){
      this.setData({
        id: options.id,
        img: options.img
      })
    }else{
      wx:wx.navigateBack({
        delta: 1,
      })
    }
    console.log(options.pj_xx);
    if (options && !!options.content && !!options.pj_xx){
      this.setData({
        content: options.content,
        starNum: options.pj_xx,
        isNull:false
      })
    }
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