// pages/order-ticket/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[
      {
        isChecked:false,
        name:'1French kiwi jucie of one one one',
        checkNums:1,
        nonCheckNums:1
      },
      {
        isChecked:true,
        name:'2French kiwi jucie of one one one',
        checkNums:2,
        nonCheckNums:2
      },
      {
        isChecked:false,
        name:'3French kiwi jucie of one one one',
        checkNums:3,
        nonCheckNums:3
      }
    ],
    currentIndex:0,
    duration:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let index = options.index || 0;
    this.setData({
      currentIndex:index
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