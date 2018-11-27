<style>
    .page8-container{ height: 100vh; background-color: #EFF7FD;}
    .page8-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page8-container .page-title{ width: 40.4%;}

    .page8-container .phone{ width: 71%; position: absolute; bottom: 0; left: 0; transform-origin: 0 100%; font-size: 0; transform: rotateZ(90deg);}
    .page8-container .show-phone{ transform: rotateZ(0deg); transition: transform 0.7s cubic-bezier(.39,.91,.77,1.04);}

    .page8-container .hint{ width: 100%; text-align: center; position: absolute; left: 0; bottom: 7%; font-size: 0.36rem; color: #333333; font-weight: bold;}
    .page8-container .hint span{ color: #2B5FD5;}

    .page8-container .c-car{ position: absolute; left: -10%; bottom: 23%;}
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
        100%{ transform: translate(-90vw,-10vw); opacity: 1;}
    }
</style>

<template>
    <section class="page8-container">
        <div v-if="showName == 'control'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="/static/images/bg7.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p><span class="tag1">3</span>月<span class="tag1">20</span>日</p>
                <p>你使用车门解锁<span class="tag1">{{animTimes}}</span>次，<span class="tag1">有底气</span></p>
            </div>

            <div class="phone"  :class="{'show-phone':showPhone}"><img src="/static/images/phone3.png"> </div>
        </div>
        <div v-if="showName == 'infos'">
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
        <div v-if="showName == 'share'">
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
                    <svg width="100%" viewBox="0 0 170 270">
                        <path class="st0" d="M0,0c0,0,170,47,162,170S0,290,0,290" stroke="#74a7bf" fill="none" stroke-width="2" stroke-dasharray="10 5"></path>
                    </svg>
                </div>
                <div class="fly" :class="{'fly-anim':showFly}"><img src="@/assets/images/fly.png"> </div>
            </div>

            <div class="phone" :class="{'show-phone':showPhone}"><img src="/static/images/phone1.png"> </div>
        </div>
        <div v-if="showName == 'order'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="/static/images/bg8.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>你还没有使用过预约服务</p>
                <p>不排队，能省钱，新一年<span class="tag1">新尝试</span></p>
            </div>
            <div class="page-context" style="display: none;">
                <p><span class="tag1">3</span>月<span class="tag1">20</span>日</p>
                <p>你首次使用预约服务</p>
                <p>生活就要<span class="tag1">有计划</span></p>
            </div>

            <div class="hint">全国最爱预约的城市<span>深圳</span></div>

            <car :scale="0.5" :class="{'c-car-active':showCar}" :driving="driving"></car>
        </div>
    </section>
</template>

<script type='es6'>
    import car from '@/components/car.vue'
    export default {
        name: 'app',
        components:{car},
        data(){
            return{
                showSvg:false,
                showPhone:false,
                showCar:false,
                showFly:false,
                driving:true,
                times:0
            }
        },
        computed:{
            showName(){
                return this.$store.state.p8Name
            },
            animTimes(){
                return this.times.toFixed(0);
            }
        },
        mounted(){
            //this.setValues();
        },
        methods:{
            setValues(){
                TweenLite.to(this.$data,1,{times:11});
                this.showPhone = true;
                this.showCar = true;
                setTimeout(()=>{
                    this.showSvg = true;
                },500);
                setTimeout(()=>{
                    this.showFly = true;
                },700);
                setTimeout(()=>{
                    this.driving = false;
                },2000)
            },
            resetValues(){
                this.times = 0;
                this.showPhone = false;
                this.showSvg = false;
                this.showCar = false;
                this.showFly = false;
                this.driving = true;
            }
        }
    }

</script>

