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
      <img src="@/assets/img/tag/2.png" v-else-if="tagName === '充电困难户'">
      <img src="@/assets/img/tag/3.png" v-else-if="tagName === '电动达人'">
      <img src="@/assets/img/tag/4.png" v-else-if="tagName === '电动砖家'">
      <img src="@/assets/img/tag/5.png" v-else-if="tagName === '火星人'">
      <img src="@/assets/img/tag/6.png" v-else-if="tagName === '健忘症患者'">
      <img src="@/assets/img/tag/7.png" v-else-if="tagName === '钥匙自由'">
      <img src="@/assets/img/tag/8.png" v-else-if="tagName === '冷暖自由'">
      <img src="@/assets/img/tag/9.png" v-else-if="tagName === '潜力股'">
      <img src="@/assets/img/tag/10.png" v-else-if="tagName === '勤奋家'">
      <img src="@/assets/img/tag/11.png" v-else-if="tagName === '秋名山车神'">
      <img src="@/assets/img/tag/12.png" v-else-if="tagName === '人生赢家'">
      <img src="@/assets/img/tag/13.png" v-else-if="tagName === '上班族'">
      <img src="@/assets/img/tag/14.png" v-else-if="tagName === '停车自由'">
      <img src="@/assets/img/tag/15.png" v-else-if="tagName === '通勤大军'">
      <img src="@/assets/img/tag/16.png" v-else-if="tagName === '夜猫族'">
      <img src="@/assets/img/tag/17.png" v-else-if="tagName === '最强王者'">
      <img src="@/assets/img/tag/18.png" v-else-if="tagName === '沉稳老铁'">
      <img src="@/assets/img/tag/19.png" v-else-if="tagName === '佛系车主'">
      <img src="@/assets/img/tag/20.png" v-else-if="tagName === '热血青铜'">
      <img src="@/assets/img/tag/21.png" v-else-if="tagName === '忠实粉丝'">
      <img src="@/assets/img/tag/22.png" v-else-if="tagName === '铁杆粉丝'">
      <img src="@/assets/img/tag/23.png" v-else-if="tagName === '语音爱好者'">
      <img src="@/assets/img/tag/24.png" v-else-if="tagName === '高冷范'">
      <img src="@/assets/img/tag/25.png" v-else-if="tagName === '语音重灾区'">
   </transition>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         tagName: '',
         p1: ['', '最强王者', '暴走老司机', '通勤大军', '热血青铜'],
         p2: ['', '电动砖家', '电动达人', '充电困难户'],
         p3: ['', '秋名山车神', '沉稳老铁', '佛系车主'],
         p4: ['', '语音爱好者', '高冷范', '语音重灾区'],
         p5: ['', '勤奋家', '夜猫族', '上班族', '人生赢家'],
         p6: ['火星人', '冷暖自由', '钥匙自由', '停车自由', '健忘症患者'],
         p8: ['', '铁杆粉丝', '忠实粉丝', '潜力股'],
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      pageData () {
         return this.$store.state.pageData[this.currentPage.toUpperCase()]
      },
   },
   watch: {
      currentPage (page) {
         if (this.pageData === undefined) {
            this.tagName = ''
         } else {
            if (this.pageData.tag === undefined) {
               this.tagName = ''
            } else {
               this.tagName = this[page][this.pageData.tag]
            }
         }
         this.$store.commit('changeTagName', this.tagName)
      }
   },
   methods: {}
}
</script>
