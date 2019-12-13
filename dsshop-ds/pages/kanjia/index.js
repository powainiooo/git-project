// pages/kanjia/index.js
const api = require('../../utils/api.js');
const www = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    www:www,
    imgUrl: imgUrl,
    isShowGetUser:false,
    Time:{},
    isguige:true,
    guige:false, //规格选择
    yixuan: [],//选择的规格的名称
    gg_list:[],//规格
    isCN:true,
    Time: { hour: 0, minute: 0, second:0},
  },

  // 获取用户信息
  getUserTap: function (e) {
    var that = this;
    api.getUser(that);
  },

  // 选择规格
  SelcetTap: function () {
    if (this.data.isguige){
      this.setData({
        guige: true
      })
    }
  },

  // 关闭遮罩层
  maskTap: function () {
    this.setData({
      guige: false
    })
  },

  //规格选择
  selectGGTap:function(e){
    var index = e.currentTarget.dataset.index;
    var idx = e.currentTarget.dataset.idx;
    var ids = this.data.ids;
    var gg_list = this.data.gg_list;
    if (gg_list[index].sub[idx].bool == 0) {
      return false;
    }
    ids[index] = idx;
    var yixuan = this.data.yixuan;
    var attrid = this.data.attrid;
    if (tt.getStorageSync('isCN')) {
      if (JSON.stringify(yixuan) == '[]') {
        yixuan.push(gg_list[index].sub[idx].name);
        attrid.push(gg_list[index].sub[idx].id);
      } else {
        yixuan[index] = gg_list[index].sub[idx].name;
        attrid[index] = gg_list[index].sub[idx].id;
      }
    } else {
      if (JSON.stringify(yixuan) == '[]') {
        yixuan.push(gg_list[index].sub[idx].name_en);
        attrid.push(gg_list[index].sub[idx].id);
      } else {
        yixuan[index] = gg_list[index].sub[idx].name_en;
        attrid[index] = gg_list[index].sub[idx].id;
      }
    }
    // 请求接口，返回选择规格参数
    var attr = '|' + attrid.join('|') + '|';
    console.log(attr);
    let link = { method: 'kj_check', canshu: '' };
    let data = { id: this.data.id, attr: attr };
    let logic = (ret) => {
      var kjInfo = this.data.kjInfo;
      kjInfo.info.goods_price = ret.current * 100;
      this.setData({
        kjInfo:kjInfo,
      })
    }
    api.post(this, link, data, logic);

    this.setData({
      ids: ids,
      sl: 1,
      yixuan: yixuan
    })
  },

  // 立即购买
  ljShopTap:function(e){
    tt.navigateTo({
      url: '../orderAccount/index?kj_uid=' + this.data.kj_uid,
    })
  },

  //阻止冒泡
  handleTap: function () { },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // &kj_uid=98
    if (options && !!options.kj_uid) {
      let url = { method: 'user_start_kj', canshu: '&kj_uid=' + options.kj_uid };
      let logic = (ret) => {
        if (!!ret) {
          var kjInfo = {};
          var info = {};
          ret.yk = ret.yk / 100;
          ret.current = ret.current / 100;
          kjInfo = ret;
          info.goods_cover = imgUrl + ret.cover;
          info.goods_name = ret.goods_name;
          info.goods_name_en = ret.goods_name_en;
          info.goods_price = ret.price;
          info.end = ret.ctime;
          info.headimg = ret.headimg;
          kjInfo.info = info;
          kjInfo.kj_list = ret.kj_list;
          kjInfo.end = ret.ctime;
          if (tt.getStorageSync('isCN')) {
            var yixuan = ret.gg_name;
          } else {
            var yixuan = ret.gg_name_en;
          }
          var yixuan = yixuan.split('+');
          this.setData({
            kjInfo: kjInfo,
            yixuan: yixuan,
            kj_uid: options.kj_uid,
            isCN: tt.getStorageSync('isCN')
          }, () => {
            this.Settime(Number(this.data.kjInfo.ctime) + Number(this.data.kjInfo.kj_time * 3600));
          })
        }
      }
      api.post(this, url, {}, logic);
      this.setData({
        isguige: false
      })
    }else if (options && !!options.id){
      let www = { method: 'kj', canshu: '&id=' + options.id };
      let huidiao = (ret) => {
        var ids = [],yixuan = [],attrid = [];
        if (tt.getStorageSync('isCN')) {
          for (var i in ret.gg_list) {
            if (ret.gg_list[i].bool == 1) {
              ids[i] = 0;
              attrid.push(ret.gg_list[i].sub[0].id || 0);
              yixuan.push(ret.gg_list[i].sub[0].name || 0)
            }
          }
        } else {
          for (var i in ret.gg_list) {
            if (ret.gg_list[i].bool == 1) {
              ids[i] = 0;
              attrid.push(ret.gg_list[i].sub[0].id || 0);
              yixuan.push(ret.gg_list[i].sub[0].name_en || 0)
            }
          }
        }
        this.setData({
          kjInfo: ret,
          gg_list: ret.gg_list,
          yixuan: yixuan,
          attrid: attrid,
          kj_uid: ret.kj_uid,
          id: options.id,
          ids: ids,
          isCN: tt.getStorageSync('isCN')
        },()=>{
          this.Settime(this.data.kjInfo.end);
        })
      }
      api.post(this, www, {}, huidiao);
    }
  },

  Settime(Timestamp) {
    var nowDate = parseInt(new Date() / 1000);
    if (Timestamp - nowDate <= 0){
      var Time = { hour: 0, minute: 0, second: 0 };
      this.setData({
        Time: Time
      })
    }else{
      this.formatSeconds(Timestamp - nowDate);
    }
  },

  formatSeconds(value) {
    var value = parseInt(value);
    var setTime = setInterval(()=>{
      value -- ;
      var secondTime = parseInt(value);// 秒
      var minuteTime = 0; // 分
      var hourTime = 0; // 小时
      if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
          hourTime = parseInt(minuteTime / 60);
          minuteTime = parseInt(minuteTime % 60);
        }
      }
      if (value == 0){
        clearInterval(setTime);
      }
      var Time = this.data.Time;
      Time.hour = parseInt(hourTime);
      Time.minute = parseInt(minuteTime);
      Time.second = parseInt(secondTime);
      this.setData({
        Time: Time
      })
    },1000)
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
    if (tt.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: true
      })
    } else {
      this.setData({
        isShowGetUser: false
      })
    }
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

  onShare(){
    var attrid = this.data.attrid;
    var attr = '|' + attrid.join('|') + '|';
    let www = { method: 'kj_share', canshu: '&kj_uid=' + this.data.kjInfo.kj_uid + '&attr=' + attr};
    let huidiao = (ret) => {
      tt.showToast({
        title: '转发成功',
        icon: 'loading',
        duration: 2000
      })
    }
    api.post(this, www, {}, huidiao);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if(tt.getStorageSync('isCN')){
      var title = this.data.kjInfo.info.goods_name;
    }else{
      var title = this.data.kjInfo.info.goods_name_en;
    }
    var id = this.data.id;
    var kj_uid = this.data.kjInfo.kj_uid;
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('页面转发按钮');
      this.onShare();
    }

    return {
      title: title,
      path: '/pages/kanjia/index?id=' + id + '&kj_uid=' + kj_uid,
      success: function (res) {
        console.log('右上角分享');
        this.onShare();
      }
    }
  }
})
