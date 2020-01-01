<style scoped>
.z-header { width: 100%; height: 90px; display: flex; justify-content: space-between; align-items: center; position: fixed; top: 0; left: 0; z-index: 1000; background-color: rgba(0, 0, 0, 0.5)}
.z-header .logo { margin-left: 60px;}
.z-header .operas { display: flex; justify-content: flex-end; align-items: center; margin-right: 30px; flex-direction: row-reverse;}
.z-header .operas .language { width: 80px; height: 40px; background-color: #000000; display: flex;}
.z-header .operas .language a { width: 40px; display: flex; justify-content: center; align-items: center; font-family: TTHBold; font-size: 14px; color: #ffffff;}
.z-header .operas .language a:hover, .z-header .operas .language a.active { background-color: #ffd400; color: #000000;}
.z-header .btns { margin-right: 60px; display: flex;}
.z-header .btns a {  font-family: TTHBold; font-size: 14px; color: #ffffff; border: 2px solid rgba(0, 0, 0, 0); margin-right: 30px; padding: 10px 5px;}
.z-header .btns a:hover, .z-header .btns a.active { border: 2px solid #ffd400; border-radius: 4px;}
.z-header .icons { margin-right: 60px; display: flex;}
.z-header .icons a { margin-right: 20px;}
.z-header .btn-cart { position: absolute; top: 90px; right: 0;}
</style>

<template>
<div class="z-header">
   <a href="index.html" class="logo"><img src="@/assets/images/logo.png" width="52" height="30"/></a>
   <div class="operas">
      <div class="language">
         <a href="javascript:;">CN</a>
         <a href="javascript:;" class="active">EN</a>
      </div>
      <div class="btns">
         <a href="javascript:;" class="active">App</a>
         <a href="javascript:;" @click="showLogin=true" v-if="!isLogin">log In</a>
         <a href="personal.html" v-if="isLogin">Personal center</a>
      </div>
      <div class="icons">
         <a href="javascript:;" class="active"><img src="@/assets/images/icon-search.png" width="26" height="26"/></a>
         <a href="javascript:;"><img src="@/assets/images/icon2.png" width="31" height="26"/></a>
      </div>
   </div>
   <a href="javascript:;" class="btn1 btn-cart" @click="showCart=true"><img src="@/assets/images/icon-cart.png" width="27" height="26" class="mr20"/>Cart</a>
   <login :show.sync="showLogin"></login>
   <cart :show.sync="showCart"></cart>
</div>
</template>

<script>
import login from '@/components/index/login.vue'
import cart from '@/components/index/cart.vue'
export default {
   name: 'topNav',
   components: { login, cart },
   data () {
      return {
         showLogin: false,
         showCart: false,
         isLogin: false
      }
   }
}
</script>
