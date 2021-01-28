// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { imgSrc } = config

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      openid: '',
      personalInfo: {},
      settings: {},
      imgSrc
   },
   mutations: {
      SET_OPENID (state, data) {
         state.openid = data
      },
      SET_PERSONINFO (state, data) {
         state.personalInfo = data
      },
      SET_SETTING (state, data) {
         state.settings = data
      }
   }
})

export default store
