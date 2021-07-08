<template>
  <view class="Result">
    <!-- 支付成功 -->
    <view class="mt16 ml12 mr12 mb24" v-if="result === 'suc'">
      <view class="tc mb8">
        <image src="@/img/suc.png" mode="widthFix" class="w48" />
      </view>
      <view class="tc">支付成功</view>
      <view class="f12 c-999">重要提示：请在签收快递后，及时对租赁物品的外观和功能进行仔细检查，如发现任何问题应在24小时内联系客服，否则将默认你收到的物品的外观和性能完好。</view>
      <view class="center btns mt16">
        <button class="c-btn c-btn-32 c-btn-border2">查看订单</button>
        <button class="c-btn c-btn-32 ml24">继续租</button>
      </view>
    </view>
    <!-- 支付成功 -->
    <view class="mt16 ml12 mr12 mb24" v-if="result === 'fail'">
      <view class="tc mb8">
        <image src="@/img/fail.png" mode="widthFix" class="w48" />
      </view>
      <view class="tc">支付失败</view>
      <view class="center btns mt16">
        <button class="c-btn c-btn-32 c-btn-border2">查看订单</button>
        <button class="c-btn c-btn-32 ml24">继续租</button>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <guess-like />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import GuessLike from '@/c/common/GuessLike'

export default {
  name: 'Index',
  components: {
    GuessLike
  },
  data () {
    return {
      result: 'fail'
    }
  },
  methods: {
  },
}
</script>
