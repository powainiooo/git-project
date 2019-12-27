<style scoped>
.z-page5 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 10; }
.z-page5-dark { background: -webkit-linear-gradient(#060239, #0f2595)}
.z-page5 .tag-content { top: 230px; left: 120px;}
.z-page5-dark .tag-content { color: #ffffff}
.z-page5 .slideUpIn1 { animation: slideUpIn 0.5s ease-out 0.7s both}
</style>

<template>
<div class="z-page5" :class="{'z-page5-dark':tagName === '夜猫族'}" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="slideUpIn1" leave-active-class="fadeOut">
   <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
         outTime: 1000
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p5'
      },
      tagName () {
         return this.$store.state.tagName
      },
      tagContent () {
         if (this.tagName === '人生赢家') {
            return `你总是能<br/><span>避开早晚高峰</span>出行<br/>堵车少有<br/>幸福感<span>蹭蹭上涨</span>！<br/>实名羡慕`
         } else if (this.tagName === '勤奋家') {
            return `你经常能<span>早早出门</span><br/>当之无愧的追梦人<br/>加油！`
         } else if (this.tagName === '上班族') {
            return `你常常在<span>早晚高峰</span>出行<br/>明明是富二代<br/>可还要拼命赚钱<br/>这就是<span>你和明明的差距</span>`
         } else if (this.tagName === '夜猫族') {
            return `你经常在夜间出行<br/>朋友<br/>是因为<span>夜太美</span>吗？`
         }
      }
   },
	methods: {}
}
</script>
