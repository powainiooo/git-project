<style>
.c-banner { width: 100%; height: 794px;}
.c-banner-img { width: 100%; height: 100%; display: block;}
.c-banner-dots { width: 100%; display: flex; justify-content: center; position: absolute; bottom: 20px; left: 0;}
.c-banner-dots li { width: 26px; height: 5px; background-color: rgba(0, 0, 0, .5); margin: 0 5px;}
.c-banner-dots li.active { background-color: rgba(0, 0, 0, 1);}
</style>

<template>
<div style="position: relative;">
   <swiper class="c-banner" autoplay @change="bannerChange">
      <swiper-item v-for="(item, index) in list" :key="index">
         <img src="/static/images/goods/img2.png" class="c-banner-img" />
      </swiper-item>
   </swiper>
   <ul class="c-banner-dots">
      <li v-for="(item, index) in list" :key="index" :class="{active: index === activeIndex}"></li>
   </ul>
</div>

</template>

<script type='es6'>
export default {
	name: 'app',
   props: {
	   list: Array
   },
	data() {
		return {
		   activeIndex: 0
      }
	},
	methods: {
      bannerChange (e) {
         this.activeIndex = e.mp.detail.current
      }
   }
}
</script>
