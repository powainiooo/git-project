<style>
    @import '../assets/css/layout.css';
    .swipe-img{ width: 100%;}
    .swipe-tag{ width: 100%; text-align: center; margin-top:20px;}
    .swipe-tag li{ width: 10px; height: 10px; border-radius: 50%; display: inline-block; margin: 0 25px; background-color: #949695; vertical-align: middle;}
    .swipe-tag li.active{ width: 20px; height: 20px; margin-top: 0; background-color: #ad9040;}
</style>

<template>
    <div class="page-frame">
        <div class="video-frame">
            <video-view v-if="showVideo" :vid="vid" :postImg="vPostImg"></video-view>
            <swiper :options="swiperOption" ref="mySwiper" v-if="!showVideo">
                <swiper-slide v-for="item in detailData.goods_img"><img :src="domain_url+item" class="swipe-img"> </swiper-slide>
            </swiper>
            <div class="swiper-pagination"></div>
            <ul class="swipe-tag" v-if="!showVideo">
                <li v-for="(item,index) in detailData.goods_img.length" :class="activeIndex == index ? 'active':''"></li>
            </ul>
        </div>
        <div class="detail-infor">
            <div class="intro">
                <h3><span>{{detailData.title}}</span><br>{{detailData.title_ext}}</h3>
            </div>
            <div class="intro">
                <div v-html="detailData.goods_desc"></div>
            </div>
            <div class="audio-frame" v-if="detailData.ewm_img != '' || detailData.audio_link != ''">
                <a :href="detailData.h5_link" class="btn-demo" v-if="detailData.ewm_img != ''">
                    <img src="@/assets/images/btn1.png">
                </a>
                <audio-view
                    :src="detailData.audio_link"
                    :title="detailData.audio_name"
                    v-if="detailData.audio_link != ''"></audio-view>
            </div>
            <ul class="list">
                <li>
                    <span class="name">创意</span>
                    <span class="value">Tau</span>
                </li>
                <li>
                    <span class="name">音乐</span>
                    <span class="value">Tau</span>
                </li>
                <li>
                    <span class="name">原画</span>
                    <span class="value">Tau</span>
                </li>
                <li>
                    <span class="name">技术制作</span>
                    <span class="value">Tau</span>
                </li>
                <li>
                    <span class="name">艺术指导</span>
                    <span class="value">Tau</span>
                </li>
            </ul>
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
                domain_url:''
            }
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
            }
        }
    }

</script>

