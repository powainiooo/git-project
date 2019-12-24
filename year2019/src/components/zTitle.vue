<style scoped>
.z-title { width: 150px; position: fixed; top: 50px; left: 40px; z-index: 1000;}
.z-title img { width: 100%;}
.z-title p { font-size: 24px; color: #0475B5; position: absolute; bottom: 6px; left: 10px;}
.z-title .fadeIn { animation: fadeIn 1s linear;}
.z-title .nameIn { animation: nameIn 0.5s ease-out;}
@keyframes nameIn {
   0% { transform: translateX(30px); opacity: 0;}
   100% { transform: translateX(0); opacity: 1;}
}
.z-title .nameOut { animation: nameOut 1s ease-out;}
@keyframes nameOut {
   0% { transform: translateY(0); opacity: 1;}
   100% { transform: translateY(30px); opacity: 0;}
}
</style>

<template>
<transition enter-active-class="fadeIn">
   <div class="z-title" v-if="currentPage !== 'loading'">
      <img src="@/assets/img/title2.png">
      <transition enter-active-class="nameIn" leave-active-class="nameOut" mode="out-in">
      <p v-if="showName !== ''">{{showName}}</p>
      </transition>
   </div>
</transition>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
		   showName: ''
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      name () {
         if (this.currentPage === 'p1') {
            return '里程 油/电耗'
         } else if (this.currentPage === 'p2') {
            return '充电行为'
         } else if (this.currentPage === 'p3') {
            return '车速'
         } else if (this.currentPage === 'p4') {
            return '行驶时长'
         } else if (this.currentPage === 'p5') {
            return '出行时间'
         } else if (this.currentPage === 'p6') {
            return '远程控制'
         } else if (this.currentPage === 'p7') {
            return '流量使用'
         } else if (this.currentPage === 'p8') {
            return '应用使用'
         } else if (this.currentPage === 'p9') {
            return '穿越日记'
         }
      },
   },
   watch: {
	   name (val) {
	      this.showName = ''
         this.$nextTick(() => {
            this.showName = val
         })
      }
   },
	methods: {}
}
</script>
