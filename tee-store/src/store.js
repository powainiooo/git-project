// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sysInfo: {},
    menuInfo: 0
  },
  mutations: {
    SET_SYSINFO (state, data) {
      state.sysInfo = data
    }
  }
})

export default store
