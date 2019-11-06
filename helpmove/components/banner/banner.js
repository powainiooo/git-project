// components/banner/banner.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		src: String,
	   id: {
		   type: String,
		   value: ''
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
	   gotoDetail () {
		   wx.navigateTo({
			   url: `/pages/index/detail?id=${this.data.id}`
		   })
	   }
   }
})
