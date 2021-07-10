<template>
  <view class="Yue">
    <view class="section2">
      <view class="card">
        <view class="c-fff mt24 ml16 mb16">
          <view class="f12 mb4">账户余额(元）</view>
          <view class="f22">0.00</view>
        </view>
        <view class="acenter ml16">
          <view class="c-fff mr80">
            <view class="f12 mb4">累计总收入(元）</view>
            <view class="f22">0.00</view>
          </view>
          <view class="c-fff">
            <view class="f12 mb4">提现中(元）</view>
            <view class="f22">0.00</view>
          </view>
        </view>
        <view class="btn">提现</view>
      </view>

      <view class="mt16 mb16">余额明细</view>
      <view class="h52 between">
        <view>
          <view class="f12">【螺丝刀】租金收入</view>
          <view class="f10 c-999">2020-11-11 10：20</view>
        </view>
        <view class="tr">
          <view class="f12 c-red">+13.5</view>
          <view class="f10 c-999"><text class="f8">￥</text>13.5</view>
        </view>
      </view>
      <view class="h52 between">
        <view>
          <view class="f12">提现</view>
          <view class="f10 c-999">2020-11-11 10：20</view>
        </view>
        <view class="tr">
          <view class="f12">-3.5</view>
          <view class="f10 c-999"><text class="f8">￥</text>13.5</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'

export default {
  name: 'Index',
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
