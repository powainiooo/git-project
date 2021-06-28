<style lang="stylus" type="text/stylus">
@import '../../../static/css/mixin.styl'
.c-cart-item
  border-radius 4px; padding 8px; background-color #FFFFFF;
  .btn-check
    size(24px, 24px); padding-top 4px;
    image
      width 16px;
  .thead
    margin-bottom 16px;
    .avatar
      size(40px, 40px); border-radius 50%; margin-right 8px;
  .child-item
    margin-bottom 24px;
    &:last-child
      margin-bottom 0
</style>

<template>
<view class="c-cart-item">
  <view class="thead acenter">
    <view class="btn-check">
      <image src="@/img/radio.png" mode="widthFix" />
    </view>
    <image src="@/img/default.png" mode="aspectFill" class="avatar" />
    <view class="c-tag c-tag-red mr4">企业</view>
    <view>鹰视眼官方旗舰店</view>
  </view>
  <view class="child-item">
    <cart-child />
  </view>
  <view class="child-item">
    <cart-child />
  </view>
</view>
</template>

<script type='es6'>
import cartChild from './cartChild'
export default {
	name: 'app',
  components: {
    cartChild
  },
	data() {
		return {}
	},
	methods: {}
}
</script>
