<style lang="stylus" type="text/stylus">
.coupon-modal
  height 83vh; padding 16px 12px 0 12px;
  .pl
    height calc(57px + constant(safe-area-inset-bottom));
    height calc(57px + env(safe-area-inset-bottom));
</style>
<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="coupon-modal">
    <view class="tc mt16 mb24">优惠券详情</view>
    <view class="c-coupon-item mb16" v-for="i in 6" :key="i">
      <view class="price">￥<text>30</text></view>
      <view class="content between">
        <view class="ml16">
          <view class="mb4">满300减30元</view>
        </view>
        <image src="@/img/radio-check.png" mode="widthFix" class="w16 mr16" />
      </view>
    </view>
    <view class="c-coupon-item c-coupon-item-disabled mb16">
      <view class="price">￥<text>30</text></view>
      <view class="content between">
        <view class="ml16">
          <view class="mb4">满300减30元</view>
        </view>
      </view>
    </view>
    <view class="pl"></view>
    <view class="footer-container">
      <view class="wp100 ml12 mr12">
        <button class="c-btn c-btn-border" style="width: 100%;">不使用优惠券</button>
      </view>
    </view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
export default {
	name: 'app',
  components: {
    Popup,
  },
	data() {
		return {
      visible: false
    }
	},
	methods: {
	  show () {
	    this.visible = true
    }
  }
}
</script>
