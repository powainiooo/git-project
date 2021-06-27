<template>
  <view class="goods">
    <view class="opera-top">
      <!-- 搜索 -->
      <view class="ml12 mr16 pt4 pb4 between" v-if="false">
        <search style="width: 308px;" />
        <button class="btn-cart">
          <image src="@/img/cart.png" mode="widthFix" />
          <text>2</text>
        </button>
      </view>
      <!-- 分类列表 -->
      <view class="pr">
        <cates />
        <button class="btn-cate-more"><image src="@/img/ar2.png" mode="widthFix" class="w10" /></button>
      </view>
      <!-- 标签栏 -->
      <Tabs :list="tabs" />
    </view>
    <view class="goods-list mt96">
      <view class="goods-item" v-for="i in 5" :key="i">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="info">
          <view class="h3 mb8"><view class="c-tag">全新</view>苹果 Watch SE手表多功能运动智能手环</view>
          <view class="f10 c-999">押金：￥380</view>
          <view class="between">
            <view class="price">￥<text class="f14">2588</text>/天</view>
            <view class="f10 c-999">已租：456</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import Tabs from '@/c/common/Tabs'
import cates from './modules/cates'

export default {
  name: 'Index',
  components: {
    search,
    Tabs,
    cates
  },
  data () {
    return {
      tabs: [
        { key: 'all', label: '综合' },
        { key: 'sale', label: '销量' },
        { key: 'price', label: '价格', type: 'filter' }
      ]
    }
  },
  methods: {
  },
}
</script>
