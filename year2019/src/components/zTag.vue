<style scoped>
.z-tag { width: 120px; position: fixed; top: 30px; right: 30px; z-index: 100;}
.z-tag img { width: 100%;}
.z-tag .tagIn { animation: tagIn 1s ease-out;}
@keyframes tagIn {
   0% { transform: rotateX(90deg)}
   70% { transform: rotateX(680deg)}
   90% { transform: rotateX(740deg)}
   100% { transform: rotateX(720deg)}
}
.z-tag .tagOut { animation: tagOut 1s ease-out;}
@keyframes tagOut {
   0% { transform: rotateX(0deg)}
   100% { transform: rotateX(630deg)}
}
</style>

<template>
<div class="z-tag">
   <!-- 语音爱好者 高冷范 语音重灾区-->
   <transition enter-active-class="tagIn" leave-active-class="tagOut">
      <img src="@/assets/img/tag/1.png" v-if="tagName === '暴走老司机'">
      <img src="@/assets/img/tag/2.png" v-if="tagName === '充电困难户'">
      <img src="@/assets/img/tag/3.png" v-if="tagName === '电动达人'">
      <img src="@/assets/img/tag/4.png" v-if="tagName === '电动砖家'">
      <img src="@/assets/img/tag/5.png" v-if="tagName === '火星人'">
      <img src="@/assets/img/tag/6.png" v-if="tagName === '健忘症患者'">
      <img src="@/assets/img/tag/7.png" v-if="tagName === '解锁自由'">
      <img src="@/assets/img/tag/8.png" v-if="tagName === '冷暖自由'">
      <img src="@/assets/img/tag/9.png" v-if="tagName === '潜力股'">
      <img src="@/assets/img/tag/10.png" v-if="tagName === '勤奋家'">
      <img src="@/assets/img/tag/11.png" v-if="tagName === '秋名山车神'">
      <img src="@/assets/img/tag/12.png" v-if="tagName === '人生赢家'">
      <img src="@/assets/img/tag/13.png" v-if="tagName === '上班族'">
      <img src="@/assets/img/tag/14.png" v-if="tagName === '停车自由'">
      <img src="@/assets/img/tag/15.png" v-if="tagName === '通勤大军'">
      <img src="@/assets/img/tag/16.png" v-if="tagName === '夜猫族'">
      <img src="@/assets/img/tag/17.png" v-if="tagName === '最强王者'">
      <img src="@/assets/img/tag/18.png" v-if="tagName === '沉稳老铁'">
      <img src="@/assets/img/tag/19.png" v-if="tagName === '佛系车主'">
      <img src="@/assets/img/tag/20.png" v-if="tagName === '热血青铜'">
      <img src="@/assets/img/tag/21.png" v-if="tagName === '忠实粉丝'">
      <img src="@/assets/img/tag/22.png" v-if="tagName === '铁杆粉丝'">
   </transition>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         fitName: ['baozou', 'tongqin', 'aiche', 'diandong']
      }
   },
   computed: {
      tagName () {
         return this.$store.state.tagName
      }
   },
   methods: {}
}
</script>
