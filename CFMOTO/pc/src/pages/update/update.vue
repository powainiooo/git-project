<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .update-container .info-section { margin: 20% 0 0 25%; position: relative;}
   .update-container .info-section h3 { line-height: 90px;}
   .update-container .info-section .animate { position: absolute; top: 0; left: 0; -webkit-mask-image: url(../../assets/images/mask.png);  -webkit-mask-repeat: no-repeat; -webkit-mask-position: 0 0; -webkit-mask-size: auto 100%; animation: move 5s linear infinite}
   @keyframes move {
      0% { -webkit-mask-position: -780px 0; opacity: 1}
      80% { -webkit-mask-position: 0 0; opacity: 1}
      100% { -webkit-mask-position: 0 0; opacity: 0}
   }
</style>

<template>
   <div class="update-container">
      <top-nav type="simple"></top-nav>
      <div class="info-section">
         <h3 class="animate">We are upgrading</h3>
         <h3 class="border">We are upgrading</h3>
         <p style="width: 710px;">The content is being updated.It is expected to be updated at 2019-12-12 13:00.Please try again later.</p>
      </div>
   </div>
</template>

<script type="es6">
import topNav from '@/components/topNav.vue'
export default {
   name: 'App',
   components: { topNav },
   data () {
      return {}
   }
}
</script>
