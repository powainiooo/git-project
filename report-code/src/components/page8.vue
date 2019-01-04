<style>
    .page8-container{ height: 100vh; background-color: #EFF7FD;}
    .page8-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page8-container .bg>img{ position: relative;}
    .page8-container .bg .wind1{ position: absolute; bottom:70%; left: 16%;}
    .page8-container .bg .wind2{ position: absolute; bottom:70%; left: 78%;}
    .page8-container .page-title{ width: 40.4%;}
    .page8-container .page-context{ z-index: 25;}

    .page8-container .phone{ width: 71%; position: absolute; bottom: 0; left: 0; z-index: 20; transform-origin: 0 100%; font-size: 0; transform: rotateZ(90deg);}
    .page8-container .show-phone{ transform: rotateZ(0deg); transition: transform 0.7s cubic-bezier(.39,.91,.77,1.04);}
    .page8-container .phone .print{ width: 7vw; position: absolute; top: 30%; right: 25.6%;}
    .page8-container .phone .print .cover{ height: 0%; position: absolute; top: 0; left: 0; overflow: hidden; transition: height 1s linear;}

    .page8-container .hint{ width: 100%; text-align: center; position: absolute; left: 0; bottom: 7%; font-size: 0.36rem; color: #333333; font-weight: bold;}
    .page8-container .hint span{ color: #2B5FD5;}

    .page8-container .c-car{ position: absolute; left: -10%; bottom: 38%;}
    .page8-container .c-car-active{left: 73%; transition: left 2s ease-out;}

    .page8-container .svg-frame{ width: 22vw; height: 35vw; position: absolute; top: 30%; right: 10%;}
    .page8-container .svg-container{ width: 100%; height: 0; position: absolute; bottom: 0; left: 0; overflow: hidden;}
    .page8-container .svg-container svg{ width: 100%; position: absolute; bottom: 0; left: 0}
    .page8-container .show-svg{ height: 100%; transition: height 0.4s ease-out;}
    .page8-container .svg-frame .fly{ width: 20vw; position: absolute; top: 0%; left: 0; opacity: 0;}
    .fly-anim{ animation: fly 2.2s ease-out;}
    @keyframes fly {
        0%{ transform: translate(50px,10px); opacity: 0;}
        15%{ opacity: 1;}
        100%{ transform: translate(-90vw,-20vw); opacity: 1;}
    }

    .page8-container .half-car{ width: 12vw; position: absolute; top: 12%; right: 0; z-index: 11;}
    .page8-container .half-car .shine{ width: 100%; position: absolute; left: 0; top: 0; opacity: 0;}
    .page8-container .half-car .do-shine{ animation: shine 0.5s linear 3;}
    @keyframes shine {
        0%,100%{ opacity: 0;}
        50%{ opacity: 1;}
    }
</style>

<template>
    <section class="page8-container">
        <div v-if="pageData.tag == '有底气'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="/static/images/bg8-3.jpg">

                <div class="half-car">
                    <img src="@/assets/images/car-normal.png">
                    <img src="@/assets/images/car-shine.png" class="shine" :class="{'do-shine':showShine}">
                </div>
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p><span class="tag1">{{pageData.date.substr(5,2) || '--'}}</span>月<span class="tag1">{{pageData.date.substr(8,2) || '--'}}</span>日</p>
                <p>你使用车门解锁<span class="tag1">{{animTimes}}</span>次</p>
                <p>即使忘了带钥匙，心里也很<span class="tag1">有底气</span></p>
            </div>

            <div class="phone"  :class="{'show-phone':showPhone}">
                <img src="/static/images/phone3.png">
                <div class="print">
                    <img src="@/assets/images/print.png">
                    <div class="cover" :style="{height:showCover ? '100%' : '0'}"><img src="@/assets/images/print-cover.png"></div>
                </div>
            </div>
        </div>
        <div v-if="pageData.tag == '强迫症'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="/static/images/bg7.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>全年刷新车况<span class="tag2">{{animTimes}}</span>次</p>
                <p>快看，这里发现一个<span class="tag1">强迫症</span></p>
            </div>

            <div class="phone"  :class="{'show-phone':showPhone}"><img src="/static/images/phone2.png"> </div>
        </div>
        <div v-if="pageData.tag == '分享达人'">
            <div class="bg">
                <img src="/static/images/bg7.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>全年累计分享<span class="tag2">{{animTimes}}</span>次</p>
                <p>荣获<span class="tag1">分享达人</span>称号</p>
            </div>

            <div class="svg-frame">
                <div class="svg-container" :class="{'show-svg':showSvg}">
                    <transition leave-active-class="animated fadeOut">
                        <svg width="100%" viewBox="0 0 168.4 268" v-if="showSvgLine">
                            <path class="st0" d="M0,0c0,0,128.7,28,160,107c34,85.8-44.6,153.4-63,161" stroke="#74a7bf" fill="none" stroke-width="2" stroke-dasharray="10 5"></path>
                        </svg>
                    </transition>

                </div>
                <div class="fly" :class="{'fly-anim':showFly}"><img src="@/assets/images/fly.png"> </div>
            </div>

            <div class="phone" :class="{'show-phone':showPhone}"><img src="/static/images/phone1.png"> </div>
        </div>
        <div v-if="pageData.tag == '有计划' || pageData.tag == '新尝试'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <div style="position: relative; font-size: 0; overflow: hidden;">
                    <img src="/static/images/bg8.jpg">
                    <skywheel></skywheel>
                </div>
                <img src="/static/images/bg8-1.jpg">
                <car :scale="0.5" :class="{'c-car-active':showCar}" :driving="driving"></car>
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context" v-if="pageData.tag == '新尝试'">
                <p>你还没有使用过服务预约</p>
                <p>不排队，能省钱，新一年<span class="tag1">新尝试</span></p>
            </div>
            <div class="page-context" v-if="pageData.tag == '有计划'">
                <p><span class="tag1">{{pageData.date.substr(5,2) || '--'}}</span>月<span class="tag1">{{pageData.date.substr(8,2) || '--'}}</span>日</p>
                <p>你首次使用服务预约</p>
                <p>生活就要<span class="tag1">有计划</span></p>
            </div>

            <div class="hint">全国最爱预约的城市<span>{{pageData.city || '--'}}</span></div>

        </div>
        <div v-if="pageData.tag == '有态度'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="/static/images/bg8-2.png" style="z-index: 10;">

                <windmill class="wind1" :scale="0.8"></windmill>
                <windmill class="wind2" :scale="0.8"></windmill>
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>全年查看电桩<span class="tag2">{{animTimes}}</span>次</p>
                <p>追求便利，过<span class="tag1">有态度</span>的生活</p>
            </div>

            <div class="phone"  :class="{'show-phone':showPhone}"><img src="/static/images/phone4.png"> </div>
        </div>
        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>
    </section>
</template>

<script type='es6'>
    import car from '@/components/car.vue'
    import windmill from '@/components/windmill.vue'
    import skywheel from '@/components/skywheel.vue'
    export default {
        name: 'app',
        components:{car,windmill,skywheel},
        data(){
            return{
                showSvg:false,
                showPhone:false,
                showCar:false,
                showFly:false,
                showCover:false,
                showShine:false,
                driving:true,
                showSvgLine:true,
                times:0
            }
        },
        computed:{
            animTimes(){
                if(this.pageData.times){
                    return this.times.toFixed(0);
                }else{
                    return '--'
                }
            },
            pageData(){
                return this.$store.state.pageData.P8
            }
        },
        mounted(){
            //this.setValues();
        },
        methods:{
            setValues(){
                TweenLite.to(this.$data,1,{times:this.pageData.times});
                this.showPhone = true;
                this.showCar = true;
                setTimeout(()=>{
                    this.showSvg = true;
                },900);
                setTimeout(()=>{
                    this.showFly = true;
                },1200);
                setTimeout(()=>{
                    this.showCover = true;
                },1000);
                setTimeout(()=>{
                    this.driving = false;
                    this.showShine = true;
                    this.showSvgLine = false;
                },2000)
            },
            resetValues(){
                this.times = 0;
                this.showPhone = false;
                this.showSvg = false;
                this.showCar = false;
                this.showFly = false;
                this.driving = true;
                this.showCover = false;
                this.showShine = false;
                this.showSvgLine = true;
            }
        }
    }

</script>

