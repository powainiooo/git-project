// components/works/attention-item/attention-item.js
const {addAttention, cancelAttention} = require('../../../utils/api.js')
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      itemData: {
         type: Object,
         value: {},
         observer (val) {
            this.setData({
               isUserDyn: val.isUserDyn
            })
         }
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      isAttention: true,
      isUserDyn: 2
   },

   /**
    * 组件的方法列表
    */
   methods: {
      delAttention() {
         cancelAttention(this.data.itemData.userId).then(res => {
            this.setData({
               isAttention: false
            })
         })
      },
      addAttention() {
         addAttention(this.data.itemData.userId).then(res => {
            this.setData({
               isAttention: true
            })
         })
      },
      intoWorks () {
         const dyn = this.data.itemData.isUserDyn
         this.setData({
            isUserDyn: 2
         })
         wx.navigateTo({
            url: `/pages/works/list/list?userId=${this.data.itemData.userId}&dyn=${dyn}`
         })
      },
   }
})
