import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showGlobalMenu:true
    },
    mutations: {
        doShowGlobalMenu (state) {
            state.showGlobalMenu = true
        }
    },
    actions: {

    }
});
export default store
