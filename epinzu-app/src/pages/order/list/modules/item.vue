<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Order-list-item">
  <view class="between mb16">
    <view class="acenter">
      <image src="@/img/default.png" mode="aspectFill" class="avatar20 mr4" />
      <view class="c-tag c-tag-red mr4">企业</view>
      <view class="mr4">鹰视眼官方旗舰店</view>
      <image src="@/img/ar1.png" mode="widthFix" class="w10" />
    </view>
    <view class="c-red f12">待付款</view>
  </view>
  <view class="img-list borderB pb8 mb8">
    <view class="img-item"><image src="@/img/default.png" mode="aspectFill" /></view>
    <view class="img-item"><image src="@/img/default.png" mode="aspectFill" /></view>
    <view class="img-item"><image src="@/img/default.png" mode="aspectFill" /></view>
  </view>
  <view class="between mb16">
    <view class="f10 c-999">共3件</view>
    <view><text class="f10">￥</text>208<text class="c-999">（含押金100）</text></view>
  </view>
  <view class="end">
<!--    <button class="c-btn c-btn-24 c-btn-border2 ml4">联系商家</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border2 ml4">取消订单</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border2 ml4">申请退单</button>-->
<!--    <button class="c-btn c-btn-24 c-btn-border2 ml4">查看物流</button>-->
    <button class="c-btn c-btn-24 c-btn-border ml4">立即支付</button>
    <button class="c-btn c-btn-24 c-btn-border ml4">确认收货</button>
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
