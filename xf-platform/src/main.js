// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css';
import '@/assets/css/animate.min.css';
import '@/assets/css/micons.css';
import '@/assets/css/helve.css';
import tModal from './components/common/modal'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import iviewArea from 'iview-area';
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(tModal);
Vue.use(iView);
Vue.use(iviewArea);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
