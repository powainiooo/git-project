<style>
    @import '../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <div class="title">ABOUT</div>
        <div class="about-frame">
            <img src="@/assets/images/logo.png">
            <div>
                はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています
            </div>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'aboutus',
        components:{FooterNav},
        data(){
            return{

            }
        }
    }

</script>

