<template>
  <view class="Search ml12 mr12 ">
    <view class="mb20 pt4 pb4 between" v-if="page === 'normal'">
      <view class="flex100">
        <search ref="search" placeholder="品租生活" />
      </view>
      <view @tap="doSearch(null)" class="ml8">搜索</view>
    </view>
    <view class="mb20 pt4 pb4 between" v-if="page === 'nearby'">
      <view class="acenter nearby-info" style="flex: 1 0 auto;" @tap="chooseLocation">
        <image src="@/img/dot.png" mode="widthFix" class="w20" />
        <view class="h3">{{address}}</view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view style="width: 196px;">
        <search ref="search" placeholder="搜索物品" />
      </view>
    </view>

    <template v-if="history.length > 0">
    <view class="between">
      <view class="bold">最近搜索</view>
      <button class="btn-del center" @tap="clearHistory" style="background-color: transparent;"><image src="@/img/del.png" mode="widthFix" class="w16" /></button>
    </view>

    <view class="search-list mb32">
      <view class="item" v-for="(item, index) in history" :key="index" @tap="doSearch(item.word)">{{item.word}}</view>
    </view>
    </template>

    <view class="between">
      <view class="bold">热门搜索</view>
    </view>

    <view class="search-list mb32">
      <view class="item" v-for="(item, index) in hots" :key="index" @tap="doSearch(item.word)">{{item.word}}</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import { getAction, postAction } from '@/utils/api'

export default {
  name: 'Index',
  components: {
    search
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  data () {
    return {
      page: 'normal',
      history: [],
      hots: [],
      keyword: '',
      address: '选择地址',
      lng: '',
      lat: ''
    }
  },
  methods: {
    clearHistory () {
      getAction('/userapi/search/history/clean').then(res => {
        if (res.code === 0) {
          this.history = []
        }
      })
    },
    doSearch (keyword) {
      if (keyword) {
        console.log('doSearch', keyword)
        this.keyword = keyword
      } else {
        this.keyword = this.$refs.search.value
      }
      const params = {
        word: this.keyword
      }
      let url = '/userapi/search/history/add'
      if (this.page === 'nearby') {
        url = '/userapi/nearby/search'
        // params.
      }
      postAction(url, params).then(res => {
        console.log(res)
      })
      this.toList()
    },
    toList () {
      if (this.page === 'normal') {
        Taro.navigateTo({
          url: `/pages/goods/list/index?keyword=${this.keyword}&from=search`
        })
      } else if (this.page === 'nearby') {
        Taro.navigateTo({
          url: `/pages/nearby/index?keyword=${this.keyword}`
        })
      }
    },
    getData () {
      // 搜索历史
      if (this.isLogin) {
        getAction('/userapi/search/history').then(res => {
          if (res.code === 0) {
            this.history = res.data
          }
        })
      }
      // 热门搜索
      getAction('/userapi/search/hot').then(res => {
        if (res.code === 0) {
          this.hots = res.data
        }
      })
    },
    chooseLocation () {
      Taro.getLocation({
        success: loc => {
          this.$store.commit('SET_LNGLAT', {
            lat: loc.latitude,
            lng: loc.longitude,
          })
          Taro.chooseLocation({
            latitude: loc.latitude,
            longitude: loc.longitude,
            success: res => {
              console.log(res)
              this.lng = loc.longitude
              this.lat = loc.latitude
              this.address = res.name
              Taro.setStorage({
                key: 'searchData',
                data: res
              })
            }
          })
        }
      })
    }
  },
  onShow () {
    this.getData()
    Taro.getStorage({
      key: 'searchData',
      success: res => {
        console.log('searchKey suc', res)
        if (res) {
          this.address = res.data.name
          this.lng = res.data.longitude
          this.lat = res.data.latitude
          this.$store.commit('SET_LNGLAT', {
            lat: res.data.latitude,
            lng: res.data.longitude,
          })
        }
      }
    })
  },
  onLoad (options) {
    this.page = options.page || 'normal'
  }
}
</script>
