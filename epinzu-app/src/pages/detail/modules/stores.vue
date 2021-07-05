<style scoped>

</style>

<template>
<view class="Detail-section Detail-stores">
  <view class="between">
    <view class="flex mt8">
      <image src="@/img/default.png" mode="aspectFit" class="logo" />
      <view class="mt4">
        <view class="acenter"><text class="c-tag c-tag-yel mr4">个人</text>鹰视眼官方旗舰店</view>
        <rate :value="4" />
      </view>
    </view>
    <view class="f12 mt8">
      <view class="mb2">订单数: <text class="c-999">9999+</text></view>
      <view class="mb2">关注数: <text class="c-999">9999+</text></view>
      <view class="mb2">访客数: <text class="c-999">9999+</text></view>
    </view>
  </view>
  <view class="center mb8">
    <button class="c-btn c-btn-border c-btn-24 mr8">进店逛逛</button>
    <button class="c-btn c-btn-border c-btn-24">关注店铺</button>
  </view>
</view>
</template>

<script type='es6'>
import Rate from '@/c/common/Rate'
export default {
	name: 'app',
  components: {
    Rate
  },
	data() {
		return {}
	},
	methods: {}
}
</script>
