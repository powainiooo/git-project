import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const chooseImage = promisify(wx.chooseImage)
const {getMyWorks, getMyFriend} = require('../../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      page: 'works',
      topUrl: '',
      nickName: '章剑',
      avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/MvelplkvWEzHUQB7XFF9ljGmialZeKib3gOpfRickfkp5Nfwah7mfLHPTaic9kmvGu6SLmqlXhv5ia3FpRvHhf3picsQ/132',
      worksList: [],
      attentionList: [],
      pageNo: 1,
      pageSize: 20,
      pageNoAttention: 1
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      setTimeout(()=>{
         this.getWorkList()
         this.getMyFriend()
      },2000)
   },
   getWorkList() {
      const obj = {
         startPage: this.data.pageNo,
         pageSize: this.data.pageSize,
         userId: 0
      }
      getMyWorks(obj).then(res => {
         this.setData({
            worksList: res.data.pageData
         })
      })
   },
   getMyFriend() {
      const obj = {
         startPage: this.data.pageNoAttention,
         pageSize: this.data.pageSize
      }
      getMyFriend(obj).then(res => {
         this.setData({
            attentionList: res.data.pageData === null ? [] : res.data.pageData
         })
      })
   },
   async openFile() {
      const img = await chooseImage({
         count: 1
      })
      wx.uploadFile({
         url: 'https://xcx.newryun.com/api/upload/fileUp', // 仅为示例，非真实的接口地址
         filePath: img.tempFilePaths[0],
         name: 'file',
         formData: {
            fileType: '2'
         },
         header: {
            sKey: '1822043964'
         },
         success(res) {
            const data = res.data
            // do something
         }
      })
      this.setData({
         topUrl: img.tempFilePaths[0]
      })
      console.log(img)
   },
   cancelAttention() {

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