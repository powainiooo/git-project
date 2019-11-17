// pages/index/detail.js
const app = getApp()
const common = require('common')
Page({
   behaviors: [common],
   /**
   * 页面的初始数据
   */
   data: {
      id: -1,
      headerBtns: ['share', 'close'],
   },
   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      console.log(options)
      this.data.id = options.id || options.scene
      // this.data.id = '283'
      this.getDetailData(this.data.id)
   },
   // 响应顶部按钮点击
   headBtn (e) {
      if (e.detail === 'close') {
         wx.navigateBack({
            url: '/pages/index/index'
         })
      } else if (e.detail === 'arrow') {
         const ticket = this.selectComponent("#ticket")
         const footer = this.selectComponent("#footer")
         if (this.data.detailPage === 'buy') {
            ticket.togglePage('detail')
            footer.togglePage('detail')
            this.setData({
               headerBtns: ['share', 'close']
            })
         } else if (this.data.detailPage === 'drink') {
            ticket.togglePage('buy')
            footer.togglePage('buy')
            this.data.detailPage = 'buy'
         }
      } else if (e.detail === 'poster') {
         this.drawPoster()
      }
   },
})
