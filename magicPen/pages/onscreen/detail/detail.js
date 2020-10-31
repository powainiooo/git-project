// pages/onscreen/detail/detail.js
const {getSharePsdByOrderNu} = require('../../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      psdOrderNu: '',
      itemData: null,
      cameraAni: {},
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.data.psdOrderNu = options.id || 'sbhh201904042216291546124319'
      this.getData()
   },
   getData () {
      getSharePsdByOrderNu({psdOrderNu: this.data.psdOrderNu}).then(res => {
         const [x, y, w, h] = res.data.pngCoordinate.split(',')
         const camera = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
         })
         camera.width(`${w}rpx`).height(`${h}rpx`).top(`${y}rpx`).left(`${x}rpx`).step()
         this.setData({
            itemData: res.data,
            cameraAni: camera
         })
      })
   },
   gotoPerson () {
      wx.navigateTo({
         url: '/pages/works/list/list?userId='+this.data.itemData.userId
      })
   },
   gotoHome () {
      wx.navigateTo({
         url: '/pages/index/index'
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
	onShareAppMessage () {
		return {
			title: '神笔画画',
			path: `/pages/index/index`
		}
	}
})
