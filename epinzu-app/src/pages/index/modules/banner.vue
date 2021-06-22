<style>
.index-banner { width: 100%; height: 340px; }
.index-banner .item { width: 100%; height: 100%; }
</style>

<template>
<swiper class="index-banner"
        autoplay="true"
        circular="true"
        interval="4000"
        duration="300">
  <swiper-item>
    <view class='item' style="background-color: #EE243F">1</view>
  </swiper-item>
  <swiper-item>
    <view class='item' style="background-color: #CDE3FE">2</view>
  </swiper-item>
  <swiper-item>
    <view class='item' style="background-color: #2F81E7">3</view>
  </swiper-item>
</swiper>
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
