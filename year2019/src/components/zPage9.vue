<style scoped>
.z-page9 { width: 100%; height: 200px; position: fixed; bottom: 0; left: 0; z-index: 12; transition: all 1s linear;}
.z-page9-show { height: 1060px; left: 0; bottom: 100px;}
.z-page9 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page9 .fadeInRoad { animation: fadeIn 1s linear both;}
.z-page9 .fadeOut { animation: fadeOut 0.4s linear;}
.z-page9 .fadeOut0 { animation: fadeOut 0 linear;}
.z-page9 .calandar { width: 600px; height: 1060px; background: url("../assets/img/calandar.png") no-repeat; background-size: 100%; position: absolute; left: 80px; top: 0;}
.z-page9 .calandar .paper { width: 580px; position: absolute; left: 4px; top: 160px; z-index: 9;}
.z-page9 .calandar .operas { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 20;}
.z-page9 .piece { width: 584px; height: 880px; background-color: #ffffff; position: absolute; top: 164px; left: 2px; z-index: 10;}
.z-page9 .frame { width: 540px; height: 810px; border: 2px solid #333333; margin: 56px 0 0 24px; position: relative;}
.z-page9 .content { line-height: 1.5; color: #333333; font-size: 30px;}
.z-page9 .content span { color: #F84F1C;}
.z-page9 .line { position: relative;}
.z-page9 .line:before { content: ''; width: 60px; height: 2px; background-color: #333333; position: absolute; top: -25px; left: 0;}
.z-page9 .diary .content { margin: 100px 0 0 60px;}
.z-page9 .diary .point { width: 14px; display: block; margin: 100px auto 0 auto}
.z-page9 .diary .hand { width: 32px; position: absolute; left: 54%; top: 46%; animation: hand 1s linear infinite;}
@keyframes hand {
   0% { transform: translateY(0)}
   70% { transform: translateY(30px); opacity: 1}
   100% { transform: translateY(30px); opacity: 1}
}
.z-page9 .piece .roads { width: 100vw; height: 100px; position: absolute; left: 30px; bottom: -8px; transform: scale(0.7);  transform-origin: 0 0;}
.z-page9 .bottom { height: 100px; position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; transition: all 1s linear; transform-origin: 50% 100%;}
.z-page9-show .bottom { transform: scale(0.7); bottom: 38px;}
.z-page9 .pageDown { animation: pageDown 1s ease-out; transform-origin: 0 0;}
@keyframes pageDown {
   0% { transform: translateY(0) rotateZ(0deg); opacity: 1}
   10% { transform: translateY(150px) rotateZ(6deg); opacity: 1}
   100% { transform: translateY(1500px); opacity: 0}
}
</style>

<template>
<div class="z-page9" :class="{'z-page9-show': showParts}" :style="{bottom: bottom + 'px'}">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut0">
      <div class="calandar" v-show="showParts" ref="calandar">
         <div class="operas" @touchstart="tstart" @touchend="tend"></div>
         <img src="@/assets/img/paper.png" class="paper">
         <transition leave-active-class="pageDown">
         <div class="piece" v-if="showHint">
            <div class="frame">
               <div class="diary">
                  <div class="content line">还记得过去一年<br/>你都走过哪些地方<br/>有多少人陪你看过多少风景<br/>他们都还好吗？</div>
                  <img src="@/assets/img/point.png" class="point"/>
                  <img src="@/assets/img/hand.png" class="hand"/>
                  <div class="content" style="text-align: center; margin: 30px 0 0 0; color: #0475B5;">下拉开启你的穿越时空之旅</div>
               </div>
            </div>
            <div class="roads">
               <z-road :status="roadStatus"></z-road>
               <z-car :status="roadStatus"></z-car>
            </div>
         </div>
         </transition>
         <transition-group leave-active-class="pageDown">
         <z-diary v-for="i in showKeyList" :key="i" :keys="i" v-if="fitKeyList.includes(i)"></z-diary>
         </transition-group>
      </div>
   </transition>

   <transition enter-active-class="fadeIn" leave-active-class="fadeOut0">
   <div class="bottom" v-if="showBottom">
      <transition enter-active-class="fadeInRoad" leave-active-class="fadeOut0">
      <z-road :status="roadStatus" v-if="showRoad"></z-road>
      </transition>
      <z-car :status="roadStatus"></z-car>
      <transition-group enter-active-class="fadeIn" leave-active-class="fadeOut">
      <!--<z-car :status="roadStatus" type="1" pos="1" v-if="showCars"></z-car>-->
      <!--<z-car :status="roadStatus" type="2" pos="2" v-if="showCars"></z-car>-->
      <!--<z-car :status="roadStatus" type="3" pos="3" v-if="showCars"></z-car>-->
      <z-car :status="roadStatus" type="4" pos="4" v-if="showCars" :key="4"></z-car>
      <z-car :status="roadStatus" type="5" pos="5" v-if="showCars" :key="5"></z-car>
      <!--<z-car :status="roadStatus" type="3" pos="6" v-if="showCars"></z-car>-->
      <z-car :status="roadStatus" type="4" pos="7" v-if="showCars" :key="7"></z-car>
      <z-car :status="roadStatus" type="1" pos="8" v-if="showCars" :key="8"></z-car>
      <z-car :status="roadStatus" type="2" pos="9" v-if="showCars" :key="9"></z-car>
      </transition-group>
   </div>
   </transition>
</div>
</template>

<script type='es6'>
import zCar from '@/components/zCar.vue'
import zRoad from '@/components/zRoad.vue'
import zDiary from '@/components/zDiary.vue'
export default {
   name: 'app',
   components: {zCar, zRoad, zDiary},
   data() {
      return {
         outTime: 0,
         showHint: true,
         // useKeyList: ['city', 'travel', 'late', 'high', 'air', 'status', 'energy', 'unlock', 'whistle', 'music', 'game', 'learn'],
         showKeyList: [],
         fitKeyList: [],
         startY: 0,
         roadStatus: 'move',
         showBottom: true,
         showRoad: true,
         bottom: 0,
         startTime: 0,
         lastPage: ''
      }
   },
   watch: {
      currentPage (page, lastPage) {
         if (lastPage !== '') this.lastPage = lastPage
         this.bottom = 0
         this.showBottom = true
         this.showRoad = true
         clearInterval(this.tMove)
         if (page === 'p9') {
            this.$nextTick(() => {
               this.showKeyList = this.useKeyList.reverse()
               this.fitKeyList = [].concat(this.useKeyList)
               this.bottom = (window.innerHeight - this.$refs.calandar.offsetHeight) / 2
            })
            this.roadStatus = 'stop'
            setTimeout(() => {
               this.showBottom = false
               this.startTime = new Date().getTime()
            }, 1500)
            this.$store.commit('setCanChangePage', false)
         } else if (page === 'p2') {
            this.roadStatus = 'stop'
         } else if (page === 'p5') {
            // this.roadStatus = 'stop'
            if (this.showCars) {
               this.tMove = setInterval(() => {
                  this.roadStatus = this.roadStatus === 'stop' ? 'move' : 'stop'
               }, 4000)
            }
         } else if (page === 'p10') {
            this.showBottom = false
            this.bottom = (window.innerHeight - this.$refs.calandar.offsetHeight) / 2
         } else if (page === 'p0') {
            this.showRoad = false
            this.roadStatus = 'stop'
         } else if (page === 'loading-over') {
            this.showRoad = false
            this.roadStatus = 'stop'
         } else {
            this.roadStatus = 'move'
         }
         if (this.lastPage === 'p9') {
            this.showRoad = false
         } else if (this.lastPage === 'p10') {
            this.showRoad = false
         }
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p9' || this.currentPage === 'p10'
      },
      tagName () {
         return this.$store.state.tagName
      },
      useKeyList () {
         return this.$store.state.useKeyList
      },
      keyList () {
         return this.$store.state.keyList
      },
      canChangePage () {
         return this.$store.state.canChangePage
      },
      showCars () {
         return this.currentPage === 'p5' && this.tagName === '上班族'
      }
   },
   methods: {
      slidePages () {
         if (this.fitKeyList.length === 1) return
         if (this.showHint) {
            this.showHint = false
            this.setP9PageName()
         } else {
            this.fitKeyList.pop()
            this.setP9PageName()
         }
         if (this.fitKeyList.length === 1) {
            this.$store.commit('setCanChangePage', true)
         }
      },
      setP9PageName () {
         let time = new Date().getTime()
         let key = this.fitKeyList[this.fitKeyList.length - 1]
         let i = this.keyList.findIndex(i => i === key)
         let name = `stayTimeP${i + 12}`
         window.footPrinter.outPage = i + 12
         if (window.footPrinter.outPage > window.footPrinter.maxPage) window.footPrinter.maxPage = window.footPrinter.outPage
         window.currentPage = name
         window.footPrinter[name] += time - this.startTime
         this.startTime = time
      },
      tstart (e) {
         if (!this.canChangePage) {
            e.stopPropagation()
            this.startY = e.touches[0].pageY
         }
      },
      tend (e) {
         if (!this.canChangePage) {
            e.stopPropagation()
            const endy = e.changedTouches[0].pageY
            if (endy > this.startY + 50) {
               this.slidePages()
            }
         }
      }
   }
}
</script>
