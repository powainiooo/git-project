<style>
    @import "../assets/animate.min.css";
    * {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    body{ background-color: #EFF7FD;}
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

    .page-context{ font-size: 0.4rem; color: #151515; position: absolute; left: 10%; top: 15%; font-family: "Micro Yahei", 'Avenir', Helvetica, Arial, sans-serif; z-index: 10;}
    .page-context p{ margin-bottom: 6px;}
    .page-context .tag1{ color: #2B5FD5; font-weight: bold;}
    .page-context .tag2{ color: #2B5FD5; font-size: 0.56rem; font-weight: bold;}

    .next-arrow{ width: 8%; position: absolute; bottom: 0%; left: 50%; margin-left: -4%; animation: nextArrow 1.2s linear infinite; z-index: 12;}
    @keyframes nextArrow {
        0%{ transform: translate(0,0);}
        40%{ transform: translate(0,-10px);}
        80%,100%{ transform: translate(0,-10px); opacity: 0;}
    }
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
    export default {
        name: 'app',
        components:{page1,page2,page3,page4,page5,page6,page7,page8,page9,Loading},
        mounted(){
            window.intoPageStartTime = new Date().getTime();
            setTimeout(()=>{
                this.currentPage = this.$refs.mySwiper.$children[0].$attrs.page;
            },300)
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
                            let endTime = new Date().getTime();
                            if(window.stayTime[self.currentPage]){
                                window.stayTime[self.currentPage] += endTime - window.intoPageStartTime;
                            }else{
                                window.stayTime[self.currentPage] = endTime - window.intoPageStartTime;
                            }
                            window.intoPageStartTime = endTime;
                            self.$refs[self.currentPage].$children[0].resetValues();
                        },
                        slideChangeTransitionEnd(){
                            let pageName = self.$refs.mySwiper.$children[this.activeIndex].$attrs.page;
                            self.currentPage = pageName;
                            window.outPage = pageName.replace('page','');
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
                return false
            },
            p2Show(){
                return false
            },
            p3Show(){
                return true
            },
            p4Show(){
                return true
            },
            p5Show(){
                return true
            },
            p6Show(){
                return true
            },
            p7Show(){
                return true
            },
            p8Show(){
                return true
            },
            p9Show(){
                return true
            }
        },
        methods:{

        }
    }

</script>

