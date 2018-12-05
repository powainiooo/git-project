import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isLoading:true,
        p8Name:'control',
        pageData:{}
    },
    mutations:{
        setLoading(state,data){
            state.isLoading = data;
        },
        setPageData(state,data){
            state.pageData = data;
        }
    }
})
export default store
