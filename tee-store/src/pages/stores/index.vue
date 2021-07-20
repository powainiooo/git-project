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
  <c-header menus />
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
  computed: {
    locationAuth () {
      return store.state.locationAuth
    }
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
        isHighAccuracy: true,
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
      const params = {
        lat: this.latitude,
        lng: this.longitude,
        // lat: 22.73081065,
        // lng: 114.38086700,
        page: this.page,
        limit: 20
      }
      if (this.city === '全部') {
        params.city = ''
      } else {
        params.city = this.city
      }
      getAction('/userapi/shop/index/data', params).then(res => {
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
    },
    toDetail (record) {
      store.commit('SET_STOREINFO', record)
      mpvue.setStorage({
        key: 'storeData',
        data: record
      })
      store.commit('SET_CLOSESTATUS', true)
      store.commit('SET_PRIZESTATUS', true)
      mpvue.navigateTo({
        url: '/pages/goods/main'
      })
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
    },
    showAuthHint () {
      const _this = this
      setTimeout(() => {
        mpvue.showModal({
          title: '请求授权当前位置',
          content: '需要获取您的地理位置，请确认授权',
          success (res) {
            if (res.confirm) {
              mpvue.openSetting({
                success (res2) {
                  if (res2.authSetting['scope.userLocation']) {
                    mpvue.showToast({
                      title: '授权成功'
                    })
                    _this.initCity()
                    store.commit('SET_LOCATIONAUTN', true)
                  }
                }
              })
            } else if (res.cancel) {
              mpvue.showToast({
                title: '拒绝授权',
                icon: 'none'
              })
            }
          }
        })
      }, 1000)
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
      this.list = []
      this.getData()
      store.commit('SET_FROM', '')
    }
  },
  onLoad () {
    Object.assign(this.$data, this.$options.data())
    this.initCity()
    this.getCity()
    if (!this.locationAuth) {
      this.showAuthHint()
    }
  }
}
</script>
