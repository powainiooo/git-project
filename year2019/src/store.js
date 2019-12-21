import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      loadingPecent: 0,
      currentPage: 'loading',
      tagName: 'baozou',
      pageData: {}
   },
   mutations: {
      changePage (state, data) {
         state.currentPage = data
      },
      changeTagName (state, data) {
         state.tagName = data
      },
      setLoadingPecent (state, data) {
         console.log(data)
         state.loadingPecent = data
      },
      setPageData (state, data) {
         state.pageData = data
      }
   },
   actions: {

   }
})
