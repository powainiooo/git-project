// pages/cart/class.js
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
    www:www,
    imgUrl: imgUrl,
    delBtnWidth: 140,
    isNoReturn:false,
    page:1,
    yx:0,
    total:0.00,
    selectAll:false,
    list:{}
  },

  // 语言切换
  SwitchLag: function (e) {
    var Lag = e.detail.Lag;
    this.setData({
      isCN: Lag
    })
  },

  getUserTap: function (e) {
    var that = this;
    api.getUser(that);
  },

  // 选中
  selectTap:function(e){
    var idx = e.currentTarget.dataset.idx;
    var list = this.data.list;
    var num = Number(list[idx].buy_num);
    var price = parseFloat(list[idx].price);
    if (list[idx].status == 0){
      list[idx].status = 1;
      var status = 1;
      this.totalNum(num,price,status,idx);
      this.setData({
        list: list
      })
    }else{
      list[idx].status = 0;
      var status = 0;
      this.totalNum(num, price, status, idx);
      this.setData({
        list: list
      })
    }
    var flag = false;
    var ids = [], attr = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].status != 1) {
        flag = false
        break;
      } else {
        flag = true
      }
    }
    for (var i = 0; i < list.length; i++) {
      if (list[i].status == 1){
        ids.push(list[i].goods_id);
        attr.push(list[i].goods_attr);
      }
    }
    this.setData({
      selectAll: flag,
      ids: ids,
      attr: attr,
    })
  },

  // 全选
  selectAllTap:function(){
    var list = this.data.list;
    var num, price;
    this.setData({
      total: 0.00,
      yx: 0
    })
    if (this.data.selectAll){
      for (var i = 0; i < list.length; i++) {
        list[i].status = 0;
      }
    }else{
      for (var i = 0; i < list.length; i++) {
        num = parseFloat(list[i].buy_num);
        price = parseFloat(list[i].price);
        this.totalNum(num, price, 1, i);
        list[i].status = 1;
      }
    }
    var ids = [], attr = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].status == 1) {
        ids.push(list[i].goods_id);
        attr.push(list[i].goods_attr);
      }
    }
    this.setData({
      list: list,
      selectAll: !this.data.selectAll,
      ids: ids,
      attr: attr
    })
  },

  // 数量加
  addTap:function(e){
    var idx = e.currentTarget.dataset.idx;
    var list = this.data.list;
    var num = Number(1);
    var price = parseFloat(list[idx].price);
    list[idx].buy_num++;
    list[idx].buy_price = Number(list[idx].buy_num * list[idx].price).toFixed(2);
    if (list[idx].status == 1) {
      this.totalNum(num, price, 1, idx);
    }
    this.setData({
      list: list
    })

    let logic = (ret) => {};
    let link = { method: 'cart_nums_update', canshu: '' };
    let data = { id: list[idx].id, op:'add' };
    api.post(this, link, data, logic);
  },

  // 数量减
  lessTap: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var list = this.data.list;
    var num = Number(1);
    var price = parseFloat(list[idx].price);
    if (list[idx].buy_num > 1){
      list[idx].buy_num--;
      list[idx].buy_price = Number(list[idx].buy_num * list[idx].price).toFixed(2);
      if (list[idx].status == 1){
        this.totalNum(num, price, 0, idx);
      }
      this.setData({
        list: list
      })
    }

    let logic = (ret) => { };
    let link = { method: 'cart_nums_update', canshu: '' };
    let data = { id: list[idx].id, op: 'reduce' };
    api.post(this, link, data, logic);
  },

  //总价 && 总数量
  totalNum:function(num,price,status,idx){
    var yx = this.data.yx;
    var total = parseFloat(this.data.total);
    var list = this.data.list;
    if (status == 1) {
      var totalPrice = Number(total + (num * price)).toFixed(2);
      this.setData({
        yx: yx + num,
        total: totalPrice,
      })
    } else {
      var totalPrice = Number(total - (num * price)).toFixed(2);
      this.setData({
        yx: yx - num,
        total: totalPrice,
      })
    }
  },

  // 立即购买
  ljShopTap:function(){
    if (wx.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: true,
      })
      return false;
    } else {
      this.setData({
        isShowGetUser: false
      })
    }
    var idArr = [];
    var buy_num = [];
    var list = this.data.list;
    var isSelect = false;
    for(var i in list) {
      if (list[i].status == 1){
        isSelect = true;
        idArr.unshift(list[i].id);
        buy_num.push(Number(list[i].buy_num));
      }
    }
    if (isSelect){
      let link = { method: 'cache_order', canshu: '' };
      let data = { id: this.data.ids, attr: this.data.attr, buy_num: buy_num,type: 2 };
      let logic = (ret) => {
        wx.navigateTo({
          url: '../orderAccount/index',
        })
      }
      api.post(this, link, data, logic);
    }else{
      wx.showToast({
        title: '请选择商品',
        icon: 'none',
        duration: 1000
      })
    }
  },

  //删除
  delTap:function(e){
    var idx = e.currentTarget.dataset.idx;
    var list = this.data.list;
    let link = { method: 'cart_del', canshu: '&cart_id=' + list[idx].id };
    let logic = (ret) => {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration:1000
      })
      var sl = Number(this.data.nums);
      var num = Number(list[idx].buy_num);
      var price = parseFloat(list[idx].price);
      var nums = (sl - num).toString();
      if (list[idx].status==1){
        this.totalNum(num, price, 0, idx);
      }
      wx.setTabBarBadge({
        index: 2,
        text: nums
      })
      list.splice(idx, 1);
      this.setData({
        list: list,
        isNoReturn: list.length>0?false:true
      })
    }
    api.post(this, link, {}, logic);
  },

  //touchstart
  touchS: function (e) {
    if (e.touches.length == 1) {
      var list = this.data.list;
      for (var i in list) {
        list[i].txtStyle = 0
      }
      this.setData({
        //设置触摸起始点水平方向位置  
        startX: e.touches[0].clientX,
        list: list
      });
    }
  },

  //touchmove
  touchM: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      //手指移动时水平方向位置  
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值  
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变  
        txtStyle = 0;
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离  
        txtStyle = disX;
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度  
          txtStyle = delBtnWidth;
        }
      }
      //获取手指触摸的是哪一项  
      var index = e.currentTarget.dataset.idx;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态  
      this.setData({
        list: list
      });
    }
  },

  //touchend
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置  
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离  
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮  
      var txtStyle = disX > delBtnWidth / 2 ? delBtnWidth : "0";
      //获取手指触摸的是哪一项  
      var index = e.currentTarget.dataset.idx;
      var list = this.data.list;
      list[index].txtStyle = txtStyle;
      //更新列表的状态
      this.setData({
        list: list
      });
    }
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*if (!app.getLoginKey()) {
      app.getLogin();
      return false;
    }
    if (wx.getStorageSync('userInfo') == '') {
      this.setData({
        isShowGetUser: true,
      })
    } else {
      this.setData({
        isShowGetUser: false
      })
    }*/
    let link = { method: 'cart_list', canshu: '&page=' + this.data.page };
    let logic = (ret) => {
      var list = ret.list;
      if (list.length > 0){
        for (var i = 0; i < list.length; i++) {
          list[i].status = 0;
          list[i].txtStyle = 0;
        }
        this.setData({
          list: list,
          isNoReturn: false
        })
      }else{
        this.setData({
          isNoReturn: true
        })
      }
    }
    this.setData({
      isCN: wx.getStorageSync('isCN')
    })
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
    var list = this.data.list;
    for (var i in list) {
      list[i].status = 0;
      list[i].txtStyle = 0;
    }
    this.setData({
      list: list,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      selectAll:false,
      total: 0.00,
      yx: 0
    })
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
    let link = { method: 'cart_list', canshu: '&page=' + this.data.page + 1 };
    let logic = (ret) => {
      var list = this.data.list;
      var data = ret.list;
      for (var i = 0; i < data.length; i++) {
        data[i].status = 0;
        data[i].txtStyle = 0;
      }
      list.concat(data);
      this.setData({
        list: list,
        page: this.data.page + 1
      })
    }
    api.post(this, link, {}, logic);
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