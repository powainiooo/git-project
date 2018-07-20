// pages/ticket-buy/buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numbersArr:[1,2,3,4,5,6,7,8,9,10],
    numberIndex:0,
    animDataTypeList:{},
    nameVal:'',
    phoneVal:'',
    addressVal:'',
    btnDisabled:false,
    typeList:[
      {
        name:'早鸟票',
        nums:0,
        price:100
      },
      {
        name:'预售票',
        nums:10,
        price:200
      },
      {
        name:'普通票',
        nums:10,
        price:300
      }
    ],
    selectTicket:{},
    showTypeList:false
  },
  numberChange: function(e) {
    this.setData({
      numberIndex: e.detail.value
    })
  },
  toggleTypeList(event){
    let isShow = event.target.dataset.show;
    let animation = wx.createAnimation({
      duration:300,
      timingFunction:'ease-in-out'
    });
    // this.animation = animation;

    let dis = isShow ? '160rpx' : -this.data.typeList.length*100+'rpx';
    animation.bottom(dis).step();
    let val = event.target.dataset.val || 0;
    this.setData({
      animDataTypeList:animation.export(),
      selectTicket:this.data.typeList[val],
      showTypeList:isShow
    })
  },
  checkValues(event){
    let key = event.target.dataset.key;
    this.data[key] = event.detail.value;
    if(this.data.nameVal != '' && this.data.phoneVal != '' && this.data.addressVal != ''){
      this.setData({
        btnDisabled:true
      })
    }else{
      this.setData({
        btnDisabled:false
      })
    }
  },
  doPay(){
    if(this.data.btnDisabled){
      wx.navigateTo({
        url: '/pages/result/result?page=ticketSuc'
      })
    }
  },
  doClose(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectTicket:this.data.typeList[0]
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