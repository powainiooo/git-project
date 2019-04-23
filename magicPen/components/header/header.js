// components/header/header.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      showBackBtn: {
         type: Boolean,
         value: true
      },
      showHomeBtn: {
         type: Boolean,
         value: true
      },
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
      gotoBack () {
         wx.navigateBack({
            delta: 1
         })
      },
      gotoHome () {
         wx.reLaunch({
            url: '/pages/index/index'
         })
      },
   }
})
