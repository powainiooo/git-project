<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Detail-price-item">
  <view class="between borderB" @tap="showList = !showList">
    <view class="title">48V专业款49800H(一电一充)48V专业款49800H(一电一充)</view>
    <view class="acenter">
      <view class="mr16 ml16">押金：<text class="f10">￥</text>389</view>
      <image src="@/img/ar2.png" mode="widthFix" class="w10" v-if="showList" />
      <image src="@/img/ar3.png" mode="widthFix" class="w10" v-else />
    </view>
  </view>
  <view class="ul" :class="{'pt10': showList}" :style="{height: height}">
    <view class="between mb8" v-for="{i, index} in list" :key="index">
      <view class="f12 c-999">第1-7天</view>
      <view class="f10">￥<text class="f12">10.8</text>/天</view>
    </view>
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  computed: {
    height () {
      if (this.showList) {
        return `${0.2 + 0.52 * this.list.length}rem`
      } else {
        return 0
      }
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
