<style scoped>

</style>

<template>
<view class="Rent-item section">
  <view class="store-info mb10 mt10">
    <image src="@/img/default.png" />
    <text class="c-tag c-tag-red">个人</text>
    <text>鹰视眼官方旗舰店</text>
  </view>
  <!-- 租用中 -->
  <view class="item borderB">
    <view class="goods-item-hor">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title ellipsis mnb4">无刷电钻充电式手钻无刷电钻充电式手钻</view>
        <view class="c-999 f12 mb4">七天起租</view>
        <view class="f12 mb4">租金：<text class="f10">￥</text>88/天 X 1件</view>
        <view class="f12 mb4">押金：<text class="f10">￥</text>88 X 1件</view>
      </view>
    </view>
    <view class="end btns mt16">
      <button class="c-btn c-btn-border2 c-btn-24">联系商家</button>
      <button class="c-btn c-btn-border c-btn-24 ml4">归还物品</button>
    </view>
  </view>
  <!-- 归还中 -->
  <view class="item borderB">
    <view class="goods-item-hor">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title ellipsis mnb4">无刷电钻充电式手钻无刷电钻充电式手钻</view>
        <view class="c-999 f12 mb4">七天起租</view>
        <view class="f12 mb4">租金：<text class="f10">￥</text>88/天 X 1件</view>
        <view class="f12 mb4">押金：<text class="f10">￥</text>88 X 1件</view>
      </view>
    </view>
    <view class="end btns mt16">
      <button class="c-btn c-btn-border2 c-btn-24">联系商家</button>
      <button class="c-btn c-btn-border2 c-btn-24 ml4">查看物流</button>
    </view>
  </view>
  <!-- 已归还 -->
  <view class="item borderB">
    <view class="goods-item-hor">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="mb4 between">
          <view class="title ellipsis">无刷电钻充电式手钻无刷电钻充电式手钻</view>
          <view class="f12 c-red ml4">待商家结算</view>
        </view>
        <view class="c-999 f12 mb4">七天起租</view>
        <view class="f12 mb4">租金：<text class="f10">￥</text>88/天 X 1件</view>
        <view class="f12 mb4">押金：<text class="f10">￥</text>88 X 1件</view>
      </view>
    </view>
    <view class="end btns mt16">
      <button class="c-btn c-btn-border2 c-btn-24">联系商家</button>
      <button class="c-btn c-btn-border2 c-btn-24 ml4">查看物流</button>
      <button class="c-btn c-btn-border c-btn-24 ml4">确认账单</button>
      <button class="c-btn c-btn-border c-btn-24 ml4">账单详情</button>
    </view>
  </view>
  <!-- 已租断 -->
  <view class="item borderB">
    <view class="goods-item-hor">
      <image src="@/img/default.png" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="title ellipsis mb4">无刷电钻充电式手钻无刷电钻充电式手钻</view>
        <view class="c-999 f12 mb4">七天起租</view>
        <view class="f12 mb4">租金：<text class="f10">￥</text>88/天 X 1件</view>
        <view class="f12 mb4">押金：<text class="f10">￥</text>88 X 1件</view>
      </view>
    </view>
    <view class="end btns mt16">
      <button class="c-btn c-btn-border2 c-btn-24">联系商家</button>
    </view>
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>
