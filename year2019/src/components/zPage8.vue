<style scoped>
.z-page8 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 10;}
.z-page8 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page8 .fadeOut { animation: fadeOut 1s linear;}
.z-page8 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 0.7s both}
.z-page8 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 0.9s both}
.z-page8 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 1.1s both}
.z-page8 .content1 { top: 270px; left: 90px;}
.z-page8 .progress { width: 460px; position: absolute; top: 600px; left: 90px;}
.z-page8 .progress ul { font-size: 20px; color: #F84F1C; margin-bottom: 18px; display: flex; list-style: none}
.z-page8 .progress ul li { margin-right: 30px; position: relative; padding-left: 30px;}
.z-page8 .progress ul li:before { content: ''; width: 18px; height: 18px; position: absolute; top: 4px; left: 0; background-color: #F84F1C;}
.z-page8 .progress ul li:last-child:before { background-color: #0475B5;}
.z-page8 .progress .line { width: 100%; height: 14px; border-left: 4px solid #F84F1C; background-color: #F84F1C; position: relative; margin-bottom: 18px; transition: all 1s linear;}
.z-page8 .progress  .line-all { border-left-color: #0475B5; background-color: #0475B5;}
.z-page8 .progress .line span { width: 100px; font-size: 20px; color: #F84F1C; position: absolute; top: -10px; left: calc(100% + 15px);}
.z-page8 .progress  .line-all span { color: #0475B5}
</style>

<template>
<div class="z-page8" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
      <div class="data-content content1" v-if="showParts">
         <p>过去一年</p>
         <p>你共使用APP<span class="value">{{nums}}</span>个，使用总时长为<span class="value">{{hours}}</span>小时</p>
         <p>你最常用的应用有<span>{{app1}}、{{app2}}</span></p>
      </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut" @after-enter="enter">
      <div class="progress" v-if="showParts">
         <ul>
            <li>你的使用时长</li>
            <li style="color: #0475B5">全国平均时长</li>
         </ul>
         <div class="line" :style="{'width': widthHours + '%'}">
            <span>{{hours}}次</span>
         </div>
         <div class="line line-all" :style="{'width': widthAverage + '%'}">
            <span>{{average}}次</span>
         </div>
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
         nums: 30,
         hours: 30,
         average: 30,
         app1: '网易云音乐',
         app2: '抖音',
         widthHours: 0,
         widthAverage: 0,
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p8'
      },
   },
   methods: {
      enter () {
         if (this.hours > this.average) {
            this.widthHours = 100
            this.widthAverage = (this.average / this.hours) * 100
         } else if (this.hours < this.average) {
            this.widthAverage = 100
            this.widthHours = (this.hours / this.average) * 100
         } else {
            this.widthHours = 100
            this.widthAverage = 100
         }
      }
   }
}
</script>
