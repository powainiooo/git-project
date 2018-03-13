<style>
    @import '../assets/css/layout.css';
    .swipe-img{ width: 100%;}

</style>

<template>
    <div class="page-frame">
        <div class="video-frame">
            <video-view v-if="showVideo" :vid="vid" :postImg="vPostImg"></video-view>
            <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" v-if="!showVideo">
                <swiper-slide><img src="@/assets/images/img2.jpg" class="swipe-img"> </swiper-slide>
                <swiper-slide><img src="@/assets/images/img2.jpg" class="swipe-img"> </swiper-slide>
                <swiper-slide><img src="@/assets/images/img2.jpg" class="swipe-img"> </swiper-slide>
                <swiper-slide><img src="@/assets/images/img2.jpg" class="swipe-img"> </swiper-slide>
            </swiper>
        </div>
        <i-switch size="large" v-model="showVideo" class="switch">
            <span slot="open">视频</span>
            <span slot="close">图片</span>
        </i-switch>
        <div class="detail-infor">
            <div class="intro">
                <h3><span>HAVE SOME PATIENCE</span><br>“来玩点耐心吧”腾讯up发布会推广</h3>
            </div>
            <div class="intro">
                <div>はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                    人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                    コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています</div>
            </div>
            <div class="audio-frame">
                <a href="javascript:;" class="btn-demo">
                    <img src="@/assets/images/btn1.png">
                </a>
                <audio-view :src="musicOpt.url" :title="musicOpt.title"></audio-view>
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
        data(){
            return{
                vid:'k0015trfczz',//
                vPostImg:'static/img2.jpg',
                showVideo:false,
                musicOpt:{
                    title: 'Preparation',
                    author: 'Hans Zimmer/Richard Harvey',
                    url: 'http://120.198.248.228/cache/fs.w.kugou.com/201803111645/4b1e35ffd5b41e32a2caa295a2444d6c/G052/M04/19/07/FJQEAFZWxMSAbdi-ADPyIZwJRM0272.mp3?ich_args2=114-11172107005413_429e3ab4014453e9ea220bea0ae3815c_10095002_9c89662cd0c5f1d0973d518939a83798_c178791a10375bcae2a4deb87ca5c544',
                    pic: 'http://devtest.qiniudn.com/Preparation.jpg',
                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                },
                swiperOption:{}
            }
        },
        methods:{
            callback(){
                console.log(1)
            }
        }
    }

</script>

