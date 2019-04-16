// components/index/guide/guide.js
import regeneratorRuntime from '../../../utils/runtime.js'
const {updateUserGrade} = require('../../../utils/api.js')
const {promisify} = require('../../../utils/util.js')
const scan = promisify(wx.scanCode)
const request = promisify(wx.request)
const { $Message } = require('../../iview/base/index')
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      useGuide: {
         type: Boolean,
         value: true,
         observer (val) {
            wx.nextTick(()=>{
               this.stepInit()
               this.stepMove()
            })
         }
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      step: 1,
      showScan: false,
      showCamera: false,
      showNavBar: false,
      starList: [false, false, false, false, false],
      showSuccessModal: false,
      showFailModal: false,
      failText: '',
      starRate: 0,
      opacity: 0,
      navList:[
         {src: '../../../res/index/nav-icon1.png'},
         {src: '../../../res/index/nav-icon2.png'},
         {src: '../../../res/index/nav-icon3.png'},
         {src: '../../../res/index/nav-icon4.png'},
      ],
      mascot1Ani: {},
      mascot2Ani: {},
      modal1Ani: {},
      modal2Ani: {},
   },

   /**
    * 组件的方法列表
    */
   methods: {
      tmove(){},
      stepInit () {
         const mascot1 = wx.createAnimation({
            duration: 0,
         })
         const modal1 = wx.createAnimation({
            duration: 0,
         })
         const mascot2 = wx.createAnimation({
            duration: 0,
         })
         const modal2 = wx.createAnimation({
            duration: 0,
         })
         mascot1.scale(0, 0).step()
         modal1.opacity(0).step()
         mascot2.translateX(100).step()
         modal2.opacity(0).step()
         this.setData({
            mascot1Ani: mascot1.export(),
            modal1Ani: modal1.export(),
            mascot2Ani: mascot2.export(),
            modal2Ani: modal2.export(),
         })
      },
      changeStep(e) {
         this.stepOut()
         setTimeout(()=>{
            const step = e.currentTarget.dataset.next
            this.setData({
               step,
               showNavBar: step === 1
            })
            this.triggerEvent('changeStep',step)
            this.stepMove()
         }, 600)
      },
      stepMove () {
         const mascot = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-out',
         })
         const modal = wx.createAnimation({
            delay: 300,
            duration: 300,
            timingFunction: 'ease-out',
         })
         setTimeout(()=>{
            if (this.data.step === 1) {
               mascot.scale(1, 1).step()
               modal.opacity(1).step()
               this.setData({
                  mascot1Ani: mascot.export(),
                  modal1Ani: modal.export(),
               })
               setTimeout(()=>{
                  this.setData({
                     showNavBar: true
                  })
               }, 300)
            } else if (this.data.step === 2) {
               mascot.translateX(0).step()
               modal.opacity(1).step()
               this.setData({
                  mascot2Ani: mascot.export(),
                  modal2Ani: modal.export(),
               })
            }
         }, 300)
      },
      stepOut () {
         const mascot = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-out',
         })
         const modal = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-out',
         })
         if (this.data.step === 1) {
            mascot.scale(0, 0).step()
            modal.opacity(0).step()
            this.setData({
               mascot1Ani: mascot.export(),
               modal1Ani: modal.export(),
            })
         } else if (this.data.step === 2) {
            mascot.translateX(100).step()
            modal.opacity(0).step()
            this.setData({
               mascot2Ani: mascot.export(),
               modal2Ani: modal.export(),
            })
         }
      },
      openScanModal() {
         this.setData({
            showScan: true
         })
         wx.nextTick(() => {
            this.setData({
               opacity: 1
            })
         })
      },
      closeScanModal() {
         this.setData({
            opacity: 0
         })
         setTimeout(() => {
            this.setData({
               showScan: false
            })
         }, 300)
      },
      async openScan() {
         const {result} = await scan()
         const {ajaxSrc, sKey} = app.globalData
         const res = await request({
            url: `${ajaxSrc}/api/works/uploadTuzhiNu?tuzhiNu=${result}`,
            method: 'POST',
            header: {sKey}
         })
         if(res.data.code === 4000){ //作品不存在
            this.setData({
               showScan: false,
               showFailModal: true,
               failText: '需要先上传到大屏后\\n才可以扫描成功喔！'
            })
         }else if(res.data.code === 4001){ //已被扫描
            this.setData({
               showScan: false,
               showFailModal: true,
               failText: '该作品已经被添加了！'
            })
         }else if(res.data.code === 0){
            this.setData({
               showScan: false,
               showSuccessModal: true
            })
            const audio = wx.createInnerAudioContext()
            audio.obeyMuteSwitch = false
            audio.src = app.globalData.audioSrc.star
            audio.onPlay(()=>{
               console.log('play')
            })
            audio.onError((err)=>{
               console.log(err)
            })
            setTimeout(() => {
               this.setData({
                  starRate: Math.random() > 0.5 ? 5 : 4
               })
               audio.play()
            }, 300)
            updateUserGrade().then(res => {
               console.log(res)
            })
         }else {
            $Message({
               content: res.data.msg,
               type: 'warning'
            });
         }

      },
      gotoWorksList() {
         wx.navigateTo({
            url: '/pages/works/list/list'
         })
      },
      closeSuccessModal() {
         this.setData({
            showSuccessModal: false
         })
      },
      closeFailModal() {
         this.setData({
            showFailModal: false
         })
      }
   }
})
/*
* mx1c37igmy 4001 已被扫描
* 1109155229466129 4000 作品不存在
* vo4zlt2v8v yamux1c3yo pvno4zlp5j 4lt2yea4uo hno4zlthps c7igqwfcy1 可以成功
* */