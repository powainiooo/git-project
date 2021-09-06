<style scoped>

</style>

<template>
<view class="Detail-infos Detail-section">
  <view class="acenter mt16 mb8 wrap">
    <view class="c-tag-border mr4"
          v-for="item in couponList"
          :key="item.id">{{item.title}}</view>
  </view>
  <view class="between mb4" style="align-items: baseline;" v-if="record.type === 1">
    <view class="acenter" style="align-items: baseline;">
      <view class="price mr14">￥<text>{{record.price_min}}</text>/天</view>
      <view class="f12">押金：<text class="f10">￥</text>{{record.deposit_min}}</view>
    </view>
    <view class="f12 c-999">已租{{record.sale_nums}}</view>
  </view>
  <view class="between mb4" v-if="record.type === 3">
    <view class="acenter">
      <view class="price mr14">￥<text>{{record.price_min}}</text></view>
    </view>
    <view class="f12 c-999">已售{{record.sale_nums}}</view>
  </view>
  <view class="mb8 bold">{{record.title}}</view>
  <view class="post" v-if="record.type === 1">
    <view>寄出：<text>{{postType === 0 ? '包邮' : '不包邮'}}</text></view>
    <view>寄回：<text>自费</text></view>
    <view>发货地：<text>{{city}}</text></view>
  </view>

  <view class="coupon" @tap="$emit('coupon')" v-if="couponList.length > 0">
    领劵<image src="@/img/ar4.png" mode="widthFix" class="w10" />
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  record: Object
  },
  computed: {
    postType () {
      if (this.record.detail) {
        return this.record.detail.post_type
      } else {
        return 0
      }
    },
    city () {
      if (this.record.shop_detail) {
        return this.record.shop_detail.fh_city
      } else {
        return 0
      }
    },
    couponList () {
      return this.record.couponList || []
    }
  },
	data() {
		return {}
	},
	methods: {}
}
</script>
