<style lang="stylus" type="text/stylus" scoped>
.activity-swiper
   padding-top 10px
   padding-bottom 10px
   margin-left -125px
   margin-top -10px
   margin-bottom -10px
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
   .swiper-btn-prev
      left 170px
   .swiper-btn-next
      right 170px
   .swiper-pagination
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
</style>

<template>
<div>
   <swiper :options="activityOption" ref="mySwiper" class="activity-swiper" v-if="listData.length !== 0">
      <!-- slides -->
      <swiper-slide v-for="(item, index) in listData" :key="index">
         <img :src="imgSrc + item.img" class="activity-img">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-btn swiper-btn-prev activity-prev" slot="button-prev" v-if="listData.length > 1"><i></i></div>
      <div class="swiper-btn swiper-btn-next activity-next" slot="button-next" v-if="listData.length > 1"><i></i></div>
      <div class="swiper-pagination"  slot="pagination" v-if="listData.length > 1"></div>
   </swiper>
   <div class="swiper-content">{{content}}</div>
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
	   const self = this
		return {
         activityOption: {
            slidesPerView: 'auto',
            spaceBetween: 16,
            centeredSlides: true,
            pagination: {
               el: '.swiper-pagination',
               clickable :true
            },
            navigation: {
               nextEl: '.activity-next',
               prevEl: '.activity-prev',
            },
            on: {
               slideChange () {
                  const index = this.activeIndex
                  self.content = self.listData[index].desc
               }
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
