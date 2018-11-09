<style>
    .swiper-container{ height: 100vh; overflow: hidden;}
</style>

<template>
    <div>
        <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide v-if="p1Show" page="page1"><page1></page1></swiper-slide>
            <swiper-slide v-if="p2Show" page="page2"><page2></page2></swiper-slide>
            <swiper-slide v-if="p3Show" page="page3"><page3></page3></swiper-slide>
            <swiper-slide v-if="p4Show" page="page4"><page4></page4></swiper-slide>
            <swiper-slide v-if="p5Show" page="page5"><page5></page5></swiper-slide>
            <swiper-slide v-if="p6Show" page="page6"><page6></page6></swiper-slide>
            <swiper-slide v-if="p7Show" page="page7"><page7></page7></swiper-slide>
            <swiper-slide v-if="p8Show" page="page8"><page8></page8></swiper-slide>
            <swiper-slide v-if="p9Show" page="page9"><page9></page9></swiper-slide>
            <swiper-slide v-if="p10Show" page="page10"><page10></page10></swiper-slide>
        </swiper>
    </div>
</template>

<script type='es6'>
    import page1 from '@/components/page1'
    import page2 from '@/components/page2'
    import page3 from '@/components/page3'
    import page4 from '@/components/page4'
    import page5 from '@/components/page5'
    import page6 from '@/components/page6'
    import page7 from '@/components/page7'
    import page8 from '@/components/page8'
    import page9 from '@/components/page9'
    import page10 from '@/components/page10'
    export default {
        name: 'app',
        components:{page1,page2,page3,page4,page5,page6,page7,page8,page9,page10},
        mounted(){
            this.startTime = new Date().getTime();
        },
        data(){
            let self = this;
            return{
                startTime:0,
                endTime:0,
                currentPage:'page1',
                swiperOption: {
                    direction : 'vertical',
                    height:window.innerHeight,
                    on:{
                        slideChangeTransitionStart(){
                            let endTime = new Date().getTime();
                            if(window.stayTime[self.currentPage]){
                                window.stayTime[self.currentPage] += endTime - self.startTime;
                            }else{
                                window.stayTime[self.currentPage] = endTime - self.startTime;
                            }
                            self.startTime = endTime;
                        },
                        slideChangeTransitionEnd(){
                            let pageName = self.$refs.mySwiper.$children[this.activeIndex].$attrs.page;
                            self.currentPage = pageName;
                            window.outPage = pageName;
                        }
                    }
                }
            }
        },
        computed:{
            p1Show(){
                return true
            },
            p2Show(){
                return true
            },
            p3Show(){
                return true
            },
            p4Show(){
                return true
            },
            p5Show(){
                return true
            },
            p6Show(){
                return true
            },
            p7Show(){
                return true
            },
            p8Show(){
                return true
            },
            p9Show(){
                return true
            },
            p10Show(){
                return true
            }
        },
        methods:{

        }
    }

</script>

