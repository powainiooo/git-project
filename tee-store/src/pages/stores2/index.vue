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
  <c-footer current="order" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import item from './modules/item'
import { getAction, postAction } from '@/utils/api'
import store from '@/store'
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
    getData () {
      const params = {
        lat: this.latitude,
        lng: this.longitude,
        // lat: 22.73081065,
        // lng: 114.38086700,
        page: this.page,
        limit: 20
      }
      params.from = Number(this.from)
      if (params.from === 1) {
        params.goods = store.state.nearbyGoods
      }
      postAction('/userapi/shop/valid/list', params).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    },
    toDetail (record) {
      store.commit('SET_STOREINFO2', record)
      mpvue.navigateBack({
        delta: -1
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
    }
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.from = options.from
    this.list = store.state.storeList
    this.total = store.state.storeList.length
    this.getCity()
  }
}
</script>
