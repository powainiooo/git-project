<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .list-frame { width: 1370px; margin: 90px auto 0 auto;}
   .list-frame .pro-list { display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 50px;}
   .list-frame .pro-list a { width: 250px; display: block; margin-bottom: 40px;}
   .list-frame .pro-list a img { width: 100%; display: block; margin-bottom: 10px;}
   .list-frame .pro-list a p { font-size: 16px; font-family: TTHBold; color: #ffffff;}
</style>

<template>
   <div class="list-container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div class="list-frame">
         <div class="info-section">
            <h3>Accessories</h3>
            <ul class="z-tab">
               <li class="active">Helmet</li>
               <li>Cloth</li>
               <li>Holder</li>
            </ul>
         </div>
         <div class="pro-list">
            <a href="#" v-for="i in 10" :key="i">
               <img src="@/assets/images/list/img1.jpg"/>
               <p>Helmet{{i}}</p>
            </a>
         </div>
      </div>
   </div>
</template>

<script type="es6">
import topNav from '@/components/topNav.vue'
import zMenu from '@/components/menu.vue'
export default {
   name: 'App',
   components: { topNav, zMenu },
   data () {
      return {}
   }
}
</script>
