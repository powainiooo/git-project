// components/loading/loading.js
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
		current: 0
   },
	attached () {
   	setInterval(() => {
		   let count = this.data.current
		   count += 1
		   this.setData({
			   current: count === 4 ? 0 : count
		   })
	   }, 500)
	},
   /**
    * 组件的方法列表
    */
   methods: {
   }
})
