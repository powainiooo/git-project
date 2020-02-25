import wepy from '@wepy/core'
import Vuex from '@wepy/x'
wepy.use(Vuex)

export default new Vuex.Store({
   state: {
      counter: 0,
      showMenu: false,
      personalInfo: null,
      imgSrc: 'https://bbart.waiting8.com',
      selectedStore: 1
   },
   mutations: {
      toggleMenu (state, data) {
         state.showMenu = data
      },
      setPersonInfo (state, data) {
         state.personalInfo = data
      },
      setStoreID (state, data) {
         state.selectedStore = data
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
