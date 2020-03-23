<style scoped>
.z-page2 { width: 100%; position: fixed; top: 0; left: 0; bottom: 0; overflow: hidden; z-index: 12;}
.z-page2 .content1 { top: 12vh; left: 120px;}
.z-page2 .tag-content { top: 28vh; left: 120px;}
.z-page2 .content2 { top: 47vh; left: 120px;}
.z-page2 .recharge { width: 250px; position: absolute; bottom: 94px; left: 84px;}
.z-page2 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page2 .fadeOut { animation: fadeOut 0.5s linear;}
.z-page2 .fadeOut0 { animation: fadeOut 0s linear;}
.z-page2 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 1.2s both}
.z-page2 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 1.4s both}
.z-page2 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 1.6s both}
</style>

<template>
<div class="z-page2" :style="{'z-index':showParts ? 13 : 5}">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut0">
   <img :src="imgSrc+'static/recharge.png'" class="recharge" v-if="showParts">
   </transition>
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
   <div class="data-content content1" v-if="showParts">
      <p>过去一年</p>
      <p>你总共充电<span class="value">{{charge_counts.toFixed(0)}}次</span></p>
      <p>超过全国<span class="value">{{parseFloat(charge_over_per.toFixed(1))}}%</span>的车主</p>
   </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
   <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>
   <transition enter-active-class="slideUpIn3" leave-active-class="fadeOut" @after-enter="enter">
   <div class="data-content content2" v-if="showParts">
      <p>平均每次充电<span>{{charge_avg_time.toFixed(1)}}</span>小时</p>
      <p>最常充电时段<span>{{timeZone}}</span></p>
   </div>
   </transition>
</div>
</template>

<script type='es6'>
import TweenLite from 'gsap'
export default {
   name: 'app',
   data () {
      return {
         outTime: 1000,
         charge_counts: 0,
         charge_over_per: 0,
         charge_avg_time: 0,
         numsInterval: 1,
         timeZone: ''
      }
   },
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p2'
      },
      type () {
         return this.$store.state.powerMode
      },
      pageData () {
         return this.$store.state.pageData.P2
      },
      tagContent () {
         if (this.type === 'DM') {
            if (this.pageData.cPlacing > 70) {
               return '一直插电一直爽<br/>插电不耗油，倍儿爽'
            } else if (this.pageData.cPlacing > 30 && this.pageData.cPlacing <= 70) {
               return '短途用电 经济节省<br/>长途用油 动力强劲<br/>我为比亚迪双模车“带盐”'
            } else {
               return '这么土壕吗？<br/>买双模车是为了<br/>面儿还是牌儿？'
            }
         } else if (this.type === 'EV') {
            return '比亚迪新能源，倍儿爽！'
         }
      }
   },
   watch: {
      currentPage (page, lastPage) {
         if (lastPage === 'p2') {
            this.reset()
         }
      }
   },
   methods: {
      reset () {
         this.charge_counts = 0
         this.charge_over_per = 0
         this.charge_avg_time = 0
      },
      enter () {
         this.timeZone = this.pageData.timeZone
         TweenLite.to(
            this.$data,
            this.numsInterval,
            {
               charge_counts: this.pageData.chargeTimes,
               charge_over_per: this.pageData.cPlacing,
               charge_avg_time: this.pageData.avgChargeTime
            }
         )
         this.$store.commit('setCanChangePage', true)
      }
   }
}
</script>
