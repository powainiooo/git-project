// components/ticket/ticket.js
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
      isSimple: {
         type: Boolean,
         value: true
      },
      extraClass: {
         type: String,
         value: ''
      }
   },

   /**
   * 组件的初始数据
   */
   data: {
      ajaxSrc: app.globalData.ajaxSrc,
      imgSrc: app.globalData.imgSrc
   },

   /**
   * 组件的方法列表
   */
   methods: {
   }
})
