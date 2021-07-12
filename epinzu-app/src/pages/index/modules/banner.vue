<style>
.index-banner { width: 100%; height: 297px; }
.index-banner .item { width: 100%; height: 100%; }
.index-banner .item image { width: 100%; height: 100%; }
</style>

<template>
<swiper class="index-banner"
        autoplay="true"
        circular="true"
        interval="4000"
        duration="300">
  <swiper-item v-for="(item, index) in list" :key="index">
    <view class='item' @tap="toPages(item)">
      <image :src="imgSrc + item.banner" mode="aspectFill" />
    </view>
  </swiper-item>
</swiper>
</template>

<script type='es6'>
import Taro from '@tarojs/taro'
export default {
	name: 'app',
  props: {
	  list: Array,
    guide: String
  },
	data() {
		return {
		  imgSrc: Taro.imgSrc
    }
	},
	methods: {
    toPages (item) {
      let url = ''
      if (item.type === 1) {
        url = `/pages/webview/index?src=${item.url}`
      } else if (item.type === 2) {
        url = `/pages/detail/index?src=${item.url}`
      } else if (item.type === 3) {
        url = `/pages/detail/index?src=${item.url}`
      } else if (item.type === 4) {
        url = `/pages/store/index?src=${item.url}`
      } else if (item.type === 9) {
        url = `/pages/webview/index?src=${this.guide}`
      }
      if (url !== '') {
        Taro.navigateTo({
          url
        })
      }
    }
  }
}
</script>
