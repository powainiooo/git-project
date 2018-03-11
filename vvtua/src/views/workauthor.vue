<style>
    @import '../assets/css/layout.css';

    .author-frame{ width: 1440px; height: 100%; position: relative; margin: 0 auto;}
    .author-infor{ width: 470px; float: left;}
    .author-infor .intro{ width: 100%; border-bottom: none; margin: 50% 0 0 0;}
    .author-infor .intro div{ margin-top: 55px;}

    .author-frame .pro-list{ width: 870px; float: right;}
</style>

<template>
    <div class="detail-frame">
        <div class="top-bar" style="width: 100%;">
            <router-link to="/index" class="logo"><img src="@/assets/images/logofix1.png"></router-link>
            <router-link to="/works" class="btn"><img src="@/assets/images/btn-back.png"></router-link>
        </div>

        <div class="author-frame">
            <div class="author-infor">
                <div class="intro">
                    <h3><span>HAVE SOME PATIENCE</span><br>“来玩点耐心吧”腾讯up发布会推广</h3>
                    <div>はガラパゴス諸島へ旅をしました。人の手が加わっていないありのままの自然を見つめることで、<br>
                        人の暮らしや幸せについて改めて考え、その体験を共有しようという試みです。プロジェクト全体の<br>
                        コミュニケーションデザインを手掛けており、Webサイトでは旅の行程や写真、映像、文章を簡潔に見せています</div>
                </div>
            </div>

            <div class="pro-list">
                <ul class="clearfix">
                    <li v-for="item in proList">
                        <img :src="item.imgUrl">
                        <div class="name">
                            <p>{{item.en}}</p>
                            <div>{{item.cn}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <bottom-nav posLeft="280"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    export default{
        name: 'App',
        components: {BottomNav},
        data(){
            return{
                proList:[
                    {
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    }
                ]
            }
        }
    }

</script>

