// components/order-item/drink.js
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
      itemIndex: {
         type: Number,
         value: 0
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      imgSrc: app.globalData.imgSrc
   },

   /**
    * 组件的方法列表
    */
   methods: {

   }
})
