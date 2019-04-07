// pages/onscreen/generate/generate.js
const {checkPsd, payPsdGoods, psdUpTv, fileUp} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
const canvasToTempFilePath = promisify(wx.canvasToTempFilePath)
const downloadFile = promisify(wx.downloadFile)
Page({

   /**
    * 页面的初始数据
    */
   data: {
      showCamera: false,
      cameraAni: {},
      coverAni: {},
      photos: "",
      photosInfo: [],
      photosWidth: 0,
      photosHeight: 0,
      generateData: null,
      showBottom: false,
      showBottom2: false,
      functType: 1,
      modalContent: '',
      showModal: false,
      count: 0,
      recordTime: 3,
      videos: '',
      isSaving: false,
      canShare: false,
      psdOrderNu: '',
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const {generateData} = getApp().globalData
      this.setData({generateData})
      // setTimeout(()=>{
      //    this.coverAnimation()
      // },1000)
   },
   closeModal () {
      this.setData({
         showModal: false,
      })
   },
   coverAnimation() {
      const [padding, moduleWidth, moduleHeight] = [20, 750, 1333]
      const showWidth = 750 - padding*2
      const [x, y, w, h] = this.data.generateData.pngCoordinate.split(',')

      const scale = showWidth / w
      //摄像机动画
      const camera = wx.createAnimation({
         duration: 0,
         timingFunction: 'ease',
      })
      const cameraHeight = `${showWidth * h / w}rpx`
      camera.width(`${showWidth}rpx`).height(cameraHeight).top(`${padding}rpx`).left(`${padding}rpx`).step()
      //遮罩图动画
      const cover = wx.createAnimation({
         duration: 1000,
         timingFunction: 'ease',
      })
      cover
          .width(`${moduleWidth * scale}rpx`)
          .height(`${moduleHeight * scale}rpx`)
          .top(`-${y * scale - padding}rpx`)
          .left(`-${x * scale - padding}rpx`)
          .step()

      this.setData({
         cameraAni: camera.export(),
         coverAni: cover.export(),
         photosInfo: [x, y, w, h]
      })
      setTimeout(()=>{
         this.setData({
            showCamera: true,
            showBottom: true,
         })
      },1500)
   },
   takePhoto() {
      console.log('takePhoto')
      this.setData({
         functType: 1
      })
      const self = this
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
         quality: 'high',
         success: (res) => {
            console.log(res)
            self.setData({
               photos: res.tempImagePath,
               showCamera: false,
               showBottom: false,
            })
            this.zoomBack()
         }
      })
   },
   takeVideo () {
      const ctx = wx.createCameraContext()
      ctx.startRecord()
      this.setData({
         count: this.data.recordTime,
         functType: 2
      })
      const t = setInterval(()=>{
         if(this.data.count === 0) {
            clearInterval(t)
            ctx.stopRecord({
               success: (res) => {
                  console.log(res.tempVideoPath)
                  this.setData({
                     videos: res.tempVideoPath,
                     showCamera: false,
                     showBottom: false,
                  })
                  this.zoomBack()
               }
            })
         }else {
            this.setData({
               count: this.data.count - 1
            })
         }
      }, 1000)
   },
   async doBuy() {
      wx.showLoading({
         title: '请求中'
      })
      const {longitude, latitude} = await getLocation()
      const checkRes = await checkPsd({
         psdId: this.data.generateData.psdId,
         coord: `${longitude},${latitude}`
         // coord: `114.0281724930,22.6092965074`
      })
      if(checkRes.code === 0){
         const payData = `psdId=${this.data.generateData.psdId}&isTutorials=${this.data.generateData.isTutorials}&functType=${this.data.functType}`
         const payRes = await payPsdGoods(payData)
         if(payRes.code === 0) {
            const urlRes = await fileUp(this.data.photos, this.data.functType)
            if(urlRes.code === 0) {
               const upRes = await psdUpTv({
                  coord: `${longitude},${latitude}`,
                  // coord: `114.0281724930,22.6092965074`,
                  materialUrl: urlRes.data,
                  psdOrderNu: payRes.data.psdOrderNu
               })
               this.setData({
                  canShare: true,
                  psdOrderNu: payRes.data.psdOrderNu,
                  showModal: true,
                  modalContent: upRes.msg,
               })
            }
         }
      }
      wx.hideLoading()
   },
   zoomBack () {
      wx.nextTick(()=>{
         const [x, y, w, h] = this.data.generateData.pngCoordinate.split(',')
         //摄像机动画
         const camera = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
         })
         camera.width(`${w}rpx`).height(`${h}rpx`).top(`${y}rpx`).left(`${x}rpx`).step()
         //遮罩图动画
         const cover = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
         })
         cover
             .width(`750rpx`)
             .height(`1333rpx`)
             .top(`0rpx`)
             .left(`0rpx`)
             .step()

         this.setData({
            cameraAni: camera.export(),
            coverAni: cover.export(),
            showBottom2: true
         })
      })
   },
   doShare () {

   },
   async doSave () {
      console.log('draw')
      if (this.data.isSaving) return
      wx.showLoading({
         title:'生成中'
      });
      this.data.isSaving = true
      const ctx = wx.createCanvasContext('firstCanvas')
      const [x, y, w, h] = this.data.generateData.pngCoordinate.split(',')
      ctx.drawImage(this.data.photos, x, y, w, h)
      const cover = await downloadFile({
         url: this.data.generateData.psdUrl
      })
      ctx.drawImage(cover.tempFilePath, 0, 0, 750, 1333)
      ctx.draw()
      const imgUrl = await canvasToTempFilePath({
         canvasId: 'firstCanvas',
         quality: 1,
         x: 0,
         y: 0,
         width: 750,
         height: 1333,
      })
      wx.saveImageToPhotosAlbum({
         filePath: imgUrl.tempFilePath,
         success(){
            wx.showToast({
               title: '保存成功',
               icon: 'success',
               duration: 2000
            })
            this.data.isSaving = false
         }
      })
   },
   tryAnother () {
      wx.navigateTo({
         url: '/pages/onscreen/list/list'
      })
   },
   doRetry () {
      this.setData({
         showBottom2: false
      })
      this.coverAnimation()
   },
   gotoMore () {
      wx.navigateTo({
         url: '/pages/interaction/interaction'
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
      return {
         title: this.data.generateData.title,
         imageUrl: this.data.generateData.bigUrl ,
         path:'/pages/onscreen/detail/detail?id='+this.data.psdOrderNu
      }
   }
})