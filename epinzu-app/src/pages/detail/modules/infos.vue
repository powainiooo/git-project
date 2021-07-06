<style scoped>

</style>

<template>
<view class="Detail-infos Detail-section">
  <view class="acenter mt16 mb8">
    <view class="c-tag-border mr4">满88元减8元</view>
    <view class="c-tag-border">满88元减8元</view>
  </view>
  <view class="between mb4">
    <view class="acenter">
      <view class="price mr14">￥<text>88</text>/天</view>
      <view class="f12">押金：<text class="f10">￥</text>200</view>
    </view>
    <view class="f12 c-999">已租6778</view>
  </view>
  <view class="mb8">无刷电钻充电式手钻小手枪钻锂电钻多功能家用电动螺丝刀手电钻</view>
  <view class="post">
    <view>寄出：<text>包邮</text></view>
    <view>寄回：<text>自费</text></view>
    <view>发货地：<text>广东广州</text></view>
  </view>

  <view class="coupon" @tap="$emit('coupon')">领劵<image src="@/img/ar4.png" mode="widthFix" class="w10" /></view>
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
