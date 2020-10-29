<style>
.c-goods-swiper { width: 100%; height: 726px;}
.c-goods-swiper-item { margin-right: 30px; border-radius: 10px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05); background-color: #fff; overflow: hidden;}
.c-goods-swiper-img { width: 100%; height: 412px; display: block; border-radius: 10px 10px 0 0;}
.c-goods-swiper-title { font-size: 28px; color: #333333; line-height: 54px; font-weight: bold; text-align: center; margin-bottom: 18px; margin-top: 32px; padding: 0 10px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
.c-goods-swiper-des { font-size: 24px; color: #666666; line-height: 32px; text-align: center;}
.c-goods-swiper-price { font-size: 24px; color: #666666; line-height: 32px; text-align: center; margin-bottom: 64px; text-decoration: line-through;}
.c-goods-swiper-btn { width: 168px; height: 60px; background-color: #1B1B1B; display: flex; justify-content: center; align-items: center; margin: 0 auto 34px auto; font-size: 24px; color: #ffffff;}

.c-goods-swiper-item-only { width: 400px; margin: 0 auto;}
</style>

<template>
<div class="c-goods-swiper-item c-goods-swiper-item-only" @click="toDetail(firstItem.id)" v-if="onlyOne">
   <img :src="imgSrc + firstItem.cover" class="c-goods-swiper-img" mode="aspectFill" />
   <h3 class="c-goods-swiper-title">{{firstItem.goods_name}}</h3>
   <p class="c-goods-swiper-des" v-if="descKey === 'price'">价格：{{firstItem.min_price === firstItem.max_price ? (firstItem.min_price / 100) : (firstItem.min_price / 100) + '~' + (firstItem.max_price / 100)}}</p>
   <p class="c-goods-swiper-price" v-if="firstItem.pre_price != 0">原价：{{firstItem.pre_price / 100}}</p>
   <a href="#" class="c-goods-swiper-btn" v-if="showBtns">立即购买</a>
</div>
<swiper class="c-goods-swiper" previous-margin="30rpx" next-margin="290rpx" :style="{height: height}" v-else>
   <swiper-item v-for="(item, index) in list" :key="index">
      <div class="c-goods-swiper-item" @click="toDetail(item.id)">
         <img :src="imgSrc + item.cover" class="c-goods-swiper-img" mode="aspectFill" />
         <h3 class="c-goods-swiper-title">{{item.goods_name}}</h3>
         <p class="c-goods-swiper-des" v-if="descKey === 'price'">价格：{{item.min_price === item.max_price ? (item.min_price / 100) : (item.min_price / 100) + '~' + (item.max_price / 100)}}</p>
         <p class="c-goods-swiper-price" v-if="firstItem.pre_price != 0">原价：{{item.pre_price / 100}}</p>
         <a href="#" class="c-goods-swiper-btn" v-if="showBtns">立即购买</a>
      </div>
   </swiper-item>
</swiper>
</template>

<script type='es6'>
import store from '../store'
export default {
	name: 'app',
   props: {
      list: Array,
      height: {
         type: String,
         default: '620rpx'
      },
      showBtns: {
         type: Boolean,
         default: false
      },
      descKey: {
         type: String,
         default: 'price'
      }
   },
   computed: {
      imgSrc () {
         return store.state.imgSrc
      },
      onlyOne () {
         return this.list.length === 1
      },
      firstItem () {
         return this.list[0]
      }
   },
	data() {
		return {}
	},
	methods: {
      toDetail (id) {
         mpvue.navigateTo({
            url: `/pages/goodsDetail/main?id=${id}`
         })
      }
   }
}
</script>
