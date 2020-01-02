<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .error-container .info-section { width: 390px; margin: 15% 0 0 25%; animation: scaleIn 0.4s cubic-bezier(.26,.72,.78,1.15) 0.3s both;}
   @keyframes scaleIn {
      0% { transform: scale(0)}
      100% { transform: scale(1)}
   }
   .error-container .info-section .btn1 { animation: fadeIn 0.5s ease-out 0.7s both;}
</style>

<template>
   <div class="error-container">
      <top-nav type="simple"></top-nav>
      <div class="info-section">
         <h3>Oops,404</h3>
         <p>Sorry,the page is lost,please try to refresh the page.</p>
         <a href="index.html" class="btn1">Refresh</a>
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
