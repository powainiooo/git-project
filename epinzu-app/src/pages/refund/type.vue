<template>
  <view class="Refund">
    <view class="section2 pt8">
      <view class="flex mb8 goods borderB pb8" v-for="item in goods" :key="item.id">
        <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" />
        <view class="content">
          <view class="title">{{item.goods_name}}</view>
          <view class="f12 c-999 mb4">{{item.goods_attr}}</view>
          <view class="between f12" v-if="item.type === 1">
            <view>押金：￥{{item.goods_deposit}} x {{item.after_nums}}</view>
            <view>￥{{item.goods_deposit_count}}</view>
          </view>
          <view class="between f12" v-else>
            <view>售价：￥{{item.goods_price}} x {{item.after_nums}}</view>
            <view>￥{{item.goods_price * item.after_nums}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="section2">
      <view class="h72 between borderB" v-if="buttons.return_refund === 1" @tap="toApply(1)">
        <view class="acenter">
          <image src="@/img/refund.png" mode="widthFix" class="w16 mr12" />
          <view>
            <view class="mb4">我要退货退款</view>
            <view class="f12 c-999">已收到货，需要退还已收到的货物</view>
          </view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view class="h72 between borderB" v-if="buttons.refund === 1" @tap="toApply(2)">
        <view class="acenter">
          <image src="@/img/refund2.png" mode="widthFix" class="w16 mr12" />
          <view>
            <view class="mb4">我要退款（无需退货）</view>
            <view class="f12 c-999">未收到货，或与商家协商之后申请</view>
          </view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view class="h72 between borderB" v-if="buttons.return_chanage === 1" @tap="toApply(3)">
        <view class="acenter">
          <image src="@/img/exchange.png" mode="widthFix" class="w16 mr12" />
          <view>
            <view class="mb4">我要换货</view>
            <view class="f12 c-999">对收到的商品不满意，可与商家协商换货</view>
          </view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import { getAction } from "@/utils/api"

export default {
  name: 'Index',
  data () {
    return {
      imgSrc: Taro.imgSrc,
      id: '',
      goods: [],
      buttons: {}
    }
  },
  methods: {
    getData () {
      getAction('/userapi/after/apply/choose/page/data', {
        order_id: this.id
      }).then(res => {
        if (res.code === 0) {
          this.goods = res.data.goods
          this.buttons = res.data.buttons
        }
      })
    },
    toApply (type) {
      Taro.navigateTo({
        url: `/pages/refund/apply?id=${this.id}&type=${type}`
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>
