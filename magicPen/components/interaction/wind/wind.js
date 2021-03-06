// components/interaction/wind/wind.js
const {payFengyu} = require('../../../utils/api.js')
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
  },

  /**
   * 组件的初始数据
   */
  data: {
     showModal: false,
     modalType: 'cost',
     modalContent: '',
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
        // if (this.data.cost > this.data.peas) {
        //    this.setData({
        //       showModal: true,
        //       modalType: 'recharge',
        //       modalContent: `发动呼风唤雨特技`,
        //    })
        // } else {
        //    this.setData({
        //       showModal: true,
        //       modalType: 'cost',
        //       modalContent: `用${this.data.cost}个来画豆发动特技？`,
        //    })
        // }
     },
     closeSucModal () {
        this.setData({
           showCallSuc: false,
        })
     },
     async doBuy () {
        if(this.data.isBuying) return
        this.data.isBuying = true
        this.closeModal()
        const {longitude, latitude} = await getLocation({
           type: 'gcj02',
        })
        const payRes = await payFengyu(`${longitude},${latitude}`)
        if(payRes.code === 0) {
           this.setData({
              showCallSuc: true,
           })
           this.triggerEvent('reset')
        }else {
           if (payRes.code === 988) {
              this.setData({
                 showModal: true,
                 modalType: 'recharge',
                 modalContent: '来画豆不足，是否前往充值？',
              })
           } else {
              this.setData({
                 showModal: true,
                 modalType: 'hint',
                 modalContent: payRes.msg,
              })
           }
        }
        this.data.isBuying = false
     }
  }
})
