// pages/interaction/interaction.js
const {getUserAsset, getFuhuoIqAndZhaohuanIq, getMyWorksScene} = require('../../utils/api.js')
import regeneratorRuntime from '../../utils/runtime.js'
const {promisify} = require('../../utils/util.js')
const getLocation = promisify(wx.getLocation)
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentKey: 'call',
      myPeas: 0,
      fuhuoIq: 0,
      zhaohuanIq: 0,
      pageNoCall: 1,
      pageSize: 20,
      callListData: []
   },
   swiperChange(e) {
      const {currentKey} = e.detail
      this.setData({currentKey})
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getUserAsset()
      this.getFuhuoIqAndZhaohuanIq()
      this.getMyWorksScene()
   },
   getUserAsset () {
      getUserAsset().then(res=>{
         this.setData({
            myPeas: res.data
         })
      })
   },
   getFuhuoIqAndZhaohuanIq() {
      getFuhuoIqAndZhaohuanIq().then(res => {
         const {fuhuoIq, zhaohuanIq} = res.data
         this.setData({fuhuoIq, zhaohuanIq})
      })
   },
   async getMyWorksScene () {
      const {longitude, latitude} = await getLocation()
      const callRes = await getMyWorksScene({
         startPage: this.data.pageNoCall,
         pageSize: this.data.pageSize,
         coord: '114.0281724930,22.6092965074'
      })
      this.setData({
         callListData: callRes.data.pageData
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