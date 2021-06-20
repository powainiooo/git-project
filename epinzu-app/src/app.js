import Vue from 'vue'
import store from './store'
import './static/css/reset.css'

import './app.styl'

// Vue.config.productionTip = false

const App = {
  store,
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
