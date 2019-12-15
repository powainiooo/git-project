// pages/bargain/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    www: www,
    imgUrl: imgUrl,
    kj_list:'',
    page:1,
    isNoReturn:false,
    isCN: wx.getStorageSync('isCN')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let link = { method: 'kj_list', canshu: '&page=' + Number(this.data.page + 1) };
    let kj_list = (ret) => {
      if (ret.list.length <= 0) {
        this.setData({
          isNoReturn: true
        })
        return false;
      } else {
        var kj_list = this.data.kj_list;
        kj_list = kj_list.concat(ret.list);
        this.setData({
          kj_list: kj_list,
          isCN: wx.getStorageSync('isCN'),
          page: Number(this.data.page + 1),
          isNoReturn: false,
        })
      }
    }
    api.postHd(this, link, {}, kj_list);
  },
  // 去砍价
  toBargain:function(e){
    console.log(e)
    var is_kj = e.currentTarget.dataset.iskj
    var my_kj_id = e.currentTarget.dataset.kjid
    var id = e.currentTarget.dataset.id
    if (is_kj == 0){
      wx.navigateTo({
        url: 'initiator?id=' + id,
      })
    }else{
      wx.navigateTo({
        url: 'item?kj_user_id=' + my_kj_id + '&money=',
      })
    }
  },
  // 我的砍价
  myBargain:function(){
    wx.navigateTo({
      url: 'myBargain',
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
    let link = { method: 'kj_list', canshu: '&page=' + this.data.page };
    let kj_list = (ret) => {
      console.log(ret)
      this.setData({
        kj_list: ret
      })
    }
    api.postHd(this, link, {}, kj_list);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})