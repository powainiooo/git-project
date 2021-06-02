// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { tokenKey } = config

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '25b31bd1974ffe80418007f37e45955a1',
    personalInfo: {},
    isLogin: false,
    sysInfo: {},
    storeInfo: {},
    counponList: [],
    menuInfo: 0
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
      mpvue.setStorage({
        key: tokenKey,
        data
      })
    },
    SET_PERSONINFO (state, data) {
      state.personalInfo = data
    },
    SET_SYSINFO (state, data) {
      state.sysInfo = data
    },
    SET_STOREINFO (state, data) {
      state.storeInfo = data
    },
    SET_COUPON (state, data) {
      state.counponList = data
    },
    SET_LOGIN (state, data) {
      state.isLogin = data
    }
  }
})

export default store
