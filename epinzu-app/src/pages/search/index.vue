<template>
  <view class="Search ml12 mr12 ">
    <view class="mb20 pt4 pb4 between" v-if="page === 'normal'">
      <view style="width: 314px;">
        <search ref="search" placeholder="品租生活" />
      </view>
      <view @tap="doSearch(null)">搜索</view>
    </view>
    <view class="mb20 pt4 pb4 between" v-if="page === 'nearby'">
      <view class="acenter nearby-info">
        <image src="@/img/dot.png" mode="widthFix" class="w20" />
        <view class="h3">张政深淮南政深淮南</view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view style="width: 196px;">
        <search ref="search" placeholder="搜索物品" />
      </view>
    </view>

    <template v-if="history.length > 0">
    <view class="between">
      <view>最近搜索</view>
      <button class="btn-del center" @tap="clearHistory"><image src="@/img/del.png" mode="widthFix" class="w16" /></button>
    </view>

    <view class="search-list mb32">
      <view class="item" v-for="(item, index) in history" :key="index" @tap="doSearch(item.word)">{{item.word}}</view>
    </view>
    </template>

    <view class="between">
      <view>热门搜索</view>
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
import { getAction } from '@/utils/api'

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
      keyword: ''
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
        console.log('search', val)
      }
      this.toList()
    },
    toList () {
      Taro.navigateTo({
        url: `/pages/goods/list/index?keyword=${this.keyword}&from=search`
      })
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
    }
  },
  onLoad (options) {
    this.page = options.page || 'normal'
    this.getData()
  }
}
</script>
