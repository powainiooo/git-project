<style lang="stylus" type="text/stylus">

</style>

<template>
<view class="Detail-banner" id="goods">
  <swiper @Change="onChange" v-if="video.url">
    <swiper-item>
      <image :src="imgSrc + video.cover" mode="aspectFill" class="img" :style="{opacity: isPlaying ? '0' : '1'}" />
      <video id="video"
             :src="imgSrc + video.url"
             :poster="imgSrc + video.cover"
             :controls="true"
             v-show="isPlaying"
             @Ended="end"
             @pause="end"
             style="background-color: #000000;" ></video>
      <button class="btn-play" @tap="play" v-if="!isPlaying"><image src="@/img/play.png" mode="aspectFill"  /></button>
    </swiper-item>
    <swiper-item v-for="(item, index) in list" :key="index">
      <image :src="imgSrc + item" mode="aspectFill" class="img" @tap="preview(index)"  />
    </swiper-item>
  </swiper>
  <swiper @Change="onChange" v-else>
    <swiper-item v-for="(item, index) in list" :key="index">
      <image :src="imgSrc + item" mode="aspectFill" class="img" @tap="preview(index)"  />
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
    },
    previewList () {
	    const list = []
      for (let i of this.list) {
        list.push(`${this.imgSrc}${i}`)
      }
      return list
    }
  },
	data() {
		return {
      imgSrc: Taro.imgSrc,
		  current: 1,
      isPlaying: false,
      videoCtx: null
    }
	},
	methods: {
    onChange (e) {
      this.current = e.detail.current + 1
      this.pause()
    },
    preview (index) {
      console.log('preview', index)
      Taro.previewImage({
        current: this.previewList[index],
        urls: this.previewList
      })
    },
    play () {
      this.isPlaying = true
      if (!this.videoCtx) {
        this.videoCtx = Taro.createVideoContext('video')
      }
      this.videoCtx.play()
    },
    end () {
      this.isPlaying = false
    },
    pause () {
      if (this.videoCtx) {
        this.videoCtx.pause()
      }
    }
  }
}
</script>
