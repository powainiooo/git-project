// components/numbers/numbers.js
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

   },

   /**
    * 组件的方法列表
    */
   methods: {
	   doAdd () {
	   	this.setData({
			   itemData: {
			   	nums: 2
			   }
		   })
	   }
   }
})
