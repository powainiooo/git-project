<template>
  <view class="Mine container">
    <!-- 用户信息 -->
    <view class="pr">
      <image src="@/img/bg.png" mode="widthFix" class="wp100" />
      <view class="person" :style="{'top': tH + 'px'}">
        <image src="@/img/avatar.png" mode="aspectFill" />
        <view>
          <view class="c-fff">登录/注册</view>
          <view class="c-tag c-tag-yel">已认证</view>
          <view class="c-tag c-tag-brown" v-if="false">未认证</view>
        </view>
      </view>
    </view>
    <!-- 数量信息 -->
    <view class="section Mine-nums-nav">
      <view>
        <view class="f18 mb4">50</view>
        <view>余额</view>
      </view>
      <view>
        <view class="f18 mb4">50</view>
        <view>我的关注</view>
      </view>
      <view>
        <view class="f18 mb4">50</view>
        <view>我的收藏</view>
      </view>
      <view>
        <view class="f18 mb4">50</view>
        <view>优惠券</view>
      </view>
    </view>
    <!-- 我的订单 -->
    <view class="section">
      <view class="mt16 mb16 between">
        <view>我的订单</view>
        <view class="acenter">
          <text class="f12 c-999">全部订单</text>
          <image src="@/img/ar1.png" mode="widthFix" class="w10 ml4" />
        </view>
      </view>
      <view class="Mine-order-nav">
        <view class="mb16">
          <view class="pr mb4">
            <image src="@/img/mine/icon1.png" mode="widthFix" class="w24" />
            <view class="dot-num">2</view>
          </view>
          <view>待付款</view>
        </view>
        <view class="mb16">
          <view class="pr mb4">
            <image src="@/img/mine/icon2.png" mode="widthFix" class="w24" />
          </view>
          <view>待发货</view>
        </view>
        <view class="mb16">
          <view class="pr mb4">
            <image src="@/img/mine/icon3.png" mode="widthFix" class="w24" />
          </view>
          <view>待收货</view>
        </view>
        <view class="mb16">
          <view class="pr mb4">
            <image src="@/img/mine/icon4.png" mode="widthFix" class="w24" />
          </view>
          <view>已签收</view>
        </view>
        <view class="mb16">
          <view class="pr mb4">
            <image src="@/img/mine/icon5.png" mode="widthFix" class="w24" />
          </view>
          <view>租到的物品</view>
        </view>
        <view class="mb16">
          <view class="pr mb4">
            <image src="@/img/mine/icon6.png" mode="widthFix" class="w24" />
          </view>
          <view>退货售后</view>
        </view>
      </view>
    </view>
    <!-- 导航 -->
    <view class="section" style="padding-right: 0">
      <Cell title="收货地址" isLink />
      <Cell title="常见问题" isLink />
      <Cell title="联系客服">
        <text class="c-red mr8" slot="value">400-9606683</text>
      </Cell>
      <Cell title="意见反馈" isLink />
      <Cell title="设置" isLink />
    </view>
    <!-- 底部导航 -->
    <c-footer current="mine" />

  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'
import cFooter from '@/c/common/footer'

export default {
  name: 'Index',
  components: {
    Cell,
    cFooter
  },
  data () {
    return {
      tH: 0
    }
  },
  mounted() {
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tH = res.statusBarHeight + res.titleBarHeight
      }
    })
  },
  methods: {
  },
}
</script>
