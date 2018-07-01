<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';

    .work-frame{ min-height: 100%;}

    @media screen and (max-width: 1500px) {
        .pro-list{ width: 1160px;}
    }
    .dpn{ display: none;}
    .animate05{animation-duration:.5s}
</style>

<template>
    <div class="work-frame bg1">
        <top-nav :showNav='true' @getID="getCateID"></top-nav>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
            <div class="pro-list clearfix">
                <transition-group
                    name="bounce"
                    tag="ul"
                    enter-active-class="animated animate05 bounceIn"
                    leave-active-class="dpn">
                <!--<ul>-->
                    <li
                        ref="lis"
                        v-for="item in proList"
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
    import TopNav from '@/components/TopNav.vue'
    export default{
        name: 'works',
        components: {BottomNav,TopNav},
        mounted(){
            let self = this;
            this.$store.dispatch('doGetCate');
            this.doGetProList('refresh');
        },
        data(){
            return{
                cateID:0,
                pageNo:1,
                pageSize:20,
                domain_url:"",
                proList:[],
                isListEnd:false,
                isLoading:false
            }
        },
        methods:{
            toDetail(id){
                this.$router.push({ name: 'workdetail', params: { id: id }})
            },
            getCateID(id){
                this.cateID = id;
                this.pageNo = 1;
                this.isListEnd = false;
                this.doGetProList('refresh');
            },
            doGetProList(load){
                let self = this;
                if(self.isListEnd) return;
                self.isLoading = true;
                self.$ajax.get('api/product_list',{
                    params: {
                        page: self.pageNo,
                        pageSize:self.pageSize,
                        cate: self.cateID
                    }
                }).then((res)=>{
                    let data = res.data;
                    self.domain_url = data.domain_url;
                    if(load == 'refresh'){
                        self.proList = data.data.list;
                    }else if(load == 'loadmore'){
                        if(data.data.list.length >0){
                            data.data.list.map((item)=>{
                                self.proList.push(item)
                            })
                        }
                    }
                    if(self.proList.length == data.data.nums){
                        self.isListEnd = true;
                    }
                    self.isLoading = false;
                }).catch((error)=>{
                    console.log(error);
                })
            },
            loadMore(){
                if(this.isListEnd) return;
                this.pageNo ++;
                this.doGetProList('loadmore');
            }
        }
    }

</script>

