import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const chooseImage = promisify(wx.chooseImage)
const getLocation = promisify(wx.getLocation)
const {getMyWorks, getMyFriend, getUserInterspaceInfo, addAttention, fileUp, uploadTopImg, getFuhuoIqAndZhaohuanIq, payFuHuo, deleteWorks} = require('../../../utils/api.js')
// const userStar = wx.getStorageSync('userStar')
const app = getApp()
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false
audio.src = app.globalData.audioSrc.thumbup
Page({

   /**
    * 页面的初始数据
    */
   data: {
      isUser: true,
      attentionThisUser: false,
      userId: 0,
      dyn: 0,
      isLoading: false,
      page: 'works',
      topUrl: '',
      nick: '',
      grade: 0,
      zanSum: 0,
      zanSumTxt: 0,
      zanDis: 0,
      fans: 0,
      fuhuoIq: 0,
      avatarUrl: '',
      userDynSum: 0,
      worksList: [],
      attentionList: [],
      pageNo: 1,
      pageSize: 20,
      pageAll: 1,
      pageNoAttention: 1,
      pageAllAttention: 1,
      tuzhiNu: '',
      showModal: false,
      modalType: 'cost',
      modalContent: 'cost',
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options)
      this.data.userId = options.userId || 0;
      this.data.dyn = options.dyn || 2;
      this.getWorkList()
      this.getPersonInfo()
      if (this.data.userId === 0) {
         this.getMyFriend()
         this.getFuhuoIqAndZhaohuanIq()
      }
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
         let list = res.data === null ? [] : res.data.pageData
         this.setData({
            isLoading: false,
            worksList: this.data.worksList.concat(list),
            pageAll: res.data === null ? 1 : res.data.pageSum
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
         let list = res.data === null ? [] : res.data.pageData
         this.setData({
            isLoading: false,
            attentionList: this.data.attentionList.concat(list),
            pageAllAttention: res.data === null ? 1 : res.data.pageSum
         })
      })
   },
   getPersonInfo() {
      getUserInterspaceInfo({
         userId: this.data.userId,
         isReadDyn: this.data.dyn,
      }).then(res => {
         const {topUrl, nick, grade, zanSum, fans, avatarUrl, isAttention, zanSumAdd, userDynSum} = res.data
         this.setData({
            topUrl: topUrl ? topUrl : '',
            nick,
            grade,
            zanSum,
            fans,
            avatarUrl,
            userDynSum,
            attentionThisUser: isAttention,
            zanSumTxt: zanSum - zanSumAdd
         })
         if (this.data.isUser) {
            setTimeout(()=>{
               this.setFansMove(zanSumAdd)
            }, 1500)

            const myDynData = wx.getStorageSync('myDynData')
            myDynData.userDynSum = userDynSum
            wx.setStorage({
               key:'myDynData',
               data: myDynData
            })
         } else {
            this.setData({
               zanSumTxt: zanSum
            })
         }

      })
   },
   setFansMove (dis) {
      if (dis > 0) {
         this.setData({
            zanDis: dis
         })
         setTimeout(()=>{
            this.setData({
               zanSumTxt: this.data.zanSum
            })
         }, 2200)
      } else {
         this.setData({
            zanSumTxt: this.data.zanSum
         })
      }
   },
   getFuhuoIqAndZhaohuanIq() {
      getFuhuoIqAndZhaohuanIq().then(res => {
         const {fuhuoIq} = res.data
         this.setData({fuhuoIq})
      })
   },
   async openFile() {
      if(!this.data.isUser) return;
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
      addAttention(this.data.userId).then(res => {
         this.setData({
            attentionThisUser: true
         })
         wx.showToast({
            title: '关注成功',
            icon: 'success',
            duration: 2000
         })
      })
   },
   changePage (e) {
      this.setData({
         page: e.currentTarget.dataset.page
      })
   },
   doRevive (e) {
      const {tuzhiNu, freeFuhuoState} = e.detail
      const msg = freeFuhuoState === 2 ? '第一次免费复活哟！': `是否花费${this.data.fuhuoIq}智力币复活？`
      this.setData({
         tuzhiNu,
         showModal: true,
         modalType: 'cost',
         modalContent: msg,
      })
   },
   closeModal () {
      this.setData({
         showModal: false,
      })
   },
   modalConfirm () {
      if (this.data.modalType === 'hint') {
         this.closeModal()
      } else if (this.data.modalType === 'recharge') {
         this.gotoRecharge()
      } else if (this.data.modalType === 'cost') {
         this.doBuy()
      } else if (this.data.modalType === 'del') {
         this.confimDelwork()
      }
   },
   gotoRecharge () {
      wx.navigateTo({
         url: '/pages/recharge/recharge'
      })
   },
   async doBuy () {
      const {longitude, latitude} = await getLocation({
         type: 'gcj02',
      })
      const payRes = await payFuHuo(`${longitude},${latitude}`, this.data.tuzhiNu)
      if(payRes.code === 0) {
         this.setData({
            showModal: true,
            modalType: 'hint',
            modalContent: payRes.msg,
         })
      }else {
         if (payRes.code === 988) {
            this.setData({
               showModal: true,
               modalType: 'recharge',
               modalContent: '智力币不足，是否前往充值？',
            })
         } else {
            this.setData({
               showModal: true,
               modalType: 'hint',
               modalContent: payRes.msg,
            })
         }
      }
   },
   getwork () {
      this.data.pageNo = 1
      this.data.worksList = []
      this.getWorkList()
   },
   delwork (e) {
      const {tuzhiNu} = e.detail
      this.setData({
         tuzhiNu,
         showModal: true,
         modalType: 'del',
         modalContent: '是否确认删除作品？',
      })
   },
   confimDelwork () {
      deleteWorks(this.data.tuzhiNu).then(res => {
         this.getwork()
         this.closeModal()
      })
   },
   gotoMedal () {
      wx.navigateTo({
         url: '/pages/medal/medal?userId='+this.data.userId
      })
   },
   thumbup () {
      audio.play()
   },
   doShare (e) {

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
         if(this.data.pageNo < this.data.pageAll){
            this.getWorkList()
         }

      } else if (this.data.page === 'attention') {
         this.data.pageNoAttention ++
         if(this.data.pageNoAttention < this.data.pageAllAttention) {
            this.getMyFriend()
         }
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function (e) {
      const {id, url, name} = e.target.dataset
      return {
         title: name,
         imageUrl: url,
         path:'/pages/works/detail/detail?id='+id
      }
   }
})