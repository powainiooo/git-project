<style>
    .page6-container{ height: 100vh; background-color: #EFF7FD;}
    .page6-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page6-container .bg .p6car{ width: 100vw; position: absolute; left: 0; top: 30%; z-index: 10;}
    .page6-container .bg .wind1{ position: absolute; bottom:62%; left: 26%;}
    .page6-container .bg .wind2{ position: absolute; bottom:62%; left: 68%;}
    .page6-container .page-title{ width: 35.4%;}

    .page6-container .cloud1{ width: 8%; position: absolute; top: 15%; left: 100%; animation: cloud 50s linear infinite ;}
    .page6-container .cloud2{ width: 9%; position: absolute; top: 45%; left: 100%; animation: cloud 55s linear infinite 4s;}
    .page6-container .cloud3{ width: 10%; position: absolute; top: 30%; left: 100%; animation: cloud 50s linear infinite 8s;}
    @keyframes cloud {
        0%{ transform: translate(0,0)}
        100%{ transform: translate(-110vw,0)}
    }

    .page6-container .info-list{ width: 84%; position: absolute; left: 8%; bottom: 10%; display: flex; justify-content: space-between;}
    .page6-container .info-list li{ width: 2.9rem; height: 1.26rem; border-top: 2px solid #46B3E9;background-image: linear-gradient(0deg, rgba(238,238,238,0.00) 17%, rgba(106,199,210,0.49) 100%); display: flex; justify-content: center; align-items: center; flex-direction: column;}
    .page6-container .info-list li h3{ font-size: 0.28rem; color: #333333; margin-bottom: 4px;}
    .page6-container .info-list li p{ font-size: 0.4rem; color: #2B5FD5;}
    .page6-container .info-list li p span{ font-size: 0.32rem;}
    .page6-container .info-list li:last-child{ border-top-color: #46B3E9;background-image: linear-gradient(0deg, rgba(255,255,255,0.00) 17%, rgba(106,151,210,0.49) 100%);}
</style>

<template>
    <section class="page6-container">
        <div class="bg">
            <img src="/static/images/bg6.jpg">
            <img src="@/assets/images/p6car.png" class="p6car">

            <windmill class="wind1"></windmill>
            <windmill class="wind2"></windmill>
        </div>
        <div class="next-arrow"><img src="@/assets/images/nextpage.png"> </div>
        <div class="page-title"><img src="@/assets/images/title6.png"> </div>

        <div class="page-context">
            <p>全年充电<span class="tag2">{{animRecharge}}</span>次</p>
            <p>超过全国<span class="tag2">{{animPercent}}%</span>用户</p>
            <p v-if="energy == 0"><span class="tag1">电动出行</span>，让世界更美好</p>
            <p v-if="energy == 2"><span class="tag1">电动出行</span>，省钱才是王道！</p>
        </div>

        <div class="cloud1"><img src="../assets/images/cloud.png"> </div>
        <div class="cloud2"><img src="../assets/images/cloud.png"> </div>
        <div class="cloud3"><img src="../assets/images/cloud.png"> </div>

        <ul class="info-list">
            <li>
                <h3>平均充电时长</h3>
                <p>{{animHours}}<span>小时</span></p>
            </li>
            <li>
                <h3>最常充电时段</h3>
                <p>{{animTimes}}</p>
            </li>
        </ul>
    </section>
</template>

<script type='es6'>
    import windmill from '@/components/windmill.vue'
    export default {
        name: 'app',
        components:{windmill},
        data(){
            return{
                recharge:0,
                percent:0,
                hours:0,
                timeStartHour:0,
                timeStartMin:0,
                timeEndHour:0,
                timeEndMin:0,
                energy:0
            }
        },
        mounted(){
            this.energy = window.getParams.energy;
        },
        methods:{
            setValues(){
                TweenLite.to(this.$data,1,{recharge:this.pageData.chargeTimes});
                TweenLite.to(this.$data,1,{percent:this.pageData.chargeRank});
                TweenLite.to(this.$data,1,{hours:this.pageData.chargeAvgTime});
                let hour1 = parseInt(this.pageData.timeByHour.substr(0,2));
                TweenLite.to(this.$data,1,{timeStartHour:hour1});
                TweenLite.to(this.$data,1,{timeStartMin:0});
                let hour2 = parseInt(this.pageData.timeByHour.substr(4,2));
                TweenLite.to(this.$data,1,{timeEndHour:hour2});
                TweenLite.to(this.$data,1,{timeEndMin:0});
            },
            resetValues(){
                this.recharge = 0;
                this.percent = 0;
                this.timeStartHour = 0;
                this.timeStartMin = 0;
                this.timeEndHour = 0;
                this.timeEndMin = 0;
            }
        },
        computed:{
            animRecharge(){
                return this.recharge.toFixed(0);
            },
            animPercent(){
                return this.percent.toFixed(0);
            },
            animHours(){
                return this.hours.toFixed(1);
            },
            animTimes(){
                let sh = this.timeStartHour.toFixed(0);
                sh = sh < 10 ? '0'+sh : sh;
                let sm = this.timeStartMin.toFixed(0);
                sm = sm < 10 ? '0'+sm : sm;
                let eh = this.timeEndHour.toFixed(0);
                eh = eh < 10 ? '0'+eh : eh;
                let em = this.timeEndMin.toFixed(0);
                em = em < 10 ? '0'+em : em;
                return sh+':'+sm+'-'+eh+':'+em;
            },
            pageData(){
                return this.$store.state.pageData.P6
            }
        }
    }

</script>

