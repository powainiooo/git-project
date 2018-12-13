<style>
    @import "../assets/animate.min.css";
    @import "../assets/helve.css";
    * {
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
    *:not(input,textarea) {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
    }
    body{ background-color: #EFF7FD; font-family: 'Helve','Micro Yahei', 'Avenir', Helvetica, Arial, sans-serif;}
    @font-face {
        font-family: 'quartz';
        src: url('../assets/QuartzRegular.ttf') format('woff2'),
        url('../assets/QuartzRegular.ttf') format('woff');
        font-weight: 100;
        font-style: normal;
    }
    .swiper-container{ height: 100vh; overflow: hidden;}
    .swiper-container .swiper-slide{ overflow: hidden;}

    .page-title{ width: 30%; position: absolute; top: 5%; left: 10%;}

    .page-context{ font-size: 0.4rem; color: #151515; position: absolute; left: 10%; top: 15%; z-index: 10;}
    .page-context p{ margin-bottom: 6px;}
    .page-context .tag1{ color: #2B5FD5; font-weight: bold;}
    .page-context .tag2{ color: #2B5FD5; font-size: 0.56rem; font-weight: bold;}

    .next-arrow{ width: 8%; position: absolute; bottom: 0%; left: 50%; margin-left: -4%; animation: nextArrow 1.2s linear infinite; z-index: 12;}
    @keyframes nextArrow {
        0%{ transform: translate(0,0);}
        40%{ transform: translate(0,-10px);}
        80%,100%{ transform: translate(0,-10px); opacity: 0;}
    }

    .style-container{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; z-index: 500;}
    .style-container .style-frame{ width: 80%; margin: 50% auto; background-color: #FFFFFF; border-radius: 10px; overflow: hidden;}
    .style-container .style-frame h3{ font-size: 0.34rem; color: #030303; text-align: center; margin: 10px 0 0 0; font-weight: normal;}
    .style-container .style-frame ul{ display: flex; justify-content: space-between; margin: 0.6rem 0.3rem;}
    .style-container .style-frame ul li{ width: 1.6rem; height: 1.3rem; border: 1px solid rgba(77,77,77,0.3); display: flex; justify-content: center; align-items: center; font-size: 0.32rem; color: rgba(77,77,77,0.6);}
    .style-container .style-frame ul li.active{ border-color: #2B5FD5; color: #2B5FD5;}
    .style-container .style-frame input{ width: 100%; border: 1px solid rgba(77,77,77,0.3); font-size: 0.32rem; border-radius: 5px; padding: 5px 10px; box-sizing: border-box; -webkit-user-select: text;user-select: text;}
    .style-container .style-frame .btns{ border-top: 1px solid rgba(77,77,77,0.3); display: flex;}
    .style-container .style-frame .btns a{ display: flex; width: 50%; box-sizing: border-box; height: 0.8rem; font-size: 0.32rem; color:#007AFF; text-decoration: none; justify-content: center; align-items: center;}
    .style-container .style-frame .btns a:first-child{ border-right: 1px solid rgba(77,77,77,0.3);}
</style>

<template>
    <div>
        <transition enter-active-class="animated fadeIn">
        <swiper :options="swiperOption" ref="mySwiper" v-if="!showLoading">
            <!-- slides -->
            <swiper-slide v-if="p1Show" page="page1" ref="page1"><page1></page1></swiper-slide>
            <swiper-slide v-if="p2Show" page="page2" ref="page2"><page2></page2></swiper-slide>
            <swiper-slide v-if="p3Show" page="page3" ref="page3"><page3></page3></swiper-slide>
            <swiper-slide v-if="p4Show" page="page4" ref="page4"><page4></page4></swiper-slide>
            <swiper-slide v-if="p5Show" page="page5" ref="page5"><page5></page5></swiper-slide>
            <swiper-slide v-if="p6Show" page="page6" ref="page6"><page6></page6></swiper-slide>
            <swiper-slide v-if="p7Show" page="page7" ref="page7"><page7></page7></swiper-slide>
            <swiper-slide v-if="p8Show" page="page8" ref="page8"><page8></page8></swiper-slide>
            <swiper-slide v-if="p9Show" page="page9" ref="page9"><page9></page9></swiper-slide>
        </swiper>
        </transition>
        <loading v-if="showLoading"></loading>
    </div>
</template>

<script type='es6'>
    import page1 from '@/components/page1'
    import page2 from '@/components/page2'
    import page3 from '@/components/page3'
    import page4 from '@/components/page4'
    import page5 from '@/components/page5'
    import page6 from '@/components/page6'
    import page7 from '@/components/page7'
    import page8 from '@/components/page8'
    import page9 from '@/components/page9'
    import Loading from '@/components/loading'
    import axios from 'axios'
    export default {
        name: 'app',
        components:{page1,page2,page3,page4,page5,page6,page7,page8,page9,Loading},
        mounted(){
            window.footPrinter.intoPageStartTime = new Date().getTime();
            setTimeout(()=>{
                //this.currentPage = this.$refs.mySwiper.$children[0].$attrs.page;
            },300);
        },
        data(){
            let self = this;
            return{
                startTime:0,
                endTime:0,
                currentPage:'page1',
                swiperOption: {
                    direction : 'vertical',
                    height:window.innerHeight,
                    on:{
                        slideChangeTransitionStart(){
                            window.pageOutFunc();
                            self.$refs[self.currentPage].$children[0].resetValues();
                        },
                        slideChangeTransitionEnd(){
                            let pageName = self.$refs.mySwiper.$children[this.activeIndex].$attrs.page;
                            self.currentPage = pageName;
                            window.footPrinter.currentPage = pageName.replace('page','');
                            window.footPrinter.lastPage = window.footPrinter.currentPage > window.footPrinter.lastPage ? window.footPrinter.currentPage : window.footPrinter.lastPage;
                            self.$refs[self.currentPage].$children[0].setValues();
                        }
                    }
                }
            }
        },
        computed:{
            showLoading(){
                return this.$store.state.isLoading
            },
            p1Show(){
                //return false
                return this.$store.state.pageData.P1 != undefined
            },
            p2Show(){
                //return false
                return this.$store.state.pageData.P2 != undefined
            },
            p3Show(){
                //return false
                return this.$store.state.pageData.P3 != undefined
            },
            p4Show(){
                //return false
                return this.$store.state.pageData.P4 != undefined
            },
            p5Show(){
                //return false
                return this.$store.state.pageData.P5 != undefined
            },
            p6Show(){
                //return false
                return this.$store.state.pageData.P6 != undefined
            },
            p7Show(){
                //return false
                return this.$store.state.pageData.P7 != undefined
            },
            p8Show(){
                //return false
                return this.$store.state.pageData.P8 != undefined
            },
            p9Show(){
                return true
            }
        },
        methods:{

        }
    }

</script>

