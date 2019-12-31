<style scoped>
.select-model .car-list { display: flex; justify-content: center;}
.select-model .car-list li { width: 220px; position: relative;}
.select-model .car-list li img { width: 100%; display: block;}
.select-model .car-list li div { width: 100%; position: relative; transition: all 0.3s ease-out;}
.select-model .car-list li div .car { width: 90%; position: absolute; top: 10%; left: 5%; transition: all 0.3s ease-out;}
.select-model .car-list li p { font-size: 12px; font-family: TTHR; margin-top: 20px; text-align: center;}
.select-model .car-list li:hover { z-index: 5;}
.select-model .car-list li:hover div { z-index: 5; transform: scale(1.1)}
.select-model .car-list li:hover div .car { z-index: 5; transform: scale(1.2)}
</style>

<template>
<div class="select-model">
   <ul class="car-list">
      <li>
         <div>
            <img src="@/assets/images/detail/1.jpg" class="bg"/>
            <img src="@/assets/images/detail/1.png" class="car"/>
         </div>
         <p>ZEEHO S1</p>
      </li>
      <li>
         <div>
            <img src="@/assets/images/detail/2.jpg" class="bg"/>
            <img src="@/assets/images/detail/2.png" class="car"/>
         </div>
         <p>ZEEHO S2</p>
      </li>
      <li>
         <div>
            <img src="@/assets/images/detail/3.jpg" class="bg"/>
            <img src="@/assets/images/detail/3.png" class="car"/>
         </div>
         <p>ZEEHO S3</p>
      </li>
      <li>
         <div>
            <img src="@/assets/images/detail/4.jpg" class="bg"/>
            <img src="@/assets/images/detail/4.png" class="car"/>
         </div>
         <p>ZEEHO S4</p>
      </li>
      <li>
         <div>
            <img src="@/assets/images/detail/5.jpg" class="bg"/>
            <img src="@/assets/images/detail/5.png" class="car"/>
         </div>
         <p>ZEEHO S5</p>
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
