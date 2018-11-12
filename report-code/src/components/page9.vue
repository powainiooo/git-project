<style>
    .page9-container{ height: 100vh; background-color: #EFF7FD;}
    .page9-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}

    .keywords-list{ width: 100%; height: 4.4rem;  position: absolute; left: 0; top: 25%; list-style: none;}
    .keywords-list li{ font-size: 0.7rem; color: #333333; position: absolute;left: -100%;}
    .keywords-list li:nth-child(1){ top:1.5rem; left: 30%;}
    .keywords-list li:nth-child(2){ top:0.7rem; left: 57%; opacity: 0.83; transform: scale(0.71);}
    .keywords-list li:nth-child(3){ top:2.8rem; left: 26%; opacity: 0.68; transform: scale(0.71);}
    .keywords-list li:nth-child(4){ top:0.7rem; left: 2%; opacity: 0.55; transform: scale(0.57);}
    .keywords-list li:nth-child(5){ top:3.3rem; left: 52%; opacity: 0.21; transform: scale(0.57);}
    .keywords-list li:nth-child(6){ top:2.2rem; left: 6%; opacity: 0.2; transform: scale(0.57);}
    .keywords-list li:nth-child(7){ top:0rem; left: 30%; opacity: 0.2; transform: scale(0.42);}
    .keywords-list li:nth-child(8){ top:0.7rem; left: 45%; opacity: 0.2; transform: scale(0.42);}
    .keywords-list li:nth-child(9){ top:2.5rem; left: 50%; opacity: 0.2; transform: scale(0.42);}
    .keywords-list li:nth-child(10){ top:3.6rem; left: 12%; opacity: 0.2; transform: scale(0.42);}
    .keywords-list li:nth-child(11){ top:2.1rem; left: 60%; opacity: 0.2; transform: scale(0.42);}

    .page9-container .btn{ width: 50%; position: absolute; left: 25%; bottom: 6.7%;}
</style>

<template>
    <section class="page9-container">
        <div class="bg">
            <!--<img src="@/assets/images/bg7.jpg">-->
            <img src="@/assets/images/bg9.jpg">
        </div>
        <ul class="keywords-list">
            <li>科技先锋</li>
            <li>早出晚归</li>
            <li>强迫症</li>
            <li>旋转的陀螺</li>
            <li>节能王者</li>
            <li>潜力股</li>
            <li>环保达人</li>
            <li>故乡</li>
            <li>远方</li>
            <li>分享达人</li>
            <li>轻松出行</li>
        </ul>

        <div class="btn"><img src="@/assets/images/btn.png"></div>
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

