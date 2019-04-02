// pages/onscreen/generate/generate.js
const {checkPsd, payPsdGoods, psdUpTv} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
Page({

   /**
    * 页面的初始数据
    */
   data: {
      showCamera: false,
      cameraAni: {},
      coverAni: {},
      photos: '',
      photosInfo: [],
      photosWidth: 0,
      photosHeight: 0,
      generateData: null,
      showBottom: false,
      showBottom2: false,
      functType: 1
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      const {generateData} = getApp().globalData
      console.log(generateData)
      this.setData({generateData})
      setTimeout(()=>{
         this.coverAnimation()
      },1000)
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
      this.data.functType = 1
      const self = this
      const ctx = wx.createCameraContext()
      const getLocation = promisify(ctx.takePhoto)
      ctx.takePhoto({
         quality: 'high',
         success: (res) => {
            console.log(res)
            self.setData({
               photos: res.tempImagePath,
               showCamera: false,
               showBottom: false,
            })
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
         }
      })
   },
   async doBuy() {
      const {longitude, latitude} = await getLocation()
      const checkRes = await checkPsd({
         psdId: this.data.generateData.psdId,
         coord: `${longitude},${latitude}`
      })
      if(checkRes.data === '33'){
         const payRes = await payPsdGoods({
            psdId: this.data.generateData.psdId,
            isTutorials: this.data.generateData.isTutorials,
            functType: this.data.functType,
         })
         psdUpTv({
            rVo: {
               coord: `${longitude},${latitude}`,
               materialUrl: '',
               psdOrderNu: payRes.data.psdOrderNu
            }
         })
      }
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