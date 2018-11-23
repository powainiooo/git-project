<style>
    .page8-container{ height: 100vh; background-color: #EFF7FD;}
    .page8-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page8-container .page-title{ width: 40.4%;}

    .page8-container .phone{ width: 71%; position: absolute; bottom: 0; left: 0;}

    .page8-container .hint{ width: 100%; text-align: center; position: absolute; left: 0; bottom: 7%; font-size: 0.36rem; color: #333333; font-weight: bold;}
    .page8-container .hint span{ color: #2B5FD5;}

    .page8-container .c-car{ position: absolute; left: 20%; bottom: 23%;}

    .page8-container .svg-frame{ width: 22%; position: absolute; top: 30%; right: 10%;}
</style>

<template>
    <section class="page8-container">
        <div v-if="showName == 'none'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="../../static/images/bg8.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>全年累计分享<span class="tag2">211</span>次</p>
                <p>荣获<span class="tag1">分享达人</span>称号</p>
            </div>

            <div class="phone"><img src="@/assets/images/phone1.png"> </div>

            <div class="hint">全国最爱预约的城市<span>深圳</span></div>

            <car :scale="0.5"></car>
        </div>
        <div v-if="showName == 'control'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="../../static/images/bg7.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p><span class="tag1">3</span>月<span class="tag1">20</span>日</p>
                <p>你使用车门解锁<span class="tag1">11</span>次，<span class="tag1">有底气</span></p>
            </div>

            <div class="phone"><img src="../../static/images/phone3.png"> </div>
        </div>
        <div v-if="showName == 'infos'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="../../static/images/bg7.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>全年刷新车况<span class="tag2">211</span>次</p>
                <p>快看，这里发现一个<span class="tag1">强迫症</span></p>
            </div>

            <div class="phone"><img src="../../static/images/phone2.png"> </div>
        </div>
        <div v-if="showName == 'share'">
            <div class="bg">
                <!--<img src="@/assets/images/bg7.jpg">-->
                <img src="../../static/images/bg7.jpg">
            </div>
            <div class="page-title"><img src="@/assets/images/title7.png"> </div>

            <div class="page-context">
                <p>全年累计分享<span class="tag2">211</span>次</p>
                <p>荣获<span class="tag1">分享达人</span>称号</p>
            </div>

            <div class="svg-frame">
                <svg width="100%" viewBox="0 0 170 270">
                    <path class="st0" d="M0,0c0,0,170,47,162,170S0,290,0,290" stroke="#74a7bf" fill="none" stroke-width="2" stroke-dasharray="10 6"></path>
                </svg>
            </div>

            <div class="phone"><img src="../../static/images/phone1.png"> </div>
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

            }
        },
        computed:{
            showName(){
                return this.$store.state.p8Name
            }
        },
        mounted(){

        },
        methods:{

        }
    }

</script>

