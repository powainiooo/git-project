import Vue from 'vue'
import Vuex from 'vuex'
import { getAction } from './utils/api'

Vue.use(Vuex)

const state = {
  token: '',
  userId: '',
  userInfo: {},
  isLogin: false,
  lnglat: {},
  quesList: [],
  orderGoods: [],
  addrData: '',
}

const mutations = {
  SET_LNGLAT (state, data) {
    state.lnglat = data
  },
  SET_TOKEN (state, data) {
    state.token = data
    state.isLogin = data !== ''
  },
  SET_USERID (state, data) {
    state.userId = data
  },
  SET_USERINFO (state, data) {
    state.userInfo = data
  },
  SET_QUESLIST (state, data) {
    state.quesList = data
  },
  SET_ORDERGOODS (state, data) {
    state.orderGoods = data
  },
  SET_ADDRDATA (state, data) {
    state.addrData = data
  }
}

const actions = {
  getUserInfo(context) {
    getAction('/userapi/my').then(res => {
      if (res.code === 0) {
        context.commit('SET_USERINFO', res.data)
      }
    })
  }
}

const getters = {
  getNumbers(state) {
    return state.numbers
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
