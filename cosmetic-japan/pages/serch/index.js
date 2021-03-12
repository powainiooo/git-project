// pages/serch/index.js
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
    isNoReturn: true,
    list:{},
    page:1,
    word:''
  },

  // 搜索
  searchTap:function(e){
    var keyword = this.data.keyword;
    var keywords = wx.getStorageSync('keywords') || [];
    var isYes = false;
    if (keywords){
      for (var i=0;i < keywords.length;i++) {
        if (keywords[i] == keyword) {
          isYes = true;
          break;
        }
      }
    }else{
      keywords.push(keyword);
      wx.setStorageSync('keywords', keywords);
    }
    if (!isYes) {
      keywords.push(keyword);
      wx.setStorageSync('keywords', keywords);
      this.setData({
        keywords: keywords
      })
    }
    this.search(keyword);
  },

  //热门词和搜索历史搜索
  keywordsTap:function(e){
    var keyword = e.currentTarget.dataset.keyword;
    //console.log(keyword);
    this.setData({
      keyword: keyword
    })
    var isYes = false;
    var keywords = wx.getStorageSync('keywords') || [];
    if (keywords) {
      for (var i = 0; i < keywords.length; i++) {
        if (keywords[i] == keyword) {
          isYes = true;
          break;
        }
      }
    } else {
      keywords.push(keyword);
      wx.setStorageSync('keywords', keywords);
    }
    if (!isYes) {
      keywords.push(keyword);
      wx.setStorageSync('keywords', keywords);
      this.setData({
        keywords: keywords
      })
    }
    this.search(keyword);
  },

  //删除关键词
  delTap:function(e){
    var index = e.currentTarget.dataset.index;
    var keywords = wx.getStorageSync('keywords');
    keywords.splice(index,1);
    wx.setStorageSync('keywords', keywords);
    if (keywords.length == 0){
      this.setData({
        isNoSearch: true
      })
    }
    this.setData({
      keywords: keywords
    })
  },

  // 清空搜索记录
  clearTap:function(){
    var keywords = [];
    wx.setStorageSync('keywords', keywords);
    this.setData({
      keywords: keywords,
      isNoSearch: true
    })
  },

  //搜索输入
  inputTap:function(e){
    var keyword = e.detail.value;
    this.data.keyword = keyword
    if (keyword == ''){
      this.setData({
        isNoReturn: true
      })
    }
  },

  //搜索
  search: function (keyword){
  	const kw = this.data.keyword
	  console.log('kw', kw)
    let link = { method: 'search', canshu: '&search=' + kw + '&page=' + this.data.page};
    let logic = (ret) => {
      if (ret.result.length > 0){
        this.setData({
          page: 1,
          isNoReturn: true,
          list: ret.result,
        })
      }else{
        this.setData({
          page: 1,
          isNoReturn: false,
        })
      }
    }
    api.post(this, link, {}, logic);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (wx.getStorageSync('keywords').length == 0){
      this.setData({
        isNoSearch:true
      })
    }else{
      this.setData({
        isNoSearch: false
      })
    }
    let link = { method: 'rmss', canshu: '&page=' + this.data.page};
    let logic = (ret) => {
      this.setData({
        rmss: ret,
        isCN: wx.getStorageSync('isCN'),
        keywords: wx.getStorageSync('keywords')
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
    let page = this.data.page;
    let link = { method: 'search', canshu: '&search=' + this.data.keyword + '&page=' + parseInt(page + 1) };
    let logic = (ret) => {
      if (ret.result.length > 0) {
        var list = ret.result;
        list.concat(this.data.list);
        this.setData({
          isNoReturn: true,
          list: list,
          page:this.data.page + 1
        })
      }
    }
    api.post(this, link, {}, logic);
  },
})
