// components/index/list-item/list-item.js
const {updataWorksTop, updataWorksName, worksZan} = require('../../../utils/api.js')
const { $Message } = require('../../../components/iview/base/index')
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
               nameValue: val.worksName,
               zan: val.zan,
               isLike: val.isZan === 1
            })
         }
      },
      isUser: {
         type: Boolean,
         value: false
      }
   },
   /**
    * 组件的初始数据
    */
   data: {
      showOpera: false,
      isEdit: false,
      isLike: false,
      isFocus: false,
      nameValue: '',
      zan: 0,
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
         this.triggerEvent('delwork',{
            tuzhiNu: this.data.itemData.tuzhiNu
         })
      },
      showEdit () {
         this.setData({
            isEdit: true,
            isFocus: true
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
      },
      doThumbup () {
         if(this.data.isLike) return
         worksZan(this.data.itemData.tuzhiNu).then(res => {
            if(res.code === 0) {
               this.setData({
                  zan: this.data.zan + 1,
                  isLike: true
               })
            }else {
               $Message({
                  content: res.msg,
                  type: 'warning'
               });
            }

         })
      },
      doOpera () {
         this.setData({
            showOpera: !this.data.showOpera
         })
      },
      gotoPerson(e){
         wx.navigateTo({
            url: `/pages/works/list/list?userId=${e.currentTarget.dataset.id}`
         })
      },
      preview () {
         wx.previewImage({
            current: this.data.itemData.worksUrl,
            urls: [this.data.itemData.worksUrl]
         })
      }
   }
})
