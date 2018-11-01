<style>
    .index-swiper{ position: relative;}
    .my-swiper{ height: 100vh;}
    .my-swiper .swiper-slide{ height: 100%; background-repeat: no-repeat; background-size: cover; background-position: center center;background-image: url('../../assets/img/bg.jpg');}
    .my-swiper .bg{ width: 100%; height: 100%; background-color: rgba(0,0,0,0.55); display: flex; flex-direction: column; justify-content: center;}
    .my-swiper .bg .logo{ margin-left: 670px; margin-bottom: 140px; font-size: 40px; color: #ffffff;}
    .my-swiper .bg .content{ font-size: 32px; color: #ffffff; margin-left: 670px; font-weight: bold;}
    .index-swiper .tag{ height: 100vh; position: absolute; top: 0; right: 30px; display: flex; flex-direction: column; justify-content: center; z-index: 100; list-style: none;}
    .index-swiper .tag li{ width: 10px; height: 10px; border-radius: 50%; border: 1px solid #fff; margin: 8px 0;}
    .index-swiper .tag li.active{ border-color: #0333b3; background-color: #0333b3;}
</style>

<template>
    <div class="index-swiper">
        <swiper :options="options" ref="mySwiper" class="my-swiper">
            <swiper-slide v-for="(item,index) in listData"
                          :key="index"
                :style="{'background-image':'url('+(file_url+item.img)+')'}">
                <div class="bg">
                    <div class="logo"><i class="icon-logo"></i></div>
                    <div class="content" v-html="item.desc"></div>
                </div>
            </swiper-slide>
        </swiper>
        <ul class="tag" v-if="listData.length > 1">
            <li v-for="(item,index) in listData" :class="index == slideIndex ? 'active' : ''"></li>
        </ul>
    </div>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            let  self = this;
            return{
                options:{
                    direction:'vertical',
                    speed:500,
                    loop:true,
                    simulateTouch : false,
                    autoplay:{
                        delay:5000
                    },
                    on: {
                        slideChangeTransitionStart: function(){
                            self.slideIndex = this.realIndex
                        }
                    }
                },
                slideIndex:0,
                listData:[],
                file_url:''
            }
        },
        mounted(){
            this.getData();
        },
        methods:{
            getData(){
                let self = this;
                self.$ajax.get('/client/api/index_banner').then(res=>{
                    let data = res.data;
                    self.listData = data.data.banner;
                    self.file_url = data.file_url;
                })
            }
        }
    }

</script>

