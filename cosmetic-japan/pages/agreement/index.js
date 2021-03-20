// pages/agreement/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  var url = urlPath + '/api/index/sm'
	  appRequest({
		  url: url,
		  data: { type: 1 },
		  success: res => {
			  console.log('res', res)
			  var _desc = res.data.data.desc;
			  var _desc = _desc.replace(new RegExp('src="/upload/image', 'g'), 'src="' + urlPath + '/upload/image');
			  WxParse.wxParse('desc', 'html', _desc, this, 0);
			  // this.setData({
			  //   cont: res.data.data.help.content
			  // })
			  console.log('_desc',_desc)
		  },
	  })
  },

	confirm () {
		wx.navigateBack({
			delta: -1
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
