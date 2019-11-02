import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const maxWidth = 1920
const minWidth = 1365
const asideMaxWidth = 460
const asideMinWidth = 335

export default new Vuex.Store({
   state: {
      // imgSrc: 'https://wechat.leesticket.com/upload/',
      imgSrc: 'http://ticket.pc-online.cc/upload/',
      wWidth: window.innerWidth,
      marginDis: 25,
      leftDis: 25
   },
   mutations: {
      setWidth (state, ww) {
         console.log('setWidth')
         if (ww < minWidth) ww = minWidth
         state.wWidth = ww
         state.marginDis = 10 + ((ww - minWidth) / (maxWidth - minWidth)) * 15
         state.leftDis = ((ww * 0.24 - asideMinWidth) / (asideMaxWidth - asideMinWidth)) * 25
      }
   },
   actions: {

   }
})
