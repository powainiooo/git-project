// pages/shouhouList/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var imgUrl = app.globalData.url;
var www = app.globalData.www;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    www:www,
    imgUrl:imgUrl,
    page:1,
    isNoRutern:false,
    list:{}
  },

  //取消申请
  qxTap:function(e){
    var id = e.currentTarget.dataset.id;
    let link = { method: 'qx_sq', canshu: '&id=' + id};
    let logic = (ret) => {
      if (tt.getStorageSync('isCN')){
        tt.showToast({
          title: '取消售后成功',
          icon: 'none'
        })
      }else{
        tt.showToast({
          title: 'Cancel after sale',
          icon: 'none'
        })
      }
      setTimeout(()=>{
        this.onLoad();
      },1500)
    }
    api.post(this, link, {}, logic);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let link = { method: 'after_sales', canshu: '&page=' + this.data.page };
    let logic = (ret) => {
      console.log(ret);
      if(ret.list.length > 0){
        this.setData({
          list: ret.list,
          isNoRutern:true,
          isCN:tt.getStorageSync('isCN')
        })
      }else{
        this.setData({
          list: ret.list,
          isNoRutern: false,
          isCN: tt.getStorageSync('isCN')
        })
      }
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
    let link = { method: 'after_sales', canshu: '&page=' + this.data.page };
    let logic = (ret) => {
      if(ret.length > 0){
        this.setData({
          list: ret,
          page: this.data.page + 1
        })
      }
    }
    api.post(this, link, {}, logic);
  },
})
