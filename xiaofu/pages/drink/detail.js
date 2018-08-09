// pages/drink/detail.js
const app = getApp();
Page({
  data: {
    orderID:0,
    numbersArr:[1,2,3,4,5,6,7,8,9,10],
    numberIndex:0,
    nameVal:'',
    phoneVal:'',
    btnDisabled:false,
    itemData:{},
    shareImgSrc:'',
    imgSrc:app.globalData.imgSrc
  },
  checkValues(event){
    let key = event.target.dataset.key;
    this.data[key] = event.detail.value;
    if (this.data.nameVal != '' && this.data.phoneVal != '' && this.data.addressVal != '') {
      this.setData({
        btnDisabled: true
      })
    } else {
      this.setData({
        btnDisabled: false
      })
    }
  },
  numberChange: function(e) {
    this.setData({
      numberIndex: e.detail.value
    })
  },
  doPay(){
    let self = this;
    if(this.data.btnDisabled){
      wx.request({
        url: app.globalData.ajaxSrc+'/news_order', //仅为示例，并非真实的接口地址
        data: {
          openid:app.globalData.userOpenID,
          id:self.data.orderID,
          name:self.data.nameVal,
          mobile:self.data.phoneVal,
          nums:self.data.numbersArr[self.data.numberIndex]
        },
        success: function(res) {
          let jsapi = res.data.jsapiparam;
          let order_num = res.data.order_num;
          wx.requestPayment({
            'timeStamp': jsapi.timeStamp,
            'nonceStr': jsapi.nonceStr,
            'package': jsapi.package,
            'signType': jsapi.signType,
            'paySign': jsapi.paySign,
            'success':function(res){
              console.log('pay s');
              console.log(res);
              wx.request({
                url:app.globalData.ajaxSrc+'/buysuccess',
                data:{
                  tid:self.data.orderID,
                  order_num:order_num
                },
                success:res=>{
                  console.log('pay s o');
                  console.log(res);
                  wx.navigateTo({
                    url: '/pages/result/result?page=drinkSuc'
                  })
                }
              })
            },
            'fail':function(res){
              console.log('pay f');
              console.log(res);
            }
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id || '1';
    let self = this;
    this.data.orderID = id;
    wx.request({
      url: app.globalData.ajaxSrc+'/drink_info',
      data:{
        id:id
      },
      success: function(res) {
        let info = res.data.data.info;
        self.setData({
          itemData:info
        });
        self.drawSharePoster();
      }
    })
  },
  //画海报
  drawPoster(){
    let data = this.data.itemData,imgSrc = this.data.imgSrc;
    wx.showLoading();
    const ctx = wx.createCanvasContext('poster');
    //背景色
    ctx.rect(0, 0, 750, 410);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    //详情图
    wx.downloadFile({
      url: imgSrc+data.cover,
      success: function(res) {
        if (res.statusCode === 200) {
          ctx.drawImage(res.tempFilePath,0,0,800,276);
          //右边白色遮罩
          ctx.setFillStyle('#ffffff');
          ctx.fillRect(485, 0, 265, 410);
          //右上角logo
          ctx.drawImage('../../res/images/top2.png',0,0,188,188);
          //底部logo
          ctx.drawImage('../../res/images/bottom2.png',0,265,750,145);
          //名称
          ctx.setFillStyle('#000');
          ctx.setFontSize(26);
          let len = data.drink_name.length,row = Math.ceil(len/9);
          for(let i=0;i<row;i++){
            ctx.fillText(data.drink_name.slice(i*9,i*9+9), 500, 40*(i+1),230);
          }
          //横线
          ctx.beginPath();
          ctx.moveTo(500,40*row+20);
          ctx.lineTo(730,40*row+20);
          ctx.stroke();
          //产品logo
          wx.downloadFile({
            url: imgSrc+data.logo_pic,
            success: function(res1) {
              if (res1.statusCode === 200) {
                ctx.drawImage(res1.tempFilePath,582,310,70,70);
                ctx.draw(true,function(){
                  wx.canvasToTempFilePath({
                    canvasId: 'poster',
                    x:0,
                    y:0,
                    width:750,
                    height:410,
                    destWidth:750,
                    destHeight:410,
                    success:function(res2){
                      wx.saveImageToPhotosAlbum({
                        filePath: res2.tempFilePath,
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
        }
      }
    });
  },
  //画分享图
  drawSharePoster(){
    let data = this.data.itemData,imgSrc = this.data.imgSrc,self = this,offsetY = 100;
    const ctx = wx.createCanvasContext('posterShare');
    //背景色
    ctx.rect(0, 0, 750, 510);
    ctx.setFillStyle('#ffffff');
    ctx.fill();
    //详情图
    wx.downloadFile({
      url: imgSrc+data.cover,
      success: function(res) {
        if (res.statusCode === 200) {
          ctx.drawImage(res.tempFilePath,0,offsetY,800,276);
          //右边白色遮罩
          ctx.setFillStyle('#f6f6f6');
          ctx.fillRect(485, offsetY, 265, 410);
          //右上角logo
          ctx.drawImage('../../res/images/top3.png',0,offsetY,188,188);
          //名称
          ctx.setFillStyle('#000');
          ctx.setFontSize(26);
          let len = data.drink_name.length,row = Math.ceil(len/9);
          for(let i=0;i<row;i++){
            ctx.fillText(data.drink_name.slice(i*9,i*9+9), 500, 40*(i+1) + offsetY,230);
          }
          //横线
          ctx.beginPath();
          ctx.moveTo(500,40*row+20 + offsetY);
          ctx.lineTo(730,40*row+20 + offsetY);
          ctx.stroke();
          //底部logo
          ctx.drawImage('../../res/images/bottom3.png',0,265 + offsetY,750,145);
          //产品logo
          wx.downloadFile({
            url: imgSrc+data.logo_pic,
            success: function(res1) {
              if (res1.statusCode === 200) {
                ctx.drawImage(res1.tempFilePath,582,150 + offsetY,70,70);
                ctx.draw(true,function(){
                  wx.canvasToTempFilePath({
                    canvasId: 'posterShare',
                    x:0,
                    y:0,
                    width:750,
                    height:510,
                    destWidth:750,
                    destHeight:510,
                    success:function(res2){
                      self.data.shareImgSrc = res2.tempFilePath;
                    }
                  })
                })
              }
            }
          });
        }
      }
    });
  },
  //返回特饮首页
  doClose(){
    wx.reLaunch({
      url: '/pages/drink/index'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:this.data.itemData.drink_name,
      //imageUrl:this.data.imgSrc+this.data.detailData.info.cover2,
      imageUrl:this.data.shareImgSrc,
      path:'pages/drink/detail?id='+this.data.itemData.id
    }
  }
});