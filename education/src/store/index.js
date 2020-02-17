import Vuex from '@wepy/x'

export default new Vuex.Store({
   state: {
      counter: 0,
      showMenu: false,
      personalInfo: null
   },
   mutations: {
      toggleMenu (state, data) {
         state.showMenu = data
      }
   },
   actions: {
      increment ({ commit }) {
         commit('increment')
      },
      decrement ({ commit }) {
         commit('decrement')
      },
      incrementAsync ({ commit }) {
         setTimeout(() => {
            commit('increment')
         }, 1000)
      }
   }
})
