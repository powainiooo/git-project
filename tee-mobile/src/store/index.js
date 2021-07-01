import Vue from 'vue'
import Vuex from 'vuex'
import { getAction } from '@/utils'
const date = localStorage.getItem('TEE_DATE')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalData: {},
    imgSrc: 'http://file.dev.sysds.cn/',
    hasGlobalData: false,
    currentDate: date
  },
  mutations: {
    SET_GLOBALDATA (state, data) {
      state.globalData = data
      state.hasGlobalData = data.id !== undefined
    },
    SET_DATE (state, data) {
      state.currentDate = data
    }
  },
  actions: {
    getUserData (context, isLogin) {
      return new Promise((resolve, reject) => {
        getAction('/shopapi/shop/show').then(res => {
          if (res.code === 0) {
            context.commit('SET_GLOBALDATA', res.data)
            resolve(res.data)
          } else {
            reject(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})
