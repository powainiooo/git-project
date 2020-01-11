<style scoped>
.z-road { width: 100%; height: 60vh; overflow: hidden; position: absolute; bottom: 0; left: 0; z-index: 0;}
.z-road .roads { width: 100%; position: absolute; bottom: 0; left: 0; transition: transform 1s linear; transform-origin: 0 100%;}
.z-road .roads-loading { transform: scale(0.6); transform-origin: 0 100%;}
.z-road .roads-loading-over { transform: scale(1); transform-origin: 0 100%;}
.z-road .roads- { transform-origin: 50% 0; }
.z-road .roads-p1 { transition-duration: 2s; transform-origin: 50% 0; }
.z-road .roads-p2 { transform: scale(1.85); transform-origin: 50% 0; }
.z-road .roads .roads-move { width: 2266px; height: 146px; background: url('../assets/img/road.png') repeat-x; background-size: 100% 100%;}
.z-road .roads img { width: calc(100% / 3); display: block;}

.page-bg { width: 100%; position: absolute; left: 0; overflow: hidden;}
.page-bg .bg-move {background-repeat: repeat-x; background-size: 100% 100%;}

.loading-bg {bottom: 86px;}
.loading-bg .bg-move { width: 1380px; height: 52px; background-image: url('../assets/img/bg-loading.png');}

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
.fadeIn { animation: fadeIn 1s linear}
.fadeOut { animation: fadeOut 0.5s linear}

.page3-bg {bottom: 144px;}
.page3-bg .bg-move { width: 1590px; height: 200px;}
.page3-bg-bottom {bottom: 0;}
.page3-bg-bottom .bg-move { width: 1820px; height: 80px;}

.page4-bg {bottom: 110px;}
.page4-bg .bg-move { width: 1990px; height: 340px;}

.page5-back {bottom: 146px;}
.page5-back .bg-move { width: 2440px; height: 430px;}
.page5-front {bottom: 0;}
.page5-front .bg-move { width: 1890px; height: 320px;}

.page6-back {bottom: 138px;}
.page6-back .bg-move { width: 3120px; height: 630px;}
.page6-front {bottom: 0;}
.page6-front .bg-move { width: 1030px; height: 74px;}

.page8-back {bottom: 144px;}
.page8-back .bg-move { width: 2750px; height: 490px;}
.page8-front {bottom: 0;}
.page8-front .bg-move { width: 2540px; height: 440px;}

.page9-bg {bottom: 140px;}
.page9-bg .bg-move { width: 2060px; height: 390px;}
</style>

<template>
<div class="z-road">
   <div class="roads" :class="roadsExtraClass" v-if="currentPage !== 'share'">
      <div class="roads-move" :style="roadMove" ref="roads">
      </div>
   </div>
   <transition leave-active-class="fadeOut">
   <div class="page-bg loading-bg" v-if="currentPage === 'loading'">
      <div class="bg-move" :style="bgMove" ref="bg"></div>
   </div>
   </transition>
   <transition enter-active-class="bgIn" leave-active-class="fadeOut">
      <div class="page2-bg" v-if="currentPage === 'p2'">
         <img :src="imgSrc+'static/bg2.png'" class="building"/>
         <img src="@/assets/img/spot.png" class="spot" v-if="type !== 'gasoline'"/>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page3-bg" v-if="currentPage === 'p3'">
         <div class="bg-move" :style="bgMove3" ref="bg"></div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page3-bg-bottom" v-if="currentPage === 'p3'">
         <div class="bg-move" :style="bgBottomMove3" ref="bgBottom"></div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page4-bg" v-if="currentPage === 'p4'">
         <div class="bg-move" :style="bgMove4" ref="bg"></div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page5-back" v-if="currentPage === 'p5'">
         <div class="bg-move" :style="bgMove5" ref="bg"></div>
      </div>
   </transition>
   <!--<transition enter-active-class="fadeIn" leave-active-class="fadeOut">-->
      <!--<div class="page-bg page5-front" v-if="currentPage === 'p5'">-->
         <!--<div class="bg-move" :style="bgBottomMove" ref="bg"></div>-->
      <!--</div>-->
   <!--</transition>-->
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page6-back" v-if="currentPage === 'p6'">
         <div class="bg-move" :style="bgMove6" ref="bg"></div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page6-front" v-if="currentPage === 'p6'">
         <div class="bg-move" :style="bgBottomMove6" ref="bg"></div>
      </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page8-back" v-if="currentPage === 'p7'">
         <div class="bg-move" :style="bgMove7" ref="bg"></div>
      </div>
   </transition>
   <!--<transition enter-active-class="fadeIn" leave-active-class="fadeOut">-->
      <!--<div class="page-bg page8-front" v-if="currentPage === 'p8'">-->
         <!--<div class="bg-move" :style="bgBottomMove" ref="bg"></div>-->
      <!--</div>-->
   <!--</transition>-->
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="page-bg page9-bg" v-if="currentPage === 'p8'">
         <div class="bg-move" :style="bgMove8" ref="bg"></div>
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
	data() {
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
         bgBottomWidth: 0,
      }
	},
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      currentPage () {
         return this.$store.state.currentPage
      },
      type () {
         return this.$store.state.powerMode
      },
      roadsExtraClass () {
         return `roads-${this.currentPage}`
      },
      roadMove () {
         return {
            'background-position-x': `${this.current}px`,
         }
      },
      bgMove () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
         }
      },
      bgMove3 () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg3-up.png')`
         }
      },
      bgMove4 () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg4.png')`
         }
      },
      bgMove5 () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg5-back.png')`
         }
      },
      bgMove6 () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg6-back.png')`
         }
      },
      bgMove7 () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg7-back.png')`
         }
      },
      bgMove8 () {
         return {
            'background-position-x': `${this.bgCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg8.png')`
         }
      },
      bgBottomMove () {
         return {
            'background-position-x': `${this.bgBottomCurrent}px`,
         }
      },
      bgBottomMove3 () {
         return {
            'background-position-x': `${this.bgBottomCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg3-bottom.png')`
         }
      },
      bgBottomMove6 () {
         return {
            'background-position-x': `${this.bgBottomCurrent}px`,
            'background-image': `url('${this.imgSrc}static/bg6-front.png')`
         }
      },
      p5Data () {
         return this.$store.state.pageData.P5
      },
   },
   watch: {
      currentPage (val) {
         if (val === '') return
         this.$nextTick(() => {
            this.bgCurrent = 0
            this.bgBottomCurrent = 0
            this.bgSpeedPecent = 0.1
            this.maxSpeed = 4
            if (val === 'p6') {
               this.bgSpeedPecent = 0.4
            } else if (val === 'p5') {
               if (this.p5Data.tag === 3) {
                  this.maxSpeed = 1
               } else {
                  this.maxSpeed = 4
               }
            } else if (val === 'p8') {
               this.bgSpeedPecent = 0.3
            }
         })
      }
   },
   mounted () {
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
         // if (this.current <= -this.roadWidth * 2) {
         //    this.current += this.roadWidth
         // }
	      this.bgCurrent -= this.speed * this.bgSpeedPecent
         // if (this.bgCurrent <= -this.bgWidth) {
         //    this.bgCurrent += this.bgWidth
         // }
	      this.bgBottomCurrent -= this.speed
         // if (this.bgBottomCurrent <= -this.bgBottomWidth) {
         //    this.bgBottomCurrent += this.bgBottomWidth
         // }
      }
   }
}
</script>
