<style lang="stylus" type="text/stylus">

</style>

<template>
<Popup :show.sync="visible" round>
  <view class="tc center borderB h50">优惠券领取</view>
  <view class="tc center borderB h50">收货地址或者手机号填错</view>
  <view class="tc center borderB h50">忘记支付密码/余额不足</view>
  <view class="tc center borderB h50">无法正常支付</view>
  <view class="tc center borderB h50">不想买了</view>
  <view class="tc center borderB h50">其他原因</view>
  <view class="tc center h50" @tap="close">取消</view>
</Popup>
</template>

<script type='es6'>
import Popup from "@/c/common/Popup"
export default {
	name: 'app',
  components: {
    Popup
  },
	data() {
		return {
      visible: true
    }
	},
	methods: {
    close () {
      this.visible = false
    }
  }
}
</script>
