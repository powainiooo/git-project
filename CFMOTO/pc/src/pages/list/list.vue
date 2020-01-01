<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .list-frame { width: 1370px; margin: 90px auto 0 auto;}
   .list-frame .pro-list { display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 50px;}
   .list-frame .pro-list a { width: 250px; display: block; margin-bottom: 40px; animation: proIn 0.5s cubic-bezier(.26,.72,.78,1.15) both;}
   @keyframes proIn {
      0% { transform: scale(0);}
      100% { transform: scale(1);}
   }
   .list-frame .pro-list a:nth-child(1) { animation-delay: 0s}
   .list-frame .pro-list a:nth-child(2) { animation-delay: 0.1s}
   .list-frame .pro-list a:nth-child(3) { animation-delay: 0.2s}
   .list-frame .pro-list a:nth-child(4) { animation-delay: 0.3s}
   .list-frame .pro-list a:nth-child(5) { animation-delay: 0.4s}
   .list-frame .pro-list a:nth-child(6) { animation-delay: 0.5s}
   .list-frame .pro-list a:nth-child(7) { animation-delay: 0.6s}
   .list-frame .pro-list a:nth-child(8) { animation-delay: 0.7s}
   .list-frame .pro-list a:nth-child(9) { animation-delay: 0.8s}
   .list-frame .pro-list a:nth-child(10) { animation-delay: 0.9s}
   .list-frame .pro-list a img { width: 100%; display: block; margin-bottom: 10px; transition: all 0.2s ease-out;}
   .list-frame .pro-list a:hover img { transform: scale(1.05)}
   .list-frame .pro-list a p { font-size: 16px; font-family: TTHBold; color: #ffffff; transition: all 0.2s ease-out;}
   .list-frame .pro-list a:hover p { color: #ffd400;}
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
               <a href="#">
                  <img src="@/assets/images/list/img1.jpg"/>
                  <p>Helmet1</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img2.jpg"/>
                  <p>Helmet2</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img3.jpg"/>
                  <p>Helmet3</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img4.jpg"/>
                  <p>Helmet4</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img1.jpg"/>
                  <p>Helmet5</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img2.jpg"/>
                  <p>Helmet6</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img3.jpg"/>
                  <p>Helmet7</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img4.jpg"/>
                  <p>Helmet8</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img1.jpg"/>
                  <p>Helmet9</p>
               </a>
               <a href="#">
                  <img src="@/assets/images/list/img2.jpg"/>
                  <p>Helmet10</p>
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
