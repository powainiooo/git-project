<style>
    .page8-container{ height: 100vh; background-color: #EFF7FD;}
    .page8-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page8-container .page-title{ width: 40.4%;}

    .page8-container .phone{ width: 71%; position: absolute; bottom: 0; left: 0;}

    .page8-container .hint{ width: 100%; text-align: center; position: absolute; left: 0; bottom: 7%; font-size: 0.36rem; color: #333333; font-weight: bold;}
    .page8-container .hint span{ color: #2B5FD5;}

    .page8-container .c-car{ position: absolute; left: 20%; bottom: 23%;}
</style>

<template>
    <section class="page8-container">
        <div class="bg">
            <!--<img src="@/assets/images/bg7.jpg">-->
            <img src="@/assets/images/bg8.jpg">
        </div>
        <div class="page-title"><img src="@/assets/images/title7.png"> </div>

        <div class="page-context">
            <p>全年累计分享<span class="tag2">211</span>次</p>
            <p>荣获<span class="tag1">分享达人</span>称号</p>
        </div>

        <div class="phone"><img src="@/assets/images/phone1.png"> </div>

        <div class="hint">全国最爱预约的城市<span>深圳</span></div>

        <car :scale="0.5"></car>
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
        mounted(){

        },
        methods:{

        }
    }

</script>

