import Vue from 'vue'
import Vuex from 'vuex'
import { getQueryString } from './util.js'
const data1 = 'F/WTJVAVEPkjP0+wvIeowcWeC+G57LU4QEw7zUHLEY8upe0QV9AOxLSJbftzI7wxLOQ4NIFwSTdt+cqj+hbxXIOxlTswCdUIxTCRaa0o5SggQVaq7i/Zrcib8sMuQ/mjBtNDVs4DTe2vWk3Z+LYLp+IvGZUI+F12S9RHEkyBiEletjiXGLxsPfdriVc15bflPnVav9qjfzwBkMVL0mtUEYDTeu2vvRIlalfc9m46mTMcmOS7Uux9WBUtICRYIf8KjxMdETVKecC8TqkesYmEUqRNwT9sCq6fYcv2eqke/8XaNaJejNk07UV7ZkjqyfyPpW4yKlolbx2abUxHqkKNCVIjh4ulypZb19hmtnNeIFw95kcujran/KAkckqf4Z1MR' //  杨锦伦
const data2 = 'F/WTJVAVEPkjP0+wvIeowcbgr+uaOODKjFLtuBYjOOt7fmS8aopECWTxyJWJ6vThqxUbQQ0OxPnjR71NC037H7ibskTpAtz4R6ta9kDNTuEMWRnktjJJJ/WqUMhN23c7vTOSvsJVCx66jZL7kQe+CX/vM13BqyTb14Ul4dwU6aELAKWwSFPQZ76I7VONHrL4mOZVGCBPk6WAX+cYcNzTT84Jn5TEi1oIJA4vCtraqLWi8TQmXcij0HrE5hnndVBkpp0ck1+4JDFTC1g+gOCPvDqkGlwsM4hFx4PrjLveA3icIDJXPOKRwfu7gL/Hi4kt1rhqt4OhTI9sW26dq1SWKw2SaIUUdWpcl8ik6LZOtFo7o97YqUNhcYJagMWIQzSqL' //  张绍裕
const params = {
   data: getQueryString('data') || data2,
   userName: getQueryString('userName') || 'test',
   source: getQueryString('source') || 'web'
}
console.log(params)

// 初始化年报停留时间结构
for (let i = 1; i < 25; i++) {
   window.footPrinter.stayTime[`stayTimeP${i}`] = -1
}
console.log(window.footPrinter)

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
      canChangePage: false
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
