<style scoped>
.z-page1 { width: 100%; height: 100%; position: relative; background: url("../../assets/images/index/bg1.jpg") no-repeat; background-size: auto 100%; background-position: right bottom; animation: fadeIn 1s linear 0.3s both;}
.z-page1 .info-section { position: absolute; left: 13%; top: 50%; margin-top: -165px; animation: infoIn 0.5s ease-out 0.5s both;}
.z-page1 .btn-arrow { height: 80px; position: absolute; left: 13%; bottom: 0;}
</style>

<template>
<div class="z-page1">
   <div class="info-section">
      <h3>Evolution?<br/>No, it´s revolution!</h3>
      <a href="javascript:;" class="btn1">Learn more</a>
   </div>
   <a href="javascript:;" class="btn1 btn-arrow" @click="gotoNext"><img src="@/assets/images/icon-arrow-down.png"></a>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {}
   },
   inject: ['togglePage'],
   methods: {
      gotoNext () {
         this.slideNext()
      }
   }
}
</script>
