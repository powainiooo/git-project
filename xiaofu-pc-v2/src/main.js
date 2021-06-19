import Vue from 'vue'
import App from './App.vue'
import './assets/css/reset.css'
import './assets/css/animate.min.css'
import './assets/css/global.styl'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
