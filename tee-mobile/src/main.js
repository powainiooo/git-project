import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import './assets/css/reset.css'
import './assets/css/common.css'
import Storage from 'vue-ls'
import {
  List,
  Toast,
  Dialog,
  Image as VanImage
} from 'vant'
// import vConsole from 'vconsole'
// const vc = new vConsole()

Vue.use(Storage)
Vue.use(List)
Vue.use(VanImage)
Vue.prototype.$Toast = Toast
Vue.prototype.$Dialog = Dialog
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
