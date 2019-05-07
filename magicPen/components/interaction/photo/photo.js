// components/interaction/photo/photo.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
     peas: {
        type: Number,
        value: 0
     }
  },

  /**
   * 组件的初始数据
   */
  data: {
     isIOS: app.globalData.isIOS,
  },

  /**
   * 组件的方法列表
   */
  methods: {
     gotoList () {
        wx.navigateTo({
           url: '/pages/onscreen/list/list'
        })
     },
     gotoRecharge () {
        if (this.data.isIOS) {
           wx.showModal({
              title: '提示',
              content: '由于相关规范，ios用户暂不支持。'
           })
        } else {
           wx.navigateTo({
              url: '/pages/recharge/recharge'
           })
        }
     },
  }
})
