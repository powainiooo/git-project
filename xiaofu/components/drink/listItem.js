// components/drink/listItem.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		itemData: {
			type: Object,
			value: {}
		}
   },

   /**
    * 组件的初始数据
    */
   data: {
		nums: 0,
      imgSrc: app.globalData.imgSrc
   },

   /**
    * 组件的方法列表
    */
   methods: {
	   doReduce () {
	   	if (this.data.nums === 0) return
	   	this.setData({
			   nums: this.data.nums - 1
		   })
	   },
	   doAdd () {
	   	this.setData({
			   nums: this.data.nums + 1
		   })
	   }
   }
})
