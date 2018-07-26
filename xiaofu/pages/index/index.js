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
    showBuyInfos:false,
    toggleButton:true,
    ticketExtraClass:''
  },  
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(options.id);
    let id = options.id || -1;
    if(id != -1){
      let animation3 = wx.createAnimation({
        duration:0,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation3.bottom(0).step();
      this.setData({
        showTicketDetail:true,
        showTicketList:false,
        toggleButton:false,
        isSimple:false,
        detailTop:'160rpx',
        showDetailsInfos:true,
        footerAniData:animation3.export()
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
    this.drawPoster();

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
    wx.showLoading();
    wx.createSelectorQuery().select('#bodyFrame').boundingClientRect(function(rect){
      self.setData({
        showTicketDetail:true,
        toggleButton:false,
        detailTop:top+rect.top+'px'
      });
      self.data.lastDetailTop = top+rect.top;
      self.data.lastBodyTop = rect.top;
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
          detailTop:'160rpx'
        });
        wx.pageScrollTo({
          scrollTop:0,
          duration: 0
        });
      },700);
      setTimeout(()=>{
        wx.hideLoading();
        self.setData({
          showDetailsInfos:true
        });
      },1550)
    }).exec()
  },
  doClose(){//关闭详情页
    this.setData({
      showTicketList:true,
      toggleButton:true,
      ticketExtraClass:'',
      showDetailsInfos:false,
      showBuyInfos:false
    });
    setTimeout(()=>{
      wx.pageScrollTo({
        scrollTop: Math.abs(this.data.lastBodyTop),
        duration: 0
      });
      this.setData({
        detailTop:'160rpx'
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

      let animation2 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation2.opacity(1).step();
      let animation3 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation3.bottom('-170rpx').step();
      this.setData({
        detailAniData:animation.export(),
        indexAniData:animation2.export(),
        footerAniData:animation3.export(),
        isSimple:true
      });
    },50);
    setTimeout(()=>{
      this.setData({
        showTicketDetail:false
      })
    },600);
  },
  gotoBuy(){
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
    let animation = wx.createAnimation({
      duration:0,
      timingFunction:'cubic-bezier(.22,.62,.37,1)'
    });
    animation.bottom('-160rpx').step();
    this.setData({
      ticketExtraClass:'ticket-buy',
      footerAniData:animation.export(),
      showDetailsInfos:false,
      showBuyInfos:true
    })
  },
  drawPoster(){
    console.log('draw poster');
    wx.showLoading();
    const ctx = wx.createCanvasContext('poster');
    //背景色
    ctx.rect(0, 0, 750, 760);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    //顶部Logo图
    ctx.drawImage('https://powainiooo.github.io/git-project/xiaofu/res/images/top.png', 0, 0, 750, 145);
    //日期
    ctx.setFontSize(27);
    ctx.setFillStyle('#000000');
    ctx.fillText('2         0         1         8',20,190);
    ctx.font = "27px 'Helve'";
    ctx.setFontSize(100);
    ctx.fillText('09/08',20,300);
    //标题
    ctx.setFontSize(50);
    ctx.fillText('French kiwi jucie of one one',20,390);
    // 竖线
    ctx.setStrokeStyle('#cecece');
    ctx.beginPath();
    ctx.moveTo(310,160);
    ctx.lineTo(310,320);
    ctx.stroke();
    //横线 短
    ctx.beginPath();
    ctx.moveTo(0,210);
    ctx.lineTo(310,210);
    ctx.stroke();
    //横线 长
    ctx.beginPath();
    ctx.moveTo(0,320);
    ctx.lineTo(750,320);
    ctx.stroke();
    //logo
    ctx.drawImage('https://powainiooo.github.io/git-project/xiaofu/res/images/img/logo1.png',540-125,240-40,250,80);
    //详情图
    ctx.drawImage('https://powainiooo.github.io/git-project/xiaofu/res/images/img/ticket-img1.jpg',0,420,750,650);
    //底部logo
    ctx.drawImage('https://powainiooo.github.io/git-project/xiaofu/res/images/bottom.png',450,460,300,300);

    setTimeout(()=>{
      wx.hideLoading();
      ctx.draw(true,function(){
        console.log('poster');
        wx.canvasToTempFilePath({
          canvasId: 'poster',
          x:0,
          y:0,
          width:750,
          height:750,
          destWidth:750,
          destHeight:750,
          success:function(res){
            //wx.saveImageToPhotosAlbum({
            //  filePath: res.tempFilePath,
            //  success(){
            //    wx.showToast({
            //      title: '保存成功',
            //      icon: 'success',
            //      duration: 2000
            //    })
            //  }
            //})
          }
        })
      })
    },500)

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
  onShareAppMessage(res){
    return {
      title:'test',
      path:'pages/index/index?id=1000'
    }
  }
});
