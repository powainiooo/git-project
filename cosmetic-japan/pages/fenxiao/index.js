// pages/fenxiao/index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFenxiao:false,
    name:null,
    phone:null,
  },

  nameTap:function(e){
    this.setData({
      name: e.detail.value
    })
  },

  phoneTap: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  shenqingTap:function(){
    let name = this.data.name;
    let phone = this.data.phone;
    if (!name && name != ''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return false
    }
    if (!phone && phone.length == 11) {
      wx.showToast({
        title: '请输入11位的手机号',
        icon: 'none'
      })
      return false
    }
    let link = { method: 'apply_fxs', canshu: '' };
    let data = { name: name, phone:phone};
    let logic = (ret) => {
      wx.showToast({
        title: '提交成功，请等待审核',
        icon: 'none'
      })
      setTimeout(()=>{
        wx.switchTab({
          url: '../my/index',
        })
      },1500)
    }
    api.post(this, link, data, logic);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //	是否为分销商,0.申请中,1.非分销商
    console.log(options);
    console.log(options && options.status == 1);
    if (options && options.status == 1){
      this.setData({
        isFenxiao: false
      })
    }else{
      this.setData({
        isFenxiao:true
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

  }
})
