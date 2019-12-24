<style scoped>
.z-page4 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 200px; left: 120px; z-index: 12;}
.z-page4 .data-content { position: static; margin-bottom: 30px;}
.z-page4 .tag-content { position: static; margin-bottom: 30px;}
.z-page4 .progress { width: 460px; margin-bottom: 30px;}
.z-page4 .progress h4 { font-size: 20px; color: #F84F1C; margin-bottom: 12px;}
.z-page4 .progress-all h4 { color: #0475B5}
.z-page4 .progress .line { width: 100%; height: 14px; border-left: 4px solid #F84F1C; background-color: #F84F1C; position: relative; transition: all 1s linear;}
.z-page4 .progress-all .line { border-left-color: #0475B5; background-color: #0475B5;}
.z-page4 .progress .line span { width: 100px; font-size: 20px; color: #F84F1C; position: absolute; top: -10px; left: calc(100% + 15px);}
.z-page4 .progress-all .line span { color: #0475B5}
.z-page4 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page4 .fadeOut { animation: fadeOut 0.5s linear;}
.z-page4 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 0.7s both}
.z-page4 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 0.9s both}
.z-page4 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 2.6s both}
</style>

<template>
<div class="z-page4" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut" @after-enter="enter">
   <div class="data-content" v-if="showParts">
      <p>过去一年</p>
      <p v-if="showTimes">你与爱车相处了<span class="value">{{drive_time.toFixed(1)}}</span>小时</p>
      <p v-if="showVCount">小迪累计被唤醒了<span class="value">{{voice_counts.toFixed(0)}}</span>次</p>
   </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
   <div class="progress" v-if="showParts && isDiLink">
      <h4>我的唤醒次数</h4>
      <div class="line" :style="{'width': widthTimes + '%'}">
         <span>{{voice_counts.toFixed(0)}}次</span>
      </div>
   </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
   <div class="progress progress-all" v-if="showParts && isDiLink">
      <h4>全国车主平均唤醒次数</h4>
      <div class="line" :style="{'width': widthAverage + '%'}">
         <span>{{avg_voice_counts.toFixed(0)}}次</span>
      </div>
   </div>
   </transition>
   <transition enter-active-class="slideUpIn3" leave-active-class="fadeOut">
      <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>
</div>
</template>

<script type='es6'>
import TweenLite from 'gsap'
export default {
	name: 'app',
	data() {
		return {
         outTime: 1000,
         drive_time: 0,
         voice_counts: 0,
         avg_voice_counts: 0,
         widthTimes: 0,
         widthAverage: 0,
         numsInterval: 1,
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p4'
      },
      pageData () {
         return this.$store.state.pageData.P4
      },
      isDiLink () {
         return this.$store.state.isDiLink
      },
      tagContent () {
         if (this.isDiLink) {
            if (this.voice_counts > 100) {
               return 'Skr Skr<br/>是谁在耳边~说~<br/>小迪你好鸭'
            } else if (this.voice_counts > 50 && this.voice_counts <= 100) {
               return '想要问问你敢不敢<br/>像从前那样呼唤我的名字'
            } else if (this.voice_counts > 0 && this.voice_counts <= 50) {
               return '别冷落小迪<br/>天青色等烟雨，而她在等你 '
            } else {
               return '敢不敢叫一声小迪<br/>看看我敢答应吗'
            }
         } else {
            return '在车上遇到的故事<br/>远比你想象的精彩'
         }
      },
      showTimes () {
         return this.pageData.driveTime !== undefined
      },
      showVCount () {
         return this.pageData.voiceCount !== undefined
      }
   },
   watch: {
      currentPage (page, lastPage) {
         if (lastPage === 'p4') {
            this.reset()
         }
      }
   },
	methods: {
      reset () {
         this.widthTimes = 0
         this.widthAverage = 0
         this.drive_time = 0
         this.voice_counts = 0
         this.avg_voice_counts = 0
      },
      enter () {
         TweenLite.to(
            this.$data,
            this.numsInterval,
            {
               drive_time: this.pageData.driveTime,
               voice_counts: this.pageData.voiceCount,
               avg_voice_counts: this.pageData.avgVoiceCount,
            }
         )
         this.timesEnter()
         this.averageEnter()
      },
      timesEnter () {
         this.widthTimes = this.voice_counts > this.avg_voice_counts ? 100 : (this.voice_counts / this.avg_voice_counts) * 100
      },
      averageEnter () {
         this.widthAverage = this.avg_voice_counts > this.voice_counts ? 100 : (this.avg_voice_counts / this.voice_counts) * 100
      }
   }
}
</script>
