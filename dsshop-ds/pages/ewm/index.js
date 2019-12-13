// pages/ewm/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    urlPath: urlPath,
    ewm: '',
    headimg: '',
    nickname: '',
  },
  saveEwm: function(){
    console.log(urlPath + this.data.ewm)
    tt.downloadFile({
      url: urlPath + this.data.ewm,
      success: function (ress) {
        console.log('downloadFile',ress)
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (ress.statusCode === 200) {
          tt.saveImageToPhotosAlbum({
            filePath: ress.tempFilePath,
            success: res => {
              tt.showToast({
                title: '保存成功',
              })
              console.log(res)
            },
            complete: res => {
              console.log('complete', res)
            }
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var url = urlPath + 'api/fxpt/my_ewm'
    console.log(url)
    appRequest({
      url: url,
      data: {},
      success: res => {
        console.log(res)
        this.setData({
          ewm: res.data.data.ewm,
          headimg: res.data.data.headimg,
          nickname: res.data.data.nickname,
        })
      },
    }, this.ajaxList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
