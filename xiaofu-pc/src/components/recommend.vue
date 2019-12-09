<style lang="stylus" type="text/stylus" scoped>
   .recommend-list
      width 100%
      height 365px
      flex-shrink 0
      background url("../assets/images/bg1.jpg") no-repeat
      background-position left center
      background-size cover
      background-color #dddddd
      margin-bottom 50px
      display flex
      overflow-y hidden
      overflow-x auto
      position relative
      &::-webkit-scrollbar{ width: 3px; background-color: #ffffff;}
      &::-webkit-scrollbar-thumb{ background-color: #002aa6;}
      &>h3
         font-size 16px
         position absolute
         left 200px
         top 30px
      .recommend-swiper
         width 100%
         margin 75px 0 0 0
         padding-top 5px
         .swiper-slide
            width 265px
      &:hover
         .swiper-btn
            display flex
</style>

<template>
   <div class="recommend-list" :style="styles">
      <h3>{{title}}</h3>
      <swiper :options="swiperOption" ref="mySwiper" class="recommend-swiper">
         <!-- slides -->
         <swiper-slide v-for="i in listData" :key="i.id">
            <list-item :width="268" fold :itemData="i" @tap="linkTo(i.id)"></list-item>
         </swiper-slide>
         <!-- Optional controls -->
      </swiper>
      <div class="swiper-btn swiper-btn-prev" slot="button-prev" style="top: 180px" v-if="listData.length > 4"><i></i></div>
      <div class="swiper-btn swiper-btn-next" slot="button-next" style="top: 180px" v-if="listData.length > 4"><i></i></div>
   </div>
</template>

<script>
   import listItem from '@/components/listItem.vue'
   export default {
      name: "recommend",
      components: {listItem},
      props: {
         listData: {
            type: Array,
            default: () => []
         },
         title: {
            type: String,
            default: ''
         },
         bgSrc: {
            type: String,
            default: ''
         }
      },
      computed: {
         imgSrc () {
            return this.$store.state.imgSrc
         },
         styles () {
            return {
               'background-image': `url("${this.imgSrc}${this.bgSrc}")`
            }
         }
      },
      data() {
         return {
            swiperOption: {
               slidesPerView: 'auto',
               spaceBetween: 15,
               simulateTouch: false,
               slidesOffsetBefore: 200,
               navigation: {
                  nextEl: '.swiper-btn-next',
                  prevEl: '.swiper-btn-prev',
               }
            }
         }
      },
      methods:{
         linkTo (id) {
            this.$emit('linkTo', id)
         }
      }
   }
</script>
