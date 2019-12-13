// pages/bargain/initiator.js
const api = require('../../utils/api.js');
import common from '../../utils/common'
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    Select:false,
    address:'',
    modal:false,
    pre_kj:'',
    openSetting: false,
    _sub:false,
    subArray:[],
    id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let link = { method: 'pre_kj', canshu: '' };
    let data = { id: options.id };
    let pre_kj = (ret) => {
      // console.log(ret)
      this.setData({
        pre_kj: ret,
        id: options.id
      })
      this.setCountDown() //时间倒计时
    }
    api.postHd(this, link, data, pre_kj);
  },
  setCountDown: function (){
    let that = this
    let time = 1000
    var remain_time = that.data.pre_kj.remain_time
    var getTime = Date.parse(new Date()) //当前时间戳
    // console.log(remain_time, getTime)
    var newTime = parseInt(remain_time) - getTime / 1000
    // console.log(newTime)
    if (newTime <= 1) {
      var dd = `00`
      var hh = `00`
      var mm = `00`
      var ss = `00`
      return;
    }
    let formatTime = that.getFormat(newTime);
    // console.log(formatTime)
    // v.time -= time;
    var dd = `${formatTime.dd}`
    var hh = `${formatTime.hh}`
    var mm = `${formatTime.mm}`
    var ss = `${formatTime.ss}`
    that.setData({
      'pre_kj.dd': dd,
      'pre_kj.hh': hh,
      'pre_kj.mm': mm,
      'pre_kj.ss': ss,
    })
    setTimeout(this.setCountDown, time);
  },
  /**
   * 格式化时间
   */
  getFormat: function (leftTime) {
    var leftSecond = parseInt(leftTime);
    var Day = Math.floor(leftSecond / (60 * 60 * 24)); //天数
    var Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600); //小时
    var Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60); //分钟
    var Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60); //秒数
    if (Hour >= 0 && Minute >= 0 && Second >= 0) {
      // console.log(Hour, Minute, Second)
      var dd = Day < 10 ? '0' + Day : Day
      var hh = Hour < 10 ? '0' + Hour : Hour
      var mm = Minute < 10 ? '0' + Minute : Minute
      var ss = Second < 10 ? '0' + Second : Second
      return {
        dd,
        ss,
        mm,
        hh
      };
      // that.setData({
      //   h: Hour < 10 ? '0' + Hour : Hour,
      //   m: Minute < 10 ? '0' + Minute : Minute,
      //   s: Second < 10 ? '0' + Second : Second,
      // })
    }
  },
  openSetting: function () {
    let that = this
    tt.openSetting({
      success(settingdata) {
        console.log(settingdata)
        if (settingdata.authSetting['scope.address']) {
          console.log("授权成功")
          that.setData({
            openSetting: false
          })
        } else {
          console.log("获取权限失败")
          that.setData({
            openSetting: true
          })
        }
      }
    })
  },
  // 收货地址
  addressList: function () {
    let that = this
    //打开选择地址
    if (tt.chooseAddress) {
      tt.chooseAddress({
        success: function (res) {
          console.log(JSON.stringify(res))
          tt.setStorageSync('address', res)
          that.setData({
            'pre_kj.default_address.province': res.provinceName,
            'pre_kj.default_address.city':res.cityName,
            'pre_kj.default_address.area': res.countyName,
            'pre_kj.default_address.address': res.detailInfo,
            'pre_kj.default_address.name': res.userName,
            'pre_kj.default_address.mobile': res.telNumber,
          })
        },
        fail: function (err) {
          console.log(JSON.stringify(err))
          if (err.errMsg === "chooseAddress:fail auth deny") {
            console.log("打开设置窗口");
            that.setData({
              openSetting: true
            })
          }
        }
      })
    } else {
      console.log('当前微信版本不支持chooseAddress');
    }
  },
  isCloseTap:function(){
    let that = this
    that.setData({
      Select: false
    })
  },
  // 选择规格
  binSelect:function(){
    let that = this
    that.setData({
      Select:true
    })
  },
  binSub:function(e){
    console.log(e)
    let that = this
    var id = e.currentTarget.dataset.id
    var index = e.currentTarget.dataset.index
    var gg_list = that.data.pre_kj.gg_list
    var subArray = that.data.subArray
    for (var i = 0; i < gg_list.length; i++){
      if (id == gg_list[i].id){
        // console.log(i)
        var j = gg_list[i].sub.length
        for (var k = 0; k < j; k++){
          gg_list[i].sub[k].active = false
        }
        gg_list[i].sub[index].active = true
        subArray[i] = gg_list[i].sub[index].id
      }
      // console.log(subArray)
      // console.log(gg_list)
      that.setData({
        'pre_kj.gg_list': gg_list,
        subArray: subArray
      })
    }
    // 不同规格下最低价格
    that.get_kucun_info()
  },
  get_qt:function(){
    var question = this.data.subArray
    var qt = ""
    for (var i = 0; i < question.length; i++) {
      var id = question[i]
      qt += id + "|";
    }
    //去掉最后一个逗号(如果不需要去掉，就不用写)
    if (qt.length > 0) {
      qt = qt.substr(0, qt.length - 1);
    }
    // console.log(qt)
    return qt
  },

  get_kucun_info:function(){
    let that = this
    var qt = that.get_qt()
    // console.log(qt)
    let link = { method: 'get_kucun_info', canshu: '' };
    let data = { hd_id: that.data.id, attr_id: qt};
    // console.log(data)
    let get_kucun_info = (ret) => {
      // console.log(ret)
      that.setData({
        'pre_kj.goods_info.min_price': ret.kc,
        'pre_kj.goods_info.price_range.max_price': ret.before_price
      })
      if(ret.cover != ""){
        that.setData({
          'pre_kj.goods_info.cover': ret.data.cover,
        })
      }
    }
    api.postHd(this, link, data, get_kucun_info);
  },
  // 规格确定
  confirm:function(){
    let that = this
    // if (that.data.subArray.length < that.data.pre_kj.gg_list.length){
    //   common.showToast('规格信息不完整')
    //   return;
    // }
    that.setData({
      Select:false,
      _sub:true
    })
  },

  cancel:function(){
    let that = this
    that.setData({
      modal:false
    })
  },
  // 发起砍价
  conf_bargain:function(){
    let that = this
    if (that.data.pre_kj.default_address.length == 0){
      common.showToast('请选择收货地址')
      return;
    }
    if(!that.data._sub){
      common.showToast('请选择规格')
      return;
    }
    that.setData({
      modal: true
    })
  },

  confirm_kj:function(){
    let that = this
    var qt = that.get_qt()
    // console.log(qt)
    let pre_kj = that.data.pre_kj
    let link = { method: 'confirm_kj', canshu: '' };
    let data = { id: that.data.id, attr_id: qt, province: pre_kj.default_address.province, city: pre_kj.default_address.city, area: pre_kj.default_address.area, address: pre_kj.default_address.address, name: pre_kj.default_address.name, phone: pre_kj.default_address.mobile};
    console.log(data)
    let confirm_kj = (ret) => {
      console.log(ret)
      console.log('跳转砍价详情咯！')
      var kj_user_id = ret.kj_user_id
      var money = ret.money
      tt.navigateTo({
        url: 'item?kj_user_id=' + kj_user_id + '&money=' + money,
      })
    }
    api.postHd(this, link, data, confirm_kj);
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
