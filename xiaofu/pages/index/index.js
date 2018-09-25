//index.js
//获取应用实例
const app = getApp();
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const qMap = new QQMapWX({
  key:'AH7BZ-VV736-WNUSA-EP35M-3TCOZ-DTBXG'
});
const {promisify} = require('../../utils/util.js');
const wxDownloadFile= promisify(wx.downloadFile);
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    detailData: {},
    showSearchFrame:false,
    hasUserInfo: app.globalData.userInfo !== null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    addressList:[],
    addressIndex:0,
    citiesLeft:0,
    bannerImg:'',
    bannerID:0,
    bannerType:'3',
    listData:[],
    listSimpleIndex:-1,
    listAnimatIndex:-1,
    lastBodyTop:0,
    lastTop:0,
    toggleButton:true,
    showIndex:true,
    showTicketDetail:false,
    showBuyInfos:false,
    footerPos:170,
    footerDuration:'0.5s',
    selectTicketTop:'0px',
    selectTicketLeft:'10rpx',
    selectTicketRight:'10rpx',
    selectTicketDuration:'0s',
    selectTicketClass:'',
    loadHint:'',
    lastLoadHint:'',
    page:1,
    keywords:'',
    city:'',
    activityID:'',
    imgSrc:app.globalData.imgSrc,
    shareImgSrc:'',
    sponsorSrc:'',
    showRefresh:false,
    id:-1
  },
  //事件处理函数
  onLoad: function (options) {
    let id = options.id || '',self = this,cityID = 0;
    if(id == ''){
      this.getAddressData();
      try {
        cityID = wx.getStorageSync('lastCityID');
      } catch (e) {
        cityID = 0;
      }
    }
    this.setData({
      activityID:id,
      city:cityID
    });
    this.getListData();

    wx.getSystemInfo({
      success: function(res) {
        self.setData({
          cityItemWidth:Math.floor(res.windowWidth/5)
        });
      }
    })
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
  //进入详情
  gotoDetail(e){
    if(this.data.showTicketDetail) return;
    //if(e.currentTarget.dataset.end == 'over') return;
    let top = e.currentTarget.offsetTop,
        index = e.target.dataset.index,
        self = this;
    self.data.id = e.target.dataset.id;
    this.data.lastLoadHint = this.data.loadHint;
    wx.createSelectorQuery().select('#bodyFrame').boundingClientRect(function(rect){
      self.data.lastBodyTop = rect.top;
      self.data.lastTop = top+rect.top+'px';
      self.setData({
        toggleButton:false,
        showSearchFrame:false,
        showIndex:false,
        loadHint:'',
        listAnimatIndex:index,
        selectTicketClass:'item-fixed',
        selectTicketTop:self.data.lastTop
      });
      //return;
      setTimeout(()=>{
        self.setData({
          listSimpleIndex:index,
          selectTicketDuration:'0.5s',
          selectTicketLeft:0,
          selectTicketRight:0,
          selectTicketTop:'120rpx'
        });
      },50);

      setTimeout(()=>{
        self.setData({
          selectTicketDuration:'0',
          selectTicketClass:'item-absolute'
        });
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 0
        });
        self.getDetailData();
      },700);
    }).exec()
  },
  //返回详情
  doClose(){//关闭详情页
    if(!this.data.showTicketDetail) return;
    this.setData({
      detailData:{}
    });
    setTimeout(()=>{
      this.setData({
        loadHint:this.data.lastLoadHint,
        listSimpleIndex:-1,
        selectTicketClass:'item-fixed',
        toggleButton:true,
        showIndex:true,
        showTicketDetail:false,
        showBuyInfos:false,
        selectTicketDuration:'0.5s',
        selectTicketLeft:'10rpx',
        selectTicketRight:'10rpx',
        footerPos:170,
        selectTicketTop:this.data.lastTop
      });
      wx.pageScrollTo({
        scrollTop: Math.abs(this.data.lastBodyTop),
        duration: 0
      });
    },50);
    setTimeout(()=>{
      this.setData({
        selectTicketDuration:'0',
        selectTicketTop:'0',
        selectTicketClass:''
      });
    },800);
    setTimeout(()=>{
      this.setData({
        footerDuration:'0.5s',
        listAnimatIndex:-1
      });
    },900);
  },
  //进入购买页
  gotoBuy(){
    if(this.data.detailData.info.is_end != '') return;
    this.setData({
      footerDuration:'0s'
    });
    setTimeout(()=>{
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      });
      this.setData({
        footerPos:170,
        showDetailsInfos:false,
        showBuyInfos:true
      })
    },50);
  },
  //生成海报
  drawPoster(){
    let poster = this.data.detailData.info.poster,imgSrc = app.globalData.imgSrc,self=this;
    wx.showLoading({
      title:'生成中'
    });

    wx.downloadFile({
      url: imgSrc+poster,
      success (res) {
        if (res.statusCode === 200) {
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
      }
    })
  },
  //生成分享图
  drawSharePoster(){
    let data = this.data.detailData.info,imgSrc = app.globalData.imgSrc,type = data.type,self=this;
    const ctx = wx.createCanvasContext('posterShare');
    Promise.all([
      wxDownloadFile({
        url: imgSrc+data.cover
      }),
      wxDownloadFile({
        url: imgSrc+data.cover2
      })
    ]).then(res => {
      //背景色
      ctx.rect(0, 19, 750, 634);
      ctx.setFillStyle('#f6f6f6');
      ctx.fill();
      //顶部Logo图
      ctx.drawImage('../../res/images/ticket-top.png', 0, 14, 750, 5);
      //日期
      ctx.font = "27px 'Helve'";
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
      ctx.fillText(data.goods_name+' | '+data.activity,20,264);
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
      ctx.drawImage(res[0].tempFilePath,logoXArr[type-1],114-70,200,140);
      //详情图
      ctx.drawImage(res[1].tempFilePath,0,294,750,650);
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
    })
  },
  //获取列表数据
  getListData(){
    let self = this;
    if(self.data.showTicketDetail) return;
    if(self.data.loadHint != '') return;
    self.setData({
      loadHint:'loading'
    });
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.ajaxSrc+'/pro_list',
      data: {
        keyword: self.data.keywords,
        page: self.data.page,
        city: self.data.city,
        mid: self.data.activityID
      },
      success: function(res) {
        let list = res.data.data.list,hint = '',sponsorSrc = '';
        if(self.data.page == 1){
          if(list.length == 0){
            hint = 'empty';
          }else{
            sponsorSrc = list[0].cover
          }
          self.setData({
            sponsorSrc:sponsorSrc,
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

        wx.hideNavigationBarLoading();
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        });
      }
    })
  },
  //获取详情数据
  getDetailData(id){
    let self = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.ajaxSrc+'/product_info',
      data: {
        tid: self.data.id,
        city: self.data.city
      },
      success: function(res) {
        let data = res.data;
        self.setData({
          footerPos:0,
          detailData:data.data,
          showTicketDetail:true
        });
        self.drawSharePoster();
        wx.hideNavigationBarLoading();
      },
      fail(){
        self.showToast({
          title:'加载失败'
        });
        self.setData({
          showRefresh:true
        });
        wx.hideNavigationBarLoading();
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
          bannerID:res.data.data.b_id,
          bannerType:res.data.data.type
        });
        self.getLocation();
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
  },
  //获取定位
  getLocation(){
    let self = this;
    let lastGetCityTime = wx.getStorageSync('lastGetCityTime');
    let now = new Date().getTime();
    if(lastGetCityTime == '' || now > lastGetCityTime + 24*60*60*1000){
      wx.setStorageSync('lastGetCityTime',now);
    }else{
      return;
    }
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        qMap.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
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
      page:1,
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
    this.data.city = '';
    this.data.loadHint = '';
    this.setData({
      addressIndex:0
    });
    this.getListData();
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
  },
  //banner 跳转
  bannerGoOut(){
    let id = this.data.bannerID,type  = this.data.bannerType,src = '/pages/drink/index';
    if(type == 1){
      src = '/pages/index/detail?id='+id;
    }else if(type == 2){
      src = '/pages/drink/detail?id='+id;
    }
    wx.navigateTo({
      url: src
    })
  },
  //分享
  onShareAppMessage(res){
    return {
      title:this.data.detailData.info.goods_name+' | '+this.data.detailData.info.activity,
      imageUrl:this.data.shareImgSrc,
      path:'pages/index/detail?id='+this.data.detailData.info.id
    }
  }
});
