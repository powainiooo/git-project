import Vue from 'vue'
import Vuex from 'vuex'
import { getAction } from '@/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalData: {},
    hasGlobalData: false
  },
  mutations: {
    SET_GLOBALDATA (state, data) {
      state.globalData = data
      state.hasGlobalData = data.id !== undefined
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
