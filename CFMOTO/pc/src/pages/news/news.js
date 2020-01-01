import Vue from 'vue'
import App from './news.vue'
import { Select, Option, Icon } from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.config.productionTip = false
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Icon', Icon)

new Vue({
   render: h => h(App)
}).$mount('#app')
