// pages/information/remarks.js
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
	   remarks: '',
      price: app.globalData.proPackage.price
   },
	inputChange(e){
		let name = e.currentTarget.dataset.name;
		let value = e.detail.value;
		this.data[name] = value;
	},
	doNext(){
		app.globalData.buyerInfo.remarks = this.data.remarks;
		wx.navigateTo({
			url: '/pages/order/confirm'
		})
	},
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.setData({
         price: app.globalData.proPackage.price
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
