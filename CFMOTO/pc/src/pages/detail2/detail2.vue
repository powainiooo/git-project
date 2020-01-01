<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .detail-container .bg { width: 100%; display: block;}
   .detail-container .page1 { animation: fadeIn 1s linear 0.3s both;}
   .detail-container .page1 .info-section { width: 100%; position: absolute; top: 50%; left: 0; margin-top: -125px; animation: fadeIn 1s linear 1.3s both;}
   .detail-container .page1 .info-section p { margin-left: auto; margin-right: auto;}
   .detail-container .page2 .bg { opacity: 0; transition: all 1s linear;}
   .detail-container .page2 .info-section { opacity: 0; transition: all 1s linear 1s;}
   .detail-container .page2Show .bg { opacity: 1}
   .detail-container .page2Show .info-section { opacity: 1}
   .detail-container .page4 .content { position: absolute; top: 50%; left: 13%; margin-top: -300px;}
   .detail-container .page8 { width: 880px; margin: 140px auto;}
   .detail-container .page8 h3 { font-size: 36px; color: #ffffff; font-family: TTHBold; margin-bottom: 40px;}
   .detail-container .car-list { display: flex; justify-content: center;}
   .detail-container .car-list li { width: 220px; position: relative;}
   .detail-container .car-list li div { width: 100%; position: relative; transition: all 0.3s ease-out;}
   .detail-container .car-list li div .car { width: 90%; position: absolute; top: 10%; left: 5%; transition: all 0.3s ease-out;}
   .detail-container .car-list li p { font-size: 12px; font-family: TTHR; margin-top: 20px; text-align: center;}
   .detail-container .car-list li:hover { z-index: 5;}
   .detail-container .car-list li:hover div { z-index: 5; transform: scale(1.1)}
   .detail-container .car-list li:hover div .car { z-index: 5; transform: scale(1.2)}
</style>

<template>
   <div class="detail-container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div>
         <div class="pr page1">
            <img src="@/assets/images/detail2/img1.jpg" class="bg"/>
            <div class="info-section">
               <p class="tc"><img src="@/assets/images/logo.png" width="100"/> </p>
               <h3 class="tc">Concept 1</h3>
               <p class="tc">It is not just a vehicle that takes you to your destination. It is not just a machine you have to use every day. </p>
            </div>
         </div>
         <div class="mt100 tc page2" :class="{'page2Show':page2Show}">
            <img src="@/assets/images/detail2/img2.jpg" class="bg">
            <div class="info-section mt60 tc">
               <h3 class="tc">Build for Future</h3>
               <p class="tc" style="margin-left: auto; margin-right: auto;">It is not just a vehicle that takes you to your destination. It is not just a machine you have to use every day. It is so much more! ZEEHO is your environmentally-friendly companion that gives you an amazing riding experience. It represents your dedication towards urban mobility. It symbolizes the high-quality lifestyle you always wished for.</p>
               <a href="#" class="btn1" style="width: 100px; height: 100px; margin: 80px auto;">Watch</a>
            </div>
         </div>
         <div>
            <img src="@/assets/images/detail2/img3.jpg" class="bg"/>
         </div>
         <div class="pr page4">
            <img src="@/assets/images/detail2/img4.jpg" class="bg"/>
            <div class="content">
               <div class="info-section">
                  <h3>Air</h3>
                  <p>Torque like you’ve never experienced before. With the potential to hit 50 km/h in a mind blowing 3.7 seconds*.
                     <br/>Faster is just the beginning.</p>
               </div>
               <div class="info-section mt100">
                  <h3>Quality</h3>
                  <p>We pushed our G1 motor to unleash even more power in the city and on the race track. The result is the G1-S performance motor. It’s faster. More efficient. Delivering more torque than ever.
                     <br/>This is what you’ve been waiting for.</p>
               </div>
            </div>
         </div>
         <div class="page8">
            <h3>You may also like</h3>
            <ul class="car-list">
               <li>
                  <div>
                     <img src="@/assets/images/detail/2.jpg" class="bg"/>
                     <img src="@/assets/images/detail/2.png" class="car"/>
                  </div>
                  <p>ZEEHO S2</p>
               </li>
               <li>
                  <div>
                     <img src="@/assets/images/detail/3.jpg" class="bg"/>
                     <img src="@/assets/images/detail/3.png" class="car"/>
                  </div>
                  <p>ZEEHO S3</p>
               </li>
               <li>
                  <div>
                     <img src="@/assets/images/detail/4.jpg" class="bg"/>
                     <img src="@/assets/images/detail/4.png" class="car"/>
                  </div>
                  <p>ZEEHO S4</p>
               </li>
               <li>
                  <div>
                     <img src="@/assets/images/detail/5.jpg" class="bg"/>
                     <img src="@/assets/images/detail/5.png" class="car"/>
                  </div>
                  <p>ZEEHO S5</p>
               </li>
            </ul>
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
         page2Show: false
      }
   },
   mounted () {
      const self = this
      window.onscroll = function () {
         const st = document.documentElement.scrollTop
         console.log(st)
         if (st > 800) {
            self.page2Show = true
         }
      }
   }
}
</script>
