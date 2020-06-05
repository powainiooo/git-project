// pages/order/detail.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      timer:30*60,
      timeT:0,
      showDetails:false,
      showRefund:false,
      orderNum:'',
      detailData:{},
      proDetailData:{},
      year:'',
      month:'',
      day:'',
      selectWeek: '',
      imgSrc:app.globalData.imgSrc,
      week: ['Sun\n周日', 'Mon\n周一', 'Tue\n周二', 'Wed\n周三', 'Thur\n周四', 'Fri\n周五', 'Sat\n周六'],
      sexArr:[
         {name: '公', value: '1'},
         {name: '母', value: '2'},
         {name: '绝育', value: '3'}
      ],
      sexName: '',
	   startSec: 0
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.data.orderNum = options.orderNum || 'T2020041318111002';
      this.getData();
   },
   doGetDetail(e){
      let id = e.currentTarget.dataset.id;
      setTimeout(()=>{
         wx.request({
            url:app.globalData.ajaxSrc+"product_info",
            data:{id:id},
            success:res=>{
               this.setData({
                  proDetailData:res.data.data.info,
                  showDetails:true,
                  showRefund:false,
               })
            }
         });
      },150)
   },
   openRefund () {
      this.setData({
         showDetails:true,
         showRefund:true,
      })
   },
   timerCount(){
   	this.data.startSec = new Date().getTime()
      this.data.timeT = setInterval(()=>{
         if(this.data.timer <= 0){
            clearInterval(this.data.timeT)
	         this.getData()
         }else{
            let timer = this.data.timer - 1;
            this.setData({
               timer:timer
            })
         }
      },1000)
   },
   getData(){
      wx.request({
         url:app.globalData.ajaxSrc+"order_desc",
         data:{
            order_num: this.data.orderNum
         },
         success:res=>{
         	console.log('订单详情数据', res.data.data)
            let date = res.data.data.date;
            let timer = parseInt(res.data.data.sec);
            const selectWeek = new Date(res.data.data.date).getDay()
            const sexItem = this.data.sexArr.find(i => i.value === res.data.data.pet_sex)
            this.setData({
               detailData:res.data.data,
               year:date.slice(0,4),
               month:date.slice(5,7),
               day:date.slice(8,10),
               timer:timer,
               selectWeek: this.data.week[selectWeek],
               sexName: sexItem.name
            });
            if(res.data.data.status === 'useing'){
               this.timerCount();
            }
         }
      })
   },
   gotoFeedback(){
      wx.navigateTo({
         url: '/pages/feedback/feedback?orderNum='+this.data.orderNum
      })
   },
   //打开地图
   openMap(e){
      setTimeout(() => {
         let store = this.data.detailData.shop_info;
         wx.openLocation({
            latitude: parseFloat(store.latitude),
            longitude: parseFloat(store.longitude),
            name:store.title,
            address:store.address,
            scale: 28
         })
      },150);
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
		const currentSec = new Date().getTime()
	   const timer = parseInt(this.data.detailData.sec) - parseInt((currentSec - this.data.startSec)/1000)
	   this.setData({
		   timer:timer
	   })
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
