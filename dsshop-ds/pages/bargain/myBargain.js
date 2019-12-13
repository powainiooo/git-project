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
    navIndex:'0',
    isNoReturn: false,
    page:1,
    my_kj_list:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.kjList()
  },
  kjList:function(){
    let link = { method: 'my_kj_list', canshu: '&page=' + this.data.page };
    var data = { type: this.data.navIndex }
    let my_kj_list = (ret) => {
      console.log(ret)
      this.setData({
        my_kj_list: ret
      })
    }
    api.postHd(this, link, data, my_kj_list);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let link = { method: 'my_kj_list', canshu: '&page=' + Number(this.data.page + 1) };
    var data = { type: this.data.navIndex }
    let my_kj_list = (ret) => {
      if (ret.length <= 0) {
        this.setData({
          isNoReturn: true
        })
        return false;
      } else {
        var my_kj_list = this.data.my_kj_list;
        my_kj_list = my_kj_list.concat(ret);
        this.setData({
          my_kj_list: my_kj_list,
          isCN: tt.getStorageSync('isCN'),
          page: Number(this.data.page + 1),
          isNoReturn: false,
        })
      }
    }
    api.postHd(this, link, data, my_kj_list);
  },
  bindnav:function(e){
    console.log(e)
    let that = this
    that.setData({
      navIndex:e.currentTarget.dataset.num
    })
    that.kjList()
  },
  // 跳转砍价列表
  myIndex:function(){
    tt.navigateTo({
      url: 'index',
    })
  },
  // 跳转详情
  binItem:function(e){
    console.log(e)
    tt.navigateTo({
      url: 'item?kj_user_id=' + e.currentTarget.dataset.id,
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
