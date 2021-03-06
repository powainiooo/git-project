// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { tokenKey, imgSrc } = config

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      [tokenKey]: '',
      personalInfo: {},
      settings: {},
      imgSrc,
      hhqy: '',
      thhzc: '',
      sytk: '',
      yszc: '',
      addressInfo: null,
      invoiceInfo: null,
      beginBuyData: {}
   },
   mutations: {
      SET_LOGIN_KEY (state, data) {
         state[tokenKey] = data
         mpvue.setStorageSync(tokenKey, data)
      },
      SET_PERSONINFO (state, data) {
         state.personalInfo = data
      },
      SET_SETTING (state, data) {
         state.settings = data
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
      },
      SET_BEGINBUY (state, data) {
         state.beginBuyData = data
      }
   }
})

export default store
