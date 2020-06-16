import Vue from "vue";
import App from "./App";
import router from "./router";
require("!style-loader!css-loader!less-loader!./assets/less/common.less"); //引入公共less文件
//多语言切换
import i18n from "./i18n/i18n";

// 全局请求封装
import http from "./assets/js/http";
Vue.prototype.http = http;

//vuex状态管理
import store from "./store/index";

//mock数据
// require('./mock')

//按需引入element-ui
import {
    Pagination,
    Dialog,
    Rate,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Radio,
    Loading,
    Message,
    MessageBox
} from "element-ui";
//分页组件
Vue.use(Pagination);
//弹窗组件
Vue.use(Dialog);
//评分组件
Vue.use(Rate);
//表单组件
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
//单选、多选组件
Vue.use(Select)
Vue.use(Option)
Vue.use(Radio);
// //加载组件
Vue.use(Loading);
Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$message = Message;

//关闭生产环境错误提示
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    i18n,
    store,
    components: {
        App
    },
    template: "<App/>"
});
