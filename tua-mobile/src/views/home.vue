<style>
    @import '../assets/css/layout.css';
    @import '../assets/css/animate.css';
    .tsd{ animation-duration: 0.5s;}
</style>

<template>
    <div class="page-frame">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
        <div class="pro-list">
            <transition-group
                name="bounce"
                tag="ul"
                enter-active-class="animated tsd slideInUp">
                <li
                    v-for="(item,index) in proList"
                    :class="(index+1)%5 == 0 ? 'big':''"
                    @click="toDetail(item.id)"
                    :key="item.id"
                    :style="{'animation-delay':(index-1)*0.05+'s','-webkit-animation-delay':(index-1)*0.05+'s'}">
                    <img :src="domain_url+item.cover" v-if="(index+1)%5 != 0">
                    <img :src="domain_url+item.mobile_cover" v-if="(index+1)%5 == 0">
                    <div class="name">
                        <p class="ignore">{{item.title}}</p>
                        <div class="ignore">{{item.title_ext}}</div>
                    </div>
                </li>
            </transition-group>
        </div>
        </div>

        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'home',
        components:{FooterNav},
        mounted(){
            this.doGetProList('refresh');
        },
        data(){
            return{
                proList:[],
                pageNo:1,
                pageSize:20,
                domain_url:'',
                isListEnd:false,
                isLoading:false
            }
        },
        methods:{
            doGetProList(load){
                let self = this;
                if(self.isListEnd) return;
                self.isLoading = true;
                self.$ajax.get('/admin/api/product_list',{
                    params:{
                        page:self.pageNo,
                        pageSize:self.pageSize,
                        cate:0
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
                })
            },
            loadMore(){
                if(this.isListEnd) return;
                this.pageNo ++;
                this.doGetProList('loadmore');
            },
            toDetail(id){
                this.$router.push({ name: 'detail', params: { id: id }})
            }
        }
    }

</script>

