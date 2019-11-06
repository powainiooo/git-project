// components/search/search.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
	   url: {
	   	type: String,
		   value: ''
	   },
	   id: {
	   	type: String,
		   value: ''
	   }
   },

   /**
    * 组件的初始数据
    */
   data: {
	   keywords: '',
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
		   this.triggerEvent('search', {
			   keywords: '',
			   date: this.data.selectedDate
		   })
	   },
	   bindKeyInput () {
		   this.setData({
			   keywords: e.detail.value
		   })
	   },
	   doSearch () {
			this.triggerEvent('search', {
				keywords: this.data.keywords,
				date: ''
			})
	   }
   }
})
