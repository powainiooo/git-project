<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="Detail-buys">
    <view class="tc mt16 mb24">优惠券领取</view>
    <view class="c-coupon-item mb16" v-for="i in 8" :key="i">
      <view class="price">￥<text>30</text></view>
      <view class="content between">
        <view class="ml16">
          <view class="mb4">满300减30元</view>
          <view class="f12">领劵后6小时内有效</view>
        </view>
        <button class="c-btn mr8">点击领取</button>
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
