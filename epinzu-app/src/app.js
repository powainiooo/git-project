import Taro from '@tarojs/taro'
import Vue from 'vue'
import store from './store'
import { imgSrc } from '@/config'
import './static/css/reset.css'
import { getTokenData } from '@/utils/api'

import './app.styl'

// Vue.config.productionTip = false

const App = {
  store,
  onShow (options) {
  },
  onLaunch () {
    console.log('app onLaunch')
    Taro.imgSrc = imgSrc
    this.getLnglat()

    getTokenData()
  },
  methods: {
    getLnglat () {
      const lnglat = Taro.getStorageSync('lnglatData')
      console.log('lnglatData Storage', lnglat)
      if (typeof lnglat === 'object') {
        store.commit('SET_LNGLAT', lnglat)
      } else {
        Taro.getLocation({
          success (res) {
            const data = {
              lng: res.longitude,
              lat: res.latitude
            }
            store.commit('SET_LNGLAT', data)
            Taro.setStorage({
              key: 'lnglatData',
              data,
              success (res2) {
                console.log('SET_LNGLAT success', res2)
              }
            })
          }
        })
      }
    }
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}

export default App
