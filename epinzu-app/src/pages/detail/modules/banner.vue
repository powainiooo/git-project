<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Detail-banner" id="goods">
  <swiper @Change="onChange">
    <swiper-item v-if="video.url">
      <image :src="imgSrc + video.cover" mode="aspectFill" class="img"  />
      <button class="btn-play"><image src="@/img/play.png" mode="aspectFill"  /></button>
    </swiper-item>
    <swiper-item v-for="(item, index) in list" :key="index">
      <image :src="imgSrc + item" mode="aspectFill" class="img"  />
    </swiper-item>
  </swiper>
  <view class="indicator">{{current}}/{{maxNum}}</view>
</view>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  list: {
	    type: Array,
      default: () => []
    },
    video: Object
  },
  computed: {
	  maxNum () {
	    if (this.video.url) {
	      return this.list.length + 1
      } else {
	      return this.list.length
      }
    }
  },
	data() {
		return {
      imgSrc: Taro.imgSrc,
		  current: 1,
    }
	},
	methods: {
    onChange (e) {
      this.current = e.detail.current + 1
    }
  }
}
</script>
