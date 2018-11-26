<style>
    .page9-container{ height: 100vh; background-color: #EFF7FD;}
    .page9-container .bg{ width: 100%; position: absolute; left: 0; bottom: 0; font-size: 0;}
    .page9-container .title{ width: 90%; position: absolute; top: 5%; left: 5%;}

    .keywords-list{ width: 100%; height: 4.4rem;  position: absolute; left: 0; top: 25%; list-style: none;}
    .keywords-list li{ font-size: 0.7rem; color: #333333; position: absolute;left: -100%; animation: keyword 8s linear infinite both;}
    .keywords-list li:nth-child(1){ top:1.5rem; left: 30%;}
    .keywords-list li:nth-child(2){ top:0.7rem; left: 57%; opacity: 0.83; transform: scale(0.71); animation-delay: 0.5s;}
    .keywords-list li:nth-child(3){ top:2.8rem; left: 26%; opacity: 0.68; transform: scale(0.71); animation-delay: 1s;}
    .keywords-list li:nth-child(4){ top:0.7rem; left: 2%; opacity: 0.55; transform: scale(0.57); animation-delay: 1.5s;}
    .keywords-list li:nth-child(5){ top:3.3rem; left: 52%; opacity: 0.21; transform: scale(0.57); animation-delay: 2s;}
    .keywords-list li:nth-child(6){ top:2.2rem; left: 6%; opacity: 0.2; transform: scale(0.57); animation-delay: 2.5s;}
    .keywords-list li:nth-child(7){ top:0rem; left: 30%; opacity: 0.2; transform: scale(0.42); animation-delay: 3s;}
    .keywords-list li:nth-child(8){ top:0.7rem; left: 45%; opacity: 0.2; transform: scale(0.42); animation-delay: 3.5s;}
    .keywords-list li:nth-child(9){ top:2.5rem; left: 50%; opacity: 0.2; transform: scale(0.42); animation-delay: 4s;}
    .keywords-list li:nth-child(10){ top:3.6rem; left: 12%; opacity: 0.2; transform: scale(0.42); animation-delay: 4.5s;}
    .keywords-list li:nth-child(11){ top:2.1rem; left: 60%; opacity: 0.2; transform: scale(0.42); animation-delay: 5s;}
    @keyframes keyword {
        0%,100%{transform: scale(0.42); opacity: 0.2;}
        50%{transform: scale(0.9); opacity: 1;}
    }

    .page9-container .btn{ width: 50%; position: absolute; left: 25%; bottom: 6.7%;}

    .style-container{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5); position: absolute; top: 0; left: 0; z-index: 500;}
    .style-container .style-frame{ width: 80%; margin: 50% auto; background-color: #FFFFFF; border-radius: 10px; overflow: hidden;}
    .style-container .style-frame h3{ font-size: 0.34rem; color: #030303; text-align: center; margin: 10px 0 0 0; font-weight: normal;}
    .style-container .style-frame ul{ display: flex; justify-content: space-between; margin: 0.6rem 0.3rem;}
    .style-container .style-frame ul li{ width: 1.6rem; height: 1.3rem; border: 1px solid rgba(77,77,77,0.3); display: flex; justify-content: center; align-items: center; font-size: 0.32rem; color: rgba(77,77,77,0.6);}
    .style-container .style-frame ul li.active{ border-color: #2B5FD5; color: #2B5FD5;}
    .style-container .style-frame .btns{ border-top: 1px solid rgba(77,77,77,0.3); display: flex;}
    .style-container .style-frame .btns a{ display: flex; width: 50%; box-sizing: border-box; height: 0.8rem; font-size: 0.32rem; color:#007AFF; text-decoration: none; justify-content: center; align-items: center;}
    .style-container .style-frame .btns a:first-child{ border-right: 1px solid rgba(77,77,77,0.3);}
</style>

<template>
    <section class="page9-container">
        <div class="bg">
            <!--<img src="@/assets/images/bg7.jpg">-->
            <img src="@/assets/images/bg9.jpg">
        </div>
        <div class="title"><img src="@/assets/images/title9.png"> </div>

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

        <div class="btn" @click="showStyle = true"><img src="@/assets/images/btn.png"></div>

        <div class="style-container" v-if="showStyle">
            <div class="style-frame">
                <h3>选择风格</h3>
                <ul>
                    <li :class="styleKey == 1 ? 'active' : ''" @click="styleKey = 1">王家卫体</li>
                    <li :class="styleKey == 2 ? 'active' : ''" @click="styleKey = 2">琼瑶体</li>
                    <li :class="styleKey == 3 ? 'active' : ''" @click="styleKey = 3">天猫体</li>
                </ul>
                <div class="btns">
                    <a href="javascript:;" @click="showStyle = false">取消</a>
                    <a href="javascript:;" @click="doDraw">确定</a>
                </div>
            </div>
        </div>

        <poster ref="poster" :styleKey="styleKey"></poster>
    </section>
</template>

<script type='es6'>
    import poster from '@/components/poster.vue'
    export default {
        name: 'app',
        components:{poster},
        data(){
            return{
                showStyle:false,
                styleKey:2
            }
        },
        mounted(){
            this.doDraw();
        },
        methods:{
            doDraw(){
                this.$refs.poster.draw();
            }
        }
    }

</script>

