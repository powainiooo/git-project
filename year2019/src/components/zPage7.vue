<style scoped>
.z-page7 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 12;}
.z-page7 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page7 .fadeOut { animation: fadeOut 1s linear;}
.z-page7 .content1 { top: 200px; left: 120px;}
.z-page7 .content2 { top: 470px; left: 120px;}
.z-page7 .content3 { top: 560px; left: 120px;}
.z-page7 .rule-frame { width: 504px; height: 120px; background-color: rgba(0, 0, 0, 0); position: absolute; top: 340px; left: 120px;}
.z-page7 .rule-frame .rule { width: 550px; margin-left: -4px}
.z-page7 .rule-frame .water { width: 40px; position: absolute; top: 50px; left: 0; margin-left: -20px;}
.z-page7 .rule-frame .water img { width: 100%;}
.z-page7 .rule-frame .water span { width: 100%; position: absolute; bottom: 14px; text-align: center; font-size: 20px; color: #ffffff; left: 0;}
</style>

<template>
<div class="z-page7">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="data-content content1" v-if="showParts">你知道你每月平均使用多少流量吗？{{startX}}-{{moveX}}</div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="rule-frame" @touchstart="start" @touchmove="move" ref="rule" v-if="showParts">
         <img src="@/assets/img/rule.png" class="rule"/>
         <div class="water" :style="{left: left+'px'}">
            <img src="@/assets/img/water.png"/>
            <span>{{value}}</span>
         </div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="data-content content2" v-if="showParts"><span>{{resultTxt}}</span></div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="tag-content content3" v-if="showParts">爱了！你就是传说中的<br/>DiLink达人</div>
   </transition>

</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         outTime: 2000,
         startX: 0,
         moveX: 0,
         ruleWidth: 0,
         startLeft: 0,
         left: 0,
         value: 0,
         useValue: 0,
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p7'
      },
      resultTxt () {
         return Math.abs(this.value - this.useValue) > 0.2 ? '猜错，太不了解自己了！' : '选择正确，策无遗算！'
      },
      tagContent () {
         if (this.average >= 3) {
            return '爱了！你就是传说中的<br/>DiLink达人！'
         } else if (this.average >= 1 && this.average < 3) {
            return '流量用的少，路都很难找'
         } else {
            return '兄弟，咋的了~<br/>是不是你村里没信号？<br/>赶紧用起来！'
         }
      }
   },
   watch: {
      currentPage (val) {
         if (val === 'p8') {
            this.ruleWidth = this.$refs.rule.offsetWidth
         }
      }
   },
   methods: {
      start (e) {
         console.log(e)
         this.startX = e.touches[0].pageX
         this.startLeft = this.left
      },
      move (e) {
         console.log(e)
         e.preventDefault()
         this.moveX = e.touches[0].pageX
         this.left = this.startLeft + this.moveX - this.startX
         if (this.left < 0) this.left = 0
         if (this.left > this.ruleWidth) this.left = this.ruleWidth
         this.value = parseFloat(((this.left / this.ruleWidth) * 5).toFixed(1))
      }
   }
}
</script>
