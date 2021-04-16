<style scoped>
.box1 { border: 2px solid #D4D4D4; border-radius: 4px; padding: 30px 20px; min-height: 294px; font-size: 24px; color: #666666; line-height: 40px; margin-bottom: 40px; }
.englist-tab { justify-content: flex-start; }
.englist-tab li { width: 60px; font-size: 24px; margin-right: 50px; }
.englist-tab li.active { color: #3366CC; border-bottom-color: #3366CC; }

.box2 { min-height: 216px; background-color: #F9F9F9; border-radius: 4px; padding: 30px 20px; font-size: 24px; color: #666666; line-height: 40px; }

.e-title { height: 70px; padding-left: 38px; font-size: 24px; color: #3366CC; }

.audio-box h3 { font-size: 28px; margin-top: 10px; }

.timer { width: 520px; }
.timer .bar { height: 2px; background-color: #777878; margin-top: 60px; margin-bottom: 10px; position: relative; }
.timer .bar .dot { width: 10px; height: 10px; border-radius: 50%; position: absolute; top: -4px; left: 0; background-color: #333333; }
.timer span { color: #666666; font-size: 18px; }

.audio-box .play { width: 80px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml30 mr30">

      <div class="between mt40 mb20">
        <div class="f24 c-99" @click="toDay('pre')">前一天</div>
        <div class="f24 c-99" @click="toDay('next')">后一天</div>
      </div>

      <div class="box1">{{record.content}}</div>

      <ul class="tabs2 englist-tab">
        <li :class="{'active': tabKey === 0}" @click="tabKey = 0">译文</li>
        <li :class="{'active': tabKey === 1}" @click="tabKey = 1">来源</li>
      </ul>

      <div class="box2">{{details}}</div>

      <h3 class="e-title acenter">音频地址</h3>
      <div class="box2 audio-box">
        <h3>商务礼仪培训</h3>
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
          <img src="/static/images/pause.png" mode="widthFix" class="play" @click="pause" v-if="playing">
          <img src="/static/images/play.png" mode="widthFix" class="play" @click="play" v-else>
        </div>
      </div>
      <h3 class="e-title acenter">图示</h3>
      <img :src="record.imgurl" mode="widthFix" class="w100 mb40">
    </div>

    <audio :src="record.tts" id="myAudio" @timeupdate="timeupdate" @ended="ended"></audio>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'
import {formatDate} from '../../utils'

export default {
  components: {
    operates
  },
  data () {
    return {
      audioCtx: {},
      record: {},
      tabKey: 0,
      type: '',
      showTime: false,
      playing: false,
      currentTime: 0,
      totalTime: 0,
      t: 0
    }
  },
  computed: {
    details () {
      if (this.tabKey === 0) {
        return this.record.note
      } else if (this.tabKey === 1) {
        return this.record.source
      }
    },
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
    getData () {
      postAction('english_day', {
        type: this.type
      }).then(res => {
        if (res.ret === 0) {
          if (res.data.length === 0) {
            mpvue.showToast({
              title: res.message,
              icon: 'none'
            })
          } else {
            this.record = res.data[0]
          }
        }
      })
    },
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
      clearInterval(this.t)
    },
    doPlay () {
      this.t = setInterval(() => {
        this.currentTime += 1
      }, 1000)
    },
    timeupdate (e) {
      this.totalTime = e.mp.detail.duration
    },
    toDay (type) {
      this.type = type
      this.getData()
    }
  },
  onLoad () {
    this.getData()
    this.audioCtx = wx.createAudioContext('myAudio')
  }
}
</script>
