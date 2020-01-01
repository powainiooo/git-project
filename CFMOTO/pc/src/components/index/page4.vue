<style scoped>
.z-page4 { width: 100%; height: 100%; position: relative; background: url("../../assets/images/index/bg4.jpg") no-repeat; background-size: cover; background-position: center center; overflow: hidden; animation: fadeIn 0.5s linear 0.3s both;}
.z-page4 .p4-swiper { width: 1520px; margin: 12% auto 0 auto;}
.z-page4 .p4-swiper .swiper-wrapper { width: 100%;}
.z-page4 .p4-swiper .swiper-slide { width: 1000px; transform: scale(0.82); transform-origin: 50% 80%; opacity: 0; transition: all 0.3s ease-out;}
.z-page4 .p4-swiper .swiper-slide img { width: 100%; display: block;}
.z-page4 .p4-swiper .swiper-slide:after { content: ''; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); position: absolute; top: 0; left: 0;}
.z-page4 .p4-swiper .swiper-slide-prev { opacity: 1;}
.z-page4 .p4-swiper .swiper-slide-next { opacity: 1;}
.z-page4 .p4-swiper .swiper-slide-active {  transform: scale(1); z-index: 10; opacity: 1;}
.z-page4 .p4-swiper .swiper-slide-active:after { background-color: rgba(0, 0, 0, 0)}
.z-page4 .p4-swiper .swiper-slide .content { display: none; justify-content: space-between; align-items: center;}
.z-page4 .p4-swiper .swiper-slide .content p { width: 75%; font-size: 16px; font-family: TTHBold; color: #ffffff;}
.z-page4 .p4-swiper .swiper-slide .content p span { font-size: 36px; font-family: TTHBold;}
.z-page4 .p4-swiper .swiper-slide .content .btn1 { width: 100px; height: 100px;}
.z-page4 .p4-swiper .swiper-slide-active .content { display: flex;}
.z-page4 .p4-swiper .p4-btn-prev, .z-page4 .p4-swiper .p4-btn-next { width: 80px; height: 150px; position: absolute; top: 50%; margin-top: -75px; z-index: 50; display: none;}
.z-page4 .p4-swiper:hover .p4-btn-prev, .z-page4 .p4-swiper:hover .p4-btn-next { display: flex;}
.z-page4 .p4-swiper .p4-btn-prev { left: 210px;}
.z-page4 .p4-swiper .p4-btn-next { right: 210px;}
.z-page4 .info-section { position: absolute; left: 13%; top: 9%; animation: infoIn 0.5s ease-out 0.5s both;}
.z-page4 .label-tag { width: 190px; height: 40px; position: absolute; background: url("../../assets/images/index/icon-tag.png") no-repeat; font-size: 16px; line-height: 40px; padding-left: 15px; font-family: TTHBold; color: #1a1a1a; display: none; animation: labelIn 0.5s ease-out 0.5s both}
@keyframes labelIn {
   0% { transform: translateX(100px); opacity: 0;}
   100% { transform: translateX(0); opacity: 1;}
}
.z-page4 .swiper-slide-active .label-tag { display: block;}
</style>

<template>
<div class="z-page4">
   <div class="info-section">
      <h3 class="border">The Owner Story</h3>
   </div>
   <swiper :options="swiperP4" ref="mySwiperP4" class="p4-swiper">
      <!-- slides -->
      <swiper-slide>
         <img src="@/assets/images/index/img4-1.jpg" />
         <div class="label-tag" style="top: 70px; left: 70px;">ZEEHO Helmet</div>
         <div class="content">
            <p><span>It´s</span> time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
            <a href="javascript:;" class="btn1">Learn more</a>
         </div>
      </swiper-slide>
      <swiper-slide>
         <img src="@/assets/images/index/img4-2.jpg" />
         <div class="label-tag" style="top: 240px; left: 70px;">ZEEHO Motor</div>
         <div class="content">
            <p><span>It´s</span> time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
            <a href="javascript:;" class="btn1">Learn more</a>
         </div>
      </swiper-slide>
      <swiper-slide>
         <img src="@/assets/images/index/img4-3.jpg" />
         <div class="label-tag" style="top: 110px; left: 40px;">ZEEHO Bike</div>
         <div class="content">
            <p><span>It´s</span> time to change our every day habits and turn them into a celebration! Appreciate every single moment, enjoy it to the fullest and inspire everyone around you!</p>
            <a href="javascript:;" class="btn1">Learn more</a>
         </div>
      </swiper-slide>
      <div class="btn1 p4-btn-prev" slot="button-prev"><img src="@/assets/images/icon-arrow.png"/> </div>
      <div class="btn1 p4-btn-next" slot="button-next"><img src="@/assets/images/icon-arrow-right.png"/> </div>
   </swiper>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   data () {
      return {
         swiperP4: {
            centeredSlides: true,
            slidesPerView: 3,
            spaceBetween: -650,
            loop: true,
            navigation: {
               nextEl: '.p4-btn-next',
               prevEl: '.p4-btn-prev'
            }
         }
      }
   },
   methods: {}
}
</script>
