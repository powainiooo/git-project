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
        <item :key="id" :record="i" />
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
import { getAction } from '@/utils/api'
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
      latitude: '',
      longitude: '',
      list: [],
      page: 1,
      total: 0
    }
  },

  methods: {
    initCity () {
      const _this = this
      mpvue.getLocation({
        success (res) {
          console.log('getLocation', res)
          qMap.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success (res2) {
              console.log('reverseGeocoder', res2)
              _this.city = res2.result.ad_info.city.replace('市', '')
              _this.latitude = res.latitude
              _this.longitude = res.longitude
              _this.getData()
            }
          })
        }
      })
    },
    getData () {
      getAction('/userapi/shop/index/data', {
        city: this.city,
        lat: this.latitude,
        lng: this.longitude,
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    }
  },
  onReachBottom () {
    if (this.total > this.list.length) {
      this.page += 1
      this.getData()
    }
  },
  onLoad () {
    this.initCity()
  }
}
</script>
