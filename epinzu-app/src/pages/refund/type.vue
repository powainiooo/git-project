<template>
  <view class="Refund">
    <view class="section2 pt8">
      <view class="flex mb8 goods borderB pb8">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="content">
          <view class="title">鹰视安充电式单手电链锯手持小型家用无线锂电户外伐木果园修电锯</view>
          <view class="f12 c-999 mb4">基础款68000H2电1充</view>
          <view class="between f12">
            <view>押金：￥208 x 2</view>
            <view>￥416</view>
          </view>
        </view>
      </view>
      <view class="flex mb8 goods">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="content">
          <view class="title">鹰视安充电式单手电链锯手持小型家用无线锂电户外伐木果园修电锯</view>
          <view class="f12 c-999 mb4">基础款68000H2电1充</view>
          <view class="between f12">
            <view>押金：￥208 x 2</view>
            <view>￥416</view>
          </view>
        </view>
      </view>
    </view>
    <view class="section2">
      <view class="h72 between borderB">
        <view class="acenter">
          <image src="@/img/refund.png" mode="widthFix" class="w16 mr12" />
          <view>
            <view class="mb4">我要退货退款</view>
            <view class="f12 c-999">已收到货，需要退还已收到的货物</view>
          </view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view class="h72 between borderB">
        <view class="acenter">
          <image src="@/img/refund2.png" mode="widthFix" class="w16 mr12" />
          <view>
            <view class="mb4">我要退款（无需退货）</view>
            <view class="f12 c-999">未收到货，或与商家协商之后申请</view>
          </view>
        </view>
        <image src="@/img/ar1.png" mode="widthFix" class="w10" />
      </view>
      <view class="h72 between borderB">
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
import Tabs from '@/c/common/Tabs'
import item from './modules/item'

export default {
  name: 'Index',
  data () {
    return {
      nums: 0
    }
  },
  methods: {
  },
}
</script>
