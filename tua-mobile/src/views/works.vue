<style>

</style>

<template>
    <div>
        <top-nav @getID="getListData"></top-nav>
        <body-frame @getID="getListData">
            <div class="item-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="10">
                <work-item v-for="item in proList"
                           :data="item"
                           :mainUrl="domain_url"
                           :key="item.id"></work-item>
            </div>
        </body-frame>
    </div>
</template>

<script type="es6">
    import TopNav from '@/components/TopNav.vue'
    import BottomNav from '@/components/BottomNav.vue'
    import WorkItem from '@/components/WorkItem.vue'
    import BodyFrame from '@/components/BodyFrame.vue'
    export default{
        name: 'App',
        components:{TopNav,BottomNav,WorkItem,BodyFrame},
        mounted(){
            this.getListData(this.$store.state.cateID);
        },
        data(){
            return{
                cateID:[0,0],
                pageNo:1,
                pageSize:20,
                domain_url:"",
                proList:[],
                isListEnd:false,
                isLoading:false
            }
        },
        methods:{
            getListData(id){
                this.cateID = id;
                this.pageNo = 1;
                this.isListEnd = false;
                this.doGetProList('refresh');
            },
            doGetProList(load){
                let self = this;
                if(self.isListEnd) return;
                self.isLoading = true;
                self.$ajax.get('admin/api_v2/product_list',{
                    params: {
                        page: self.pageNo,
                        pageSize:10,
                        cate: self.cateID[0],
                        cate2: self.cateID[1]
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

