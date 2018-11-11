<style>
    .swiper-frame-index{ position: relative; margin-bottom: 80px;}
    .swiper-item .link{  display: block; font-size: 28px; letter-spacing: 1.3px; margin-top: 10px; color: #000; white-space:nowrap; text-overflow: ellipsis; overflow: hidden;}
    .swiper-item .link:hover{ color: #7f7f7f;}
    .swiper-item .img a{ position: relative; font-size: 0; display: block;}
    .swiper-item .img:hover a:after{ content: 'More'; font-size: 20px; color: #fff; display: flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; right: 0; bottom: 0;}
    .swiper-item .detail{ height: 56px; font-size: 16px; letter-spacing: 3px; line-height: 1.8; margin-bottom: 15px; overflow:hidden;}
    .swiper-item .time{ padding-top: 15px;color: rgb(127,127,127);position: relative; font-size: 14px;}
    .swiper-item .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .swiper-item .time span{ margin-right: 30px;}
    .swiper-item .time span a{color: rgb(127,127,127);}
    .swiper-item .time span a:hover{color: #000;}
    .swiper-frame-index .arrow{ width: 295px; height: 560px; position: absolute; top: 0; z-index: 100; display: block;}
    .swiper-frame-index .arrow:hover a{ display: block;}
    .swiper-frame-index .arrow a{ width: 40px; height: 100%; background-color: #fff; display: none;}
    .swiper-frame-index .arrow img{ margin-top: 256px;}
    .swiper-frame-index .left{ left: 0;}
    .swiper-frame-index .right{ right: 0;}
    .swiper-frame-index .right a{ margin-left: 255px;}
    .swiper-frame-index .right img{ margin-left: -40px;}

    .recommend-item{ width: 1130px; margin-bottom: 25px; display: flex; justify-content: space-between;}
    .recommend-item .imgs{ width: 450px; position: relative; font-size: 0;}
    .recommend-item .imgs a{ display: block;}
    .recommend-item .imgs:hover a:after{ content: 'More'; font-size: 20px; color: #fff; display: flex; justify-content: center; align-items: center; background-color: rgba(0,0,0,0.5); width: 450px; height: 250px; position: absolute; top: 0; left: 0;}
    .recommend-item .infos{ width: 630px;}
    .recommend-item .infos a{ font-size: 28px; letter-spacing: 1.3px; margin-bottom: 10px; color: #000; display: block; white-space:nowrap; text-overflow: ellipsis; overflow: hidden; font-weight: bold;}
    .recommend-item .infos a:hover{ color: #7f7f7f;}
    .recommend-item .infos .detail{ height: 50px; font-size: 16px; line-height: 1.8; margin-bottom: 115px;overflow:hidden; }
    .recommend-item .infos .time{ padding-top: 15px; color: rgb(127,127,127); position: relative; font-size: 14px;}
    .recommend-item .infos .time:before{ content: ''; width: 12px; height: 1px; background-color: #9f9f9f; position: absolute; top: 0; left: 0;}
    .recommend-item .infos .time span{ margin-right: 30px;}
    .recommend-item .infos .time span a{color: rgb(127,127,127); font-size: 14px; display: inline;}
    .recommend-item .infos .time span a:hover{color: #000;}

    .welcome{ position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: #171918; z-index: 1100; display: flex; justify-content: center; align-items: center;}
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

<template>
    <div>
        <top-nav></top-nav>
        <body-frame>
            <div class="swiper-frame-index">
                <swiper :options="swiperOption" ref="mySwiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item,index) in bannerList">
                        <section class="swiper-item">
                            <div class="img"><router-link :to="'/works/detail/'+item.id"><img :src="mainUrl+item.banner_cover" width="1120" height="560"> </router-link></div>
                            <div v-if="activeIndex == index">
                                <router-link :to="'/works/detail/'+item.id" class="link">{{item.title}} {{item.title_ext}}</router-link>
                                <div class="detail" v-html="item.goods_desc"></div>
                                <div class="time hkLight">
                                    <span v-if="item.cate2 == ''"><a href="javascript:;" @click="getList(item.cate,0)"> {{item.catename}}</a></span>
                                    <span v-if="item.cate2 != ''"><a href="javascript:;" @click="getList(item.cate,0)"> {{item.catename}}</a> / <a href="javascript:;"  @click="getList(item.cate,item.cate2)"> {{item.catename2}}</a></span>
                                    <span>項目時間 {{new Date(parseInt(item.ctime)).format('MM/dd')}}</span>
                                </div>
                            </div>
                        </section>
                    </swiper-slide>
                </swiper>
                <div class="arrow left" v-if="bannerList.length != 0">
                    <a href="javascript:;"
                       @click="bannerPrev"
                       v-if="activeIndex != 0">
                        <img src="../assets/images/arrow-left.png" width="76">
                    </a>
                </div>
                <div class="arrow right" v-if="bannerList.length != 0">
                    <a href="javascript:;"
                       @click="bannerNext"
                       v-if="activeIndex != bannerList.length - 1">
                        <img src="../assets/images/arrow-right.png" width="76">
                    </a>
                </div>

            </div>

            <div class="recommend-title">推薦案例</div>

            <div>
                <div class="recommend-item" v-for="item in recommendList">
                    <div class="imgs"><router-link :to="'/works/detail/'+item.id"><img :src="mainUrl+item.recomm_cover" width="450" height="250"></router-link> </div>
                    <div class="infos">
                        <router-link to="/works/detail/1">{{item.title}} {{item.title_ext}}</router-link>
                        <div class="detail" v-html="item.goods_desc"></div>
                        <div class="time hkLight">
                            <span v-if="item.cate2 == ''"><a href="javascript:;" @click="getList(item.cate,0)"> {{item.catename}}</a></span>
                            <span v-if="item.cate2 != ''"><a href="javascript:;" @click="getList(item.cate,0)"> {{item.catename}}</a> / <a href="javascript:;"  @click="getList(item.cate,item.cate2)"> {{item.catename2}}</a></span>
                            <span>項目時間 {{new Date(parseInt(item.ctime)).format('MM/dd')}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </body-frame>
        <bottom-nav></bottom-nav>

        <transition name="slide-fade">
        <div class="welcome" v-if="isGuide"><img src="../assets/images/loading.gif"> </div>
        </transition>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,BodyFrame},
        mounted(){
            this.swiper = this.$refs.mySwiper.swiper;
            this.activeIndex = this.swiper.activeIndex;

            if(this.isGuide){
                setTimeout(()=>{
                    this.$store.commit('doPassGuide');
                },2000);
            }
            this.$store.dispatch('doGetIndex');
        },
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
            },
            cateList(){
                return this.$store.state.cateList
            }
        },
        data(){
            let self = this;
            return{
                swiperOption: {
                    width: 1120,
                    spaceBetween:25,
                    simulateTouch : false,
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
        methods: {
            bannerPrev(){
                this.swiper.slidePrev();
            },
            bannerNext(){
                this.swiper.slideNext();
            },
            getList(id,id2){
                for(let i=0;i<this.cateList.length;i++){
                    if(this.cateList[i].id == id){
                        this.$store.commit('setNavActiveIndex',i);
                    }
                }
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
            }
        }
    }

</script>

