<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';

    .detail-frame .author-frame{ width: 1440px; height: 100%; position: relative; margin: 0 auto;}
    .detail-frame .author-infor{ width: 470px; float: left;}
    .detail-frame .author-infor .intro{ width: 100%; border-bottom: none; margin: 50% 0 0 0;}
    .detail-frame .author-infor .intro div{ margin-top: 55px;}

    .detail-frame .author-frame .pro-list{ width: 870px; float: right;}

    .dpn{ display: none;}
    .tsd{ animation-duration: 0.5s;}
</style>

<template>
    <div class="detail-frame">
        <div class="top-bar" style="width: 100%;">
            <router-link to="/index" class="logo"><img src="@/assets/images/logofix1.png"></router-link>
            <a href="javascript:;"  @click="$router.go(-1)" class="btn"><img src="@/assets/images/btn-back.png"></a>
        </div>


        <div class="author-frame">
            <transition enter-active-class="animated tsd slideInLeft">
            <div class="author-infor" v-if="authorData.name != ''">
                <div class="intro">
                    <h3><span>{{authorData.name}}</span><br>{{authorData.cname}}</h3>
                    <div v-html="authorData.intro"></div>
                </div>
            </div>
            </transition>

            <div class="pro-list">
                <transition-group
                    name="bounce"
                    tag="ul"
                    enter-active-class="animated animate05 bounceIn"
                    leave-active-class="dpn">
                    <!--<ul>-->
                    <li
                        ref="lis"
                        v-for="item in authorData.list"
                        @click="toDetail(item.id)"
                        :key="item.id"
                        :style="{'animation-delay':Math.random()*0.5+'s','-webkit-animation-delay':Math.random()*0.5+'s'}">
                        <img :src="domain_url+item.cover">
                        <div class="cover"></div>
                        <div class="name">
                            <p>{{item.title}}</p>
                            <div>{{item.title_ext}}</div>
                        </div>
                    </li>
                    <!--</ul>-->
                </transition-group>
            </div>
        </div>

        <bottom-nav posLeft="260"></bottom-nav>
    </div>
</template>

<script type="es6">
    import BottomNav from '@/components/BottomNav.vue'
    export default{
        name: 'App',
        components: {BottomNav},
        mounted(){
            this.getDetailData();
        },
        data(){
            return{
                authorData:{
                    name:'',
                    cname:'',
                    intro:''
                },
                domain_url:''
            }
        },
        methods:{
            toDetail(id){
                this.$router.push({ name: 'workdetail', params: { id: id }})
            },
            getDetailData(){
                let self = this;
                let id = this.$route.params.id;
                console.log(id);
                self.$ajax.get('api/author_info',{
                    params: {
                        id: id
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.authorData = data.data;
                    self.domain_url = data.domain_url;
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }

</script>

