<style>
    @import "../../assets/css/layout.css";
    .index-frame{ background-color: #000;}
    .index-swiper{ height: 100%; color: #fff;}
</style>

<template>
    <div class="page-frame index-frame">
        <top-nav></top-nav>

        <swiper :options="swiperOption" ref="mySwiper" class="index-swiper">
            <!-- slides -->
            <swiper-slide>I'm Slide 1</swiper-slide>
            <swiper-slide>I'm Slide 2</swiper-slide>
            <swiper-slide>I'm Slide 3</swiper-slide>
            <swiper-slide>I'm Slide 4</swiper-slide>
            <swiper-slide>I'm Slide 5</swiper-slide>
            <swiper-slide>I'm Slide 6</swiper-slide>
            <swiper-slide>I'm Slide 7</swiper-slide>
        </swiper>

        <footer-nav :index="slideIndex"></footer-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav'
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'index',
        components:{TopNav,FooterNav},
        data(){
            let self = this;
            return{
                slideIndex:1,
                swiperOption: {
                    on:{
                        slideChangeTransitionStart: function(swiper){
                            self.slideIndex = self.$refs.mySwiper.swiper.activeIndex + 1;
                            console.log(self.slideIndex)
                        }
                    }
                }
            }
        }
    }

</script>

