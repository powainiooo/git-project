// pages/order-ticket/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTicketDetail:false,
    showTicketIndex:true,
    listData:[
      {
        isChecked:false,
        name:'1French kiwi jucie of one one one',
        checkNums:1,
        nonCheckNums:1
      },
      {
        isChecked:true,
        name:'2French kiwi jucie of one one one',
        checkNums:2,
        nonCheckNums:2
      },
      {
        isChecked:false,
        name:'3French kiwi jucie of one one one',
        checkNums:3,
        nonCheckNums:3
      }
    ],
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
  swiperChange(e){
    console.log(e);
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
  }
});