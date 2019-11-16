import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)

export default new Vuex.Store({
   state: {
      phone: '0755-88888888',
      ajaxSrc: 'http://move.pc-online.cc/mobile/',
      userOpenID: '',
      orderNums: '',
      basePrice: 0
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
      }
   }
})
