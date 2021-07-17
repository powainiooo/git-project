<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Detail-price-item">
  <view class="between borderB" @tap="showList = !showList">
    <view class="title">{{record.attr_name}}</view>
    <view class="acenter" v-if="record.price_type === 1">
      <view class="mr16 ml16">租金：<text class="f10">￥</text>{{record.price}}<text class="f10">/天</text></view>
      <view class="mr16 ml16">押金：<text class="f10">￥</text>{{record.deposit}}</view>
    </view>
    <view class="acenter" v-if="record.price_type === 2">
      <view class="mr16 ml16">押金：<text class="f10">￥</text>{{record.deposit}}</view>
      <image src="@/img/ar2.png" mode="widthFix" class="w10" v-if="showList" />
      <image src="@/img/ar3.png" mode="widthFix" class="w10" v-else />
    </view>
  </view>
  <view class="ul" :class="{'pt10': showList}" :style="{height: height}" v-if="record.price_type === 2">
    <view class="between mb8" v-for="(i, index) in secondList" :key="index">
      <view class="f12 c-999">第{{i.start}}-{{i.end}}天</view>
      <view class="f10">￥<text class="f12">{{i.price}}</text>/天</view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  record: Object
  },
  computed: {
    height () {
      if (this.showList) {
        return `${0.2 + 0.52 * this.secondList.length}rem`
      } else {
        return 0
      }
    },
    secondList () {
      return this.record.step_price || []
    }
  },
	data() {
		return {
		  showList: false,
      list: [{}, {}, {}, {}]
    }
	},
	methods: {
    toggle () {
    }
  }
}
</script>
