// pages/order/list.js
import {getUserMoney} from "../../utils/api"

const app = getApp();
Page({
   /**
    * 页面的初始数据
    */
   data: {
      listData:[],
      week: ['Sun\n周日', 'Mon\n周一', 'Tue\n周二', 'Wed\n周三', 'Thur\n周四', 'Fri\n周五', 'Sat\n周六'],
	   userAmount: 0,
	   hasAmount: false
   },
   gotoDetail(e){
      let num = e.currentTarget.dataset.num;
      wx.navigateTo({
         url: '/pages/order/detail?orderNum='+num
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getData();
      this.getMoney();
      this.setData({
	      userAmount: app.globalData.userAmount
      })
   },
   getData(){
      wx.request({
         url:app.globalData.ajaxSrc+"user_order",
         data:{
            openid:app.globalData.userOpenID,
            page:1
         },
         success:res=>{
            let list = []
            for (let i of res.data.data.list) {
               const day = new Date(i.date).getDay()
               i.week = this.data.week[day]
               list.push(i)
            }
            this.setData({
               listData: list
            })
         }
      })
   },
	getMoney () {
		const openid = app.globalData.userOpenID
		if (openid === '') return
		getUserMoney({openid}).then(res=> {
			if (Array.isArray(res.data)) {
				app.globalData.userAmount = 0
			} else {
				app.globalData.userAmount = res.data.amount
			}
			this.setData({
				userAmount: app.globalData.userAmount,
				hasAmount: !Array.isArray(res.data)
			})
		})
	},
   toConsumer () {
      wx.navigateTo({
         url: '/pages/deposit/comsumer'
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

   }
})
