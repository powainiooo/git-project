<style scoped>

</style>

<template>
<view class="section">
  <view class="acenter mt8 mb8">
    <image :src="imgSrc + record.shop_logo" mode="widthFix" class="avatar mr8" />
    <view class="bold">{{record.shop_name}}</view>
  </view>
  <view class="c-coupon-item" :class="{'c-coupon-item-disabled': status !== 1}">
    <view class="price"><view>￥<text>{{record.money}}</text></view></view>
    <view class="content between">
      <view class="ml16">
        <view class="mb4 bold">{{record.title}}</view>
        <view class="f12">领券后{{record.remain_time}}内有效</view>
      </view>
      <button class="c-btn c-btn-border mr8" v-if="status === 1" @tap="toGoods">去使用</button>
    </view>
    <image src="@/img/used.png" mode="widthFix" class="icon" v-if="status === 2" />
    <image src="@/img/invalid.png" mode="widthFix" class="icon" v-if="status === 3" />
  </view>
  <view class="between mb8" v-if="status === 2" @tap="toOrder">
    <view class="f12 c-999">查看订单</view>
    <image src="@/img/ar1.png" mode="widthFix" class="w10" />
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  record: Object,
    status: Number
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc
    }
	},
	methods: {
    toGoods () {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${this.record.goods_id}`
      })
    },
    toOrder () {
      Taro.navigateTo({
        url: `/pages/order/detail/index?id=${this.record.order_id}`
      })
    }
  }
}
</script>
