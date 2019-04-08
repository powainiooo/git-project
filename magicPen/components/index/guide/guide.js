// components/index/guide/guide.js
import regeneratorRuntime from '../../../utils/runtime.js'
const {updateUserGrade} = require('../../../utils/api.js')
const {promisify} = require('../../../utils/util.js')
const scan = promisify(wx.scanCode)
const request = promisify(wx.request)
const { $Message } = require('../../iview/base/index')
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      useGuide: {
         type: Boolean,
         value: true
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      step: 1,
      showScan: false,
      showCamera: false,
      starList: [false, false, false, false, false],
      showSuccessModal: false,
      showFailModal: false,
      failText: '',
      starRate: 0,
      opacity: 0
   },

   /**
    * 组件的方法列表
    */
   methods: {
      changeStep(e) {
         const step = e.currentTarget.dataset.next
         this.setData({
            step
         })
         this.triggerEvent('changeStep',step)
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
         const {ajaxSrc, sKey} = getApp().globalData
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
            setTimeout(() => {
               this.setData({
                  starRate: Math.random() > 0.5 ? 5 : 4
               })
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