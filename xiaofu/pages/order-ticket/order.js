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
    isList:true
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
  changeTab(e){
    let val = e.currentTarget.dataset.val;
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
    this.setData({
      isList:true,
      isDrink:true,
      isMove:val
    });
    setTimeout(()=>{
      this.setData({
        isDrink:val,
        isList:!val
      });
    },500)
  },
  getListData(){
    let self = this;
    wx.request({
      url: app.globalData.ajaxSrc+'/user_order',
      data:{
        openid:app.globalData.userOpenID
      },
      success: function(res) {
        console.log(res.data);
        let list = res.data.data.list;
        self.setData({
          listData:list
        });
      }
    })
  },
  getListData2(){
    let self = this;
    wx.request({
      url:app.globalData.ajaxSrc+"/order_center",
      data:{
        openid:app.globalData.userOpenID
      },
      success:res=>{
        let list = res.data.data.list;
        this.setData({
          listData2:list
        });
      }
    })
  }
});