import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const chooseImage = promisify(wx.chooseImage)
const {getMyWorks, getMyFriend, getUserInterspaceInfo, addAttention, cancelAttention, fileUp, uploadTopImg} = require('../../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      isUser: true,
      attentionThisUser: false,
      userId: 0,
      page: 'works',
      topUrl: '',
      nick: '章剑',
      zanSum: 0,
      fans: 0,
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
      this.data.userId = options.id || 0;
      setTimeout(()=>{
         this.getWorkList()
         this.getPersonInfo()
         if (this.data.userId === 0) {
            this.getMyFriend()
         }
      },2000)
      this.setData({
         isUser: this.data.userId === 0
      })
   },
   getWorkList() {
      const obj = {
         startPage: this.data.pageNo,
         pageSize: this.data.pageSize,
         userId: this.data.userId
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
   getPersonInfo() {
      getUserInterspaceInfo({userId: this.data.userId}).then(res => {
         const {topUrl, nick, zanSum, fans, avatarUrl, isAttention} = res.data
         this.setData({
            topUrl: topUrl ? topUrl : '',
            nick,
            zanSum,
            fans,
            avatarUrl,
            attentionThisUser: isAttention ? true : false
         })
      })
   },
   async openFile() {
      const img = await chooseImage({
         count: 1
      })
      const data = await fileUp(img.tempFilePaths[0], '2')
      if(data.code === 0) {
         this.setData({
            topUrl: data.data
         })
         uploadTopImg(data.data).tehn(res => {

         })
      }
   },
   addAttention() {
      addAttention({userId: this.data.userId}).then(res => {

      })
   },
   changePage (e) {
      this.setData({
         page: e.currentTarget.dataset.page
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
      console.log('123')
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})