<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .dare-container .info-section { margin-left: 12%;}
   .dare-container .list1 { width: 100%; display: flex; justify-content: flex-end; margin-top: 120px; position: relative;}
   .dare-container .list1:before { content: ''; width: 470px; height: 225px; background: url("../../assets/images/dare/icon.png") no-repeat; position: absolute; right: 190px; top: -50px; z-index: 10;}
   .dare-container .list1 li { width: 500px;}
   .dare-container .list1 li img { display: block;}
   .dare-container .list1 li:nth-child(2) { transform: translateY(-70px)}
   .dare-container .bg1 { margin-top: 220px;}
   .dare-container .bg1 .info-section { width: 100%; position: absolute; top: 0; left: 0;}
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
               <img src="@/assets/images/dare/img1.jpg"/>
               <img src="@/assets/images/dare/img2.jpg"/>
            </li>
            <li>
               <img src="@/assets/images/dare/img3.jpg"/>
               <img src="@/assets/images/dare/img4.jpg"/>
            </li>
            <li>
               <img src="@/assets/images/dare/img5.jpg"/>
               <img src="@/assets/images/dare/img6.jpg"/>
            </li>
         </ul>
         <div class="info-section mt150">
            <h3>What do we offer?</h3>
            <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
         </div>
         <div class="tc mt80">
            <img src="@/assets/images/dare/img7.jpg"/>
         </div>
         <div class="bg1 pr">
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
      return {}
   }
}
</script>
