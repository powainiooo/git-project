//index.js
//获取应用实例
const app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const qMap = new QQMapWX({
  key:'AH7BZ-VV736-WNUSA-EP35M-3TCOZ-DTBXG'
});
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    detailData: {},
    singlePrice:0,
    hasUserInfo: app.globalData.userInfo !== null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    addressList:[],
    addressIndex:0,
    citiesLeft:0,
    bannerImg:'',
    bannerLink:'',
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
    loadHint:'',
    lastLoadHint:'',
    page:1,
    keywords:'',
    city:'',
    imgSrc:app.globalData.imgSrc,
    shareImgSrc:''
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
    this.getAddressData();
    let cityID = 0;
    try {
      cityID = wx.getStorageSync('lastCityID');
    } catch (e) {
      cityID = 0;
    }
    this.setData({
      city:cityID
    });
    this.getListData();

    let self = this;
    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          cityItemWidth:Math.floor(res.windowWidth/5)
        });
      }
    })
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
    if(this.data.showTicketDetail) return;
    let top = e.currentTarget.offsetTop,
        index = e.target.dataset.index,
        id = e.target.dataset.id,
        self = this;
    this.data.lastLoadHint = this.data.loadHint;
    wx.createSelectorQuery().select('#bodyFrame').boundingClientRect(function(rect){
      self.data.lastBodyTop = rect.top;
      self.data.lastTop = top+rect.top+'px';
      let animation2 = wx.createAnimation({
        duration:0,
        timingFunction:'cubic-bezier(.22,.62,.4,1.16)'
      });
      animation2.top(self.data.lastTop).step();
      self.setData({
        singlePrice:self.data.listData[index].minprice,
        loadHint:'',
        listAnimatIndex:index,
        selectTicketAniData:animation2.export(),
        selectTicketClass:'item-fixed'
      });
      //return;
      setTimeout(()=>{
        let animation = wx.createAnimation({
          duration:200,
          timingFunction:'linear'
        });
        animation.opacity(0).step();
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
      loadHint:this.data.lastLoadHint,
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
        duration:200,
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
    let data = this.data.detailData.info,imgSrc = app.globalData.imgSrc,type = data.type,self=this;
    wx.showLoading();
    const ctx = wx.createCanvasContext('poster');
    //背景色
    ctx.rect(0, 0, 750, 760);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    //顶部Logo图
    ctx.drawImage('../../res/images/top.png', 0, 0, 750, 145);
    //日期
    ctx.setFontSize(27);
    ctx.setFillStyle('#000000');
    let ten = data.begin.slice(2,3),one = data.begin.slice(3,4);
    if(type == 1){
      ctx.fillText(`2         0         ${ten}         ${one}`,20,190);
    }else if(type == 2){
      ctx.fillText(`2           0           ${ten}           ${one}`,20,190);
    }else if(type == 3){
      ctx.fillText(`2           0           ${ten}           ${one}`,20,190);
    }
    ctx.font = "27px 'Helve'";
    if(type == 1){
      ctx.setFontSize(100);
      ctx.fillText(data.date,20,300);
    }else if(type == 2){
      ctx.setFontSize(80);
      ctx.fillText(data.date,20,294);
    }else if(type == 3){
      ctx.setFontSize(60);
      ctx.fillText(data.date,20,290);
    }
    //标题
    ctx.setFontSize(44);
    ctx.fillText(data.goods_name,20,390);
    // 竖线
    ctx.setStrokeStyle('#cecece');
    ctx.beginPath();
    if(type == 1){
      ctx.moveTo(310,160);
      ctx.lineTo(310,320);
    }else if(type == 2){
      ctx.moveTo(370,160);
      ctx.lineTo(370,320);
    }else if(type == 3){
      ctx.moveTo(380,160);
      ctx.lineTo(380,320);
    }

    ctx.stroke();
    //横线 短
    ctx.beginPath();
    ctx.moveTo(0,210);
    if(type == 1){
      ctx.lineTo(310,210);
    }else if(type == 2){
      ctx.lineTo(370,210);
    }else if(type == 3){
      ctx.lineTo(380,210);
    }
    ctx.stroke();
    //横线 长
    ctx.beginPath();
    ctx.moveTo(0,320);
    ctx.lineTo(750,320);
    ctx.stroke();
    //logo
    let logoXArr = [530-100,560-100,560-100];
    wx.downloadFile({
      url: imgSrc+data.cover,
      success: function(res) {
        if (res.statusCode === 200) {
          ctx.drawImage(res.tempFilePath,logoXArr[type-1],240-70,200,140);
        }
      }
    });

    //详情图
    wx.downloadFile({
      url: imgSrc+data.cover2,
      success: function(res1) {
        if (res1.statusCode === 200) {
          ctx.drawImage(res1.tempFilePath,0,420,750,650);
          //底部logo
          ctx.drawImage('../../res/images/bottom.png',450,460,300,300);
          wx.hideLoading();
          ctx.draw(true,function(){
            wx.canvasToTempFilePath({
              canvasId: 'poster',
              x:0,
              y:0,
              width:750,
              height:750,
              destWidth:750,
              destHeight:750,
              success:function(res){
                self.data.shareImgSrc = res.tempFilePath;
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success(){
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
              }
            })
          })
        }
      }
    });

  },
  //生成分享图
  drawSharePoster(){
    let data = this.data.detailData.info,imgSrc = app.globalData.imgSrc,type = data.type,self=this;
    const ctx = wx.createCanvasContext('posterShare');
    //背景色
    ctx.rect(0, 19, 750, 634);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    //顶部Logo图
    ctx.drawImage('../../res/images/ticket-top.png', 0, 0, 750, 19);
    //日期
    ctx.setFontSize(27);
    ctx.setFillStyle('#000000');
    let ten = data.begin.slice(2,3),one = data.begin.slice(3,4);
    if(type == 1){
      ctx.fillText(`2         0         ${ten}         ${one}`,20,64);
    }else if(type == 2){
      ctx.fillText(`2           0           ${ten}           ${one}`,20,64);
    }else if(type == 3){
      ctx.fillText(`2           0           ${ten}           ${one}`,20,64);
    }
    ctx.font = "27px 'Helve'";
    if(type == 1){
      ctx.setFontSize(100);
      ctx.fillText(data.date,20,174);
    }else if(type == 2){
      ctx.setFontSize(80);
      ctx.fillText(data.date,20,168);
    }else if(type == 3){
      ctx.setFontSize(60);
      ctx.fillText(data.date,20,164);
    }
    //标题
    ctx.setFontSize(44);
    ctx.fillText(data.goods_name,20,264);
    // 竖线
    ctx.setStrokeStyle('#cecece');
    ctx.beginPath();
    if(type == 1){
      ctx.moveTo(310,34);
      ctx.lineTo(310,194);
    }else if(type == 2){
      ctx.moveTo(370,34);
      ctx.lineTo(370,194);
    }else if(type == 3){
      ctx.moveTo(380,34);
      ctx.lineTo(380,194);
    }

    ctx.stroke();
    //横线 短
    ctx.beginPath();
    ctx.moveTo(0,84);
    if(type == 1){
      ctx.lineTo(310,84);
    }else if(type == 2){
      ctx.lineTo(370,84);
    }else if(type == 3){
      ctx.lineTo(380,84);
    }
    ctx.stroke();
    //横线 长
    ctx.beginPath();
    ctx.moveTo(0,194);
    ctx.lineTo(750,194);
    ctx.stroke();
    //logo
    let logoXArr = [530-100,560-100,560-100];
    wx.downloadFile({
      url: imgSrc+data.cover,
      success: function(res) {
        if (res.statusCode === 200) {
          ctx.drawImage(res.tempFilePath,logoXArr[type-1],114-70,200,140);
        }
      }
    });

    //详情图
    wx.downloadFile({
      url: imgSrc+data.cover2,
      success: function(res1) {
        if (res1.statusCode === 200) {
          ctx.drawImage(res1.tempFilePath,0,294,750,650);
          //底部logo
          ctx.drawImage('../../res/images/bottom.png',450,334,300,300);
          ctx.draw(true,function(){
            wx.canvasToTempFilePath({
              canvasId: 'posterShare',
              x:0,
              y:0,
              width:750,
              height:634,
              destWidth:750,
              destHeight:634,
              success:function(res){
                self.data.shareImgSrc = res.tempFilePath;
              }
            })
          })
        }
      }
    });

  },
  //获取列表数据
  getListData(){
    let self = this;
    if(self.data.showTicketDetail) return;
    if(self.data.loadHint != '') return;
    self.setData({
      loadHint:'loading'
    });
    wx.request({
      url: app.globalData.ajaxSrc+'/pro_list', //仅为示例，并非真实的接口地址
      data: {
        keyword: self.data.keywords,
        page: self.data.page,
        city: self.data.city,
        activityID: ''
      },
      success: function(res) {
        let list = res.data.data.list,hint = '';
        if(self.data.page == 1){
          if(list.length < 10 && list.length > 0){
            hint = 'end';
          }else if(list.length == 0){
            hint = 'empty';
          }
          self.setData({
            loadHint:hint,
            listData:list
          });
        }else{
          hint = list.length<10 ? 'end' : '';
          self.setData({
            loadHint:hint,
            listData:self.data.listData.concat(list)
          });
        }
      }
    })
  },
  //获取详情数据
  getDetailData(id){
    let self = this;
    wx.request({
      url: app.globalData.ajaxSrc+'/product_info', //仅为示例，并非真实的接口地址
      data: {
        tid: id
      },
      success: function(res) {
        let data = res.data;
        self.setData({
          detailData:data.data,
          showTicketDetail:true
        });
        self.drawSharePoster();
      }
    })
  },
  //获取地址、banner
  getAddressData(){
    let self = this;
    wx.request({
      url: app.globalData.ajaxSrc+'/city_banner',
      success: function(res) {
        let city = res.data.data.citys,index = 0;
        for(let i=0;i<city.length;i++){
          if(city[i].id == self.data.city){
            index = i + 1;
          }
        }
        self.setData({
          citiesLeft:self.data.cityItemWidth*(index-2),
          addressList:city,
          addressIndex:index,
          bannerImg:res.data.data.cover,
          bannerLink:res.data.data.blink
        });
        self.getLocation();
      }
    })
  },
  //获取定位
  getLocation(){
    let self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        qMap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
            //latitude: 22.678323,
            //longitude: 114.36091
          },
          success: function(res) {
            let city = res.result.address_component.city;
            let cities = self.data.addressList,cityID,index = -1;
            //判断本地地址是否匹配城市列表
            for(let i=0;i<cities.length;i++){
              let reg = new RegExp(cities[i].name);
              if(reg.test(city)){
                cityID = cities[i].id;
                index = i + 1;
                break;
              }
            }
            if(index != -1 && cityID != self.data.city){
              wx.showModal({
                content: '是否切换到 ' + city,
                success: function(res) {
                  if (res.confirm) {//点击确定
                    self.setData({
                      loadHint:'',
                      citiesLeft:self.data.cityItemWidth*(index-2),
                      addressIndex:index,
                      city:cityID
                    });
                    self.getListData();
                    wx.setStorage({
                      key:"lastCityID",
                      data:cityID
                    });
                  }
                }
              })
            }
          }
        });
      }
    });

  },
  //切换城市
  changeCity(e){
    let id = e.currentTarget.dataset.id,index = e.currentTarget.dataset.index;
    this.setData({
      citiesLeft:this.data.cityItemWidth*(index-2),
      addressIndex:index,
      city:id,
      loadHint:''
    });
    this.getListData();
    wx.setStorage({
      key:"lastCityID",
      data:id
    });
  },
  //下拉刷新
  onReachBottom(){
    if(this.data.loadHint != '') return;
    this.data.page ++;
    this.getListData();
  },
  //搜索
  doSearch(e){
    this.data.keywords = e.detail;
    this.data.page = 1;
    this.data.loadHint = '';
    this.getListData();
  },
  //分享
  onShareAppMessage(res){
    return {
      title:this.data.detailData.info.goods_name,
      imageUrl:this.data.shareImgSrc,
      path:'pages/index/index?id='+this.data.detailData.info.id
    }
  }
});
