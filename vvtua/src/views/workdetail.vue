<style>
    @import '../assets/css/layout.css';

    .video-frame{ width: 62.5%; position: fixed; top:0; right: 0; bottom: 100px;}

    .detail-frame{ overflow: hidden;}

    .detail-frame .detail-infor .audio-frame{ margin: 0 95px 0 75px; padding: 45px 50px 45px 0; border-bottom: 1px solid #5c5e5d; position: relative;}
    .detail-frame .detail-infor .audio-frame .img-frame{ width: 276px; height: 273px; background: url("../assets/images/bubble.png") no-repeat; position: absolute; top: -235px; left: 70px;}
    .detail-frame .detail-infor .audio-frame .img-frame img{ margin: 25px 0 0 37px;}

    .detail-frame .detail-infor .list{ margin: 30px 95px 110px 75px; overflow: hidden;}
    .detail-frame .detail-infor .list li{ width: 50%; float: left; margin-bottom: 15px; font-size: 14px; color: rgba(255,255,255,0.5);}
    .detail-frame .detail-infor .list li .name{ display: inline-block; width: 50%;}
    .detail-frame .detail-infor .list li .value{ color: #bc9e44; font-family: Micro Yahei;}

    .carousel-item{ width: 100%; height: 100%;}
    .carousel-item img{ width: 100%; height: 100%;}
    .video-frame .ivu-carousel{ width: 100%; height: 100%;}
    .video-frame .ivu-carousel-list{ width: 100%; height: 100%;}
    .video-frame .ivu-carousel-track{ width: 100%; height: 100%;}
    .video-frame .ivu-carousel-item{ width: 100%; height: 100%;}
    .video-frame .cars-btn{ width: 50px; height: 100%; background-color: #171918; position: absolute;top: 0;  text-align: center; z-index: 10;}
    .video-frame .cars-btn span{ display: inline-block; position: relative; top: 50%; font-size: 30px; color: #fff; margin-top: -22px;}
    .video-frame .cars-btn-left{ left: 0;}
    .video-frame .cars-btn-right{ right: 0;}
</style>

<template>
    <div class="detail-frame">
        <div class="top-bar">
            <router-link to="/index" class="logo"><img src="@/assets/images/logofix1.png"></router-link>
            <router-link to="/works" class="btn"><img src="@/assets/images/btn-back.png"></router-link>
        </div>
        <div class="detail-infor">
            <div class="intro">
                <h3><span>HAVE SOME PATIENCE</span><br>“来玩点耐心吧”腾讯up发布会推广</h3>
                <div>はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                    人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                    コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています</div>
            </div>
            <div class="audio-frame">
                <a href="javascript:;"
                   @mouseover="isShowCode=true"
                   @mouseout="isShowCode=false"
                   style="margin-bottom: 40px; display: inline-block;">
                    <img src="@/assets/images/btn2.png">
                </a>
                <div class="img-frame" v-if="isShowCode"><img src="@/assets/images/ad2.jpg"> </div>
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
        <div class="video-frame">
            <video-view v-if="vid != ''" :vid="vid" :postImg="vPostImg"></video-view>
            <Carousel v-model="carouseIndex" dots="none">
                <CarouselItem>
                    <div class="carousel-item"><img src="@/assets/images/proimg2.jpg"> </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="carousel-item"><img src="@/assets/images/proimg2.jpg"> </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="carousel-item"><img src="@/assets/images/proimg2.jpg"> </div>
                </CarouselItem>
                <CarouselItem>
                    <div class="carousel-item"><img src="@/assets/images/proimg2.jpg"> </div>
                </CarouselItem>
            </Carousel>
            <a href="javascript:;" class="cars-btn cars-btn-left"><span><Icon type="android-arrow-back"></Icon></span></a>
            <a href="javascript:;" class="cars-btn cars-btn-right"><span><Icon type="android-arrow-forward"></Icon></span></a>
        </div>
        <bottom-nav posLeft="280"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    import VideoView from '@/components/VideoView.vue'
    import AudioView from '@/components/AudioView.vue'
    export default{
        name: 'App',
        components: {BottomNav,VideoView,AudioView},
        data(){
            return{
                isShowCode:false,
                vid:'',//k0015trfczz
                carouseIndex:0,
                vPostImg:'static/images/proimg2.jpg',
                musicOpt:{
                    title: 'Preparation',
                    author: 'Hans Zimmer/Richard Harvey',
                    url: 'http://120.198.248.228/cache/fs.w.kugou.com/201803111645/4b1e35ffd5b41e32a2caa295a2444d6c/G052/M04/19/07/FJQEAFZWxMSAbdi-ADPyIZwJRM0272.mp3?ich_args2=114-11172107005413_429e3ab4014453e9ea220bea0ae3815c_10095002_9c89662cd0c5f1d0973d518939a83798_c178791a10375bcae2a4deb87ca5c544',
                    pic: 'http://devtest.qiniudn.com/Preparation.jpg',
                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                }
            }
        }
    }

</script>

