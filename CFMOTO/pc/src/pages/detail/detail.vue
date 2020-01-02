<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .detail-container .bg { width: 100%; display: block;}
   .detail-container .page1 .btn1 { position: absolute; top: 40%; right: 0;}
   .detail-container .page1 .bg { animation: fadeIn 1s linear 0.3s both;}
   .detail-container .page1 .info-section { position: absolute; top: 50%; left: 12%; margin-top: -165px; animation: slideInLeft100 0.5s ease-out 0.5s both;}
   .detail-container .page2 .btn1 { width: 100px; height: 100px; margin-left: -50px; position: absolute; left: 50%; bottom: 0;}
   .detail-container .page3 .icon { width: 400px; height: 130px; position: absolute; left: 20%; top: 150px; animation: slideInRight100 0.5s ease-out}
   .detail-container .page4 .info-section { margin: 120px 0 0 20%;}
   .detail-container .page4 .chart { margin: 80px 0 100px 20%; position: relative;}
   .detail-container .page4 .chart .icon { position: absolute; top: 15px; left: 930px; animation: slideInRight100 0.5s ease-out}
   .detail-container .page4 .chart .progress1 { width: 750px; height: 12px; background-color: #ffd400; position: absolute; top: 55px; left: 147px; transform-origin: 0 50%; animation: progress 0.5s ease-out}
   .detail-container .page4 .chart .progress2 { width: 600px; height: 12px; background-color: #3e3a39; position: absolute; top: 160px; left: 147px; transform-origin: 0 50%; animation: progress 0.5s ease-out}
   @keyframes progress {
      0% { transform: scaleX(0)}
      100% { transform: scaleX(1)}
   }
   .detail-container .page5 .info-section { position: absolute; top: 20%; left: 15%; margin-top: -125px;}
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
   <div class="detail-container" ref="container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div>
         <div class="pr page1" ref="page1">
            <img src="@/assets/images/detail/bg1.jpg" class="bg"/>
            <a href="javascript:;" class="btn1" @click="showDetail = true">I want it</a>
            <div class="info-section">
               <h3>ZEEHO S1</h3>
               <h3 style="font-family: TTHR">Sensational</h3>
               <p>It is not just a vehicle that takes you to your destination. It is not just a machine you have to use every day. It is so much more! ZEEHO is your environmentally-friendly companion that gives you an amazing riding experience. It represents your dedication towards urban mobility. It symbolizes the high-quality lifestyle you always wished for.</p>
            </div>
         </div>
         <div class="pr page2" ref="page2">
            <img src="@/assets/images/detail/bg2.jpg" class="bg"/>
            <a href="#" class="btn1">watch</a>
         </div>
         <div class="pr page3" ref="page3">
            <img src="@/assets/images/detail/bg3.jpg" class="bg"/>
            <img src="@/assets/images/detail/icon2.png" class="icon" v-if="showPart1"/>
         </div>
         <div class="pr page4" ref="page4">
            <div class="info-section">
               <h3>Faster than Fast</h3>
               <p>Torque like you’ve never experienced before. With the potential to hit 50 km/h in a mind blowing 3.7 seconds*.<br/>Faster is just the beginning.</p>
            </div>
            <div class="chart">
               <img src="@/assets/images/detail/chart.png"/>
               <img src="@/assets/images/detail/icon1.png" class="icon" v-if="showPart2"/>
               <div class="progress1" v-if="showPart2"></div>
               <div class="progress2" v-if="showPart2"></div>
            </div>
         </div>
         <div class="pr page5" ref="page5">
            <div class="info-section">
               <h3>Turn it Up</h3>
               <p style="width: 620px;">We pushed our G1 motor to unleash even more power in the city and on the race track. The result is the G1-S performance motor. It’s faster. More efficient. Delivering more torque than ever.
                  <br/>This is what you’ve been waiting for.</p>
            </div>
            <img src="@/assets/images/detail/bg4.jpg" class="bg"/>
         </div>
         <div class="pr page6" ref="page6">
            <img src="@/assets/images/detail/bg5.jpg" class="bg"/>
            <div class="info-section">
               <h3>Bigger is Better</h3>
               <p style="width: 620px;">To handle all that speed we fitted Gogoro S1 with a bigger brake disk and a double-acting 4-piston front caliper to deliver unmatched stopping force for an even shorter braking distance.<br/>This is racing gear for the city.</p>
            </div>
         </div>
         <div class="pr page7" ref="page7">
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
      <detail :show.sync="showDetail"></detail>
   </div>
</template>

<script type="es6">
import topNav from '@/components/topNav.vue'
import zMenu from '@/components/menu.vue'
import pageFooter from '@/components/index/pageFooter.vue'
import detail from '@/components/index/detail.vue'
export default {
   name: 'App',
   components: { topNav, zMenu, pageFooter, detail },
   data () {
      return {
         p1H: 0,
         p2H: 0,
         p3H: 0,
         p4H: 0,
         showPart1: false,
         showPart2: false,
         showDetail: false
      }
   },
   mounted () {
      window.onscroll = this.scroll
   },
   methods: {
      scroll (e) {
         this.p1H = this.$refs.page1.clientHeight
         this.p2H = this.$refs.page2.offsetHeight
         this.p3H = this.$refs.page3.offsetHeight
         this.p4H = this.$refs.page4.offsetHeight
         if (this.p1H === 0) return
         const st = document.documentElement.scrollTop
         if (st > (this.p1H + this.p2H / 2)) {
            this.showPart1 = true
         }
         if (st > (this.p1H + this.p2H + this.p3H)) {
            this.showPart2 = true
         }
      }
   }
}
</script>
