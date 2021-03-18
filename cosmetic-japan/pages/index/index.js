//index.js
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
	   www,
	   imgUrl,
		yxGoodsList: [],
	   bannerList: [],
	   adList1: [],
	   adList2: [],
	   brandList: [],
	   companyList: [],
	   lastCompanyList: [],
	   logo: '',
	   showCompany: false,
	   fxs_id: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
		 console.log(123,options);
   	if (options.mid) {
   		app.setMid(options.mid)
	   }
	   if (options.fxs_id && options.mid) {
			 console.log(22,options.fxs_id);
		   app.setFxsId(options.fxs_id,options.mid)
	   }
	   if (!app.getLoginKey()) {
		   console.log('index page no login');
		   app.getLogin(() => {
			   this.getIndexData()
		   });
		   return;
	   }
	   this.getIndexData()
   },
	getIndexData () {
		const link = { method: 'index', canshu:''};
		api.post(this, link, {}, (res) => {
			console.log('res', res)
			if (res.ret == '1002') {
				this.setData({
					companyList: res.data.all_mid,
					lastCompanyList: res.data.last_mid,
					showCompany: true
				})
			} else {
				this.setData({
					yxGoodsList: res.yx_goods,
					bannerList: res.ads_list_max,
					adList1: res.ads_list_zhong,
					adList2: res.ads_list_min,
					brandList: res.brand,
					logo: res.logo,
					fxs_id: res.fxs_id
				})
				// app.setFxsId(res.fxs_id)

				this.getCompany()
			}
		});
	},
	getCompany () {
		const link = { method: 'more_company', canshu:''};
		api.post(this, link, {}, (res) => {
			console.log('res', res)
			this.setData({
				companyList: res.all_mid,
				lastCompanyList: res.last_mid
			})
		});
	},
	openCompany () {
   	this.setData({
		   showCompany: true
	   })
	},
	closeCompany (e) {
   	console.log('closeCompany', e)
		const { mid } = e.currentTarget.dataset
		app.setMid(mid)
		wx.reLaunch({
			url: '/pages/index/index'
		})
   	// this.setData({
		//    showCompany: false
	   // })
	},
	// 搜索获取焦点
	SerchFocus: function(){
		wx.navigateTo({
			url: '../serch/index',
		})
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
	   app.shareCallback()
	   return {
		   title: '商城',
		   path: `/pages/index/index?mid=${app.globalData.mid}&fxs_id=${this.data.fxs_id}`
	   }
   }
})
