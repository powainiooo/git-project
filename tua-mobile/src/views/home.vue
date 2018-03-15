<style>
    @import '../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <div class="pro-list">
            <ul>
                <li
                    v-for="(item,index) in proList"
                    :class="(index+1)%5 == 0 ? 'big':''"
                    @click="toDetail(item.id)">
                    <img :src="domain_url+item.cover" v-if="(index+1)%5 != 0">
                    <img :src="domain_url+item.mobile_cover" v-if="(index+1)%5 == 0">
                    <div class="name">
                        <p class="ignore">{{item.title}}</p>
                        <div class="ignore">{{item.title_ext}}</div>
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
        mounted(){
            this.init();
        },
        data(){
            return{
                proList:[],
                pageNo:1,
                domain_url:''
            }
        },
        methods:{
            init(){
                let self = this;
                self.$ajax.get('/admin/api/product_list',{
                    params:{
                        page:self.pageNo,
                        cate:0
                    }
                }).then((res)=>{
                    var data = res.data;
                    self.proList = data.data.list;
                    self.domain_url = data.domain_url;
                })
            },
            toDetail(id){
                this.$router.push({ name: 'detail', params: { id: id }})
            }
        }
    }

</script>

