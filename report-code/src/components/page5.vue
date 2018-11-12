<style>
    .page5-container{ height: 100vh; background-color: #EFF7FD;}
    .page5-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0; overflow: hidden;}
    .page5-container .bg img{ width: 300%;}
    .page5-container .page-title{ width: 35.4%;}

    .page5-container .context2{ font-size: 0.3rem; color: #333333; position: absolute; left: 10%; bottom: 7%;}
    .page5-container .context2 p{ margin-bottom: 6px;}
    .page5-container .context2 p span{ color: #2B5FD5;}

    .page5-container .c-car{ position: absolute; left: 75%; bottom: 18%;}

    .page5-container .cloud1{ width: 8%; position: absolute; top: 15%; left: 80%;}
    .page5-container .cloud2{ width: 9%; position: absolute; top: 45%; left: 76%;}
    .page5-container .cloud3{ width: 10%; position: absolute; top: 35%; left: 0%;}
</style>

<template>
    <section class="page5-container">
        <div class="bg">
            <img src="@/assets/images/bg5.jpg">
        </div>

        <div class="page-title"><img src="@/assets/images/title5.png"> </div>

        <div class="page-context">
            <p>全年绿色出行</p>
            <p>减少CO2排放<span class="tag2">22</span>kg</p>
            <p>相当于种植<span class="tag2">10</span>棵冷杉树</p>
            <p><span class="tag1">环保达人</span>就是你了</p>
        </div>

        <div class="context2">
            <p>所有云服务用户，</p>
            <p>全年减少CO2排放<span>2012</span>吨</p>
            <p>相当于绿化了<span>12.1</span>个澳门</p>
        </div>

        <div class="cloud1"><img src="../assets/images/cloud.png"> </div>
        <div class="cloud2"><img src="../assets/images/cloud.png"> </div>
        <div class="cloud3"><img src="../assets/images/cloud.png"> </div>

        <car :scale="0.8"></car>
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
        methods:{

        }
    }

</script>

