<template>
  <view class="index">
    <button @tap="handlePlay">play</button>
    <view class="video-frame center" v-show="showVideo">
      <video id="CVideo"
             :showPlayBtn="false"
             :showCenterPlayBtn="false"
             :poster="videoPostSrc"
             :src="videoSrc"
             :autoplay="true"
             @play="showVideoBtn = false"
             @pause="showVideoBtn = true"
             @Ended="showVideoBtn = true"></video>
      <image src="@/img/cancel.png" class="close" mode="widthFix" @tap="hideVideo" />
      <image src="@/img/play.png" class="play" mode="widthFix" @tap="playVideo" v-if="showVideoBtn" />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'

export default {
  name: 'Index',
  data () {
    return {
      showVideo: false,
      videoCtx: null,
      videoSrc: '',
      videoPostSrc: '',
      showVideoBtn: true,
      src1: 'https://file.dev.epinzu.com/video/chat/2021/0910/170124613b1ee43cfba.mp4',
      src2: 'https://file.dev.epinzu.com/video/chat/2021/0910/170124613b1ee43cfba.mp4.jpg'
    }
  },
  methods: {
    videoInit () {
      this.videoCtx = Taro.createVideoContext('CVideo')
    },
    handlePlay () {
      this.videoSrc = this.src1
      this.videoPostSrc = this.src2
      this.videoCtx.play()
      this.showVideo = true
    },
    playVideo () {
      this.videoCtx.play()
    },
    hideVideo () {
      this.videoCtx.pause()
      this.showVideo = false
    },
  },
  onReady () {
    this.videoInit()
  },
  onHide () {
    this.hideVideo()
  }
}
</script>
