//index.js
const api = require('../../utils/api.js');
//获取应用实例
const app = getApp();
var www = app.globalData.www;
var imgUrl = app.globalData.url;
var actObj = {
          'yhq':{
            img:'youhuiquan',
            title:'优惠券',
            url:''
          },
          'kj':{
            img:'kanjia',
            title:'砍价',
            url:'../bargain/index'
          },
          'ms':{
            img:'miaosha',
            title:'秒杀',
            url:'../spikeList/index'
          },
          'xsg':{
            img:'xianshigou',
            title:'限时购',
            url:'../limitedTimeList/index'
          },
          'pt':{
            img:'pintuan',
            title:'拼团',
            url:'../spellList/index'
          },
};
Page({
  data: {
    isShowGetUser: false,//是否获取到了用户信息
    www: www,
    imgUrl: imgUrl,
    page:1,
    isNoReturn:false,
    //isCN: wx.getStorageSync('isCN'),
    isCN: 1,
    phone:'',
    activityList:[]
  },

  // 语言切换
  SwitchLag: function (e) {
    var Lag = e.detail.Lag;
    this.setData({
      isCN: Lag
    })
  },

  // 搜索获取焦点
  SerchFocus: function(){
    wx.navigateTo({
      url: '../serch/index',
    })
  },

  // 获取用户信息
  getUserTap: function (e) {
    var that = this;
    api.getUser(that,0);
  },

  tel: function () {
    wx.makePhoneCall({
      phoneNumber:this.data.phone,
    })
  },
  // 英语分类二级展开隐藏
  cateShowTap:function(e){
    var idx = e.currentTarget.dataset.idx;
    var list = this.data.cate;
    var isShow = list[idx].isShow;
    for (var i = 0; i < list.length; i++) {
      list[i].isShow = false;
    }
    list[idx].isShow = !isShow;
    this.setData({
      cate: list
    })
  },
  
  //获取拼团商品
  getList() {
    let link = { method: 'activity_list', canshu: '&page=1&recommend=1' };
    let logic = (ret) => {
      if (ret.group_buy_list && ret.group_buy_list.length > 0){
        //this.data.activityList.push(actObj['pt']);
        for(let i = 0; i<ret.list.length; i++){
          ret.list[i].tg_price = (ret.list[i].tg_price/100).toFixed(2)
        }
        this.setData({
            activityList: this.data.activityList,
            group_buy_list:ret.list
        })
      }     
    }
    api.postGroupBuy(this, link, {}, logic);
  },

  onLoad: function (options) {
    // 首页
    let link = { method: 'index', canshu:'&page=' + this.data.page};
    let logic = (ret) => {
      if (ret.kj_nums>0) {
        this.data.activityList.push(actObj['kj']);
      }
      if (ret.ms_nums>0) {
        this.data.activityList.push(actObj['ms']);
      }
      if (ret.xsg_nums>0) {
        this.data.activityList.push(actObj['xsg']);
      }
      if (ret.tg_nums>0) {
        this.data.activityList.push(actObj['pt']);
      }
      //this.getList();
      //console.log(ret)
      this.setData({
        activityList: this.data.activityList,
        ads_list_max: ret.ads_list_max,
        ads_list_zhong: ret.ads_list_zhong,
        ads_list_min: ret.ads_list_min,
        yx_goods: ret.yx_goods,
        ms_list: ret.ms_list,
        xsg_list: ret.xsg_list,
        group_buy_list:ret.group_buy_list,
        kj_nums: ret.kj_nums,
        kj_list: ret.kj_list,
        isCN: wx.getStorageSync('isCN'),
        phone:ret.phone
      })
    }
    api.post(this, link, {}, logic);

    return ;
    // 分类
    let www = { method: 'cate', canshu: '' };
    let huidiao = (ret) => {
      var list = ret.list;
      for(var i=0;i<list.length;i++){
        list[i].isShow = false
      }
      this.setData({
        cate: list
      })
    }
    api.post(this, www, {}, huidiao);
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
    if (wx.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: false
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
    let link = { method: 'index', canshu: '&page=' + Number(this.data.page + 1)};
    let logic = (ret) => {
      if (ret.yx_goods.length <= 0){
        this.setData({
          isNoReturn:true
        })
        return false;
      }else{
        var yx_goods = this.data.yx_goods;
        yx_goods = yx_goods.concat(ret.yx_goods);
        this.setData({
          ads_list_max: ret.ads_list_max,
          ads_list_zhong: ret.ads_list_zhong,
          ads_list_min: ret.ads_list_min,
          yx_goods: yx_goods,
          isCN: wx.getStorageSync('isCN'),
          page: Number(this.data.page + 1),
          isNoReturn: false,
        })
      }
    }
    api.post(this, link, {}, logic);
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    var fxs_id = this.data.fxs_id;
    return {
      title: '分销商城',
      path: '/pages/index/index?fxs_id=' + fxs_id
    }
  }
})
