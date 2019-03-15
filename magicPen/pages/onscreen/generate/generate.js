// pages/onscreen/generate/generate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cameraAni: {},
    coverAni: {},
    originX: 0,
    originY: 0,
    scale: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  coverLoad(e) {
    const {width, height} = e.detail
    const [x, y, w, h] = [233, 184, 233, 236]

    //摄像机动画
    const camera = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    const cameraHeight = `${710 * h / w}rpx`
    camera.width('710rpx').height(cameraHeight).top('20rpx').left('20rpx').step()
    //遮罩图动画
    const cover = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    const scale = 710 / w
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
    // const {width, height} = e.detail
    // const [x, y, w, h] = [233, 184, 233, 236]
    // const originX = ((x + w/2)/width*100).toFixed(2)
    // const originY = ((y + h/2)/height*100).toFixed(2)
    // const scale = width/w
    // console.log(scale)
    // this.setData({originX, originY, scale})
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        wx.getImageInfo({
          src: res.tempImagePath,
          success(res){
            console.log(res)
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