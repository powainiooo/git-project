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
      <view class="item" v-for="(item, index) in history" :key="index" @tap="doSearch(item)">{{item}}</view>
    </view>
    </template>

    <view class="between">
      <view>热门搜索</view>
    </view>

    <view class="search-list mb32">
      <view class="item" v-for="(item, index) in hots" :key="index" @tap="doSearch(item)">{{item}}</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'

export default {
  name: 'Index',
  components: {
    search
  },
  data () {
    return {
      page: 'normal',
      history: ['电焊', '主机与配件', '电焊机', '手机'],
      hots: ['电焊', '主机与配件', '电焊机', '手机'],
    }
  },
  methods: {
    clearHistory () {
      this.history = []
    },
    doSearch (keyword) {
      if (keyword) {
        console.log('doSearch', keyword)
      } else {
        const val = this.$refs.search.value
        console.log('search', val)
      }
    }
  },
  onLoad (options) {
    this.page = options.page || 'normal'
  }
}
</script>
