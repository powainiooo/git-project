// pages/index/detail.js
const app = getApp();
const {promisify} = require('../../utils/util.js');
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
    id:-1
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.getDetailData();
  },

  //获取详情数据
  getDetailData(id){
    let self = this;
    wx.request({
      url: app.globalData.ajaxSrc+'/product_info', //仅为示例，并非真实的接口地址
      data: {
        tid: self.data.id
      },
      success: function(res) {
        let data = res.data;
        self.setData({
          detailData:data.data,
          singlePrice:data.data.info.minprice,
          showTicketDetail:true
        });
        self.drawSharePoster();
      },
      fail(){
        self.showToast({
          title:'加载失败'
        });
        self.setData({
          showRefresh:true
        })
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
      imageUrl:this.data.shareImgSrc,
      path:'pages/index/detail?id='+this.data.detailData.info.id
    }
  }
})