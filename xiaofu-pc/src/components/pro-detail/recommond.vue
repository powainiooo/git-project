<style lang="stylus" type="text/stylus" scoped>
.recommond-swiper
   margin-left 30px
   padding-top 4px
   .swiper-slide
      width 320px
   &:hover
      .swiper-btn
         display flex
.swiper-btn
   width 30px
   height 30px
   border-radius 50%
   display none
   justify-content center
   align-items center
   background-color #ffffff
   position absolute
   top 98px
   z-index 10
   &:hover
      background-color #002aa6
   i
      width 6px
      height 10px
.swiper-btn-prev
   left 20px
   i
      background-image url("../../assets/images/arrow-left.png")
   &:hover
      i
         background-image url("../../assets/images/arrow-left-active.png")
.swiper-btn-next
   right 20px
   i
      background-image url("../../assets/images/arrow-right.png")
   &:hover
      i
         background-image url("../../assets/images/arrow-right-active.png")
</style>

<template>
<div>
   <swiper :options="swiperOption" ref="mySwiper" class="recommond-swiper">
      <!-- slides -->
      <swiper-slide v-for="i in listData" :key="i.id">
         <list-item :width="320" fold :itemData="i" @tap="getDetail(i.id)"></list-item>
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
            simulateTouch: false,
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
   inject: ['getDetailData'],
	methods: {
	   getDetail (id) {
	      this.getDetailData(id)
         this.$emit('refresh')
      }
   }
}
</script>
