import Vue from 'vue'
import Vuex from 'vuex'
import { getQueryString } from './util.js'
const data1 = 'F/WTJVAVEPkjP0+wvIeowcWLQhV67feI+AQQKHQh6fhEDNR4JZCYiRgzINAXfhcWdGCJVhE3hciFstCdd4LUd0aK91h+s0lo3zAez3rK8slBEDX5BG9jpQlmzr1eB/wAMe52tIcPEtLUYTyj0JZDJ5e04byF2xdkQC3ep3buyWpLy8F5JoLBn9+7IUyEbv+jfp/3QZ8cPwIy2vrrjQcQTLK56AGziD0HfSlbCh/yM5BOnBjV8jVb4Fi8w/9PQenEiRCe5clxnPu1j2PtVnNPxNNlSLx1beCoJeGN9jwaquubDlxS+CyYuWeo2Xo1IHkAtY3ZfF6U/mPdfOKYAOQHpMrR8P1VTePqxcDD6MWtY5QnlYCB55RpT6XZdP4WP4DM9WpY8Uk2/cyAip2qmKUbqEg==' //  杨锦伦
const data2 = 'F/WTJVAVEPkjP0+wvIeowcWLQhV67feI+AQQKHQh6fhEDNR4JZCYiRgzINAXfhcWdGCJVhE3hciFstCdd4LUd0aK91h+s0lo3zAez3rK8slBEDX5BG9jpQlmzr1eB/wAMe52tIcPEtLUYTyj0JZDJ5e04byF2xdkQC3ep3buyWpLy8F5JoLBn9+7IUyEbv+jfp/3QZ8cPwIy2vrrjQcQTLK56AGziD0HfSlbCh/yM5BOnBjV8jVb4Fi8w/9PQenEiRCe5clxnPu1j2PtVnNPxNNlSLx1beCoJeGN9jwaquubDlxS+CyYuWeo2Xo1IHkAtY3ZfF6U/mPdfOKYAOQHpMrR8P1VTePqxcDD6MWtY5QnlYCB55RpT6XZdP4WP4DM9WpY8Uk2/cyAip2qmKUbqEg==' //  张绍裕

const params = {
   data: getQueryString('data') || data1,
   userName: decodeURI(getQueryString('userName') || '%E6%B5%8B%E8%AF%95%E6%B5%8B%E8%AF%95'),
   source: getQueryString('source') || 'app'
}
console.log('网页传参')
console.log(params)
if (params.source === 'web') {
   params.data = decodeURIComponent(params.data).replace(/\s/g, '+')
}

// 初始化年报停留时间结构
for (let i = 1; i < 25; i++) {
   window.footPrinter[`stayTimeP${i}`] = -1
}
console.log(window.footPrinter)

const call = params.source === 'app' ? '你' : 'TA'
// https://icloudproductlive.byd.com:17280/nianbao/
// https://cache.bydauto.com.cn/cloudservice/
const imgSrc = process.env.NODE_ENV === 'production'
   ? 'https://cache.bydauto.com.cn/cloudservice/'
   : '/'
console.log(imgSrc)
Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      keyList: ['city', 'travel', 'late', 'high', 'air', 'status', 'energy', 'unlock', 'whistle', 'music', 'game', 'learn'],
      useKeyList: [],
      loadingPecent: 0,
      currentPage: 'loading',
      tagName: '',
      powerMode: '',
      pageData: {},
      pageList: [],
      isDiLink: true,
      params,
      canChangePage: false,
      call,
      imgSrc
   },
   mutations: {
      changePage (state, data) {
         state.currentPage = data
      },
      changeTagName (state, data) {
         state.tagName = data
      },
      setLoadingPecent (state, data) {
         state.loadingPecent = data
      },
      setPageData (state, data) {
         state.pageData = data
         const powerMode = data.P0.powerMode
         if (powerMode === '纯电') {
            state.powerMode = 'EV'
         } else if (powerMode === '燃油') {
            state.powerMode = 'gasoline'
         } else if (powerMode === '混动') {
            state.powerMode = 'DM'
         } else if (powerMode === '双模') {
            state.powerMode = 'DM'
         }
         state.isDiLink = data.P0.dLink === 'Yes'
      },
      setPageList (state, data) {
         state.pageList = data
      },
      setUseKeyList (state, data) {
         state.useKeyList = data
      },
      setCanChangePage (state, data) {
         state.canChangePage = data
      }
   },
   actions: {

   }
})
