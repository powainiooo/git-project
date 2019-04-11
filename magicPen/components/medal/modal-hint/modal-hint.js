// components/medal/modal-hint/modal-hint.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      type: {
         type: Number,
         value: 0
      },
      step: {
         type: Number,
         value: 1
      },
      medalData: {
         type: Object,
         value: {}
      },
      isUser: {
         type: Boolean,
         value: true
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
      getMedal () {
         // this.triggerEvent('getMedal',{
         //    medalId: this.data.medalData.medalId,
         //    takeType: 1,
         // })
      }
   }
})
