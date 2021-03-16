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
    price:'',
    logo:null,
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

    let www = { method: 'pj_order', canshu: '' };
    var data = {id:id, pj_xx:pj_xx};
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
        img: options.img,
	      price: options.price,
	      logo: options.logo,
	      starNum: options.pj_xx,
	      isNull:false
      })
    }else{
      wx.navigateBack({
        delta: 1,
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

  }
})
