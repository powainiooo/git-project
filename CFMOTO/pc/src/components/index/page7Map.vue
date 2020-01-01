<style scoped>
.store-info { overflow: hidden}
.store-info .map { width: 620px; height: 380px; float: left; margin-right: 50px;}
.store-info .intro { float: left;}
.store-info .intro h3 { font-size: 20px; color: #ffd400; font-family: TTHBold; margin-bottom: 20px;}
.store-info .intro h4 { width: 360px; font-size: 16px; color: #ffffff; font-family: TTHBold; margin-bottom: 20px;}
.store-info .intro p { width: 450px; font-size: 14px; color: #ffffff; font-family: TTHR;}
</style>

<template>
<div class="store-info">
   <div class="map"><img src="@/assets/images/map.jpg"/> </div>
   <div class="intro">
      <h3>Chandler Fashion Center</h3>
      <h4>3111 W Chandler Boulevard Chandler,AZ 85226 (480)636-3900</h4>
      <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
      <a href="#" class="btn1" style="margin-top: 148px;" @click="nextStep">Order</a>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {}
   },
   methods: {
      nextStep () {
         console.log(this.$parent)
         this.$parent.$parent.changePage('step1')
      }
   }
}
</script>
