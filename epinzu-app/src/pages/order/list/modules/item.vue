<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Order-list-item">
  <view class="between mb16">
    <view class="acenter">
      <image :src="imgSrc + record.shop_logo" mode="aspectFill" class="avatar20 mr4" />
      <view class="c-tag c-tag-yel mr4" v-if="record.shop_logo === 1">个人</view>
      <view class="c-tag c-tag-red mr4" v-if="record.shop_logo === 1">企业</view>
      <view class="mr4">{{record.shop_name}}</view>
      <image src="@/img/ar1.png" mode="widthFix" class="w10" />
    </view>
    <view class="c-red f12">{{record.status_msg}}</view>
  </view>
  <view class="img-list borderB pb8 mb8">
    <view class="img-item"
          v-for="item in record.goods"
          :key="item.id">
      <image :src="imgSrc + item.goods_cover" mode="aspectFill" />
    </view>
  </view>
  <view class="between mb16">
    <view class="f10 c-999">共{{record.goods.length}}件</view>
    <view><text class="f10">￥</text>{{record.order_amount}}<text class="c-999">（含押金{{record.deposit_amount}}）</text></view>
  </view>
  <view class="end">
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.contact === 1" @tap="contact">联系商家</button>
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.cancel === 1" @tap="cancel">取消订单</button>
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.refund === 1" @tap="refund">申请退单</button>
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.express === 1" @tap="express">查看物流</button>
    <button class="c-btn c-btn-24 c-btn-border ml4" v-if="record.buttons.pay === 1" @tap="pay">立即支付</button>
    <button class="c-btn c-btn-24 c-btn-border ml4" v-if="record.buttons.receive === 1" @tap="receive">确认收货</button>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  record: Object
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc
    }
	},
	methods: {
    contact () {},
    cancel () {},
    refund () {},
    express () {},
    pay () {},
    receive () {},
  }
}
</script>
