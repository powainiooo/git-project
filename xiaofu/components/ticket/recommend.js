// components/ticket/recommend.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
	   listData: {
		   type: Array,
		   value: []
	   },
      title: {
         type: String,
         value: 'test'
      }
   },

   /**
    * 组件的初始数据
    */
   data: {

   },

   /**
    * 组件的方法列表
    */
   methods: {
      gotoDetail (e) {
         const id = e.currentTarget.dataset.id
         wx.navigateTo({
            url: `/pages/index/detail?id=${id}`
         })
      }
   }
})
