// components/drink/listItem.js
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
		nums: 0
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