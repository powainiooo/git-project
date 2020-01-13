// components/banner/banner.js
const app = getApp()
import {bannerVisit} from '../../utils/api'
Component({
   /**
    * 组件的属性列表
    */
   properties: {
		src: String,
      linkId: {
		   type: String,
		   value: ''
	   },
      type: {
		   type: String,
		   value: '1'
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
	   gotoDetail () {
         bannerVisit(this.data.type, this.data.linkId).then(res => {
            console.log(res)
         })
		   setTimeout(() => {
            wx.navigateTo({
              url: `/pages/index/detail?id=${this.data.linkId}`
            })
          }, 200)
	   }
   }
})
