<style>
    .page1-container{ height: 100vh; background-color: #EFF7FD;}
    .page1-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page1-container .bg .cover{ position: absolute; left: 0; bottom: 0;}
    .page1-container .bg .car{ width: 12%; position: absolute; left: 60%; bottom: 34%;}

    .page1-circle{ width: 80%; position: absolute; left: 10%; bottom: 6%; display: flex; justify-content: space-between;}
    .page1-circle li{ width: 22vw; height: 22vw; border: 2px solid #46B3E9; border-radius: 50%; background-color: rgba(255,255,255,0.5); display: flex; justify-content: center; align-items: center; flex-direction: column; font-size: 0.24rem; color: #333333; }
    .page1-circle li span{ font-size: 0.46rem; color: #2B5FD5;}
    .page1-circle li:nth-child(1){ margin-top: -1vw;}
    .page1-circle li:nth-child(2){ margin-top: -10vw; border-color: #EBA729;}
    .page1-circle li:nth-child(3){ margin-top: 0; border-color: #2B5FD5;}
    .page1-circle-pos2 li:nth-child(1){ margin-top: -9vw;}
    .page1-circle-pos2 li:nth-child(2){ margin-top: 0;}
    .page1-circle-pos2 li:nth-child(3){ margin-top: -4vw;}
</style>

<template>
    <section class="page1-container">
        <div class="bg">
            <img src="@/assets/images/bg1.jpg">
            <img src="@/assets/images/car1.png" class="car">
            <img src="@/assets/images/bgCover1.png" class="cover">
        </div>

        <div class="page-title"><img src="@/assets/images/title1.png"> </div>

        <div class="page-context">
            <p><span class="tag1">2018</span>年<span class="tag1">2</span>月<span class="tag1">4</span>日</p>
            <p>您加入云服务</p>
            <p>到年底行驶了<span class="tag2">12540</span>公里</p>
            <p>在<span class="tag2">238</span>天里开过车</p>
            <p>在<span class="tag2">132</span>天里用过云服务</p>
        </div>

        <ul class="page1-circle">
            <li>使用云服务<span>1245</span>次</li>
            <li>在深圳排名<span>1245</span>位</li>
            <li>击败全国<span>12%</span>用户</li>
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
        methods:{

        }
    }

</script>

