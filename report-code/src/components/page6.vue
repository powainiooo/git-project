<style>
    .page6-container{ height: 100vh; background-color: #EFF7FD;}
    .page6-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page6-container .page-title{ width: 35.4%;}

    .page6-container .cloud1{ width: 8%; position: absolute; top: 15%; left: 80%;}
    .page6-container .cloud2{ width: 9%; position: absolute; top: 45%; left: 76%;}
    .page6-container .cloud3{ width: 10%; position: absolute; top: 35%; left: 0;}

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
            <img src="@/assets/images/bg6.jpg">
        </div>
        <div class="page-title"><img src="@/assets/images/title6.png"> </div>

        <div class="page-context">
            <p>全年充电<span class="tag2">124</span>次</p>
            <p>超过全国<span class="tag2">20%</span>用户</p>
            <p><span class="tag1">电动出行</span>，让世界更美好</p>
        </div>

        <div class="cloud1"><img src="../assets/images/cloud.png"> </div>
        <div class="cloud2"><img src="../assets/images/cloud.png"> </div>
        <div class="cloud3"><img src="../assets/images/cloud.png"> </div>

        <ul class="info-list">
            <li>
                <h3>平均充电时长</h3>
                <p>4.2<span>小时</span></p>
            </li>
            <li>
                <h3>最常充电时段</h3>
                <p>00:00-07:00</p>
            </li>
        </ul>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{

            }
        },
        mounted(){

        },
        methods:{

        }
    }

</script>

