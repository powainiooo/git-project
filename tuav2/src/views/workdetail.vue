<style>
    .swiper-frame{ position: relative; margin-bottom: 80px; overflow: hidden;}
    .swiper-frame .arrow{ width: 100px; height: 665px; position: absolute; top: 0; z-index: 100; display: block;}
    .swiper-frame .arrow a{ width: 40px; height: 100%; background-color: #fff; display: block;}
    .swiper-frame:hover .arrow a{ display: block;}
    .swiper-frame .arrow img{ margin-top: 295px;}
    .swiper-frame .left{ left: -40px; opacity: 0; transition: all 0.2s linear;}
    .swiper-frame .right{ right: -40px; opacity: 0; transition: all 0.2s linear;}
    .swiper-frame:hover .left{ left: 0; opacity: 1;}
    .swiper-frame:hover .right{ right: 0; opacity: 1;}
    .swiper-frame .right a{ margin-left: 60px;}
    .swiper-frame .right img{ margin-left: -40px;}
    .swiper-frame .dots{ display: flex; align-items: center; margin-top: 25px;}
    .swiper-frame .dots li{ width: 6px; height: 6px; border-radius: 50%; background-color: #181a19; margin-right: 20px; cursor: pointer;}
    .swiper-frame .dots li.active{ width: 12px; height: 12px; background-color: #c29836;}

    .detail-infos{ width: 850px; margin-top: 25px;}
    .detail-infos h3{ font-size: 28px; letter-spacing: 1.3px; margin-bottom: 25px;}
    .detail-infos p{ font-size: 16px;  line-height: 1.8; margin-bottom: 25px;}
    .detail-infos .time{ padding-top: 15px; color: rgb(127,127,127); position: relative; font-size: 14px; margin-bottom: 25px;}
    .detail-infos .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .detail-infos .time span{ margin-right: 30px;}
    .detail-infos .author-list{ width: 500px; display: flex; flex-wrap: wrap; margin: 80px 0;}
    .detail-infos .author-list li{ font-size: 14px; color: rgb(158,159,159); margin-bottom: 15px; display: flex;}
    .detail-infos .author-list li span{ width: 100px;}

    .audio-frame{ margin: 50px 0 60px 0;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame"  v-if="!showVideo">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in bannerList" :key="index"><img :src="domain_url+item" width="1440" height="665"> </swiper-slide>
                </swiper>
                <div class="arrow left">
                    <a href="javascript:;"
                       @click="bannerPrev"
                       v-if="activeIndex != 0">
                        <img src="../assets/images/arrow-left.png" width="76">
                    </a>
                </div>
                <div class="arrow right">
                    <a href="javascript:;"
                       @click="bannerNext"
                       v-if="activeIndex != bannerList.length - 1">
                        <img src="../assets/images/arrow-right.png" width="76">
                    </a>
                </div>
                <ul class="dots" v-if="bannerList.length > 1">
                    <li v-for="(item,index) in bannerList" :class="activeIndex == index ? 'active' : ''" @click="dotChange(index)"></li>
                </ul>
            </div>

            <video-view  v-if="showVideo"
                         :vid="vid"
                         :postImg="vPostImg"></video-view>


            <div class="detail-infos">
                <h3>{{detailData.title}}<br> {{detailData.title_ext}}</h3>
                <div class="time hkLight">
                    <span v-if="detailData.cate2 == ''">{{detailData.catename}}</span>
                    <span v-if="detailData.cate2 != ''">{{detailData.catename}} / {{detailData.catename2}}</span>
                    <span>項目時間 {{new Date(parseInt(detailData.ctime)).format('MM/dd')}}</span>
                </div>

                <div class="audio-frame">
                    <audio-view
                        v-if="detailData.audio_link != ''"
                        :src="domain_url+detailData.audio_link"
                        :title="detailData.audio_name">
                    </audio-view>
                </div>

                <div>
                    <p class="hkLight" v-html="detailData.goods_desc"></p>
                </div>

                <ul class="author-list">
                    <li class="hkLight" v-for="item in detailData.author">
                        <span>{{item.cname}}</span>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>

            <div class="recommend-title">推薦案例</div>
            <div class="clearfix item-list">
                <work-item v-for="item in recommendList"
                           :data="item"
                           @refresh="refresh"
                           :mainUrl="domain_url"
                           :key="item.id"></work-item>
            </div>
        </body-frame>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    import AudioView from '@/components/AudioView.vue'
    import VideoView from '@/components/VideoView.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,WorkItem,BodyFrame,AudioView,VideoView},
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
                bannerList:[],
                swiper:null,
                activeIndex:0,
                vid:'',//k0015trfczz
                vPostImg:'',
                detailData:{},
                domain_url:'',
                showVideo:false
            }
        },
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;
            let id = this.$route.params.id;
            this.getData(id);
            this.$store.dispatch('doGetIndex');
        },
        methods: {
            bannerPrev(){
                this.swiper.slidePrev();
            },
            bannerNext(){
                this.swiper.slideNext();
            },
            dotChange(index){
                this.swiper.slideTo(index);
            },
            getData(id){
                let self = this;
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                self.$ajax.get('admin/api_v2/product_info',{
                    params: {
                        id: id
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.detailData = data.data;
                    self.domain_url = data.domain_url;
                    self.bannerList = data.data.goods_img;
                    self.showVideo = data.data.video_link != '';
                    self.vid = data.data.video_link;
                    self.vPostImg = self.domain_url + data.data.video_cover;

                }).catch((error)=>{
                    console.log(error);
                })
            },
            refresh(id){
                console.log(id);
                this.getData(id);
            }
        },
        computed:{
            media(){
                return this.$store.state.audio;
            },
            recommendList(){
                try{
                    return this.$store.state.indexData.recommend.list
                }catch(err){
                    return []
                }
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

