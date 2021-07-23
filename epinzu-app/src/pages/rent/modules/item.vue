<style scoped>

</style>

<template>
<view class="Rent-item section" @tap="toDetail">
  <view class="store-info mb10 mt10">
    <image :src="imgSrc + record.shop_logo" class=" mr4" />
    <view class="c-tag c-tag-yel mr4" v-if="record.shop_type === 1">个人</view>
    <view class="c-tag c-tag-red mr4" v-if="record.shop_type === 2">企业</view>
    <text>{{record.shop_name}}</text>
  </view>
  <!-- 租用中 -->
  <view class="item borderB" v-for="item in record.goods" :key="item.id">
    <view class="goods-item-hor">
      <image :src="imgSrc + item.goods_cover" mode="aspectFill" class="img" />
      <view class="infos">
        <view class="between">
          <view class="title ellipsis mnb4">{{item.goods_name}}</view>
          <view class="f12 c-red" v-if="item.status_msg">{{item.status_msg}}</view>
        </view>
        <view class="c-999 f12 mb4">{{item.rent_day_min}}天起租</view>
        <view class="f12 mb4">租金：<text class="f10">￥</text>{{item.goods_rent}}/天 X {{item.buy_nums}}件</view>
        <view class="f12 mb4">押金：<text class="f10">￥</text>{{item.goods_deposit}} X {{item.buy_nums}}件</view>
      </view>
    </view>
    <view class="end btns mt16">
      <button class="c-btn c-btn-border2 c-btn-24" v-if="item.buttons.contact === 1" @tap.stop="contact">联系商家</button>
      <button class="c-btn c-btn-border c-btn-24 ml4" v-if="item.buttons.back === 1" @tap.stop="returnBack">归还物品</button>
      <button class="c-btn c-btn-border2 c-btn-24 ml4" v-if="item.buttons.express === 1" @tap.stop="express">查看物流</button>
      <button class="c-btn c-btn-border c-btn-24 ml4" v-if="item.buttons.account_confirm === 1" @tap.stop="confirm(item.id)">确认账单</button>
      <button class="c-btn c-btn-border c-btn-24 ml4" v-if="item.buttons.account_view === 1" @tap.stop="toBill(item.id)">账单详情</button>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  record: Object,
    status: Number
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc
    }
	},
	methods: {
    contact () {
      Taro.showToast({
        title: '跳聊天界面'
      })
    },
    returnBack () {
      Taro.navigateTo({
        url: `/pages/rent/return?id=${this.record.goods[0].id}`
      })
    },
    express () {
      Taro.navigateTo({
        url: `/pages/order/post/index?id=${this.record.id}`
      })
    },
    confirm (id) {
      Taro.navigateTo({
        url: `/pages/rent/order/confirm/index?id=${id}`
      })
    },
    toBill (id) {
      Taro.navigateTo({
        url: `/pages/rent/order/bill/index?id=${id}`
      })
    },
    toDetail () {
      Taro.navigateTo({
        url: `/pages/rent/detail?id=${this.record.goods[0].id}&status=${this.status}`
      })
    }
  }
}
</script>
