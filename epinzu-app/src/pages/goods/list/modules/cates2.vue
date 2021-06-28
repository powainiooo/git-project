<style>
</style>

<template>
<Popup :show.sync="visible" placement="top">
  <view class="between mt10 ml12 mr16 mb8">
    <view class="c-999">全部分类</view>
    <image src="@/img/ar3.png" mode="widthFix" class="w10" />
  </view>
  <view class="flex" style="flex-wrap: wrap">
    <view class="tc mb16 c-red" style="width: 25%;">全部</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
    <view class="tc mb16" style="width: 25%;">切割机</view>
  </view>
</Popup>
</template>

<script type='es6'>
import Popup from '@/c/common/Popup'
export default {
	name: 'cates',
  components: {
    Popup
  },
	data() {
		return {
		  visible: false
    }
	},
	methods: {
	  show () {
	    this.visible = true
    }
  }
}
</script>
