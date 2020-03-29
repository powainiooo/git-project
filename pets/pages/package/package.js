// pages/package/package.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      listData:[],
      selectedId:-1,
      selectedPrice:0,
      showDetails:false,
      imgSrc:app.globalData.imgSrc,
      proDetailData:{},
      selectedIndex:0
   },
   doselected(e){
      setTimeout(()=>{
         let id = e.currentTarget.dataset.id;
         let price = e.currentTarget.dataset.price;
         this.data.selectedIndex = e.currentTarget.dataset.index;
         this.setData({
            selectedId:id,
            selectedPrice:price
         });
      },200);
   },
   //下一步
   doNext(){
      if(this.data.selectedId == -1){
         wx.showToast({
            title:'请选择套餐',
            image:'../../res/img/warn.png'
         })
      }else{
         app.globalData.proPackage = this.data.listData[this.data.selectedIndex];
         console.log(JSON.stringify(app.globalData.proPackage))
         wx.navigateTo({
            url: '/pages/information/information'
         })
      }
   },
   gotoSelect(){
      wx.navigateTo({
         url: '/pages/select/select'
      })
   },
   //打开详情页
   openDetail(e){
      let id = e.currentTarget.dataset.id;
      setTimeout(()=>{
         wx.request({
            url:app.globalData.ajaxSrc+"product_info",
            data:{id:id},
            success:res=>{
               this.setData({
                  proDetailData:res.data.data.info,
                  showDetails:true
               })
            }
         });
      },150)
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      this.getData()
   },
   getData(){
      wx.request({
         url:app.globalData.ajaxSrc+"group_list",
         data:{
            pet_id:app.globalData.petId
         },
         success:res=>{
            this.setData({
               listData:res.data.data.list
            })
         }
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

   }
})