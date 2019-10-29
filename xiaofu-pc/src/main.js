import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import V2Datepicker from 'v2-datepicker'
import './assets/css/V2Datepicker.css'

Vue.use(VueAwesomeSwiper)
Vue.use(vSelect)
Vue.use(V2Datepicker)

Vue.config.productionTip = false

new Vue({
   router,
   store,
   render: h => h(App)
}).$mount('#app')
