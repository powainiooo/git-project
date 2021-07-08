<template>
  <view class="Rent container">
    <!-- 状态信息 -->
    <view class="mt16 mb16 ml12 c-red">等待商家确认账单</view>
    <!-- 店铺信息 -->
    <view class="section">
      <view class="between borderB">
        <view class="store-info mb10 mt10">
          <image src="@/img/default.png" />
          <text class="c-tag c-tag-red">个人</text>
          <text>鹰视眼官方旗舰店</text>
        </view>
        <view class="w70">
          <button class="c-btn c-btn-border c-btn-24">联系商家</button>
        </view>
      </view>
      <view class="mt8 acenter">
        <view class="w60 f12 c-999">归还方式：</view>
        <view class="f12">快递</view>
      </view>
      <view class="mt8 acenter">
        <view class="w60 f12 c-999">联系人：</view>
        <view class="f12">五金阿哥 13800138000</view>
      </view>
      <view class="mt8 between mb8">
        <view class="acenter">
          <view class="w60 f12 c-999">商家地址：</view>
          <view class="f12">广东省深圳市宝安区沙井街道中心路10号</view>
        </view>
        <image src="@/img/dot.png" mode="widthFix" class="w14" />
      </view>
    </view>
    <!-- 产品信息 -->
    <view class="section">
      <view class="goods-item-hor mt8 mb8">
        <image src="@/img/default.png" mode="aspectFill" class="img" />
        <view class="infos">
          <view class="title ellipsis mnb4">无刷电钻充电式手钻无刷电钻充电式手钻</view>
          <view class="c-999 f12 mb4">七天起租</view>
          <view class="f12 mb4">租金：<text class="f10">￥</text>88/天 X 1件</view>
          <view class="f12 mb4">押金：<text class="f10">￥</text>88 X 1件</view>
        </view>
      </view>
    </view>
    <!-- 租赁信息 -->
    <view class="section">
      <view class="mt8 mb8">租赁信息</view>
      <view class="h32 between f12">
        <view class="acenter">
          <view class="w68 c-999">订单编号:</view>
          <view>2020101134567890</view>
        </view>
        <view class="c-red">复制</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">归还时间:</view>
        <view>2020-10-11 14:23:35</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">押金:</view>
        <view><text class="f10">￥</text>300</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">每日租金:</view>
        <view><text class="f10">￥</text>300</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">起租日期:</view>
        <view>2020-10-11</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">租赁天数:</view>
        <view>6天</view>
      </view>
      <view class="h32 acenter f12">
        <view class="w68 c-999">可退押金:</view>
        <view class="c-red"><text class="f10">￥</text>300</view>
      </view>
    </view>
    <!-- 提示 -->
    <view class="f10 c-999 ml20 mt8">提示：当可退押金为0时，该物品的所有权就属于你了，因此无须归还</view>
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 end pr20">
        <button class="c-btn c-btn-border2 c-btn-24 w74">查看物流</button>
        <button class="c-btn c-btn-border c-btn-24 w74 ml4">归还物品</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import {
  RENT_RENT,
  RENT_BACKING,
  RENT_BACKED,
  RENT_BREAK
} from '@/config'

export default {
  name: 'Index',
  data () {
    return {
      RENT_RENT,
      RENT_BACKING,
      RENT_BACKED,
      RENT_BREAK
    }
  },
  methods: {
  },
}
</script>
