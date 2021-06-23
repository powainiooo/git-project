<style>
.index-navs { width: 100%; }
.index-navs-list { display: flex; margin: 0 6px; align-items: baseline }
.index-navs-item { padding: 0 15px 16px 0; flex: 1 0 auto; font-size: 14px; color: #FFFFFF; }
.index-navs-list .active { font-size: 18px; }
</style>

<template>
<scroll-view scrollX="true" class="index-navs">
  <view class="index-navs-list">
    <view class="index-navs-item active">推荐</view>
    <view class="index-navs-item">五金工具</view>
    <view class="index-navs-item">户外用品</view>
    <view class="index-navs-item">儿童玩具</view>
    <view class="index-navs-item">数码产品</view>
    <view class="index-navs-item">摄影个</view>
    <view class="index-navs-item">儿童玩具</view>
    <view class="index-navs-item">数码产品</view>
  </view>
</scroll-view>
</template>

<script type='es6'>
export default {
	name: 'navs',
	data() {
		return {}
	},
	methods: {}
}
</script>
