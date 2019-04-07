// components/index/list-item/list-item.js
const {updataWorksTop, deleteWorks, updataWorksName} = require('../../../utils/api.js')
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      itemData: {
         type: Object,
         value: {}
      },
      isUser: {
         type: Boolean,
         value: false
      }
   },
   observers: {
      'itemData'(val) {
         this.setData({
            nameValue: val.worksName
         })
      }
   },
   /**
    * 组件的初始数据
    */
   data: {
      isEdit: false,
      nameValue: ''
   },

   /**
    * 组件的方法列表
    */
   methods: {
      gotoDetail(){
         wx.navigateTo({
            url: `/pages/works/detail/detail?userId=${this.data.itemData.userId}`
         })
      },
      doRevive () {
         this.triggerEvent('revive',{
            tuzhiNu: this.data.itemData.tuzhiNu,
            freeFuhuoState: this.data.itemData.freeFuhuoState,
         })
      },
      doTop () {
         const topType = this.data.itemData.isTop === 1 ? 2 : 1
         updataWorksTop(`tuzhiNu=${this.data.itemData.tuzhiNu}&topType=${topType}`).then(res => {
            this.triggerEvent('getwork')
         })
      },
      doDel () {
         deleteWorks(this.data.itemData.tuzhiNu).then(res => {
            this.triggerEvent('getwork')
         })
      },
      showEdit () {
         this.setData({
            isEdit: true
         })
      },
      hideEdit () {
         this.setData({
            isEdit: false
         })
      },
      nameChange (e) {
         this.data.nameValue = e.detail.value
      },
      confirmEdit () {
         updataWorksName({
            tuzhiNu: this.data.itemData.tuzhiNu,
            worksName: this.data.nameValue
         }).then(res => {
            this.setData({
               isEdit: false,
               nameValue: this.data.nameValue
            })
         })
      },
      doShare () {
         this.triggerEvent('share',{
            tuzhiNu: this.data.itemData.tuzhiNu
         })
      }
   }
})
