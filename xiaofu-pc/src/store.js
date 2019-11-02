import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      // imgSrc: 'https://wechat.leesticket.com/upload/',
      imgSrc: 'http://ticket.pc-online.cc/upload/',
      wWidth: window.innerWidth
   },
   mutations: {
      setWidth (state, data) {
         state.wWidth = data
      }
   },
   actions: {

   }
})
