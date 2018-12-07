<style>
    .page1-container{ height: 100vh; background-color: #EFF7FD;}
    .page1-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page1-container .bg .cover{ position: absolute; left: 0; bottom: 0;}
    .page1-container .bg .car{ width: 12%; position: absolute; left: 58%; bottom: 33%;}

    .page1-circle{ width: 80%; position: absolute; left: 10%; bottom: 6%; display: flex; justify-content: space-between;}
    .page1-circle li{ width: 23vw; height: 23vw; list-style: none;}
    .page1-circle li div{ width: 100%; height: 100%; border: 2px solid #46B3E9; border-radius: 50%; background-color: rgba(255,255,255,0.5); display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 0.24rem; color: #333333; line-height: 1.1; padding-top: 0.16rem; box-sizing: border-box;}
    .page1-circle li span{ font-size: 0.46rem; color: #2B5FD5;}
    .page1-circle li:nth-child(1) div{ margin-top: -1vw;}
    .page1-circle li:nth-child(2) div{ margin-top: -10vw; border-color: #EBA729;}
    .page1-circle li:nth-child(3) div{ margin-top: 0; border-color: #2B5FD5;}
    .page1-circle-pos2 li:nth-child(1){ margin-top: -9vw;}
    .page1-circle-pos2 li:nth-child(2){ margin-top: 0;}
    .page1-circle-pos2 li:nth-child(3){ margin-top: -4vw;}

    .scaleIn{ animation: scaleIn 0.4s cubic-bezier(.29,.73,.46,1.29);}
    @keyframes scaleIn {
        0%{ transform: scale(0);}
        100%{ transform: scale(1);}
    }

    .floatCircle1{ animation: floatCircle1 8.5s linear infinite;}
    @keyframes floatCircle1 {
        0%,100%{ transform: translate(0,0);}
        12%{ transform: translate(-3px,-3px);}
        24%{ transform: translate(-5px,-5px);}
        36%{ transform: translate(-3px,-8px);}
        48%{ transform: translate(0,-10px);}
        60%{ transform: translate(3px,-8px);}
        72%{ transform: translate(5px,-5px);}
        84%{ transform: translate(3px,-3px);}
    }
    .floatCircle2{ animation: floatCircle2 7.5s linear infinite;}
    @keyframes floatCircle2 {
        0%,100%{ transform: translate(0,0);}
        25%{ transform: translate(-5px,5px);}
        50%{ transform: translate(-10px,0);}
        75%{ transform: translate(-5px,-5px);}
    }
    .floatCircle3{ animation: floatCircle3 6.5s linear infinite;}
    @keyframes floatCircle3 {
        0%,100%{ transform: translate(0,0);}
        12%{ transform: translate(-3px,-4px);}
        24%{ transform: translate(-6px,-5px);}
        36%{ transform: translate(-8px,-4px);}
        48%{ transform: translate(-11px,0);}
        60%{ transform: translate(-8px,4px);}
        72%{ transform: translate(-6px,6px);}
        84%{ transform: translate(-4px,3px);}
    }
</style>

<template>
    <section class="page1-container">
        <div class="bg">
            <img src="/static/images/bg1.jpg">
            <img src="@/assets/images/car1.png" class="car">
            <img src="/static/images/bgCover1.png" class="cover">
        </div>

        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>

        <div class="page-title"><img src="@/assets/images/title1.png"> </div>

        <div class="page-context">
            <p v-if="pageData.regTime"><span class="tag1">{{pageData.regTime.substr(0,4)}}</span>年<span class="tag1">{{pageData.regTime.substr(5,2)}}</span>月<span class="tag1">{{pageData.regTime.substr(8,2)}}</span>日</p>
            <p v-if="pageData.regTime">您加入云服务</p>
            <p>到年底行驶了<span class="tag2">{{animTotalMiles}}</span>公里</p>
            <p>在<span class="tag2">{{animDaysDrive}}</span>天里开过车</p>
            <p>在<span class="tag2">{{animDaysService}}</span>天里用过云服务</p>
        </div>

        <ul class="page1-circle">
            <li class="animated" :class="floatCircle1">
                <transition enter-active-class=" scaleIn">
                <div v-if="showCircle1">使用云服务<span>{{pageData.useTimes}}</span>次</div>
                </transition>
            </li>
            <li class="animated" :class="floatCircle2">
                <transition enter-active-class=" scaleIn">
                <div v-if="showCircle2">在{{pageData.city}}排名<span>{{pageData.cityRank}}</span>位</div>
                </transition>
            </li>
            <li class="animated" :class="floatCircle3">
                <transition enter-active-class=" scaleIn">
                <div v-if="showCircle3">击败全国<span>{{pageData.countryRank}}%</span>用户</div>
                </transition>
            </li>
        </ul>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{
                totalMiles:0,
                daysDrive:0,
                daysService:0,
                showCircle1:false,
                showCircle2:false,
                showCircle3:false,
                floatCircle1:'',
                floatCircle2:'',
                floatCircle3:''
            }
        },

        mounted(){
            this.setValues();
        },
        methods:{
            setValues(){
                TweenLite.to(this.$data,1,{totalMiles:this.pageData.mileage});
                TweenLite.to(this.$data,1,{daysDrive:this.pageData.driveDays});
                TweenLite.to(this.$data,1,{daysService:this.pageData.useDays});
                setTimeout(()=>{
                    this.showCircle1 = true;
                },1000);
                setTimeout(()=>{
                    this.showCircle2 = true;
                },1100);
                setTimeout(()=>{
                    this.showCircle3 = true;
                },1200);
                setTimeout(()=>{
                    this.floatCircle1 = 'floatCircle1';
                },1400);
                setTimeout(()=>{
                    this.floatCircle2 = 'floatCircle2';
                },1500);
                setTimeout(()=>{
                    this.floatCircle3 = 'floatCircle3';
                },1600)
            },
            resetValues(){
                this.totalMiles = 0;
                this.daysDrive = 0;
                this.daysService = 0;
                this.showCircle1 = false;
                this.showCircle2 = false;
                this.showCircle3 = false;
                this.floatCircle1 = '';
                this.floatCircle2 = '';
                this.floatCircle3 = '';
            }
        },
        computed:{
            animTotalMiles(){
                return parseInt(this.totalMiles);
            },
            animDaysDrive(){
                return parseInt(this.daysDrive);
            },
            animDaysService(){
                return parseInt(this.daysService);
            },
            pageData(){
                return this.$store.state.pageData.P1
            }
        }
    }

</script>

