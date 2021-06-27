<template>
<view class="container index-container">
  <!-- 顶部栏 -->
  <view class="i-header" style="background-color: #2F81E7">
    <!-- 搜索框 -->
    <view class="ml12 mr12 mb16" :style="{'margin-top': tH + 'px'}">
      <search :disabled="false" placeholder="搜好物，上品租" backgroundColor="#FFFFFF" />
    </view>
    <!-- 产品分类 -->
    <cates />
  </view>

  <!-- 占位高度 -->
  <view class="height" :style="{'padding-top': tH + 'px'}"></view>

  <!-- 二级分类 -->
  <view class="second-cates">
    <view class="item" v-for="i in 9" :key="i">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view>拍立得</view>
    </view>
    <view class="item">
      <image src="@/img/more.png" mode="aspectFill" class="img" />
      <view>更多分类</view>
    </view>
  </view>

  <!-- 新品动态 -->
  <news />
  <!-- 推荐商品 -->
  <view class="i-title">
    <view class="h3">推荐商品</view>
  </view>
  <view class="goods-list">
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

  <!-- 底部导航 -->
  <c-footer current="home" />
</view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import search from '@/c/common/search'
import cFooter from '@/c/common/footer'
import cates from './modules/cates'
import news from './modules/news'

export default {
  name: 'Index',
  components: {
    cFooter,
    search,
    cates,
    news
  },
  data () {
    return {
      tH: 0
    }
  },
  mounted() {
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tH = res.statusBarHeight + res.titleBarHeight
      }
    })
  },
  methods: {
  }
}
</script>
