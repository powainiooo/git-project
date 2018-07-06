<style>
    .swiper-frame{ position: relative;  margin: 0 -3% 40px -3%;}
    .swiper-frame .dots{ display: flex; align-items: center; margin-top: 10px; margin-left: 3%;}
    .swiper-frame .dots li{ width: 4px; height: 4px; border-radius: 50%; background-color: #181a19; margin-right: 10px;}
    .swiper-frame .dots li.active{ width: 8px; height: 8px; background-color: #c29836;}

    .detail-infos{ margin-top: 25px;}
    .detail-infos h3{ font-size: 20px; letter-spacing: 6px; margin-bottom: 15px;}
    .detail-infos p{ font-size: 14px; letter-spacing: 6px; line-height: 1.8; margin-bottom: 15px;}
    .detail-infos .time{ padding-top: 15px; color: rgb(127,127,127); position: relative; font-size: 10px; margin-bottom: 15px;}
    .detail-infos .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .detail-infos .time span{ margin-right: 30px;}
    .detail-infos .author-list{ width: 100%; display: flex; flex-wrap: wrap; margin:40px 0;}
    .detail-infos .author-list li{ width: 50%; font-size: 12px; color: rgb(158,159,159); margin-bottom: 8px; display: flex;}
    .detail-infos .author-list li span{ width: 100px;}

    .audio-frame{ margin: 25px 0 30px 0;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide><img src="../assets/images/banner1.jpg"> </swiper-slide>
                    <swiper-slide><img src="../assets/images/banner2.jpg"> </swiper-slide>
                    <swiper-slide><img src="../assets/images/banner3.jpg"> </swiper-slide>
                </swiper>
                <ul class="dots">
                    <li v-for="(item,index) in bannerList" :class="activeIndex == index ? 'active' : ''"></li>
                </ul>
            </div>

            <div style="margin: 0 -3%">
                <video-view :vid="vid" :postImg="vPostImg"></video-view>
            </div>


            <div class="detail-infos">
                <h3>The Next Age 穿越未來來看你</h3>
                <div class="time hkLight">
                    <span>音樂</span>
                    <span>項目時間 06/2018</span>
                </div>

                <div class="audio-frame">
                    <audio-view
                        src="test"
                        title="test">
                    </audio-view>
                </div>

                <div>
                    <p class="hkLight">音樂作品表現大賽故宮和Next Idea 結合的主題，展現出傳統文化與未來現象之美。在前期的商討中，我們決定從京劇和Pap這兩種音樂表現形式入手</p>
                </div>

                <ul class="author-list">
                    <li class="hkLight">
                        <span>創意</span>
                        <span>TUA</span>
                    </li>
                    <li class="hkLight">
                        <span>音樂</span>
                        <span>TUA</span>
                    </li>
                    <li class="hkLight">
                        <span>原畫</span>
                        <span>TUA</span>
                    </li>
                    <li class="hkLight">
                        <span>技術製作</span>
                        <span>TUA</span>
                    </li>
                    <li class="hkLight">
                        <span>藝術指導</span>
                        <span>TUA</span>
                    </li>
                </ul>
            </div>

            <div class="recommend-title">推薦案例</div>
            <div class="clearfix item-list">
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
                <work-item></work-item>
            </div>
        </body-frame>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import AudioView from '@/components/AudioView.vue'
    import VideoView from '@/components/VideoView.vue'
    export default{
        name: 'App',
        components:{TopNav,WorkItem,BodyFrame,AudioView,VideoView},
        data(){
            let self = this;
            return{
                swiperOption:{
                    simulateTouch : false,
                    on: {
                        slideChangeTransitionStart: function(){
                            self.activeIndex = this.activeIndex;
                        }
                    }
                },
                bannerList:[{},{},{}],
                swiper:null,
                activeIndex:0,
                vid:'',//k0015trfczz
                vPostImg:''
            }
        },
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;
        },
        methods: {
            bannerPrev(){
                this.swiper.slidePrev();
            },
            bannerNext(){
                this.swiper.slideNext();
            }
        },
        computed:{
            media(){
                return this.$store.state.audio;
            }
        },
        beforeRouteLeave (to, from, next){
            if(typeof this.media.pause == 'function'){
                this.media.pause();
            }
            next();
        }
    }

</script>

