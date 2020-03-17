// pages/select/second.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
	   type: '',
	   dogList: {
	   	A: [{}, {}, {}, {}],
	   	B: [{}, {}, {}, {}],
	   	C: [{}, {}, {}, {}],
	   	I: [{}, {}, {}, {}],
	   	L: [{}, {}, {}, {}],
	   	M: [{}, {}, {}, {}],
	   	N: [{}, {}, {}, {}],
	   	O: [{}, {}, {}, {}],
	   	P: [{}, {}, {}, {}],
	   	Y: [{}, {}, {}, {}],
	   	Z: [{}, {}, {}, {}],
	   }
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
		const type = options.type || 'dog'
	   this.setData({
		   type
	   })
   },
	gotoBlock (e) {
   	const id = e.target.dataset.id
		const query = wx.createSelectorQuery()
		query.select(`#${id}`).boundingClientRect()
		query.selectViewport().scrollOffset()
		query.exec(res => {
			console.log(res)
			if (res[0] && res[1]) {
				wx.pageScrollTo({
					scrollTop: res[0].top + res[1].scrollTop - 150,
					duration: 300
				})
			}
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
