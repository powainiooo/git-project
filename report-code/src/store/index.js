import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isLoading:false,
        p8Name:'control'
    },
    mutations:{
        setLoading(state,data){
            state.isLoading = data;
        }
    }
})
export default store
