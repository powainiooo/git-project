// components/drink/listItem.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		itemData: {
			type: Object,
			value: {},
         observer (data) {
            const limit = data.limit === '0' ? 10 : parseInt(data.limit)
            let arr = []
            for (let i = 0; i <= limit; i++) {
               arr.push(i)
            }
            this.setData({
               numsArr: arr
            })
         }
		}
   },

   /**
    * 组件的初始数据
    */
   data: {
		nums: 0,
      imgSrc: app.globalData.imgSrc,
      numsArr: [],
      numsIndex: 0
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
         this.triggerEvent('change', this.data.nums)
	   },
	   doAdd () {
	      let limit = parseInt(this.data.itemData.limit)
         let num = this.data.nums >= limit ? this.data.nums : this.data.nums + 1
	   	this.setData({
			   nums: num
		   })
         this.triggerEvent('change', this.data.nums)
	   },
      bindPickerChange (e) {
         this.setData({
            numsIndex: e.detail.value,
            nums: this.data.numsArr[e.detail.value]
         })
         this.triggerEvent('change', this.data.nums)
      }
   }
})
