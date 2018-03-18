<style>
    #pageContain {
        overflow: hidden;
        position: relative;
        height: 100%;
    }
    .page {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
    }
    .contain {
        width: 100%;
        height: 100%;
        display: table;
        position: relative;
        z-index: 0;
    }
    .contain>div{
        display: table-cell;
        vertical-align: middle;
    }
    .current {
        display: block;
        z-index: 1;
    }
    .slide {
        display: block;
        z-index: 2;
    }
    .swipe {
        display: block;
        z-index: 3;
        transition-duration: 0ms !important;
        -webkit-transition-duration: 0ms !important;
    }
    .page1 {
        width: 100%; height: 100%; background: url('../../assets/images/page1bg.jpg') no-repeat; background-size: cover; background-position: right center;
    }
    .page2 {
        background: #fff;
    }
    .page3 {
        background: #fff;
    }
    .page4 {
        background: #fff;
    }
    #navBar {
        z-index: 3;
        position: absolute;
        top: 50%;
        left: 4%;
        margin-top: -100px;
    }
    #navBar .active {
        background: #bc9e44;
        width: 12px;
        height: 12px;
        margin-left: -3px;
    }
    #navBar li {
        cursor: pointer;
        margin-bottom: 20px;
        transition: all .7s ease;
        border-radius: 50%;
        text-align: center;
        width: 6px;
        height: 6px;
        background-color: #000;
    }
    .page2 .page2-content{ width: 1420px; margin: 0 auto;}
    .page2 .img-list{ width: 870px; float: left; margin-bottom: 100px;}
    .page2 .img-list li{ width: 280px; height: 280px; float: left; margin: 5px; box-shadow: 0 20px 50px rgba(0,0,0,0.2),0 -20px 50px rgba(0,0,0,0.2);}
    .page2 .img-list li img{ width: 100%; height: 100%;}
    .page2 .infor{ float: left; margin: 230px 0 0 60px;}
    .page2 .infor h3{ font-weight: lighter; font-size: 30px; margin-bottom: 50px; color: #171919;}
    .page2 .infor div{ width: 480px; font-size: 16px; line-height: 1.5; color: #171919;}

    .page3 .page3-content{ width: 1340px; margin: 0 auto;}
    .page3 .img-list{ width: 600px; float: left; margin-bottom: 100px;}
    .page3 .img-list li{ width: 120px; height: 120px; float: left;}
    .page3 .img-list li img{ width: 100%; height: 100%;}
    .page3 .infor{ float: left; margin: 50px 130px 0 0;}
    .page3 .infor h3{ font-weight: lighter; font-size: 30px; margin-bottom: 40px; color: #171919;}
    .page3 .infor div{ width: 480px; font-size: 16px;line-height: 1.5; color: #171919;}

    .page4 .page4-content{ width: 1440px; margin: 0 auto; position: relative;}
    .page4 .img-list{ overflow: hidden; margin-bottom: 100px;}
    .page4 .img-list li{ width: 220px; height: 300px; margin: 10px; float: left; background-color: #eaeaea;}
    .page4 .img-list li img{ width: 100%; height: 100%;}
    .page4 .infor{ position: absolute; bottom: 140px; right: 80px;}
    .page4 .infor h3{ font-weight: lighter; font-size: 30px; margin-bottom: 40px; color: #171919;}
    .page4 .infor div{ width: 480px; font-size: 16px; line-height: 1.5; color: #171919;}

    .slide-frame{ width: 100%; height: 100%; position: relative;}
    .swiper-container,.swiper-wrapper,.swiper-slide{ height: 100%;}
</style>

<template>
    <div class="slide-frame">
        <div id="pageContain">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- slides -->
                <swiper-slide><div class="page page1 current" :style="{'background-image':'url('+domainUrl+indexInfo.cover+')'}"></div></swiper-slide>
                <swiper-slide>
                    <div class="page page2 ">
                        <div class="contain">
                            <div>
                                <div class="clearfix page2-content">
                                    <ul class="img-list">
                                        <li v-for="item in indexInfo.goods_img"><img :src='domainUrl+item'></li>
                                    </ul>
                                    <div class="infor">
                                        <h3>{{indexInfo.title}}</h3>
                                        <div v-html="indexInfo.home2_desc"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="page page3">
                        <div class="contain">
                            <div>
                                <div class="clearfix page3-content">
                                    <div class="infor">
                                        <h3>合 作 品 牌</h3>
                                        <div v-html="indexInfo.home3_desc"></div>
                                    </div>
                                    <ul class="img-list">
                                        <li v-for="item in indexInfo.goods_img3"><img :src='domainUrl+item'></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <div class="page page4">
                        <div class="contain">
                            <div>
                                <div class="clearfix page4-content">
                                    <ul class="img-list">
                                        <li v-for="item in indexInfo.goods_img4"><img :src='domainUrl+item'></li>
                                    </ul>
                                    <div class="infor">
                                        <h3>成 员</h3>
                                        <div v-html="indexInfo.home4_desc"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <ul id="navBar">
            <li v-for="item in 4" :class="item == activeIndex ? 'active':''"></li>
        </ul>
        <div class="logo-index"><img src="@/assets/images/logofix2.png"> </div>
    </div>
</template>

<script type='es6'>
    import FullPage2 from '@/assets/js/fullPage.js'
    export default {
        name: 'app',
        props:['indexInfo','domainUrl'],
        mounted(){

        },
        data(){
            let self = this;
            return{
                activeIndex:1,
                swiperOption:{
                    mousewheel: true,
                    speed:500,
                    direction:'vertical',
                    on:{
                        slideChangeTransitionStart: function(swiper){
                            self.activeIndex = self.$refs.mySwiper.swiper.activeIndex + 1;
                            console.log(self.activeIndex)
                        }
                    }
                }
            }
        }
    }

</script>

