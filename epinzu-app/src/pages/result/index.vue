<template>
  <view class="Result">
    <!-- 支付成功 -->
    <view class="section2 mb12" v-if="result === 'suc'" style="margin-top: 0;">
      <view class="tc mb8 mt16">
        <image src="@/img/suc.png" mode="widthFix" class="w48" />
      </view>
      <view class="tc mb8 bold">支付成功</view>
      <view class="f12 c-999">重要提示：请在签收快递后，及时对租赁物品的外观和功能进行仔细检查，如发现任何问题应在24小时内联系客服，否则将默认你收到的物品的外观和性能完好。</view>
      <view class="center btns mt16 mb12">
        <button class="c-btn c-btn-32 c-btn-border2" @tap="toOrder">查看订单</button>
        <button class="c-btn c-btn-32 ml24" @tap="backIndex">继续租</button>
      </view>
    </view>
    <!-- 支付成功 -->
    <view class="section2 mb12" v-if="result === 'fail'" style="margin-top: 0;">
      <view class="tc mb8 mt16">
        <image src="@/img/fail.png" mode="widthFix" class="w48" />
      </view>
      <view class="tc mb8 bold">支付失败</view>
      <view class="center btns mt16 mb12">
        <button class="c-btn c-btn-32 c-btn-border2" @tap="toOrder">查看订单</button>
        <button class="c-btn c-btn-32 ml24" @tap="backIndex">继续租</button>
      </view>
    </view>

    <!-- 猜你喜欢 -->
    <guess-like :list="dataSource" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import GuessLike from '@/c/common/GuessLike'
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    GuessLike
  },
  data () {
    return {
      result: 'fail',
      url: {
        list: '/userapi/goods/shopping/recommend'
      }
    }
  },
  methods: {
    backIndex () {
      Taro.reLaunch({
        url: '/pages/index/index'
      })
    },
    toOrder () {
      Taro.reLaunch({
        url: '/pages/order/list/index'
      })
    }
  },
  onLoad (options) {
    this.result = options.result
  }
}
</script>
