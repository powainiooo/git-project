<style>
    .swiper-frame{ position: relative; margin-bottom: 80px;}
    .swiper-item a{ font-size: 36px; letter-spacing: 6px; margin-top: 10px; color: #000;}
    .swiper-item p{ font-size: 16px; letter-spacing: 6px; line-height: 1.8; margin-bottom: 15px;}
    .swiper-item .time{ padding-top: 15px;color: rgb(127,127,127);position: relative; font-size: 14px;}
    .swiper-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .swiper-item .time span{ margin-right: 30px;}
    .swiper-frame .arrow{ width: 40px; height: 560px; background-color: #fff; position: absolute; top: 0; z-index: 100; display: none;}
    .swiper-frame:hover .arrow{ display: block;}
    .swiper-frame .arrow img{ margin-top: 256px;}
    .swiper-frame .left{ left: 0;}
    .swiper-frame .right{ right: 0;}
    .swiper-frame .right img{ margin-left: -40px;}

    .recommend-item{ width: 1130px; margin-bottom: 25px; display: flex; justify-content: space-between;}
    .recommend-item .imgs{ width: 450px;}
    .recommend-item .infos{ width: 630px;}
    .recommend-item .infos a{  font-size: 28px; letter-spacing: 6px; margin-bottom: 10px; color: #000;}
    .recommend-item .infos p{ font-size: 16px; letter-spacing: 6px; line-height: 1.8; margin-bottom: 90px;word-break: break-all;text-overflow: ellipsis;-webkit-line-clamp: 2; overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;}
    .recommend-item .infos .time{ padding-top: 15px; color: rgb(127,127,127); position: relative; font-size: 14px;}
    .recommend-item .infos .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .recommend-item .infos .time span{ margin-right: 30px;}

    .welcome{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 1100; display: flex; justify-content: center; align-items: center;}
    .slide-fade-enter-active {
        transition: all 1s ease;
    }
    .slide-fade-leave-active {
        transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        opacity: 0;
    }
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide>
                        <section class="swiper-item">
                            <div><router-link to="/works/detail/1"><img src="../assets/images/index-banner1.jpg" width="1120" height="560"> </router-link></div>
                            <div v-if="activeIndex == 0">
                                <router-link to="/works/detail/1">The Next Age 穿越未來來看你</router-link>
                                <p class="hkLight">音樂作品表現大賽故宮和Next Idea 結合的主題，展現出傳統文化與未來現象之美。在前期的商討中，我們決定從京劇和Pap這兩種音樂表現形式入手</p>
                                <div class="time hkLight">
                                    <span>音樂</span>
                                    <span>項目時間 06/2018</span>
                                </div>
                            </div>
                        </section>
                    </swiper-slide>
                    <swiper-slide>
                        <section class="swiper-item">
                            <div><router-link to="/works/detail/1"><img src="../assets/images/index-banner1.jpg" width="1120" height="560"> </router-link></div>
                            <div v-if="activeIndex == 0">
                                <router-link to="/works/detail/1">The Next Age 穿越未來來看你</router-link>
                                <p>音樂作品表現大賽故宮和Next Idea 結合的主題，展現出傳統文化與未來現象之美。在前期的商討中，我們決定從京劇和Pap這兩種音樂表現形式入手</p>
                                <div class="time">
                                    <span>音樂</span>
                                    <span>項目時間 06/2018</span>
                                </div>
                            </div>

                        </section>
                    </swiper-slide>
                    <swiper-slide>
                        <section class="swiper-item">
                            <div><router-link to="/works/detail/1"><img src="../assets/images/index-banner1.jpg" width="1120" height="560"> </router-link></div>
                            <div v-if="activeIndex == 0">
                                <router-link to="/works/detail/1">The Next Age 穿越未來來看你</router-link>
                                <p>音樂作品表現大賽故宮和Next Idea 結合的主題，展現出傳統文化與未來現象之美。在前期的商討中，我們決定從京劇和Pap這兩種音樂表現形式入手</p>
                                <div class="time">
                                    <span>音樂</span>
                                    <span>項目時間 06/2018</span>
                                </div>
                            </div>
                        </section>
                    </swiper-slide>
                </swiper>
                <a href="javascript:;"
                   class="arrow left"
                   @click="bannerPrev"
                   v-if="activeIndex != 0">
                    <img src="../assets/images/arrow-left.png" width="76">
                </a>
                <a href="javascript:;"
                   class="arrow right"
                   @click="bannerNext"
                   v-if="activeIndex != bannerList.length - 1">
                    <img src="../assets/images/arrow-right.png" width="76">
                </a>
            </div>

            <div class="recommend-title">推薦案例</div>

            <div>
                <div class="recommend-item">
                    <div class="imgs"><router-link to="/works/detail/1"><img src="../assets/images/index-recm1.jpg" width="450" height="250"></router-link> </div>
                    <div class="infos">
                        <router-link to="/works/detail/1">The Next Age 穿越未來來看你</router-link>
                        <p class="hkLight">音樂作品表現大賽故宮和Next Idea 結合的主題，展現出傳統文化與未來現象之美。在前期的商討中，我們決定從京劇和Pap這兩種音樂表現形式入手</p>
                        <div class="time hkLight">
                            <span>音樂</span>
                            <span>項目時間 06/2018</span>
                        </div>
                    </div>
                </div>
            </div>
        </body-frame>
        <bottom-nav></bottom-nav>

        <transition name="slide-fade">
        <div class="welcome" v-if="isGuide"><img src="../assets/images/loading.gif"> </div>
        </transition>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,BodyFrame},
        computed:{
            isGuide(){
                return this.$store.state.isGuide
            }
        },
        data(){
            let self = this;
            return{
                swiperOption: {
                    width: 1120,
                    spaceBetween:25,
                    simulateTouch : false,
                    on: {
                        slideChangeTransitionStart: function(){
                            self.activeIndex = this.activeIndex;
                        }
                    }
                },
                bannerList:[{},{},{}],
                swiper:null,
                activeIndex:0
            }
        },
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;

            if(this.isGuide){
                setTimeout(()=>{
                    this.$store.commit('doPassGuide');
                },2000);

            }
        },
        methods: {
            bannerPrev(){
                this.swiper.slidePrev();
            },
            bannerNext(){
                this.swiper.slideNext();
            }
        }
    }

</script>

