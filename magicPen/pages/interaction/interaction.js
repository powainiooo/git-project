// pages/interaction/interaction.js
const {getUserAsset, getFuhuoIqAndZhaohuanIq, getMyWorksScene, getZhaoHuanWorks} = require('../../utils/api.js')
import regeneratorRuntime from '../../utils/runtime.js'
const {promisify} = require('../../utils/util.js')
const getLocation = promisify(wx.getLocation)
const app = getApp()
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false
audio.src = app.globalData.audioSrc.wheelActive
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentKey: 'photo',
      myPeas: 0,
      fuhuoIq: 0,
      zhaohuanIq: 0,
      pageNoCall: 1,
      pageSize: 20,
      reviveData: {},
      callResData: {},
      funcMove: {},
   },
   swiperChange(e) {
      const {currentKey} = e.detail
      const hide = wx.createAnimation({
         duration: 0,
         timingFunction: 'ease',
      })
      hide.opacity(0).step()
      this.setData({
         currentKey,
         funcMove: hide.export()
      })
      wx.nextTick(()=>{
         const show = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
         })
         show.opacity(1).step()
         this.setData({
            funcMove: show.export()
         })
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getUserAsset()
      this.getFuhuoIqAndZhaohuanIq()
      this.getMyWorksScene()
   },
   resetAsset () {
      this.getUserAsset()
      this.showActive()
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
      const {longitude, latitude} = await getLocation({
         type: 'gcj02',
      })
      getMyWorksScene({
         startPage: this.data.pageNoCall,
         pageSize: this.data.pageSize,
         coord: `${longitude},${latitude}`
         // coord: `114.0422219038,22.5186571950`
      }).then(res => {
         this.setData({
            reviveData: res
         })
      })
      getZhaoHuanWorks(`114.0422219038,22.5186571950`).then(res => {
         this.setData({
            callResData: res
         })
      })
   },
   showActive () {
      this.selectComponent('#swiper').doActive()
      audio.play()
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