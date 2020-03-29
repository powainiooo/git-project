// components/detail/detail.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      showDetails:{
         type:Boolean,
         value:false
      },
      prodata:{
         type:Object
      },
      showRefund: {
         type: Boolean,
         value: false
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      imgSrc:app.globalData.imgSrc,
      mobile: '13000000000'
   },

   /**
    * 组件的方法列表
    */
   methods: {
      hideDetails(){
         this.setData({
            showDetails:false
         })
      },
      doCall () {
         wx.makePhoneCall({
            phoneNumber: this.data.mobile
         })
      }
   }
})
