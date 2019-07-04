<style>
   .z-list-item { position: relative; margin-bottom: 25px;}
   .z-list-item-swiper { height: 210px;}
   .z-list-item-swiper img { width: 100%; display: block;}
   .z-list-item-swiper .swiper-pagination { bottom: 3px;}
   .z-list-item-swiper .swiper-pagination .swiper-pagination-bullet { width: 3px; height: 3px; margin: 0 1.5px; background: #D8D8D8; opacity: 1;}
   .z-list-item-swiper .swiper-pagination .swiper-pagination-bullet-active { background: #2B5FD5;}
   .z-list-item-middle { display: flex; justify-content: space-between; align-items: center; margin: 13px 0;}
   .z-list-item-middle .z-list-item-middle-name { font-size: 18px; font-family: PingFang-SC-Bold; color: #333333; line-height: 18px; font-weight: normal;}
   .z-list-item-middle .z-list-item-middle-btn { width: 76px; height: 28px; background-color: #2B5FD5; border-radius: 15px; color: #ffffff; font-size: 16px; border: none; -webkit-tap-highlight-color: transparent; outline: none;}
   .z-list-item-info { height: 50px; font-size: 16px; color: #666666; text-align: justify; line-height: 26px; overflow: hidden; position: relative;}
   .z-list-item-info-ellipsis:after { content: '......'; background-color: #ffffff; font-size: 16px; color: #666666; position: absolute; right: 0; bottom: 0;}
   .z-list-item-arrow { width: 14px; position: absolute; bottom: 6px; right: 0; background-color: #ffffff;}
   .z-list-item-show .z-list-item-info { height: auto;}
   .z-list-item-show .z-list-item-info-ellipsis:after { content: ''}
   .z-list-item-show .z-list-item-arrow { transform: rotateZ(180deg)}
   .z-list-item-using { width: 45px; position: absolute; top: 0; left: 0; z-index: 100;}
</style>

<template>
   <div class="z-list-item" :class="{'z-list-item-show':showDetail}">
      <swiper :options="swiperOption" ref="mySwiper" class="z-list-item-swiper">
         <!-- slides -->
         <swiper-slide v-for="(src, i) in itemData.swiper" :key="i"><img :src="src" /></swiper-slide>
         <!-- Optional controls -->
         <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <div class="z-list-item-middle">
         <h4 class="z-list-item-middle-name">{{itemData.name}}</h4>
         <button class="z-list-item-middle-btn" @click="doSet">预设</button>
      </div>
      <div class="z-list-item-info"
           :class="{'z-list-item-info-ellipsis':showEllipsis}"
           @click="showDetail = !showDetail">{{itemData.info}}</div>
      <img src="@/assets/icon-arrow.png" class="z-list-item-arrow" v-show="showArrow">
      <img src="@/assets/icon-using.png" class="z-list-item-using" v-show="userId === itemData.id">
   </div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      itemData: {
         type: Object,
         default: () => {}
      },
      userId: {
         type: String,
         default: ''
      }
   },
   computed: {
      infoLength () {
         let len = 0; let str = this.itemData.info
         for (let i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
               len += 2
            } else {
               len++
            }
         }
         return len
      },
      showEllipsis () {
         if (this.showDetail) {
            return false
         } else {
            const len = this.infoLength
            if (len < 90) {
               return false
            }
            return true
         }
      },
      showArrow () {
         const len = this.infoLength
         if (this.showDetail) {
            if (len % 46 === 0) {
               return false
            }
            return true
         } else {
            if (len < 90) {
               return false
            }
            return true
         }
      }
   },
   data () {
      return {
         swiperOption: {
            pagination: {
               el: '.swiper-pagination'
            }
         },
         showDetail: false
      }
   },
   methods: {
      doSet () {
         this.$emit('doset', this.itemData)
      }
   }
}
</script>
