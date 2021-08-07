<style lang="stylus" type="text/stylus">
.c-guess-like
  &-title
    color #FF000D; margin-bottom 8px;
</style>

<template>
<view class="c-guess-like">
  <view class="center c-guess-like-title">
    <slot name="title"><image src="@/img/like.png" mode="widthFix" class="w20 mr4" />您可能还喜欢</slot>
  </view>
  <view class="goods-list">
    <view class="goods-item" v-for="item in list" :key="item.id" @tap="toDetail(item.id)">
      <image :src="imgSrc + item.cover" mode="aspectFill" class="img" />
      <view class="info">
        <view class="h3 mb8">
          <view class="c-tag" v-if="item.how_new === 100">全新</view>
          <view class="c-tag" v-else>{{item.how_new / 10}}成新</view>
          {{item.title}}</view>
        <view class="f10 c-999" :style="{'opacity': item.type === 1 ? '1' : '0'}">押金：￥{{item.deposit_min}}</view>
        <view class="between">
          <view class="price" v-if="item.type === 1">￥<text class="f14">{{item.price_min}}</text>/天</view>
          <view class="price" v-if="item.type === 3">￥<text class="f14">{{item.price_min}}</text></view>
          <view class="f10 c-999" v-if="item.type === 1">已租：{{item.sale_nums}}</view>
          <view class="f10 c-999" v-if="item.type === 3">已售：{{item.sale_nums}}</view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  list: Array
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc
    }
	},
	methods: {
    toDetail (id) {
      Taro.navigateTo({
        url: `/pages/detail/index?id=${id}`
      })
    }
  }
}
</script>
