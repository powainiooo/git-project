// components/address/address.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		list: {
			type: Array,
			value: []
		},
	   id: {
			type: String,
		   value: '',
		   observer (val) {
				const item = this.data.list.find(i => i.id === val)
			   this.setData({
				   selected: item.name || '全部'
			   })
		   }
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
      allCity: {
		   name: '全部',
         id: ''
      },
	   fold: true
   },

   /**
    * 组件的方法列表
    */
   methods: {
	   doChange (e) {
	   	this.setData({
			   selected: e.target.dataset.item.name,
            fold: true
		   })
		   this.triggerEvent('change', e.target.dataset.item.id)
	   },
	   toggle () {
	   	this.setData({
			   fold: !this.data.fold
		   })
	   }
   }
})
