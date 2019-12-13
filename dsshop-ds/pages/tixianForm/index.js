// pages/tixianForm/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allMoney: 12345,
    money:'',
    btnBool: false,
  },
  bindAll: function(){
    if (this.data.allMoney>0) {
      this.setData({
        money: this.data.allMoney,
        btnBool: true,
      })
    }
  },
  bindmoney: function(e){
    var money = e.detail.value;
    var bool = false;
    if (money > this.data.allMoney) {
      money = this.data.allMoney;
    }
    if (money>0) {
      bool = true;
    }
    this.setData({
      btnBool: bool,
      money: money
    })
  },
  //提现
  bindtx: function(){
    if (!this.data.btnBool) return false;
    if(this.data.money == '') {
      tt.showToast({
        title: '提现金额不得为空',
        icon: 'none'
      })
      return false;
    }
    console.log(this.data.money < this.data.minMoney)
    // if(this.data.money < this.data.minMoney) {
    //   tt.showToast({
    //     title: '提现金额不得小于' + this.data.minMoney + '元',
    //     icon: 'none'
    //   })
    //   return false;
    // }

    var url = urlPath + 'api/fxpt/now_tx'
    tt.showLoading({
      title: '正在提交',
    })
    appRequest({
      url: url,
      data: {
        money: this.data.money
      },
      success: res => {
        tt.showToast({
          title: '等待审核',
          duration: 2000
        })
        this.onLoad()
        this.setData({
          money: '',
          btnBool: false,
        })
        console.log(res)
      },
      complete: res => {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = urlPath + 'api/fxpt/tx_info'
    appRequest({
      url: url,
      success: res => {
        this.setData({
          allMoney: res.data.data.zhye,
          minMoney: res.data.data.min_money
        })
        console.log(res)
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
