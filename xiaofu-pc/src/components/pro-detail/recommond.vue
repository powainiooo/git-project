<style lang="stylus" type="text/stylus" scoped>
.recommond-swiper
   margin-left -125px
   padding-top 4px
   height 330px
   .swiper-slide
      width 320px
   &:hover
      .swiper-btn
         display flex
   .swiper-btn-prev
      left 165px
   .swiper-btn-next
      right 165px
</style>

<template>
<div>
   <swiper :options="recomOption" ref="mySwiper" class="recommond-swiper">
      <!-- slides -->
      <swiper-slide v-for="i in listData" :key="i.id">
         <list-item :width="320" fold :itemData="i" @tap="getDetail(i.id)"></list-item>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-btn swiper-btn-prev recommond-prev" slot="button-prev" style="top: 130px"><i></i></div>
      <div class="swiper-btn swiper-btn-next recommond-next" slot="button-next" style="top: 130px"><i></i></div>
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
         recomOption: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            slidesOffsetBefore: 155,
            simulateTouch: false,
            navigation: {
               nextEl: '.recommond-next',
               prevEl: '.recommond-prev',
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
   inject: ['getDetailData'],
	methods: {
	   getDetail (id) {
	      this.getDetailData(id, () => {
            this.$emit('refresh')
         })
         // this.$emit('refresh')
      }
   }
}
</script>
