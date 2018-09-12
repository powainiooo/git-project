// pages/member/member.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    titleEn:'',
    titleCn:'',
    content:'',
    page:''
  },
  makePhoneCall: function (e) {
    var self = this;
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
      success: function () {
        console.log("成功拨打电话")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let page = options.page || 'contact',titleEn,titleCn,content;
    if(page == 'member'){
      titleEn = 'Member of \n Ho';
      titleCn = '隶属于';
    } else if (page == 'insurance') {
      titleEn = 'insurance \n Act';
      titleCn = '保险条例';
    } else if (page == 'aftersales') {
      titleEn = 'After \n Sales';
      titleCn = '售后服务';
    } else if (page == 'contact') {
      titleEn = 'Contact \n Information';
      titleCn = '联系方式';
    }
    this.setData({
      titleEn: titleEn,
      titleCn: titleCn,
      mail:'',
      phone:'',
      wechat:'',
      page:page
    });
    this.getData(page);
  },
  getData(src){
    let self = this;
    wx.request({
      url: app.globalData.ajaxSrc+'/'+src, //仅为示例，并非真实的接口地址
      success: function(res) {
        if(src == 'contact'){
          let contact = res.data.data[src];
          let mail = contact.match(/邮箱：\S*；/)[0].replace('邮箱：','').replace('；','');
          let phone = contact.match(/电话：\S*；/)[0].replace('电话：','').replace('；','');
          let wechat = contact.match(/微信号：\S*；/)[0].replace('微信号：','').replace('；','');
          self.setData({
            mail:mail,
            phone:phone,
            wechat:wechat
          });
        }else{
          self.setData({
            content:res.data.data[src]
          });
        }
      },
      fail(){
        wx.navigateTo({
          url: '/pages/error/error'
        })
      }
    })
  },
  download(){
    console.log('download')
    wx.downloadFile({
      url: 'http://ticket.pc-online.cc/static/download/file.docx', //仅为示例，并非真实的资源
      success: function(res) {
        console.log(res);
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function(res) {
              var savedFilePath = res.savedFilePath;
              wx.openDocument({
                filePath: savedFilePath,
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})