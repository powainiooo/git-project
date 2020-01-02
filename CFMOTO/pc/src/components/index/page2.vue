<style scoped>
.z-page2 { width: 100%; height: 100%; position: relative; animation: fadeIn 1s linear 0.5s both;}
.z-page2 .info-section { position: absolute; left: 13%; top: 50%; margin-top: -165px; z-index: 10; animation: infoIn 0.5s ease-out 1s both;}
.z-page2 .btn-arrow { height: 80px; position: absolute; left: 13%; bottom: 0;}
.z-page2 .img-list { width: 55%; height: 100%; display: flex; position: absolute; right: 0; top: 0;}
.z-page2 .img-list li { width: 380px; height: 100%; overflow: hidden; position: relative;}
.z-page2 .img-list li:last-child { width: 302px;}
.z-page2 .img-list li div { width: 100%; background-size: cover; background-repeat: no-repeat; position: absolute; top: 0; left: 0;}
.z-page2 .img-list li:nth-child(2) div { top: auto; bottom: 0;}
.z-page2 .img-list li div:before { content: ''; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0;}
.z-page2 .img-list li div img { width: 100%; height: 710px; display: block;}
</style>

<template>
<div class="z-page2">
   <div class="info-section">
      <h3>ZEEHO is for those who dare.</h3>
      <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single<br/>moment, enjoy it to the fullest and inspire everyone around you!</p>
      <a href="dare.html" class="btn1">Learn more</a>
   </div>
   <ul class="img-list">
      <li>
         <div :style="line1">
            <img src="@/assets/images/index/page2/1.jpg">
            <img src="@/assets/images/index/page2/1-2.jpg">
            <img src="@/assets/images/index/page2/1-3.jpg">
            <img src="@/assets/images/index/page2/1-4.jpg">
            <img src="@/assets/images/index/page2/1.jpg">
            <img src="@/assets/images/index/page2/1-2.jpg">
            <img src="@/assets/images/index/page2/1-3.jpg">
            <img src="@/assets/images/index/page2/1-4.jpg">
            <img src="@/assets/images/index/page2/1.jpg">
         </div>
      </li>
      <li>
         <div :style="line2">
            <img src="@/assets/images/index/page2/2-1.jpg">
            <img src="@/assets/images/index/page2/2-4.jpg">
            <img src="@/assets/images/index/page2/2-3.jpg">
            <img src="@/assets/images/index/page2/2-2.jpg">
            <img src="@/assets/images/index/page2/2-1.jpg">
            <img src="@/assets/images/index/page2/2-4.jpg">
            <img src="@/assets/images/index/page2/2-3.jpg">
            <img src="@/assets/images/index/page2/2-2.jpg">
            <img src="@/assets/images/index/page2/2-1.jpg">
         </div>
      </li>
      <li>
         <div :style="line3">
            <img src="@/assets/images/index/page2/3-1.jpg">
            <img src="@/assets/images/index/page2/3-2.jpg">
            <img src="@/assets/images/index/page2/3-3.jpg">
            <img src="@/assets/images/index/page2/3-4.jpg">
            <img src="@/assets/images/index/page2/3-1.jpg">
            <img src="@/assets/images/index/page2/3-2.jpg">
            <img src="@/assets/images/index/page2/3-3.jpg">
            <img src="@/assets/images/index/page2/3-4.jpg">
            <img src="@/assets/images/index/page2/3-1.jpg">
         </div>
      </li>
   </ul>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {
         pos1: 0,
         pos2: 0,
         pos3: 0
      }
   },
   computed: {
      line1 () {
         return {
            top: `${this.pos1}px`
         }
      },
      line2 () {
         return {
            bottom: `${this.pos2}px`
         }
      },
      line3 () {
         return {
            top: `${this.pos3}px`
         }
      }
   },
   mounted () {
      const speed = 0.5
      const wh = window.innerHeight
      const lh = 710 * 8
      this.pos1 = wh / 2
      setInterval(() => {
         this.pos1 -= speed
         if (this.pos1 < wh - lh) {
            this.pos1 += lh / 2
         }
         this.pos2 -= speed
         if (this.pos2 < wh - lh) {
            this.pos2 += lh / 2
         }
         this.pos3 -= speed
         if (this.pos3 < wh - lh) {
            this.pos3 += lh / 2
         }
      }, 16)
   },
   methods: {}
}
</script>
