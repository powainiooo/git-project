// components/index/list-item/list-item.js
const {worksZan} = require('../../../utils/api.js')
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
               zan: val.zan
            })
         }
      }
   },
   /**
    * 组件的初始数据
    */
   data: {
      zan: 0,
      isLike: false
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
      gotoPerson(){
         wx.navigateTo({
            url: `/pages/works/list/list?userId=${this.data.itemData.userId}`
         })
      },
      doThumbup () {
      	const app = getApp()
	      if (!app.checkAuth()) return
         if (this.data.isLike) return
         worksZan(this.data.itemData.tuzhiNu).then(res => {
            let zan = this.data.zan
            let like = false
            if(res.code === 0) {
               zan += 1
               like = true
               this.triggerEvent('thumbup')
            }else {
               if(res.code === 4002) like = true
               $Message({
                  content: res.msg,
                  type: 'warning'
               });
            }
            this.setData({
               zan,
               isLike: like
            })
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
