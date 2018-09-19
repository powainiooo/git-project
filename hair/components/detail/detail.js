// components/detail/detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showDetails:{
      type:Boolean,
      value:false,
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
    hideDetails(){
      this.setData({
        showDetails:false
      })
    }
  }
})
