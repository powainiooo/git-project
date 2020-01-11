<style scoped>
.z-page7 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 12;}
.z-page7 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page7 .fadeOut { animation: fadeOut 1s linear;}
.z-page7 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 0.7s both}
.z-page7 .slideUpIn2 { animation: slideUpIn 0.5s ease-out 0.9s both}
.z-page7 .slideUpIn3 { animation: slideUpIn 0.5s ease-out 1.1s both}
.z-page7 .content1 { top: 200px; left: 120px;}
.z-page7 .content2 { top: 470px; left: 120px;}
.z-page7 .content3 { top: 560px; left: 120px;}
.z-page7 .rule-frame { width: 504px; height: 120px; background-color: rgba(0, 0, 0, 0); position: absolute; top: 340px; left: 120px;}
.z-page7 .rule-frame .rule { width: 550px; margin-left: -4px}
.z-page7 .rule-frame .water { width: 40px; position: absolute; top: 50px; left: 0; margin-left: -20px;}
.z-page7 .rule-frame .water-hint:after { content: '拖动滑块选择，2秒后呈现答案'; width: 400px; color: #0475b5; font-size: 24px; position: absolute; top: 20px; left: 70px; margin-left: -20px; opacity: 0.5;}
.z-page7 .rule-frame .water-move { transition: left 1s ease-out}
.z-page7 .rule-frame .water img { width: 100%;}
.z-page7 .rule-frame .water span { width: 100%; position: absolute; bottom: 14px; text-align: center; font-size: 20px; color: #ffffff; left: 0;}
.z-page7 .my-rule { width: 50%; height: 20px; position: absolute; left: 0; top: 20px; background-color: rgba(248, 79, 28, 0.3); transition: all 1s ease-out;}
.z-page7 .my-rule:before { content: '你的使用量'; width: 200px; height: 80px; text-align: right; color: #F84F1C; position: absolute; right: 0; bottom: 0; font-size: 20px; padding-right: 10px;}
.z-page7 .my-rule:after { content: ''; width: 1px; height: 76px; position: absolute; right: 0; bottom: 0; background-color: rgba(248, 79, 28, 0.3);}
.z-page7 .average-rule { width: 50%; height: 12px; position: absolute; left: 0; top: 28px; background-color: rgba(4, 117, 181, 0.3); transition: all 1s ease-out;}
.z-page7 .average-rule:before { content: '全国平均使用量'; width: 200px; height: 120px; text-align: right; color: #0475B5; position: absolute; right: 0; bottom: 0; font-size: 20px; padding-right: 10px;}
.z-page7 .average-rule:after { content: ''; width: 1px; height: 116px; position: absolute; right: 0; bottom: 0; background-color: rgba(4, 117, 181, 0.3);}
</style>

<template>
<div class="z-page7" :style="{'z-index':showParts ? 13 : 5}">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
      <div class="data-content content1" v-if="showParts && source === 'app'">你知道你每月平均使用多少流量吗？</div>
   </transition>
   <transition enter-active-class="slideUpIn2" leave-active-class="fadeOut" @after-enter="ruleIn">
      <div class="rule-frame" @touchstart="start" @touchmove="move" @touchend="end" ref="rule" v-if="showParts">
         <img src="@/assets/img/rule.png" class="rule"/>
         <div class="water" :class="{'water-move':source !== 'app','water-hint':showHint}" :style="{left: left+'px'}">
            <img src="@/assets/img/water.png"/>
            <span>{{value}}</span>
         </div>
         <div class="my-rule" v-show="showParts && showResult" :style="{width: myWidth+'%'}"></div>
         <div class="average-rule" v-show="showParts && showResult" :style="{width: avgWidth+'%'}"></div>
      </div>
   </transition>
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
      <div class="data-content content2" v-show="showParts && showResult && source === 'app'"><span>{{resultTxt}}</span></div>
   </transition>
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
      <div class="tag-content content3" v-if="showParts && showResult" v-html="tagContent"></div>
   </transition>

</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data() {
      return {
         outTime: 1000,
         startX: 0,
         moveX: 0,
         ruleWidth: 0,
         startLeft: 0,
         left: 0,
         value: 0,
         useValue: 0,
         avgValue: 0,
         showResult: false,
         showHint: true,
         isRuleIn: false,
         t: 0,
         myWidth: 0,
         avgWidth: 0,
         startTime: 0
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p7'
      },
      source () {
         return this.$store.state.params.source
      },
      resultTxt () {
         return Math.abs(this.value - this.useValue) > 0.2 ? '哎呀，相差有点远！' : 'YES！接近实际用量'
      },
      tagContent () {
         if (this.useValue >= 3) {
            return '爱了！你就是传说中的<br/>DiLink达人！'
         } else if (this.useValue >= 1 && this.useValue < 3) {
            return '流量用的少，路都很难找'
         } else {
            return '兄弟，咋的了~<br/>是不是你村里没信号？<br/>赶紧用起来！'
         }
      },
      pageData () {
         return this.$store.state.pageData.P7
      },
   },
   watch: {
      currentPage (page) {
         if (page === 'p7') {
            // this.ruleWidth = this.$refs.rule.offsetWidth
            if (this.source === 'app') {
               this.$store.commit('setCanChangePage', this.showResult)
            } else {
               this.showHint = false
               this.$store.commit('setCanChangePage', true)
            }
         }
      }
   },
   methods: {
      ruleIn () {
         this.ruleWidth = this.$refs.rule.offsetWidth
         this.useValue = this.pageData.avgFlow
         this.avgValue = this.pageData.avgFlowAll
         this.isRuleIn = true
         if (this.source !== 'app') {
            this.setResultPos()
            this.showResult = true
            this.value = this.useValue
            this.left = this.useValue > 5 ? this.ruleWidth : (this.useValue / 5) * this.ruleWidth
         }
      },
      start (e) {
         if (this.showResult) return
         if (!this.isRuleIn) return
         if (this.source !== 'app') return
         this.showHint = false
         this.startX = e.touches[0].pageX
         this.startLeft = this.left
         clearTimeout(this.t)
         this.startTime = new Date().getTime()
      },
      move (e) {
         if (this.showResult) return
         if (!this.isRuleIn) return
         if (this.source !== 'app') return
         e.preventDefault()
         this.moveX = e.touches[0].pageX
         this.left = this.startLeft + this.moveX - this.startX
         if (this.left < 0) this.left = 0
         if (this.left > this.ruleWidth) this.left = this.ruleWidth
         this.value = parseFloat(((this.left / this.ruleWidth) * 5).toFixed(1))
      },
      end () {
         if (this.showResult) return
         if (!this.isRuleIn) return
         if (this.source !== 'app') return
         this.t = setTimeout(() => {
            this.setResultPos()
            this.showResult = true
            this.$store.commit('setCanChangePage', this.showResult)
         }, 2000)
         const time = new Date().getTime()
         window.footPrinter.dragSliderTime += time - this.startTime
      },
      setResultPos () {
         setTimeout(() => {
            this.myWidth = this.useValue > 5 ? 100 : (this.useValue / 5) * 100
            console.log(this.myWidth)
            // this.avgWidth = this.avgValue > 5 ? 100 : (this.avgValue / 5) * 100
         }, 100)
         setTimeout(() => {
            // this.myWidth = this.useValue > 5 ? 100 : (this.useValue / 5) * 100
            this.avgWidth = this.avgValue > 5 ? 100 : (this.avgValue / 5) * 100
         }, 600)
      }
   }
}
</script>
