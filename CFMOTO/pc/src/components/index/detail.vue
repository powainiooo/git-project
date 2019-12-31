<style scoped>
.z-detail { width: 540px; height: 100vh; position: fixed; top: 0; right: 0; background-color: #000000; z-index: 1500;}
.z-detail .btn-close { width: 100px; height: 100px; font-size: 90px; position: absolute; top: 0; left: -100px;}
.z-detail .img { width: 200px; display: block; margin: 100px 0 0 60px;}
.z-detail h3 { font-size: 36px; color: #ffffff; font-family: TTHBold; margin: 60px 0 0 60px;}
.z-detail .pro-types { display: flex; flex-wrap: wrap; margin-left: 60px;}
.z-detail .pro-types a { width: 120px; height: 40px; margin: 0 10px 10px 0;}
.z-detail .pro-nums { width: 100px; height: 32px; border: 1px solid #ffd400; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; color: #ffffff; padding: 0 8px; margin-left: 60px; margin-top: 20px;}
.z-detail .pro-price { font-size: 16px; color: #ffffff; font-family: TTHBold; margin-left: 60px; margin-top: 20px;}
.z-detail .pro-price span { font-size: 36px; font-family: TTHBold; margin-left: 10px;}
.z-detail .pro-list { margin: 30px 60px;}
.z-detail .pro-list li { display: flex; align-items: center; margin-bottom: 10px; font-size: 14px; color: #ffffff; font-family: TTHR;}
.z-detail .pro-list li input { margin-right: 10px;}
</style>

<template>
<div class="z-detail">
   <a href="javascript:;" class="btn1 btn-close"><Icon type="ios-close" /></a>
   <img src="@/assets/images/index/img7.jpg" class="img"/>
   <h3>ZEEHO</h3>
   <div class="pro-types">
      <a href="#" class="btn1">Basic</a>
      <a href="#" class="btn2">Enhance</a>
      <a href="#" class="btn2">Elite</a>
   </div>
   <div class="pro-nums">
      <Icon type="md-remove" />
      <span>1</span>
      <Icon type="md-add" />
   </div>
   <div class="pro-price">RMB<span>6,999</span></div>
   <ul class="pro-list">
      <li><input type="checkbox" class="z-checkbox">It is not just a vehicle that takes you to your destination. </li>
      <li><input type="checkbox" class="z-checkbox">LED Light</li>
      <li><input type="checkbox" class="z-checkbox">Helmet</li>
      <li><input type="checkbox" class="z-checkbox">It is not just a vehicle that</li>
   </ul>
   <a href="#" class="btn1 mt80 ml60">Add to Cart</a>
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
