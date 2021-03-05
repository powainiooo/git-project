// pages/myCoupon/index.js
const appRequest = getApp().request;
const util = require('../../utils/util.js');
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
	  imgUrl,
    page: 1,
    list: [],
  },

  ajaxList(){
    var url = urlPath + '/api/index/yhq_list'
    var param = {
      id: this.data.id,
      isCN: wx.getStorageSync('isCN')
    }
    appRequest({
      url: url,
      data: param,
      success: res => {
        var data = res.data.data;
        const now = new Date().getTime()
        for(var i in data){
        	const t = data[i].yx_time * 1000
          data[i].yx_time = util.fTime(new Date(t));
	        data[i].isValid = t >= now
        }
        this.setData({
          list: data
        })
      },
    })
  },

  // 领取优惠券
  lingquTap:function(e){
    var index = e.currentTarget.dataset.index;
    var list = this.data.list;
    if (list[index].flag == 0){
      var url = urlPath + '/api/index/lq_yhq'
      var param = {
        id: list[index].id,
        isCN: wx.getStorageSync('isCN')
      }
      appRequest({
        url: url,
        data: param,
        success: res => {
          wx.showToast({
            title: '领取成功！',
            icon: 'none'
          })
          setTimeout(()=>{
            this.ajaxList();
          },2000)
        },
      })
    }else{
      // wx.reLaunch({
      //   url: '../index/index',
      // })
      wx.navigateBack()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: 0,
      isCN: wx.getStorageSync('isCN')
    }, ()=>{
      this.ajaxList()
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

  }
})
