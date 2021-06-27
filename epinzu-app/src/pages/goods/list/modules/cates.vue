<style>
.goods-cates { width: 100%; }
.goods-cates-list { display: flex; margin: 0 6px; align-items: baseline }
.goods-cates-item { height: 40px; line-height: 40px; padding: 0 15px 16px 0; flex: 1 0 auto; font-size: 14px; }
.goods-cates-list .active { color: #FE322B; }
</style>

<template>
<scroll-view scrollX="true" class="goods-cates">
  <view class="goods-cates-list">
    <view class="goods-cates-item active">推荐</view>
    <view class="goods-cates-item">五金工具</view>
    <view class="goods-cates-item">户外用品</view>
    <view class="goods-cates-item">儿童玩具</view>
    <view class="goods-cates-item">数码产品</view>
    <view class="goods-cates-item">摄影个</view>
    <view class="goods-cates-item">儿童玩具</view>
    <view class="goods-cates-item">数码产品</view>
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
