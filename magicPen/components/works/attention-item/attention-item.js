// components/works/attention-item/attention-item.js
const {addAttention, cancelAttention} = require('../../../utils/api.js')
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      itemData: {
         type: Object,
         value: {}
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      isAttention: true
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
         const dyn = this.data.itemData.userDyn > 0 ? 1 : 2
         wx.navigateTo({
            url: `/pages/works/list/list?userId=${this.data.itemData.userId}&dyn=${dyn}`
         })
      },
   }
})
