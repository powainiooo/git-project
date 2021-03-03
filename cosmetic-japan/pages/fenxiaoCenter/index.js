// pages/fenxiaoCenter/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname: '',
    headimg: '',
    ej_time: '',
    tj_num: '',
    lj_yj: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = urlPath + '/api/fxpt/fxs_index'
    appRequest({
      url: url,
      success: res => {
        var info = res.data.data;
        console.log(info)
        this.setData({
          nickname: info.nickname,
          headimg: info.headimg,
          ej_time: info.ej_time,
          tj_num: info.tj_num,
          lj_yj: info.lj_yj,
        })
      },
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
})
