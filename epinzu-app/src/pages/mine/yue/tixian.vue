<template>
  <view class="Yue">
    <view class="section2 mt2">
      <view class="between mt8">
        <view class="f10 c-999">今日可提现<text class="c-red">2</text>次</view>
        <view class="c-666 f12">提现记录</view>
      </view>
      <view class="tixian-input borderB">
        <text>￥</text>
        <input type="number" />
      </view>
      <view class="between">
        <view class="f12">可提现金额<text class="c-red">￥13.5</text></view>
        <view class="c-red f12">全部提取</view>
      </view>
    </view>
    <view class="section2 acenter h52">
      <view class="c-666 mr16">真实姓名</view>
      <view class="mr16">郑丹凤</view>
    </view>
    <view class="ml12 mr12">
      <view class="f12 c-999 mb40">提示：提现费率：0.8%，单次最小提现额：10元，单次最大提现额：1万</view>
      <button class="c-btn">确认提现</button>
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
