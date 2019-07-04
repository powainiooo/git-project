import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import '@/assets/css/reset.css'
import '@/assets/css/animate.min.css'
import '@/assets/css/micons.css'
import '@/assets/css/helve.css'
import tModal from './components/common/modal'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(tModal)
Vue.use(iView)
Vue.prototype.$ajax = axios

new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app')
