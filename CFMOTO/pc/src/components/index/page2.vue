<style scoped>
.z-page2 { width: 100%; height: 100%; position: relative;}
.z-page2 .info-section { position: absolute; left: 13%; top: 50%; margin-top: -165px; z-index: 10; animation: infoIn 0.5s ease-out 1s both;}
.z-page2 .btn-arrow { height: 80px; position: absolute; left: 13%; bottom: 0;}
.z-page2 .img-list { width: 55%; height: 100%; display: flex; position: absolute; right: 0; top: 0;}
.z-page2 .img-list li { width: 35%; height: 100%; display: flex; flex-direction: column; justify-content: flex-end;}
.z-page2 .img-list li:first-child { animation: fadeInUp 0.5s ease-out both}
.z-page2 .img-list li:nth-child(2) { animation: fadeInDown 0.5s ease-out 0.2s both}
.z-page2 .img-list li:last-child { width: 30%; animation: fadeInUp 0.5s ease-out 0.4s both}
.z-page2 .img-list li div { width: 100%; background-size: cover; background-repeat: no-repeat; position: relative;}
.z-page2 .img-list li div:before { content: ''; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0;}
.z-page2 .img-list li div.bg1 { background-image: url('../../assets/images/index/img2-1.jpg');}
.z-page2 .img-list li div.bg2 { background-image: url('../../assets/images/index/img2-2.jpg');}
.z-page2 .img-list li div.bg3 { background-image: url('../../assets/images/index/img2-3.jpg');}
.z-page2 .img-list li div.bg4 { background-image: url('../../assets/images/index/img2-4.jpg');}
.z-page2 .img-list li div.bg5 { background-image: url('../../assets/images/index/img2-5.jpg');}
.z-page2 .img-list li div.bg6 { background-image: url('../../assets/images/index/img2-6.jpg');}
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
         <div style="height: 65.7%;" class="bg1"></div>
      </li>
      <li>
         <div style="height: 57.4%;" class="bg2"></div>
         <div style="height: 42.6%;" class="bg3"></div>
      </li>
      <li>
         <div style="height: 19.1%;" class="bg4"></div>
         <div style="height: 65.7%;" class="bg5"></div>
         <div style="height: 15.2%;" class="bg6"></div>
      </li>
   </ul>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {}
   },
   methods: {}
}
</script>
