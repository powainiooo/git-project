import Vuex from '@wepy/x'

export default new Vuex.Store({
   state: {
      phone: '0755-88888888'
   },
   mutations: {
      increment (state) {
         state.counter++
      },
      decrement (state) {
         state.counter--
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
