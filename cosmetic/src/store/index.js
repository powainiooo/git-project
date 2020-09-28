// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { tokenKey } = config

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      [tokenKey]: '',
      personalInfo: null,
      imgSrc: 'https://yghzp.vsapp.cn',
      hhqy: '',
      thhzc: '',
      sytk: '',
      yszc: '',
      addressInfo: null,
      invoiceInfo: null
   },
   mutations: {
      SET_LOGIN_KEY (state, data) {
         state[tokenKey] = data
         mpvue.setStorageSync(tokenKey, data)
      },
      SET_PERSONINFO (state, data) {
         state.personalInfo = data
      },
      SET_HHQY (state, data) {
         state.hhqy = data
      },
      SET_THHZC (state, data) {
         state.thhzc = data
      },
      SET_SYTK (state, data) {
         state.sytk = data
      },
      SET_YSZC (state, data) {
         state.yszc = data
      },
      SET_ADDRESS (state, data) {
         state.addressInfo = data
      },
      SET_INVOICE (state, data) {
         state.invoiceInfo = data
      }
   }
})

export default store
