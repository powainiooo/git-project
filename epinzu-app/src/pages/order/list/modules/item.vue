<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Order-list-item" v-if="showItem" @tap="toDetail">
  <view class="between mb16">
    <view class="acenter" @tap.stop="toStore" v-if="false">
      <image :src="imgSrc + record.shop_logo" mode="aspectFill" class="avatar20 mr4" />
      <view class="c-tag c-tag-yel mr4" v-if="record.shop_type === 1">个人</view>
      <view class="c-tag c-tag-red mr4" v-if="record.shop_type === 2">企业</view>
      <view class="mr4">{{record.shop_name}}</view>
      <image src="@/img/ar1.png" mode="widthFix" class="w10" />
    </view>
    <view class="f12 c-999">订单编号：{{record.order_no}}</view>
    <view class="c-red f12">{{record.status_msg}}</view>
  </view>
  <scroll-view :scrollX="true">
    <view class="img-list borderB pb8 mb8">
      <view class="img-item"
            v-for="item in record.goods"
            :key="item.id">
        <image :src="imgSrc + item.goods_cover" mode="aspectFill" />
      </view>
    </view>
  </scroll-view>
  <view class="between mb8">
    <view class="f10 c-999">共{{record.goods.length}}件</view>
    <view class="bold"><text class="f10">￥</text>{{record.order_amount}}<text class="c-999">（含押金{{record.deposit_amount}}）</text></view>
  </view>
  <view class="end">
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.contact === 1" @tap.stop="contact">联系客服</button>
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.cancel === 1" @tap.stop="cancel">取消订单</button>
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.refund === 1" @tap.stop="refund">申请退单</button>
    <button class="c-btn c-btn-24 c-btn-border2 ml4" v-if="record.buttons.express === 1" @tap.stop="express">查看物流</button>
    <button class="c-btn c-btn-24 c-btn-border ml4" v-if="record.buttons.pay === 1" @tap.stop="pay">立即支付</button>
    <button class="c-btn c-btn-24 c-btn-border ml4" v-if="record.buttons.receive === 1" @tap.stop="receive">确认收货</button>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
import { postAction, toChatRoom } from '@/utils/api'
export default {
	name: 'app',
  props: {
	  record: Object
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc,
      showItem: true
    }
	},
	methods: {
    toDetail () {
      Taro.navigateTo({
        url: `/pages/order/detail/index?id=${this.record.id}`
      })
    },
    toStore () {
      Taro.navigateTo({
        url: `/pages/store/index?id=${this.record.shop_id}`
      })
    },
    contact () {
      toChatRoom(this.record.shop_id)
    },
    cancel () {
      this.$emit('cancel', this.record.id)
    },
    refund () {
      Taro.navigateTo({
        url: `/pages/refund/type?id=${this.record.id}`
      })
    },
    express () {
      Taro.navigateTo({
        url: `/pages/order/post/index?id=${this.record.id}`
      })
    },
    pay () {
      this.$emit('pay', this.record.order_no)
    },
    receive () {
      Taro.showModal({
        title: '提示',
        content: '是否确认收货？',
        success: res => {
          if (res.confirm) {
            Taro.showLoading({
              title: '请求中'
            })
            postAction('/userapi/order/receive', {
              order_id: this.record.id
            }).then(res2 => {
              Taro.hideLoading()
              this.$emit('refresh')
            })
          }
        }
      })
    },
  }
}
</script>
