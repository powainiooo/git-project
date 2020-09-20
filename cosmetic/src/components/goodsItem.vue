<style>
.c-goods-item { width: 330px; background: #FFFFFF; box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05); border-radius: 4px; overflow: hidden;}
.c-goods-item-img { width: 100%; height: 340px; display: block; margin-bottom: 12px;}
.c-goods-item-name { padding: 0 8px; font-size: 26px; color: #666666; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 20px;}
.c-goods-item-price { padding: 0 8px; font-size: 36px; color: #000000; margin-bottom: 30px;}
</style>

<template>
<div class="c-goods-item">
   <img src="/static/images/goods/img.png" mode="widthFix" class="c-goods-item-img"/>
   <h3 class="c-goods-item-name">护肤品套装水乳护肤套</h3>
   <div class="c-goods-item-price">￥2919.99</div>
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
