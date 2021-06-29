<style lang="stylus" type="text/stylus">
.c-footer
  padding 7px 0; display flex; justify-content space-around; align-items center; width 100%; position fixed; left 0; bottom 0; background-color #FFFFFF; z-index 1000; box-shadow: 2px 0px 4px 0px #E5E5E5;
  padding-bottom calc(7px + constant(safe-area-inset-bottom));
  padding-bottom calc(7px + env(safe-area-inset-bottom));
  &-item
    width 36px; text-align center;
    image
      width 24px; height 24px;
    .active
      display none
    view
      font-size 10px; color #333333;
  &-active
    .normal
      display none
    .active
      display inline-block
    view
      color #FE322B
</style>

<template>
<view class="c-footer">
  <view class="c-footer-item" @click="toggle" :class="{'c-footer-active': currernt === 'home'}">
    <image src="@/img/footer/icon1.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon1-active.png" mode="widthFix" class="active" />
    <view>首页</view>
  </view>
  <view class="c-footer-item" @click="toggle" :class="{'c-footer-active': currernt === 'message'}">
    <image src="@/img/footer/icon2.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon2-active.png" mode="widthFix" class="active" />
    <view>消息</view>
  </view>
  <view class="c-footer-item" @click="toggle" :class="{'c-footer-active': currernt === 'cart'}">
    <image src="@/img/footer/icon3.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon3-active.png" mode="widthFix" class="active" />
    <view>购物车</view>
  </view>
  <view class="c-footer-item" @click="toggle" :class="{'c-footer-active': currernt === 'mine'}">
    <image src="@/img/footer/icon4.png" mode="widthFix" class="normal" />
    <image src="@/img/footer/icon4-active.png" mode="widthFix" class="active" />
    <view>我的</view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  currernt: {
	    type: String,
      default: 'home'
    }
  },
	data() {
		return {}
	},
	methods: {
    toggle (url) {
      Taro.reLaunch({
        url
      })
    }
  }
}
</script>
