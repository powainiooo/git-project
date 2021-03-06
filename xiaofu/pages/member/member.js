// pages/member/member.js
const app = getApp()
Page({
   /**
   * 页面的初始数据
   */
   data: {
      titleEn: '',
      titleCn: '',
      content: '',
      mail: '',
      phone: '',
      wechat: '',
      page: ''
   },
   makePhoneCall: function (e) {
      wx.makePhoneCall({
         phoneNumber: e.currentTarget.dataset.phone,
         success: function () {
            console.log('成功拨打电话')
         }
      })
   },

   /**
   * 生命周期函数--监听页面加载
   */
   onLoad: function (options) {
      let page = options.page || 'contact'
      let titleEn
      let titleCn
      if (page === 'member') {
         titleEn = 'Member of \n Ho'
         titleCn = '隶属于'
      } else if (page === 'insurance') {
         titleEn = 'insurance \n Act'
         titleCn = '保险条例'
      } else if (page === 'aftersales') {
         titleEn = 'After \n Sales'
         titleCn = '售后服务'
      } else if (page === 'contact') {
         titleEn = 'Contact \n Information'
         titleCn = '联系方式'
      }
      this.setData({
         titleEn: titleEn,
         titleCn: titleCn,
         mail: '',
         phone: '',
         wechat: '',
         page: page
      })
      this.getData(page)
   },
   getData (src) {
      if (src === 'insurance') return
      let self = this
      wx.showNavigationBarLoading()
      wx.request({
         url: app.globalData.ajaxSrc + '/' + src, // 仅为示例，并非真实的接口地址
         success: function (res) {
            if (src === 'contact') {
               let contact = res.data.data[src]
               let mail = contact.match(/邮箱：\S*；/)[0].replace('邮箱：', '').replace('；', '')
               let phone = contact.match(/电话：\S*；/)[0].replace('电话：', '').replace('；', '')
               let wechat = contact.match(/微信号：\S*；/)[0].replace('微信号：', '').replace('；', '')
               self.setData({
                  mail: mail,
                  phone: phone,
                  wechat: wechat
               })
            } else {
               self.setData({
                  content: res.data.data[src]
               })
            }
            wx.hideNavigationBarLoading()
         },
         fail () {
            wx.navigateTo({
               url: '/pages/error/error'
            })
         }
      })
   },
   download () {
      wx.showNavigationBarLoading()
      wx.downloadFile({
         url: 'https://wechat.leesticket.com/static/download/file.docx',
         success: function (res) {
            wx.hideNavigationBarLoading()
            if (res.statusCode === 200) {
               wx.saveFile({
                  tempFilePath: res.tempFilePath,
                  success: function (res) {
                     let savedFilePath = res.savedFilePath
                     wx.openDocument({
                        filePath: savedFilePath,
                        success: function (res) {
                           console.log('打开文档成功')
                        }
                     })
                  }
               })
            }
         }
      })
   },
   doCopy (e) {
      wx.setClipboardData({
         //准备复制的数据
         data: e.currentTarget.dataset.text,
         success: function (res) {
            wx.showToast({
               title: '复制成功',
            });
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
