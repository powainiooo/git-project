<style lang="stylus" type="text/stylus">
@import '../../../static/css/mixin.styl'
.c-cart-child
  display flex;
  &-img
    size(85px, 85px); position relative; border-radius 4px; overflow hidden; margin-right 8px;
    .img
      size(100%, 100%);
    .tag
      width 16px; abTL(0, 0)
  &-info
    width 210px;
    .title
      ellipsis(); margin-bottom 8px;
  &-selects
    size(146px, 20px); border-radius 10px; background-color #F5F5F5;
    &>view
      width 116px; ellipsis(); font-size 10px; color #999999; margin-right 4px; margin-left 8px;
</style>

<template>
<view class="acenter">
  <view class="btn-check">
    <image src="@/img/radio.png" mode="widthFix" />
  </view>
  <view class="c-cart-child">
    <view class="c-cart-child-img">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <image src="@/img/icon-buy.png" mode="widthFix" class="tag" />
    </view>
    <view class="c-cart-child-info">
      <view class="title">进口家用工具超值组合套装进口家用工具超值组合套装</view>
      <view class="between mb16">
        <view class="c-cart-child-selects acenter">
          <view>36VF 两用基础款 标配两用基础款 标配</view>
          <image src="@/img/ar2.png" mode="widthFix" class="w10" />
        </view>
        <view class="f12 c-red">库存不足</view>
      </view>
      <view class="between">
        <view>
          <view class="c-red f10"><text class="f12">租金：</text>￥<text class="f12">88</text>/天</view>
          <view class="f10"><text class="f12">押金：</text>￥<text class="f12">88</text></view>
        </view>
        <stepper v-model="num" />
      </view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import Stepper from '@/c/common/Stepper'
export default {
	name: 'app',
  components: {
    Stepper
  },
	data() {
		return {
		  num: 1
    }
	},
	methods: {}
}
</script>
