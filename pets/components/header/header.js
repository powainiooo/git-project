// components/header/header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showTitle:{
      type:Boolean,
      value:true
    },
    size:{
      type:String,
      value:'normal'
    },
	  bgColor: {
    	type: String,
		  value: '#e7e3e2'
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
    gotoIndex(){
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})
