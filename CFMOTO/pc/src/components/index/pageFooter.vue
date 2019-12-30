<style scoped>
.z-page-footer { width: 100%; height: 100%; position: relative;}
.z-page-footer .top { height: 100px; display: flex; justify-content: space-between; align-items: center; padding: 0 120px 0 70px;}
.z-page-footer .operas { display: flex; justify-content: flex-end; align-items: center; margin-right: 30px; flex-direction: row-reverse;}
.z-page-footer .btns { display: flex;}
.z-page-footer .btns a {  font-family: TTHBold; font-size: 14px; color: #ffffff; margin-right: 30px; padding: 10px 5px;}
.z-page-footer .btns a:hover, .z-page-footer .btns a.active { border: 2px solid #ffd400; border-radius: 4px;}
.z-page-footer .icons { margin-right: 40px; display: flex;}
.z-page-footer .icons a { margin-right: 20px;}
.z-page-footer .nav-list { display: flex; margin-right: 150px;}
.z-page-footer .nav-list li { margin-right: 90px;}
.z-page-footer .nav-list li a { font-size: 14px; color: #ffffff; font-family: TTHBold;}
.z-page-footer .bottom { margin: 50px 60px 60px; border-top: 1px solid #898989; display: flex; justify-content: flex-end; padding-top: 6px;}
.z-page-footer .bottom a { font-size: 14px; font-family: TTHR; color: #ffffff; border-right: 1px solid #898989; padding: 6px 40px;}
.z-page-footer .bottom p { font-size: 14px; font-family: TTHR; color: #898989; padding-left: 40px; padding-top: 6px;}
</style>

<template>
<div class="z-page-footer">
   <div class="top">
      <a href="#" class="logo"><img src="@/assets/images/logo-bottom.png" width="116" height="24"/></a>
      <div class="operas">
         <div class="icons">
            <a href="javascript:;"><img src="@/assets/images/icon2.png" width="31" height="26"/></a>
         </div>
         <div class="btns">
            <a href="javascript:;" class="active">App</a>
         </div>
         <ul class="nav-list">
            <li><a href="#">Media center</a> </li>
            <li><a href="#">Join us</a> </li>
            <li><a href="#">Experience store</a> </li>
            <li><a href="#">Q&A</a> </li>
            <li><a href="#">Contact us</a> </li>
         </ul>
      </div>
   </div>
   <div class="bottom">
      <a href="#">Privacy</a>
      <a href="#">Electrical business rules</a>
      <p>Copyright © 2020 ZEEHO Inc. All rights reserved.</p>
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
