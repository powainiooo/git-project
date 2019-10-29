import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      imgSrc: 'https://wechat.leesticket.com/upload/',
      contactData: {
         mail: '',
         phone: '',
         wechat: ''
      }
   },
   mutations: {

   },
   actions: {

   }
})
