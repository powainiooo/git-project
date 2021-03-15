import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  Icon,
  DatePicker,
  TimePicker,
  Row,
  Col,
  RadioGroup,
  Radio
} from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Input', Input)
Vue.component('RadioGroup', RadioGroup)
Vue.component('Radio', Radio)
Vue.component('Icon', Icon)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
