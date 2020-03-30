// pages/requires/requires.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
		list: [
			'宠物健康状态良好',
			 '年满3个月 及 已完成疫苗注射',
			 '距上次打针 及 体内驱虫已满2周',
			 '居住环境已适应1个月',
			 '非临产或哺乳期',
			 '术后得到医生批准',
			 '未在发情期',
		]
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
	doOrder () {
		wx.reLaunch({
			url: '/pages/store/store'
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
