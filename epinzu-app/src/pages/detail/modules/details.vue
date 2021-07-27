<style scoped>

</style>

<template>
<view class="Detail-section" id="details">
  <view class="mt16 mb16 bold">物品详情</view>
  <view class="Detail-details">
    <image v-for="(item, index) in list"
           :key="index"
           :src="imgSrc + item.image"
           mode="widthFix" />
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
	methods: {}
}
</script>
