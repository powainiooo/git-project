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
      thhzc: ''
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
      }
   }
})

export default store
