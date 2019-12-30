<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .detail-container .bg { width: 100%; display: block;}
   .detail-container .page1 .btn1 { position: absolute; top: 40%; right: 0;}
   .detail-container .page1 .info-section { position: absolute; top: 50%; left: 12%; margin-top: -165px;}
   .detail-container .page2 .btn1 { width: 100px; height: 100px; margin-left: -50px; position: absolute; left: 50%; bottom: 0;}
   .detail-container .page3 .icon { width: 400px; height: 130px; position: absolute; left: 20%; top: 150px;}
   .detail-container .page4 .info-section { margin: 120px 0 0 20%;}
   .detail-container .page4 .chart { margin: 80px 0 100px 20%;}
   .detail-container .page6 .info-section { position: absolute; top: 50%; right: 15%; margin-top: -125px;}
   .detail-container .page8 { width: 880px; margin: 140px auto;}
   .detail-container .page8 h3 { font-size: 36px; color: #ffffff; font-family: TTHBold; margin-bottom: 40px;}
   .detail-container .car-list { display: flex;}
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
            <img src="@/assets/images/detail/bg1.jpg" class="bg"/>
            <a href="#" class="btn1">I want it</a>
            <div class="info-section">
               <h3>ZEEHO S1</h3>
               <h3 style="font-family: TTHR">Sensational</h3>
               <p>It is not just a vehicle that takes you to your destination. It is not just a machine you have to use every day. It is so much more! ZEEHO is your environmentally-friendly companion that gives you an amazing riding experience. It represents your dedication towards urban mobility. It symbolizes the high-quality lifestyle you always wished for.</p>
            </div>
         </div>
         <div class="pr page2">
            <img src="@/assets/images/detail/bg2.jpg" class="bg"/>
            <a href="#" class="btn1">watch</a>
         </div>
         <div class="pr page3">
            <img src="@/assets/images/detail/bg3.jpg" class="bg"/>
            <img src="@/assets/images/detail/icon2.png" class="icon"/>
         </div>
         <div class="pr page4">
            <div class="info-section">
               <h3>Faster than Fast</h3>
               <p>Torque like you’ve never experienced before. With the potential to hit 50 km/h in a mind blowing 3.7 seconds*.<br/>Faster is just the beginning.</p>
            </div>
            <div class="chart">
               <img src="@/assets/images/detail/chart.png"/>
            </div>
         </div>
         <div class="pr page5">
            <img src="@/assets/images/detail/bg4.jpg" class="bg"/>
         </div>
         <div class="pr page6">
            <img src="@/assets/images/detail/bg5.jpg" class="bg"/>
            <div class="info-section">
               <h3>Bigger is Better</h3>
               <p style="width: 620px;">To handle all that speed we fitted Gogoro S1 with a bigger brake disk and a double-acting 4-piston front caliper to deliver unmatched stopping force for an even shorter braking distance.<br/>This is racing gear for the city.</p>
            </div>
         </div>
         <div class="pr page7">
            <img src="@/assets/images/detail/bg6.jpg" class="bg"/>
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
      return {}
   }
}
</script>
