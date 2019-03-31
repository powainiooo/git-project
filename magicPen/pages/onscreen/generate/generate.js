// pages/onscreen/generate/generate.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      showCamera: false,
      cameraAni: {},
      coverAni: {},
      photos: '',
      photosWidth: 0,
      photosHeight: 0
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

   },
   coverLoad(e) {
      const {width, height} = e.detail
      const [x, y, w, h] = [246, 210, 281, 159]

      const scale = 710 / w
      //摄像机动画
      const camera = wx.createAnimation({
         duration: 0,
         timingFunction: 'ease',
      })
      const cameraHeight = `${710 * h / w}rpx`
      camera.width('710rpx').height(cameraHeight).top('20rpx').left('20rpx').step()
      //遮罩图动画
      const cover = wx.createAnimation({
         duration: 1000,
         timingFunction: 'ease',
      })
      cover
          .width(`${750 * scale}rpx`)
          .height(`${1333 * scale}rpx`)
          .top(`-${y * scale - 20}rpx`)
          .left(`-${x * scale - 20}rpx`)
          .step()

      this.setData({
         cameraAni: camera.export(),
         coverAni: cover.export()
      })
      setTimeout(()=>{
         this.setData({
            showCamera: true
         })
      },2000)
   },
   takePhoto() {
      console.log('takePhoto')
      const self = this
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
         quality: 'high',
         success: (res) => {
            console.log(res)
            wx.getImageInfo({
               src: res.tempImagePath,
               success(info){
                  console.log(info)
                  self.setData({
                     photos: res.tempImagePath,
                     photosWidth: info.width,
                     photosHeight: info.height,
                  })
               }
            })
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