<style>
.c-goods-swiper { width: 100%; height: 726px;}
.c-goods-swiper-item { margin-right: 30px; border-radius: 10px; box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.05); background-color: #fff; overflow: hidden;}
.c-goods-swiper-img { width: 100%; border-radius: 10px 10px 0 0;}
.c-goods-swiper-title { font-size: 28px; color: #333333; line-height: 54px; font-weight: bold; text-align: center; margin-bottom: 18px; margin-top: 32px;}
.c-goods-swiper-des { font-size: 16px; color: #666666; line-height: 32px; text-align: center; margin-bottom: 64px;}
.c-goods-swiper-btn { width: 168px; height: 60px; background-color: #1B1B1B; display: flex; justify-content: center; align-items: center; margin: 0 auto 34px auto; font-size: 24px; color: #ffffff;}
</style>

<template>
<swiper class="c-goods-swiper" previous-margin="30rpx" display-multiple-items="1.7" :style="{height: height}">
   <swiper-item v-for="(item, index) in list" :key="index">
      <div class="c-goods-swiper-item">
         <img src="/static/images/index/img3.png" class="c-goods-swiper-img" mode="widthFix" />
         <h3 class="c-goods-swiper-title">XXX商品名称XX1</h3>
         <p class="c-goods-swiper-des">XXXXXX商品描述XXXXXXXXXXX</p>
         <a href="#" class="c-goods-swiper-btn" v-if="showBtns">立即购买</a>
      </div>
   </swiper-item>
</swiper>
</template>

<script type='es6'>
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
      }
   },
	data() {
		return {}
	},
	methods: {}
}
</script>
