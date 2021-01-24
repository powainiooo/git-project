import Vue from 'vue'
import App from './App.vue'
import './assets/styles/reset.css'

import LuckDraw from 'vue-luck-draw'
Vue.use(LuckDraw)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
