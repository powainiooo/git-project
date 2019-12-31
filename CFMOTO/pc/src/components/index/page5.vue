<style scoped>
.z-page5 { width: 100%; height: 100%; position: relative;}
.z-page5 .info-section { position: absolute; left: 13%; top: 10%;}
.z-page5 .btn-arrow { height: 80px; position: absolute; left: 13%; bottom: 0;}
.pro-list { width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: flex-end;}
.pro-list li { width: 18%; height: 65%; position: relative;}
.pro-list li div { width: 100%; height: 100%; background-size: cover; background-repeat: no-repeat; transform-origin: 50% 100%; transition: all 0.2s ease-out;}
.pro-list li div.bg1 { background-image: url("../../assets/images/index/bg5-2.jpg")}
.pro-list li img { width: 100%; height: 100%; transform-origin: 50% 100%; transition: all 0.2s ease-out;}
.pro-list li p { width: 100%; font-size: 18px; font-family: TTHR; text-align: center; position: absolute; top: -40px; left: 0; transition: all 0.2s ease-out; z-index: 10;}
.pro-list li .btn1 { width: 100px; height: 100px; position: absolute; top: -120px; left: -35px; opacity: 0; transition: all 0.2s ease-out; z-index: 10;}
.pro-list li:hover { z-index: 10;}
.pro-list li:hover div { transform: scale(1.2);}
.pro-list li:hover div img { transform: scale(1.2);}
.pro-list li:hover p { font-size: 36px; transform: translate(30px, -60px);}
.pro-list li:hover .btn1 { opacity: 1;}
</style>

<template>
<div class="z-page5">
   <div class="info-section">
      <h3>Production model series</h3>
   </div>
   <ul class="pro-list">
      <li>
         <p>ZEEHO S1</p>
         <div class="bg1">
            <img src="@/assets/images/index/img5-2.png">
         </div>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
      <li>
         <p>ZEEHO S2</p>
         <div class="bg1">
            <img src="@/assets/images/index/img5-2.png">
         </div>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
      <li>
         <p>ZEEHO S3</p>
         <div class="bg1">
            <img src="@/assets/images/index/img5-2.png">
         </div>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
      <li>
         <p>ZEEHO S4</p>
         <div class="bg1">
            <img src="@/assets/images/index/img5-2.png">
         </div>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
      <li>
         <p>ZEEHO S5</p>
         <div class="bg1">
            <img src="@/assets/images/index/img5-2.png">
         </div>
         <a href="javascript:;" class="btn1">Learn more</a>
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
