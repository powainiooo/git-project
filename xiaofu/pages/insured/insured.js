// pages/insured/insured.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDisabled:false,
    inforList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let numbers = options.numbers || 2,arr=[];
    for(let i=0;i<numbers;i++){
      arr[i] = {
        name:'',
        phone:'',
        ids:''
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
    if(this.data.btnDisabled){
      wx.navigateTo({
        url: '/pages/result/result?page=insuredSuc'
      })
    }
  },
  backIndexDetail(){
    wx.navigateTo({
      url: '/pages/order-ticket/detail'
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