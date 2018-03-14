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
        <top-nav :showNav='true' @getID="getCateID"></top-nav>
        <div class="pro-list clearfix">
                <transition-group name="bounce" tag="ul" enter-active-class="animated bounceIn">
                <li
                    v-for="item in proList"
                    @click="toDetail(item.id)"
                    :key="item.id"
                    :style="{'animation-delay':Math.random()*1.2+'s','-webkit-animation-delay':Math.random()*1.2+'s'}">
                    <img :src="domain_url+item.cover">
                    <div class="cover"></div>
                    <div class="name">
                        <p>{{item.title}}</p>
                        <div>{{item.title_ext}}</div>
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
            this.$store.dispatch('doGetCate');
            this.doGetProList();
        },
        data(){
            return{
                cateID:0,
                pageNo:1,
                domain_url:"",
                proList:[]
            }
        },
        methods:{
            toDetail(id){
                this.$router.push({ name: 'workdetail', params: { id: id }})
            },
            getCateID(id){
                this.cateID = id;
                console.log(id);
                this.doGetProList();
            },
            doGetProList(){
                let self = this;
                self.$ajax.get('api/product_list',{
                    params: {
                        page: self.pageNo,
                        cate: self.cateID
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.proList = data.data.list;
                    self.domain_url = data.domain_url;
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }

</script>

