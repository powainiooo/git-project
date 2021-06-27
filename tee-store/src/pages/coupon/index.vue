<style scoped>
.store-list { margin: 0 25px; }
.store-col { margin-bottom: 40px; }
.store-col:nth-child(2) { animation-delay: .2s; }
.store-col:nth-child(3) { animation-delay: .4s; }
.store-col:nth-child(4) { animation-delay: .6s; }
.store-col:nth-child(5) { animation-delay: .8s; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container">
    <div class="tr mb65">
      <div class="iblock mr25" v-if="city !== ''">
        <button class="btn acenter">
          <img src="/static/images/icon-geo.png" mode="widthFix" class="w28 mr10" />
          <span class="mr5">{{city}}</span>
        </button>
      </div>
    </div>

    <div class="store-list">
      <div class="store-col slideUp" v-for="i in list" :key="index">
        <item :record="i" @tap="handleSelect" />
      </div>
    </div>
  </div>
  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import item from './modules/item'
import config from '@/config'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
import store from '@/store'
const { mapKey } = config
const qMap = new QQMapWX({
  key: mapKey
})
export default {
  components: {
    cHeader,
    cFooter,
    item
  },
  data () {
    return {
      city: '',
      list: []
    }
  },

  methods: {
    initCity () {
      const city = mpvue.getStorageSync('toolCity')
      console.log('initCity', city)
      if (city) {
        this.city = city
        this.getData()
      } else {
        const _this = this
        mpvue.getLocation({
          success (res) {
            console.log(res)
            qMap.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success (res2) {
                console.log(res2)
                _this.city = res2.result.ad_info.city.replace('市', '')
                mpvue.setStorageSync('toolCity', _this.city)
              }
            })
          }
        })
      }
    },
    getData () {
      console.log('getData')
      this.list = store.state.counponList
    },
    handleSelect (record) {
      store.commit('SET_COUPONID', record.id)
      mpvue.navigateBack({
        delta: -1
      })
    }
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.initCity()
  }
}
</script>
