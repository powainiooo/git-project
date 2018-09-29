// pages/insured/insured.js
const app = getApp();
Page({
  data: {
    btnDisabled:false,
    inforList:[]
  },
  onLoad: function (options) {
    let numbers = app.globalData.ticketBuyNum,arr=[];
    for(let i=0;i<numbers;i++){
      arr[i] = {
        username:'',
        mobile:'',
        idnum:''
      }
    }
    this.setData({
      inforList:arr
    })
  },
  checkValues(event){
    let key = event.target.dataset.key;
    let index = parseInt(event.target.dataset.index);
    this.data.inforList[index][key] = event.detail.value;
    let disabled = true,arr = this.data.inforList;
    for(let i=0;i<arr.length;i++){
      if(arr[i].name == '' || arr[i].phone == '' || arr[i].ids == ''){
        disabled = false;
        break;
      }
    }
    this.setData({
      btnDisabled:disabled
    })
  },
  doConfirm(){
    let self = this;
    if(self.data.btnDisabled){
      self.data.btnDisabled = false;
      wx.showNavigationBarLoading();
      wx.request({
        url: app.globalData.ajaxSrc+'/safe_person', //仅为示例，并非真实的接口地址
        data: {
          order_num:app.globalData.ticketOrderNum,
          person:self.data.inforList
        },
        success: function(res) {
          if(res.data.status == 1){
            wx.reLaunch({
              url: '/pages/result/result?page=insuredSuc'
            })
          }else{
            wx.showToast({
              title:'提交信息出错',
              icon:'none'
            });
            self.data.btnDisabled = true;
          }
          wx.hideNavigationBarLoading();
        },
        fail(){
          wx.navigateTo({
            url: '/pages/error/error'
          })
        }
      });
      //wx.navigateTo({
      //  url: '/pages/result/result?page=insuredSuc'
      //})
    }
  },
  backIndexDetail(){
    wx.navigateTo({
      url: '/pages/index/index'
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