import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  token: '',
  userId: '',
  isLogin: false,
  lnglat: {},
  quesList: []
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
  SET_QUESLIST (state, data) {
    state.quesList = data
  }
}

const actions = {
  addNumber(context, number) {
    context.commit('ADD_NUMBER', number)
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
