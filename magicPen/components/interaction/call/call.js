// components/interaction/call/call.js
const {payZhaohuan} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      peas: {
         type: Number,
         value: 0
      },
      cost: {
         type: Number,
         value: 0
      },
      resData: {
         type: Object,
         value: {}
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      showModal: false,
      modalType: 'hint',
      modalContent: '发动华丽召唤特技',
      modalContent2: '',
      countT: 0,
      count: 0,
      isBuying: false,
      showCallSuc: false,
      isIOS: app.globalData.isIOS,
   },

   /**
    * 组件的方法列表
    */
   methods: {
      modalConfirm () {
         if (this.data.modalType === 'hint') {
            this.closeModal()
         } else if (this.data.modalType === 'recharge') {
            if (this.data.isIOS) {
               this.closeModal()
            } else {
               this.gotoRecharge()
            }
         } else if (this.data.modalType === 'cost') {
            this.doBuy()
         }
      },
      gotoRecharge () {
         if (this.data.isIOS) {
            wx.showModal({
               title: '提示',
               content: '由于苹果官方限制，请联系线下神笔画画站点获取。'
            })
         } else {
            wx.navigateTo({
               url: '/pages/recharge/recharge'
            })
         }
      },
      closeModal () {
         this.setData({
            showModal: false,
         })
      },
      doCall () {
         if (this.data.count !== 0) return
         if (this.data.resData.data === null) return
         if (this.data.cost > this.data.peas) {
            this.setData({
               showModal: true,
               modalType: 'recharge',
               modalContent2: '',
            })
            return
         }
         this.setData({
            showModal: true,
            modalType: 'cost'
         })
      },
      async doBuy () {
         if(this.data.isBuying) return
         this.data.isBuying = true
         this.closeModal()
         const {longitude, latitude} = await getLocation({
            type: 'gcj02',
         })
         const payRes = await payZhaohuan(`${longitude},${latitude}`)
         if (payRes.code === 0) {
            this.setData({
               showCallSuc: true,
            })
            this.triggerEvent('reset')
         } else if (payRes.code === 15) {
            this.countDown(payRes.data)
         } else {
            this.setData({
               showModal: true,
               modalType: 'hint',
               modalContent2: payRes.msg,
            })
         }
         this.data.isBuying = false
      },
      closeSucModal () {
         this.setData({
            showCallSuc: false,
         })
      },
      countDown (count) {
         count = parseInt(count)
         this.setData({
            showModal: true,
            modalType: 'hint',
            modalContent2: `有人正在使用大屏特技，请稍等\n${count}秒`,
         })
         this.data.countT = setInterval(()=>{
            if (count === 0) {
               clearInterval(this.data.countT)
               this.doBuy()
            } else {
               count --
               this.setData({
                  modalContent2: `有人正在使用大屏特技，请稍等\n${count}秒`,
                  count
               })
            }
         },1000)
      }
   }
})
