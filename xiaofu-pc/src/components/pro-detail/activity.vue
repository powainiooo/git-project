<style lang="stylus" type="text/stylus" scoped>
.activity-swiper
   margin-left 30px
   .swiper-slide
      width 440px
      height 226px
   .activity-img
      width 100%
      height 100%
      box-shadow 0 0 10px rgba(0, 0, 0, 0.2)
      border-radius 10px
   &:hover
      .swiper-btn
         display flex
.swiper-pagination
   width 500px
   position relative
   margin-top 20px
   text-align center
/deep/ .swiper-pagination-bullet
   width 10px
   height 10px
   background-color transparent
   border 1px solid #868686
   opacity 1
   margin 0 4px
/deep/ .swiper-pagination-bullet-active
   border-color #002aa6
   background-color #002aa6
.swiper-content
   width 440px
   margin-left 30px
   margin-top 30px
   font-size 14px
   line-height 1.8
   color #888888
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
   <swiper :options="swiperOption" ref="mySwiper" class="activity-swiper" v-if="listData.length !== 0">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in listData" :key="index">
         <img :src="imgSrc + item.img" class="activity-img">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-btn swiper-btn-prev" slot="button-prev"><i></i></div>
      <div class="swiper-btn swiper-btn-next" slot="button-next"><i></i></div>
      <div class="swiper-pagination"  slot="pagination"></div>
   </swiper>
   <div class="swiper-content">{{content}}</div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {
         swiperOption: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
               el: '.swiper-pagination',
               clickable :true
            },
            navigation: {
               nextEl: '.swiper-btn-next',
               prevEl: '.swiper-btn-prev',
            }
         },
         content: this.listData[0].desc
      }
	},
   props: {
      listData: {
         type: Array,
         default: () => []
      }
   },
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      }
   },
	methods: {}
}
</script>
