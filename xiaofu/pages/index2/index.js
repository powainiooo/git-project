//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    detailData: {},
    singlePrice:0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    addressList:['深圳','珠海','佛山','北京','上海','武汉','成都','广州','中山','湛江','青岛','阳江'],
    citiesLeft:0,
    listData:[],
    listSimpleIndex:-1,
    listAnimatIndex:-1,
    lastBodyTop:0,
    lastTop:0,
    toggleButton:true,
    showIndex:true,
    showTicketDetail:false,
    showBuyInfos:false,
    indexAniData:{},
    selectTicketAniData:{},
    footerAniData:{},
    selectTicketTop:'0px',
    selectTicketClass:'',
    isLoading:false,
    isEnd:false,
    page:1,
    keywords:''
  },
  //事件处理函数
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
    this.getListData();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //进入详情
  gotoDetail(e){
    let top = e.currentTarget.offsetTop,
        index = e.target.dataset.index,
        id = e.target.dataset.id,
        self = this;
    wx.createSelectorQuery().select('#bodyFrame').boundingClientRect(function(rect){
      self.data.lastBodyTop = rect.top;
      self.data.lastTop = top+rect.top+'px';
      console.log('rect:'+rect.top);
      console.log(e);
      let animation2 = wx.createAnimation({
        duration:0,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation2.top(self.data.lastTop).step();
      self.setData({
        listAnimatIndex:index,
        selectTicketAniData:animation2.export(),
        selectTicketClass:'item-fixed'
      });
      //return;
      setTimeout(()=>{
        let animation = wx.createAnimation({
          duration:500,
          timingFunction:'linear'
        });
        animation.opacity(0.5).step();
        animation2
            .top('120rpx')
            .left(0)
            .right(0)
            .step({
              duration:500,
              timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
            });
        let animation3 = wx.createAnimation({
          duration:500,
          timingFunction:'cubic-bezier(.22,.62,.37,1)'
        });
        animation3.bottom(0).step();
        self.setData({
          listSimpleIndex:index,
          indexAniData:animation.export(),
          selectTicketAniData:animation2.export(),
          footerAniData:animation3.export()
        });
      },50);

      setTimeout(()=>{
        self.setData({
          showIndex:false,
          toggleButton:false,
          selectTicketClass:'item-absolute'
        });
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });
        self.getDetailData(id);
      },700);
    }).exec()
  },
  //返回详情
  doClose(){//关闭详情页
    this.setData({
      listSimpleIndex:-1,
      selectTicketClass:'item-fixed',
      toggleButton:true,
      showIndex:true,
      showTicketDetail:false,
      showBuyInfos:false
    });
    let animation2;
    setTimeout(()=>{
      wx.pageScrollTo({
        scrollTop: Math.abs(this.data.lastBodyTop),
        duration: 0
      });

      let animation = wx.createAnimation({
        duration:500,
        timingFunction:'linear'
      });
      animation.opacity(1).step();
      animation2 = wx.createAnimation({
        duration:500,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation2
          .top(this.data.lastTop)
          .left('10rpx')
          .right('10rpx')
          .step();
      let animation3 = wx.createAnimation({
        duration:600,
        timingFunction:'cubic-bezier(.22,.62,.37,1)'
      });
      animation3.bottom('-170rpx').step();
      this.setData({
        indexAniData:animation.export(),
        selectTicketAniData:animation2.export(),
        footerAniData:animation3.export()
      });
    },50);
    setTimeout(()=>{
      animation2.top(0).step({
        duration:0,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      this.setData({
        selectTicketAniData:animation2.export(),
        selectTicketClass:''
      });
    },700);
    setTimeout(()=>{
      this.setData({
        listAnimatIndex:-1
      });
    },800);
  },
  //进入购买页
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
      footerAniData:animation.export(),
      showDetailsInfos:false,
      showBuyInfos:true
    })
  },
  //生成海报
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
  //获取列表数据
  getListData(){
    let self = this;
    if(self.data.isLoading) return;
    if(self.data.isEnd) return;
    if(self.data.showTicketDetail) return;
    self.setData({
      isLoading:true
    });
    wx.request({
      url: app.globalData.ajaxSrc+'/pro_list', //仅为示例，并非真实的接口地址
      data: {
        keywords: self.data.keywords,
        page: self.data.page,
        city: self.data.city,
        activityID: ''
      },
      success: function(res) {
        let list = res.data.data.list;
        if(self.data.page == 1){
          self.setData({
            isEnd:list.length<10,
            isLoading:false,
            listData:list
          });
        }else{
          self.setData({
            isEnd:list.length<10,
            isLoading:false,
            listData:self.data.listData.concat(list)
          });
        }
      }
    })
  },
  //获取详情数据
  getDetailData(id){
    let self = this;
    console.log(id);
    wx.request({
      url: app.globalData.ajaxSrc+'/product_info', //仅为示例，并非真实的接口地址
      data: {
        tid: id
      },
      success: function(res) {
        let data = res.data,ticket = data.data.anew[0].price || 0;
        for(let item of data.data.anew){
          if(ticket > item.price){
            ticket = item.price
          }
        }
        self.setData({
          singlePrice:ticket,
          detailData:data.data,
          showTicketDetail:true
        });
      }
    })
  },
  //下拉刷新
  onReachBottom(){
    console.log('down refresh');
    this.data.page ++;
    this.getListData();
  },
  //搜索
  doSearch(e){
    this.data.keywords = e.detail;
  },
  //分享
  onShareAppMessage(res){
    return {
      title:'test',
      path:'pages/index/index?id=1000'
    }
  }
});
