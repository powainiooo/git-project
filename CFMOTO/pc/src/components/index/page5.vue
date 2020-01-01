<style scoped>
.z-page5 { width: 100%; height: 100%; position: relative; animation: fadeIn 0.5s linear 0.3s both;}
.z-page5 .info-section { position: absolute; left: 13%; top: 10%; animation: infoIn 0.5s ease-out 0.5s both}
.z-page5 .btn-arrow { height: 80px; position: absolute; left: 13%; bottom: 0;}
.pro-list { width: 100%; height: 100%; display: flex; justify-content: flex-end; align-items: flex-end;}
.pro-list li { width: 18%; height: 65%; position: relative;}
.pro-list li>div { width: 100%; height: 100%; background-size: cover; background-repeat: no-repeat; transform-origin: 50% 100%; transition: all 0.2s ease-out; display: flex; align-items: flex-end;}
.pro-list li div.bg1 { background-image: url("../../assets/images/detail/1.jpg")}
.pro-list li div.bg2 { background-image: url("../../assets/images/detail/2.jpg")}
.pro-list li div.bg3 { background-image: url("../../assets/images/detail/3.jpg")}
.pro-list li div.bg4 { background-image: url("../../assets/images/detail/4.jpg")}
.pro-list li div.bg5 { background-image: url("../../assets/images/detail/5.jpg")}
.pro-list li img { width: 100%;transform-origin: 50% 100%; transition: all 0.2s ease-out;}
.pro-list li p { width: 100%; font-size: 18px; font-family: TTHR; text-align: center; position: absolute; top: -40px; left: 0; transition: all 0.2s ease-out; z-index: 10;}
.pro-list li .btn1 { width: 100px; height: 100px; transition: all 0.2s ease-out; transform: scale(0.83) translateY(-100px); opacity: 0; transform-origin: 0 0;}
.pro-list li .cover { width: 100px; height: 100px; position: absolute; top: 0; left:0; z-index: 10; transform: scale(0.83); transform-origin: 0 0; overflow: hidden;}
.pro-list li:hover { z-index: 10;}
.pro-list li:hover div { transform: scale(1.2);}
.pro-list li:hover div img { transform: scale(1.2);}
.pro-list li:hover p { font-size: 36px; transform: translate(30px, -60px); color: #ffffff}
.pro-list li:hover .btn1 { opacity: 1; transform: scale(0.83) translateY(0); transition-delay: 0.2s}
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
            <img src="@/assets/images/detail/1.png">
            <div class="cover">
               <a href="detail.html" class="btn1">Learn more</a>
            </div>
         </div>
      </li>
      <li>
         <p>ZEEHO S2</p>
         <div class="bg2">
            <img src="@/assets/images/detail/2.png">
            <div class="cover">
               <a href="detail.html" class="btn1">Learn more</a>
            </div>
         </div>
      </li>
      <li>
         <p>ZEEHO S3</p>
         <div class="bg3">
            <img src="@/assets/images/detail/3.png">
            <div class="cover">
               <a href="detail.html" class="btn1">Learn more</a>
            </div>
         </div>
      </li>
      <li>
         <p>ZEEHO S4</p>
         <div class="bg4">
            <img src="@/assets/images/detail/4.png">
            <div class="cover">
               <a href="detail.html" class="btn1">Learn more</a>
            </div>
         </div>
      </li>
      <li>
         <p>ZEEHO S5</p>
         <div class="bg5">
            <img src="@/assets/images/detail/5.png">
            <div class="cover">
               <a href="detail.html" class="btn1">Learn more</a>
            </div>
         </div>
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
