// components/interaction/call/call.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      peas: {
         type: Number,
         value: 0
      },
      cost: {
         type: Number,
         value: 0
      },
      listData: {
         type: Array,
         value: []
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      tuzhiNu: '',
      showModal: true,
      modalContent: 'cost'
   },

   /**
    * 组件的方法列表
    */
   methods: {
      selectWorks (e) {
         const {index} = e.currentTarget.dataset
         this.setData({
            tuzhiNu: index
         })
      }
   }
})
