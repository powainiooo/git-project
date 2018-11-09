<style scoped>
    .swiper-frame{ position: relative;  margin: 0 -3% 40px -3%;}
    .swiper-frame .dots{ display: flex; align-items: center; margin-top: 10px; margin-left: 3%;}
    .swiper-frame .dots li{ width: 4px; height: 4px; border-radius: 50%; background-color: #181a19; margin-right: 10px;}
    .swiper-frame .dots li.active{ width: 8px; height: 8px; background-color: #c29836;}
    .swiper-frame .banner-img{ width: 100%; background-repeat: no-repeat; background-size: cover; background-position: center center; font-size: 0;}
    .swiper-frame .banner-img img{ width: 100%;}

    .detail-infos{ margin-top: 25px;}
    .detail-infos h3{ font-size: 18px; letter-spacing: 1.5px; margin-bottom: 15px;}
    .detail-infos p{ font-size: 14px; letter-spacing: 1.5px; line-height: 1.8; margin-bottom: 15px;}
    .detail-infos .time{ padding-top: 15px; color: rgb(127,127,127); position: relative; font-size: 10px; margin-bottom: 15px;}
    .detail-infos .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .detail-infos .time span{ margin-right: 30px;}
    .detail-infos .author-list{ width: 100%; display: flex; flex-wrap: wrap; margin:40px 0;}
    .detail-infos .author-list li{ width: 50%; font-size: 12px; color: rgb(158,159,159); margin-bottom: 8px; display: flex;}
    .detail-infos .author-list li span{ width: 100px;}

    .audio-frame{ margin: 25px 0 30px 0;}

    .btn-link{width: 30%; font-size: 12px; text-align: center; padding: 7px 0; display: block; border: 1px solid #000; color: #000; border-radius: 20px; margin-top: 25px;}
</style>

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame"  v-if="!showVideo">
                <div class="banner-img"
                     v-if="bannerList.length == 1"
                     :style="{'background-image':'url(\''+domain_url+bannerList[0]+'\')'}">
                    <img :src="domain_url+bannerList[0]" />
                </div>
                <swiper :options="swiperOption" ref="mySwiper" v-show="bannerList.length > 1">
                    <swiper-slide v-for="(item,index) in bannerList"
                                    class="banner-img"
                                    :style="{'background-image':'url(\''+domain_url+item+'\')'}"
                                  :key="index">
                        <img :src="domain_url+item" />
                    </swiper-slide>
                </swiper>
                <ul class="dots" v-if="bannerList.length > 1">
                    <li v-for="(item,index) in bannerList" :class="activeIndex == index ? 'active' : ''"></li>
                </ul>
            </div>

            <div style="margin: 0 -3%">
                <video-view  v-if="showVideo"
                             :vid="vid"
                             :postImg="vPostImg"></video-view>
            </div>


            <div class="detail-infos">
                <h3>{{detailData.title}}<br> {{detailData.title_ext}}</h3>
                <div class="time hkLight">
                    <span v-if="detailData.cate2 == ''">{{detailData.catename}}</span>
                    <span v-if="detailData.cate2 != ''">{{detailData.catename}} / {{detailData.catename2}}</span>
                    <span>項目時間 {{new Date(parseInt(detailData.ctime)).format('MM/dd')}}</span>
                </div>

                <a :href="detailData.h5_link"
                   v-if="detailData.h5_link != ''"
                   class="btn-link">查看H5</a>

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
            <div class="item-list" style="margin-top: 30px;">
                <work-item v-for="item in recommendList"
                           :data="item"
                           @refresh="refresh"
                           :mainUrl="domain_url"
                           :key="item.id"></work-item>
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

