<style>
.home { width: 100%; height: 100vh; overflow: hidden; position: relative;}
.bottom-fix { width: 100%; height: 100vh; overflow: hidden; position: fixed; bottom: 0; left: 0; z-index: 10;}
.bottom-fix-p9 { transform: scale(0.7); bottom: 184px; transform-origin: 50% 100%; transition: all 1s linear}
button { width: 100px; margin: 0 10px;}
</style>

<template>
<div class="home">
   <div style="position: absolute; top: 0; left: 0; z-index: 10000">
      <button @click="gotoPage('p1')">p1</button>
      <button @click="gotoPage('p2')">p2</button>
      <button @click="gotoPage('p3')">p3</button>
      <button @click="gotoPage('p4')">p4</button>
      <button @click="gotoPage('p9')">p9</button>
      <button @click="toggleTap">tag</button>
   </div>
   <z-title></z-title>
   <z-tag></z-tag>
   <z-loading ref="loading"></z-loading>
   <z-page1 ref="p1"></z-page1>
   <z-page2 ref="p2"></z-page2>
   <z-page3 ref="p3"></z-page3>
   <z-page4 ref="p4"></z-page4>
   <z-page5 ref="p5"></z-page5>
   <z-page6 ref="p6"></z-page6>
   <z-page7 ref="p7"></z-page7>
   <z-page8 ref="p8"></z-page8>
   <z-page9 ref="p9"></z-page9>
   <!--<z-page-share ref="share"></z-page-share>-->
   <div class="bottom-fix" :class="{'bottom-fix-p9':currentPage === 'p9'}">
      <z-road :status="roadStatus"></z-road>
      <z-car :status="roadStatus"></z-car>
      <z-car :status="roadStatus" type="1" pos="1" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="2" pos="2" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="3" pos="3" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="4" pos="4" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="5" pos="5" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="3" pos="6" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="4" pos="7" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="1" pos="8" v-if="currentPage === 'p5'"></z-car>
      <z-car :status="roadStatus" type="2" pos="9" v-if="currentPage === 'p5'"></z-car>
   </div>
</div>
</template>

<script>
import zTitle from '@/components/zTitle.vue'
import zTag from '@/components/zTag.vue'
import zRoad from '@/components/zRoad.vue'
import zCar from '@/components/zCar.vue'
import zLoading from '@/components/zLoading.vue'
import zPage1 from '@/components/zPage1.vue'
import zPage2 from '@/components/zPage2.vue'
import zPage3 from '@/components/zPage3.vue'
import zPage4 from '@/components/zPage4.vue'
import zPage5 from '@/components/zPage5.vue'
import zPage6 from '@/components/zPage6.vue'
import zPage7 from '@/components/zPage7.vue'
import zPage8 from '@/components/zPage8.vue'
import zPage9 from '@/components/zPage9.vue'
import zPageShare from '@/components/zPageShare.vue'

export default {
   name: 'home',
   components: {
      zTitle,
      zTag,
      zRoad,
      zCar,
      zLoading,
      zPage1,
      zPage2,
      zPage3,
      zPage4,
      zPage5,
      zPage6,
      zPage7,
      zPage8,
      zPage9,
      zPageShare,
   },
   data() {
      return {
         roadStatus: 'move'
      }
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      tagName () {
         return this.$store.state.tagName
      }
   },
   methods: {
      toggle () {
         if (this.roadStatus === 'move') {
            this.roadStatus = 'stop'
         } else {
            this.roadStatus = 'move'
         }
      },
      toggleTap () {
         this.$store.commit('changeTagName', this.tagName === '' ? 'baozou' : '')
      },
      gotoPage (page) {
         const nowPage = this.$refs[this.currentPage]
         console.log(nowPage)
         this.$store.commit('changePage', '')
         setTimeout(() => {
            this.$store.commit('changePage', page)
            if (page === 'p2') {
               this.roadStatus = 'stop'
            }
         }, nowPage.outTime)
      }
   }
}
</script>
