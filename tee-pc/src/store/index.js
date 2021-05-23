import Vue from 'vue'
import Vuex from 'vuex'
import { getAction } from '@/utils'
import { ACCESS_TOKEN } from '@/config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalData: {},
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
    imgSrc: 'http://file.dev.sysds.cn/',
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
