Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: String
  },
  ready(){
    this.setData({
      isCN: !!tt.getStorageSync('isCN')
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
          tt.setStorageSync('isCN', !tt.getStorageSync('isCN'));
          this.triggerEvent('switchlag', { Lag: tt.getStorageSync('isCN')})
          this.setData({
            isCN: tt.getStorageSync('isCN')
          })
          break;
        case 1: 
          tt.reLaunch({
            url: '/pages/index/index'
          })
          break;
        case 2: 
          tt.reLaunch({
            url: '/pages/class/index'
          })
          break;
        case 3: 
          tt.reLaunch({
            url: '/pages/cart/index'
          })
          break;
        case 4:
          tt.reLaunch({
            url: '/pages/my/index'
          })
          break;
      }
    },
  }
})
