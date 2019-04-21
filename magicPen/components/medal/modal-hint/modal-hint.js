// components/medal/modal-hint/modal-hint.js
const app = getApp()
const audio = wx.createInnerAudioContext()
audio.obeyMuteSwitch = false
audio.src = app.globalData.audioSrc.medal
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      medalData: {
         type: Object,
         value: {},
         observer (val) {
            this.setData({
               showLight: val.takeMedalState === 1,
               showDark: val.takeMedalState !== 1,
               showBright: val.takeMedalState === 1,
               takeMedalState: val.takeMedalState,
            })
         }
      },
      isUser: {
         type: Boolean,
         value: true
      },
      giftTime: {
         type: String,
         value: ''
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      showLight: false,
      showDark: false,
      showBright: false,
      takeMedalState: ''
   },

   /**
    * 组件的方法列表
    */
   methods: {
      getMedal () {
         this.triggerEvent('getMedal',{
            medalId: this.data.medalData.medalId,
            takeType: 1,
         })
         audio.play()
         audio.onPlay(()=>{
            console.log('play')
         })
         audio.onError((err)=>{
            console.log(err)
         })
         this.setData({
            showLight: true,
            showDark: false,
            takeMedalState: 1,
         })
         setTimeout(()=>{
            this.setData({
               showBright: true,
            })
         },400)
      }
   }
})
