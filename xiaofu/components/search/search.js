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
      linkId: {
	   	type: String,
		   value: '1'
	   }
   },

   /**
    * 组件的初始数据
    */
   data: {
	   keywords: '',
	   selectedDate: '',
	   showDate: false,
      dateClass: ''
   },

   /**
    * 组件的方法列表
    */
   methods: {
	   showCalendar () {
         this.setData({
            dateClass: ''
         })
         wx.nextTick(() => {
            this.setData({
               showDate: true
            })
            this.triggerEvent('toggleCalendar', true)
         })
	   },
	   hideCalendar () {
	      this.setData({
            dateClass: 'datepicker-frame-hide'
         })
         setTimeout(() => {
            this.setData({
               showDate: false
            })
            this.triggerEvent('toggleCalendar', false)
         }, 300)
	   },
	   getDate (e) {
		   this.setData({
			   selectedDate: e.detail
		   })
         this.hideCalendar()
		   this.triggerEvent('search', {
			   keywords: '',
			   date: this.data.selectedDate
		   })
	   },
	   bindKeyInput (e) {
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
