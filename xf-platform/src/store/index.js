import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showGlobalMenu:false,
        isLogin:false,
        userData:{},
        bankData:{},
        contactData:{}
    },
    mutations: {
        doLogin(state){
            state.isLogin = true
        },
        doShowGlobalMenu (state) {
            state.showGlobalMenu = true
        },
        setGlobalData(state,data){
            state.userData = data.data;
            state.bankData = data.bank[0];
            state.contactData = data.contact;
        }
    },
    actions: {

    }
});
export default store
