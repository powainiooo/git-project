<style scoped>
.z-page4 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 200px; left: 120px; z-index: 12;}
.z-page4 .data-content { position: static; margin-bottom: 30px;}
.z-page4 .tag-content { position: static; margin-bottom: 30px;}
.z-page4 .progress { width: 460px; margin-bottom: 30px;}
.z-page4 .progress h4 { font-size: 20px; color: #F84F1C; margin-bottom: 12px;}
.z-page4 .progress-all h4 { color: #0475B5}
.z-page4 .progress .line { width: 100%; height: 14px; border-left: 4px solid #F84F1C; background-color: #F84F1C; position: relative;}
.z-page4 .progress-all .line { border-left-color: #0475B5; background-color: #0475B5;}
.z-page4 .progress .line span { width: 100px; font-size: 20px; color: #F84F1C; position: absolute; top: -10px; left: calc(100% + 15px);}
.z-page4 .progress-all .line span { color: #0475B5}
.z-page4 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page4 .fadeOut { animation: fadeOut 1s linear;}
.z-page4 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 1.2s both}
.z-page4 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 1.4s both}
.z-page4 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 1.6s both}
</style>

<template>
<div class="z-page4">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
   <div class="data-content" v-if="showParts">
      过去一年<br/>
      你与爱车相处了<span class="value">{{hours}}</span>小时<br/>
      小迪累计被唤醒了<span class="value">{{times}}</span>次
   </div>
   </transition>
   <div class="progress" v-if="showParts && isDiLink">
      <h4>我的唤醒次数</h4>
      <div class="line">
         <span>{{times}}次</span>
      </div>
   </div>
   <div class="progress progress-all" v-if="showParts && isDiLink">
      <h4>全国车主平均唤醒次数</h4>
      <div class="line">
         <span>{{average}}次</span>
      </div>
   </div>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
      <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
         outTime: 2000,
         hours: 320,
         times: 576,
         average: 576,
         isDiLink: true
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p4'
      },
      tagContent () {
         if (this.isDiLink) {
            if (this.times > 100) {
               return 'Skr Skr<br/>是谁在耳边~说~<br/>小迪你好鸭'
            } else if (this.times > 50 && this.times <= 100) {
               return '想要问问你敢不敢<br/>像从前那样呼唤我的名字'
            } else if (this.times > 0 && this.times <= 50) {
               return '别冷落小迪<br/>天青色等烟雨，而她在等你 '
            } else {
               return '敢不敢叫一声小迪<br/>看看我敢答应吗'
            }
         } else {
            return '在车上遇到的故事<br/>远比你想象的精彩'
         }
      }
   },
	methods: {}
}
</script>
