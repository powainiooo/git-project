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
      <view class="i-nearby-item" v-for="i in 5" :key="i">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="info">
          <view class="h3 mb4">SONY单反相机单反相机</view>
          <view class="c-999 mb8">距离1.5公里</view>
          <view class="f10 c-red">￥<text class="f14">2588</text></view>
        </view>
      </view>
    </view>
  </scroll-view>
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
