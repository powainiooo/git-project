<style scoped>
.z-login { width: 540px; height: 100vh; position: fixed; top: 0; right: 0; background-color: #000000; z-index: 1500;}
.z-login .btn-close { width: 100px; height: 100px; font-size: 90px; position: absolute; top: 0; left: -100px;}
.z-login .login-frame { margin-top: 200px;}
.z-login .login-frame h3 { font-size: 36px; color: #ffffff; font-family: TTHBold; margin-bottom: 70px; margin-left: 60px;}
.z-login .login-frame div { margin-left: 60px; margin-bottom: 20px;}
.z-login .login-frame div .z-input { width: 330px;}
.z-login .login-frame .btn-forget { margin-left: 80px; font-family: TTHR; color: #666666; font-size: 14px; display: block; margin-bottom: 70px;}
.z-login .login-frame .btn-register { margin-left: 60px; font-family: TTHBold; color: #ffffff; font-size: 24px; display: block; margin-top: 150px;}
</style>

<template>
<div class="z-login">
   <a href="javascript:;" class="btn1 btn-close"><Icon type="ios-close" /></a>
   <div class="login-frame">
      <h3>Log In</h3>
      <div>
         <input type="text" class="z-input" placeholder="Moblie Phone">
      </div>
      <div>
         <input type="text" class="z-input" placeholder="Password">
      </div>
      <a href="javascript:;" class="btn-forget">Forget your password?</a>
      <a href="javascript:;" class="btn1 ml60">Confirm</a>
      <a href="javascript:;" class="btn-register">Register <Icon type="ios-arrow-forward" /></a>
   </div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>
