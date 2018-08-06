// pages/order-ticket/order.js
const app = getApp();
Page({
  data: {
    showTicketDetail:false,
    showTicketIndex:true,
    listData:[],
    isSimple:true,
    detailTop:80,
    indexAniData:{},
    detailAniData:{},
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userOpenID != null){
      this.getListData();
    }
    app.userInfoReadyCallback = res => {
      this.getListData();
    }
  },
  /**
   * 显示详情
   */
  doShowDetail(e){
    let top = e.currentTarget.offsetTop,self = this;
    wx.createSelectorQuery().select('#bodyFrame').boundingClientRect(function(rect){
      self.setData({
        currentIndex:e.currentTarget.dataset.index,
        showTicketDetail:true,
        detailTop:top+rect.top
      });

      let animation = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation.top('160rpx').step();
      let animation2 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation2.opacity(0).step();
      self.setData({
        detailAniData:animation.export(),
        indexAniData:animation2.export(),
        isSimple:false
      });

      setTimeout(()=>{
        self.setData({
          showTicketIndex:false,
          detailTop:80
        });
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      },600)
    }).exec();
  },
  gotoDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order-ticket/detail?id='+id
    })
  },
  swiperChange(e){
    this.setData({
      currentIndex:e.detail.current
    });
  },
  getOpacity(e){
    if(this.data.showTicketIndex){
      return false
    }else{
      if(e.currentTarget.dataset.index == this.data.currentIndex){
        return true;
      }
    }
    return false;
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
  }
});