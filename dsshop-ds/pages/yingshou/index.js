// pages/yingshou/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srAll:'',
    list: [],
    openArr: [],
    animationArr: [],
    page:1,
    bool:false,
  },
  //展开订单编号
  bindopen: function(e){
    console.log(e.currentTarget.dataset.num)
    var num = e.currentTarget.dataset.num;
    var animationArr = this.data.animationArr;
    var _bool = this.data.openArr;//是否展开
    if (_bool[num]) {
      animationArr[num].animation.height('0').step();
      _bool[num] = false;
    } else {
      animationArr[num].animation.height('256rpx').step();
      _bool[num] = true;
    }
    animationArr[num].animationData = animationArr[num].animation.export()
    this.setData({
      openArr: _bool,
      animationArr: animationArr
    })

  },
  //初始化动画
  initAnimation: function(){
    var _arr = [];
    var animation;
    for (var i = 0; i < this.data.openArr.length; i++) {
      animation = tt.createAnimation({
        transformOrigin: "50% 50%",
        duration: 300,
        timingFunction: "ease-in-out",
        delay: 0
      });
      _arr.push({
        animation: animation,
        animationData: animation.export()
      });
    }
    this.setData({
      animationArr: _arr
    })
  },
  ajaxData: function(){
    if (this.data.bool) return false;
    tt.showLoading({
      title: '正在加载',
    })
    var url = urlPath + 'api/fxpt/sr_detail'
    appRequest({
      url: url,
      data: {page: this.data.page},
      success: res => {
        var info = res.data.data;
        var arr = [];
        for(var i = 0;i<info.result.length;i++) {
          arr.push(false)
        }
        var bool = false;
        if (info.result.length < 10) {
          bool = true;
        }
        console.log(this.data.list.concat(info.result))
        this.setData({
          srAll: info.ljsr,
          list: this.data.list.concat(info.result),
          openArr: this.data.openArr.concat(arr),
          page: this.data.page + 1,
          bool: bool,
        },()=>{
          this.initAnimation()
        })
      },
      complete: res => {
        tt.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.ajaxData();
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
    this.ajaxData()
  },
})
