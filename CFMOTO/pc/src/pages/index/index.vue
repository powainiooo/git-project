<style>
@import "../../assets/css/reset.css";
@import "../../assets/css/fonts.css";
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
</style>

<template>
   <div id="app" class="index-container">
      <z-header></z-header>
      <z-menu></z-menu>
      <swiper :options="swiperOption" ref="mySwiper" @slideChange="slideChange">
         <!-- slides -->
         <swiper-slide>I'm Slide 1</swiper-slide>
         <swiper-slide>I'm Slide 2</swiper-slide>
         <swiper-slide>I'm Slide 3</swiper-slide>
         <swiper-slide>I'm Slide 4</swiper-slide>
         <swiper-slide>I'm Slide 5</swiper-slide>
         <swiper-slide>I'm Slide 6</swiper-slide>
         <swiper-slide>I'm Slide 7</swiper-slide>
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
import zHeader from '@/components/header.vue'
import zMenu from '@/components/menu.vue'
export default {
   name: 'index',
   components: { zHeader, zMenu },
   data () {
      return {
         navIndex: 1,
         swiperOption: {
            direction : 'vertical',
            height : window.innerHeight,
            mousewheel: true
         }
      }
   },
   methods: {
      slideChange (e) {
         console.log(this.$refs.mySwiper)
         this.navIndex = this.$refs.mySwiper.swiper.activeIndex + 1
      }
   }
}
</script>
