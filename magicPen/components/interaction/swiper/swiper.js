// components/interaction/swiper/swiper.js
Component({
   /**
    * 组件的属性列表
    */
   properties: {

   },

   /**
    * 组件的初始数据
    */
   data: {
      currentKey: 'photo',
      list: [
         {key: 'wind', icon: '../../../res/interaction/icon2.png'},
         {key: 'photo', icon: '../../../res/interaction/icon1.png'},
         {key: 'revive', icon: '../../../res/interaction/icon4.png'},
         {key: 'call', icon: '../../../res/interaction/icon3.png'},
      ]
   },

   /**
    * 组件的方法列表
    */
   methods: {
      swiperChange(e) {
         let {current} = e.detail
         current = current === this.data.list.length - 1 ? -1 : current
         const currentKey = this.data.list[current + 1].key
         this.setData({
            currentKey
         })
         this.triggerEvent('change', {currentKey})
      },
   }
})
