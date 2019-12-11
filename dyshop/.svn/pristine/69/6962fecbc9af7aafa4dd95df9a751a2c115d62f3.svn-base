Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: String
  },
  ready(){
    this.setData({
      isCN: !!wx.getStorageSync('isCN')
    })
  },
  /**
   * 组件的初始数据
   */
  data: {
    isCN: 1,
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bindTab(e){
      var tabNum = Number(e.currentTarget.dataset.num);
      switch (tabNum){
        case 0:
          wx.setStorageSync('isCN', !wx.getStorageSync('isCN'));
          this.triggerEvent('switchlag', { Lag: wx.getStorageSync('isCN')})
          this.setData({
            isCN: wx.getStorageSync('isCN')
          })
          break;
        case 1: 
          wx.reLaunch({
            url: '/pages/index/index'
          })
          break;
        case 2: 
          wx.reLaunch({
            url: '/pages/class/index'
          })
          break;
        case 3: 
          wx.reLaunch({
            url: '/pages/cart/index'
          })
          break;
        case 4:
          wx.reLaunch({
            url: '/pages/my/index'
          })
          break;
      }
    },
  }
})
