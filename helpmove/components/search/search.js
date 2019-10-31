// components/search/search.js
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
	   selectedDate: '',
	   showDate: false
   },

   /**
    * 组件的方法列表
    */
   methods: {
	   showCalendar () {
	   	this.setData({
			   showDate: true
		   })
	   },
	   getDate (e) {
		   this.setData({
			   selectedDate: e.detail,
			   showDate: false
		   })
	   }
   }
})
