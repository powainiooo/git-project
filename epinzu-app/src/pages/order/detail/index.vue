<template>
  <view class="Order-detail container">
    <view class="c-red mt16 mb16 ml12">剩余支付时间14:22</view>
    <!-- 店铺信息 -->
    <view class="section">
      <view class="between borderB mb8">
        <view class="store-info mb10 mt10">
          <image src="@/img/default.png" />
          <text class="c-tag c-tag-red">个人</text>
          <text>鹰视眼官方旗舰店</text>
        </view>
        <view class="w70">
          <button class="c-btn c-btn-border c-btn-24">联系商家</button>
        </view>
      </view>
      <view class="acenter mb4">
        <image src="@/img/dot.png" mode="widthFix" class="w20 mr4" />
        <view class="mr8">哆啦A梦</view>
        <view>15271001997</view>
      </view>
      <view class="f12 c-999 ml20 mb8">广东省深圳市宝安区沙井街道中心路10号</view>
    </view>
    <!-- 产品信息 -->
    <view class="section">
      <view class="acenter mt8 mb8">
        <image src="@/img/icon-rent.png" mode="widthFix" class="w16 mr8" />
        <text>无刷电钻充电式手钻</text>
      </view>
      <view class="flex pb8 borderB">
        <image src="@/img/default.png" mode="aspectFill" class="pic" />
        <view>
          <view class="f12 c-999 mb4">规格：红色，标准</view>
          <view class="f12 c-999 mb4">七天起租</view>
          <view class="f12 mb4">租金：<text class="f10">￥</text>88<text class="f10">/天</text> X 1件</view>
          <view class="f12">押金：<text class="f10">￥</text>88 X 1件</view>
        </view>
      </view>
      <view class="end mt8 mb8">
        <button class="c-btn c-btn-border2 c-btn-24 ml4">商品快照</button>
        <button class="c-btn c-btn-border2 c-btn-24 ml4">申请退单</button>
        <button class="c-btn c-btn-border c-btn-24 ml4">评价</button>
      </view>
    </view>
    <view class="section">
      <view class="acenter mt8 mb8">
        <image src="@/img/icon-buy.png" mode="widthFix" class="w16 mr8" />
        <text>无刷电钻充电式手钻</text>
      </view>
      <view class="flex mb8">
        <image src="@/img/default.png" mode="aspectFill" class="pic" />
        <view>
          <view class="f12 c-999 mb4">规格：红色，标准</view>
          <view class="f12"><text class="f10">￥</text>88 X 1件</view>
        </view>
      </view>
    </view>
    <!-- 订单信息 -->
    <view class="section">
      <view class="mt8 mb8">订单信息</view>
      <view class="h32 between">
        <view class="acenter">
          <view class="f12 c-999 mr16">订单编号:</view>
          <view class="f12">2020101134567890</view>
        </view>
        <view class="c-red f12">复制</view>
      </view>
      <view class="h32 acenter">
        <view class="f12 c-999 mr16">支付方式:</view>
        <view class="f12">微信</view>
      </view>
      <view class="h32 between">
        <view class="acenter">
          <view class="f12 c-999 mr16">快递单号:</view>
          <view class="f12">2020101134567890</view>
        </view>
        <view class="c-red f12">复制</view>
      </view>
      <view class="h32 acenter">
        <view class="f12 c-999 mr16">付款时间:</view>
        <view class="f12">2020-10-11 14:23:35</view>
      </view>
      <view class="h32 acenter">
        <view class="f12 c-999 mr16">创建时间:</view>
        <view class="f12">2020-10-11 14:23:35</view>
      </view>
      <view class="h32 acenter">
        <view class="f12 c-999 mr16">发货时间:</view>
        <view class="f12">2020-10-11 14:23:35</view>
      </view>
      <view class="h32 acenter">
        <view class="f12 c-999 mr16">签收时间:</view>
        <view class="f12">2020-10-11 14:23:35</view>
      </view>
      <view class="h32 acenter">
        <view class="f12 c-999 mr16">下单时间:</view>
        <view class="f12">2020-10-11 14:23:35</view>
      </view>
    </view>
    <!-- 明细 -->
    <view class="section">
      <view class="h32 between f12">
        <view>总押金</view>
        <view><text class="f10">￥</text>88</view>
      </view>
      <view class="h32 between f12">
        <view>总售价</view>
        <view><text class="f10">￥</text>88</view>
      </view>
      <view class="h32 between f12">
        <view>运费</view>
        <view><text class="f10">￥</text>88</view>
      </view>
      <view class="h32 between f12">
        <view>优惠券</view>
        <view><text class="f10">-￥</text>88</view>
      </view>
      <view class="h32 between f12">
        <view>实付款</view>
        <view class="c-red"><text class="f10">￥</text>88</view>
      </view>
    </view>
    <!-- 明细 -->
    <view class="footer-container">
      <view class="wp100 end mr12">
        <button class="c-btn c-btn-border2 c-btn-24 ml4">取消订单</button>
        <button class="c-btn c-btn-border c-btn-24 ml4">立即支付</button>
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
