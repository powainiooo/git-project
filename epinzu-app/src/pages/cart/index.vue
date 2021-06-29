<template>
  <view class="Cart mt8">
    <!-- 空提示 -->
    <view class="empty mt24 mb32" v-if="false">
      <image src="@/img/cart2.png" mode="widthFix" class="img" />
      <view class="txt">购物车空空如也~</view>
      <view class="center">
        <button class="c-btn">去逛逛</button>
      </view>
    </view>
    <!-- 购物车 -->
    <view class="list ml12 mr12 ">
      <view class="list-item">
        <cart-item />
      </view>
      <view class="list-item">
        <cart-item />
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <guess-like />

    <!-- 底部统计 -->
    <view class="Cart-footer between">
      <view class="ml12">
        <view class="c-FF0 f12">售价：<text class="f10">￥</text>35</view>
        <view class="c-FF0 f12">租金：<text class="f10">￥</text>35<text class="f10">/天</text></view>
        <view class="f12">押金：<text class="f10">￥</text>35</view>
      </view>
      <button class="c-btn mr12">去结算（2件）</button>
    </view>

    <!-- 底部导航 -->
    <c-footer current="cart" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import cFooter from '@/c/common/footer'
import cartItem from './modules/cartItem'
import GuessLike from '@/c/common/GuessLike'

export default {
  name: 'Cart',
  components: {
    cFooter,
    cartItem,
    GuessLike
  },
  data () {
    return {
    }
  },
  methods: {
  },
}
</script>
