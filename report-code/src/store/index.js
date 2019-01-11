import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isLoading:true,
        isPosting:false,
        p8Name:'control',
        pageData:{}
    },
    mutations:{
        setLoading(state,data){
            state.isLoading = data;
        },
        setPageData(state,data){
            state.pageData = data;
        },
        setPosting(state,data){
            state.isPosting = data;
        }
    }
})
export default store
