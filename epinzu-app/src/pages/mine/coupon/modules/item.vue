<style scoped>

</style>

<template>
<view class="section">
  <view class="acenter mt8 mb8">
    <image src="@/img/default.png" mode="widthFix" class="avatar mr8" />
    <view class="f12">鹰视眼官方旗舰店</view>
  </view>
  <view class="c-coupon-item">
    <view class="price"><view>￥<text>30</text></view></view>
    <view class="content between">
      <view class="ml16">
        <view class="mb4">满300减30元</view>
        <view class="f12">有效期至2020.11.12</view>
      </view>
      <button class="c-btn c-btn-border mr8">点击领取</button>
    </view>
  </view>
  <view class="c-coupon-item c-coupon-item-disabled">
    <view class="price"><view>￥<text>30</text></view></view>
    <view class="content between">
      <view class="ml16">
        <view class="mb4">满300减30元</view>
        <view class="f12">有效期至2020.11.12</view>
      </view>
    </view>
    <image src="@/img/used.png" mode="widthFix" class="icon" />
    <image src="@/img/invalid.png" mode="widthFix" class="icon" v-if="false" />
  </view>
  <view class="between mb8">
    <view class="f12 c-999">查看订单</view>
    <image src="@/img/ar1.png" mode="widthFix" class="w10" />
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>
