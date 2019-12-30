<style scoped>
.z-page6 { width: 100%; height: 100%; position: relative; overflow: hidden;}
.z-page6 .info-section { position: absolute; left: 13%; top: 10%;}
.z-page6 .pro-list { width: 1450px; margin: 15% auto; display: flex; justify-content: space-between;}
.z-page6 .pro-list li { width: 440px; display: flex; flex-direction: column; align-items: flex-end; position: relative;}
.z-page6 .pro-list li img { width: 350px;}
.z-page6 .pro-list li .btn1 { width: 100px; height: 100px;}
.z-page6 .pro-list li p { font-size: 60px; font-family: TTHBold; color: #ffffff; position: absolute; top: 80px; left: 0;}
</style>

<template>
<div class="z-page6">
   <div class="info-section">
      <h3>Accessories</h3>
   </div>
   <ul class="pro-list">
      <li>
         <p>Helmet</p>
         <img src="@/assets/images/index/img6-1.jpg"/>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
      <li>
         <p>Cloth</p>
         <img src="@/assets/images/index/img6-1.jpg"/>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
      <li>
         <p>Holder</p>
         <img src="@/assets/images/index/img6-1.jpg"/>
         <a href="javascript:;" class="btn1">Learn more</a>
      </li>
   </ul>
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
