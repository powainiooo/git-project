// pages/userPl/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    noReturn: false,
    isCN:wx.getStorageSync('isCN')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options && !!options.id){
      var page = this.data.page;
      let www = { method: 'pj_list', canshu: '&page=' + page};
      let huidiao = (ret) => {
        var list = ret.pj_list;
        var starNum = ret.hp_percent;
        if (ret.hp_percent == '暂无评价'){
          var starNum = 0;
        }else{
          var starNum = starNum.slice(0, starNum.length - 1);
          var starNum = parseInt(starNum / 20);
        }
        if(list.length > 0){
          this.setData({
            data:ret,
            list: list,
            id: options.id,
            starNum: starNum,
            noReturn: false,
            isCN: wx.getStorageSync('isCN')
          })
        }else{
          this.setData({
            data: ret,
            list: list,
            id: options.id,
            starNum: starNum,
            noReturn: true,
            isCN: wx.getStorageSync('isCN')
          })
        }
      }
      api.post(this, www, { id: options.id}, huidiao);
    }else{
      wx.navigateBack({
        delta:1
      })
    }
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
    var page = this.data.page + 1;
    let www = { method: 'pj_list', canshu: '&page=' + page};
    let huidiao = (ret) => {
      console.log(ret);
      var list = this.data.list;
      if (ret.pj_list.length > 0){
        list.concat(ret.pj_list);
        this.setData({
          data: ret,
          list:list,
          page: page + 1,
          noReturn: false
        })
      }else{
        this.setData({
          list: list,
          noReturn:true
        })
      }
    }
    api.post(this, www, { id: this.data.id }, huidiao);
  }
})
