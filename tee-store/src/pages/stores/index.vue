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
        <picker :range="cities" range-key="city" @change="cityChange">
          <button class="btn acenter">
            <img src="/static/images/icon-geo.png" mode="widthFix" class="w28 mr10" />
            <span class="mr5">{{city}}</span>
          </button>
        </picker>
      </div>
    </div>
    <div class="store-list">
      <div class="store-col slideUp" v-for="i in list" :key="index">
        <item :key="id" :record="i" @tap="toDetail" />
      </div>
    </div>
  </div>
<!--  <c-footer current="order" v-if="from === 'tee'" />-->
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import item from './modules/item'
import config from '@/config'
import QQMapWX from '@/utils/qqmap-wx-jssdk.min.js'
import { getAction, postAction } from '@/utils/api'
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
      latitude: '',
      longitude: '',
      list: [],
      page: 1,
      total: 0,
      from: '',
      cities: [{ city: '全部' }]
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
        },
        fail (err) {
          console.log('location fail', err)
          _this.city = '全部'
          _this.getData()
        }
      })
    },
    getData () {
      let url
      const params = {
        lat: this.latitude,
        lng: this.longitude,
        // lat: 22.73081065,
        // lng: 114.38086700,
        page: this.page,
        limit: 20
      }
      if (this.from === 'goods' || this.from === 'other') {
        url = '/userapi/shop/index/data'
        if (this.city === '全部') {
          params.city = ''
        } else {
          params.city = this.city
        }
        // params.city = '深圳'
        getAction(url, params).then(res => {
          if (res.code === 0) {
            this.list = this.list.concat(res.data)
            this.total = res.count
            if (res.data.length === 0) {
              mpvue.navigateTo({
                url: '/pages/result/main?result=store'
              })
            }
          }
        })
      } else {
        url = '/userapi/shop/valid/list'
        params.from = Number(this.from)
        if (params.from === 1) {
          params.goods = store.state.nearbyGoods
        }
        postAction(url, params).then(res => {
          if (res.code === 0) {
            this.list = this.list.concat(res.data)
            this.total = res.count
          }
        })
      }
    },
    toDetail (record) {
      if (this.from === 'goods' || this.from === 'other') {
        store.commit('SET_STOREINFO', record)
        mpvue.setStorage({
          key: 'storeData',
          data: record
        })
      } else {
        store.commit('SET_STOREINFO2', record)
      }
      if (this.from === 'goods') {
        store.commit('SET_CLOSESTATUS', true)
        store.commit('SET_PRIZESTATUS', true)
        mpvue.navigateBack({
          delta: -1
        })
      } else if (this.from === 'tabbar') {
        mpvue.switchTab({
          url: '/pages/goods/main'
        })
      } else {
        mpvue.navigateBack({
          delta: -1
        })
      }
    },
    getCity () {
      getAction('/userapi/shop/cities').then(res => {
        if (res.code === 0) {
          this.cities = this.cities.concat(res.data)
        }
      })
    },
    cityChange (e) {
      const i = e.mp.detail.value
      this.city = this.cities[i].city
      this.page = 1
      this.list = []
      this.getData()
    }
  },
  onReachBottom () {
    if (this.total > this.list.length) {
      this.page += 1
      this.getData()
    }
  },
  onShow () {
    if (store.state.from === 'result') {
      this.city = '全部'
      this.latitude = ''
      this.longitude = ''
      this.getData()
      store.commit('SET_FROM', '')
    }
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.from = options.from || 'tee'
    if (this.from === 'goods' || this.from === 'other') {
      this.initCity()
    } else {
      this.list = store.state.storeList
      this.total = store.state.storeList.length
    }
    this.getCity()
  }
}
</script>
