import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)

export default new Vuex.Store({
   state: {
      phone: '',
      // ajaxSrc: 'http://move.pc-online.cc/mobile/',
      ajaxSrc: 'https://www.xx-bj.com/mobile/',
      userOpenID: '',
      orderNums: '',
      basePrice: 0,
      remarks: {
         remarks1: '',
         remarks2: ''
      }
   },
   mutations: {
      setOpenId (state, data) {
         state.userOpenID = data
      },
      setOrderNums (state, data) {
         state.orderNums = data
      },
      setBasePrice (state, data) {
         state.basePrice = data
      },
      setRemarks (state, data) {
         state.remarks = data
      },
      setPhone (state, data) {
         state.phone = data
      }
   }
})
