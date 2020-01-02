<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .dare-container { width: 100%; overflow: hidden;}
   .dare-container .info-section { margin-left: 12%; animation: slideInLeft100 0.5s ease-out 0.5s both;}
   .dare-container .list1 { width: 100%; display: flex; justify-content: flex-end; margin-top: 120px; position: relative;}
   .dare-container .list1:before { content: ''; width: 470px; height: 225px; background: url("../../assets/images/dare/icon.png") no-repeat; position: absolute; right: 190px; top: -50px; z-index: 10; animation: fadeIn 0.3s ease-out 1.5s both;}
   .dare-container .list1 li { width: 500px;}
   .dare-container .list1 li img { display: block; animation: proIn 0.4s cubic-bezier(.26,.72,.78,1.15) both;}
   .dare-container .list1 li:nth-child(2) { transform: translateY(-70px)}
   .dare-container .bg1 { margin-top: 220px;}
   .dare-container .bg1 .info-section { width: 100%; position: absolute; top: 0; left: 0;}
   @keyframes proIn {
      0% { transform: scale(0);}
      100% { transform: scale(1);}
   }
   .dare-container .page2-list { width: 1350px; margin: 0 auto; display: flex; flex-wrap: wrap;}
   .dare-container .page2-list li { width: 450px; height: 250px;}
   .dare-container .page2-list li img { width: 100%; height: 100%; transform: scale(0); transition: all 0.4s cubic-bezier(.26,.72,.78,1.15)}
   .dare-container .page2-list li:nth-child(2) img { transition-delay: 0.1s}
   .dare-container .page2-list li:nth-child(3) img { transition-delay: 0.2s}
   .dare-container .page2-list li:nth-child(4) img { transition-delay: 0.3s}
   .dare-container .page2-list li:nth-child(5) img { transition-delay: 0.4s}
   .dare-container .page2-list li:nth-child(6) img { transition-delay: 0.5s}
   .dare-container .page2-list-show li img { transform: scale(1)}
   .dare-container .page3 { opacity: 0; transition: all 1s linear}
   .dare-container .page3-show { opacity: 1;}
</style>

<template>
   <div class="dare-container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div>
         <div class="info-section mt200">
            <h3>ZEEHO is for those who dare.</h3>
            <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
         </div>
         <ul class="list1">
            <li>
               <img src="@/assets/images/dare/img1.jpg" style="animation-delay: 0.6s"/>
               <img src="@/assets/images/dare/img2.jpg" style="animation-delay: 0.8s"/>
            </li>
            <li>
               <img src="@/assets/images/dare/img3.jpg" style="animation-delay: 1s"/>
               <img src="@/assets/images/dare/img4.jpg" style="animation-delay: 0.7s"/>
            </li>
            <li>
               <img src="@/assets/images/dare/img5.jpg" style="animation-delay: 0.9s"/>
               <img src="@/assets/images/dare/img6.jpg" style="animation-delay: 1.1s"/>
            </li>
         </ul>
         <div style="height: 180px;" class="mt150">
            <div class="info-section" v-if="showP2Info">
               <h3>What do we offer?</h3>
               <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
            </div>
         </div>
         <div class="tc mt80">
            <ul class="page2-list" :class="{'page2-list-show':showImgs}">
               <li><img src="@/assets/images/dare/img7-1.jpg"></li>
               <li><img src="@/assets/images/dare/img7-2.jpg"></li>
               <li><img src="@/assets/images/dare/img7-3.jpg"></li>
               <li><img src="@/assets/images/dare/img7-4.jpg"></li>
               <li><img src="@/assets/images/dare/img7-5.jpg"></li>
               <li><img src="@/assets/images/dare/img7-6.jpg"></li>
            </ul>
         </div>
         <div class="bg1 pr page3" :class="{'page3-show':p3Show}">
            <img src="@/assets/images/dare/bg1.jpg" style="width: 100%; display: block;"/>
            <div class="info-section" style="margin-left: 0;">
               <h3 class="tc">Choose ZEEHO!</h3>
               <h3 class="tc" style="font-size: 48px;">It is time to make every day riding extraordinary</h3>
               <p class="tc" style="width: 1030px; margin-left: auto; margin-right: auto;">As ZEEHO, it is our desire to create positive change in the world by enriching your life! We know that everyday riding can be fun! That being stuck in traffic does not bother you, because you just enjoy being on your scooter. </p>
            </div>
         </div>
      </div>
      <page-footer></page-footer>
   </div>
</template>

<script type="es6">
import topNav from '@/components/topNav.vue'
import zMenu from '@/components/menu.vue'
import pageFooter from '@/components/index/pageFooter.vue'
export default {
   name: 'App',
   components: { topNav, zMenu, pageFooter },
   data () {
      return {
         showP2Info: false,
         showImgs: false,
         p3Show: false
      }
   },
   mounted () {
      const self = this
      window.onscroll = function () {
         const st = document.documentElement.scrollTop
         if (st > 700) {
            self.showP2Info = true
         }
         if (st > 1100) {
            self.showImgs = true
         }
         if (st > 1800) {
            self.p3Show = true
         }
      }
   }
}
</script>
