// pages/dreamBox/dreamBox.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  imgSrc: '',
	  statusBarHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  wx.getSystemInfo({
		  success: e => {
			  this.setData({
				  statusBarHeight: e.statusBarHeight + 100
			  })
		  }
	  })
	  this.setData({
		  imgSrc: `${app.globalData.imgSrc}images/dinzhi.jpg?${Math.random()}`
	  })
  },
	wxappTo () {
		wx.navigateToMiniProgram({
			appId: 'wxf5f0af8af285a2e6',
			success () {
				console.log('to other wxapp success,')
			}
		})
	},
	goBack () {
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
