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
      resData: {
         type: Object,
         value: {}
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      tuzhiNu: '',
      showModal: false,
      modalContent: 'cost'
   },

   /**
    * 组件的方法列表
    */
   methods: {

   }
})
