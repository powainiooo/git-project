<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Detail-banner" id="goods">
  <swiper @Change="onChange">
    <swiper-item>
      <image src="@/img/default.png" mode="aspectFill" class="img"  />
      <button class="btn-play"><image src="@/img/play.png" mode="aspectFill"  /></button>
    </swiper-item>
    <swiper-item>
      <image src="@/img/default.png" mode="aspectFill" class="img"  />
    </swiper-item>
    <swiper-item>
      <image src="@/img/default.png" mode="aspectFill" class="img"  />
    </swiper-item>
  </swiper>
  <view class="indicator">{{current}}/3</view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
		  current: 1
    }
	},
	methods: {
    onChange (e) {
      this.current = e.detail.current + 1
    }
  }
}
</script>
