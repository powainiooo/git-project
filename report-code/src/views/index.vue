<style>
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
    .swiper-container{overflow: hidden;}
    .swiper-container .swiper-slide{ overflow: hidden;}

    .page-title{ width: 30%; position: absolute; top: 5%; left: 8%;}

    .page-context{ font-size: 0.4rem; color: #151515; position: absolute; left: 8%; right: 5%; top: 15%; z-index: 10;}
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
    .style-container .style-frame ul li{ width: 1.5rem; font-size: 0.28rem; color: rgba(77,77,77,0.6); list-style: none;}
    .style-container .style-frame ul li.active{ border-color: #2B5FD5; color: #2B5FD5;}
    .style-container .style-frame ul li .imgs{ font-size: 0; border: 1px solid rgba(77,77,77,0.3);}
    .style-container .style-frame ul li.active .imgs{ border: 2px solid #2B5FD5;}
    .style-container .style-frame ul li p{ text-align: center; margin-top: 5px;}
    .style-container .style-frame input{ width: 100%; border: 1px solid rgba(77,77,77,0.3); font-size: 0.32rem; border-radius: 5px; padding: 5px 10px; box-sizing: border-box; -webkit-user-select: text;user-select: text;}
    .style-container .style-frame .btns{ border-top: 1px solid rgba(77,77,77,0.3); display: flex;}
    .style-container .style-frame .btns a{ display: flex; width: 50%; box-sizing: border-box; height: 0.8rem; font-size: 0.32rem; color:#007AFF; text-decoration: none; justify-content: center; align-items: center;}
    .style-container .style-frame .btns a:first-child{ border-right: 1px solid rgba(77,77,77,0.3);}

    .log{ width: 100%; position: absolute; top: 0; left: 0; z-index: 1000; background-color: #ffffff; font-size: 16px;}

    .fadeOut{animation:fadeOut 0.6s linear;}
    @keyframes fadeOut{0%{opacity:1}to{opacity:0}}
    .fadeIn{animation:fadeIn 0.6s linear;}
    @keyframes fadeIn{0%{opacity:0}to{opacity:1}}

    .poster{ width: 100%; height: 100vh; overflow-y: scroll; position: absolute; top: 0; left: 0; z-index: 900;}
    .poster img{ width: 100%;}

    .btns1{ width: 100%; display: flex; justify-content: space-around; position: absolute; bottom: 5vh; left: 0; z-index: 1000;}
    .btns1 a{ width: 2.7rem; height: 0.8rem; border-radius: 30px; color: #FFFFFF; font-size: 0.32rem; display: flex; justify-content: center; align-items: center; background-color: #2B5FD5; text-decoration: none;}
</style>

<template>
    <div>
        <transition enter-active-class="animated fadeIn">
        <swiper :options="swiperOption" ref="mySwiper" v-if="!showLoading" id="swiper" :style="{height:isPosting ? 'auto' : '100vh'}">
            <!-- slides -->
            <swiper-slide v-if="p1Show" page="page1" ref="page1" id="page1"><page1></page1></swiper-slide>
            <swiper-slide v-if="p2Show" page="page2" ref="page2"><page2></page2></swiper-slide>
            <swiper-slide v-if="p3Show" page="page3" ref="page3"><page3></page3></swiper-slide>
            <swiper-slide v-if="p4Show" page="page4" ref="page4"><page4></page4></swiper-slide>
            <swiper-slide v-if="p5Show" page="page5" ref="page5"><page5></page5></swiper-slide>
            <swiper-slide v-if="p6Show" page="page6" ref="page6"><page6></page6></swiper-slide>
            <swiper-slide v-if="p7Show" page="page7" ref="page7"><page7></page7></swiper-slide>
            <swiper-slide v-if="p8Show" page="page8" ref="page8"><page8></page8></swiper-slide>
            <swiper-slide v-if="p9Show" page="page9" ref="page9">
                <page9 @draw="doDrawPoster"></page9>
            </swiper-slide>
            <swiper-slide v-if="p10Show" page="page10" ref="page10">
                <poster ref="poster" :styleKey="lastStyleKey" @showChange="back"></poster>
            </swiper-slide>
        </swiper>
        </transition>
        <loading v-if="showLoading"></loading>
        <div class="log">
            <p v-for="(item,index) in logList">{{index+1}}:{{item}}</p>
        </div>
        <div class="btns1" v-if="showShare">
            <a href="javascript:;" @click="doChange">换个风格</a>
            <a href="javascript:;" @click="drawCanvas2">{{btnShareName}}</a>
        </div>

        <!-- @touchmove.prevent="tmove"-->
        <div class="poster" :style="{background:bgColor,'z-index':isPosting ? 900 : 0}">
            <img :src="posterImg" />
        </div>
    </div>
</template>

<script type='es6'>
    import html2canvas from 'html2canvas'
    import page1 from '@/components/page1'
    import page2 from '@/components/page2'
    import page3 from '@/components/page3'
    import page4 from '@/components/page4'
    import page5 from '@/components/page5'
    import page6 from '@/components/page6'
    import page7 from '@/components/page7'
    import page8 from '@/components/page8'
    import page9 from '@/components/page9'
    import poster from '@/components/poster'
    import Loading from '@/components/loading'
    import window from '@/components/params.js'
    export default {
        name: 'app',
        components:{page1,page2,page3,page4,page5,page6,page7,page8,page9,Loading,poster},
        mounted(){
            window.footPrinter.intoPageStartTime = new Date().getTime();
        },
        data(){
            let self = this;
            return{
                startTime:0,
                endTime:0,
                currentPage:'page1',
                logList:[],
                posterImg:'',
                bgColor:'#fff',
                p10Show:false,
                showShare:false,
                isDrawing:false,
                lastStyleKey:1,
                btnShareName:'分享年报',
                swiperOption: {
                    direction : 'vertical',
                    height:window.innerHeight,
                    on:{
                        slideChangeTransitionStart(){
                            window.pageOutFunc();
                            if(typeof self.$refs[self.currentPage].$children[0].resetValues == 'function'){
                                self.$refs[self.currentPage].$children[0].resetValues();
                            }
                            let pageName = self.$refs.mySwiper.$children[this.activeIndex].$attrs.page;
                            if(pageName == 'page9'){
                                self.showShare = false;
                            }
                        },
                        slideChangeTransitionEnd(){
                            let pageName = self.$refs.mySwiper.$children[this.activeIndex].$attrs.page;
                            self.currentPage = pageName;
                            window.footPrinter.currentPage = pageName.replace('page','');
                            window.footPrinter.lastPage = window.footPrinter.currentPage > window.footPrinter.lastPage ? window.footPrinter.currentPage : window.footPrinter.lastPage;
                            if(typeof self.$refs[self.currentPage].$children[0].setValues == 'function'){
                                self.$refs[self.currentPage].$children[0].setValues();
                            }
                            if(pageName == 'page10'){
                                self.showShare = true;
                            }
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
            },
            isPosting(){
                return this.$store.state.isPosting
            }
        },
        methods:{
            addLog(txt){
                this.logList.push(txt);
            },
            tmove(){},
            doDrawPoster(style){
                this.lastStyleKey = style;
                this.p10Show = true;
                this.$nextTick(()=>{
                    this.$refs.poster.draw();
                    this.$refs.mySwiper.swiper.slideNext();
                })
            },
            doChange(){
                if(this.isPosting) return;
                this.showShare = false;
                this.$refs.mySwiper.swiper.slidePrev();
                this.$refs.page9.$children[0].openSelect()
            },
            back(){
                this.showShare = false;
                this.$refs.mySwiper.swiper.slidePrev();
            },
            drawCanvas2(){
                this.addLog('1');
                if(this.isPosting) return;
                this.$store.commit('setPosting',true);
                this.btnShareName = '生成图片中';
                let index = 0;
                let t = setInterval(()=>{
                    index += 1;
                    if(index > 3){
                        index = 0;
                    }
                    this.btnShareName = '生成图片中';
                    for (let i=0;i<index;i++){
                        this.btnShareName += '.';
                    }
                },300);
                let dateStart = new Date().getTime();
                this.$refs.mySwiper.swiper.slideTo(0,0);
                let list = this.$refs.mySwiper.$children;
                for(let i of list){
                    if(typeof i.$children[0].setValues == 'function'){
                        i.$children[0].setValues();
                    }
                }
                this.addLog('2');
                this.$nextTick(()=>{
                    this.addLog(typeof html2canvas);
                    html2canvas(document.getElementById('swiper')).then((canvas)=>{
                        document.body.appendChild(canvas);
                        this.addLog('3');
                        let img = canvas.toDataURL();
                        canvas.id = 'sharePoster';
                        this.posterImg = img;
                        this.addLog(img.length);
                        clearInterval(t);

                        this.addLog('4');
                        let dateEnd = new Date().getTime();
                        this.btnShareName = '费时：'+(dateEnd - dateStart);

                        window.posterImgData = img.replace('data:image/png;base64,','');
                        window.pageOutFunc();
                        // window.location = '/doShare';
                    })
                })
            },
            drawCanvas(){
                if(this.isPosting) return;
                this.$store.commit('setPosting',true);
                this.btnShareName = '生成图片中';
                let index = 0;
                let t = setInterval(()=>{
                    index += 1;
                    if(index > 3){
                        index = 0;
                    }
                    this.btnShareName = '生成图片中';
                    for (let i=0;i<index;i++){
                        this.btnShareName += '.';
                    }
                },300);
                let dateStart = new Date().getTime();
                this.$nextTick(()=>{
                    this.posterImg = this.$refs.poster.shareImgSrc;
                    this.bgColor = this.$refs.poster.bgColor;
                    this.$refs.mySwiper.swiper.slideTo(0,0);
                    let list = this.$refs.mySwiper.$children;
                    for(let i of list){
                        if(typeof i.$children[0].setValues == 'function'){
                            i.$children[0].setValues();
                        }
                    }
                    setTimeout(()=>{

                        html2canvas(document.getElementById('page1')).then((canvas)=>{
                            document.body.appendChild(canvas);
                            let img = canvas.toDataURL();
                            canvas.id = 'sharePoster';
                            this.posterImg = img;
                            clearInterval(t);
                            let dateEnd = new Date().getTime();
                            this.btnShareName = '费时：'+(dateEnd - dateStart);

                            setTimeout(()=>{
                                // this.$store.commit('setPosting',false);
                                window.posterImgData = img.replace('data:image/png;base64,','');
                                window.pageOutFunc();
                                window.location = '/doShare';
                                this.$refs.mySwiper.swiper.slideTo(list.length-1,0);
                                this.btnShareName = window.posterImgData.length;
                                document.body.removeChild(canvas);
                            },1000);
                        })
                    },1200);
                });
            }
        }
    }

</script>

