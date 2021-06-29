<style lang="stylus" type="text/stylus">
.c-guess-like
  &-title
    color #FF000D; margin-bottom 8px;
</style>

<template>
<view class="c-guess-like">
  <view class="center c-guess-like-title">
    <image src="@/img/like.png" mode="widthFix" class="w20 mr4" />您可能还喜欢
  </view>
  <view class="goods-list">
    <view class="goods-item" v-for="i in 6" :key="i">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="info">
        <view class="h3 mb8"><view class="c-tag">全新</view>苹果 Watch SE手表多功能运动智能手环</view>
        <view class="f10 c-999">押金：￥380</view>
        <view class="between">
          <view class="price">￥<text class="f14">2588</text>/天</view>
          <view class="f10 c-999">已租：456</view>
        </view>
      </view>
    </view>
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
