import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/animate.min.css'
import './assets/css/global.styl'
import Storage from 'vue-ls'
import 'view-design/dist/styles/iview.css'
import {
  Button,
  Message,
  Modal
} from 'view-design'

Vue.component('Button', Button)
Vue.use(Storage)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
