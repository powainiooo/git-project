// pages/onscreen/generate/generate.js
const {checkPsd, payPsdGoods, psdUpTv, fileUp, getUserAsset} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
const downloadFile = promisify(wx.downloadFile, true)
const app = getApp()
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false
audio.src = app.globalData.audioSrc.takePhoto
Page({

   /**
    * 页面的初始数据
    */
   data: {
      postion: 'front',
      userIq: 0,
      showCamera: false,
      cameraAni: {},
      coverImageAni: {},
      moveImageAni: {},
      moveCoverAni: {},
      photos: '',
      photosWidth: 0,
      photosHeight: 0,
      generateData: null,
      showBottom: false,
      showBottom2: false,
      showCallSuc: false,
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
      cameraSize: [],
      coverSize: [],
      tAnimEnd: 0,
      showCount: false,
      waitCount: 0,
      playCount: 0,
      isIOS: app.globalData.isIOS,
   },
	cameraErr (e) {
		this.tryAnother()
		app.refreshSetting()
	},
	cameraDone (e) {
		app.refreshSetting()
	},
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const {generateData} = getApp().globalData
	   console.log(JSON.stringify(generateData))
      this.setData({generateData})
	   wx.nextTick(()=>{
		   this.initSize()
	   })
   },
   initSize () {
      const [padding, moduleWidth, moduleHeight] = [10, 750, 1333]
      const showWidth = 750 - padding*2
      const [x, y, w, h] = this.data.generateData.pngCoordinate.split(',')
	   console.log('x',x,',y',y,',w',w,',h',h)
	   console.log(this.data.generateData.pngCoordinate.split(','))
      const paddingTop = 50
      const scale = showWidth / w
      const cameraHeight = `${showWidth * h / w}rpx`
      this.data.cameraSize = [showWidth, cameraHeight, paddingTop, padding]
      this.data.coverSize = [moduleWidth * scale, moduleHeight * scale, y * scale - paddingTop, x * scale - padding]
	   console.log('cameraSize', this.data.cameraSize)
	   // console.log('coverSize', this.data.coverSize)
	   // ["268", "537", "219", "219"] cameraSize (4) [730, "730rpx", 50, 10]  coverSize (4) [2500, 4443.333333333334, 1740, 883.3333333333334]
	   // ["246", "215", "281", "159"] cameraSize (4) [730, "413.06049822064057rpx", 50, 10]  coverSize (4) [1948.3985765124553, 3462.9537366548043, 508.54092526690386, 629.0747330960854]

      //摄像机动画
      const camera = wx.createAnimation({
         duration: 0,
         timingFunction: 'ease',
      })
      //遮罩图动画
      const cover = wx.createAnimation({
         duration: 0,
         timingFunction: 'ease',
      })
      const [caw, cah, cay, cax] = this.data.cameraSize
      const [cow, coh, coy, cox] = this.data.coverSize
      camera.width(`${caw}rpx`).height(cah).top(`${cay}rpx`).left(`-10000rpx`).opacity(1).step()
      cover.width(`${cow}rpx`).height(`${coh}rpx`).top(`-${coy}rpx`).left(`-${cox}rpx`).step()
      this.setData({
         cameraAni: camera.export(),
         coverImageAni: cover.export(),
      })
   },
   doSwitch () {
      this.setData({
         postion: this.data.postion === 'back' ? 'front' : 'back'
      })
   },
   closeModal () {
      this.setData({
         showModal: false,
      })
   },
   posterLoadDone () {
      setTimeout(()=>{
         this.coverAnimation()
      }, 1000)
   },
   coverAnimation() {
      const [caw, cah, cay, cax] = this.data.cameraSize
      const [cow, coh, coy, cox] = this.data.coverSize
      //照片、视频动画
      const camera = wx.createAnimation({
         duration: 1000,
         timingFunction: 'ease',
      })
      camera.width(`${caw}rpx`).height(`${cah}`).top(`${cay}rpx`).left(`${cax}rpx`).opacity(1).step()
      //遮罩图动画
      const cover = wx.createAnimation({
         duration: 1000,
         timingFunction: 'ease-out',
      })
      cover.width(`${cow}rpx`).height(`${coh}rpx`).top(`-${coy}rpx`).left(`-${cox}rpx`).step()

      this.setData({
         moveImageAni: camera.export(),
         moveCoverAni: cover.export(),
      })
      setTimeout(()=>{
         this.coverAnimEnd()
      },1100)
   },
   coverAnimEnd () {
      console.log('coverAnimEnd')
	   //摄像机动画
	   const camera = wx.createAnimation({
		   duration: 0,
		   timingFunction: 'ease',
	   })
	   const [caw, cah, cay, cax] = this.data.cameraSize
      if (this.data.showCamera) { //缩小后
      	console.log('showCamera', '缩小后')
	      camera.width(`${caw}rpx`).height(cah).top(`${cay}rpx`).left(`${cax}rpx`).step()
         this.setData({
	         showCamera: false,
	         cameraAni: camera.export(),
         })
      } else { //放大后
	      camera.width(`${caw}rpx`).height(cah).top(`${cay}rpx`).left(`${cax}rpx`).step()
         this.setData({
	         cameraAni: camera.export(),
	         showCamera: true,
            showBottom: true,
         })
      }
   },
   zoomBack () {
      this.coverAnimEnd()
      setTimeout(()=>{
         const [x, y, w, h] = this.data.generateData.pngCoordinate.split(',')
         //照片动画
         const photo = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
         })
	      const hStr = `${parseInt(h)}rpx`
         photo.width(`${w}rpx`).height(hStr).top(`${y}rpx`).left(`${x}rpx`).step()
         //遮罩图动画
         const cover = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
         })
         cover.width(`750rpx`).height(`1333rpx`).top(`0rpx`).left(`0rpx`).step()
         let btnText
         if (this.data.functType === 1) {
            btnText = '拍照上屏'
         } else if (this.data.functType === 2) {
            btnText = '录像上屏'
         }
         this.setData({
            moveImageAni: photo.export(),
            moveCoverAni: cover.export(),
            showBottom2: true,
            btnText
         })
      }, 500)
   },
   takePhoto() {
      console.log('takePhoto')
      audio.play()
      this.setData({
         functType: 1,
         showBottom: false,
      })
      const self = this
	   // setTimeout(() => {
		//    self.setData({
		// 	   photos: 'https://sbhh.newryun.com/back/psd/201900/qiqiu0402a.jpg',
		// 	   showBottom: false,
		//    })
		//    self.zoomBack()
	   // }, 500)
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
         quality: 'high',
         success: (res) => {
            console.log(res)
            self.setData({
               photos: res.tempImagePath,
               showBottom: false,
            })
            self.zoomBack()
         },
         fail (err) {
            console.log(err)
         }
      })
   },
   waitCountDown () {
      this.setData({
         waitCount: 3,
         functType: 2,
         showBottom: false,
         showCount: true,
      })
      const t = setInterval(()=>{
         if (this.data.waitCount === 0) {
            clearInterval(t)
            this.takeVideo();
         } else {
            this.setData({
               waitCount: this.data.waitCount - 1,
            })
         }
      }, 1000)
   },
   takeVideo () {
      const ctx = wx.createCameraContext()
      const self = this;
      ctx.startRecord({
         success () {
            self.setData({
               playCount: 3,
            })
            const t = setInterval(()=>{
               if(self.data.playCount === 0) {
                  clearInterval(t)
                  ctx.stopRecord({
                     success: (res) => {
                        console.log(res.tempVideoPath)
                        self.setData({
                           videos: res.tempVideoPath,
                           showCount: false,
                        })
                        self.zoomBack()
                     }
                  })
               }else {
                  self.setData({
                     playCount: self.data.playCount - 1,
                  })
               }
            }, 1000)
         },
         fail (err) {
            console.log(err)
         }
      })
   },
   takeVideo2 () {
      const ctx = wx.createCameraContext()

      this.setData({
         waitCount: 6,
         functType: 2
      })
      const t = setInterval(()=>{
         if(this.data.waitCount === 0) {
            clearInterval(t)
            ctx.stopRecord({
               success: (res) => {
                  console.log(res.tempVideoPath)
                  this.setData({
                     videos: res.tempVideoPath,
                     showBottom: false,
                  })
                  this.zoomBack()
               }
            })
         }else {
            if (this.data.waitCount === 3) {
               ctx.startRecord()
            }
            this.setData({
               waitCount: this.data.waitCount - 1,
            })
         }
      }, 1000)
   },
   btnConfirm () {
      if (this.data.modalType === 'hint') {
         this.closeModal()
      } else if (this.data.modalType === 'recharge') {
         if (this.data.isIOS) {
            this.closeModal()
         } else {
            wx.navigateTo({
               url: '/pages/recharge/recharge'
            })
         }
      }
   },
   async doBuy() {
      if(this.data.isBuying) return
      const price = this.data.functType === 1 ? this.data.generateData.pricePhoto : this.data.generateData.priceVideo
      if(this.data.userIq < parseInt(price)) {
         this.setData({
            showModal: true,
            modalType: 'recharge',
            modalContent: `您的来画豆不足${price}`,
         })
         return
      }
      if(this.data.generateData.scene === -1) {
         this.setData({
            showModal: true,
            modalType: 'hint',
            modalContent: `请到体验店现场哟`,
         })
         return
      }
      if(this.data.generateData.scene !== this.data.generateData.psdType) {
         this.setData({
            showModal: true,
            modalType: 'hint',
            modalContent: `模板不能在当前场景使用`,
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
         const payData = `psdId=${this.data.generateData.psdId}&isTutorials=${this.data.generateData.isTutorials}&functType=${this.data.functType}`
         const payRes = await payPsdGoods(payData).catch(err => {
            this.data.isBuying = false
            if (payRes.code === 988) {
               this.setData({
                  showModal: true,
                  modalType: 'recharge',
                  modalContent: `您的来画豆不足${price}`,
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
                  showCallSuc: true,
                  btnText: '再次上屏',
               })
            }
         }
      // }
      this.data.isBuying = false
      wx.hideLoading()
   },
   closeSucModal () {
      this.setData({
         showCallSuc: false,
      })
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
      ctx.drawImage(this.data.photos, Number(x), Number(y), Number(w), Number(h))
      const cover = await downloadFile({
         url: this.data.generateData.psdUrl
      })
      ctx.drawImage(cover.tempFilePath, 0, 0, 750, 1333)
      ctx.drawImage('../../../res/interaction/qrcode.png', 750-126-8, 1333-126-8, 126, 126)
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
                  },fail(err) {
		               console.log('图片保存失败报错', err)
		               wx.showToast({
			               icon: 'none',
			               title:'保存失败'
		               });
	               }
               })
            },
	         fail(err) {
            	console.log('图片生成失败报错', err)
		         wx.showToast({
			         icon: 'none',
			         title:'生成失败'
		         });
	         }
         })
      })

   },
   tryAnother () {
      wx.navigateBack({
         delta: 1
      })
   },
   doRetry () {
      this.setData({
         showBottom2: false,
      })
      wx.nextTick(() => {
         this.coverAnimation()
      })
   },
   gotoMore () {
      wx.navigateBack({
         delta: 2
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
      getUserAsset().then(res=>{
         this.setData({
            userIq: res.data
         })
      })
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
