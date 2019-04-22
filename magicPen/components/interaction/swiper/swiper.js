// components/interaction/swiper/swiper.js
const app = getApp()
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false
audio.src = app.globalData.audioSrc.wheel
Component({
   /**
    * 组件的属性列表
    */
   properties: {
   },
   attached () {
      const self = this
      wx.getSystemInfo({
         success (res) {
            self.setData({
               windowWidth: res.windowWidth
            })
         }
      })
   },
   /**
    * 组件的初始数据
    */
   data: {
      currentKey: 'photo',
      list: [
         {key: 'photo', icon: '../../../res/interaction/icon1.png'},
         {key: 'revive', icon: '../../../res/interaction/icon4.png'},
         {key: 'call', icon: '../../../res/interaction/icon3.png'},
         {key: 'wind', icon: '../../../res/interaction/icon2.png'},
         {key: 'photo', icon: '../../../res/interaction/icon1.png'},
         {key: 'revive', icon: '../../../res/interaction/icon4.png'},
         {key: 'call', icon: '../../../res/interaction/icon3.png'},
         {key: 'wind', icon: '../../../res/interaction/icon2.png'},
      ],
      windowWidth: 375,
      showActive: false
   },

   /**
    * 组件的方法列表
    */
   methods: {
      doItem () {
         if (this.data.currentKey === 'photo') {
            wx.navigateTo({
               url: '/pages/onscreen/list/list'
            })
         } else {
            this.triggerEvent('tapitem', {
               currentKey: this.data.currentKey
            })
         }
      },
      swiperChange(e) {
         let {current} = e.detail
         current = current === this.data.list.length - 1 ? -1 : current
         const currentKey = this.data.list[current + 1].key
         this.setData({
            currentKey
         })
         this.triggerEvent('change', {currentKey})
      },
      doFunc (e) {
         const {key} = e.currentTarget.dataset
         if(key === 'photo') {
            wx.navigateTo({
               url: '/pages/onscreen/list/list'
            })
         }
      },
      moveEnd (params) {
         const t = setInterval(()=>{
            audio.play()
         }, 30)
         setTimeout(()=>{
            clearInterval(t)
         }, params.time*1000 - 500)
         setTimeout(()=>{
            audio.play()
            const angle = -params.angle
            let i = angle/45
            i = i >= 0 ? i : 8 + i
            const key = this.data.list[i].key
            console.log(key)
            if (this.data.currentKey !== key) {
               this.triggerEvent('change', {currentKey : key})
               this.data.currentKey = key
            }
         }, params.time*1000)
      },
      wheelplay () {
         audio.play()
      },
      doActive () {
         this.setData({
            showActive: true
         })
         setTimeout(()=>{
            this.setData({
               showActive: false
            })
         }, 1500)
      }
   }
})
