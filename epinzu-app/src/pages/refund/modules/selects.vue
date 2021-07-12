<style lang="stylus" type="text/stylus">

</style>

<template>
<Popup :show.sync="visible" :closeable="true" round>
  <view class="center borderB h50">申请原因</view>
  <view class="ml12">
    <view class="between borderB h50 c-red">
      <view>优惠券领取</view>
      <image src="@/img/check2.png" mode="widthFix" class="w16 mr12" />
    </view>
    <view class="acenter borderB h50">收货地址或者手机号填错</view>
    <view class="acenter borderB h50">忘记支付密码/余额不足</view>
    <view class="acenter borderB h50">无法正常支付</view>
    <view class="acenter borderB h50">不想买了</view>
    <view class="acenter borderB h50">其他原因</view>
    <view class="acenter h50" @tap="close">取消</view>
  </view>
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
      visible: false
    }
  },
  methods: {
    close () {
      this.visible = false
    }
  }
}
</script>
