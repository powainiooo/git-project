<style>
    @import '../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <div class="pro-list">
            <ul>
                <li v-for="(item,index) in proList" :class="(index+1)%5 == 0 ? 'big':''">
                    <img :src="item.imgUrl" v-if="(index+1)%5 != 0">
                    <img :src="item.imgUrlB" v-if="(index+1)%5 == 0">
                    <div class="name">
                        <p class="ignore">{{item.en}}</p>
                        <div class="ignore">{{item.cn}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'home',
        components:{FooterNav},
        data(){
            return{
                proList:[
                    {
                        imgUrl:'static/img4.jpg',
                        imgUrlB:'static/img3.jpg',
                        en:'DRAGON NEST',
                        cn:'名称'
                    },
                    {
                        imgUrl:'static/img4.jpg',
                        imgUrlB:'static/img3.jpg',
                        en:'DRAGON NEST',
                        cn:'名称'
                    },
                    {
                        imgUrl:'static/img4.jpg',
                        imgUrlB:'static/img3.jpg',
                        en:'DRAGON NEST',
                        cn:'名称'
                    },
                    {
                        imgUrl:'static/img4.jpg',
                        imgUrlB:'static/img3.jpg',
                        en:'DRAGON NEST',
                        cn:'名称'
                    },
                    {
                        imgUrl:'static/img4.jpg',
                        imgUrlB:'static/img3.jpg',
                        en:'DRAGON NEST',
                        cn:'名称'
                    }
                ]
            }
        }
    }

</script>

