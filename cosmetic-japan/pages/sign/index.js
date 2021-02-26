// pages/sign/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowGetUser:false,
    page:1,
    list:{},
    data:{},
  },

  //签到
  singTap:function(){
    var data = this.data.data;
    if(data.type == 0){
      let link = { method: 'sign_create', canshu: ''};
      let logic = (ret) => {
        if (this.data.isCN){
          wx.showToast({
            title: '已签到',
            icon: 'none'
          })
        }else{
          wx.showToast({
            title: '已签到',
            icon: 'none'
          })
        }
        setTimeout(() => {
          this.onLoad();
        },1500)
      }
      api.post(this, link, {}, logic);
    }else{
      if (this.data.isCN) {
        wx.showToast({
          title: '亲，您已签到了',
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '亲，您已签到了',
          icon: 'none'
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let link = { method: 'jf_log', canshu: '&page=' + this.data.page };
    let logic = (ret) => {
      this.setData({
        data: ret,
        list:ret.list,
        isCN:wx.getStorageSync('isCN')
      })
    }
    api.post(this, link, {}, logic);
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
    let link = { method: 'jf_log', canshu: '&page=' + this.data.page + 1 };
    let logic = (ret) => {
      if (ret.list.length > 0) {
        var list = this.data.list;
        list.concat(ret.list);
        this.setData({
          data: ret,
          list: list,
          page: this.data.page + 1
        })
      }
    }
    api.post(this, link, {}, logic);
  },
})