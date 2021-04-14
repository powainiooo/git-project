import Vue from 'vue'
import Vuex from 'vuex'
import { postAction } from '@/utils'
import { ACCESS_TOKEN } from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerData: {
      account: {},
      type: '1',
      step1: {},
      step2: {}
    },
    bankList: [
      { label: '招商银行', value: '1001' },
      { label: '工商银行', value: '1002' },
      { label: '建设银行', value: '1003' },
      { label: '浦发银行', value: '1004' },
      { label: '农业银行', value: '1005' },
      { label: '民生银行', value: '1006' },
      { label: '兴业银行', value: '1009' },
      { label: '平安银行', value: '1010' },
      { label: '交通银行', value: '1020' },
      { label: '中信银行', value: '1021' },
      { label: '光大银行', value: '1022' },
      { label: '华夏银行', value: '1025' },
      { label: '中国银行', value: '1026' },
      { label: '广发银行', value: '1027' },
      { label: '北京银行', value: '1032' },
      { label: '宁波银行', value: '1056' },
      { label: '邮储银行', value: '1066' }
    ],
    config: {},
    globalData: {},
    hasGlobalData: false
  },
  mutations: {
    SET_REGISTER (state, data) {
      state.registerData[data.key] = data.data
    },
    SET_CONFIG (state, data) {
      state.config = data
    },
    SET_GLOBALDATA (state, data) {
      state.globalData = data
      state.hasGlobalData = data.id !== undefined
    }
  },
  actions: {
    getUserData (context, isLogin) {
      return new Promise((resolve, reject) => {
        postAction('/editor/user/info').then(res => {
          if (res.code === 1) {
            context.commit('SET_GLOBALDATA', res.data)
            resolve()
          } else {
            reject(res.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout (context, isLogin) {
      return new Promise((resolve, reject) => {
        postAction('/editor/user/logout').then(res => {
          if (res.code === 1) {
            Vue.ls.remove(ACCESS_TOKEN)
            context.commit('SET_GLOBALDATA', {})
            resolve()
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
