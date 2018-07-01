// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

Vue.prototype.$ajax = axios;
Vue.config.productionTip = false;
Vue.use(iView);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
