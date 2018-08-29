import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import Cookies from 'js-cookie'
import router from '@/router'
Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        showGlobalMenu:Cookies.get('mid'),
        isLogin:false,
        userData:{},
        bankData:{},
        contactData:{}
    },
    mutations: {
        doLogin(state){
            state.isLogin = true
        },
        doShowGlobalMenu (state,data) {
            state.showGlobalMenu = data
        },
        setGlobalData(state,data){
            state.userData = data.data;
            state.bankData = data.bank;
            state.contactData = data.contact;
        }
    },
    actions: {
        getUserData(context,isLogin){
            axios.defaults.headers.common['mid'] = Cookies.get('xfmid');
            axios.defaults.headers.common['tokey'] = Cookies.get('xftokey');
            axios.defaults.baseURL = 'http://ticket.pc-online.cc';
            axios.get('/client/api/get_info').then(res=>{
                let data = res.data;
                if(data.status == 1){
                    context.commit('doLogin');
                    context.commit('setGlobalData',data);
                    if(isLogin){
                        if(data.bank.id){
                            router.push('list');
                        }else{
                            router.push('bind');
                        }
                    }
                }
            })
        }
    }
});
export default store
