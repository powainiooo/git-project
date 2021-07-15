import Vue from 'vue'
import App from './App.vue'
import Storage from 'vue-ls'
import router from './router'
import store from './store'
import tModal from './components/modal'
import Image from 'vant/lib/image'
import 'vant/lib/image/style'
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
  Radio,
  Message,
  Modal,
  Page,
  Upload,
  InputNumber
} from 'view-design'
import 'view-design/dist/styles/iview.css'
import './assets/css/reset.css'
import './assets/css/animate.min.css'
import './assets/css/global.styl'

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
Vue.component('Upload', Upload)
Vue.component('Page', Page)
Vue.component('InputNumber', InputNumber)
Vue.component('Modal', Modal)
Vue.component('VanImage', Image)
Vue.config.productionTip = false

Vue.use(Storage)
Vue.use(tModal)
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
// a2ropq
