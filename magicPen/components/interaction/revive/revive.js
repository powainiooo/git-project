// components/interaction/revive/revive.js
const {payFuHuo} = require('../../../utils/api.js')
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
     tuzhiNu: '',
     freeFuhuoState: 1,
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
     selectWorks (e) {
        const {id, state} = e.currentTarget.dataset
        this.setData({
           tuzhiNu: id,
           freeFuhuoState: state,
        })
     },
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
        wx.navigateTo({
           url: '/pages/recharge/recharge'
        })
     },
     closeModal () {
        this.setData({
           showModal: false,
        })
     },
     doCall () {
        if(this.data.resData.data === null) return
        if(this.data.tuzhiNu === '') {
           this.setData({
              showModal: true,
              modalType: 'hint',
              modalContent: '请选择一个要复活的作品！',
           })
        }else {
           if (this.data.cost > this.data.peas) {
              this.setData({
                 showModal: true,
                 modalType: 'recharge',
                 modalContent: `发动3D复活特技`,
              })
           } else {
              const msg = this.data.freeFuhuoState === 2 ? '第一次免费复活哟！': `是否${this.data.cost}来画豆复活？`
              this.setData({
                 showModal: true,
                 modalType: 'cost',
                 modalContent: msg,
              })
           }

        }
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
        const payRes = await payFuHuo(`${longitude},${latitude}`, this.data.tuzhiNu)
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
