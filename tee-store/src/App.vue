<script>
import { getTokenData } from '@/utils/api'
import config from '@/config'
import store from './store'
import { getAction } from './utils/api'

const { imgSrc } = config

export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */
    mpvue.getSystemInfo({
      success (res) {
        console.log('getSystemInfo', res)
        store.commit('SET_SYSINFO', res)
      }
    })
    getTokenData()
    this.loadFont()
    this.getConfigData()
    mpvue.imgSrc = imgSrc
    mpvue.toPage = function (url) {
      mpvue.navigateTo({
        url
      })
    }
    const storeData = mpvue.getStorageSync('storeData')
    console.log('storeData', storeData)
    if (storeData && storeData.shop_id) {
      store.commit('SET_STOREINFO', storeData)
    }

    this.getSetting()
  },
  methods: {
    loadFont () {
      // const baseUrl = 'https://api.wsgb.club/static/font/'
      // mpvue.loadFontFace({
      //   global: true,
      //   family: 'DinB',
      //   source: `url("${baseUrl}DIN_Alternate_Bold.ttf")`,
      //   success: (res) => {
      //     console.log('DIN_Alternate_Bold load over', res)
      //   },
      //   fail (err) {
      //     console.log('DIN_Alternate_Bold load fail', err)
      //   }
      // })
      // mpvue.loadFontFace({
      //   global: true,
      //   family: 'DinL',
      //   source: `url("${baseUrl}DIN-Light.otf")`,
      //   success: (res) => {
      //     console.log('DIN-Light load over', res)
      //   },
      //   fail (err) {
      //     console.log('DIN-Light load fail', err)
      //   }
      // })
    },
    getConfigData () {
      getAction('/userapi/config').then(res => {
        if (res.code === 0) {
          store.commit('SET_SMAUTH', res.data.weixin_message)
        }
      })
    },
    getSetting () {
      mpvue.getSetting({
        success (res) {
          console.log('getSetting', res)
          if (res.authSetting['scope.userLocation'] === undefined) {
            store.commit('SET_LOCATIONAUTN', 'none')
          } else {
            store.commit('SET_LOCATIONAUTN', res.authSetting['scope.userLocation'])
          }
        }
      })
    }
  }
}
</script>

<style>
@import "../static/css/reset.css";
@import "../static/css/DIN-Bold.css";
@import "../static/css/DIN-Light.css";
</style>
<style src="../static/css/common.css">
</style>
