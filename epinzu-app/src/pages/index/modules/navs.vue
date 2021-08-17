<style scoped>

</style>

<template>
<view class="i-navs">
  <view class="i-navs-item" style="background-color: #CDE3FE;" @tap="toPage('/pages/search/index?page=nearby')">
    <view class="ml8">
      <view class="acenter">
        <view class="line" style="background-color: #4587FF;"></view>
        <view class="ml4">附近搜索</view>
      </view>
      <view class="f10 c-999 mt2 ml8">触手可得 快速租赁</view>
    </view>
    <image src="@/img/pos.png" mode="widthFix" class="w50 ml12" />
  </view>
  <view class="i-navs-item" style="background-color: #F2F3FE;" @tap="toPage('/pages/cate/index')">
    <view class="ml8">
      <view class="acenter">
        <view class="line" style="background-color: #7A80FE;"></view>
        <view class="ml4">分类</view>
      </view>
      <view class="f10 c-999 mt2 ml8">数百款商品任意选</view>
    </view>
    <image src="@/img/cate.png" mode="widthFix" class="w50 ml12" />
  </view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'navs',
	data() {
		return {}
	},
	methods: {
	  toPage (url) {
	    Taro.navigateTo({
        url
      })
    }
  }
}
</script>
