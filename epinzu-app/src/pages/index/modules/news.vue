<style scoped>

</style>

<template>
<view class="i-news">
  <view class="i-title">
    <view class="h3 acenter">新品动态 <image src="@/img/now.png" mode="widthFix" class="w34 ml2" /></view>
    <view class="r">更多 <image src="@/img/ar1.png" mode="widthFix" /></view>
  </view>
  <scroll-view scrollX="true" class="scroll">
    <view class="i-news-list">
      <view class="i-news-item" v-for="i in 5" :key="i">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="info mt4">
          <view class="h3">SONY单反相机单反相机</view>
          <view class="f10 c-red">￥<text class="f14">2588</text>/天</view>
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
