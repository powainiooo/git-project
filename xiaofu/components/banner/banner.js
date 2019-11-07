// components/banner/banner.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		src: String,
      linkId: {
		   type: String,
		   value: ''
	   }
   },

   /**
    * 组件的初始数据
    */
   data: {
      imgSrc: app.globalData.imgSrc
   },

   /**
    * 组件的方法列表
    */
   methods: {
	   gotoDetail () {
		   wx.navigateTo({
			   url: `/pages/index/detail?id=${this.data.linkId}`
		   })
	   }
   }
})
