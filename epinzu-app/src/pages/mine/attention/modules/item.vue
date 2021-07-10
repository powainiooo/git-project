<style scoped>

</style>

<template>
<view class="Attention-item">
  <view class="flex ml12 mr12">
    <image src="@/img/default.png" mode="aspectFit" class="store-logo" />
    <view class="mt4" style="flex: 1 0 0;">
      <view class="between">
        <view class="acenter"><text class="c-tag c-tag-yel mr4">个人</text>鹰视眼官方旗舰店</view>
        <view class="acenter">
          <text class="f10 c-999">进店</text>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
        </view>
      </view>
      <view class="acenter">
        <rate :value="4" />
        <view class="f10 c-999 ml4">订单数: 9999+</view>
        <view class="f10 c-999 ml4">关注数: 2000</view>
      </view>
    </view>
  </view>
  <scroll-view :scroll-x="true" class="scrolls">
    <view class="list">
      <view class="item" v-for="i in 6" :key="i">
        <image src="@/img/default.png" mode="widthFix" />
        <view>￥<text class="f10">{{i}}</text>/天</view>
      </view>
    </view>
  </scroll-view>
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
