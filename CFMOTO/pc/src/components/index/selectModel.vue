<style scoped>
.select-model .car-list { display: flex; justify-content: center;}
.select-model .car-list li { width: 220px; position: relative;}
.select-model .car-list li img { width: 100%; display: block;}
.select-model .car-list li div { width: 100%; position: relative; transition: all 0.3s ease-out;}
.select-model .car-list li.active div:before { content: ''; width: 220px; height: 390px; position: absolute; top: 0; left: 0; border: 4px solid #ffd400; z-index: 2;}
.select-model .car-list li div .car { width: 90%; position: absolute; top: 10%; left: 5%; transition: all 0.3s ease-out; z-index: 2;}
.select-model .car-list li p { font-size: 12px; font-family: TTHR; margin-top: 20px; text-align: center;}
.select-model .car-list li:hover { z-index: 5;}
.select-model .car-list li:hover div { z-index: 5; transform: scale(1.1)}
.select-model .car-list li:hover div .car { z-index: 15; transform: scale(1.2)}
</style>

<template>
<div class="select-model">
   <ul class="car-list">
      <li :class="{active:selectIndex === 0}" @click="selectIndex=0">
         <div>
            <img src="@/assets/images/detail/1.jpg" class="bg"/>
            <img src="@/assets/images/detail/1.png" class="car"/>
         </div>
         <p>ZEEHO S1</p>
      </li>
      <li :class="{active:selectIndex === 1}" @click="selectIndex=1">
         <div>
            <img src="@/assets/images/detail/2.jpg" class="bg"/>
            <img src="@/assets/images/detail/2.png" class="car"/>
         </div>
         <p>ZEEHO S2</p>
      </li>
      <li :class="{active:selectIndex === 2}" @click="selectIndex=2">
         <div>
            <img src="@/assets/images/detail/3.jpg" class="bg"/>
            <img src="@/assets/images/detail/3.png" class="car"/>
         </div>
         <p>ZEEHO S3</p>
      </li>
      <li :class="{active:selectIndex === 3}" @click="selectIndex=3">
         <div>
            <img src="@/assets/images/detail/4.jpg" class="bg"/>
            <img src="@/assets/images/detail/4.png" class="car"/>
         </div>
         <p>ZEEHO S4</p>
      </li>
      <li :class="{active:selectIndex === 4}" @click="selectIndex=4">
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
      return {
         selectIndex: -1
      }
   },
   methods: {}
}
</script>
