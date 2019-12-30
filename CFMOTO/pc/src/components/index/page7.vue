<style scoped>
.z-page7 { width: 100%; height: 100%; position: relative; background: url("../../assets/images/index/bg7.jpg") no-repeat; background-size: cover; background-position: center center; overflow: hidden;}
.z-page7 .info-section { position: absolute; left: 13%; top: 10%;}
.z-page7 .p7-tab { width: 400px; display: flex; border: 1px solid #ffd400; margin-top: 30px; margin-bottom: 30px;}
.z-page7 .p7-tab li { width: 50%; height: 50px; display: flex; justify-content: center; align-items: center; font-size: 16px; font-family: TTHBold; color: #ffffff;}
.z-page7 .p7-tab li.active { background-color: #ffd400; color: #1a1a1a;}
.z-page7 .z-select { width: 200px; height: 40px; border: 1px solid #e6e6e6; position: relative; display: inline-block; margin-right: 20px;}
.z-page7 .z-select:after { content: ''; width: 15px; height: 9px; background: url("../../assets/images/icon-arrow2.png") no-repeat; position: absolute; right: 20px; top: 15px;}
.z-page7 .z-select p { font-size: 16px; line-height: 40px; font-family: TTHR; color: #e6e6e6; padding-left: 20px;}
.z-page7 .z-select select { width: 100%; height: 100%; opacity: 0; position: absolute; top: 0; left: 0;}
.z-page7 .hint { position: absolute; top: 50%; left: 13%;}
</style>

<template>
<div class="z-page7">
   <div class="info-section">
      <h3>Test Drive & After-sales</h3>
      <ul class="p7-tab">
         <li class="active">Test Drive</li>
         <li>After-Sales</li>
      </ul>
      <div>
         <div class="z-select">
            <p>Province</p>
            <select>
               <option>1</option>
               <option>2</option>
            </select>
         </div>
         <div class="z-select">
            <p>City</p>
            <select>
               <option>1</option>
               <option>2</option>
            </select>
         </div>
         <div class="z-select">
            <p>District</p>
            <select>
               <option>1</option>
               <option>2</option>
            </select>
         </div>
      </div>
   </div>
   <img src="@/assets/images/index/findstore.png" class="hint"/>
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
