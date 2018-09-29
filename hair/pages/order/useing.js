// pages/order/useing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:30*60,
    timeT:0,
    showDetails:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.timeT = setInterval(()=>{
      if(this.data.timer == 0){
        clearInterval(this.data.timeT)
      }else{
        let timer = this.data.timer - 1;
        this.setData({
          timer:timer
        })
      }
    },1000)
  },
  doGetDetail(){
    setTimeout(()=>{
      this.setData({
        showDetails:true
      })
    },150)
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