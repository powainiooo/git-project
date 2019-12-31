<style scoped>
.step3 { overflow: hidden;}
.step3 .operas { display: flex; align-items: center;}
.step3 .btns { display: flex;}
.step3 .btns a {  font-family: TTHBold; font-size: 14px; color: #ffffff; margin-right: 30px; padding: 10px 5px;}
.step3 .btns a:hover, .step3 .btns a.active { border: 2px solid #ffd400; border-radius: 4px;}
.step3 .icons { margin-right: 40px; display: flex;}
.step3 .info { width: 450px; float: left; margin-right: 250px;}
.step3 .info h3 { font-size: 80px; font-family: TTHBold; color: #ffffff; margin-bottom: 20px;}
.step3 .info p { font-size: 14px; font-family: TTHR; color: #ffffff; margin-bottom: 20px;}
.step3 .info p.tel { font-size: 36px; font-family: TTHBold; color: #ffd400; margin-bottom: 20px;}
</style>

<template>
<div class="step3">
   <div class="info">
      <h3>Celebrate!</h3>
      <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
      <p class="tel">+86-(0571)-000000</p>
      <div class="operas">
         <div class="btns">
            <a href="javascript:;" class="active">App</a>
         </div>
         <div class="icons">
            <a href="javascript:;"><img src="@/assets/images/icon2.png" width="31" height="26"/></a>
         </div>
      </div>
   </div>
   <div class="info">
      <a href="#" class="btn1" style="margin-top: 100px;">Back</a>
   </div>
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
