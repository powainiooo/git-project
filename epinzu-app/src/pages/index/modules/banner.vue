<style>
.index-banner { width: 100%; height: 320px; box-sizing: border-box; }
.index-banner .item { width: 100%; height: 100%; }
.index-banner .item image { width: 100%; height: 297px; }
</style>

<template>
<swiper class="index-banner"
        autoplay="true"
        circular="true"
        interval="4000"
        duration="300"
        :style="{
          height: h
        }">
  <swiper-item v-for="(item, index) in list" :key="index">
    <view class='item' @tap="toPages(item)">
      <view :style="{
      height: tbH + 'px',
      'background-color': item.title
    }"></view>
      <image :src="imgSrc + item.banner" mode="aspectFill" @load="loadImg" />
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
		  imgSrc: Taro.imgSrc,
      tbH: 0,
      h: '5.94rem'
    }
	},
  created() {
    Taro.getSystemInfo({
      success: res => {
        console.log('getSystemInfo', res)
        this.tbH = res.statusBarHeight
        this.h = `calc(5.94rem + ${this.tbH}px)`
      }
    })
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
    },
    loadImg (e) {
      console.log('loadImg', e)
    }
  }
}
</script>
