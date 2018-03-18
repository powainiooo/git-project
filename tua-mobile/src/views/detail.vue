<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';

    .swipe-img{ width: 100%;}
    .swipe-tag{ width: 100%; text-align: center; position: absolute; bottom:-40px; left: 0; z-index: 10;}
    .swipe-tag li{ width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin: 0 25px; background-color: #949695; vertical-align: middle;}
    .swipe-tag li.active{ width: 20px; height: 20px; margin-top: 0; background-color: #ad9040;}

    .scaleIn-enter-active {
        transition: all .3s ease;
    }
    .scaleIn-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .scaleIn-enter, .scaleIn-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: scale(0);
        opacity: 0;
    }


</style>

<template>
    <div class="page-frame">
        <transition name="scaleIn">
        <div class="video-frame" v-if="videoFrame">
            <video-view v-if="showVideo" :vid="vid" :postImg="vPostImg"></video-view>
            <swiper :options="swiperOption" ref="mySwiper" v-if="!showVideo">
                <swiper-slide v-for="item in detailData.goods_img"><img :src="domain_url+item" class="swipe-img"> </swiper-slide>
            </swiper>
            <div class="swiper-pagination"></div>
            <ul class="swipe-tag" v-if="!showVideo">
                <li v-for="(item,index) in detailData.goods_img.length" :class="activeIndex == index ? 'active':''"></li>
            </ul>
        </div>
        </transition>
        <!--<transition enter-active-class="animated tsd slideInUp">-->
            <!--<div v-if="line0">-->
                <!--<ul class="swipe-tag" v-if="!showVideo">-->
                    <!--<li v-for="(item,index) in detailData.goods_img.length" :class="activeIndex == index ? 'active':''"></li>-->
                <!--</ul>-->
            <!--</div>-->
        <!--</transition>-->

        <div class="detail-infor">
            <transition enter-active-class="animated tsd slideInUp">
            <div class="intro" v-if="line1">
                <h3><span>{{detailData.title}}</span><br>{{detailData.title_ext}}</h3>
            </div>
            </transition>

            <transition enter-active-class="animated tsd slideInUp">
            <div v-if="line2">
                <div class="intro" v-if="detailData.goods_desc != ''">
                    <div v-html="detailData.goods_desc"></div>
                </div>
            </div>
            </transition>

            <transition enter-active-class="animated tsd slideInUp">
            <div v-if="line3">
                <div class="audio-frame" v-if="detailData.ewm_img != '' || detailData.audio_link != ''">
                    <div>
                        <a :href="detailData.h5_link" class="btn-demo" v-if="detailData.ewm_img != ''">
                            <img src="@/assets/images/btn1.png">
                        </a>
                    </div>

                    <audio-view
                        ref="audios"
                        :src="domain_url+detailData.audio_link"
                        :title="detailData.audio_name"
                        v-if="detailData.audio_link != ''"></audio-view>
                </div>
            </div>
            </transition>

            <transition enter-active-class="animated tsd slideInUp">
            <ul class="list" v-if="line4">
                <li v-for="item in detailData.author">
                    <span class="name">{{item.cname}}</span>
                    <span class="value">{{item.name}}</span>
                </li>
            </ul>
            </transition>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    import VideoView from '@/components/VideoView.vue'
    import AudioView from '@/components/AudioView.vue'
    export default{
        name: 'detail',
        components:{FooterNav,VideoView,AudioView},
        mounted(){
            this.init();
            this.move();
        },
        data(){
            let self = this;
            return{
                vid:'',//
                vPostImg:'',
                showVideo:false,
                activeIndex:0,
                swiperOption:{
                    on:{
                        slideChangeTransitionEnd: function(swiper){
                            self.activeIndex = self.$refs.mySwiper.swiper.activeIndex;
                            console.log(index);
                        }
                    }
                },
                detailData:{
                    goods_img:[]
                },
                domain_url:'',
                videoFrame:false,
                line0:false,
                line1:false,
                line2:false,
                line3:false,
                line4:false
            }
        },
        beforeRouteLeave (to, from, next){
            let audio = this.$refs.audios;
            if(typeof audio.doPause == 'function'){
                audio.doPause();
            }
            next();
        },
        methods:{
            init(){
                let self = this;
                self.$ajax.get('/admin/api/product_info',{
                    params:{
                        id:self.$route.params.id
                    }
                }).then((res)=>{
                    var data = res.data;
                    self.detailData = data.data;
                    self.showVideo = data.data.video_link != '';
                    self.domain_url = data.domain_url;
                    self.vid = data.data.video_link;
                    self.vPostImg = data.domain_url + data.data.video_cover;
                })
            },
            move(){
                let self = this;
                self.videoFrame = true;
                setTimeout(()=>{
                    self.line0 = true;
                },600);
                setTimeout(()=>{
                    self.line1 = true;
                },700);
                setTimeout(()=>{
                    self.line2 = true;
                },800);
                setTimeout(()=>{
                    self.line3 = true;
                },900);
                setTimeout(()=>{
                    self.line4 = true;
                },1000);
            }
        }
    }

</script>

