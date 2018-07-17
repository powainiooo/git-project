// components/ticket-detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    activityIndex:0,
    activityList:[{},{},{}]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    activityChange(event){
      let index = event.detail.current;
      this.setData({
        activityIndex:index
      })
    }
  }
})
