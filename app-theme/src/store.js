import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
   state: {
      isSearching: false
   },
   mutations: {
      setIsSearching (state, data) {
         state.isSearching = data
      }
   },
   actions: {

   }
})
