import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const state = {
    //vuex存储全局变量的对象
    login: {
        display: false,
        to: "",
        type: 1 //1 登录 2 注册
    },
    alertError: "",
    showQr: {
        title: "",
        show: false
    },
    isLogin: false
};

const mutations = {
    //提交更改属性
    loginCtr(state, payload) {
        state.login = payload;
    },
    errorCtr(state, payload) {
        state.alertError = payload;
    },
    qrCtr(state, payload) {
        state.showQr = payload;
    },
    loginStatusCtr(state, payload) {
        state.isLogin = payload;
    }
};

const getter = {
    //计算属性
};

export default new Vuex.Store({
    state,
    mutations,
    getter
});
