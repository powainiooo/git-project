<style>
    @import '../assets/css/layout.css';

    .video-frame{ width: 62.5%; position: fixed; top:0; right: 0; bottom: 70px;}

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
                <h3><span>{{detailData.title}}</span><br>{{detailData.title_ext}}</h3>
                <div v-html="detailData.goods_desc"></div>
            </div>
            <div class="audio-frame" v-if="detailData.ewm_img != '' || detailData.audio_link != ''">
                <div v-if="detailData.ewm_img != ''">
                    <a href="javascript:;"
                       @mouseover="isShowCode=true"
                       @mouseout="isShowCode=false"
                       style=" display: inline-block;">
                        <img src="@/assets/images/btn2.png">
                    </a>
                    <div class="img-frame" v-if="isShowCode"><img :src="detailData.ewm_img"> </div>
                </div>

                <audio-view
                    v-if="detailData.audio_link != ''"
                    :src="detailData.audio_link"
                    :title="detailData.audio_name"
                    style="margin-bottom: 40px;">
                </audio-view>

            </div>
            <ul class="list">
                <li>
                    <span class="name">创意</span>
                    <a href="javascript:;" class="value" @click="toAuthor">Tau</a>
                </li>
                <li>
                    <span class="name">音乐</span>
                    <a href="javascript:;" class="value" @click="toAuthor">Tau</a>
                </li>
                <li>
                    <span class="name">原画</span>
                    <a href="javascript:;" class="value" @click="toAuthor">Tau</a>
                </li>
                <li>
                    <span class="name">技术制作</span>
                    <a href="javascript:;" class="value" @click="toAuthor">Tau</a>
                </li>
                <li>
                    <span class="name">艺术指导</span>
                    <a href="javascript:;" class="value" @click="toAuthor">Tau</a>
                </li>
            </ul>
        </div>
        <div class="video-frame"
             @mouseover="scrollIn"
             @mouseout="scrollOut">
            <video-view v-if="showVideo" :vid="vid" :postImg="vPostImg"></video-view>
            <Carousel
                v-model="carouseIndex"
                v-if="!showVideo"
                dots="none"
                arrow="never"
                height="100%">
                <CarouselItem v-for="item in detailData.goods_img">
                    <div class="carousel-item"><img :src="domain_url+item"> </div>
                </CarouselItem>
            </Carousel>
            <a href="javascript:;" class="cars-btn cars-btn-left" v-if="btnLeft" @click="scrollLeft"><span><Icon type="android-arrow-back"></Icon></span></a>
            <a href="javascript:;" class="cars-btn cars-btn-right" v-if="btnRight" @click="scrollRight"><span><Icon type="android-arrow-forward"></Icon></span></a>
        </div>
        <bottom-nav posLeft="290"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    import VideoView from '@/components/VideoView.vue'
    import AudioView from '@/components/AudioView.vue'
    export default{
        name: 'App',
        components: {BottomNav,VideoView,AudioView},
        mounted(){
            this.getDetailData();
        },
        data(){
            return{
                isShowCode:false,
                showVideo:true,
                vid:'',//k0015trfczz
                carouseIndex:0,
                carouseLen:0,
                vPostImg:'',
                musicOpt:{
                    title: 'Preparation',
                    author: 'Hans Zimmer/Richard Harvey',
                    url: 'http://120.198.248.228/cache/fs.w.kugou.com/201803111645/4b1e35ffd5b41e32a2caa295a2444d6c/G052/M04/19/07/FJQEAFZWxMSAbdi-ADPyIZwJRM0272.mp3?ich_args2=114-11172107005413_429e3ab4014453e9ea220bea0ae3815c_10095002_9c89662cd0c5f1d0973d518939a83798_c178791a10375bcae2a4deb87ca5c544',
                    pic: 'http://devtest.qiniudn.com/Preparation.jpg',
                    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
                },
                detailData:{},
                domain_url:"",
                btnLeft:false,
                btnRight:false
            }
        },
        methods:{
            scrollIn(){
                if(this.carouseIndex != 0) this.btnLeft = true;
                if(this.carouseIndex != this.carouseLen -1) this.btnRight = true;
            },
            scrollOut(){
                this.btnLeft = false;
                this.btnRight = false;
            },
            scrollLeft(){
                console.log('left');
                if(this.carouseIndex != 0){
                    this.carouseIndex --;
                }
                if(this.carouseIndex == 0) this.btnLeft = false;
            },
            scrollRight(){
                console.log('right');
                if(this.carouseIndex != this.carouseLen -1){
                    this.carouseIndex ++;
                }
                if(this.carouseIndex == this.carouseLen -1) this.btnRight = false;
            },
            toAuthor(){
                this.$router.push({ name: 'workauthor', params: { id: 123 }})
            },
            getDetailData(){
                let self = this;
                let id = this.$route.params.id;
                console.log(id);
                self.$ajax.get('api/product_info',{
                    params: {
                        id: id
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.detailData = data.data;
                    self.domain_url = data.domain_url;
                    self.showVideo = data.data.video_link != '';
                    self.vPostImg = data.domain_url+data.data.video_cover;
                    self.carouseLen = data.data.goods_img.length;
                    self.vid = data.data.video_link;
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }

</script>

