//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    addressList:['北京','上海','广州','深圳','南昌','惠州','成都'],
    addressIndex:0,
    showTicketDetail:false,
    detailTop:0,
    lastDetailTop:0,
    lastBodyTop:0,
    isSimple:true,
    detailAniData:{},
    indexAniData:{},
    footerAniData:{},
    showTicketList:true,
    showDetailsInfos:false,
    toggleButton:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    let id = options.id || -1;
    if(id != -1){
      this.setData({
        showTicketDetail:true,
        showTicketList:false,
        isSimple:false,
        detailTop:80,
        showDetailsInfos:true
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotoDetail(e){
    let top = e.target.offsetTop,self = this;
    wx.createSelectorQuery().select('#bodyFrame').boundingClientRect(function(rect){
      self.setData({
        showTicketDetail:true,
        toggleButton:false,
        detailTop:top+rect.top
      });
      self.data.lastDetailTop = top+rect.top;
      self.data.lastBodyTop = rect.top;
      console.log('rtop:'+rect.top);
      let animation = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation
          .top('160rpx')
          .height('auto')
          .left(0)
          .right(0)
          .step();
      let animation2 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation2.opacity(0).step();
      let animation3 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation3.bottom(0).step();
      self.setData({
        detailAniData:animation.export(),
        indexAniData:animation2.export(),
        footerAniData:animation3.export(),
        isSimple:false
      });

      setTimeout(()=>{
        self.setData({
          showTicketList:false,
          showDetailsInfos:true,
          detailTop:80
        });
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        })
      },1550)
    }).exec()
  },
  doClose(){//关闭详情页
    console.log('close');
    let animation2 = wx.createAnimation({
      duration:0,
      timingFunction:'cubic-bezier(.22,.62,.37,1)'
    });
    animation2.opacity(1).step();
    this.setData({
      showTicketList:true,
      toggleButton:true,
      indexAniData:animation2.export()
    });
    setTimeout(()=>{
      wx.pageScrollTo({
        scrollTop: Math.abs(this.data.lastBodyTop),
        duration: 0
      });
      this.setData({
        detailTop:80
      });
      let animation = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation
          .top(this.data.lastDetailTop)
          .height('650rpx')
          .left('10rpx')
          .right('10rpx')
          .step();

      let animation3 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation3.bottom('-170rpx').step();
      this.setData({
        detailAniData:animation.export(),
        footerAniData:animation3.export(),
        showDetailsInfos:false,
        isSimple:true
      });
      setTimeout(()=>{
        this.setData({
          showTicketDetail:false
        })
      },900);
    },50);
  },
  gotoBuy(){
    wx.navigateTo({
      url: '/pages/ticket-buy/buy'
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('hide');
  },
  onShow(){
    console.log('show')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');

  },
  onShareAppMessage(){

  }
});
