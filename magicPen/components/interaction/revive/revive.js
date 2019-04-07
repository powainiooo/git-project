// components/interaction/revive/revive.js
const {payFuHuo} = require('../../../utils/api.js')
import regeneratorRuntime from '../../../utils/runtime.js'
const {promisify} = require('../../../utils/util.js')
const getLocation = promisify(wx.getLocation)
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
     modalContent: 'cost',
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
           this.gotoRecharge()
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
           const msg = this.data.freeFuhuoState === 2 ? '第一次免费复活哟！' `是否花费${this.data.cost}智力币复活？`:
           this.setData({
              showModal: true,
              modalType: 'cost',
              modalContent: msg,
           })
        }
     },
     async doBuy () {
        const {longitude, latitude} = await getLocation()
        const payRes = await payFuHuo(`${longitude},${latitude}`, this.data.tuzhiNu)
        if(payRes.code === 0) {
           this.setData({
              showModal: true,
              modalType: 'hint',
              modalContent: payRes.msg,
           })
        }else {
           if (payRes.code === 988) {
              this.setData({
                 showModal: true,
                 modalType: 'recharge',
                 modalContent: '智力币不足，是否前往充值？',
              })
           } else {
              this.setData({
                 showModal: true,
                 modalType: 'hint',
                 modalContent: payRes.msg,
              })
           }
        }
     }
  }
})
