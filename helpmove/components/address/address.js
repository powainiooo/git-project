// components/address/address.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		list: {
			type: Array,
			value: ['深圳', '武汉', '广州', '杭州', '珠海', '上海', '东莞', '泰国', '佛山', '澳门', '其他城市']
		},
	   hasbg: {
			type: Boolean,
		   value: false
	   }
   },

   /**
    * 组件的初始数据
    */
   data: {
		selected: '全部',
	   fold: true
   },

   /**
    * 组件的方法列表
    */
   methods: {
	   doChange (e) {
	   	this.setData({
			   selected: e.target.dataset.item
		   })
	   },
	   toggle () {
	   	this.setData({
			   fold: !this.data.fold
		   })
	   }
   }
})
