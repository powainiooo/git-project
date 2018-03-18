<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';

    .video-frame{ width: 62.5%; position: fixed; top:0; right: 0; bottom: 70px;}

    .detail-frame{ overflow: hidden;}

    .detail-frame .detail-infor .audio-frame{ margin: 0 95px 0 75px; padding: 45px 50px 45px 0; border-bottom: 1px solid #5c5e5d; position: relative;}
    .detail-frame .detail-infor .audio-frame .img-frame{ width: 276px; height: 273px; background: url("../assets/images/bubble.png") no-repeat; position: absolute; top: -235px; left: 70px;}
    .detail-frame .detail-infor .audio-frame .img-frame img{ width: 200px; height: 200px; margin: 25px 0 0 37px;}
    .detail-frame .detail-infor .audio-frame>div:first-child{ margin-bottom: 40px;}
    .detail-frame .detail-infor .audio-frame>div:last-child{ margin-bottom: 0px;}

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

    .tsd{ animation-duration: 0.5s;}
</style>

<template>
    <div class="detail-frame">
        <div class="top-bar">
            <router-link to="" class="logo"><img src="@/assets/images/logofix1.png"></router-link>
            <router-link to="/works" class="btn"><img src="@/assets/images/btn-back.png"></router-link>
        </div>
        <div class="detail-infor">
            <transition enter-active-class="animated tsd slideInLeft">
            <div class="intro" v-show="showIntro">
                <h3><span>{{detailData.title}}</span><br>{{detailData.title_ext}}</h3>
                <div v-html="detailData.goods_desc"></div>
            </div>
            </transition>

            <transition enter-active-class="animated tsd slideInLeft">
            <div v-if="showDemo">
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
                    :src="domain_url+detailData.audio_link"
                    :title="detailData.audio_name">
                </audio-view>

            </div>
            </div>
            </transition>

            <transition enter-active-class="animated tsd slideInLeft">
            <ul class="list" v-show="authorList">
                <li v-for="item in detailData.author">
                    <span class="name">{{item.cname}}</span>
                    <a href="javascript:;" class="value" @click="toAuthor(item.id)">{{item.name}}</a>
                </li>
            </ul>
            </transition>
        </div>

        <transition name="scaleIn">
        <div class="video-frame"
             @mouseover="scrollIn"
             @mouseout="scrollOut"
            v-if="videoFrame">

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
        </transition>
        <bottom-nav posLeft="260"></bottom-nav>
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
                showVideo:false,
                vid:'',//k0015trfczz
                carouseIndex:0,
                carouseLen:0,
                vPostImg:'',
                detailData:{
                    audio_link:'',
                    ewm_img:''
                },
                domain_url:"",
                btnLeft:false,
                btnRight:false,
                videoFrame:false,
                showIntro:false,
                showDemo:false,
                authorList:false
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
        },
        methods:{
            scrollIn(){
                if(this.showVideo){
                    this.btnLeft = false;
                    this.btnRight = false;
                }else{
                    if(this.carouseIndex != 0) this.btnLeft = true;
                    if(this.carouseIndex != this.carouseLen -1) this.btnRight = true;
                }
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
            toAuthor(id){
                this.$router.push({ name: 'workauthor', params: { id: id }})
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

                    this.move();
                }).catch((error)=>{
                    console.log(error);
                })
            },
            move(){
                let self = this;
                self.videoFrame = true;
                setTimeout(()=>{
                    self.showIntro = true;
                },0);
                setTimeout(()=>{
                    self.showDemo = true;
                },0);
                setTimeout(()=>{
                    self.authorList = true;
                },0);
            }
        }
    }

</script>

