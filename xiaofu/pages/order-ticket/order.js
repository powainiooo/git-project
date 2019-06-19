// pages/order-ticket/order.js
const app = getApp();
Page({
  data: {
    showTicketDetail:false,
    showTicketIndex:true,
    listData:[],
    listData2:[],
    isSimple:true,
    detailTop:80,
    indexAniData:{},
    detailAniData:{},
    currentIndex:0,
    imgSrc:app.globalData.imgSrc,
    isMove:false,
    isDrink:true,
    isList:true,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userOpenID != null){
      this.getListData();
      this.getListData2();
    }
    app.userInfoReadyCallback = res => {
      this.getListData();
      this.getListData2();
    }
  },
  gotoDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-ticket/detail?id='+id
    })
  },
  gotoDetail2(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-drink/detail?oid='+id
    })
  },
  changeTab(e){
    let val = e.currentTarget.dataset.val;
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
	  if(val){
		  this.getListData2();
	  }else{
		  this.getListData();
	  }
    this.setData({
      isMove:val
    });
  },
  getListData(){
    let self = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.ajaxSrc+'/user_order',
      data:{
        openid:app.globalData.userOpenID
      },
      success: function(res) {
	      self.setData({
		      listData:res.data.data.list
	      });
        wx.hideNavigationBarLoading();
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
  },
  getListData2(){
    let self = this;
    wx.showNavigationBarLoading();
    wx.request({
      url:app.globalData.ajaxSrc+"/order_center",
      data:{
        openid:app.globalData.userOpenID
      },
      success:res=>{
	      self.setData({
		      listData2:res.data.data.list
	      });
        wx.hideNavigationBarLoading();
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
  }
});
