import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const chooseImage = promisify(wx.chooseImage)
const {getMyWorks, getMyFriend, getUserInterspaceInfo, addAttention, fileUp, uploadTopImg} = require('../../../utils/api.js')
Page({

   /**
    * 页面的初始数据
    */
   data: {
      isUser: true,
      attentionThisUser: false,
      userId: 0,
      isLoading: false,
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
      this.setData({
         isLoading: true
      })
      const obj = {
         startPage: this.data.pageNo,
         pageSize: this.data.pageSize,
         userId: this.data.userId
      }
      getMyWorks(obj).then(res => {
         let list = res.data.pageData === null ? [] : res.data.pageData
         this.setData({
            isLoading: false,
            worksList: this.data.worksList.concat(list)
         })
      })
   },
   getMyFriend() {
      this.setData({
         isLoading: true
      })
      const obj = {
         startPage: this.data.pageNoAttention,
         pageSize: this.data.pageSize
      }
      getMyFriend(obj).then(res => {
         let list = res.data.pageData === null ? [] : res.data.pageData
         this.setData({
            isLoading: false,
            attentionList: this.data.attentionList.concat(list)
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
      const data = await fileUp(img.tempFilePaths[0], '1')
      if(data.code === 0) {
         this.setData({
            topUrl: data.data
         })
         uploadTopImg(data.data).then(res => {

         })
      }
   },
   addAttention() {
      addAttention({userId: this.data.userId}).then(res => {
         this.setData({
            attentionThisUser: true
         })
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
      if (this.data.page === 'works') {
         this.data.pageNo ++
         this.getWorkList()
      } else if (this.data.page === 'attention') {
         this.data.pageNoAttention ++
         this.getMyFriend()
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})