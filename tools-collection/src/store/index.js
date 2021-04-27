// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
const { tokenKey, imgSrc } = config

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    [tokenKey]: '',
    personalInfo: {},
    settings: {},
    imgSrc,
    poetryData: {},
    taxData: {},
    mapData: [],
    picData: []
  },
  mutations: {
    SET_LOGIN_KEY (state, data) {
      state[tokenKey] = data
      mpvue.setStorageSync(tokenKey, data)
    },
    SET_PERSONINFO (state, data) {
      state.personalInfo = data
    },
    SET_SETTING (state, data) {
      state.settings = data
    },
    SET_POETRY (state, data) {
      state.poetryData = data
    },
    SET_TAX (state, data) {
      state.taxData = data
    },
    SET_MAP (state, data) {
      state.mapData = data
    },
    SET_PIC (state, data) {
      state.picData = data
    }
  }
})

export default store
