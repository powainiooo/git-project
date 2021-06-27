<template>
  <view class="index ml12 mr12 ">
    <view class="mb20 between">
      <view style="width: 314px;">
        <search ref="search" placeholder="品租生活" />
      </view>
      <view @tap="doSearch(null)">搜索</view>
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
      history: ['电焊', '主机与配件', '电焊机', '手机'],
      hots: ['电焊', '主机与配件', '电焊机', '手机']
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
}
</script>
