<style>
.home { width: 100%; height: 100vh; overflow: hidden; position: relative;}
.bottom-fix { width: 100%; height: 100vh; overflow: hidden; position: fixed; bottom: 0; left: 0; z-index: 10;}
.bottom-fix-p9 { transform: scale(0.7); bottom: 184px; transform-origin: 50% 100%; transition: all 1s linear}
button { width: 100px; margin: 0 10px;}
</style>

<template>
<div class="home">
   <div style="position: absolute; top: 0; left: 0; z-index: 10000">
      <button @click="changePage('prev')">prev</button>
      <button @click="changePage('next')">next</button>
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
   <z-page-share ref="share"></z-page-share>
   <!-- :class="{'bottom-fix-p9':currentPage === 'p9'}"-->
   <div class="bottom-fix" :style="{'z-index':currentPage === 'p5' ? 10 : 5}">
      <!--<z-road :status="roadStatus"></z-road>-->
      <!--<z-car :status="roadStatus"></z-car>-->

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
         roadStatus: 'move',
         pageList: ['p1', 'p5', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'share'],
         pageIndex: 0,
         tMove: 0
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
   watch: {
      currentPage (page) {
         if (page === 'p2') {
            this.roadStatus = 'stop'
         } else if (page === 'p5') {
            this.roadStatus = 'move'
            // this.tMove = setInterval(() => {
            //    this.roadStatus = this.roadStatus === 'stop' ? 'move' : 'stop'
            // }, 3000)
         } else {
            this.roadStatus = 'move'
         }
      }
   },
   methods: {
      changePage (direct) {
         if (direct === 'prev') {
            this.pageIndex = this.pageIndex === 0 ? 0 : this.pageIndex - 1
         } else if (direct === 'next') {
            this.pageIndex = this.pageIndex === this.pageList.length - 1 ? this.pageList.length - 1 : this.pageIndex + 1
         }
         this.gotoPage(this.pageList[this.pageIndex])
      },
      toggleTap () {
         this.$store.commit('changeTagName', this.tagName === '' ? '暴走老司机' : '')
      },
      gotoPage (page) {
         const nowPage = this.$refs[this.currentPage]
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
