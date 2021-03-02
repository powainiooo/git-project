// pages/product/index.js
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
    page:1,
    isNoPage:false,
    idx:1,
    isNoReturn:false,
    zx_gd:0,
    jg_gd:0,
    xl_gd:0,
	  brandList: [],
	  brandId: 0,
	  cateList: [],
	  cateId: 0,
	  minPrice: '',
	  maxPrice: '',
	  showFilter: false
  },

  // 语言切换
  SwitchLag: function (e) {
    var Lag = e.detail.Lag;
    this.setData({
      isCN: Lag
    })
  },

  //排序
  sortTap:function(e){
    var idx = e.currentTarget.dataset.idx;
    if (idx == 2) {
	    if (this.data.xl_gd == 0){
		    var xl_gd = 1;
	    }
	    if (this.data.xl_gd == 1) {
		    var xl_gd = -1;
	    }
	    if (this.data.xl_gd == -1) {
		    var xl_gd = 1;
	    }
	    this.setData({
		    xl_gd
	    })
	    this.paixu(data);
    }else if (idx == 3) {
      if (this.data.jg_gd == 0){
        var jg_gd = 1;
      }
      if (this.data.jg_gd == 1) {
        var jg_gd = -1;
      }
      if (this.data.jg_gd == -1) {
        var jg_gd = 1;
      }
      this.setData({
        jg_gd: jg_gd
      })
	    this.paixu(data);
    }else if (idx == 4) {
	    this.setData({
		    showFilter: true
	    })
    }
    this.setData({
	    zx_gd: idx == 1 ? 1 : 0,
      idx:idx
    })
  },

  //排序方法
  paixu:function(){
    var id = this.data.id;
    let link = { method: 'cate_list', canshu: '&id=' + id + '&page=' + Number(this.data.page) };
    const data = {
	    new: this.data.zx_gd,
	    xl: this.data.xl_gd,
	    jg: this.data.jg_gd,
	    min_price: this.data.minPrice,
	    max_price: this.data.max_price,
	    brand_id: this.data.brandId,
	    cid: this.data.cateId,
    }
    let logic = (ret) => {
      this.setData({
	      showFilter: false,
        list: ret.list,
	      brandList: ret.brand,
	      cateList: ret.cate_list,
        isNoReturn: ret.list.length > 0 ? false : true
      })
    }
    api.post(this, link, data, logic);
  },

	// 充值
	reset () {
  	   this.setData({
	      zx_gd:0,
	      jg_gd:0,
	      xl_gd:0,
	      brandId: 0,
	      cateId: 0,
	      minPrice: '',
	      maxPrice: ''
      })
		this.paixu()
	},

	// 选择品牌
	selectBrand (e) {
		this.setData({
			brandId: e.target.dataset.id
		})
	},

	// 选择分类
	selectCate (e) {
		this.setData({
			cateId: e.target.dataset.id
		})
	},

	// 输入价格
	inputPrice (e) {
		this.setData({
			[e.target.dataset.key]: e.detail.value
		})
	},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(55,options);
    if (options && options.id != ''){
      let link = { method: 'cate_list', canshu: '&id=' + options.id + '&page=' + Number(this.data.page)};
      let logic = (ret) => {
        this.setData({
          id: options.id,
          list: ret.list,
	        brandList: ret.brand,
	        cateList: ret.cate_list,
          isNoReturn: ret.list.length > 0 ? false : true,
          isCN: wx.getStorageSync('isCN')
        })
      }
      api.post(this, link, {}, logic);
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
    console.log(Number(this.data.page) + 1)
    var page = Number(this.data.page) + 1;
    let link = { method: 'cate_list', canshu: '&id=' + this.data.id + '&page=' + page };
    let data = this.data.data;
    let logic = (ret) => {
      if (ret.list.length > 0){
        var list = this.data.list;
        list = list.concat(ret.list);
        this.setData({
          list: list,
          isNoPage:false,
          page: page
        })
      }else{
        this.setData({
          isNoPage:true
        })
      }
    }
    api.post(this, link, data, logic);
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
