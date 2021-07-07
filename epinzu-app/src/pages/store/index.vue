<template>
  <view class="Store">
    <!-- 店铺信息 -->
    <view class="line1 between">
      <view class="flex mt8 ml12">
        <image src="@/img/default.png" mode="aspectFit" class="store-logo" />
        <view class="mt4">
          <view class="acenter"><text class="c-tag c-tag-yel mr4">个人</text>鹰视眼官方旗舰店</view>
          <view class="acenter">
            <rate :value="4" />
            <view class="f10 c-999 ml4">订单数: 9999+</view>
            <view class="f10 c-999 ml4">关注数: 2000</view>
          </view>
        </view>
      </view>
      <view class="mr12 mb8 mt8">
        <button class="c-btn c-btn-border c-btn-24 mb4">关注店铺</button>
        <button class="c-btn c-btn-border c-btn-24">联系商家</button>
      </view>
    </view>
    <!-- 切换分类 -->
    <Tabs :list="tabs" :border="true" @change="tabChange" />
    <!-- 产品列表 -->
    <view class="goods-list mt8">
      <view class="goods-item" v-for="i in 6" :key="i">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="info">
          <view class="h3 mb8"><view class="c-tag">全新</view>苹果 Watch SE手表多功能运动智能手环</view>
          <view class="f10 c-999">押金：￥380</view>
          <view class="between">
            <view class="price">￥<text class="f14">2588</text>/天</view>
            <view class="tag1">30天起租</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Rate from '@/c/common/Rate'
import Tabs from '@/c/common/Tabs'

export default {
  name: 'Index',
  components: {
    Rate,
    Tabs
  },
  data () {
    return {
      tabs: [
        { key: 'goods', label: '最新好货' },
        { key: 'params', label: '最受欢迎' },
        { key: 'details', label: '全部好货' }
      ],
    }
  },
  methods: {
    tabChange (e) {}
  },
}
</script>
