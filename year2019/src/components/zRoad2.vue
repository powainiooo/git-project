<style scoped>
.z-road { width: 100%; height: 60vh; overflow: hidden; position: absolute; bottom: 0; left: 0; z-index: 0;}
.z-road .roads { width: 100%; position: absolute; bottom: 0; left: 0; transition: transform 1.1s linear; transform-origin: 50% 100%;}
.z-road .roads-loading { transform: scale(0.6); transform-origin: 50% 100%;}
.z-road .roads-p1 { transition-duration: 2s }
.z-road .roads-p2 { transform: scale(1.85); transform-origin: 50% 0; }
.z-road .roads .roads-move { width: 6798px; display: flex; align-items: center;}
.z-road .roads img { width: calc(100% / 3); display: block;}

.page-bg { width: 100%; position: absolute; left: 0; overflow: hidden;}
.page-bg .bg-move { width: 2760px; display: flex; align-items: center;}
.page-bg .bg-move img { width: 50%; display: block;}

.loading-bg {bottom: 86px;}
.loading-bg .bg-move { width: 2760px;}

.page2-bg { width: 100%; position: absolute; bottom: 88px; left: 0;}
.page2-bg img { width: 100%; display: block;}
.page2-bg img.spot { width: 490px; margin-left: 210px; margin-top: 10px;}
.z-road .bgIn { animation: bgIn 1.1s cubic-bezier(.28,.46,.59,.82);}
@keyframes bgIn {
   0% { transform: translateX(100%);}
   100% { transform: translateX(0);}
}
.page2-bg .building { animation: building2 1.1s cubic-bezier(.28,.46,.59,.82); transform-origin: 0 100%;}
@keyframes building2 {
   0% { transform: scale(0.7); opacity: 0.8;}
   100% { transform: scale(1); opacity: 1;}
}
.fadeIn { animation: fadeIn 0.5s linear}
.fadeOut { animation: fadeOut 0.5s linear}

.page3-bg {bottom: 144px;}
.page3-bg .bg-move { width: 3180px;}
.page3-bg-bottom {bottom: 0;}
.page3-bg-bottom .bg-move { width: 3640px;}

.page4-bg {bottom: 110px;}
.page4-bg .bg-move { width: 3980px;}
</style>

<template>
<div class="z-road">
   <div class="roads" :class="roadsExtraClass">
      <div class="roads-move" :style="roadMove" ref="roads">
         <img src="@/assets/img/road.png">
         <img src="@/assets/img/road.png" style="margin-left: -1px">
         <img src="@/assets/img/road.png" style="margin-left: -1px">
      </div>
   </div>
   <transition leave-active-class="fadeOut">
   <div class="page-bg loading-bg" v-if="currentPage === 'loading'">
      <div class="bg-move" :style="bgMove" ref="bg">
         <img src="static/bg-loading.png">
         <img src="static/bg-loading.png" style="margin-left: -1px">
      </div>
   </div>
   </transition>
   <transition enter-active-class="bgIn" leave-active-class="bgOut">
      <div class="page2-bg" v-if="currentPage === 'p2'">
         <img src="static/bg2.png" class="building"/>
         <img src="@/assets/img/spot.png" class="spot"/>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page3-bg" v-if="currentPage === 'p3'">
         <div class="bg-move" :style="bgMove" ref="bg">
            <img src="static/bg3-up.png">
            <img src="static/bg3-up.png">
         </div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page3-bg-bottom" v-if="currentPage === 'p3'">
         <div class="bg-move" :style="bgBottomMove" ref="bgBottom">
            <img src="static/bg3-bottom.png">
            <img src="static/bg3-bottom.png">
         </div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page4-bg" v-if="currentPage === 'p4'">
         <div class="bg-move" :style="bgMove" ref="bg">
            <img src="static/bg4.png">
            <img src="static/bg4.png" style="margin-left: -1px">
         </div>
      </div>
   </transition>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
	   status: {
	      type: String,
         default: 'move'
      }
   },
   data () {
      return {
		   t: 0,
         maxSpeed: 4,
         speed: 4,
         g: 0.05,
         current: 0,
         roadWidth: 0,
         bgSpeedPecent: 0.1,
         bgCurrent: 0,
         bgWidth: 0,
         bgBottomCurrent: 0,
         bgBottomWidth: 0
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      roadsExtraClass () {
         return `roads-${this.currentPage}`
      },
      roadMove () {
         return {
            'transform': `translateX(${this.current}px)`,
            '-webkit-transform': `translateX(${this.current}px)`
         }
      },
      bgMove () {
         return {
            'transform': `translateX(${this.bgCurrent}px)`,
            '-webkit-transform': `translateX(${this.bgCurrent}px)`
         }
      },
      bgBottomMove () {
         return {
            'transform': `translateX(${this.bgBottomCurrent}px)`,
            '-webkit-transform': `translateX(${this.bgBottomCurrent}px)`
         }
      }
   },
   watch: {
      currentPage (val) {
         if (val === '') return
         this.$nextTick(() => {
            this.bgWidth = this.$refs.bg.offsetWidth / 2
            if (val === 'p3') {
               this.bgBottomWidth = this.$refs.bgBottom.offsetWidth / 2
            }
         })
      }
   },
   mounted () {
	   // console.dir(this.$refs.roads)
      this.roadWidth = this.$refs.roads.offsetWidth / 3
      this.current = -this.roadWidth
      this.bgWidth = this.$refs.bg.offsetWidth / 2
	   this.t = setInterval(this.move, 16)
   },
   methods: {
	   move () {
	      if (this.status === 'move') {
	         this.speed += this.g
            if (this.speed >= this.maxSpeed) this.speed = this.maxSpeed
         } else if (this.status === 'stop') {
            this.speed -= this.g
            if (this.speed <= 0) this.speed = 0
         }
	      this.current -= this.speed
         if (this.current <= -this.roadWidth * 2) {
            this.current += this.roadWidth
         }
	      this.bgCurrent -= this.speed * this.bgSpeedPecent
         if (this.bgCurrent <= -this.bgWidth) {
            this.bgCurrent += this.bgWidth
         }
	      this.bgBottomCurrent -= this.speed
         if (this.bgBottomCurrent <= -this.bgBottomWidth) {
            this.bgBottomCurrent += this.bgBottomWidth
         }
      }
   }
}
</script>
