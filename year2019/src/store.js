import Vue from 'vue'
import Vuex from 'vuex'

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
      isDiLink: true
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
      }
   },
   actions: {

   }
})
