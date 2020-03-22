// components/vip/vip.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      listData: {
         type: Object,
         value: {},
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      imgSrc: app.globalData.imgSrc,
   },

   /**
    * 组件的方法列表
    */
   methods: {
      gotoVips (e) {
         const id = e.currentTarget.dataset.id
         wx.navigateTo({
            url: `/pages/vips/vips?page=buy&id=${id}`
         })
      },
   }
})
