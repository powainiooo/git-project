<style>
.home { width: 100%; height: 100vh; overflow: hidden; position: relative;}
button { width: 100px; margin: 0 10px;}
.home .arrow { width: 40px; position: absolute; top: 50%; right: 42px; margin-top: -16px; z-index: 50;}
.home .fadeInA { animation: fadeIn 0.3s linear;}
.home .fadeOutA { animation: fadeOut 0.3s linear;}
</style>

<template>
<div class="home" @touchstart="tstart" @touchend="tend" v-if="showPages">
   <!--<div style="position: absolute; top: 0; left: 0; z-index: 10000">-->
      <!--<button @click="changePage('prev')">prev</button>-->
      <!--<button @click="changePage('next')">next</button>-->
   <!--</div>-->
   <z-title></z-title>
   <z-tag></z-tag>
   <z-loading ref="loading"></z-loading>
   <z-page0 ref="p0"></z-page0>
   <z-page1 ref="p1"></z-page1>
   <z-page2 ref="p2"></z-page2>
   <z-page3 ref="p3"></z-page3>
   <z-page4 ref="p4"></z-page4>
   <z-page5 ref="p5"></z-page5>
   <z-page6 ref="p6"></z-page6>
   <z-page7 ref="p7"></z-page7>
   <z-page8 ref="p8"></z-page8>
   <z-page9 ref="p9"></z-page9>
   <z-page-share ref="p10"></z-page-share>
   <transition enter-active-class="fadeInA" leave-active-class="fadeOutA">
      <img src="@/assets/img/arrow.png" class="arrow" v-if="canChangePage && currentPage !== 'p0'"/>
   </transition>

</div>
</template>

<script>
import zTitle from '@/components/zTitle.vue'
import zTag from '@/components/zTag.vue'
import zRoad from '@/components/zRoad.vue'
import zCar from '@/components/zCar.vue'
import zLoading from '@/components/zLoading.vue'
import zPage0 from '@/components/zPage0.vue'
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
      zPage0,
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
         pageIndex: 0,
         tMove: 0,
         startTime: 0,
         startX: 0,
         showPages: true
      }
   },
   mounted () {
      this.startTime = new Date().getTime()
      window.intoPageStartTime = this.startTime
   },
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      tagName () {
         return this.$store.state.tagName
      },
      pageList () {
         return this.$store.state.pageList
         // return ['p0', 'p9', 'p10']
      },
      canChangePage () {
         return this.$store.state.canChangePage
      }
   },
   watch: {
      currentPage (page, lastPage) {
         // console.log('page:'+page+';lastPage:'+lastPage)
         if (lastPage !== '' && lastPage !== 'loading-over') {
            const time = new Date().getTime()
            if (lastPage === 'loading') {
               window.footPrinter.stayTime.stayTimeP1 += time - this.startTime
            } else if (lastPage === 'p10') {
               window.footPrinter.stayTime.stayTimeP1 += time - this.startTime
            } else {
               let i = parseInt(lastPage.replace('p', ''))
               window.footPrinter.stayTime[`stayTimeP${i + 2}`] += time - this.startTime
            }
            this.startTime = time
            window.intoPageStartTime = time
         }

         if (page !== '' && page !== 'loading-over') {
            if (page === 'p10') {
               window.footPrinter.currentPage = 'stayTimeP24'
            } else {
               let i = parseInt(page.replace('p', ''))
               window.footPrinter.currentPage = `stayTimeP${i + 2}`
            }
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
         // this.$store.commit('changePage', page)
         setTimeout(() => {
            this.$store.commit('changePage', page)
         }, nowPage.outTime)
      },
      tstart (e) {
         if (!this.canChangePage) return
         this.startX = e.touches[0].pageX
      },
      tend (e) {
         if (!this.canChangePage) return
         const endx = e.changedTouches[0].pageX
         if (endx < this.startX - 50) {
            this.changePage('next')
         } else if (endx > this.startX + 50) {
            this.changePage('prev')
         }
      },
      review () {
         this.showPages = false
         this.$nextTick(() => {
            this.showPages = true
            this.pageIndex = 0
            this.$nextTick(() => {
               this.gotoPage(this.pageList[this.pageIndex])
            })
         })
      }
   }
}
</script>
