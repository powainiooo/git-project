<style scoped>

</style>

<template>
<view class="i-nearby">
  <view class="i-title">
    <view class="h3">附近商品</view>
    <view class="r">更多 <image src="@/img/ar1.png" mode="widthFix" /></view>
  </view>
  <scroll-view scrollX="true" class="scroll">
    <view class="i-nearby-list">
      <view class="i-nearby-item" v-for="item in list" :key="item.id" @tap="toDetail(item.goods_id)">
        <image :src="imgSrc + item.cover" mode="aspectFill" class="img" />
        <view class="info">
          <view class="h3 mb4">{{item.title}}</view>
          <view class="c-999 mb8">距离{{item.distance}}公里</view>
          <view class="f10 c-red" v-if="item.type === 1">￥<text class="f14">{{item.price_min}}</text>/天</view>
          <view class="f10 c-red" v-if="item.type === 3">￥<text class="f14">{{item.price_min}}</text></view>
        </view>
      </view>
    </view>
  </scroll-view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
    list: Array
  },
	data() {
		return {
      imgSrc: Taro.imgSrc
		}
	},
	methods: {
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    }
  }
}
</script>
