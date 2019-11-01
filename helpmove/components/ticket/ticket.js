// components/ticket/ticket.js
const app = getApp()
Component({
   /**
   * 组件的属性列表
   */
   properties: {
      itemData: {
         type: Object,
         value: {}
      },
      fold: {
         type: Boolean,
         value: false,
	      observer (newVal) {
         	console.log('fold')
		      setTimeout(() => {
			      wx.createSelectorQuery().in(this).select("#ticket").boundingClientRect(res => {
				      console.log(res)
				      this.setData({
					      height: res.height
				      })
			      }).exec()
		      }, 350)
	      }
      },
	   width: {
      	type: Number,
		   value: 750
	   },
	   hideImgs: {
      	type: Boolean,
		   value: false
	   },
      extraClass: {
         type: String,
         value: ''
      }
   },

   /**
   * 组件的初始数据
   */
   data: {
      ajaxSrc: app.globalData.ajaxSrc,
      imgSrc: app.globalData.imgSrc,
	   height: 0
   },
	attached() {
   	console.log('attached1')
		setTimeout(() => {
			wx.createSelectorQuery().in(this).select("#ticket").boundingClientRect(res => {
				console.log(res)
				this.setData({
					height: res.height
				})
			}).exec()
		}, 350)
	},
   /**
   * 组件的方法列表
   */
   methods: {
   }
})
