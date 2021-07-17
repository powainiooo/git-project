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
    nearbyStoreInfo: {},
    smAuth: {},
    storeList: [],
    selectedAddr: {},
    counponList: [],
    couponId: 0,
    menuInfo: 0,
    nearbyGoods: {},
    pay: {},
    moveIcon: '',
    canShowPrize: true,
    canShowClose: true,
    from: ''
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
      state.isLogin = true
      mpvue.setStorage({
        key: tokenKey,
        data
      })
    },
    SET_FROM (state, data) {
      state.from = data
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
    SET_STOREINFO2 (state, data) {
      state.nearbyStoreInfo = data
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
    },
    SET_MOVEICON (state, data) {
      state.moveIcon = data
    },
    SET_PRIZESTATUS (state, data) {
      state.canShowPrize = data
    },
    SET_CLOSESTATUS (state, data) {
      state.canShowClose = data
    }
  }
})

export default store
