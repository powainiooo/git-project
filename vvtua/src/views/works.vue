<style>
    @import '../assets/css/layout.css';

    .work-frame{ min-height: 100%;}

    @media screen and (max-width: 1500px) {
        .pro-list{ width: 1160px;}
    }
</style>

<template>
    <div class="work-frame bg1">
        <top-nav :showNav='true'></top-nav>
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
        <bottom-nav posLeft="280"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    import TopNav from '@/components/TopNav.vue'
    export default{
        name: 'works',
        components: {BottomNav,TopNav},
        data(){
            return{
                proList:[
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

