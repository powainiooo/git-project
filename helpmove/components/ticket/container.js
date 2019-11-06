// components/ticket/container.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
	   fold: {
		   type: Boolean,
		   value: false
	   },
	   ticketData: {
	   	type: Object,
		   value: {}
	   },
	   detailData: {
		   type: Object,
		   value: {},
		   observer (newVal) {
				if (newVal !== null) {
					this.setData({
						showItem: 'detail'
					})
				} else {
					this.setData({
						showItem: ''
					})
				}
		   }
	   }
   },

   /**
    * 组件的初始数据
    */
   data: {
		showItem: '',
	   showDrink: false,
	   drinkTop: '100%'
   },
	observers: {
		showItem (newVal) {
			if (newVal === 'drink') {
				this.setData({
					showDrink: true
				})
				wx.nextTick(() => {
					this.setData({
						drinkTop: 0
					})
				})
			} else {
				this.setData({
					drinkTop: '100%'
				})
				setTimeout(() => {
					this.setData({
						showDrink: false
					})
				}, 500)
			}
	   }
	},
   /**
    * 组件的方法列表
    */
   methods: {
		togglePage (name) {
			this.setData({
				showItem: name
			})
		},
	   getParams () {
			const buy = this.selectComponent('#buy')
		   return buy.getParams()
	   }
   }
})
