<template>
  <view class="container ml12 mr12 mt8">
    <view class="mb8">通知详情</view>
    <view class="f12 c-999">你的【螺丝刀】已经有租客【Ken】下单，请查看处理并尽快发货。如有疑问请咨询客服，感谢你的支持！</view>

    <view class="footer-container">
      <button class="c-btn ml12 mr12">查看订单</button>
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
