import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Form,
  FormItem,
  Select,
  Input,
  Icon,
  DatePicker,
  TimePicker,
  RadioGroup,
  Radio
} from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Input', Input)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Icon', Icon)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
