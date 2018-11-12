<style>
    .page7-container{ height: 100vh; background-color: #EFF7FD;}
    .page7-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page7-container .page-title{ width: 40.4%;}

    .page7-container .times-list{ width: 100%; height: 6rem; position: absolute; top: 30%; left: 0;}
    .page7-container .times-list li{ width: 30vw; height: 30vw; border: 2px solid #2B5FD5; border-radius: 50%; background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; font-size: 0.32rem; color: #333333; padding-top: 0.24rem; box-sizing: border-box;}
    .page7-container .times-list li span.value{ font-size: 0.66rem; color: #2B5FD5;}
    .page7-container .times-list li:first-child{ left: 28%; top: 2rem;}
    .page7-container .times-list li:nth-child(2){ left: 60%; top: 1.4rem; border-color: #46B3E9; transform: scale(0.68);}
    .page7-container .times-list li:nth-child(3){ left: 20%; top: 4.3rem; border-color: #EBA729; transform: scale(0.62);}
    .page7-container .times-list li:nth-child(4){ left: 10%; top: 0.2rem; border-color: #777AD9; transform: scale(0.71);}
    .page7-container .times-list li:nth-child(5){ left: 51%; top: 2.9rem; border-color: #94D977; transform: scale(0.56);}
    .page7-container .times-list li:nth-child(6){ left: 40%; top: -0.1rem; border-color: #B677D9; transform: scale(0.53);}
    .page7-container .times-list li:nth-child(7){ left: 50%; top: 4.4rem; border-color: #777AD9; transform: scale(0.48);}
    .page7-container .times-list li:nth-child(8){ left: 5%; top: 2.8rem; border-color: #D97777; transform: scale(0.51);}

    .page7-container .hint{ width: 100%; text-align: center; position: absolute; left: 0; bottom: 7%; font-size: 0.36rem; color: #333333; font-weight: bold;}
    .page7-container .hint span{ color: #2B5FD5;}
</style>

<template>
    <section class="page7-container">
        <div class="bg">
            <img src="@/assets/images/bg7.jpg">
        </div>
        <div class="page-title"><img src="@/assets/images/title7.png"> </div>

        <div class="page-context">
            <p>今年</p>
            <p>你使用最多的控制是<span class="tag1">车门解锁</span></p>
            <p>享便利生活，当<span class="tag1">科技先锋</span></p>
        </div>

        <ul class="times-list">
            <li><span>车门解锁</span><span class="value">306</span><span>次</span></li>
            <li><span>预约开空调</span><span class="value">245</span><span>次</span></li>
            <li><span>开启空调</span><span class="value">198</span><span>次</span></li>
            <li><span>闪灯鸣笛</span><span class="value">152</span><span>次</span></li>
            <li><span>车门上锁</span><span class="value">137</span><span>次</span></li>
            <li><span>关闭空调</span><span class="value">98</span><span>次</span></li>
            <li><span>开车窗</span><span class="value">56</span><span>次</span></li>
            <li><span>预约充电</span><span class="value">36</span><span>次</span></li>
        </ul>

        <div class="hint">云服务全年为用户提供<span>1000000+</span>次服务</div>
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

