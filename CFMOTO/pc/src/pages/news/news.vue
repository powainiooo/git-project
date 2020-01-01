<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .news-frame { width: 1405px; margin: 90px auto 0 auto;}
   .news-frame .news-list { overflow: hidden; margin-top: 40px;}
   .news-frame .news-list>div { height: 360px; float: left; position: relative; animation: newsIn 0.5s cubic-bezier(.26,.72,.78,1.15) both;}
   .news-frame .news-list>div.rect1 { width: 405px;}
   .news-frame .news-list>div.rect2 { width: 480px; animation-delay: 0.1s}
   .news-frame .news-list>div.rect3 { width: 520px; animation-delay: 0.2s}
   .news-frame .news-list>div.rect4 { width: 885px; animation-delay: 0.3s}
   .news-frame .news-list>div.rect5 { width: 520px; animation-delay: 0.4s}
   .news-frame .news-list>div.rect-content { display: flex; justify-content: center; align-items: center; background-color: #ffd400;}
   .news-frame .news-list>div.rect-content .content { width: 360px;}
   .news-frame .news-list>div.rect-content h3 { font-size: 20px; color: #1a1a1a; font-family: TTHBold; margin-bottom: 20px;}
   .news-frame .news-list>div.rect-content p { font-size: 14px; color: #1a1a1a; font-family: TTHR; margin-bottom: 40px; word-break: break-all;}
   .news-frame .news-list>div.rect-content .btn2 { width: 120px; height: 40px; border-color: #1a1a1a; color: #1a1a1a;}
   .news-frame .news-list>div.rect-content .btn2:hover { background-color: #ffffff; border-color: #ffffff;}
   .news-frame .news-list>div.rect-img { position: relative;}
   .news-frame .news-list>div.rect-img img { width: 100%; height: 100%;}
   .news-frame .news-list>div.rect-img .content { width: 100%; height: 70px; background-color: rgba(0, 0, 0, 0.8); position: absolute; bottom: 0; left: 0; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;}
   .news-frame .news-list>div.rect-img .content h3 { font-size: 20px; color: #ffffff; font-family: TTHBold;}
   .news-frame .news-list>div.rect-img .content .btn2 { width: 120px; height: 40px; border-color: #ffffff; color: #ffffff;}
   .news-frame .news-list>div.rect-img .content .btn2:hover { background-color: #ffd400; border-color: #ffd400; color: #1a1a1a;}
   @keyframes newsIn {
      0% { transform: scale(0);}
      100% { transform: scale(1);}
   }
</style>

<template>
   <div class="news-container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div class="news-frame">
         <div class="info-section">
            <h3>News Center</h3>
         </div>
         <div class="news-list">
            <div class="rect1 rect-content">
               <div class="content">
                  <h3>The future of EV</h3>
                  <p>To handle all that speed we fitted Gogoro S1 with a bigger brake disk and a double-acting 4-piston front caliper to deliver unmatched stopping force for an even shorter braking distance. </p>
                  <a href="#" class="btn2">Read more</a>
               </div>
            </div>
            <div class="rect2 rect-img">
               <img src="@/assets/images/news/img1.jpg"/>
               <div class="content">
                  <h3>The future of EV</h3>
                  <a href="#" class="btn2">Read more</a>
               </div>
            </div>
            <div class="rect3 rect-img">
               <img src="@/assets/images/news/img2.jpg"/>
               <div class="content">
                  <h3>The future of EV</h3>
                  <a href="#" class="btn2">Read more</a>
               </div>
            </div>
            <div class="rect4 rect-img">
               <img src="@/assets/images/news/img3.jpg"/>
               <div class="content">
                  <h3>The future of EV</h3>
                  <a href="#" class="btn2">Read more</a>
               </div>
            </div>
            <div class="rect5 rect-content">
               <div class="content">
                  <h3>The future of EV</h3>
                  <p>To handle all that speed we fitted Gogoro S1 with a bigger brake disk and a double-acting 4-piston front caliper to deliver unmatched stopping force for an even shorter braking distance. </p>
                  <a href="#" class="btn2">Read more</a>
               </div>
            </div>
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
