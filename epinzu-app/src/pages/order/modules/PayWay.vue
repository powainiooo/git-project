<style lang="stylus" type="text/stylus">

</style>

<template>
<Popup :show.sync="visible" round :closeable="true">
  <view class="tc center borderB h50">优惠券领取</view>
  <view class="pay-item borderB h50" @tap="payway = 20">
    <view class="acenter ml12">
      <image src="@/img/alipay.png" mode="widthFix" class="icon mr4" />
      <text>支付宝</text>
    </view>
    <image src="@/img/check2.png" mode="widthFix" class="icon mr12" v-if="payway === 20" />
  </view>
  <view class="pay-item borderB h50" @tap="payway = 0">
    <view class="acenter ml12">
      <image src="@/img/yue.png" mode="widthFix" class="icon mr4" />
      <view>余额支付（<text class="f10">￥</text>18）</view>
    </view>
    <image src="@/img/check2.png" mode="widthFix" class="icon mr12" v-if="payway === 0" />
  </view>
  <view class="wp100 pl12 pr12 mt8 mb8">
    <button class="c-btn" @tap="handlePay">立即支付</button>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from "@/c/common/Popup"
import { postAction } from '@/utils/api'
import Taro from '@tarojs/taro'

export default {
	name: 'app',
  components: {
    Popup
  },
	data() {
		return {
      visible: false,
      payway: 20,
      orderNo: ''
    }
	},
	methods: {
    show (orderNo) {
      this.visible = true
      this.orderNo = orderNo
    },
    handlePay () {
      this.$emit('confirm', this.payway)
      this.visible = false
    }
  }
}
</script>
