<style scoped>
.z-page2 { width: 100%; height: 100vh; overflow: hidden; position: relative; z-index: 12;}
.z-page2 .content1 { top: 240px; left: 120px;}
.z-page2 .tag-content { top: 470px; left: 120px;}
.z-page2 .content2 { top: 730px; left: 170px;}
.z-page2 .recharge { width: 250px; position: absolute; bottom: 94px; left: 84px;}
.z-page2 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page2 .fadeOut { animation: fadeOut 0.5s linear;}
.z-page2 .fadeOut0 { animation: fadeOut 0s linear;}
.z-page2 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 1.7s both}
.z-page2 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 1.9s both}
.z-page2 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 2.1s both}
</style>

<template>
<div class="z-page2" :style="{'z-index':showParts ? 13 : 5}">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut0">
   <img src="static/recharge.png" class="recharge" v-if="showParts">
   </transition>
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
   <div class="data-content content1" v-if="showParts">
      过去一年<br/>
      你总共充电<span class="value">{{times}}次</span><br/>
      超过全国<span class="value">{{percent}}%</span>的车主
   </div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut">
   <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>
   <transition enter-active-class="slideUpIn3" leave-active-class="fadeOut">
   <div class="data-content content2" v-if="showParts">
      每次平均充电{{hours}}小时<br/>
      最常充电时段19:00-07:00
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
         times: 126,
         percent: 52,
         hours: 8,
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p2'
      },
      type () {
         return 'EV'
      },
      tagContent () {
         if (this.type === 'DM') {
            if (this.percent >= 70) {
               return '一直插电一直爽<br/>插电不耗油，倍儿爽'
            } else if (this.percent >= 30 && this.percent < 70) {
               return '短途用电 经济节省<br/>长途用油 动力强劲<br/>我为比亚迪混动车 “带盐”'
            } else {
               return '这么土壕吗？<br/>买混动车是为了<br/>面儿还是牌儿？'
            }
         } else if (this.type === 'EV') {
            return '比亚迪新能源，倍儿爽！'
         }
      }
   },
	methods: {}
}
</script>
