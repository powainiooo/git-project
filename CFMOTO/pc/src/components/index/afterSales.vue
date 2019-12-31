<style scoped>
.after-sales { overflow: hidden;}
.after-sales .operas { display: flex; align-items: center;}
.after-sales .btns { display: flex;}
.after-sales .btns a {  font-family: TTHBold; font-size: 14px; color: #ffffff; margin-right: 30px; padding: 10px 5px;}
.after-sales .btns a:hover, .after-sales .btns a.active { border: 2px solid #ffd400; border-radius: 4px;}
.after-sales .icons { margin-right: 40px; display: flex;}
.after-sales .info { width: 450px; float: left; margin-right: 150px;}
.after-sales .info h3 { font-size: 20px; font-family: TTHBold; color: #ffffff; margin-bottom: 20px;}
.after-sales .info p { font-size: 14px; font-family: TTHR; color: #ffffff; margin-bottom: 20px;}
.after-sales .info p.tel { font-size: 36px; font-family: TTHBold; color: #ffd400; margin-bottom: 20px;}
</style>

<template>
<div class="after-sales">
   <div class="info">
      <h3>Contact</h3>
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
      <h3>Warranty</h3>
      <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
      <p>It´s time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
      <a href="#" class="btn1" style="margin-top: 100px;">download</a>
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
