<style>
@import "../../assets/css/reset.css";
@import "../../assets/css/fonts.css";
@import "../../assets/css/animate.min.css";
@import "../../assets/css/common.css";
body { background-color: #000000; color: #fff}
.index-container { width: 100%; height: 100vh; overflow: hidden;}
.index-container .pagination { height: 126px; position: fixed; top: 50%; right: 30px; margin-top: -53px; z-index: 100;}
.index-container .pagination:after { content: ''; width: 1px; height: 100%; background-color: #ffd400; opacity: 0.5; position: absolute; right: 0; top: 0;}
.index-container .pagination li { width: 20px; height: 18px; overflow: hidden;}
.index-container .pagination li div { width: 100%; height: 100%; background-color: #ffd400; font-size: 12px; display: flex; justify-content: center; align-items: center; font-family: TTHR; color: #000000; transform-origin: 100% 50%}
.index-container .navShow { animation: navShow 0.3s ease-out both;}
.index-container .navHide { animation: navHide 0.3s ease-out both;}
@keyframes navShow {
   0% { transform: translateX(20px)}
   100% { transform: translateX(0)}
}
@keyframes navHide {
   0% { transform: translateX(0)}
   100% { transform: translateX(20px)}
}
.index-container .index-swiper { height: 100vh}
.index-container .footer { height: 190px;}

@keyframes infoIn {
   0% { transform: translateX(-100px); opacity: 0;}
   100% { transform: translateX(0); opacity: 1;}
}
</style>

<template>
<div id="app" class="index-container">
   <top-nav></top-nav>
   <z-menu></z-menu>
   <swiper :options="swiperOption" ref="mySwiper" @slideChange="slideChange" class="index-swiper">
      <!-- slides -->
      <swiper-slide><z-page1 v-if="navIndex === 1"></z-page1></swiper-slide>
      <swiper-slide><z-page2 v-if="navIndex === 2"></z-page2></swiper-slide>
      <swiper-slide><z-page3 v-if="navIndex === 3"></z-page3></swiper-slide>
      <swiper-slide><z-page4 v-if="navIndex === 4"></z-page4></swiper-slide>
      <swiper-slide><z-page5 v-if="navIndex === 5"></z-page5></swiper-slide>
      <swiper-slide><z-page6 v-if="navIndex === 6"></z-page6></swiper-slide>
      <swiper-slide><z-page7 v-if="navIndex === 7" ref="page7"></z-page7></swiper-slide>
      <swiper-slide class="footer"><page-footer></page-footer></swiper-slide>
   </swiper>
   <ul class="pagination">
      <li v-for="i in 7" :key="i">
         <transition enter-active-class="navShow" leave-active-class="navHide">
            <div v-if="i === navIndex">{{i}}</div>
         </transition>
      </li>
   </ul>
</div>
</template>

<script>
import topNav from '@/components/topNav.vue'
import zMenu from '@/components/menu.vue'
import zPage1 from '@/components/index/page1.vue'
import zPage2 from '@/components/index/page2.vue'
import zPage3 from '@/components/index/page3.vue'
import zPage4 from '@/components/index/page4.vue'
import zPage5 from '@/components/index/page5.vue'
import zPage6 from '@/components/index/page6.vue'
import zPage7 from '@/components/index/page7.vue'
import pageFooter from '@/components/index/pageFooter.vue'
function getQueryVariable (variable) {
   const query = window.location.search.substring(1)
   const vars = query.split('&')
   for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=')
      if (pair[0] === variable) { return pair[1] }
   }
   return (false)
}
const page = getQueryVariable('page')
export default {
   name: 'index',
   components: { topNav, zMenu, zPage1, zPage2, zPage3, zPage4, zPage5, zPage6, zPage7, pageFooter },
   data () {
      return {
         navIndex: 1,
         swiperOption: {
            // initialSlide: 7,
            direction: 'vertical',
            simulateTouch: false,
            // height: window.innerHeight,
            slidesPerView: 'auto',
            mousewheel: true
         }
      }
   },
   provide () {
      return {
         togglePage: this.togglePage
      }
   },
   mounted () {
      this.togglePage(page)
   },
   methods: {
      slideChange (e) {
         console.log(this.$refs.mySwiper)
         this.navIndex = this.$refs.mySwiper.swiper.activeIndex + 1
      },
      togglePage (page) {
         if (page === 'aftersales') {
            page = 6
            this.$refs.page7.page = 'aftersales'
         }
         this.$refs.mySwiper.swiper.slideTo(page)
      }
   }
}
</script>
