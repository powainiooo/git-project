// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { tokenKey } = config

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    personalInfo: {},
    isLogin: false,
    sysInfo: {},
    storeInfo: {},
    smAuth: {},
    storeList: [],
    selectedAddr: {},
    counponList: [],
    couponId: 0,
    menuInfo: 0,
    nearbyGoods: {},
    pay: {}
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
    SET_STORELIST (state, data) {
      state.storeList = data
    },
    SET_COUPON (state, data) {
      state.counponList = data
    },
    SET_COUPONID (state, data) {
      state.couponId = data
    },
    SET_NEARBYGOODS (state, data) {
      state.nearbyGoods = data
    },
    SET_LOGIN (state, data) {
      state.isLogin = data
    },
    SET_PAY (state, data) {
      state.pay = data
    },
    SET_ADDR (state, data) {
      state.selectedAddr = data
    },
    SET_SMAUTH (state, data) {
      state.smAuth = data
    }
  }
})

export default store
