<style scoped>
.z-page9 { width: 100%; height: 100vh; overflow: hidden; position: fixed; top: 0; left: 0; z-index: 12; background: url("../assets/img/bg.jpg") no-repeat; background-size: cover;}
.z-page9 .fadeIn { animation: fadeIn 1s linear 1.5s both;}
.z-page9 .fadeOut { animation: fadeOut 1s linear;}
.z-page9 .calandar { width: 600px; height: 1060px; background: url("../assets/img/calandar.png") no-repeat; background-size: 100%; position: fixed; left: 80px; top: 50%; margin-top: -540px}
.z-page9 .calandar .paper { width: 580px; position: absolute; left: 4px; top: 160px;}
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
.z-page9 .diary .bottom { width: 100vw; position: absolute; bottom: 6px; left: 6px; transform: scale(0.7);transform-origin: 0% 100%;}
.z-page9 .pageDown { animation: pageDown 1s ease-out; transform-origin: 0 0;}
@keyframes pageDown {
   0% { transform: translateY(0) rotateZ(0deg); opacity: 1}
   10% { transform: translateY(150px) rotateZ(6deg); opacity: 1}
   100% { transform: translateY(1500px); opacity: 0}
}
</style>

<template>
<div class="z-page9" :style="{'z-index':showParts ? 20 : 5}">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="calandar" v-if="showParts" ref="calandar" @touchstart="tstart" @touchend="tend">
         <img src="@/assets/img/paper.png" class="paper">
         <transition leave-active-class="pageDown">
         <div class="piece" v-if="showHint">
            <div class="frame">
               <div class="diary">
                  <div class="content line">还记得过去一年<br/>你都走过哪些地方<br/>有多少人陪你看过多少风景<br/>他们都还好吗？</div>
                  <img src="@/assets/img/point.png" class="point"/>
                  <img src="@/assets/img/hand.png" class="hand"/>
                  <div class="content" style="text-align: center; margin: 30px 0 0 0; color: #0475B5;">下拉开启你的穿越时空之旅</div>
                  <div class="bottom">
                     <z-road status="stop"></z-road>
                     <z-car status="stop"></z-car>
                  </div>
               </div>
            </div>
         </div>
         </transition>
         <transition-group leave-active-class="pageDown">
         <z-diary v-for="i in showKeyList" :key="i" :keys="i" v-if="fitKeyList.includes(i)"></z-diary>
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
         outTime: 2000,
         showHint: true,
         keyList: ['date_city', 'date_mile', 'date_night', 'date_city_hight', 'date_air_open', 'date_vehicle_status', 'date_energy', 'date_door_unlock', 'date_whistle', 'date_music', 'date_game', 'date_learn'],
         showKeyList: [],
         fitKeyList: [],
         startY: 0
      }
   },
   watch: {
      currentPage (page) {
         if (page === 'p9') {
            this.$nextTick(() => {
               console.dir(this.$refs.calandar)
               this.showKeyList = this.keyList.reverse()
               this.fitKeyList = [].concat(this.keyList)
               console.log(this.fitKeyList)
            })
         }
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p9'
      },
   },
   methods: {
      slidePages () {
         if (this.showHint) {
            this.showHint = false
         } else {
            this.fitKeyList.pop()
         }
         console.log(this.fitKeyList)
      },
      tstart (e) {
         this.startY = e.touches[0].pageY
      },
      tend (e) {
         const endy = e.changedTouches[0].pageY
         if (endy > this.startY + 50) {
            this.slidePages()
         }
      }
   }
}
</script>
