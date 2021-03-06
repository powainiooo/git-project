// components/address/address.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		list: {
			type: Array,
			value: [],
         observer (val) {
            val.unshift(this.data.allCity)
            this.setData({
               addrList: val
            })
         }
		},
      cityID: {
			type: String,
		   value: '',
		   observer (val) {
            setTimeout(() => {
               const item = this.data.list.find(i => i.id === val)
               this.setData({
                  selected: item === undefined ? '全部' : item.name
               })
            }, 500)
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
	   fold: true,
      addrList: []
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
	   },
      cityChange (e) {
         console.log(e)
         let item = this.data.list[e.detail.value]
         this.setData({
            selected: item.name.length >= 4 ? item.name.substr(0, 4) : item.name
         })
         this.triggerEvent('change', item.id)
      }
   }
})
