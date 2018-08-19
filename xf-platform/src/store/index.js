import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showGlobalMenu:false
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
