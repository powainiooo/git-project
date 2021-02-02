// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { imgSrc } = config

Vue.use(Vuex)

const store = new Vuex.Store({
   state: {
      token: '',
      openid: '',
      personalInfo: {},
      settings: {},
      imgSrc,
      showCart: false,
      showGoodsDetail: false
   },
   mutations: {
      SET_TOKEN (state, data) {
         state.token = data
      },
      SET_OPENID (state, data) {
         state.openid = data
      },
      SET_PERSONINFO (state, data) {
         state.personalInfo = data
      },
      SET_SETTING (state, data) {
         state.settings = data
      },
      SET_CARTSTATUS (state, data) {
         state.showCart = data
      },
      SET_GOODSDETAILSTATUS (state, data) {
         state.showGoodsDetail = data
      }
   }
})

export default store
