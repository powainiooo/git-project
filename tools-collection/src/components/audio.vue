<style scoped>
.audio-box { min-height: 216px; background-color: #F9F9F9; border-radius: 4px; padding: 30px 20px; font-size: 24px; color: #666666; line-height: 40px; }
.audio-box h3 { font-size: 28px; margin-top: 10px; }

.timer { width: 520px; }
.timer .bar { height: 2px; background-color: #777878; margin-top: 60px; margin-bottom: 10px; position: relative; }
.timer .bar .dot { width: 10px; height: 10px; border-radius: 50%; position: absolute; top: -4px; left: 0; background-color: #333333; }
.timer span { color: #666666; font-size: 18px; }

.audio-box .play { width: 80px; }
.audio-box .playing { animation: breath 2s linear infinite; }
@keyframes breath {
  0%, 100% { opacity: 1; }
  50% { opacity: .2; }
}
</style>

<template>
<div>
  <div class="audio-box">
    <h3>{{title}}</h3>
    <div class="between">
      <div class="timer">
        <div class="bar">
          <div class="dot" :style="{left: progress}"></div>
        </div>
        <div class="between">
          <span>{{ctStr}}</span>
          <span>{{ttStr}}</span>
        </div>
      </div>
      <img src="/static/images/pause.png" mode="widthFix" class="play playing" @click="pause" v-if="playing">
      <img src="/static/images/play.png" mode="widthFix" class="play" @click="play" v-else>
    </div>
  </div>
  <audio :src="src" id="myAudio" @timeupdate="timeupdate" @ended="ended"></audio>
</div>
</template>

<script type='es6'>
import {formatDate} from '@/utils'
export default {
  name: 'app',
  props: {
    src: String,
    title: String
  },
  data () {
    return {
      audioCtx: {},
      showTime: false,
      playing: false,
      currentTime: 0,
      totalTime: 0,
      t: 0
    }
  },
  computed: {
    ctStr () {
      return formatDate(new Date(this.currentTime * 1000), 'mm:ss')
    },
    ttStr () {
      return formatDate(new Date(this.totalTime * 1000), 'mm:ss')
    },
    progress () {
      return (this.currentTime / this.totalTime) * 100 + '%'
    }
  },
  methods: {
    play (e) {
      this.playing = true
      this.audioCtx.play()
      this.doPlay()
    },
    pause (e) {
      this.playing = false
      clearInterval(this.t)
      this.audioCtx.pause()
    },
    ended (e) {
      console.log('onplay', e)
      this.currentTime = 0
      this.playing = false
      clearInterval(this.t)
    },
    doPlay () {
      this.t = setInterval(() => {
        this.currentTime += 1
      }, 1000)
    },
    timeupdate (e) {
      this.totalTime = e.mp.detail.duration
    }
  },
  onLoad () {
    this.audioCtx = wx.createAudioContext('myAudio')
  }
}
</script>
