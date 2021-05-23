import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'view-design/dist/styles/iview.css'
import './assets/css/reset.css'
import './assets/css/animate.min.css'
import './assets/css/global.styl'
import Storage from 'vue-ls'
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
  Upload,
  Page,
  Tabs,
  TabPane,
  Message,
  Modal,
  Cascader,
  Poptip
} from 'view-design'

Vue.component('Button', Button)
Vue.component('Form', Form)
Vue.component('FormItem', FormItem)
Vue.component('Select', Select)
Vue.component('Option', Option)
Vue.component('Input', Input)
Vue.component('Icon', Icon)
Vue.component('DatePicker', DatePicker)
Vue.component('TimePicker', TimePicker)
Vue.component('Row', Row)
Vue.component('Col', Col)
Vue.component('Upload', Upload)
Vue.component('Page', Page)
Vue.component('Tabs', Tabs)
Vue.component('TabPane', TabPane)
Vue.component('Cascader', Cascader)
Vue.component('Poptip', Poptip)

Vue.use(Storage)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
