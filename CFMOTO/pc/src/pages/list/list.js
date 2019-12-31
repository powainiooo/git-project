import Vue from 'vue'
import App from './list.vue'
Vue.config.productionTip = false
new Vue({
   render: h => h(App)
}).$mount('#app')
