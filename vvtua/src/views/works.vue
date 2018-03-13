<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';

    .work-frame{ min-height: 100%;}

    @media screen and (max-width: 1500px) {
        .pro-list{ width: 1160px;}
    }
</style>

<template>
    <div class="work-frame bg1">
        <top-nav :showNav='true'></top-nav>
        <div class="pro-list clearfix">
                <transition-group name="bounce" tag="ul" enter-active-class="animated bounceIn">
                <li
                    v-for="item in proList"
                    @click="toDetail"
                    :key="item.id"
                    :style="{'animation-delay':Math.random()*1.2+'s','-webkit-animation-delay':Math.random()*1.2+'s'}">
                    <img :src="item.imgUrl">
                    <div class="cover"></div>
                    <div class="name">
                        <p>{{item.en}}</p>
                        <div>{{item.cn}}</div>
                    </div>
                </li>
                </transition-group>
        </div>
        <bottom-nav posLeft="290"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    import TopNav from '@/components/TopNav.vue'
    export default{
        name: 'works',
        components: {BottomNav,TopNav},
        mounted(){
            let self = this;
            setTimeout(()=>{
                self.proList = self.proList2;
            },1000)
        },
        data(){
            return{
                proList:[],
                proList2:[
                    {
                        id:0,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:1,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:2,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:3,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:4,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:5,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:6,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:7,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:8,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    },
                    {
                        id:9,
                        imgUrl:'static/images/proimg1.jpg',
                        en:'DRAGON NEST',
                        cn:'冒险的初心一定要守护'
                    }
                ]
            }
        },
        methods:{
            toDetail(id){
                this.$router.push({ name: 'workdetail', params: { id: 123 }})
            }
        }
    }

</script>

