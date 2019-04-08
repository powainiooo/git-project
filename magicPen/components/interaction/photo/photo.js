// components/interaction/photo/photo.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
     gotoList () {
        wx.navigateTo({
           url: '/pages/onscreen/list/list'
        })
     }
  }
})
