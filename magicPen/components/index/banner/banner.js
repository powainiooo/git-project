// components/index/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listData: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
     src: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
     linkWeb (e) {
        const {src} = e.currentTarget.dataset
        if (src !== null) {
           wx.navigateTo({
              url: '/pages/webview/webview?src='+src
           })
        }
     }
  }
})
