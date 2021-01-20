<style>
.c-goods-item { width: 330px; background: #FFFFFF; box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.05); border-radius: 4px; overflow: hidden;}
.c-goods-item-img { width: 100%; height: 340px; display: block; margin-bottom: 12px;}
.c-goods-item-name { padding: 0 8px; font-size: 26px; color: #666666; font-weight: bold; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 20px;}
.c-goods-item-price { padding: 0 8px; font-size: 36px; color: #000000; margin-bottom: 30px;}
</style>

<template>
<div class="c-goods-item" @click="toDetail">
   <img :src="imgSrc + itemData.cover" mode="aspectFill" class="c-goods-item-img"/>
   <h3 class="c-goods-item-name">{{itemData.goods_name}}</h3>
   <div class="c-goods-item-price">￥{{itemData.min_price === itemData.max_price ? (itemData.min_price / 100) : (itemData.min_price / 100) + '~' + (itemData.max_price / 100)}}<span style="font-size: 12px;color: gray;">销量:{{itemData.sale_num}}</span></div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
   props: {
	   itemData: Object
   },
	data() {
		return {
         imgSrc: mpvue.imgSrc
      }
	},
	methods: {
      toDetail () {
         mpvue.navigateTo({
            url: `/pages/goodsDetail/main?id=${this.itemData.id}`
         })
      }
   }
}
</script>
