<style>
    .loading{ width: 100vw; height: 100vh; background-color: #EFF7FD; position: fixed; top: 0; left: 0; z-index: 500;}
    .loading .loading-title{ position: absolute; top: 20%; left: 13%;}
    .loading .loading-title img{ width: 52vw;}
    .loading .loading-title .year{ font-size: 0.8rem;}
    .loading .loading-title .name{ font-size: 0.5rem;}
    .loading .loading-title .name span{ color: rgb(43,95,213);}

    .loading .loading-progress{ width: 88%; position: absolute; left: 6%; bottom: 16%;}
    .loading .loading-progress .progress-bar{ width: 100%; height: 8px; border-radius: 10px; background: #FFFFFF;border: 1px solid #2B5FD5; overflow: hidden;}
    .loading .loading-progress .progress-bar .progress-line{ width: 50%; height: 100%;background: #2B5FD5;}
    .loading .loading-progress .progress-bar .progress-number{ font-size: 10px; color: #333333; position: absolute; top: 15px; left: 50%; margin-left: -10px;}
    .loading .loading-progress .tree1{ width: 18%; position: absolute; left: 2%; bottom: 10px; font-size: 0;}
    .loading .loading-progress .tree1 img{ width: 100%;}
    .loading .loading-progress .tree2{ width: 24%; position: absolute; left: 54%; bottom: 10px; font-size: 0;}
    .loading .loading-progress .tree2 img{ width: 100%;}
    .loading .loading-progress .c-car{ position: absolute; left: 50%; bottom: 10px;}

    .loading .loading-cloud1{ width: 9%; position: absolute; bottom: 30%; left: 80%;}
    .loading .loading-cloud2{ width: 6%; position: absolute; bottom: 26%; left: 43%;}
</style>

<template>
    <div class="loading">
        <div class="loading-title">
            <img src="@/assets/images/title-loading.png">
            <p class="year">2018</p>
            <p class="name"><span>王家卫</span>的年度报告</p>
        </div>
        <div class="loading-progress">
            <div class="progress-bar">
                <div class="progress-line"></div>
                <div class="progress-number">50%</div>
            </div>
            <div class="tree1"><img src="@/assets/images/tree1.png"></div>
            <div class="tree2"><img src="@/assets/images/tree2.png"></div>
            <car></car>
        </div>
        <div class="loading-cloud1"><img src="@/assets/images/cloud.png"> </div>
        <div class="loading-cloud2"><img src="@/assets/images/cloud.png"> </div>
    </div>
</template>

<script type='es6'>
    import car from '@/components/car'
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

