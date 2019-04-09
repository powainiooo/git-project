// pages/onscreen/list/list.js
const {getPsdList} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
Page({

   /**
    * 页面的初始数据
    */
   data: {
      listData: [],
      selectData: {}
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log('list')
      this.getData()
   },
   async getData() {
      console.log('getData')
      const {longitude, latitude, accuracy} = await getLocation({
         type: 'gcj02',
      })
      //113.266531 23.132191
      console.log(longitude,latitude, accuracy)
      getPsdList(`114.0422219038,22.518657195`).then(res => {
         this.setData({
            listData: res.data,
            selectData: res.data[0]
         })
      })
   },
   changePsd (e) {
      const {index} = e.currentTarget.dataset
      this.setData({
         selectData: this.data.listData[index]
      })
   },
   gotoDetail () {
      const app = getApp()
      app.globalData.generateData = this.data.selectData
      wx.navigateTo({
         url: '/pages/onscreen/generate/generate'
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