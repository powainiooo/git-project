<style scoped>
.z-page3 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 12;}
.z-page3 .content1 { top: 240px; left: 120px;}
.z-page3 .tag-content { top: 410px; left: 120px;}
.z-page3 .content2 { top: 710px; left: 120px;}
.z-page3 .recharge { width: 250px; position: absolute; bottom: 94px; left: 84px;}
.z-page3 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page3 .fadeOut { animation: fadeOut 0.5s linear;}
.z-page3 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 0.7s both}
.z-page3 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 0.9s both}
.z-page3 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 1.1s both}
</style>

<template>
<div class="z-page3" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
   <div class="data-content content1" v-if="showParts">
      过去一年<br/>
      你的最高时速是<span class="value">{{max}}</span>km/h
   </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
   <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>
   <transition enter-active-class="slideUpIn3" leave-active-class="fadeOut">
   <div class="data-content content2" v-if="showParts">
      你的全年平均车速为<span class="value">{{average}}</span>km/h
   </div>
   </transition>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
         outTime: 1000,
         max: 130,
         average: 90
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p3'
      },
      tagContent () {
         if (this.average >= 130) {
            return '好嗨呦<br/>感觉人生到达了巅峰！'
         } else if (this.average >= 80 && this.average < 130) {
            return '全年驾车安全评分99分<br/>多一分怕你骄傲'
         } else {
            return '安全就好<br/>其他随缘'
         }
      }
   },
	methods: {}
}
</script>
