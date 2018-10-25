// pages/index/detail.js
const app = getApp();
const {promisify,formatTime} = require('../../utils/util.js');
const wxDownloadFile= promisify(wx.downloadFile);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTicketDetail:false,
    footerAniData:{},
    detailData:{},
    showBuyInfos:false,
    imageUrl:'',
    singlePrice:0,
    shareImgSrc:'',
    showRefresh:false,
    id:-1,
    minprice:'',
    saleStart:0,
    footerPos:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.data.id = options.id || options.scene;
    //this.data.id = '771';
    this.getDetailData();
  },

  //获取详情数据
  getDetailData(){
    let self = this;
    wx.showNavigationBarLoading();
    wx.request({
      url: app.globalData.ajaxSrc+'/product_info', //仅为示例，并非真实的接口地址
      data: {
        tid: self.data.id
      },
      success: function(res) {
        let data = res.data;
        let anew = data.data.anew,min = 10000;
        if(data.data.info.is_end == 'over'){
          min = anew[0].price;
        }else{
          for(let item of anew){
            if(item.price < min && item.is_over == 0) min = item.price
          }
        }
        var date = formatTime(new Date(parseInt(data.data.info.sale_start)*1000));
        self.setData({
          detailData:data.data,
          singlePrice:data.data.info.minprice,
          minprice:min,
          showTicketDetail:true,
          saleStart:date
        });
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
  //进入购买页
  gotoBuy(){
    if(this.data.detailData.info.is_end != '') return;
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
    this.setData({
      footerDuration:'0s'
    });
    this.setData({
      footerPos:170,
      showDetailsInfos:false,
      showBuyInfos:true
    })
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
  //返回首页
  doClose(){
    wx.reLaunch({
      url: '/pages/index/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:this.data.detailData.info.goods_name+' | '+this.data.detailData.info.activity,
      imageUrl:this.data.imgSrc+this.data.detailData.info.share_logo,
      path:'pages/index/detail?id='+this.data.detailData.info.id
    }
  }
})