// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    personalInfo: {},
    settings: {},
    configData: {}
  },
  mutations: {
    SET_TOKEN (state, data) {
      state.token = data
      mpvue.setStorage({
        key: 'XIAOFU_TOKEN',
        data
      })
    },
    SET_PERSONINFO (state, data) {
      state.personalInfo = data
    },
    SET_SETTING (state, data) {
      state.settings = data
    },
    SET_CONFIGDATA (state, data) {
      state.configData = data
    }
  }
})

export default store
