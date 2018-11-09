<style scoped>
    .swiper-frame{ position: relative; margin-bottom: 40px; margin-right: -3%; margin-top: 70px;}
    .swiper-item .infos .title{ font-size: 18px; font-weight: bold; letter-spacing: 1.5px; margin-top: 10px; color: #000; display: block; margin-bottom: 10px;}
    .swiper-item .detail{ font-size: 12px; letter-spacing: 1.5px; line-height: 1.8; overflow: hidden; height: 40px;}
    .swiper-item .btn{ width: 30%; font-size: 12px; text-align: center; padding: 7px 0; display: block; border: 1px solid #000; color: #000; border-radius: 20px; margin-top: 10px;}

    .recommend-item{ margin-bottom: 25px; display: flex; justify-content: space-between;}
    .recommend-item .imgs{ width: 45%;}
    .recommend-item .infos{ width: 52%; display: flex; flex-direction: column; justify-content: space-between;}
    .recommend-item .infos a{ display: block;  font-size: 16px; letter-spacing: 1.5px; margin-bottom: 10px; color: #000; overflow:hidden;}
    .recommend-item .infos .detail{ font-size: 10px; letter-spacing: 1.5px; line-height: 1.8; margin-bottom: 90px; overflow:hidden;}
    .recommend-item .infos .time{ padding-top: 10px; color: rgb(127,127,127); position: relative; font-size: 10px;}
    .recommend-item .infos .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .recommend-item .infos .time span{ margin-right: 10px;}

    .welcome{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 1100; display: flex; justify-content: center; align-items: center;}
    .welcome img{ width: 30%;}
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
<!--static/mobile_v1/static/-->
<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame" style="margin-left: 0;">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in bannerList">
                        <section class="swiper-item">
                            <div><router-link :to="'/works/detail/'+item.id"><img :src="mainUrl+item.banner_cover"> </router-link></div>
                            <div v-if="activeIndex == index" class="infos">
                                <div class="title">{{item.title}} <br> {{item.title_ext}}</div>
                                <div class="detail" v-html="item.goods_desc"></div>
                                <router-link :to="'/works/detail/'+item.id" class="btn">More</router-link>
                            </div>
                        </section>
                    </swiper-slide>
                </swiper>
            </div>

            <div class="recommend-title">推薦案例</div>

            <div>
                <div class="recommend-item" v-for="item in recommendList">
                    <div class="imgs"><router-link :to="'/works/detail/'+item.id"><img :src="mainUrl+item.recomm_cover"></router-link> </div>
                    <div class="infos">
                        <router-link :to="'/works/detail/'+item.id">{{item.title}}<br> {{item.title_ext}}</router-link>
                        <div class="time hkLight">
                            <span v-if="item.cate2 == ''">{{item.catename}}</span>
                            <span v-if="item.cate2 != ''">{{item.catename}} / {{item.catename2}}</span>
                            <span>項目時間 {{new Date(parseInt(item.ctime)).format('MM/dd')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </body-frame>

        <transition name="slide-fade">
        <div class="welcome" v-if="isGuide"><img src="../assets/images/loading.gif"> </div>
        </transition>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BodyFrame},
        computed:{
            isGuide(){
                return this.$store.state.isGuide
            },
            mainUrl(){
                return this.$store.state.indexData.domain_url
            },
            bannerList(){
                try{
                    return this.$store.state.indexData.banner.list
                }catch(err){
                    return []
                }
            },
            recommendList(){
                try{
                    return this.$store.state.indexData.recommend.list
                }catch(err){
                    return []
                }
            }
        },
        data(){
            let self = this;
            return{
                swiperOption: {
                    width: window.innerWidth*0.8,
                    spaceBetween:15,
                    on: {
                        slideChangeTransitionStart: function(){
                            self.activeIndex = this.activeIndex;
                        }
                    }
                },
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
            this.$store.dispatch('doGetIndex');
        }
    }

</script>

