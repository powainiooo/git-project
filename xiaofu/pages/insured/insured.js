// pages/insured/insured.js
const app = getApp();
Page({
  data: {
    btnDisabled:false,
    inforList:[]
  },
  onLoad: function (options) {
    let numbers = options.numbers || 2,arr=[];
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
      console.log(self.data.inforList);
      wx.request({
        url: self.data.ajaxSrc+'/safe_person', //仅为示例，并非真实的接口地址
        data: {
          order_num:'',
          person:self.data.inforList
        },
        method:'POST',
        success: function(res) {
          console.log(res.data)
        }
      })
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