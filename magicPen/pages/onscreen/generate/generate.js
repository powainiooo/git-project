// pages/onscreen/generate/generate.js
const {checkPsd, payPsdGoods, psdUpTv, fileUp, getUserAsset} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
const downloadFile = promisify(wx.downloadFile)
Page({

   /**
    * 页面的初始数据
    */
   data: {
      userIq: 0,
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
      modalType: 'hint',
      count: 0,
      recordTime: 3,
      videos: '',
      isSaving: false,
      canShare: false,
      psdOrderNu: '',
      btnText: '拍照上屏',
      isBuying: false,
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
      // const self = this
      // wx.chooseImage({
      //    success(res){
      //       self.setData({
      //          photos: res.tempFilePaths[0]
      //       })
      //    }
      // })
      getUserAsset().then(res=>{
         this.setData({
            userIq: res.data
         })
      })
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
      const paddingTop = 300
      const scale = showWidth / w
      //摄像机动画
      const camera = wx.createAnimation({
         duration: 0,
         timingFunction: 'ease',
      })
      const cameraHeight = `${showWidth * h / w}rpx`
      camera.width(`${showWidth}rpx`).height(cameraHeight).top(`${paddingTop}rpx`).left(`${padding}rpx`).step()
      //遮罩图动画
      const cover = wx.createAnimation({
         duration: 1000,
         timingFunction: 'ease',
      })
      cover
          .width(`${moduleWidth * scale}rpx`)
          .height(`${moduleHeight * scale}rpx`)
          .top(`-${y * scale - paddingTop}rpx`)
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
   btnConfirm () {
      if (this.data.modalType === 'hint') {
         this.closeModal()
      } else if (this.data.modalType === 'recharge') {
         wx.navigateTo({
            url: '/pages/recharge/recharge'
         })
      }
   },
   async doBuy() {
      if(this.data.isBuying) return
      const price = this.data.functType === 1 ? this.data.generateData.pricePhoto : this.data.generateData.priceVideo
      if(this.data.userIq < parseInt(price)) {
         this.setData({
            showModal: true,
            modalType: 'recharge',
            modalContent: `您的智力币不足${price}，是否去充值？`,
         })
         return
      }
      this.data.isBuying = true
      wx.showLoading({
         title: '请求中'
      })
      const {longitude, latitude} = await getLocation({
         type: 'gcj02',
      })
      const checkRes = await checkPsd({
         psdId: this.data.generateData.psdId,
         coord: `${longitude},${latitude}`
         // coord: `114.0422219038,22.5186571950`
      }).catch(err => {
         this.data.isBuying = false
      })
      if(checkRes.code === 0){
         const payData = `psdId=${this.data.generateData.psdId}&isTutorials=${this.data.generateData.isTutorials}&functType=${this.data.functType}`
         const payRes = await payPsdGoods(payData).catch(err => {
            this.data.isBuying = false
            if (payRes.code === 988) {
               this.setData({
                  showModal: true,
                  modalType: 'recharge',
                  modalContent: `您的智力币不足${price}，是否去充值？`,
               })
            }
         })
         if(payRes.code === 0) {
            const src = this.data.functType === 1 ? this.data.photos : this.data.videos
            const urlRes = await fileUp(src, this.data.functType)
            if(urlRes.code === 0) {
               const upRes = await psdUpTv({
                  coord: `${longitude},${latitude}`,
                  // coord: `114.0422219038,22.5186571950`,
                  materialUrl: urlRes.data,
                  psdOrderNu: payRes.data.psdOrderNu
               })
               this.setData({
                  canShare: true,
                  psdOrderNu: payRes.data.psdOrderNu,
                  showModal: true,
                  modalType: 'hint',
                  modalContent: upRes.msg,
               })
            }
         }
      }
      this.data.isBuying = false
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
         let btnText
         if (this.data.functType === 1) {
            btnText = this.data.generateData.pricePhoto == 0 ? '拍照上屏' : `拍照上屏${this.data.generateData.pricePhoto}豆`
         } else if (this.data.functType === 2) {
            btnText = this.data.generateData.priceVideo == 0 ? '录像上屏' : `录像上屏${this.data.generateData.priceVideo}豆`
         }
         this.setData({
            cameraAni: camera.export(),
            coverAni: cover.export(),
            showBottom2: true,
            btnText
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
      ctx.drawImage('../../../res/interaction/print.png', 454, 1030, 296, 303)
      const self = this
      ctx.draw(false, ()=>{
         wx.canvasToTempFilePath({
            canvasId: 'firstCanvas',
            quality: 1,
            x: 0,
            y: 0,
            width: 750,
            height: 1333,
            success (res) {
               wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success () {
                     wx.showToast({
                        title: '保存成功',
                        icon: 'success',
                        duration: 2000
                     })
                     self.data.isSaving = false
                  }
               })
            }
         })
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