<style lang="stylus" type="text/stylus" scoped>
.recommond-swiper
   margin-left 30px
   .swiper-slide
      width 320px
   &:hover
      .swiper-btn
         display flex
</style>

<template>
<div>
   <swiper :options="swiperOption" ref="mySwiper" class="recommond-swiper">
      <!-- slides -->
      <swiper-slide v-for="i in listData" :key="i.id">
         <list-item :width="320" fold :itemData="i"></list-item>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-btn swiper-btn-prev" slot="button-prev" style="top: 180px"><i></i></div>
      <div class="swiper-btn swiper-btn-next" slot="button-next" style="top: 180px"><i></i></div>
   </swiper>
</div>
</template>

<script type='es6'>
import listItem from '@/components/listItem.vue'
export default {
	name: 'app',
   components: {listItem},
	data() {
		return {
         swiperOption: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
               el: '.swiper-pagination'
            },
            navigation: {
               nextEl: '.swiper-btn-next',
               prevEl: '.swiper-btn-prev',
            }
         }
      }
	},
   props: {
      listData: {
         type: Array,
         default: () => []
      }
   },
	methods: {}
}
</script>
